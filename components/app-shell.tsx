import Link from "next/link";

import type { DemoUser, UserRole } from "@/types";

type NavItem = {
  href: string;
  label: string;
};

type AppShellProps = {
  role: UserRole;
  user: DemoUser;
  title: string;
  subtitle: string;
  navItems: NavItem[];
  children: React.ReactNode;
};

const roleLabelMap: Record<UserRole, string> = {
  student: "学生端",
  parent: "家长端",
  teacher: "教师端",
  admin: "管理端"
};

export function AppShell({ role, user, title, subtitle, navItems, children }: AppShellProps) {
  return (
    <main>
      <div className="space-y-6">
        <header className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-lake">
                智学导航 · {roleLabelMap[role]}
              </span>
              <div>
                <h1 className="text-3xl font-bold text-ink">{title}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>
              </div>
            </div>
            <div className="space-y-3 rounded-3xl bg-mist px-5 py-4">
              <p className="text-sm font-semibold text-ink">{user.name}</p>
              <p className="text-sm text-slate-600">{user.subtitle}</p>
              <form action="/api/auth/logout" method="post">
                <button type="submit" className="text-sm font-medium text-lake hover:underline">
                  退出演示登录
                </button>
              </form>
            </div>
          </div>
          <nav className="mt-6 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-lake hover:text-lake"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
      </div>
    </main>
  );
}