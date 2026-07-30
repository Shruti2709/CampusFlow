import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhySection() {
  return (
    <section id="why" className="bg-[#0F172A] pb-24 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            Why CampusFlow
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-white leading-tight">
            Built to replace every disconnected campus tool, not just spreadsheets.
          </h2>
          <p className="mt-5 text-slate-400 leading-relaxed">
            Most campuses run on a patchwork of spreadsheets, WhatsApp groups,
            notice boards, and Google Forms — one system for placements, another
            for complaints, another for lost items, another for events.
            CampusFlow gives students, recruiters, and administrators a single
            source of truth for all of it, in sync automatically.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/15 to-violet-600/15 backdrop-blur p-10 text-center"
        >
          <h3 className="font-display text-2xl font-bold text-white">
            Ready to bring your campus online?
          </h3>
          <p className="mt-3 text-slate-300 text-sm">
            Set up placements, complaints, events, and more in minutes.
          </p>
          <Link
            to="/register"
            className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-900/40 hover:opacity-90 transition"
          >
            Get started free
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
