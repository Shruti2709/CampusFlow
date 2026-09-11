import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { X, User, Building2, Briefcase, Calendar, Clock, Video, MapPin, Loader2 } from "lucide-react";
import { createInterview } from "../../services/interviewService";
import { getStudents } from "../../services/StudentService";
import { getCompanies } from "../../services/companyService";

export default function AddInterviewModal({ closeModal, refresh }) {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    student: "",
    company: "",
    role: "",
    date: "",
    time: "",
    mode: "Online",
  });

  useEffect(() => {
    getStudents()
      .then((res) => {
        setStudents(res.data || []);
        if (res.data?.length > 0) {
          setForm((prev) => ({ ...prev, student: res.data[0]._id }));
        }
      })
      .catch(() => toast.error("Failed to load students"));

    getCompanies()
      .then((res) => {
        setCompanies(res.data || []);
        if (res.data?.length > 0) {
          setForm((prev) => ({ ...prev, company: res.data[0]._id }));
        }
      })
      .catch(() => toast.error("Failed to load companies"));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.student || !form.company || !form.role || !form.date) {
      toast.error("Please fill in candidate, company, role, and date");
      return;
    }

    setLoading(true);
    try {
      await createInterview(form);
      toast.success("Interview round scheduled successfully");
      refresh();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to schedule interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Schedule Interview Slot</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Book a technical or HR assessment round for a candidate
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Candidate Student *
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="student"
                value={form.student}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              >
                <option value="" disabled>
                  Select candidate
                </option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.branch || "General"} • CGPA: {s.cgpa || "N/A"})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Hiring Company *
            </label>
            <div className="relative">
              <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              >
                <option value="" disabled>
                  Select hiring partner
                </option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Interview Role / Round *
            </label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="role"
                required
                placeholder="e.g. SDE-1 Technical Round 1"
                value={form.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Time Slot
              </label>
              <div className="relative">
                <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="time"
                  placeholder="e.g. 02:30 PM"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Interview Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-semibold transition ${
                  form.mode === "Online"
                    ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value="Online"
                  checked={form.mode === "Online"}
                  onChange={handleChange}
                  className="hidden"
                />
                <Video size={16} />
                Online (Google Meet / Zoom)
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-semibold transition ${
                  form.mode === "Offline"
                    ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value="Offline"
                  checked={form.mode === "Offline"}
                  onChange={handleChange}
                  className="hidden"
                />
                <MapPin size={16} />
                On-Campus (Placement Cell)
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Scheduling..." : "Confirm Schedule"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}