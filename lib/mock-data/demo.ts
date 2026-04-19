import type {
  DemoUser,
  ParentCorrectionData,
  StudentDashboardData,
  TeacherDashboardData
} from "@/types";

export const demoUsers: DemoUser[] = [
  {
    id: "student-lin",
    name: "林小满",
    role: "student",
    subtitle: "七年级学生，最近在强化分式与方程"
  },
  {
    id: "parent-chen",
    name: "陈女士",
    role: "parent",
    subtitle: "家长视角，关注作业批改与辅导建议"
  },
  {
    id: "teacher-zhou",
    name: "周老师",
    role: "teacher",
    subtitle: "数学教师，关注班级知识点掌握情况"
  }
];

export const studentDashboard: StudentDashboardData = {
  studentName: "林小满",
  gradeLabel: "七年级",
  streakDays: 12,
  weeklyStudyMinutes: 265,
  independenceScore: 81,
  weakAreas: [
    {
      id: "kp-1",
      name: "分式化简",
      subject: "数学",
      mastery: 58,
      status: "weak",
      note: "会套公式，但对约分条件理解不稳。"
    },
    {
      id: "kp-2",
      name: "应用题建模",
      subject: "数学",
      mastery: 65,
      status: "watch",
      note: "读题后提取等量关系速度偏慢。"
    },
    {
      id: "kp-3",
      name: "议论文中心句判断",
      subject: "语文",
      mastery: 77,
      status: "watch",
      note: "能定位段落，但概括表述还不够准确。"
    }
  ],
  knowledgeMap: [
    {
      id: "kp-4",
      name: "整式运算",
      subject: "数学",
      mastery: 88,
      status: "strong",
      note: "基础稳定，可作为分式学习的回顾入口。"
    },
    {
      id: "kp-5",
      name: "一元一次方程",
      subject: "数学",
      mastery: 84,
      status: "strong",
      note: "列式能力较好，易迁移到应用题。"
    },
    {
      id: "kp-6",
      name: "分式化简",
      subject: "数学",
      mastery: 58,
      status: "weak",
      note: "建议用错题回顾和口头解释巩固。"
    }
  ],
  recentSession: [
    {
      id: "msg-1",
      sender: "student",
      content: "老师，这道分式方程题我不会。"
    },
    {
      id: "msg-2",
      sender: "assistant",
      content: "先别急着求答案。你觉得这道题在化简前最需要先检查什么条件？"
    },
    {
      id: "msg-3",
      sender: "student",
      content: "是不是先看分母不能为 0？"
    },
    {
      id: "msg-4",
      sender: "assistant",
      content: "对，这一步很关键。接下来你能说说最简公分母是什么吗？"
    }
  ],
  insights: [
    {
      title: "独立思考表现提升",
      detail: "最近 7 次练习中，先尝试再求助的比例提高到了 73%。"
    },
    {
      title: "数学优势明显",
      detail: "代数类题目完成速度快于班级均值 18%。"
    },
    {
      title: "建议优先补弱",
      detail: "本周把“分式化简”作为主攻知识点，连续做 3 组错因回顾。"
    }
  ]
};

export const parentCorrection: ParentCorrectionData = {
  childName: "林小满",
  submittedAt: "2026-03-30 19:10",
  assignmentTitle: "七年级数学课后练习 3",
  summary: "孩子的基础计算没有明显问题，主要卡在分式化简时对公因式和定义域条件的判断。",
  knowledgePoints: ["分式化简", "最简公分母", "分母不为 0", "等量关系提取"],
  correctionItems: [
    {
      topic: "第 2 题",
      studentAnswer: "约分后得到 x / (x + 1)",
      feedback: "忽略了分子分母的公因式不完整，少约掉了一个因子。",
      guidanceForParent: "先别讲答案，让孩子圈出分子和分母各自的因式，再问‘哪些是同时出现的？’",
      status: "incorrect"
    },
    {
      topic: "第 4 题",
      studentAnswer: "列出了等式，但未完成求解",
      feedback: "能识别题意，但下一步不知道如何统一到同一分母。",
      guidanceForParent: "可以追问‘如果都变成同一种单位或同一分母，会更容易比较吗？’",
      status: "needs-review"
    },
    {
      topic: "第 5 题",
      studentAnswer: "答案正确",
      feedback: "过程完整，审题较稳。",
      guidanceForParent: "这题可以让孩子复述方法，强化迁移能力。",
      status: "correct"
    }
  ],
  parentTips: [
    "先问孩子是读题不懂，还是会读题但不会下手。",
    "让孩子用自己的话复述题目条件，再决定是否提醒知识点。",
    "每次只给一个提示，留出 20 到 30 秒思考时间。"
  ]
};

export const teacherDashboard: TeacherDashboardData = {
  className: "七年级 2 班",
  activeStudents: 42,
  completionRate: 93,
  averageMastery: 76,
  riskStudents: 5,
  students: [
    {
      id: "stu-01",
      name: "林小满",
      grade: "七年级",
      assignmentCompletion: 96,
      momentum: "up",
      weakestPoint: "分式化简"
    },
    {
      id: "stu-02",
      name: "王子谦",
      grade: "七年级",
      assignmentCompletion: 74,
      momentum: "down",
      weakestPoint: "应用题建模"
    },
    {
      id: "stu-03",
      name: "许安然",
      grade: "七年级",
      assignmentCompletion: 89,
      momentum: "steady",
      weakestPoint: "列方程审题"
    }
  ],
  knowledgeGaps: [
    {
      topic: "分式化简",
      affectedRate: 46,
      subject: "数学",
      recommendation: "安排 10 分钟错因拆解，重点说明约分前的因式分解。"
    },
    {
      topic: "应用题等量关系",
      affectedRate: 39,
      subject: "数学",
      recommendation: "用生活化例子重建“已知量-未知量-关系式”三步法。"
    },
    {
      topic: "议论文中心句判断",
      affectedRate: 31,
      subject: "语文",
      recommendation: "加入段落主旨句提取练习，强化概括表达。"
    }
  ],
  suggestions: [
    {
      title: "下一节课先讲错因，不先讲答案",
      action: "挑选 2 道高错题，让学生先解释错在何处，再由教师总结。",
      expectedImpact: "降低机械模仿，提升学生自我纠错能力。"
    },
    {
      title: "把学生分成 3 组微差异教学",
      action: "将“分式化简薄弱”“应用题薄弱”“整体稳定”分组布置任务。",
      expectedImpact: "提高课堂时间利用率，避免统一讲解过慢或过快。"
    },
    {
      title: "关注 5 名学习波动学生",
      action: "结合作业完成率和近 2 周课堂反馈进行一对一跟进。",
      expectedImpact: "降低掉队风险，提前发现状态变化原因。"
    }
  ]
};
