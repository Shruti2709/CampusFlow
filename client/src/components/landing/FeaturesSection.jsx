import { motion } from "framer-motion";
import {
  GraduationCap, Building2, CalendarDays, Briefcase, LineChart, FileText,
  MessageSquareWarning, Search, Megaphone,
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
    icon: MessageSquareWarning,
    title: "Complaint management",
    desc: "Students raise hostel, facility, or academic complaints and track resolution.",
  },
  {
    icon: Search,
    title: "Lost & found",
    desc: "Report lost items or post found ones — matched and resolved on campus.",
  },
  {
    icon: CalendarDays,
    title: "Campus events",
    desc: "Workshops, hackathons, seminars, and fests in one shared calendar.",
  },
  {
    icon: Megaphone,
    title: "Smart notice board",
    desc: "Announcements, placement updates, and alerts — no more WhatsApp digging.",
  },
  {
    icon: LineChart,
    title: "Analytics dashboard",
    desc: "Placement stats, complaint trends, and event turnout, visualized live.",
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
            Everything a campus actually needs
          </h2>
          <p className="mt-4 text-slate-400">
            Built to replace the spreadsheet-notice-board-WhatsApp chaos of campus
            life with one connected system — for placements and everything else.
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
