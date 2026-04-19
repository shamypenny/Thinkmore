import { parentCorrection } from "@/lib/mock-data/demo";
import type { ParentCorrectionData } from "@/types";

export async function getMockCorrectionResult(fileName?: string): Promise<ParentCorrectionData> {
  return {
    ...parentCorrection,
    assignmentTitle: fileName
      ? `${parentCorrection.assignmentTitle} · ${fileName}`
      : parentCorrection.assignmentTitle
  };
}
