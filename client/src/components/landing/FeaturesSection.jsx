import { motion } from "framer-motion";
import {
  GraduationCap, Building2, CalendarDays, Briefcase, LineChart, FileText,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Student management",
    desc: "Profiles, resumes, CGPA, and eligibility tracked in one place.",
  },
  {
    icon: Building2,
    title: "Company portal",
    desc: "Recruiters open drives, shortlist candidates, and track hiring.",
  },
  {
    icon: CalendarDays,
    title: "Placement drives",
    desc: "Create, schedule, and manage drives without a spreadsheet in sight.",
  },
  {
    icon: Briefcase,
    title: "Interview tracking",
    desc: "Every round and outcome logged, from screening to final offer.",
  },
  {
    icon: LineChart,
    title: "Analytics dashboard",
    desc: "Branch-wise placement stats and trends, visualized as they happen.",
  },
  {
    icon: FileText,
    title: "Resume repository",
    desc: "Centralized resumes with instant preview for recruiters.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#0F172A] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            Platform
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-white">
            Everything a placement cell actually needs
          </h2>
          <p className="mt-4 text-slate-400">
            Built to replace the spreadsheet-and-email chaos of campus recruitment
            with one connected system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-7 hover:-translate-y-1.5 hover:bg-white/[0.07] transition duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 grid place-items-center mb-5">
                <f.icon size={20} className="text-blue-400" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
