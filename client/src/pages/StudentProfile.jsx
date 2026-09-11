import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Wrench,
  FileText,
  FolderOpen,
  Edit3,
  CheckCircle2,
  Upload,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Save,
  X,
  Loader2,
  Sparkles
} from "lucide-react";

import {
  createProfile,
  getProfile,
  updateProfile,
} from "../services/studentProfileService";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const getFileUrl = (path) => {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

export default function StudentProfile() {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);

  const [form, setForm] = useState({
    phone: "",
    branch: "",
    cgpa: "",
    skills: "",
  });

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      if (res.data) {
        setProfile(res.data);
        setForm({
          phone: res.data.phone || "",
          branch: res.data.branch || "",
          cgpa: res.data.cgpa || "",
          skills: Array.isArray(res.data.skills)
            ? res.data.skills.join(", ")
            : res.data.skills || "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append("phone", form.phone);
      data.append("branch", form.branch);
      data.append("cgpa", form.cgpa);
      data.append("skills", form.skills);

      if (resumeFile) {
        data.append("resume", resumeFile);
      }
      if (portfolioFile) {
        data.append("portfolio", portfolioFile);
      }

      if (profile) {
        await updateProfile(data);
        toast.success("Profile credentials updated successfully");
      } else {
        await createProfile(data);
        toast.success("Placement profile registered successfully");
      }

      setEditing(false);
      setResumeFile(null);
      setPortfolioFile(null);
      await loadProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Readiness Score calculation
  const fields = [form.phone, form.branch, form.cgpa, form.skills, profile?.resume, profile?.portfolio];
  const filledCount = fields.filter(Boolean).length;
  const readinessPercent = Math.round((filledCount / fields.length) * 100);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ST";

  const parsedSkills = profile?.skills
    ? Array.isArray(profile.skills)
      ? profile.skills
      : profile.skills.split(",").map((s) => s.trim())
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Profile Identity Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  {user?.name || "Student Candidate"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <ShieldCheck size={13} />
                  Verified Candidate
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" />
                  {user?.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-slate-400" />
                  {profile?.branch || "Discipline unassigned"}
                </span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded-md text-[11px]">
                  Batch 2026
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              editing
                ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-md shadow-blue-500/20"
            }`}
          >
            {editing ? (
              <>
                <X size={16} />
                Cancel Edit
              </>
            ) : (
              <>
                <Edit3 size={16} />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Readiness Meter */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Placement Readiness Score: {readinessPercent}%
              </div>
              <div className="text-[11px] text-slate-500">
                {readinessPercent >= 80
                  ? "Profile complete! Eligible for automated Tier-1 drives."
                  : "Complete all fields & upload documents to unlock recruiter direct-shortlisting."}
              </div>
            </div>
          </div>
          <div className="w-full sm:w-48 bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {editing ? (
          /* EDIT FORM MODE */
          <motion.div
            key="edit-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs"
          >
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Edit Academic Profile</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ensure all details match your university grade sheets and records
                </p>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                Autosave Disabled
              </span>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Contact Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Department / Academic Branch
                  </label>
                  <div className="relative">
                    <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="branch"
                      value={form.branch}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science and Engineering"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Cumulative GPA (CGPA)
                  </label>
                  <div className="relative">
                    <Award size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={form.cgpa}
                      onChange={handleChange}
                      placeholder="e.g. 8.85"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Technical Skills (comma-separated)
                  </label>
                  <div className="relative">
                    <Wrench size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="skills"
                      value={form.skills}
                      onChange={handleChange}
                      placeholder="React, TypeScript, Python, Docker"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Uploads Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Update Resume (PDF)
                  </label>
                  <label className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/30 transition-colors group">
                    <Upload size={22} className="text-slate-400 group-hover:text-blue-600 mb-1.5" />
                    <span className="text-xs font-semibold text-slate-700 text-center">
                      {resumeFile ? resumeFile.name : "Select new resume PDF"}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Max 10MB • ATS Friendly</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Update Portfolio / Project Dossier (PDF)
                  </label>
                  <label className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/30 transition-colors group">
                    <Upload size={22} className="text-slate-400 group-hover:text-blue-600 mb-1.5" />
                    <span className="text-xs font-semibold text-slate-700 text-center">
                      {portfolioFile ? portfolioFile.name : "Select portfolio PDF"}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Max 15MB • Projects & Certs</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => setPortfolioFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* DISPLAY MODE */
          <motion.div
            key="display-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">Cumulative GPA</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Award size={16} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {profile?.cgpa ? profile.cgpa : "Not specified"}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  {parseFloat(profile?.cgpa) >= 8.5
                    ? "★ Honors / Tier-1 Eligible"
                    : parseFloat(profile?.cgpa) >= 7.0
                    ? "✓ Standard Drive Eligible"
                    : "Add your latest semester CGPA"}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">Contact Line</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                </div>
                <div className="text-lg font-bold text-slate-900 truncate">
                  {profile?.phone ? profile.phone : "Not provided"}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  Primary SMS & Call for Drive Alerts
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">Academic Major</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <GraduationCap size={16} />
                  </div>
                </div>
                <div className="text-lg font-bold text-slate-900 truncate">
                  {profile?.branch || "Computer Science"}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  Batch of 2026 • 4-Year B.Tech
                </div>
              </div>
            </div>

            {/* Technical Skills Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Wrench size={18} className="text-blue-600" />
                  Verified Skill Stack
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  {parsedSkills.length} skills listed
                </span>
              </div>

              {parsedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {parsedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100/90 text-slate-800 border border-slate-200/70 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-xs text-slate-500">
                    No technical skills added yet. Click &quot;Edit Profile&quot; to list your tech stack.
                  </p>
                </div>
              )}
            </div>

            {/* Document Vault */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FileText size={18} className="text-indigo-600" />
                  Placement Document Vault
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  University Verified Documents
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Resume Card */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">Official Resume</div>
                      <div className="text-[11px] text-slate-500">
                        {profile?.resume ? "PDF Document • Active" : "No resume uploaded"}
                      </div>
                    </div>
                  </div>

                  {profile?.resume ? (
                    <a
                      href={getFileUrl(profile.resume)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
                    >
                      View
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-medium hover:bg-slate-100 transition"
                    >
                      Upload
                    </button>
                  )}
                </div>

                {/* Portfolio Card */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <FolderOpen size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">Project Portfolio</div>
                      <div className="text-[11px] text-slate-500">
                        {profile?.portfolio ? "PDF Dossier • Active" : "No portfolio uploaded"}
                      </div>
                    </div>
                  </div>

                  {profile?.portfolio ? (
                    <a
                      href={getFileUrl(profile.portfolio)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition"
                    >
                      View
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-medium hover:bg-slate-100 transition"
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
