import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Registration", desc: "Students create an account and join their branch and batch." },
  { n: "02", title: "Profile & resume", desc: "Complete academic details and upload a resume for recruiters." },
  { n: "03", title: "Drive announced", desc: "The placement cell opens a drive; eligible students are notified." },
  { n: "04", title: "Application & screening", desc: "Students apply; eligibility and CGPA cutoffs are checked automatically." },
  { n: "05", title: "Interview rounds", desc: "Each round and outcome is logged against the student's record." },
  { n: "06", title: "Offer & placement", desc: "Offers are recorded and the student's status updates platform-wide." },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-[#0F172A] py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-lg mx-auto">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest">
            How it works
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold text-white">
            One path, start to offer
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-violet-500/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative flex items-start gap-6 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto md:flex-row-reverse md:text-right"
                }`}
              >
                <span className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white font-display font-bold grid place-items-center text-sm ring-4 ring-[#0F172A]">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
