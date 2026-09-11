import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Briefcase,
  Search,
  CalendarDays,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  User,
  LogIn,
  CheckCircle2,
  Lock,
  Layers
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function HeroSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("drives");

  const handleApplyClick = () => {
    if (!user) {
      toast.error("Please sign in or create an account to view and apply for drives.", {
        icon: "🔒",
      });
      navigate("/login");
    } else {
      navigate("/drives");
    }
  };

  const handleActionClick = (path, name) => {
    if (!user) {
      toast.error(`Please sign in to access the ${name} module.`, {
        icon: "🔒",
      });
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#faf6f0] pt-28 pb-20 px-4 sm:px-6">
      {/* Soft Pastel Background Ambient Accents */}
      <div className="pointer-events-none absolute top-10 left-10 w-80 h-80 rounded-full bg-[#edf6ef] blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-20 right-10 w-80 h-80 rounded-full bg-[#f4ecfb] blur-3xl opacity-70" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-[#fef2e6] blur-3xl opacity-70" />

      <div className="relative max-w-6xl mx-auto">
        {/* Main Headline & Purpose */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Authentic Status Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf6ef] border border-[#cde6d3] text-xs font-bold text-[#15803d] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span>Campus Placement &amp; Student Operations Hub</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1e2029] leading-[1.12]">
            One organized platform for campus placements &amp; student life.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#4b5563] max-w-2xl mx-auto leading-relaxed">
            CampusFlow coordinates recruitment drives, eligibility cutoffs, student resumes,
            grievance ticketing, and college events in one secure, unified portal.
          </p>

          {/* Real Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-xl bg-[#4338ca] hover:bg-[#3730a3] text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-[0.98] flex items-center gap-2"
              >
                <User size={16} />
                Open My Portal Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl bg-[#4338ca] hover:bg-[#3730a3] text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-[0.98] flex items-center gap-2"
                >
                  <LogIn size={15} />
                  Sign In to CampusFlow
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl bg-[#f4ecfb] hover:bg-[#ede0f9] text-[#581c87] border border-[#e4d1f7] font-bold text-xs sm:text-sm transition active:scale-[0.98] flex items-center gap-2"
                >
                  Register New Account
                  <ArrowRight size={14} />
                </Link>
              </>
            )}
          </div>

          {/* Genuine Core Capabilities */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-[#edf6ef] border border-[#cde6d3] text-[#166534]">
              ✓ Automated CGPA &amp; Backlog Cutoffs
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#f4ecfb] border border-[#e4d1f7] text-[#6b21a8]">
              ✓ Verified PDF Resume Vault
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#e8f3fc] border border-[#c9e3f8] text-[#1e40af]">
              ✓ Grievance Redressal Desk
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#fef2e6] border border-[#fadbc0] text-[#9a3412]">
              ✓ Campus Events &amp; Lost &amp; Found
            </span>
          </div>
        </div>

        {/* Live Feature Preview Box (With Real Login Interactivity) */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-3xl border border-[#ded3c2] bg-[#fdfaf5] p-4 sm:p-6 shadow-sm">
            {/* Preview Window Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#ebdcc8]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f87171]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                <span className="text-xs font-bold text-[#4b5563] ml-2">
                  Portal Feature Overview
                </span>
              </div>

              {/* Module Switcher Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#f3ece0] rounded-xl">
                {[
                  { id: "drives", label: "Placement Drives", icon: Briefcase, color: "text-[#4338ca]" },
                  { id: "complaints", label: "Grievances", icon: ShieldCheck, color: "text-[#7c3aed]" },
                  { id: "events", label: "Campus Events", icon: CalendarDays, color: "text-[#0284c7]" },
                  { id: "lostfound", label: "Lost & Found", icon: Search, color: "text-[#b45309]" },
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        isActive
                          ? "bg-white text-[#111827] shadow-2xs border border-[#e5d8c5]"
                          : "text-[#6b7280] hover:text-[#111827]"
                      }`}
                    >
                      <Icon size={13} className={isActive ? t.color : "text-[#9ca3af]"} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Body */}
            <div>
              <AnimatePresence mode="wait">
                {/* 1. DRIVES TAB */}
                {activeTab === "drives" && (
                  <motion.div
                    key="drives"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-[#1f2937] text-sm sm:text-base">
                          Placement Drives Module
                        </h3>
                        <p className="text-xs text-[#6b7280]">
                          TPO administrators post open drives with criteria. Students apply using their verified profile.
                        </p>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#edf6ef] text-[#15803d] border border-[#cde6d3] self-start">
                        Requires Student Login to Apply
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {[
                        {
                          role: "Software Development Engineer",
                          dept: "Computer Science / IT",
                          package: "8.5 – 12.0 LPA",
                          criteria: "CGPA ≥ 7.5, 0 Backlogs",
                          cardBg: "bg-[#e8f3fc] border-[#c9e3f8]",
                          btnBg: "bg-[#1d4ed8] hover:bg-[#1e40af]",
                        },
                        {
                          role: "Associate Systems Engineer",
                          dept: "All Engineering Branches",
                          package: "6.0 – 8.0 LPA",
                          criteria: "CGPA ≥ 6.5, Max 1 Backlog",
                          cardBg: "bg-[#f4ecfb] border-[#e4d1f7]",
                          btnBg: "bg-[#6d28d9] hover:bg-[#5b21b6]",
                        },
                        {
                          role: "Junior Data Analyst",
                          dept: "CSE / IT / Electronics",
                          package: "7.0 – 9.5 LPA",
                          criteria: "CGPA ≥ 7.0, 0 Backlogs",
                          cardBg: "bg-[#fef2e6] border-[#fadbc0]",
                          btnBg: "bg-[#c2410c] hover:bg-[#9a3412]",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`rounded-2xl p-4 border ${item.cardBg} flex flex-col justify-between`}
                        >
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#4b5563] tracking-wider block">
                              Recruitment Drive
                            </span>
                            <h4 className="font-bold text-sm text-[#111827] mt-0.5">{item.role}</h4>
                            <p className="text-xs text-[#4b5563] mt-1">{item.dept}</p>

                            <div className="mt-3 pt-2.5 border-t border-black/5 space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-[#6b7280]">Compensation:</span>
                                <span className="font-bold text-[#111827]">{item.package}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#6b7280]">Criteria:</span>
                                <span className="font-semibold text-[#111827]">{item.criteria}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={handleApplyClick}
                            className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-white bg-[#4338ca] hover:bg-[#3730a3] transition shadow-2xs flex items-center justify-center gap-1.5"
                          >
                            <Lock size={12} />
                            Log In to Apply
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 2. GRIEVANCES TAB */}
                {activeTab === "complaints" && (
                  <motion.div
                    key="complaints"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-[#1f2937] text-sm sm:text-base">
                          Student Grievance Redressal Desk
                        </h3>
                        <p className="text-xs text-[#6b7280]">
                          Students file categorized tickets (Hostel, Academics, Infrastructure); Admins provide resolution updates.
                        </p>
                      </div>
                      <button
                        onClick={() => handleActionClick("/complaints", "Grievances")}
                        className="text-xs font-bold text-[#6b21a8] hover:underline"
                      >
                        File Ticket →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {[
                        {
                          category: "Hostel & Facilities",
                          title: "Hostel Block-A Water Heater Maintenance",
                          status: "Resolved",
                          statusBg: "bg-[#edf6ef] text-[#15803d] border-[#cde6d3]",
                          adminNote: "Heating coil replaced by campus maintenance team.",
                        },
                        {
                          category: "Academic Dispute",
                          title: "Mid-Term Grade Sheet Discrepancy",
                          status: "In Progress",
                          statusBg: "bg-[#fef2e6] text-[#9a3412] border-[#fadbc0]",
                          adminNote: "Assigned to Department Examination Coordinator.",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#f4ecfb] border border-[#e4d1f7] rounded-2xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-[#6b21a8]">{item.category}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.statusBg}`}>
                              {item.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#1e1b4b]">{item.title}</h4>
                          <p className="text-xs text-[#4b5563] bg-white/70 p-2 rounded-lg border border-[#e4d1f7]/60">
                            <strong>Resolution Note:</strong> {item.adminNote}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 3. EVENTS TAB */}
                {activeTab === "events" && (
                  <motion.div
                    key="events"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-[#1f2937] text-sm sm:text-base">
                          Campus Events &amp; Technical Workshops
                        </h3>
                        <p className="text-xs text-[#6b7280]">
                          Pre-placement orientation keynotes, mock interview sessions, and coding competitions.
                        </p>
                      </div>
                      <button
                        onClick={() => handleActionClick("/events", "Events")}
                        className="text-xs font-bold text-[#0369a1] hover:underline"
                      >
                        View Calendar →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {[
                        {
                          title: "Campus Placement Orientation & Resume Workshop",
                          speaker: "TPO Placement Officers",
                          time: "10:00 AM - 01:00 PM",
                          venue: "Main University Auditorium",
                        },
                        {
                          title: "Technical Mock Interviews & Coding Round Prep",
                          speaker: "Alumni Technical Panel",
                          time: "02:30 PM - 05:30 PM",
                          venue: "Computer Science Lab 3",
                        },
                      ].map((ev, idx) => (
                        <div key={idx} className="bg-[#e8f3fc] border border-[#c9e3f8] rounded-2xl p-4 space-y-2">
                          <h4 className="font-bold text-xs sm:text-sm text-[#0c4a6e]">{ev.title}</h4>
                          <p className="text-xs text-[#0369a1]">{ev.speaker}</p>
                          <div className="text-[11px] text-[#475569] flex items-center justify-between pt-1 border-t border-[#c9e3f8]/70">
                            <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                            <span className="flex items-center gap-1"><MapPin size={12} /> {ev.venue}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 4. LOST & FOUND TAB */}
                {activeTab === "lostfound" && (
                  <motion.div
                    key="lostfound"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-[#1f2937] text-sm sm:text-base">
                          Campus Lost &amp; Found Desk
                        </h3>
                        <p className="text-xs text-[#6b7280]">
                          Report misplaced items or check security inventory for returned belongings.
                        </p>
                      </div>
                      <button
                        onClick={() => handleActionClick("/lost-found", "Lost & Found")}
                        className="text-xs font-bold text-[#b45309] hover:underline"
                      >
                        Report Item →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {[
                        {
                          item: "Scientific Calculator (Casio fx-991EX)",
                          loc: "Seminar Hall 3",
                          status: "Found at Security Desk",
                          statusBg: "bg-[#edf6ef] text-[#15803d] border-[#cde6d3]",
                        },
                        {
                          item: "Laptop Power Adapter (Type-C)",
                          loc: "Central Library 2nd Floor",
                          status: "Lost / Missing",
                          statusBg: "bg-[#fdebee] text-[#be123c] border-[#f7ced5]",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#fef2e6] border border-[#fadbc0] rounded-2xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs sm:text-sm text-[#7c2d12]">{item.item}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.statusBg}`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#78350f] flex items-center gap-1">
                            <MapPin size={12} className="text-[#ea580c]" /> Last seen: {item.loc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
