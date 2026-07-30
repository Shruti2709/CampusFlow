import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  ClipboardList,
  Search,
  LogOut,
  GraduationCap,
  Briefcase,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


// This sidebar is used by admins and recruiters.
// Students get their own StudentSidebar instead (see AppLayout).
const baseMenus = [

  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    name: "Companies",
    icon: Building2,
    path: "/companies",
  },

  {
    name: "Students",
    icon: GraduationCap,
    path: "/students",
  },

  {
    name: "Placement Drives",
    icon: Briefcase,
    path: "/drives",
  },

  {
    name: "Interviews",
    icon: CalendarDays,
    path: "/interviews",
  },

  {
    name: "Events",
    icon: CalendarDays,
    path: "/events",
    adminOnly: true,
  },

  {
    name: "Complaints",
    icon: ClipboardList,
    path: "/complaints",
    adminOnly: true,
  },

  {
    name: "Lost & Found",
    icon: Search,
    path: "/lost-found",
    adminOnly: true,
  },

];



export default function Sidebar(){


const { logout, user } = useAuth();

const navigate = useNavigate();

const menus = baseMenus.filter(
(item) => !item.adminOnly || user?.role === "admin"
);


return (

<div className="w-72 bg-slate-900 text-white min-h-screen p-8">


<h1 className="text-3xl font-bold text-blue-400 mb-2">
CampusFlow
</h1>

<p className="text-slate-400 text-sm mb-10 capitalize">
{user?.role} · {user?.name}
</p>



<div className="space-y-3">


{
menus.map((item,index)=>{


const Icon = item.icon;


return (

<Link

key={index}

to={item.path}

className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800 transition"

>


<Icon size={22}/>


<span>
{item.name}
</span>


</Link>

);


})
}


</div>




<button

onClick={()=>{

logout();

navigate("/login");

}}

className="flex items-center gap-3 mt-20 text-red-400 hover:text-red-300"

>


<LogOut size={20}/>

Logout


</button>



</div>

);

}
