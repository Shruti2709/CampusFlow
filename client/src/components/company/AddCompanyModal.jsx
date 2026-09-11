import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { X, Building2, MapPin, DollarSign, Award, Globe, Upload, Loader2 } from "lucide-react";
import { createCompany } from "../../services/companyService";

export default function AddCompanyModal({ closeModal, refresh }) {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    package: "",
    eligibility: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter the company name");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (logo) {
        data.append("logo", logo);
      }

      await createCompany(data);
      toast.success("Recruiting partner onboarded successfully");
      refresh();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add company");
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
            <h2 className="text-xl font-bold text-slate-900">Onboard Hiring Partner</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Register corporate partner profile, criteria, and brand badge
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
              Company Name *
            </label>
            <div className="relative">
              <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="name"
                required
                placeholder="e.g. Microsoft, Google, Razorpay"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Headquarters / Office
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="location"
                  placeholder="e.g. Bengaluru, Hybrid"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Compensation / CTC (LPA)
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="package"
                  placeholder="e.g. 18.5 LPA"
                  value={formData.package}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Eligibility Criteria
              </label>
              <div className="relative">
                <Award size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="eligibility"
                  placeholder="e.g. CGPA >= 7.5, No backlogs"
                  value={formData.eligibility}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Careers / Website URL
              </label>
              <div className="relative">
                <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="website"
                  placeholder="https://company.com/careers"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Brand Logo / Icon (Image)
            </label>
            <label className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/30 transition-colors group">
              <Upload size={20} className="text-slate-400 group-hover:text-blue-600 mb-1" />
              <span className="text-xs font-semibold text-slate-700">
                {logo ? logo.name : "Select company logo (PNG, JPG, SVG)"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">High resolution square recommended</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </label>
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
              {loading ? "Registering..." : "Onboard Partner"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}