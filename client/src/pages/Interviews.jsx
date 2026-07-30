import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import { Calendar, Trash2 } from "lucide-react";


import {
getInterviews,
deleteInterview,
updateInterviewStatus
} from "../services/interviewService";


import AddInterviewModal from "../components/interview/AddInterviewModal";
import { useAuth } from "../context/AuthContext";



export default function Interviews(){


const { user } = useAuth();

const canManage = user?.role === "admin" || user?.role === "recruiter";

const [interviews,setInterviews]=useState([]);

const [showModal,setShowModal]=useState(false);




const fetchInterviews=async()=>{

try{


const response =
await getInterviews();


setInterviews(
response.data
);


}catch(error){

toast.error(
"Failed to load interviews"
);

}


};




useEffect(()=>{

fetchInterviews();

},[]);




const removeInterview=async(id)=>{


await deleteInterview(id);


toast.success(
"Interview deleted"
);


fetchInterviews();


};




const changeStatus=async(id,status)=>{


await updateInterviewStatus(
id,
{
status
}
);


fetchInterviews();


};




return (

<div>


<div className="flex justify-between items-center mb-8">


<div>

<h1 className="text-3xl font-bold">
Interviews
</h1>

<p className="text-gray-500">
{
canManage
? "Manage scheduled interviews"
: "Your upcoming and past interviews"
}
</p>

</div>



{
canManage &&

<button

onClick={()=>setShowModal(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-xl"

>

+ Schedule Interview

</button>

}


</div>




{
interviews.length === 0
?
<p className="text-gray-500">No interviews scheduled yet.</p>
:

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


{
interviews.map((item)=>(


<div

key={item._id}

className="bg-white rounded-3xl p-6 border shadow-sm"

>


<div className="flex justify-between">


<div className="flex gap-3">


<div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

<Calendar/>

</div>



<div>

<h2 className="font-bold text-xl">

{item.company?.name}

</h2>


<p className="text-gray-500">

{item.role}

</p>


</div>


</div>



{
canManage &&

<button

onClick={()=>removeInterview(item._id)}

className="text-red-500"

>

<Trash2 size={20}/>

</button>

}


</div>




<div className="mt-5 space-y-2">


<p>
Student: {item.student?.user?.name || item.student?.name}
</p>


<p>
Date: {new Date(item.date).toLocaleDateString()}
</p>


<p>
Time: {item.time}
</p>


<p>
Mode: {item.mode}
</p>



{
canManage
?

<select

value={item.status}

onChange={(e)=>
changeStatus(
item._id,
e.target.value
)
}

className="border rounded-xl px-3 py-2 mt-2"

>

<option>
Scheduled
</option>

<option>
Selected
</option>

<option>
Rejected
</option>


</select>

:

<p className="font-semibold mt-2">
Status: {item.status}
</p>

}


</div>


</div>


))

}


</div>

}




{
showModal &&

<AddInterviewModal

closeModal={()=>setShowModal(false)}

refresh={fetchInterviews}

/>

}


</div>

);

}
