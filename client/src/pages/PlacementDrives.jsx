import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Briefcase, Trash2, Users, ChevronDown, ChevronUp, FileText, FolderOpen, CheckCircle2 } from "lucide-react";

import {
  getDrives,
  deleteDrive,
  registerStudent
} from "../services/driveService";

import AddDriveModal from "../components/drive/AddDriveModal";
import { useAuth } from "../context/AuthContext";



export default function PlacementDrives(){


const { user } = useAuth();

const canManage = user?.role === "admin" || user?.role === "recruiter";
const isStudent = user?.role === "student";

const [drives,setDrives]=useState([]);

const [loading,setLoading]=useState(true);

const [showModal,setShowModal]=useState(false);

const [expandedDrive,setExpandedDrive]=useState(null);




const fetchDrives=async()=>{


try{


const response =
await getDrives();


setDrives(
response.data
);



}catch(error){

toast.error(
"Failed to load drives"
);


}finally{

setLoading(false);

}


};




useEffect(()=>{

fetchDrives();

},[]);




const handleDelete=async(id)=>{


try{


await deleteDrive(id);


toast.success(
"Drive deleted"
);


fetchDrives();



}catch(error){

toast.error(
error.response?.data?.message || "Delete failed"
);

}


};



const handleApply=async(id)=>{

try{

await registerStudent(id, {});

toast.success("Applied successfully");

fetchDrives();

}catch(error){

toast.error(
error.response?.data?.message || "Failed to apply"
);

}

};



const toggleExpanded=(id)=>{

setExpandedDrive(expandedDrive === id ? null : id);

};




return (

<div>


<div className="flex justify-between items-center mb-8">


<div>

<h1 className="text-3xl font-bold">
Placement Drives
</h1>


<p className="text-gray-500">
{
canManage
? "Manage company drives"
: "Open drives you're eligible for"
}
</p>

</div>



{
canManage &&

<button

onClick={()=>setShowModal(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-xl"

>

+ Create Drive

</button>

}


</div>




{
loading

?

<p>
Loading...
</p>


:

drives.length === 0
?
<p className="text-gray-500">No placement drives yet.</p>
:

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


{
drives.map((drive)=>(


<div

key={drive._id}

className="bg-white rounded-3xl p-6 border shadow-sm"

>


<div className="flex justify-between">


<div className="flex gap-3 items-center">


<div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

<Briefcase/>

</div>



<div>

<h2 className="font-bold text-xl">

{drive.company?.name}

</h2>


<p className="text-gray-500">

{drive.role}

</p>


</div>


</div>




{
canManage &&

<button

onClick={()=>handleDelete(drive._id)}

className="text-red-500"

>

<Trash2 size={20}/>

</button>

}


</div>




<div className="mt-5 space-y-2">


<p>
Package: {drive.package}
</p>


<p>
Deadline: {new Date(drive.deadline).toLocaleDateString()}
</p>


<p>
Registered: {drive.registeredStudents?.length || 0}
</p>


<p>
Status: {drive.status}
</p>


</div>



{
isStudent &&

(
drive.registeredStudents?.some((rs)=>rs.user?._id === user?._id)
?
<button

disabled

className="mt-5 w-full bg-slate-200 text-slate-500 py-3 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"

>

<CheckCircle2 size={18}/>
Applied

</button>
:
<button

onClick={()=>handleApply(drive._id)}

className="mt-5 w-full bg-green-600 text-white py-3 rounded-xl font-semibold"

>

Apply

</button>
)

}



{
canManage &&

<button

onClick={()=>toggleExpanded(drive._id)}

className="mt-5 w-full flex items-center justify-center gap-2 border rounded-xl py-3 text-gray-700 font-medium"

>

<Users size={18}/>

{
expandedDrive === drive._id ? "Hide Registered Students" : "View Registered Students"
}

{
expandedDrive === drive._id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>
}

</button>

}



{
canManage && expandedDrive === drive._id &&

<div className="mt-4 space-y-3">

{
drive.registeredStudents?.length === 0
?
<p className="text-gray-500 text-sm">No students have registered yet.</p>
:
drive.registeredStudents?.map((student)=>(

<div

key={student._id}

className="bg-slate-50 border rounded-xl p-4"

>

<p className="font-semibold">
{student.user?.name}
</p>

<p className="text-gray-500 text-sm">
{student.user?.email}
</p>

<div className="flex gap-4 mt-2">

{
student.resume &&

<a

href={`http://localhost:5000${student.resume}`}

target="_blank"

className="flex items-center gap-1 text-blue-600 text-sm"

>

<FileText size={14}/>
Resume

</a>

}

{
student.portfolio &&

<a

href={`http://localhost:5000${student.portfolio}`}

target="_blank"

className="flex items-center gap-1 text-blue-600 text-sm"

>

<FolderOpen size={14}/>
Portfolio

</a>

}

</div>

</div>

))
}

</div>

}



</div>


))

}


</div>

}



{
showModal &&

<AddDriveModal

closeModal={()=>setShowModal(false)}

refresh={fetchDrives}

/>

}



</div>

);

}
