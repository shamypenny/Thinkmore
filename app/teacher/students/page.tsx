import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { getDemoSession } from "@/lib/auth";
import { getTeacherDashboard } from "@/lib/services/teacher-insights-service";
import { StudentTable } from "@/features/teacher/student-table";

const navItems = [
  { href: "/teacher", label: "工作台" },
  { href: "/teacher/students", label: "学生列表" },
  { href: "/teacher/knowledge-gaps", label: "知识点薄弱项" },
  { href: "/teacher/suggestions", label: "教学建议" }
];

export default async function TeacherStudentsPage() {
  const user = await getDemoSession();
  if (!user || user.role !== "teacher") redirect("/login");
  const dashboard = getTeacherDashboard();

  return (
    <AppShell
      role="teacher"
      user={user}
      title="学生列表与学习状态"
      subtitle="先看整体，再定位到具体学生的作业完成率、走势和薄弱点。"
      navItems={navItems}
    >
      <SectionCard title="班级学生概览">
        <StudentTable rows={dashboard.students} />
      </SectionCard>
    </AppShell>
  );
}
