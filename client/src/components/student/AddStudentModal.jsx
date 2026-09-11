import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { X, Upload, User, Mail, Phone, GraduationCap, Award, Wrench, Loader2 } from "lucide-react";
import { createStudent } from "../../services/StudentService";

export default function AddStudentModal({ closeModal, refresh }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    cgpa: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please enter student name and email");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "skills") {
          data.append(key, formData[key].split(",").map((s) => s.trim()));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (resume) {
        data.append("resume", resume);
      }

      await createStudent(data);
      toast.success("Student profile successfully registered");
      refresh();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register student");
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
            <h2 className="text-xl font-bold text-slate-900">Register Candidate</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add student credentials for university placement rounds
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
              Full Name *
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="name"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="student@univ.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Academic Branch
              </label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="branch"
                  placeholder="e.g. Computer Science"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current CGPA
              </label>
              <div className="relative">
                <Award size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="cgpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="e.g. 8.75"
                  value={formData.cgpa}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Technical Skills (comma-separated)
            </label>
            <div className="relative">
              <Wrench size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="skills"
                placeholder="React, Node.js, Python, AWS"
                value={formData.skills}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Resume Document (PDF)
            </label>
            <label className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/30 transition-colors group">
              <Upload size={20} className="text-slate-400 group-hover:text-blue-600 mb-1" />
              <span className="text-xs font-semibold text-slate-700">
                {resume ? resume.name : "Choose PDF or click to browse"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Maximum size 10MB</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setResume(e.target.files[0])}
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
              {loading ? "Adding..." : "Add Candidate"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}