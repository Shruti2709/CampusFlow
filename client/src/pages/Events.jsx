import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MapPin,
  Clock,
  Trash2,
  Plus,
  Search,
  Sparkles,
  ExternalLink,
  Share2,
  Users,
  Building,
  Check
} from "lucide-react";

import { getEvents, deleteEvent } from "../services/eventService";
import AddEventModal from "../components/event/AddEventModal";
import { useAuth } from "../context/AuthContext";

export default function Events() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [registeredIds, setRegisteredIds] = useState(new Set());
  const [deletingId, setDeletingId] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data || []);
    } catch (error) {
      toast.error("Failed to load campus events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel and delete this event?")) return;
    setDeletingId(id);
    try {
      await deleteEvent(id);
      toast.success("Event removed from schedule");
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleRegister = (id, title) => {
    setRegisteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Removed from your saved events schedule", { icon: "ℹ️" });
      } else {
        next.add(id);
        toast.success(`RSVP confirmed for "${title}"!`);
      }
      return next;
    });
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const q = searchQuery.toLowerCase();
      return (
        !searchQuery ||
        ev.title?.toLowerCase().includes(q) ||
        ev.description?.toLowerCase().includes(q) ||
        ev.location?.toLowerCase().includes(q)
      );
    });
  }, [events, searchQuery]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
              <Sparkles size={13} />
              Campus Happenings & Drives
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            University Events & Talks
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isAdmin
              ? "Publish placement orientation sessions, hackathons, and guest keynote talks."
              : "Discover upcoming pre-placement talks, tech symposiums, and hands-on workshops."}
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all duration-200"
          >
            <Plus size={18} />
            Schedule Event
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <CalendarDays size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{events.length}</div>
            <div className="text-xs text-slate-500 font-medium">Scheduled Campus Events</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Check size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-700">{registeredIds.size}</div>
            <div className="text-xs text-slate-500 font-medium">My Bookmarked RSVPs</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3 col-span-2 lg:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Building size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {new Set(events.map((e) => e.location).filter(Boolean)).size}
            </div>
            <div className="text-xs text-slate-500 font-medium">Active Campus Venues</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by keyword, speaker, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-xl"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Grid of Events */}
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs animate-pulse space-y-4"
            >
              <div className="flex gap-4">
                <div className="w-14 h-16 bg-slate-200 rounded-2xl" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-16 bg-slate-100 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarDays size={30} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No events scheduled</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            {searchQuery
              ? "No campus sessions match your search query. Try another keyword."
              : "Check back soon for new seminar dates, technical competitions, and hiring seminars."}
          </p>
        </div>
      ) : (
        <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const monthStr = !isNaN(eventDate)
                ? eventDate.toLocaleString("default", { month: "short" }).toUpperCase()
                : "DATE";
              const dayStr = !isNaN(eventDate) ? eventDate.getDate() : "--";
              const isRegistered = registeredIds.has(event._id);

              return (
                <motion.div
                  key={event._id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header with Date Badge */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Calendar Date Block */}
                      <div className="w-14 h-16 rounded-2xl bg-linear-to-b from-blue-600 to-indigo-600 text-white flex flex-col items-center justify-center shadow-md shadow-blue-500/20 shrink-0 select-none">
                        <span className="text-[10px] font-extrabold tracking-wider leading-none">
                          {monthStr}
                        </span>
                        <span className="text-xl font-black mt-0.5 leading-tight">
                          {dayStr}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                          <span className="font-medium">Campus Drive Session</span>
                        </div>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(event._id)}
                          disabled={deletingId === event._id}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                          title="Cancel event"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Overview description */}
                    {event.description && (
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    {/* Meta info tags */}
                    <div className="space-y-2 mb-4">
                      {event.time && (
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <Clock size={14} className="text-blue-600 shrink-0" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <MapPin size={14} className="text-rose-500 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer RSVP / Bookmark */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleToggleRegister(event._id, event.title)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isRegistered
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                      }`}
                    >
                      {isRegistered ? (
                        <>
                          <Check size={14} />
                          RSVP Confirmed
                        </>
                      ) : (
                        "Save Spot / RSVP"
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Add Event Modal */}
      {showModal && (
        <AddEventModal
          closeModal={() => setShowModal(false)}
          refresh={fetchEvents}
        />
      )}
    </div>
  );
}
