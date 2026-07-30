import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function LandingNavbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3 shadow-lg shadow-black/20">
        <div className="flex items-center gap-2">
          <div className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-display font-semibold text-lg text-white tracking-tight">
            CampusFlow
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#process" className="hover:text-white transition">How it works</a>
          <a href="#why" className="hover:text-white transition">Why CampusFlow</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-200 hover:text-white transition px-3 py-2"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90 transition shadow-lg shadow-blue-900/30"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
