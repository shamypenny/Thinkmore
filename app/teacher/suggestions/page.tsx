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

export default async function TeacherSuggestionsPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "teacher") redirect("/login");
  const dashboard = getTeacherDashboard();

  return (
    <AppShell
      role="teacher"
      user={user}
      title="教学建议"
      subtitle="输出尽量短、明确、可执行，教师拿来就能用于下一节课设计。"
      navItems={navItems}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {dashboard.suggestions.map((item) => (
          <SectionCard key={item.title} title={item.title} description={item.expectedImpact}>
            <p className="text-sm leading-7 text-slate-700">{item.action}</p>
          </SectionCard>
        ))}
      </div>
    </AppShell>
  );
}
