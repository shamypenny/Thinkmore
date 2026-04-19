import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { getDemoSession } from "@/lib/auth";
import { getTeacherDashboard } from "@/lib/services/teacher-insights-service";

const navItems = [
  { href: "/teacher", label: "工作台" },
  { href: "/teacher/students", label: "学生列表" },
  { href: "/teacher/knowledge-gaps", label: "知识点薄弱项" },
  { href: "/teacher/suggestions", label: "教学建议" }
];

export default async function TeacherKnowledgeGapsPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "teacher") redirect("/login");
  const dashboard = getTeacherDashboard();

  return (
    <AppShell
      role="teacher"
      user={user}
      title="知识点薄弱项统计"
      subtitle="按受影响比例排序，帮助教师先讲共性错误，再处理个体问题。"
      navItems={navItems}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {dashboard.knowledgeGaps.map((item) => (
          <SectionCard key={item.topic} title={item.topic} description={`${item.subject} · 受影响比例 ${item.affectedRate}%`}>
            <p className="text-sm leading-7 text-slate-700">{item.recommendation}</p>
          </SectionCard>
        ))}
      </div>
    </AppShell>
  );
}
