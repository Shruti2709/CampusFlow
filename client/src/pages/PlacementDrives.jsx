import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Briefcase,
  Trash2,
  Users,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  Calendar,
  Search,
  Building2,
  Sparkles,
  Plus,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getDrives, deleteDrive, registerStudent } from "../services/driveService";
import AddDriveModal from "../components/drive/AddDriveModal";
import DriveQABoard from "../components/drive/DriveQABoard";
import { useAuth } from "../context/AuthContext";

export default function PlacementDrives() {
  const { user } = useAuth();
  const canManage = user?.role === "admin" || user?.role === "recruiter";
  const isStudent = user?.role === "student";

  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [expandedDrive, setExpandedDrive] = useState(null);
  const [openQAId, setOpenQAId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDrives = async () => {
    try {
      const response = await getDrives();
      setDrives(response.data || []);
    } catch (error) {
      toast.error("Failed to load placement drives");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this drive?")) return;
    try {
      await deleteDrive(id);
      toast.success("Drive deleted successfully");
      fetchDrives();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleApply = async (id) => {
    try {
      await registerStudent(id, {});
      toast.success("Applied to drive successfully!");
      fetchDrives();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply. Check eligibility.");
    }
  };

  const toggleExpanded = (id) => {
    setExpandedDrive(expandedDrive === id ? null : id);
  };

  const toggleQA = (id) => {
    setOpenQAId(openQAId === id ? null : id);
  };

  const filteredDrives = drives.filter((d) => {
    const company = d.company?.name || "";
    const role = d.role || "";
    const q = searchQuery.toLowerCase();
    return company.toLowerCase().includes(q) || role.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#15803d] bg-[#edf6ef] border border-[#cde6d3] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              Campus Recruitment Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#111827]">
            Placement Drives
          </h1>
          <p className="text-xs sm:text-sm text-[#4b5563] mt-0.5">
            {canManage
              ? "Publish, manage, and review applicants across campus placement drives."
              : "Explore verified drives, review package CTC details, and apply with your profile."}
          </p>
        </div>

        {canManage && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#4338ca] hover:bg-[#3730a3] text-white text-xs sm:text-sm font-bold shadow-2xs transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Placement Drive
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-[#9ca3af]" size={16} />
        <input
          placeholder="Filter drives by role or company name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#ded3c2] bg-white text-xs sm:text-sm text-[#111827] placeholder-[#9ca3af] outline-none focus:border-[#4338ca] shadow-2xs"
        />
      </div>

      {/* Drives Grid */}
      {loading ? (
        <p className="text-center text-xs text-[#6b7280] py-8">Loading active drives...</p>
      ) : filteredDrives.length === 0 ? (
        <div className="rounded-3xl border border-[#ebdcc8] bg-white p-10 text-center text-[#6b7280]">
          <Briefcase size={36} className="mx-auto text-[#9ca3af] mb-2" />
          <p className="font-bold text-sm text-[#111827]">No placement drives found</p>
          <p className="text-xs mt-1">Check back later or adjust search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDrives.map((drive) => {
            const isApplied = isStudent && drive.registeredStudents?.some(
              (s) => s._id === user?._id || s.user === user?._id || s.email === user?.email
            );
            const isExpanded = expandedDrive === drive._id;
            const isQAOpen = openQAId === drive._id;

            return (
              <motion.div
                key={drive._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 border border-[#ded3c2] shadow-xs flex flex-col justify-between hover:border-[#4338ca]/60 transition duration-150"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#e8f3fc] border border-[#c9e3f8] text-[#1d4ed8] font-bold text-sm flex items-center justify-center shrink-0">
                        {drive.company?.name ? drive.company.name.slice(0, 2).toUpperCase() : "DR"}
                      </div>
                      <div>
                        <h2 className="font-bold text-base text-[#111827]">
                          {drive.company?.name || "Company Drive"}
                        </h2>
                        <span className="text-xs font-semibold text-[#4338ca] block">
                          {drive.role}
                        </span>
                      </div>
                    </div>

                    {canManage && (
                      <button
                        onClick={() => handleDelete(drive._id)}
                        className="text-[#ef4444] hover:bg-[#fdebee] p-1.5 rounded-lg transition"
                        title="Delete drive"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  {/* Badges & Meta */}
                  <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-[#f3ece0] mb-4">
                    <div className="p-2 rounded-xl bg-[#edf6ef] border border-[#cde6d3]">
                      <span className="text-[10px] uppercase font-bold text-[#15803d] block">Package CTC</span>
                      <span className="font-bold text-[#166534]">{drive.package || drive.company?.package || "Disclosed in PPT"}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#fef2e6] border border-[#fadbc0]">
                      <span className="text-[10px] uppercase font-bold text-[#9a3412] block">Deadline</span>
                      <span className="font-bold text-[#7c2d12]">
                        {drive.deadline ? new Date(drive.deadline).toLocaleDateString() : "Open"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5 pt-2">
                  {isStudent && (
                    <button
                      onClick={() => handleApply(drive._id)}
                      disabled={isApplied}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isApplied
                          ? "bg-[#edf6ef] text-[#15803d] border border-[#cde6d3] cursor-default"
                          : "bg-[#4338ca] hover:bg-[#3730a3] text-white shadow-2xs"
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 size={14} /> Applied to Drive
                        </>
                      ) : (
                        "Apply with Profile Resume"
                      )}
                    </button>
                  )}

                  {/* Toggle Q&A Board Button */}
                  <button
                    onClick={() => toggleQA(drive._id)}
                    className="w-full py-2 px-3 rounded-xl border border-[#ded3c2] bg-[#faf6f0] hover:bg-[#f3ece0] text-[#374151] text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare size={13} className="text-[#4338ca]" />
                    {isQAOpen ? "Hide Q&A Discussion" : "Q&A Discussion Noticeboard"}
                  </button>

                  {/* Q&A Board Drawer */}
                  <AnimatePresence>
                    {isQAOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <DriveQABoard driveId={drive._id} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Admin View Applicants Dropdown */}
                  {canManage && (
                    <>
                      <button
                        onClick={() => toggleExpanded(drive._id)}
                        className="w-full py-2 px-3 rounded-xl border border-[#ded3c2] text-[#4b5563] hover:bg-[#faf6f0] text-xs font-semibold transition flex items-center justify-center gap-1.5"
                      >
                        <Users size={13} />
                        {isExpanded ? "Hide Applicants" : `Applicants (${drive.registeredStudents?.length || 0})`}
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 space-y-2 overflow-hidden"
                          >
                            {drive.registeredStudents?.length === 0 ? (
                              <p className="text-center text-xs text-[#9ca3af] py-2">
                                No candidates have applied yet.
                              </p>
                            ) : (
                              drive.registeredStudents?.map((student) => (
                                <div
                                  key={student._id}
                                  className="p-3 rounded-xl bg-[#faf6f0] border border-[#ebdcc8] text-xs"
                                >
                                  <p className="font-bold text-[#111827]">
                                    {student.user?.name || student.name || "Student"}
                                  </p>
                                  <p className="text-[#6b7280] text-[11px]">
                                    {student.user?.email || student.email}
                                  </p>
                                  {student.resume && (
                                    <a
                                      href={`http://localhost:5000${student.resume}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[#4338ca] font-bold text-[11px] hover:underline flex items-center gap-1 mt-1.5"
                                    >
                                      <FileText size={11} /> View Resume PDF
                                    </a>
                                  )}
                                </div>
                              ))
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <AddDriveModal
          closeModal={() => setShowModal(false)}
          refresh={fetchDrives}
        />
      )}
    </div>
  );
}
