import api from "../api/axios";

export const getPlacementSummary = () => api.get("/reports/summary");
export const getExportCsvUrl = () => {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return `${baseURL}/api/reports/export-csv`;
};
