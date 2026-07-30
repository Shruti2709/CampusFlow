import { useEffect, useState } from "react";
import { User, Briefcase, Calendar, CheckCircle } from "lucide-react";

import { getDashboardStats } from "../services/dashboardService";


export default function StudentDashboard(){


const [stats,setStats]=useState({
profileComplete:false,
appliedDrives:0,
interviews:0,
placementStatus:"Not Placed"
});


useEffect(()=>{

const loadStats = async()=>{
try{
const response = await getDashboardStats();
setStats(response.data);
}catch(error){
console.log(error);
}
};

loadStats();

},[]);


return (

<>


<h1 className="text-3xl font-bold mb-2">
Welcome Student
</h1>


<p className="text-gray-500 mb-8">
Track your placements and interviews
</p>




<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">


<div className="bg-white p-6 rounded-3xl shadow-sm border">

<User className="text-blue-600 mb-4"/>

<h2 className="text-gray-500">
Profile
</h2>

<p className="text-2xl font-bold">
{stats.profileComplete ? "Complete" : "Incomplete"}
</p>

</div>




<div className="bg-white p-6 rounded-3xl shadow-sm border">

<Briefcase className="text-green-600 mb-4"/>

<h2 className="text-gray-500">
Applied Drives
</h2>

<p className="text-2xl font-bold">
{stats.appliedDrives}
</p>

</div>




<div className="bg-white p-6 rounded-3xl shadow-sm border">

<Calendar className="text-orange-600 mb-4"/>

<h2 className="text-gray-500">
Interviews
</h2>

<p className="text-2xl font-bold">
{stats.interviews}
</p>

</div>




<div className="bg-white p-6 rounded-3xl shadow-sm border">

<CheckCircle className="text-purple-600 mb-4"/>

<h2 className="text-gray-500">
Status
</h2>

<p className="text-2xl font-bold">
{stats.placementStatus}
</p>

</div>


</div>


</>

);

}
