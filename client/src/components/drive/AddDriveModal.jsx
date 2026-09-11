import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { X, Building2, Briefcase, DollarSign, Calendar, Loader2 } from "lucide-react";
import { createDrive } from "../../services/driveService";
import { getCompanies } from "../../services/companyService";

export default function AddDriveModal({ closeModal, refresh }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    package: "",
    deadline: "",
  });

  useEffect(() => {
    getCompanies()
      .then((res) => {
        setCompanies(res.data || []);
        if (res.data?.length > 0) {
          setFormData((prev) => ({ ...prev, company: res.data[0]._id }));
        }
      })
      .catch(() => toast.error("Failed to load partner companies"));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) {
      toast.error("Please specify both company and target role");
      return;
    }

    setLoading(true);
    try {
      await createDrive(formData);
      toast.success("Placement drive published successfully");
      refresh();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create drive");
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
            <h2 className="text-xl font-bold text-slate-900">Launch Placement Drive</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Open registration for a verified recruiting drive
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
              Recruiting Company *
            </label>
            <div className="relative">
              <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              >
                <option value="" disabled>
                  Select hiring company
                </option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} {c.package ? `(${c.package})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Role / Designation *
            </label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="role"
                required
                placeholder="e.g. Graduate Software Engineer, Product Analyst"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Compensation / CTC (LPA)
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="package"
                  placeholder="e.g. 14 LPA"
                  value={formData.package}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Application Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
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
              {loading ? "Publishing..." : "Publish Drive"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}