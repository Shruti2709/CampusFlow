import { motion } from "framer-motion";
import { Briefcase, MessageSquareWarning, Search, CalendarDays, Megaphone, ShieldCheck } from "lucide-react";

const modules = [
  {
    icon: Briefcase,
    title: "Placements",
    tag: "Recruiters & students",
    desc: "Drives, applications, interview rounds, and offers — tracked end to end.",
    color: "from-blue-600/20 to-blue-400/10 text-blue-400",
  },
  {
    icon: MessageSquareWarning,
    title: "Complaints",
    tag: "Grievance redressal",
    desc: "Students raise issues, admins triage and resolve them with a visible status.",
    color: "from-rose-600/20 to-rose-400/10 text-rose-400",
  },
  {
    icon: Search,
    title: "Lost & found",
    tag: "Campus recovery",
    desc: "Report lost items or list found ones so belongings get back to owners fast.",
    color: "from-amber-600/20 to-amber-400/10 text-amber-400",
  },
  {
    icon: CalendarDays,
    title: "Campus events",
    tag: "Workshops & fests",
    desc: "One shared calendar for hackathons, seminars, placement talks, and culture fests.",
    color: "from-violet-600/20 to-violet-400/10 text-violet-400",
  },
  {
    icon: Megaphone,
    title: "Notice board",
    tag: "Announcements",
    desc: "Academic notices, hostel alerts, and placement updates in a single feed.",
    color: "from-emerald-600/20 to-emerald-400/10 text-emerald-400",
  },
  {
    icon: ShieldCheck,
    title: "Admin control",
    tag: "Role-based access",
    desc: "One dashboard to manage students, recruiters, drives, and every module above.",
    color: "from-sky-600/20 to-sky-400/10 text-sky-400",
  },
];

export default function ModulesSection() {
  return (
    <section id="modules" className="bg-[#0F172A] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest">
            Not just a placement portal
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-white">
            One platform, every campus module
          </h2>
          <p className="mt-4 text-slate-400">
            CampusFlow is a smart campus management system — placements are one
            module among several that run on the same login, same dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br ${m.color} backdrop-blur p-7`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center mb-5">
                <m.icon size={20} />
              </div>
              <p className="text-xs uppercase tracking-widest text-slate-400">{m.tag}</p>
              <h3 className="font-display mt-1 text-xl font-semibold text-white">
                {m.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
