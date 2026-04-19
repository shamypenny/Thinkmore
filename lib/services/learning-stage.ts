export type LearningStage = "primary" | "middle" | "high";

const chineseGradeMap: Record<string, number> = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
  十一: 11,
  十二: 12
};

function parseGradeNumber(gradeLabel?: string) {
  if (!gradeLabel) {
    return null;
  }

  const arabicMatch = gradeLabel.match(/(\d{1,2})/);
  if (arabicMatch) {
    return Number(arabicMatch[1]);
  }

  const normalized = gradeLabel.replace("年级", "").replace("高", "").replace("初", "").replace("小", "");

  for (const [key, value] of Object.entries(chineseGradeMap).sort((a, b) => b[0].length - a[0].length)) {
    if (normalized.includes(key)) {
      return value;
    }
  }

  return null;
}

export function resolveLearningStage(gradeLabel?: string): LearningStage {
  if (!gradeLabel) {
    return "middle";
  }

  if (gradeLabel.includes("小学") || gradeLabel.includes("K1") || gradeLabel.includes("K2") || gradeLabel.includes("K3") || gradeLabel.includes("K4") || gradeLabel.includes("K5") || gradeLabel.includes("K6")) {
    return "primary";
  }

  if (gradeLabel.includes("初") || gradeLabel.includes("初中") || gradeLabel.includes("K7") || gradeLabel.includes("K8") || gradeLabel.includes("K9")) {
    return "middle";
  }

  if (gradeLabel.includes("高") || gradeLabel.includes("高中") || gradeLabel.includes("K10") || gradeLabel.includes("K11") || gradeLabel.includes("K12")) {
    return "high";
  }

  const gradeNumber = parseGradeNumber(gradeLabel);

  if (gradeNumber === null) {
    return "middle";
  }

  if (gradeNumber <= 6) {
    return "primary";
  }

  if (gradeNumber <= 9) {
    return "middle";
  }

  return "high";
}

export function getLearningStageLabel(stage: LearningStage) {
  if (stage === "primary") return "小学阶段";
  if (stage === "middle") return "初中阶段";
  return "高中阶段";
}

export function getLearningStagePrompt(stage: LearningStage) {
  if (stage === "primary") {
    return {
      tone: "语气更亲和、更具体，少用抽象术语，多用孩子容易理解的话。",
      strategy: "每次只推进一个小步骤，可以适当使用生活化比喻和观察式提问。",
      emphasis: "重点帮助学生理解题意、看见条件、说出第一步，不要让信息密度过高。"
    };
  }

  if (stage === "middle") {
    return {
      tone: "语气清晰直接，像一位会追问关键步骤的老师。",
      strategy: "强调拆题、找关系、说方法，逐步建立独立解题能力。",
      emphasis: "重点帮助学生从知识点回顾过渡到方法选择，不直接交付完整答案。"
    };
  }

  return {
    tone: "语气更理性、更简洁，尊重学生的自我推理能力。",
    strategy: "鼓励学生建立知识体系、说明依据、比较不同解法的适用条件。",
    emphasis: "重点帮助学生从题目抽象到方法、模型或原理，不只停留在单题步骤。"
  };
}