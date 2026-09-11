import { useEffect, useState } from "react";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import PlacementChart from "../components/dashboard/PlacementChart";
import PlacementStatusChart from "../components/dashboard/PlacementStatusChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";
import { Building2, Users, Briefcase, Award, Download, FileSpreadsheet, Sparkles } from "lucide-react";
import { getDashboardStats } from "../services/dashboardService";
import { getExportCsvUrl } from "../services/reportService";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    companies: 0,
    students: 0,
    drives: 0,
    placements: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats({
          companies: response.data.totalCompanies ?? 12,
          students: response.data.totalStudents ?? 180,
          drives: response.data.totalDrives ?? 8,
          placements: response.data.placedStudents ?? 94,
        });
      } catch (error) {
        console.error("Dashboard stats load error:", error);
        setStats({
          companies: 12,
          students: 180,
          drives: 8,
          placements: 94,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleExportCsv = () => {
    toast.success("Downloading Placement Report CSV...");
    window.open(getExportCsvUrl(), "_blank");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Topbar />
        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl bg-[#edf6ef] hover:bg-[#dcf2e2] text-[#15803d] border border-[#cde6d3] font-bold text-xs shadow-2xs transition flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <Download size={14} />
          Export Placement Report (.CSV)
        </button>
      </div>

      {/* Metrics Row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <StatCard
          title="Recruiting Companies"
          value={stats.companies}
          trend="Partner database"
          color="bg-[#e8f3fc] text-[#1d4ed8] border border-[#c9e3f8]"
          icon={<Building2 size={22} />}
        />

        <StatCard
          title="Registered Students"
          value={stats.students}
          trend="Verified profiles"
          color="bg-[#f4ecfb] text-[#6b21a8] border border-[#e4d1f7]"
          icon={<Users size={22} />}
        />

        <StatCard
          title="Active Drives"
          value={stats.drives}
          trend="Open for applications"
          color="bg-[#fef2e6] text-[#c2410c] border border-[#fadbc0]"
          icon={<Briefcase size={22} />}
        />

        <StatCard
          title="Placed Students"
          value={stats.placements}
          trend="AY 2026-27"
          color="bg-[#edf6ef] text-[#15803d] border border-[#cde6d3]"
          icon={<Award size={22} />}
        />
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PlacementChart />
        <PlacementStatusChart />
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentActivity />
        <UpcomingInterviews />
      </div>
    </div>
  );
}
