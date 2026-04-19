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

export default async function ParentCorrectionsPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "parent") redirect("/login");

  return (
    <AppShell
      role="parent"
      user={user}
      title="批改结果"
      subtitle="家长看到的不只是对错，还包括错因、知识点和可执行的辅导方法。"
      navItems={navItems}
    >
      <SectionCard title={parentCorrection.assignmentTitle} description={`提交时间：${parentCorrection.submittedAt}`}>
        <div className="space-y-4">
          {parentCorrection.correctionItems.map((item) => (
            <div key={item.topic} className="rounded-3xl border border-slate-100 p-4">
              <p className="font-semibold text-ink">{item.topic}</p>
              <p className="mt-2 text-sm text-slate-500">学生答案：{item.studentAnswer}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">错误分析：{item.feedback}</p>
              <p className="mt-2 text-sm leading-7 text-slate-700">辅导建议：{item.guidanceForParent}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
