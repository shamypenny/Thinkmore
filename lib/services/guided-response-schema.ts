import { z } from "zod";

export const guidedResponseSchema = z.object({
  knowledgePoints: z.array(z.string()).min(1).max(5),
  reviewHint: z.string().min(1),
  guidingQuestion: z.string().min(1),
  studentNextAction: z.string().min(1),
  gentleBoundary: z.string().min(1)
});