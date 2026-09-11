import { useState } from "react";
import { Bell, Search, Calendar, Sparkles, X, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar() {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const hour = new Date().getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17) greeting = "Good Evening";

  const firstName = user?.name ? user.name.split(" ")[0] : "Student";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const notifications = [
    { id: 1, title: "Google Cloud Placement Drive Announced", time: "25m ago", type: "drive" },
    { id: 2, title: "Hostel Wi-Fi issue marked Resolved", time: "1h ago", type: "complaint" },
    { id: 3, title: "Annual Tech Sprint: 180 Teams Joined", time: "3h ago", type: "event" },
  ];

  return (
    <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-7">
      {/* Greeting & Date */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-indigo-700 flex items-center gap-1.5 bg-indigo-50 border border-indigo-200/70 px-2.5 py-0.5 rounded-full">
            <Calendar size={12} />
            {today}
          </span>
          <span className="text-xs text-stone-400 font-medium">· AY 2026-27</span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          {greeting}, {firstName} <span className="inline-block animate-bounce">👋</span>
        </h1>

        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          {user?.role === "admin"
            ? "Campus overview, placement drives & student activity."
            : "Track your drive eligibility, applications & interviews."}
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Search Input */}
        <div className="relative flex-1 md:w-72">
          <Search className="absolute left-3.5 top-3 text-stone-400" size={16} />
          <input
            placeholder="Search drives, students, events..."
            className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 shadow-2xs transition"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-2.5 text-[10px] font-mono-code bg-stone-100 border border-stone-200 text-stone-500 px-1.5 py-0.5 rounded">
            /
          </kbd>
        </div>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900 shadow-2xs transition"
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl z-50 text-stone-800"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-stone-900">Notifications</span>
                    <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                      3 New
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-stone-400 hover:text-stone-600 text-xs"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="divide-y divide-stone-100 mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 first:pt-1 last:pb-1">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-stone-800 leading-snug">{n.title}</p>
                          <span className="text-[10px] text-stone-400 mt-0.5 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}