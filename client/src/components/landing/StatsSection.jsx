import AnimatedCounter from "./AnimatedCounter";

const partners = [
  "NexaTech", "Verttex Systems", "BluePeak Analytics", "Orbital Softworks",
  "Ferrovia Labs", "Cascade Digital", "Ironleaf Systems", "Meridian Cloud",
];

const stats = [
  { target: 5000, suffix: "+", label: "Students onboarded" },
  { target: 150, suffix: "+", label: "Recruiting partners" },
  { target: 95, suffix: "%", label: "Placement success rate" },
  { target: 250, suffix: "+", label: "Drives run" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0F172A] pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur px-6 py-8 text-center"
            >
              <AnimatedCounter target={s.target} suffix={s.suffix} />
              <p className="mt-2 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 mb-6">
            Sample recruiting partners on the platform
          </p>
          <div className="flex gap-12 whitespace-nowrap animate-[scroll_28s_linear_infinite] w-max">
            {[...partners, ...partners].map((name, i) => (
              <span key={i} className="text-slate-400 font-display font-medium text-lg">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
