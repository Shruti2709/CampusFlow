import { useEffect,useState } from "react";
import toast from "react-hot-toast";

import {
createInterview
} from "../../services/interviewService";

import {
getStudents
} from "../../services/StudentService";

import {
getCompanies
} from "../../services/companyService";



export default function AddInterviewModal({
closeModal,
refresh
}){


const [students,setStudents]=useState([]);

const [companies,setCompanies]=useState([]);



const [form,setForm]=useState({

student:"",
company:"",
role:"",
date:"",
time:"",
mode:"Online"

});





useEffect(()=>{


getStudents()
.then(res=>setStudents(res.data));


getCompanies()
.then(res=>setCompanies(res.data));


},[]);





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const submit=async(e)=>{


e.preventDefault();


try{


await createInterview(form);


toast.success(
"Interview scheduled"
);


refresh();

closeModal();



}catch(error){

toast.error(
"Failed"
);

}

};





return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5">


<div className="bg-white rounded-3xl p-8 w-full max-w-lg">


<h2 className="text-2xl font-bold mb-6">
Schedule Interview
</h2>



<form
onSubmit={submit}
className="space-y-4"
>


<select
name="student"
onChange={handleChange}
className="w-full border rounded-xl p-3"
>

<option>
Select Student
</option>

{
students.map(s=>(

<option
key={s._id}
value={s._id}
>

{s.name}

</option>

))

}

</select>



<select
name="company"
onChange={handleChange}
className="w-full border rounded-xl p-3"
>

<option>
Select Company
</option>


{
companies.map(c=>(

<option
key={c._id}
value={c._id}
>

{c.name}

</option>

))

}

</select>



<input
name="role"
placeholder="Role"
onChange={handleChange}
className="w-full border rounded-xl p-3"
/>


<input
type="date"
name="date"
onChange={handleChange}
className="w-full border rounded-xl p-3"
/>


<input
name="time"
placeholder="Time"
onChange={handleChange}
className="w-full border rounded-xl p-3"
/>


<select
name="mode"
onChange={handleChange}
className="w-full border rounded-xl p-3"
>

<option>
Online
</option>

<option>
Offline
</option>

</select>



<div className="flex gap-4">


<button
type="button"
onClick={closeModal}
className="flex-1 border rounded-xl py-3"
>

Cancel

</button>



<button
className="flex-1 bg-blue-600 text-white rounded-xl py-3"
>

Save

</button>


</div>



</form>


</div>

</div>

);

}