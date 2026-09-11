import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturesSection() {
  const [activeRole, setActiveRole] = useState("student");

  const roles = {
    student: {
      title: "Student Experience",
      tag: "Student Portal",
      badgeBg: "bg-[#edf6ef] text-[#15803d] border-[#cde6d3]",
      headline: "Track drives, verify cutoffs, and lodge grievances seamlessly.",
      features: [
        { title: "Direct CGPA Cutoff Matching", desc: "View only placement drives that match your academic branch, current CGPA, and backlog limit." },
        { title: "One-Click Application", desc: "Your uploaded PDF resume and contact credentials are submitted directly to the placement cell." },
        { title: "Interview Timeline Tracking", desc: "Keep track of scheduled Online Assessments, Technical Rounds, and final HR interview dates." },
        { title: "Campus Help Desks", desc: "Lodge confidential grievances for hostel or lab issues, or report misplaced belongings." },
      ],
      color: "bg-[#edf6ef] border-[#cde6d3]",
    },
    admin: {
      title: "TPO & Campus Administrator",
      tag: "Admin Portal",
      badgeBg: "bg-[#f4ecfb] text-[#6b21a8] border-[#e4d1f7]",
      headline: "Full administrative control over campus drives, candidates, and desks.",
      features: [
        { title: "Drive Management & Eligibility", desc: "Create drives with custom package CTC, minimum CGPA requirements, and deadline dates." },
        { title: "Verified Student Directory", desc: "Search and inspect student records, verify CGPA grade sheets, and download resumes." },
        { title: "Interview Round Scheduling", desc: "Schedule individual assessment slots, set mode to Online (Meet/Zoom) or On-Campus, and update outcomes." },
        { title: "Grievance Redressal Actions", desc: "Assign reported student complaints to maintenance staff and log administrative remarks." },
      ],
      color: "bg-[#f4ecfb] border-[#e4d1f7]",
    },
  };

  const current = roles[activeRole];

  return (
    <section id="features" className="relative bg-[#faf6f0] py-16 px-4 sm:px-6 border-t border-[#ebdcc8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs uppercase font-bold text-[#4338ca] tracking-wider">
            Role-Based Workflows
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1f2937] mt-1">
            Built for students and placement officers
          </h2>

          {/* Role Switcher Toggle */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-[#ede5d8] border border-[#d9cebe]">
            <button
              onClick={() => setActiveRole("student")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeRole === "student"
                  ? "bg-white text-[#111827] shadow-2xs"
                  : "text-[#4b5563] hover:text-[#111827]"
              }`}
            >
              <GraduationCap size={15} className="text-[#15803d]" />
              For Students
            </button>
            <button
              onClick={() => setActiveRole("admin")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeRole === "admin"
                  ? "bg-white text-[#111827] shadow-2xs"
                  : "text-[#4b5563] hover:text-[#111827]"
              }`}
            >
              <ShieldCheck size={15} className="text-[#6b21a8]" />
              For TPO Admins
            </button>
          </div>
        </div>

        {/* Feature Display Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`rounded-3xl border p-6 sm:p-8 ${current.color} shadow-2xs`}
          >
            <div className="max-w-3xl">
              <span className={`text-[11px] uppercase font-bold px-2.5 py-0.5 rounded-md border ${current.badgeBg}`}>
                {current.tag}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-[#111827] mt-2">
                {current.headline}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {current.features.map((f, i) => (
                  <div key={i} className="bg-white/80 rounded-xl p-4 border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 size={16} className="text-[#15803d] shrink-0" />
                      <h4 className="font-bold text-xs sm:text-sm text-[#111827]">{f.title}</h4>
                    </div>
                    <p className="text-xs text-[#4b5563] leading-relaxed pl-6">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl bg-[#4338ca] hover:bg-[#3730a3] text-white font-bold text-xs shadow-2xs transition active:scale-[0.98] inline-flex items-center gap-1.5"
                >
                  <span>Sign In as {activeRole === "student" ? "Student" : "Admin"}</span>
                  <ArrowRight size={13} />
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#374151] border border-black/5 font-bold text-xs transition"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
