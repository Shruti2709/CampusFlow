import { motion } from "framer-motion";
import { Filter, FileText, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";

const platformPillars = [
  {
    title: "Automated Cutoff Engine",
    desc: "Instantly verifies student eligibility against company CGPA, department, and backlog criteria before permitting applications.",
    icon: Filter,
    cardBg: "bg-[#edf6ef] border-[#cde6d3]",
    iconColor: "text-[#15803d] bg-white",
  },
  {
    title: "Standardized Resume Vault",
    desc: "Students upload their verified PDF resume and project portfolio once; administrators and recruiters access them in-app.",
    icon: FileText,
    cardBg: "bg-[#f4ecfb] border-[#e4d1f7]",
    iconColor: "text-[#6b21a8] bg-white",
  },
  {
    title: "Interview Round Tracker",
    desc: "Schedules and logs candidate progression across Online Assessments, Technical Interviews, and HR discussions.",
    icon: Calendar,
    cardBg: "bg-[#e8f3fc] border-[#c9e3f8]",
    iconColor: "text-[#1d4ed8] bg-white",
  },
  {
    title: "Grievances & Campus Hub",
    desc: "Digital ticketing for hostel, lab, and campus facility disputes alongside a verified lost and found item registry.",
    icon: ShieldCheck,
    cardBg: "bg-[#fef2e6] border-[#fadbc0]",
    iconColor: "text-[#c2410c] bg-white",
  },
];

export default function StatsSection() {
  return (
    <section className="relative bg-[#faf6f0] pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase font-bold text-[#4338ca] tracking-wider">
            Built For Campus Operations
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1f2937] mt-1">
            Core capabilities designed for university workflows
          </h2>
        </div>

        {/* 4 Pillar Pastel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformPillars.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className={`rounded-2xl border p-5 ${p.cardBg} flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl border border-black/5 flex items-center justify-center ${p.iconColor} mb-3.5 shadow-2xs`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-sm text-[#111827]">{p.title}</h3>
                  <p className="text-xs text-[#4b5563] mt-1.5 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
