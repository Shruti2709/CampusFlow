import { useState } from "react";
import toast from "react-hot-toast";

import { createCompany } from "../../services/companyService";


export default function AddCompanyModal({closeModal,refresh}){


const [logo,setLogo]=useState(null);


const [formData,setFormData]=useState({

name:"",
location:"",
package:"",
eligibility:"",
website:""

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


const data = new FormData();



Object.keys(formData).forEach(key=>{

data.append(
key,
formData[key]
);

});



if(logo){

data.append(
"logo",
logo
);

}




await createCompany(data);



toast.success(
"Company added"
);



refresh();

closeModal();



}catch(error){

toast.error(
"Failed to add company"
);


}

};





return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5">


<div className="bg-white rounded-3xl p-8 w-full max-w-lg">


<h2 className="text-2xl font-bold mb-6">
Add Company
</h2>



<form
onSubmit={handleSubmit}
className="space-y-4"
>



<input
name="name"
placeholder="Company Name"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="location"
placeholder="Location"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="package"
placeholder="Package"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="eligibility"
placeholder="Eligibility"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>


<input
name="website"
placeholder="Website"
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>



<input

type="file"

accept="image/*"

onChange={(e)=>setLogo(e.target.files[0])}

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

Add Company

</button>


</div>



</form>



</div>


</div>

);

}