import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Trash2,
  FileText,
  FolderOpen,
  Search,
  Filter,
  Plus,
  Mail,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Award,
  ChevronRight,
  Phone
} from "lucide-react";

import { getStudents, deleteStudent } from "../services/StudentService";
import AddStudentModal from "../components/student/AddStudentModal";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const getFileUrl = (path) => {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

export default function Students() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [deletingId, setDeletingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data || []);
    } catch (error) {
      toast.error("Failed to load student directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this student profile?")) return;
    setDeletingId(id);
    try {
      await deleteStudent(id);
      toast.success("Student profile removed");
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete student");
    } finally {
      setDeletingId(null);
    }
  };

  // Branch list derivation
  const branches = useMemo(() => {
    const list = new Set();
    students.forEach((s) => {
      if (s.branch) list.add(s.branch);
    });
    return ["All", ...Array.from(list)];
  }, [students]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.branch?.toLowerCase().includes(q) ||
        s.skills?.some((sk) => sk.toLowerCase().includes(q));

      const matchesBranch = selectedBranch === "All" || s.branch === selectedBranch;
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Placed" && s.placementStatus?.toLowerCase() === "placed") ||
        (selectedStatus === "Unplaced" && s.placementStatus?.toLowerCase() !== "placed");

      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [students, searchQuery, selectedBranch, selectedStatus]);

  // Derived metrics
  const totalCount = students.length;
  const placedCount = students.filter((s) => s.placementStatus?.toLowerCase() === "placed").length;
  const avgCgpa =
    totalCount > 0
      ? (
          students.reduce((acc, s) => acc + (parseFloat(s.cgpa) || 0), 0) /
          (students.filter((s) => s.cgpa).length || 1)
        ).toFixed(2)
      : "0.0";

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
              <GraduationCap size={13} />
              Verified Talent Directory
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Student Profiles
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isAdmin
              ? "Oversee registered batch profiles, verify academic cutoffs, and manage resumes."
              : "Explore verified peer profiles, technical portfolios, and placement credentials."}
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all duration-200"
          >
            <Plus size={18} />
            Add Candidate
          </button>
        )}
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <User size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
            <div className="text-xs text-slate-500 font-medium">Total Candidates</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Award size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-700">{placedCount}</div>
            <div className="text-xs text-slate-500 font-medium">Placed in Tier-1/2</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-700">{avgCgpa}</div>
            <div className="text-xs text-slate-500 font-medium">Cohort Avg CGPA</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Filter size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{branches.length - 1}</div>
            <div className="text-xs text-slate-500 font-medium">Active Disciplines</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by candidate name, skill (e.g. React, Java), email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Branch filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
            <Filter size={14} />
            <span>Branch:</span>
          </div>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="Placed">Placed</option>
            <option value="Unplaced">Seeking Placement</option>
          </select>
        </div>
      </div>

      {/* Grid of Student Cards */}
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs animate-pulse space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
              <div className="h-10 bg-slate-100 rounded-xl" />
              <div className="h-6 bg-slate-100 rounded-full w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={30} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No student profiles found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            {searchQuery || selectedBranch !== "All" || selectedStatus !== "All"
              ? "Try adjusting your search criteria or clearing filters to see available profiles."
              : "Get started by adding student profiles to the campus directory."}
          </p>
          {(searchQuery || selectedBranch !== "All" || selectedStatus !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedBranch("All");
                setSelectedStatus("All");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 rounded-xl"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <motion.div
          layout
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredStudents.map((student) => {
              const cgpaVal = parseFloat(student.cgpa) || 0;
              const isPlaced = student.placementStatus?.toLowerCase() === "placed";

              // Initial avatar color based on name hash
              const initials = student.name
                ? student.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "ST";

              return (
                <motion.div
                  key={student._id}
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
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                          {initials}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                            {student.name}
                          </h3>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">
                            {student.branch || "General Engineering"}
                          </p>
                        </div>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(student._id)}
                          disabled={deletingId === student._id}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete candidate"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Quick Stats Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {/* CGPA Pill */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                          cgpaVal >= 8.5
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            : cgpaVal >= 7.5
                            ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        <Award size={12} />
                        CGPA: {student.cgpa || "N/A"}
                      </span>

                      {/* Placement status pill */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          isPlaced
                            ? "bg-emerald-100/70 text-emerald-800"
                            : "bg-amber-100/70 text-amber-800"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isPlaced ? "bg-emerald-600" : "bg-amber-500"
                          }`}
                        />
                        {student.placementStatus || "Eligible"}
                      </span>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                      {student.email && (
                        <div className="flex items-center gap-2 truncate">
                          <Mail size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate">{student.email}</span>
                        </div>
                      )}
                      {student.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-slate-400 shrink-0" />
                          <span>{student.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Core Competencies
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {student.skills && student.skills.length > 0 ? (
                          student.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">No skills listed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Documents and links */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {student.resume ? (
                        <a
                          href={getFileUrl(student.resume)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          <FileText size={14} />
                          Resume
                          <ExternalLink size={11} className="opacity-70" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">No resume</span>
                      )}

                      {student.portfolio && (
                        <a
                          href={getFileUrl(student.portfolio)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                        >
                          <FolderOpen size={14} />
                          Portfolio
                          <ExternalLink size={11} className="opacity-70" />
                        </a>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium">Batch 2026</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Add Student Modal */}
      {showModal && (
        <AddStudentModal
          closeModal={() => setShowModal(false)}
          refresh={fetchStudents}
        />
      )}
    </div>
  );
}
