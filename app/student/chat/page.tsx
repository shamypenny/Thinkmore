import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { getDemoSession } from "@/lib/auth";
import { studentDashboard } from "@/lib/mock-data/demo";
import { ChatPanel } from "@/features/student/chat-panel";

const navItems = [
  { href: "/student", label: "工作台" },
  { href: "/student/chat", label: "引导式问答" },
  { href: "/student/knowledge", label: "个人知识点" },
  { href: "/student/insights", label: "学习建议" }
];

export default async function StudentChatPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "student") redirect("/login");

  return (
    <AppShell
      role="student"
      user={user}
      title="引导式问答"
      subtitle="学生提问后，系统优先识别知识点、回顾前置内容、提出一步启发问题，而不是直接输出答案。"
      navItems={navItems}
    >
      <ChatPanel initialMessages={studentDashboard.recentSession} gradeLabel={studentDashboard.gradeLabel} />
    </AppShell>
  );
}