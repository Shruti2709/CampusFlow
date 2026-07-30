import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createProfile,
  getProfile,
  updateProfile
} from "../services/studentProfileService";


export default function StudentProfile(){

const [editing,setEditing]=useState(false);

const [profile,setProfile]=useState(null);

const [resumeFile,setResumeFile]=useState(null);

const [portfolioFile,setPortfolioFile]=useState(null);


const [form,setForm]=useState({

phone:"",
branch:"",
cgpa:"",
skills:""

});



useEffect(()=>{

loadProfile();

},[]);



const loadProfile=async()=>{

try{

const res = await getProfile();


if(res.data){

setProfile(res.data);

setForm({

phone:res.data.phone || "",

branch:res.data.branch || "",

cgpa:res.data.cgpa || "",

skills:
res.data.skills?.join(", ") || ""

});

}

}catch(error){

console.log(error);

}

};




const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};





const submitHandler=async(e)=>{

e.preventDefault();


try{


const data = new FormData();


data.append(
"phone",
form.phone
);


data.append(
"branch",
form.branch
);


data.append(
"cgpa",
form.cgpa
);


data.append(
"skills",
form.skills
);


if(resumeFile){

data.append(
"resume",
resumeFile
);

}


if(portfolioFile){

data.append(
"portfolio",
portfolioFile
);

}



if(profile){

await updateProfile(data);

toast.success(
"Profile updated"
);

}
else{

await createProfile(data);

toast.success(
"Profile created"
);

}



setEditing(false);

loadProfile();


}catch(error){

toast.error(
error.response?.data?.message ||
"Failed"
);

}

};





return(

<div className="max-w-3xl bg-white rounded-3xl shadow p-8">


<div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold">
Student Profile
</h1>


<button

onClick={()=>setEditing(!editing)}

className="bg-blue-600 text-white px-5 py-2 rounded-xl"

>

{
editing ? "Cancel" : "Edit"
}

</button>


</div>



<form
onSubmit={submitHandler}
className="space-y-5"
>


<input
name="phone"
value={form.phone}
disabled={!editing}
placeholder="Phone"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>



<input
name="branch"
value={form.branch}
disabled={!editing}
placeholder="Branch"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>



<input
name="cgpa"
value={form.cgpa}
disabled={!editing}
placeholder="CGPA"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>



<input
name="skills"
value={form.skills}
disabled={!editing}
placeholder="Skills"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>




{
editing &&

<div>

<label className="text-sm font-medium text-gray-600">
Resume (PDF)
</label>

<input

type="file"

accept=".pdf"

onChange={(e)=>setResumeFile(e.target.files[0])}

className="w-full mt-1"

/>

</div>

}



{
editing &&

<div>

<label className="text-sm font-medium text-gray-600">
Portfolio (PDF)
</label>

<input

type="file"

accept=".pdf"

onChange={(e)=>setPortfolioFile(e.target.files[0])}

className="w-full mt-1"

/>

</div>

}





{
editing &&

<button

className="bg-green-600 text-white px-6 py-3 rounded-xl"

>

Save Changes

</button>

}



</form>



<div className="flex gap-6 mt-6">

{
profile?.resume &&

<a

href={`http://localhost:5000${profile.resume}`}

target="_blank"

className="text-blue-600"

>

View Resume

</a>

}


{
profile?.portfolio &&

<a

href={`http://localhost:5000${profile.portfolio}`}

target="_blank"

className="text-blue-600"

>

View Portfolio

</a>

}

</div>



</div>


);

}
