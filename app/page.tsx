import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-card backdrop-blur">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex rounded-full bg-sky px-4 py-1 text-sm font-medium text-ink">
            智学导航 MVP
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              把 AI 从“给答案”改造成“带思考”的教育助手。
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              当前版本先聚焦三个角色：学生端引导式问答、家长端作业批改与辅导建议、教师端学情看板与教学建议。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-full bg-lake px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              进入演示系统
            </Link>
            <Link
              href="/student/chat"
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-lake hover:text-lake"
            >
              预览学生端核心流程
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
