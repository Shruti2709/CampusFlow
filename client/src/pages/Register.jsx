import { useState } from "react";
import { Eye, EyeOff, GraduationCap, Mail, Lock, User, ArrowRight, Home, Sparkles, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const roleOptions = [
    { value: "student", label: "Student", icon: "🎓" },
    { value: "recruiter", label: "Recruiter", icon: "💼" },
    { value: "admin", label: "Campus Admin", icon: "🛡️" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] relative flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Soft Pastel Ambient Glows */}
      <div className="absolute inset-0 bg-pastel-grid opacity-60" />
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-100/60 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-100/60 blur-[90px]" />

      {/* Top Bar Back to Home */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white/90 border border-stone-200/90 px-3.5 py-1.5 rounded-full shadow-2xs backdrop-blur-md transition"
        >
          <Home size={14} />
          Back to Homepage
        </Link>
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-lg rounded-3xl border border-stone-200/90 bg-white p-8 sm:p-10 shadow-xl shadow-stone-900/5"
      >
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-sm mb-3">
            <GraduationCap size={24} />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Join CampusFlow
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Create your account to start managing placements &amp; campus life
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-stone-100/80 border border-stone-200/70">
              {roleOptions.map((r) => {
                const isSelected = formData.role === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: r.value })}
                    className={`relative py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 ${
                      isSelected
                        ? "bg-white text-stone-900 shadow-xs border border-stone-200/80 font-bold"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    <span>{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-stone-400" size={17} />
              <input
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-stone-400" size={17} />
              <input
                name="email"
                type="email"
                placeholder="student@campus.edu"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-stone-400" size={17} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-11 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600 transition"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm shadow-sm transition duration-150 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              <>
                Create Account
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-stone-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}