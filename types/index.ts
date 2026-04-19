export type UserRole = "student" | "parent" | "teacher" | "admin";

export type DemoUser = {
  id: string;
  name: string;
  role: UserRole;
  subtitle: string;
};

export type KnowledgeStatus = "strong" | "watch" | "weak";

export type KnowledgePointSummary = {
  id: string;
  name: string;
  subject: string;
  mastery: number;
  status: KnowledgeStatus;
  note: string;
};

export type GuidedMessage = {
  id: string;
  sender: "student" | "assistant";
  content: string;
};

export type GuidedResponse = {
  knowledgePoints: string[];
  reviewHint: string;
  guidingQuestion: string;
  studentNextAction: string;
  gentleBoundary: string;
};

export type StudentInsight = {
  title: string;
  detail: string;
};

export type StudentDashboardData = {
  studentName: string;
  gradeLabel: string;
  streakDays: number;
  weeklyStudyMinutes: number;
  independenceScore: number;
  weakAreas: KnowledgePointSummary[];
  knowledgeMap: KnowledgePointSummary[];
  recentSession: GuidedMessage[];
  insights: StudentInsight[];
};

export type CorrectionItem = {
  topic: string;
  studentAnswer: string;
  feedback: string;
  guidanceForParent: string;
  status: "correct" | "incorrect" | "needs-review";
};

export type ParentCorrectionData = {
  childName: string;
  submittedAt: string;
  assignmentTitle: string;
  summary: string;
  knowledgePoints: string[];
  correctionItems: CorrectionItem[];
  parentTips: string[];
};

export type TeacherStudentRow = {
  id: string;
  name: string;
  grade: string;
  assignmentCompletion: number;
  momentum: "up" | "steady" | "down";
  weakestPoint: string;
};

export type KnowledgeGapItem = {
  topic: string;
  affectedRate: number;
  subject: string;
  recommendation: string;
};

export type TeachingSuggestionItem = {
  title: string;
  action: string;
  expectedImpact: string;
};

export type TeacherDashboardData = {
  className: string;
  activeStudents: number;
  completionRate: number;
  averageMastery: number;
  riskStudents: number;
  students: TeacherStudentRow[];
  knowledgeGaps: KnowledgeGapItem[];
  suggestions: TeachingSuggestionItem[];
};
