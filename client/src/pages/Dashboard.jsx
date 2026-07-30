import { useEffect, useState } from "react";

import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";

import PlacementChart from "../components/dashboard/PlacementChart";
import PlacementStatusChart from "../components/dashboard/PlacementStatusChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";

import {
Building2,
Users,
Briefcase,
CircleCheck
} from "lucide-react";


import {
getDashboardStats
} from "../services/dashboardService";



export default function Dashboard(){


const [stats,setStats]=useState({

companies:0,
students:0,
drives:0,
placements:0

});




useEffect(()=>{


const loadStats=async()=>{


try{


const response =
await getDashboardStats();


setStats({
companies: response.data.totalCompanies ?? 0,
students: response.data.totalStudents ?? 0,
drives: response.data.totalDrives ?? 0,
placements: response.data.placedStudents ?? 0,
});


}catch(error){

console.log(error);

}


};


loadStats();


},[]);






return (

<>


<Topbar/>




<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">


<StatCard

title="Companies"

value={stats.companies}

color="bg-blue-600"

icon={<Building2/>}

/>



<StatCard

title="Students"

value={stats.students}

color="bg-green-600"

icon={<Users/>}

/>



<StatCard

title="Placement Drives"

value={stats.drives}

color="bg-orange-500"

icon={<Briefcase/>}

/>



<StatCard

title="Offers"

value={stats.placements}

color="bg-purple-600"

icon={<CircleCheck/>}

/>


</div>




<div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">


<div className="xl:col-span-2">

<PlacementChart/>

</div>


<PlacementStatusChart/>


</div>




<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">


<RecentActivity/>


<UpcomingInterviews/>


</div>


</>

);

}
