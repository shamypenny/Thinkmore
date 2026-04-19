import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { getDemoSession } from "@/lib/auth";
import { parentCorrection } from "@/lib/mock-data/demo";

const navItems = [
  { href: "/parent", label: "工作台" },
  { href: "/parent/upload", label: "上传作业" },
  { href: "/parent/corrections", label: "批改结果" },
  { href: "/parent/guidance", label: "辅导建议" }
];

export default async function ParentGuidancePage() {
  const user = await getDemoSession();
  if (!user || user.role !== "parent") redirect("/login");

  return (
    <AppShell
      role="parent"
      user={user}
      title="家长辅导建议"
      subtitle="系统重点输出的是家长应该怎么问、怎么提示，而不是把答案塞给家长。"
      navItems={navItems}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {parentCorrection.parentTips.map((tip) => (
          <SectionCard key={tip} title="建议动作">
            <p className="text-sm leading-7 text-slate-700">{tip}</p>
          </SectionCard>
        ))}
      </div>
    </AppShell>
  );
}
