const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.guidedMessageRecord.deleteMany();
  await prisma.guidedSession.deleteMany();
  await prisma.learningMetric.deleteMany();
  await prisma.studentKnowledgeMastery.deleteMany();
  await prisma.knowledgePoint.deleteMany();
  await prisma.correctionResult.deleteMany();
  await prisma.submissionImage.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.teachingSuggestion.deleteMany();
  await prisma.classRoom.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.parentProfile.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.user.deleteMany();

  const studentUser = await prisma.user.create({
    data: {
      email: "student@example.com",
      name: "林小满",
      role: Role.STUDENT,
      studentProfile: {
        create: {
          gradeLabel: "七年级",
          independenceScore: 81
        }
      }
    },
    include: {
      studentProfile: true
    }
  });

  const parentUser = await prisma.user.create({
    data: {
      email: "parent@example.com",
      name: "陈女士",
      role: Role.PARENT,
      parentProfile: {
        create: {}
      }
    },
    include: {
      parentProfile: true
    }
  });

  await prisma.studentProfile.update({
    where: { id: studentUser.studentProfile.id },
    data: {
      parentId: parentUser.parentProfile.id
    }
  });

  const teacherUser = await prisma.user.create({
    data: {
      email: "teacher@example.com",
      name: "周老师",
      role: Role.TEACHER,
      teacherProfile: {
        create: {
          subject: "数学"
        }
      }
    },
    include: {
      teacherProfile: true
    }
  });

  const classRoom = await prisma.classRoom.create({
    data: {
      name: "七年级 2 班",
      homeroomTeacherId: teacherUser.teacherProfile.id
    }
  });

  await prisma.enrollment.create({
    data: {
      studentId: studentUser.studentProfile.id,
      classRoomId: classRoom.id
    }
  });

  const assignment = await prisma.assignment.create({
    data: {
      classRoomId: classRoom.id,
      title: "七年级数学课后练习 3",
      subject: "数学"
    }
  });

  const submission = await prisma.submission.create({
    data: {
      assignmentId: assignment.id,
      userId: studentUser.id,
      status: "reviewed"
    }
  });

  await prisma.submissionImage.create({
    data: {
      submissionId: submission.id,
      fileName: "math-homework-3.jpg",
      fileUrl: "/mock/math-homework-3.jpg"
    }
  });

  await prisma.correctionResult.create({
    data: {
      submissionId: submission.id,
      summary: "主要问题集中在分式化简时对定义域条件和公因式识别不完整。",
      score: 79,
      knowledgeTags: "分式化简,最简公分母,分母不为0",
      guidance: "让孩子先复述条件，再圈出公因式，家长每次只给一个提示。"
    }
  });

  const knowledgePoint = await prisma.knowledgePoint.createMany({
    data: [
      { name: "分式化简", subject: "数学", description: "分式约分与变形" },
      { name: "最简公分母", subject: "数学", description: "统一分母的关键步骤" },
      { name: "等量关系", subject: "数学", description: "应用题建模基础" }
    ]
  });

  const points = await prisma.knowledgePoint.findMany();

  await prisma.studentKnowledgeMastery.createMany({
    data: points.map((point, index) => ({
      studentId: studentUser.studentProfile.id,
      knowledgePointId: point.id,
      mastery: [58, 64, 72][index] ?? 70,
      trendLabel: index === 0 ? "needs-support" : "improving"
    }))
  });

  const guidedSession = await prisma.guidedSession.create({
    data: {
      userId: studentUser.id,
      topic: "分式方程引导练习",
      status: "active"
    }
  });

  await prisma.guidedMessageRecord.createMany({
    data: [
      {
        guidedSessionId: guidedSession.id,
        sender: "student",
        content: "老师，这道分式方程题我不会。"
      },
      {
        guidedSessionId: guidedSession.id,
        sender: "assistant",
        content: "先别急着求答案。你觉得化简前要先检查什么条件？"
      }
    ]
  });

  await prisma.learningMetric.createMany({
    data: [
      { userId: studentUser.id, metricType: "weekly_minutes", metricValue: 265 },
      { userId: studentUser.id, metricType: "independence_score", metricValue: 81 }
    ]
  });

  await prisma.teachingSuggestion.createMany({
    data: [
      {
        classRoomId: classRoom.id,
        teacherId: teacherUser.teacherProfile.id,
        title: "先讲错因，不先讲答案",
        action: "挑 2 道高错题做错因拆解。",
        impact: "提升学生自我纠错与方法迁移能力。"
      },
      {
        classRoomId: classRoom.id,
        teacherId: teacherUser.teacherProfile.id,
        title: "对 5 名波动学生做跟进",
        action: "结合课堂反馈和作业完成率做简短一对一沟通。",
        impact: "更早发现学习状态波动的原因。"
      }
    ]
  });

  console.log(`Seeded classroom ${classRoom.name} with ${knowledgePoint.count} knowledge points.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
