import {
LayoutDashboard,
Briefcase,
Calendar,
CalendarDays,
ClipboardList,
Search,
User,
LogOut
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const menus=[

{
name:"Dashboard",
icon:LayoutDashboard,
path:"/student-dashboard"
},

{
name:"Placement Drives",
icon:Briefcase,
path:"/drives"
},

{
name:"Interviews",
icon:Calendar,
path:"/interviews"
},

{
name:"Events",
icon:CalendarDays,
path:"/events"
},

{
name:"Complaints",
icon:ClipboardList,
path:"/complaints"
},

{
name:"Lost & Found",
icon:Search,
path:"/lost-found"
},

{
name:"Profile",
icon:User,
path:"/student-profile"
}

];


export default function StudentSidebar(){


const { logout, user } = useAuth();
const navigate = useNavigate();


return(

<div className="w-72 bg-slate-900 text-white min-h-screen p-8 flex flex-col">


<h1 className="text-3xl font-bold text-blue-400 mb-2">
CampusFlow
</h1>

<p className="text-slate-400 text-sm mb-10">
{user?.name}
</p>



<div className="space-y-3">

{
menus.map((item,index)=>{


const Icon=item.icon;


return(

<Link

key={index}

to={item.path}

className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800"

>

<Icon size={22}/>

{item.name}

</Link>

)

})

}

</div>


<button

onClick={()=>{
logout();
navigate("/login");
}}

className="flex items-center gap-3 mt-auto text-red-400 hover:text-red-300"

>

<LogOut size={20}/>
Logout

</button>


</div>

)

}
