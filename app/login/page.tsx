import Link from "next/link";

import { getDemoSession } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getDemoSession();

  return (
    <main>
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-lake">Demo Login</p>
          <h1 className="text-3xl font-bold text-ink">选择角色进入对应工作台</h1>
          <p className="text-slate-600">
            当前版本采用演示登录。后续可以平滑替换为 Auth.js 或企业 SSO。
          </p>
          {session ? (
            <p className="rounded-2xl border border-mint bg-white/80 px-4 py-3 text-sm text-slate-700">
              当前已登录为 {session.name}。你也可以切换到其他角色查看不同端口体验。
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              role: "student",
              title: "学生端",
              desc: "进入引导式问答、知识点与个人学习建议。"
            },
            {
              role: "parent",
              title: "家长端",
              desc: "查看作业上传、批改结果和辅导建议。"
            },
            {
              role: "teacher",
              title: "教师端",
              desc: "查看班级学情看板、知识点薄弱项和教学建议。"
            }
          ].map((item) => (
            <form
              key={item.role}
              action="/api/auth/demo-login"
              method="post"
              className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur"
            >
              <input type="hidden" name="role" value={item.role} />
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
                <button
                  type="submit"
                  className="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  以{item.title}身份进入
                </button>
              </div>
            </form>
          ))}
        </div>

        <Link href="/" className="text-sm font-medium text-lake hover:underline">
          返回首页
        </Link>
      </div>
    </main>
  );
}
