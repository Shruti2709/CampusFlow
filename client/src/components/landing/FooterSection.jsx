import { GraduationCap } from "lucide-react";

const stack = ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"];

export default function FooterSection() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/10 px-4 py-14">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="font-display font-semibold text-lg text-white">
              CampusFlow
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500 max-w-xs">
            Empowering careers. Simplifying campus recruitment.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
            Built with
          </p>
          <div className="flex flex-wrap gap-2 max-w-xs">
            {stack.map((t) => (
              <span
                key={t}
                className="text-xs text-slate-300 border border-white/10 bg-white/5 rounded-full px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 text-xs text-slate-600">
        © {new Date().getFullYear()} CampusFlow. Built as a campus placement management project.
      </p>
    </footer>
  );
}
