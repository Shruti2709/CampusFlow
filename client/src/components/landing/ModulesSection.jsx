import { motion } from "framer-motion";
import {
  Briefcase,
  ShieldAlert,
  Search,
  CalendarDays,
  UserCheck,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ModulesSection() {
  const modules = [
    {
      title: "Placement Drives & Applications",
      tag: "Recruitment",
      desc: "Post company job roles, specify CGPA and branch cutoffs, and collect student applications with verified PDF resumes in one click.",
      icon: Briefcase,
      color: "bg-[#e8f3fc] border-[#c9e3f8] text-[#1e40af]",
      accent: "text-[#1d4ed8]",
    },
    {
      title: "Student Portfolio & Vault",
      tag: "Academic Records",
      desc: "Centralized student directory where students update their phone, department, CGPA, verified skill stack, and project dossiers.",
      icon: UserCheck,
      color: "bg-[#f4ecfb] border-[#e4d1f7] text-[#6b21a8]",
      accent: "text-[#6d28d9]",
    },
    {
      title: "Grievance Redressal Desk",
      tag: "Student Support",
      desc: "Students lodge categorized tickets for hostel facilities, academic questions, or campus issues. Administrators log status updates.",
      icon: ShieldAlert,
      color: "bg-[#fdebee] border-[#f7ced5] text-[#9f1239]",
      accent: "text-[#be123c]",
    },
    {
      title: "Campus Events & Hackathons",
      tag: "Campus Life",
      desc: "Schedule placement keynotes, technical workshops, and guest lectures with date, time, venue, and calendar reminders.",
      icon: CalendarDays,
      color: "bg-[#edf6ef] border-[#cde6d3] text-[#15803d]",
      accent: "text-[#16a34a]",
    },
    {
      title: "Campus Lost & Found",
      tag: "Asset Recovery",
      desc: "Report lost items like calculators, ID cards, keys, or chargers, and mark them recovered once claimed at the security desk.",
      icon: Search,
      color: "bg-[#fef2e6] border-[#fadbc0] text-[#9a3412]",
      accent: "text-[#c2410c]",
    },
  ];

  return (
    <section id="modules" className="relative bg-[#faf6f0] py-16 px-4 sm:px-6 border-t border-[#ebdcc8]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase font-bold text-[#4338ca] tracking-wider">
            All-In-One Architecture
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1f2937] mt-1">
            Five core modules for everyday campus operations
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4b5563]">
            Replace disjointed chat groups and spreadsheets with dedicated university tools.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m, index) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-2xl border p-5 ${m.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-white/70 border border-black/5">
                      {m.tag}
                    </span>
                    <Icon size={18} className={m.accent} />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#111827]">{m.title}</h3>
                  <p className="text-xs text-[#374151] mt-1.5 leading-relaxed">{m.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#4b5563]">Included in Portal</span>
                  <Link
                    to="/login"
                    className={`text-xs font-bold ${m.accent} hover:underline inline-flex items-center gap-1`}
                  >
                    Open <ArrowRight size={11} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
