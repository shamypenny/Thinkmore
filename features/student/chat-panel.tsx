"use client";

import { useState } from "react";

import type { GuidedMessage, GuidedResponse } from "@/types";

type ChatPanelProps = {
  initialMessages: GuidedMessage[];
  gradeLabel: string;
};

function composeAssistantMessage(reply: GuidedResponse) {
  return [
    `知识点：${reply.knowledgePoints.join("、")}`,
    `回顾提示：${reply.reviewHint}`,
    `启发问题：${reply.guidingQuestion}`,
    `下一步：${reply.studentNextAction}`,
    reply.gentleBoundary
  ].join("\n");
}

export function ChatPanel({ initialMessages, gradeLabel }: ChatPanelProps) {
  const [messages, setMessages] = useState<GuidedMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [latestReply, setLatestReply] = useState<GuidedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;

    const nextStudentMessage: GuidedMessage = {
      id: crypto.randomUUID(),
      sender: "student",
      content: draft.trim()
    };

    const nextHistory = [...messages, nextStudentMessage];
    setMessages(nextHistory);
    setDraft("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/student/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: nextStudentMessage.content,
          history: nextHistory,
          gradeLabel
        })
      });

      if (!response.ok) {
        throw new Error("引导式问答暂时不可用，请稍后重试。");
      }

      const data = (await response.json()) as GuidedResponse;
      setLatestReply(data);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          sender: "assistant",
          content: composeAssistantMessage(data)
        }
      ]);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "提交失败，请重试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink">引导式问答</h2>
            <p className="mt-1 text-sm text-slate-600">当前按 {gradeLabel} 的导学策略生成提示，先识别知识点，再一步一步带学生自己说出关键步骤。</p>
          </div>
          <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-ink">MVP Flow</span>
        </div>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.sender === "assistant" ? "rounded-3xl bg-mist p-4" : "ml-auto max-w-[85%] rounded-3xl bg-lake p-4 text-white"}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
                {message.sender === "assistant" ? "AI 引导" : "学生输入"}
              </p>
              <p className="whitespace-pre-line text-sm leading-7">{message.content}</p>
            </div>
          ))}
        </div>
        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={4}
            placeholder="输入题目或卡住的地方，比如：这道分式方程我不会，能不能直接告诉我答案？"
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lake"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "正在生成引导..." : "继续引导"}
            </button>
            <button
              type="button"
              onClick={() => setDraft("给我一点提示，但先不要直接说答案。")}
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-lake hover:text-lake"
            >
              给一点提示
            </button>
            <button
              type="button"
              onClick={() => setDraft("我还是不会，你带我拆一下这道题的第一步。")}
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-lake hover:text-lake"
            >
              我还是不会
            </button>
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </form>
      </section>

      <aside className="space-y-6">
        <section className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
          <h3 className="text-lg font-semibold text-ink">AI 当前输出结构</h3>
          {latestReply ? (
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
              <div>
                <p className="font-semibold text-ink">knowledge_points</p>
                <p>{latestReply.knowledgePoints.join("、")}</p>
              </div>
              <div>
                <p className="font-semibold text-ink">review_hint</p>
                <p>{latestReply.reviewHint}</p>
              </div>
              <div>
                <p className="font-semibold text-ink">guiding_question</p>
                <p>{latestReply.guidingQuestion}</p>
              </div>
              <div>
                <p className="font-semibold text-ink">student_next_action</p>
                <p>{latestReply.studentNextAction}</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-slate-600">发送一条消息后，这里会展示结构化引导输出。</p>
          )}
        </section>

        <section className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
          <h3 className="text-lg font-semibold text-ink">设计约束</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <li>默认不直接给最终答案。</li>
            <li>先复习知识点，再进入拆题与追问。</li>
            <li>当前会根据学段自动切换语气和引导粒度。</li>
          </ul>
        </section>
      </aside>
    </div>
  );
}