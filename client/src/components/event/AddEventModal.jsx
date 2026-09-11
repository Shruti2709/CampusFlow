import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { X, Calendar, Clock, MapPin, Type, AlignLeft, Loader2 } from "lucide-react";
import { createEvent } from "../../services/eventService";

export default function AddEventModal({ closeModal, refresh }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.date) {
      toast.error("Please provide at least an event title and scheduled date");
      return;
    }

    setLoading(true);
    try {
      await createEvent(formData);
      toast.success("Campus event scheduled successfully");
      refresh();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to schedule event");
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
            <h2 className="text-xl font-bold text-slate-900">Schedule Campus Event</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Host a placement pre-talk, technical workshop, or hackathon
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
              Event Title *
            </label>
            <div className="relative">
              <Type size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="title"
                required
                placeholder="e.g. Google Cloud Tech Talk & Career Q&A"
                value={formData.title}
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
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Time / Duration
              </label>
              <div className="relative">
                <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="time"
                  placeholder="e.g. 10:00 AM - 1:00 PM"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Venue / Auditorium / Link
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="location"
                placeholder="e.g. APJ Abdul Kalam Auditorium or Zoom link"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Event Overview & Agenda
            </label>
            <div className="relative">
              <textarea
                name="description"
                rows={3}
                placeholder="Speaker details, eligible branches, prerequisites..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition resize-none"
              />
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
              {loading ? "Publishing..." : "Publish Event"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
