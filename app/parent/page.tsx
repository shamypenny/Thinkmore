import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { getDemoSession } from "@/lib/auth";
import { parentCorrection } from "@/lib/mock-data/demo";
import { LearningTrendChart } from "@/features/parent/learning-trend-chart";

const navItems = [
  { href: "/parent", label: "工作台" },
  { href: "/parent/upload", label: "上传作业" },
  { href: "/parent/corrections", label: "批改结果" },
  { href: "/parent/guidance", label: "辅导建议" }
];

export default async function ParentDashboardPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "parent") redirect("/login");

  return (
    <AppShell
      role="parent"
      user={user}
      title="家长工作台"
      subtitle="当前版本把重点放在看懂孩子卡在哪里，以及家长该怎么问、怎么带，而不是代替孩子完成作业。"
      navItems={navItems}
    >
      <div className="card-grid">
        <StatCard label="最近一次批改" value="3 题" description="其中 1 题正确，2 题存在可纠正错误。" />
        <StatCard label="本周练习趋势" value="+11 分" description="近 4 周整体稳步上升，但分式相关题仍需重点关注。" />
        <StatCard label="家长辅导重点" value="1 个" description="优先练孩子复述条件和讲出第一步，不急着给结果。" />
        <StatCard label="建议沟通时机" value="20 分钟" description="作业后立即复盘效果最好，避免拖到第二天。" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="学习趋势" description="后续可接入真实作业、成绩和知识点掌握数据。">
          <LearningTrendChart />
        </SectionCard>
        <SectionCard title="本次批改摘要" description={parentCorrection.assignmentTitle}>
          <p className="text-sm leading-7 text-slate-700">{parentCorrection.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {parentCorrection.knowledgePoints.map((item) => (
              <span key={item} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-lake">
                {item}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
