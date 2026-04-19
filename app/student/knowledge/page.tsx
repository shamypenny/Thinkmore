import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatusPill } from "@/components/status-pill";
import { getDemoSession } from "@/lib/auth";
import { studentDashboard } from "@/lib/mock-data/demo";
import { MasteryChart } from "@/features/student/mastery-chart";

const navItems = [
  { href: "/student", label: "工作台" },
  { href: "/student/chat", label: "引导式问答" },
  { href: "/student/knowledge", label: "个人知识点" },
  { href: "/student/insights", label: "学习建议" }
];

export default async function StudentKnowledgePage() {
  const user = await getDemoSession();
  if (!user || user.role !== "student") redirect("/login");

  return (
    <AppShell
      role="student"
      user={user}
      title="个人知识点地图"
      subtitle="知识点页面用于帮助学生看到自己的结构化进展，而不是只盯着单题对错。"
      navItems={navItems}
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="知识点掌握度" description="后续可切换为真实数据库和知识图谱接口。">
          <MasteryChart items={studentDashboard.knowledgeMap} />
        </SectionCard>
        <SectionCard title="当前知识结构" description="每个节点都对应后续错题、复习和引导问答策略。">
          <div className="space-y-4">
            {studentDashboard.knowledgeMap.map((item) => (
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
      </div>
    </AppShell>
  );
}
