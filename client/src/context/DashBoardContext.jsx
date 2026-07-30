import { createContext, useContext, useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const data = await getDashboardStats();
            setStats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardContext.Provider
            value={{
                stats,
                loading,
                refreshDashboard: loadDashboard,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboard = () => useContext(DashboardContext);