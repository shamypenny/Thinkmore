import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { getDemoSession } from "@/lib/auth";
import { UploadPanel } from "@/features/parent/upload-panel";

const navItems = [
  { href: "/parent", label: "工作台" },
  { href: "/parent/upload", label: "上传作业" },
  { href: "/parent/corrections", label: "批改结果" },
  { href: "/parent/guidance", label: "辅导建议" }
];

export default async function ParentUploadPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "parent") redirect("/login");

  return (
    <AppShell
      role="parent"
      user={user}
      title="作业上传与批改"
      subtitle="MVP 阶段采用 mock OCR，但批改结构、错误分析和家长辅导建议已经按真实能力链路拆分。"
      navItems={navItems}
    >
      <UploadPanel />
    </AppShell>
  );
}
