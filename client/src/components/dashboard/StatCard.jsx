import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function StatCard({ title, value, icon, color, trend = "+12% this term" }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-200/80 transition-all relative overflow-hidden group"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 font-medium">
            {title}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-2">
            {value}
          </h2>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 w-max px-2.5 py-0.5 rounded-full border border-emerald-100">
            <TrendingUp size={12} />
            <span>{trend}</span>
          </div>
        </div>

        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-200`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}