"use client";

import { useState } from "react";

import type { ParentCorrectionData } from "@/types";

export function UploadPanel() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ParentCorrectionData | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/parent/correct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fileName: fileName || "作业图片.jpg" })
      });

      if (!response.ok) {
        throw new Error("作业批改暂时不可用，请稍后再试。");
      }

      const data = (await response.json()) as ParentCorrectionData;
      setResult(data);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "上传失败。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
        <h2 className="text-xl font-semibold text-ink">上传作业图片</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          当前版本使用 mock OCR 流程，先验证批改结构、错误分析和家长辅导建议输出。
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            作业文件名
            <input
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              placeholder="例如：数学作业-第3课.jpg"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-lake"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "正在生成批改结果..." : "上传并批改"}
          </button>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </form>
      </section>

      <section className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
        <h3 className="text-lg font-semibold text-ink">结果预览</h3>
        {result ? (
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
            <div>
              <p className="font-semibold text-ink">作业</p>
              <p>{result.assignmentTitle}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">总体判断</p>
              <p>{result.summary}</p>
            </div>
            <div>
              <p className="font-semibold text-ink">知识点</p>
              <p>{result.knowledgePoints.join("、")}</p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-slate-600">
            上传后，这里会展示批改摘要、知识点和家长辅导方向。
          </p>
        )}
      </section>
    </div>
  );
}
