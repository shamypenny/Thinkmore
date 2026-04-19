import { z } from "zod";

import { generateGuidedReplyWithOpenAI, isOpenAIConfigured } from "@/lib/services/llm-provider";
import { resolveLearningStage } from "@/lib/services/learning-stage";
import type { GuidedMessage, GuidedResponse } from "@/types";

const guideInputSchema = z.object({
  message: z.string().min(1),
  history: z.array(
    z.object({
      id: z.string(),
      sender: z.enum(["student", "assistant"]),
      content: z.string()
    })
  ),
  gradeLabel: z.string().optional()
});

const keywordMap = [
  {
    matchers: ["分式", "公分母", "方程"],
    knowledgePoints: ["分式化简", "最简公分母", "分母不为 0"],
    reviewHint: {
      primary: "先看看哪些数或式子放在分母的位置，再想一想它们能不能取到让分母变成 0 的值。",
      middle: "先确认题目里哪些式子在分母上，再检查它们什么时候不能取值。",
      high: "先审视分式成立条件和定义域，再决定后续化简或同分母处理的路线。"
    },
    guidingQuestion: {
      primary: "如果你想把这些分式放到一起算，第一步要先找到什么共同部分？",
      middle: "如果要把这些分式放到同一条计算线上，你会先找什么共同部分？",
      high: "若要统一表达式并继续推导，你会先从哪个共同因式或最简公分母入手？"
    }
  },
  {
    matchers: ["应用题", "路程", "速度"],
    knowledgePoints: ["等量关系", "设未知数", "单位统一"],
    reviewHint: {
      primary: "先把题目里已经知道的量、还不知道的量和关系词圈出来。",
      middle: "把题目中的已知量、未知量和关系词分别圈出来。",
      high: "先抽取题目中的变量、约束和等量关系，再判断适合的建模方式。"
    },
    guidingQuestion: {
      primary: "题目里哪两个量是有明确关系、可以先连起来的？",
      middle: "题目里哪两个量之间有明确的等量关系？",
      high: "如果把题目转成方程或函数，最核心的等量关系应该写成什么？"
    }
  }
];

export function buildMockGuidedReply(input: {
  message: string;
  history: GuidedMessage[];
  gradeLabel?: string;
}): GuidedResponse {
  const { message, history, gradeLabel } = guideInputSchema.parse(input);
  const lowered = message.trim();
  const matched =
    keywordMap.find((item) => item.matchers.some((matcher) => lowered.includes(matcher))) ??
    keywordMap[0];
  const struggleCount = history.filter((item) => item.sender === "student").length;
  const needsGentleBoundary =
    lowered.includes("答案") || lowered.includes("直接") || lowered.includes("不会");
  const stage = resolveLearningStage(gradeLabel);

  const boundaryByStage = {
    primary: needsGentleBoundary
      ? "我先不把最后答案直接说出来，我们先把最关键的一步找出来。"
      : "先想清楚第一步，我们慢慢来。",
    middle: needsGentleBoundary
      ? "我先不给最终答案。我们先把关键一步找出来，你自己就更容易做出来。"
      : "先走一步，不急着跳到最后结果。",
    high: needsGentleBoundary
      ? "我先不直接报结论。你先把方法依据说出来，我们再推进到结果。"
      : "先确认思路和依据，再继续往结果推进。"
  };

  const nextActionByStage = {
    primary:
      struggleCount >= 3
        ? "先说说你觉得第一步要做什么，我再帮你检查。"
        : "先用一句简单的话说出你准备先做哪一步。",
    middle:
      struggleCount >= 3
        ? "先写出你判断的第一步，再告诉我你卡住的具体位置。"
        : "用一句话回答我刚才的问题，或者把你想到的第一步写出来。",
    high:
      struggleCount >= 3
        ? "先写出你的方法依据或列式起点，再说明你卡住的是哪一层推导。"
        : "先写出你准备采用的思路或关键等量关系。"
  };

  return {
    knowledgePoints: matched.knowledgePoints,
    reviewHint: matched.reviewHint[stage],
    guidingQuestion: matched.guidingQuestion[stage],
    studentNextAction: nextActionByStage[stage],
    gentleBoundary: boundaryByStage[stage]
  };
}

export async function buildGuidedReply(input: {
  message: string;
  history: GuidedMessage[];
  gradeLabel?: string;
}): Promise<GuidedResponse> {
  const parsed = guideInputSchema.parse(input);

  if (!isOpenAIConfigured()) {
    return buildMockGuidedReply(parsed);
  }

  try {
    return await generateGuidedReplyWithOpenAI(parsed);
  } catch (error) {
    console.error("Failed to generate guided reply with OpenAI. Falling back to mock.", error);
    return buildMockGuidedReply(parsed);
  }
}