import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Search,
  MapPin,
  PackageCheck,
  Plus,
  HelpCircle,
  Clock,
  ShieldCheck,
  Send,
  X,
  Sparkles,
  CheckCircle2,
  Tag,
  AlertOctagon,
  User
} from "lucide-react";

import {
  getLostFoundItems,
  createLostFoundItem,
  updateLostFoundStatus,
} from "../services/lostFoundService";
import { useAuth } from "../context/AuthContext";

const QUICK_CATEGORIES = [
  "Student ID Card",
  "Scientific Calculator",
  "Laptop Charger",
  "Water Bottle",
  "Earbuds / Headphones",
  "Keys / Lanyard",
];

export default function LostFound() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    location: "",
  });

  const fetchItems = async () => {
    try {
      const response = await getLostFoundItems();
      setItems(response.data || []);
    } catch (error) {
      toast.error("Failed to load lost & found inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectQuickTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      itemName: prev.itemName ? `${prev.itemName} (${tag})` : tag,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.itemName.trim()) {
      toast.error("Please enter the item name or description");
      return;
    }

    setSubmitting(true);
    try {
      await createLostFoundItem(form);
      toast.success("Lost item notice published across campus");
      setForm({ itemName: "", description: "", location: "" });
      setShowForm(false);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkFound = async (id, itemName) => {
    try {
      await updateLostFoundStatus(id, { status: "Found" });
      toast.success(`"${itemName}" marked as recovered!`);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // Metrics
  const lostCount = items.filter((i) => i.status !== "Found").length;
  const foundCount = items.filter((i) => i.status === "Found").length;
  const recoveryRate = items.length > 0 ? Math.round((foundCount / items.length) * 100) : 0;

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.itemName?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.reportedBy?.name?.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Lost" && item.status !== "Found") ||
        (selectedStatus === "Found" && item.status === "Found");

      return matchesSearch && matchesStatus;
    });
  }, [items, searchQuery, selectedStatus]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
              <ShieldCheck size={13} />
              Campus Asset Recovery Hub
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Lost &amp; Found Registry
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isAdmin
              ? "Oversee campus asset claims, manage security check-ins, and return belongings."
              : "Report misplaced campus items, check found inventories, or mark your recovered items."}
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
                Report Lost Item
              </>
            )}
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <Tag size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{items.length}</div>
            <div className="text-xs text-slate-500 font-medium">Total Reports</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <AlertOctagon size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-700">{lostCount}</div>
            <div className="text-xs text-slate-500 font-medium">Currently Missing</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <PackageCheck size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-700">{foundCount}</div>
            <div className="text-xs text-slate-500 font-medium">Successfully Recovered</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-700">{recoveryRate}%</div>
            <div className="text-xs text-slate-500 font-medium">Campus Recovery Rate</div>
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
                  <h3 className="text-lg font-bold text-slate-900">Report a Misplaced Belonging</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Broadcast details immediately to campus security desks and student portals
                  </p>
                </div>
              </div>

              {/* Quick tags */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Quick Select Common Items:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleSelectQuickTag(cat)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-slate-200/60 transition"
                    >
                      + {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Item Name &amp; Brand *
                  </label>
                  <input
                    name="itemName"
                    required
                    placeholder="e.g. Casio fx-991EX Calculator with name sticker"
                    value={form.itemName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Last Seen Location
                  </label>
                  <input
                    name="location"
                    placeholder="e.g. Library 2nd Floor Reading Room or Canteen"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Distinguishing Features &amp; Color
                </label>
                <textarea
                  name="description"
                  placeholder="Mention scratches, stickers, case color, or unique serial markings..."
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
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
                  {submitting ? "Broadcasting..." : "Publish Lost Notice"}
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
            placeholder="Search items by name, location, or student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          {["All", "Lost", "Found"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {st === "All" ? "All Items" : st === "Lost" ? "Active Missing" : "Recovered"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Lost & Found Items */}
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs animate-pulse space-y-4"
            >
              <div className="h-6 bg-slate-200 rounded w-1/2" />
              <div className="h-4 bg-slate-100 rounded w-1/3" />
              <div className="h-16 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching items found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            {searchQuery || selectedStatus !== "All"
              ? "No belongings match your search query. Try clearing filters."
              : "Great news! No missing campus items are presently recorded."}
          </p>
          {(searchQuery || selectedStatus !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("All");
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
            {filteredItems.map((item) => {
              const isFound = item.status === "Found";
              const isOwner = item.reportedBy?._id === user?._id;

              return (
                <motion.div
                  key={item._id}
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
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${
                            isFound
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                              : "bg-rose-50 text-rose-600 border-rose-200/60"
                          }`}
                        >
                          {isFound ? <PackageCheck size={20} /> : <Search size={20} />}
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Campus Asset
                          </span>
                          <h3 className="font-bold text-slate-900 text-base leading-tight">
                            {item.itemName}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                          isFound
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isFound ? "bg-emerald-600" : "bg-rose-500 animate-ping"
                          }`}
                        />
                        {isFound ? "Recovered & Handed" : "Missing / Lost"}
                      </span>
                    </div>

                    {/* Location */}
                    {item.location && (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        <MapPin size={13} className="text-rose-500 shrink-0" />
                        <span className="truncate">Last seen: {item.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                        {item.description}
                      </p>
                    )}

                    {/* Reporter info */}
                    {(isAdmin || isOwner) && item.reportedBy && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <User size={13} className="text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700">
                          {isOwner ? "Reported by You" : item.reportedBy.name}
                        </span>
                        {item.reportedBy.email && (
                          <span className="text-slate-400">({item.reportedBy.email})</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {!isFound && (isOwner || isAdmin) && (
                    <div className="pt-4 mt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleMarkFound(item._id, item.itemName)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white shadow-xs transition flex items-center justify-center gap-2"
                      >
                        <PackageCheck size={16} />
                        Mark as Claimed &amp; Recovered
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
