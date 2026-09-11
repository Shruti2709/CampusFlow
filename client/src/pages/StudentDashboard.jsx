import { useEffect, useState } from "react";
import { User, Briefcase, Calendar, CheckCircle2, ArrowRight, FileText, Sparkles, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardStats } from "../services/dashboardService";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    profileComplete: true,
    appliedDrives: 2,
    interviews: 1,
    placementStatus: "In Process",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response.data) {
          setStats({
            profileComplete: response.data.profileComplete ?? true,
            appliedDrives: response.data.appliedDrives ?? 2,
            interviews: response.data.interviews ?? 1,
            placementStatus: response.data.placementStatus ?? "In Process",
          });
        }
      } catch (error) {
        console.error("Student dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const firstName = user?.name ? user.name.split(" ")[0] : "Student";

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-violet-900/10 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono-code uppercase tracking-widest text-indigo-600 font-semibold bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
                Student Placement Portal
              </span>
              <span className="text-xs text-slate-500 font-mono-code">· Active Term</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              Welcome back, {firstName}! 🚀
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Your placement journey is active. Track eligibility, applications, and scheduled rounds.
            </p>
          </div>

          <Link
            to="/drives"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 hover:opacity-90 transition flex items-center gap-1.5"
          >
            Explore Open Drives
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Profile Card */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider font-medium">Profile Status</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 grid place-items-center">
              <User size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              {stats.profileComplete ? "Verified" : "Incomplete"}
            </h3>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 size={12} />
              {stats.profileComplete ? "CGPA & Resume uploaded" : "Action required"}
            </p>
          </div>
        </motion.div>

        {/* Applied Drives */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider font-medium">Applications</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 grid place-items-center">
              <Briefcase size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              {stats.appliedDrives} Drives
            </h3>
            <p className="text-xs text-indigo-600 mt-1 font-medium">
              Under recruiter review
            </p>
          </div>
        </motion.div>

        {/* Scheduled Interviews */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider font-medium">Interviews</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 grid place-items-center">
              <Calendar size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              {stats.interviews} Scheduled
            </h3>
            <p className="text-xs text-amber-600 mt-1 font-medium">
              Check slot &amp; video link
            </p>
          </div>
        </motion.div>

        {/* Current Outcome */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider font-medium">Status</span>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 grid place-items-center">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              {stats.placementStatus}
            </h3>
            <p className="text-xs text-violet-600 mt-1 font-medium">
              Placement Season 2026-27
            </p>
          </div>
        </motion.div>
      </div>

      {/* Candidate Next Steps Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900">
              Placement Readiness Checklist
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow these recommended steps to maximize your campus placement offers.
            </p>
          </div>
          <span className="text-xs font-mono-code text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
            3 of 4 Completed
          </span>
        </div>

        <div className="space-y-3">
          {[
            { title: "Academic Profile Completed", desc: "Phone, branch, and verified CGPA linked", done: true, link: "/student-profile" },
            { title: "Standardized PDF Resume Uploaded", desc: "Available for instant 1-click apply", done: true, link: "/student-profile" },
            { title: "Applied to Active Tier-1 Drives", desc: "Applied to Google Cloud & Microsoft IDC", done: true, link: "/drives" },
            { title: "Prepare for Technical OA & DSA Round", desc: "Review System Design & Algorithms", done: false, link: "/interviews" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.done ? "bg-emerald-500 text-white" : "border-2 border-slate-300 text-transparent"}`}>
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${item.done ? "text-slate-800" : "text-slate-900"}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>

              <Link
                to={item.link}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition"
              >
                View
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
