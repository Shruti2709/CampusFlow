import { useState } from "react";
import toast from "react-hot-toast";

import {
 createStudent
} from "../../services/StudentService";



export default function AddStudentModal({
closeModal,
refresh
}){


const [resume,setResume]=useState(null);


const [formData,setFormData]=useState({

name:"",
email:"",
phone:"",
branch:"",
cgpa:"",
skills:""

});





const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};





const handleSubmit=async(e)=>{

e.preventDefault();


try{


const data =
new FormData();



Object.keys(formData).forEach(key=>{


if(key==="skills"){

data.append(
key,
formData[key]
.split(",")
);

}

else{

data.append(
key,
formData[key]
);

}


});




if(resume){

data.append(
"resume",
resume
);

}




await createStudent(data);



toast.success(
"Student added"
);



refresh();

closeModal();



}catch(error){

toast.error(
"Failed to add student"
);

}


};






return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5">


<div className="bg-white rounded-3xl p-8 max-w-lg w-full">


<h2 className="text-2xl font-bold mb-6">
Add Student
</h2>




<form

onSubmit={handleSubmit}

className="space-y-4"

>


<input
name="name"
placeholder="Name"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="email"
placeholder="Email"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="phone"
placeholder="Phone"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="branch"
placeholder="Branch"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="cgpa"
placeholder="CGPA"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="skills"
placeholder="Skills (React, Node, Java)"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>



<input

type="file"

accept=".pdf"

onChange={(e)=>setResume(e.target.files[0])}

className="w-full border rounded-xl px-4 py-3"

/>





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

Add Student

</button>



</div>



</form>



</div>


</div>

);

}