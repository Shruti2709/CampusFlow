import { GraduationCap, Heart, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function FooterSection() {
  const stack = ["React 19", "Vite", "Node.js", "Express", "MongoDB", "Framer Motion", "Tailwind CSS v4", "JWT Auth"];

  return (
    <footer className="relative bg-[#fcfbf9] border-t border-stone-200/80 px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Brand & Status */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap size={20} />
            </div>
            <span className="font-display font-extrabold text-xl text-stone-900 tracking-tight">
              Campus<span className="text-indigo-600">Flow</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed">
            The next-generation campus operating system connecting students, corporate hiring partners,
            and the training &amp; placement cell in real-time.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            All Services Online · Academic Year 2026-27
          </div>
        </div>

        {/* Col 2: Modules */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-stone-400 font-bold">
            Platform Modules
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
            <li><a href="#preview" className="hover:text-indigo-600 transition">Placement Drives</a></li>
            <li><a href="#preview" className="hover:text-indigo-600 transition">Grievance Redressal</a></li>
            <li><a href="#preview" className="hover:text-indigo-600 transition">Lost &amp; Found Recovery</a></li>
            <li><a href="#preview" className="hover:text-indigo-600 transition">Campus Events &amp; Fests</a></li>
            <li><Link to="/login" className="hover:text-indigo-600 transition">TPO Administration</Link></li>
          </ul>
        </div>

        {/* Col 3: Portal Links */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-stone-400 font-bold">
            Quick Portals
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
            <li><Link to="/login" className="hover:text-indigo-600 transition">Student Sign In</Link></li>
            <li><Link to="/register" className="hover:text-indigo-600 transition">Student Registration</Link></li>
            <li><Link to="/login" className="hover:text-indigo-600 transition">Recruiter Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-indigo-600 transition">Campus Admin Access</Link></li>
          </ul>
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-stone-400 mr-1 font-medium">Stack:</span>
          {stack.map((t) => (
            <span
              key={t}
              className="text-[11px] text-stone-600 border border-stone-200 bg-white rounded-lg px-2 py-0.5 shadow-2xs"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-xs text-stone-500 flex items-center gap-1">
          Crafted with <Heart size={12} className="text-rose-500 fill-rose-500 inline" /> for Collegiate Excellence
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-4 text-center md:text-left text-xs text-stone-400">
        &copy; {new Date().getFullYear()} CampusFlow System. All rights reserved.
      </div>
    </footer>
  );
}
