import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Building2, Trash2, Globe, MapPin, Search, Plus, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { getCompanies, deleteCompany } from "../services/companyService";
import AddCompanyModal from "../components/company/AddCompanyModal";
import { useAuth } from "../context/AuthContext";

export default function Companies() {
  const { user } = useAuth();
  const canManage = user?.role === "admin" || user?.role === "recruiter";

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.data || []);
    } catch (error) {
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this company?")) return;
    try {
      await deleteCompany(id);
      toast.success("Company profile deleted");
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const filteredCompanies = companies.filter((c) => {
    const name = c.name || "";
    const loc = c.location || "";
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || loc.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Recruiting Companies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {canManage
              ? "Onboard and manage corporate partners participating in campus recruitment."
              : "Browse technology & core companies hiring students on campus."}
          </p>
        </div>

        {canManage && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Company Profile
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
        <Search className="text-slate-400 ml-2" size={18} />
        <input
          type="text"
          placeholder="Search by company name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 font-mono-code text-sm">
          Loading company directory...
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto grid place-items-center mb-3">
            <Building2 size={24} />
          </div>
          <h3 className="font-display font-semibold text-slate-900 text-base">
            No Companies Found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? "No companies match your search query."
              : "No company profiles have been created yet."}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <motion.div
              key={company._id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3">
                    {company.logo ? (
                      <img
                        src={`http://localhost:5000${company.logo}`}
                        alt={company.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 grid place-items-center font-display font-bold text-lg">
                        {company.name ? company.name.charAt(0).toUpperCase() : <Building2 size={20} />}
                      </div>
                    )}
                    <div>
                      <h2 className="font-display font-bold text-lg text-slate-900">
                        {company.name}
                      </h2>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="text-slate-400" />
                        {company.location || "Multiple Locations"}
                      </p>
                    </div>
                  </div>

                  {canManage && (
                    <button
                      onClick={() => handleDelete(company._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Remove Company"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {/* Specs */}
                <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Typical Package</span>
                    <span className="font-mono-code font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {company.package || "Competitive"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Eligibility Criteria</span>
                    <span className="text-slate-700 font-medium">
                      {company.eligibility || "Open to all branches"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Website link */}
              {company.website && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    <Globe size={14} className="text-slate-400" />
                    Visit Corporate Careers
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Company Modal */}
      {showModal && (
        <AddCompanyModal
          closeModal={() => setShowModal(false)}
          refresh={fetchCompanies}
        />
      )}
    </div>
  );
}
