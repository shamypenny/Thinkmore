type SectionCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur">
      <div className="mb-5 space-y-1">
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
        {description ? <p className="text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
