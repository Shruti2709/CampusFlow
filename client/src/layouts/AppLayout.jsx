import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import StudentSidebar from "../components/StudentSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";

export default function AppLayout() {
  const { user } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-[#fcfbf9] min-h-screen">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-white text-stone-900 px-5 py-3.5 border-b border-stone-200/80 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-xs">
            <GraduationCap size={18} />
          </div>
          <span className="font-display font-extrabold text-base text-stone-900 tracking-tight">
            Campus<span className="text-indigo-600">Flow</span>
          </span>
        </div>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
          aria-label="Toggle navigation drawer"
        >
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:block sticky top-0 h-screen overflow-y-auto shrink-0">
        {user?.role === "student" ? <StudentSidebar /> : <Sidebar />}
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Slide-out drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 w-72 h-full shadow-2xl overflow-y-auto"
              onClick={() => setMobileNavOpen(false)}
            >
              {user?.role === "student" ? <StudentSidebar /> : <Sidebar />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-7 lg:p-9 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-7xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
