import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import { guidedResponseSchema } from "@/lib/services/guided-response-schema";
import { getLearningStageLabel, getLearningStagePrompt, resolveLearningStage } from "@/lib/services/learning-stage";
import type { GuidedMessage, GuidedResponse } from "@/types";

const DEFAULT_MODEL = "gpt-5.4-mini";

function buildStudentGuideInstruction(gradeLabel?: string) {
  const stage = resolveLearningStage(gradeLabel);
  const stageLabel = getLearningStageLabel(stage);
  const stagePrompt = getLearningStagePrompt(stage);

  return `
你是“智学导航”的学生端 AI 导学助手。

你的首要目标是帮助 K1-K12 学生形成独立思考能力，而不是直接给答案。
当前服务对象：${gradeLabel || "未指定年级"}，按${stageLabel}策略进行引导。

学段语气要求：${stagePrompt.tone}
学段引导策略：${stagePrompt.strategy}
学段重点：${stagePrompt.emphasis}

严格遵守以下规则：
1. 默认不要直接给最终答案、最终结果或完整解题过程。
2. 先识别题目对应的知识点，再做一步提示和一步追问。
3. 当学生要求“直接告诉我答案”时，要温和拒绝并把注意力拉回到关键步骤。
4. 如果学生已经尝试多轮，可以把提示说得更明确，但仍然优先讲方法，不直接报最终结果。
5. 输出必须简洁、鼓励思考、适合对应学段学生阅读。
6. 仅输出结构化 JSON，不要输出额外解释。

字段要求：
- knowledgePoints: 1 到 5 个核心知识点
- reviewHint: 先帮助学生回顾的知识点提示
- guidingQuestion: 当前只问一个最关键、最能推进思考的问题
- studentNextAction: 指导学生下一步应该做什么
- gentleBoundary: 当学生急着要答案时的温和边界提醒
`.trim();
}

let cachedClient: OpenAI | null = null;

function getOpenAIClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  cachedClient = new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || undefined
  });

  return cachedClient;
}

function buildConversation(history: GuidedMessage[], message: string) {
  const normalizedHistory =
    history.at(-1)?.sender === "student" && history.at(-1)?.content === message
      ? history
      : [
          ...history,
          {
            id: "current-message",
            sender: "student" as const,
            content: message
          }
        ];

  return normalizedHistory.map((item) => ({
    role: item.sender === "student" ? ("user" as const) : ("assistant" as const),
    content: item.content
  }));
}

export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function generateGuidedReplyWithOpenAI(input: {
  message: string;
  history: GuidedMessage[];
  gradeLabel?: string;
}): Promise<GuidedResponse> {
  const client = getOpenAIClient();

  if (!client) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await client.responses.parse({
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    input: [
      {
        role: "developer",
        content: buildStudentGuideInstruction(input.gradeLabel)
      },
      ...buildConversation(input.history, input.message)
    ],
    text: {
      format: zodTextFormat(guidedResponseSchema, "guided_response")
    }
  });

  if (!response.output_parsed) {
    throw new Error("OpenAI response was empty.");
  }

  return response.output_parsed;
}