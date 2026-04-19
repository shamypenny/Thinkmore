import type { KnowledgeStatus } from "@/types";

const styles: Record<KnowledgeStatus, string> = {
  strong: "bg-mint text-ink",
  watch: "bg-gold/25 text-amber-800",
  weak: "bg-coral/20 text-rose-700"
};

const labels: Record<KnowledgeStatus, string> = {
  strong: "优势",
  watch: "关注",
  weak: "薄弱"
};

export function StatusPill({ status }: { status: KnowledgeStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{labels[status]}</span>;
}
