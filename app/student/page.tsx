import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { getDemoSession } from "@/lib/auth";
import { studentDashboard } from "@/lib/mock-data/demo";

const navItems = [
  { href: "/student", label: "工作台" },
  { href: "/student/chat", label: "引导式问答" },
  { href: "/student/knowledge", label: "个人知识点" },
  { href: "/student/insights", label: "学习建议" }
];

export default async function StudentDashboardPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "student") redirect("/login");

  return (
    <AppShell
      role="student"
      user={user}
      title="学生工作台"
      subtitle="当前版本重点强化：先回顾知识点，再给提示，再追问下一步，避免直接拿答案。"
      navItems={navItems}
    >
      <div className="card-grid">
        <StatCard label="连续学习" value={`${studentDashboard.streakDays} 天`} description="保持稳定练习节奏，比单次突击更重要。" />
        <StatCard label="本周学习时长" value={`${studentDashboard.weeklyStudyMinutes} 分钟`} description="以可持续为先，不追求单次过长。" />
        <StatCard label="独立思考指数" value={`${studentDashboard.independenceScore}`} description="基于先尝试再求助、是否能复述方法等行为估算。" />
        <StatCard label="当前主攻" value="分式化简" description="建议先补因式分解与约分条件，再做变式题。" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard title="近期薄弱知识点" description="把 AI 的帮助集中用在真正卡住的位置。">
          <div className="space-y-4">
            {studentDashboard.weakAreas.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.subject} · 掌握度 {item.mastery}%</p>
                  </div>
                  <StatusPill status={item.status} />
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.note}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="本周学习建议" description="建议尽量用口头复述和逐步提示替代直接看解法。">
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            {studentDashboard.insights.map((item) => (
              <div key={item.title} className="rounded-3xl bg-mist p-4">
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-2">{item.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
