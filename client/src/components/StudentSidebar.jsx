import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  CalendarDays,
  ClipboardList,
  Search,
  User,
  LogOut,
  GraduationCap,
  Home,
  Sparkles
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const menus = [
  { name: "My Dashboard", icon: LayoutDashboard, path: "/student-dashboard" },
  { name: "Placement Drives", icon: Briefcase, path: "/drives" },
  { name: "My Interviews", icon: Calendar, path: "/interviews" },
  { name: "Mock Assessments", icon: Sparkles, path: "/mock-assessments" },
  { name: "Campus Events", icon: CalendarDays, path: "/events" },
  { name: "Grievances", icon: ClipboardList, path: "/complaints" },
  { name: "Lost & Found", icon: Search, path: "/lost-found" },
  { name: "Student Profile", icon: User, path: "/student-profile" },
];

export default function StudentSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 bg-white border-r border-stone-200/90 text-stone-800 min-h-screen p-6 flex flex-col justify-between shrink-0 shadow-xs">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-5 border-b border-stone-100">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-stone-900 tracking-tight">
                Campus<span className="text-indigo-600">Flow</span>
              </span>
              <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Student Portal
              </span>
            </div>
          </Link>

          <Link
            to="/"
            title="Go to Homepage"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition"
          >
            <Home size={16} />
          </Link>
        </div>

        {/* Student Profile Pill */}
        <div className="mt-4 mb-6 px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-stone-800 truncate max-w-[130px]">
              {user?.name || "Student"}
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Candidate
          </span>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "text-indigo-950 bg-indigo-50/80 border border-indigo-200/70 shadow-2xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                <Icon size={17} className={isActive ? "text-indigo-600" : "text-stone-400"} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeStudentPill"
                    className="ml-auto w-1.5 h-4 rounded-full bg-indigo-600"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-6 border-t border-stone-100 space-y-3">
        <div className="px-3.5 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-purple-900">
          <span className="font-bold flex items-center gap-1.5">
            <Sparkles size={12} className="text-purple-600" /> Tier-1 Readiness
          </span>
          <span className="text-[11px] text-stone-500 block mt-0.5">Resume &amp; CGPA verified</span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-stone-200/80 transition"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
