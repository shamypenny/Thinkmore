import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { getDemoSession } from "@/lib/auth";
import { getTeacherDashboard } from "@/lib/services/teacher-insights-service";
import { ClassOverviewChart } from "@/features/teacher/student-table";

const navItems = [
  { href: "/teacher", label: "工作台" },
  { href: "/teacher/students", label: "学生列表" },
  { href: "/teacher/knowledge-gaps", label: "知识点薄弱项" },
  { href: "/teacher/suggestions", label: "教学建议" }
];

export default async function TeacherDashboardPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "teacher") redirect("/login");
  const dashboard = getTeacherDashboard();

  return (
    <AppShell
      role="teacher"
      user={user}
      title="教师工作台"
      subtitle="教师端重点输出班级洞察和可执行建议，帮助快速备课、识别薄弱点和关注学习波动。"
      navItems={navItems}
    >
      <div className="card-grid">
        <StatCard label="活跃学生" value={`${dashboard.activeStudents}`} description={`${dashboard.className} 当前活跃学习人数。`} />
        <StatCard label="作业完成率" value={`${dashboard.completionRate}%`} description="已完成作业占班级应完成总量的比例。" />
        <StatCard label="平均掌握度" value={`${dashboard.averageMastery}%`} description="基于知识点、作业表现和近期学习趋势估算。" />
        <StatCard label="风险学生" value={`${dashboard.riskStudents} 人`} description="近两周出现明显下滑或波动的重点关注对象。" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="班级作业完成概览" description="MVP 阶段先以 mock 班级数据驱动，后续切换到真实数据库聚合。">
          <ClassOverviewChart rows={dashboard.students} />
        </SectionCard>
        <SectionCard title="最值得优先处理的问题" description="先解决高影响、高共性问题。">
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            {dashboard.knowledgeGaps.slice(0, 3).map((item) => (
              <div key={item.topic} className="rounded-3xl bg-mist p-4">
                <p className="font-semibold text-ink">{item.topic}</p>
                <p className="mt-2">受影响比例：{item.affectedRate}%</p>
                <p>{item.recommendation}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
