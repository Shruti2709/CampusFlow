import { motion } from "framer-motion";
import { UserCheck, Filter, FileSpreadsheet, UsersRound, Award } from "lucide-react";

const steps = [
  {
    n: "01",
    stage: "Step 01 · Student Profile Setup",
    title: "Candidate Profile & Resume Registration",
    desc: "Students register their university profile, link their CGPA and department, and upload their official PDF resume and project portfolio.",
    icon: UserCheck,
    color: "bg-[#edf6ef] border-[#cde6d3] text-[#15803d]",
  },
  {
    n: "02",
    stage: "Step 02 · Cutoff Verification",
    title: "Automated Eligibility Matching",
    desc: "TPO officers post placement drives with specific CGPA, allowed branches, and max backlog limits. Eligible candidates get instant apply access.",
    icon: Filter,
    color: "bg-[#f4ecfb] border-[#e4d1f7] text-[#6b21a8]",
  },
  {
    n: "03",
    stage: "Step 03 · Screening & Shortlist",
    title: "Application Review & Shortlisting",
    desc: "Placement administrators and recruiters review applicant lists, inspect PDF resumes in-app, and select candidates for assessment rounds.",
    icon: FileSpreadsheet,
    color: "bg-[#e8f3fc] border-[#c9e3f8] text-[#1d4ed8]",
  },
  {
    n: "04",
    stage: "Step 04 · Interview Logging",
    title: "Multi-Round Interview Scheduling",
    desc: "Schedule online or on-campus interview slots (OA, Technical Round, HR) with specific dates, times, and mode links.",
    icon: UsersRound,
    color: "bg-[#fef2e6] border-[#fadbc0] text-[#c2410c]",
  },
  {
    n: "05",
    stage: "Step 05 · Results & Analytics",
    title: "Outcome Updates & Placement Record",
    desc: "Selected candidates update to 'Placed' in the student database, reflecting in real-time on university placement KPI boards.",
    icon: Award,
    color: "bg-[#edf6ef] border-[#cde6d3] text-[#15803d]",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative bg-[#faf6f0] py-16 px-4 sm:px-6 border-t border-[#ebdcc8]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase font-bold text-[#4338ca] tracking-wider">
            Placement Process
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1f2937] mt-1">
            How placements work on CampusFlow
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4b5563]">
            A step-by-step workflow from student registration to final round selection.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3.5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={`rounded-2xl border p-5 ${s.color} flex flex-col sm:flex-row items-start sm:items-center gap-4`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/90 border border-black/5 flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/70 border border-black/5">
                      {s.stage}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#111827] mt-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#374151] mt-0.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
