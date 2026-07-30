import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import StudentSidebar from "../components/StudentSidebar";

// Wraps every logged-in page with the right sidebar for the user's role,
// so navigation (and routes like /drives, /interviews) stay consistent
// instead of each page reinventing its own layout.
export default function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {user?.role === "student" ? <StudentSidebar /> : <Sidebar />}

      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
