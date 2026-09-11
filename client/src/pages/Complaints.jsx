import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Home,
  BookOpen,
  Briefcase,
  Building2,
  HelpCircle,
  MessageSquare,
  User,
  Check,
  Send,
  X,
  ShieldAlert
} from "lucide-react";

import {
  getComplaints,
  createComplaint,
  updateComplaintStatus,
} from "../services/complaintService";
import { useAuth } from "../context/AuthContext";

const CATEGORY_CONFIG = {
  Hostel: { icon: Home, color: "text-purple-600 bg-purple-50 border-purple-200/60" },
  Academics: { icon: BookOpen, color: "text-emerald-600 bg-emerald-50 border-emerald-200/60" },
  Placement: { icon: Briefcase, color: "text-blue-600 bg-blue-50 border-blue-200/60" },
  Infrastructure: { icon: Building2, color: "text-amber-600 bg-amber-50 border-amber-200/60" },
  General: { icon: HelpCircle, color: "text-slate-600 bg-slate-100 border-slate-200" },
  Other: { icon: AlertCircle, color: "text-rose-600 bg-rose-50 border-rose-200/60" },
};

export default function Complaints() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [form, setForm] = useState({
    title: "",
    category: "General",
    description: "",
  });

  const fetchComplaints = async () => {
    try {
      const response = await getComplaints();
      setComplaints(response.data || []);
    } catch (error) {
      toast.error("Failed to load grievances");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Please provide both a title and description");
      return;
    }

    setSubmitting(true);
    try {
      await createComplaint(form);
      toast.success("Grievance lodged successfully");
      setForm({ title: "", category: "General", description: "" });
      setShowForm(false);
      fetchComplaints();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit grievance");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, { status });
      toast.success(`Ticket marked as ${status}`);
      fetchComplaints();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  // Metrics
  const openCount = complaints.filter((c) => c.status === "Open").length;
  const inProgressCount = complaints.filter((c) => c.status === "In Progress").length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

  // Filtered
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        c.title?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.student?.name?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q);

      const matchesStatus = selectedStatus === "All" || c.status === selectedStatus;
      const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [complaints, searchQuery, selectedStatus, selectedCategory]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
              <ShieldAlert size={13} />
              Grievance Redressal Cell
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Student Grievances & Support
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isAdmin
              ? "Oversee campus issues, manage administrative resolutions, and respond to tickets."
              : "Raise confidential complaints regarding hostels, academic disputes, or placement drives."}
          </p>
        </div>

        {isStudent && (
          <button
            onClick={() => setShowForm(!showForm)}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              showForm
                ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-md shadow-blue-500/20"
            }`}
          >
            {showForm ? (
              <>
                <X size={16} />
                Cancel
              </>
            ) : (
              <>
                <Plus size={16} />
                Lodge Grievance
              </>
            )}
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <ClipboardList size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{complaints.length}</div>
            <div className="text-xs text-slate-500 font-medium">Total Lodged</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <AlertCircle size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-700">{openCount}</div>
            <div className="text-xs text-slate-500 font-medium">Pending Review</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-700">{inProgressCount}</div>
            <div className="text-xs text-slate-500 font-medium">In Investigation</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-700">{resolvedCount}</div>
            <div className="text-xs text-slate-500 font-medium">Successfully Resolved</div>
          </div>
        </div>
      </div>

      {/* Lodging Form (Student) */}
      <AnimatePresence>
        {isStudent && showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">File a New Grievance</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your request will be routed directly to the designated department administrator
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Issue Title *
                  </label>
                  <input
                    name="title"
                    required
                    placeholder="Brief description of the problem"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Grievance Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  >
                    <option value="General">General Campus Life</option>
                    <option value="Hostel">Hostel & Mess</option>
                    <option value="Academics">Academic Disputes</option>
                    <option value="Placement">Placement Drives & Recruiter Issues</option>
                    <option value="Infrastructure">WiFi / Labs / Infrastructure</option>
                    <option value="Other">Other Specific Concerns</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Detailed Explanation *
                </label>
                <textarea
                  name="description"
                  required
                  placeholder="Provide full context, room numbers, drive names, or specific dates so administrators can act immediately..."
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition"
                >
                  <Send size={15} />
                  {submitting ? "Submitting..." : "Submit Grievance"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search grievance tickets by title, student, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Status Tabs */}
          {["All", "Open", "In Progress", "Resolved"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {st}
            </button>
          ))}

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Categories</option>
            <option value="General">General</option>
            <option value="Hostel">Hostel</option>
            <option value="Academics">Academics</option>
            <option value="Placement">Placement</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Grid of Complaint Cards */}
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs animate-pulse space-y-4"
            >
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-16 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No active grievances</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            {searchQuery || selectedStatus !== "All" || selectedCategory !== "All"
              ? "No tickets match your filter criteria. Try clearing search filters."
              : "All campus operations and student grievances are clear at this time."}
          </p>
          {(searchQuery || selectedStatus !== "All" || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("All");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 rounded-xl"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredComplaints.map((complaint) => {
              const catConf = CATEGORY_CONFIG[complaint.category] || CATEGORY_CONFIG.Other;
              const CatIcon = catConf.icon;

              const isResolved = complaint.status === "Resolved";
              const isInProgress = complaint.status === "In Progress";

              return (
                <motion.div
                  key={complaint._id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${catConf.color}`}
                        >
                          <CatIcon size={20} />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            {complaint.category}
                          </span>
                          <h3 className="font-bold text-slate-900 text-base leading-tight">
                            {complaint.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                          isResolved
                            ? "bg-emerald-100 text-emerald-800"
                            : isInProgress
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isResolved
                              ? "bg-emerald-600"
                              : isInProgress
                              ? "bg-amber-500 animate-ping"
                              : "bg-rose-500"
                          }`}
                        />
                        {complaint.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100">
                      {complaint.description}
                    </p>

                    {/* Student attribution */}
                    {isAdmin && complaint.student && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <User size={13} className="text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700">
                          {complaint.student.name}
                        </span>
                        <span className="text-slate-400">({complaint.student.email})</span>
                      </div>
                    )}

                    {/* Admin remarks */}
                    {complaint.adminRemarks && (
                      <div className="mt-3 text-xs bg-blue-50/80 border border-blue-100 rounded-xl p-3 text-blue-900">
                        <span className="font-bold block mb-0.5">Admin Resolution Remarks:</span>
                        {complaint.adminRemarks}
                      </div>
                    )}
                  </div>

                  {/* Actions for Admin */}
                  {isAdmin && !isResolved && (
                    <div className="pt-4 mt-4 border-t border-slate-100 flex gap-2">
                      {!isInProgress && (
                        <button
                          onClick={() => handleStatusChange(complaint._id, "In Progress")}
                          className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
                        >
                          Mark In Progress
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(complaint._id, "Resolved")}
                        className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition flex items-center justify-center gap-1.5"
                      >
                        <Check size={14} />
                        Resolve Ticket
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
