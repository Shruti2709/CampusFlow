import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Trash2, FileText, FolderOpen } from "lucide-react";

import {
  getStudents,
  deleteStudent
} from "../services/StudentService";


import AddStudentModal from "../components/student/AddStudentModal";
import { useAuth } from "../context/AuthContext";



export default function Students(){


const { user } = useAuth();

const isAdmin = user?.role === "admin";

const [students,setStudents]=useState([]);

const [loading,setLoading]=useState(true);

const [showModal,setShowModal]=useState(false);





const fetchStudents=async()=>{

try{

const response =
await getStudents();


setStudents(
response.data
);


}catch(error){

toast.error(
"Failed to load students"
);


}finally{

setLoading(false);

}

};




useEffect(()=>{

fetchStudents();

},[]);





const handleDelete=async(id)=>{


try{

await deleteStudent(id);


toast.success(
"Student deleted"
);


fetchStudents();



}catch(error){

toast.error(
"Delete failed"
);

}

};





return (

<div>


<div className="flex justify-between items-center mb-8">


<div>

<h1 className="text-3xl font-bold">
Students
</h1>

<p className="text-gray-500">
{
isAdmin
? "Manage student profiles"
: "Browse student profiles and resumes"
}
</p>

</div>



{
isAdmin &&

<button

onClick={()=>setShowModal(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-xl"

>

+ Add Student

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

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


{
students.map((student)=>(


<div

key={student._id}

className="bg-white rounded-3xl p-6 border shadow-sm"

>


<div className="flex justify-between items-center">


<div className="flex gap-3 items-center">


<div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

<User/>

</div>



<div>

<h2 className="font-bold text-xl">

{student.name}

</h2>


<p className="text-gray-500">

{student.branch}

</p>


</div>


</div>




{
isAdmin &&

<button

onClick={()=>handleDelete(student._id)}

className="text-red-500"

>

<Trash2 size={20}/>

</button>

}


</div>





<div className="mt-5 space-y-2">


<p>
Email: {student.email}
</p>


<p>
CGPA: {student.cgpa}
</p>


<p>
Status: {student.placementStatus}
</p>


<div className="flex flex-wrap gap-2">

{
student.skills?.map((skill,index)=>(

<span

key={index}

className="bg-slate-100 px-3 py-1 rounded-full text-sm"

>

{skill}

</span>


))

}

</div>


<div className="flex gap-4 pt-2">

{
student.resume &&

<a

href={`http://localhost:5000${student.resume}`}

target="_blank"

className="flex items-center gap-1 text-blue-600 text-sm"

>

<FileText size={14}/>
View Resume

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
View Portfolio

</a>

}

{
!student.resume && !student.portfolio &&

<p className="text-gray-400 text-sm">
No resume uploaded yet
</p>

}

</div>


</div>



</div>


))

}


</div>

}





{
showModal &&

<AddStudentModal

closeModal={()=>setShowModal(false)}

refresh={fetchStudents}

/>

}



</div>

);

}
