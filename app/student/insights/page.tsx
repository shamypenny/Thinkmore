import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { getDemoSession } from "@/lib/auth";
import { studentDashboard } from "@/lib/mock-data/demo";

const navItems = [
  { href: "/student", label: "工作台" },
  { href: "/student/chat", label: "引导式问答" },
  { href: "/student/knowledge", label: "个人知识点" },
  { href: "/student/insights", label: "学习建议" }
];

export default async function StudentInsightsPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "student") redirect("/login");

  return (
    <AppShell
      role="student"
      user={user}
      title="学习建议与成长反馈"
      subtitle="用行为数据而不是单次成绩，给出独立思考能力、优势方向和补弱建议。"
      navItems={navItems}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {studentDashboard.insights.map((item) => (
          <SectionCard key={item.title} title={item.title}>
            <p className="text-sm leading-7 text-slate-700">{item.detail}</p>
          </SectionCard>
        ))}
      </div>
    </AppShell>
  );
}
