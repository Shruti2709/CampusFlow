import { motion } from "framer-motion";
import { Rocket, BarChart3, CheckCircle2, Clock, Send } from "lucide-react";

const feed = [
  { icon: CheckCircle2, text: "Ananya S. — offer accepted at Verttex Systems", tone: "text-emerald-400" },
  { icon: Send, text: "NexaTech drive — 42 students applied", tone: "text-blue-400" },
  { icon: Clock, text: "Interview round 2 scheduled — BluePeak Analytics", tone: "text-amber-400" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] pt-40 pb-28 px-4">
      {/* gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1e1b4b] to-[#2e1065]" />

      {/* floating glow blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/30 blur-[100px] animate-pulse" />
      <div className="pointer-events-none absolute top-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-violet-600/30 blur-[110px] animate-pulse [animation-delay:1s]" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur px-4 py-1.5 text-sm text-slate-200">
            <Rocket size={14} className="text-blue-400" />
            The complete campus placement platform
          </span>

          <h1 className="font-display mt-7 text-5xl md:text-6xl font-bold leading-[1.05] text-white tracking-tight">
            From registration to
            <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              final offer letter.
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-lg">
            CampusFlow connects students, recruiters, and placement cells on one
            platform — resumes, drives, interviews, and offers, tracked in real time
            instead of scattered across spreadsheets.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#features"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-900/40 hover:opacity-90 transition"
            >
              Explore platform
            </a>
            <a
              href="#process"
              className="px-7 py-3.5 rounded-xl border border-white/15 text-slate-100 font-medium hover:bg-white/5 transition flex items-center gap-2"
            >
              <BarChart3 size={18} />
              See how it works
            </a>
          </div>
        </motion.div>

        {/* live dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between mb-5">
              <p className="text-white font-display font-semibold">Placement Cell — Live</p>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[["94%", "Eligible"], ["61", "Applied"], ["18", "Selected"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-white font-display font-bold text-xl">{n}</p>
                  <p className="text-slate-400 text-xs mt-1">{l}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {feed.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                >
                  <item.icon size={16} className={item.tone} />
                  <p className="text-sm text-slate-200">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
