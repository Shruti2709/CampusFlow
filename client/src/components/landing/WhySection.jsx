import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  ShieldAlert,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";

export default function WhySection() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How does the placement drive cutoff screening work?",
      a: "When a TPO administrator creates a placement drive, they define minimum CGPA, eligible departments, and maximum active backlogs. The portal checks student credentials automatically so only eligible candidates can submit their applications.",
    },
    {
      q: "How do students upload and maintain their resumes?",
      a: "Students upload their official PDF resume and project portfolio in their Student Profile vault. When applying to an eligible drive, the resume is submitted in one click without having to re-upload files every time.",
    },
    {
      q: "What can students file under the Grievance module?",
      a: "Students can submit complaints regarding hostel facilities, Wi-Fi or lab equipment issues, or academic questions. Campus administrators review tickets, assign them, and update status from Open to In Progress to Resolved.",
    },
    {
      q: "How can I test the system as different roles?",
      a: "On the Sign In page, there are 1-Click demo accounts provided for Student, Recruiter, and Campus Administrator so you can test and explore all platform features immediately.",
    },
  ];

  return (
    <section id="why" className="relative bg-[#faf6f0] py-16 px-4 sm:px-6 border-t border-[#ebdcc8]">
      <div className="max-w-6xl mx-auto">
        {/* Comparison Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase font-bold text-[#4338ca] tracking-wider">
            Campus Operations Comparison
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1f2937] mt-1">
            Why universities use CampusFlow
          </h2>
        </div>

        {/* Before vs After Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {/* Manual Process */}
          <div className="rounded-2xl border border-[#f7ced5] bg-[#fdebee] p-6">
            <div className="flex items-center gap-2 text-[#be123c] text-xs uppercase font-bold">
              <ShieldAlert size={15} />
              Manual &amp; Fragmented Workflows
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-[#111827] mt-2">
              WhatsApp groups, email attachments &amp; spreadsheets
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-[#4b5563]">
              {[
                "Students miss drive deadlines lost in long message threads",
                "Manual CGPA verification takes dozens of hours for TPO staff",
                "Resume files get scattered across multiple email inboxes",
                "Hostel and lab maintenance requests get lost without tracking",
                "Lost belongings rely on physical notice boards with low recovery",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle size={15} className="shrink-0 text-[#e11d48] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CampusFlow Solution */}
          <div className="rounded-2xl border border-[#cde6d3] bg-[#edf6ef] p-6 shadow-2xs">
            <div className="flex items-center gap-2 text-[#15803d] text-xs uppercase font-bold">
              <CheckCircle2 size={15} />
              CampusFlow Portal
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-[#111827] mt-2">
              Automated, centralized &amp; transparent
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-[#374151]">
              {[
                "Direct drive notifications with role eligibility and deadlines",
                "Automated CGPA and backlog screening at time of application",
                "Centralized PDF resume vault accessible by administrators",
                "Digital grievance desk with Open → In Progress → Resolved status",
                "Online campus lost & found registry with security desk tracking",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check size={15} className="shrink-0 text-[#16a34a] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-xl sm:text-3xl font-extrabold text-[#111827]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#6b7280] mt-1">
              Common questions about platform capabilities and user accounts.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#ebdcc8] bg-white/90 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#111827] hover:text-[#4338ca] transition"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-lg bg-[#f3ece0] text-[#6b7280] shrink-0 ml-2">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-[#4b5563] leading-relaxed border-t border-[#f3ece0]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Box */}
        <div className="rounded-3xl bg-[#f4ecfb] border border-[#e4d1f7] p-8 sm:p-10 text-center">
          <div className="max-w-xl mx-auto">
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#1e1b4b]">
              Ready to explore CampusFlow?
            </h3>
            <p className="mt-2 text-xs text-[#581c87] leading-relaxed">
              Sign in with your student, recruiter, or administrator account to test the workflows.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-[#4338ca] hover:bg-[#3730a3] text-white font-bold text-xs shadow-2xs transition active:scale-[0.98]"
              >
                Register Free Account
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-[#4338ca] font-bold text-xs border border-[#e4d1f7] transition"
              >
                Sign In with Demo User
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
