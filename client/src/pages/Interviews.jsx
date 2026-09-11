import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Calendar, Trash2, Clock, MapPin, Search, Plus, User, Building2, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

import {
  getInterviews,
  deleteInterview,
  updateInterviewStatus,
} from "../services/interviewService";
import AddInterviewModal from "../components/interview/AddInterviewModal";
import { useAuth } from "../context/AuthContext";

export default function Interviews() {
  const { user } = useAuth();
  const canManage = user?.role === "admin" || user?.role === "recruiter";

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInterviews = async () => {
    try {
      const response = await getInterviews();
      setInterviews(response.data || []);
    } catch (error) {
      toast.error("Failed to load scheduled interviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const removeInterview = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this interview schedule?")) return;
    try {
      await deleteInterview(id);
      toast.success("Interview removed");
      fetchInterviews();
    } catch (error) {
      toast.error("Failed to delete interview");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateInterviewStatus(id, { status });
      toast.success(`Candidate marked as ${status}`);
      fetchInterviews();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filtered = interviews.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const company = item.company?.name || "";
    const role = item.role || "";
    const student = item.student?.user?.name || item.student?.name || "";
    const q = searchQuery.toLowerCase();
    const matchesSearch = company.toLowerCase().includes(q) || role.toLowerCase().includes(q) || student.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Scheduled Interviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {canManage
              ? "Coordinate interview rounds, assign candidate slots, and track outcomes."
              : "Review your scheduled technical and HR interview slots and links."}
          </p>
        </div>

        {canManage && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 transition flex items-center gap-2"
          >
            <Plus size={16} />
            Schedule Interview Round
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
          <Search className="text-slate-400 ml-2" size={16} />
          <input
            type="text"
            placeholder="Search by candidate, company, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
          />
        </div>

        <div className="flex gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-xs font-semibold overflow-x-auto">
          {["All", "Scheduled", "Selected", "Rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl transition ${
                statusFilter === s
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 font-mono-code text-sm">
          Loading interview schedules...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto grid place-items-center mb-3">
            <Calendar size={24} />
          </div>
          <h3 className="font-display font-semibold text-slate-900 text-base">
            No Interviews Found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery || statusFilter !== "All"
              ? "No interview schedules match your active filters."
              : "No upcoming interviews are on the calendar."}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const isSelected = item.status === "Selected";
            const isRejected = item.status === "Rejected";

            return (
              <motion.div
                key={item._id}
                whileHover={{ y: -3 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 text-indigo-600 grid place-items-center">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-lg text-slate-900">
                          {item.company?.name || "Partner Firm"}
                        </h2>
                        <p className="text-xs text-slate-500">{item.role || "Technical Round"}</p>
                      </div>
                    </div>

                    {canManage && (
                      <button
                        onClick={() => removeInterview(item._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Remove Interview"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  {/* Student Name */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <User size={13} className="text-slate-400" />
                      Candidate
                    </span>
                    <span className="font-semibold text-slate-800">
                      {item.student?.user?.name || item.student?.name || "Registered Student"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar size={12} />
                        Date
                      </span>
                      <span className="font-medium text-slate-800">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        Time Slot
                      </span>
                      <span className="font-mono-code font-medium text-slate-800">
                        {item.time || "10:00 AM"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin size={12} />
                        Mode / Venue
                      </span>
                      <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.mode || "Virtual Video Link"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher / Badge */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Outcome:</span>

                  {canManage ? (
                    <select
                      value={item.status || "Scheduled"}
                      onChange={(e) => changeStatus(item._id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition ${
                        isSelected
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : isRejected
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Selected">Selected ✓</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : (
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        isSelected
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : isRejected
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {item.status || "Scheduled"}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Schedule Modal */}
      {showModal && (
        <AddInterviewModal
          closeModal={() => setShowModal(false)}
          refresh={fetchInterviews}
        />
      )}
    </div>
  );
}
