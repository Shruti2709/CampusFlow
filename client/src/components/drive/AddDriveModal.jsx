import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
 createDrive
} from "../../services/driveService";


import {
 getCompanies
} from "../../services/companyService";



export default function AddDriveModal({
closeModal,
refresh
}){


const [companies,setCompanies]=useState([]);


const [formData,setFormData]=useState({

company:"",
role:"",
package:"",
deadline:""

});





useEffect(()=>{


getCompanies()
.then(res=>{

setCompanies(res.data);

});


},[]);





const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};





const handleSubmit=async(e)=>{

e.preventDefault();


try{


await createDrive(formData);


toast.success(
"Drive created"
);


refresh();

closeModal();



}catch(error){

toast.error(
"Failed to create drive"
);

}

};





return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5">


<div className="bg-white rounded-3xl p-8 w-full max-w-lg">


<h2 className="text-2xl font-bold mb-6">
Create Placement Drive
</h2>



<form
onSubmit={handleSubmit}
className="space-y-4"
>



<select

name="company"

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3"

>


<option>
Select Company
</option>


{
companies.map(company=>(

<option
key={company._id}
value={company._id}
>

{company.name}

</option>

))

}


</select>




<input

name="role"

placeholder="Role"

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

type="date"

name="deadline"

onChange={handleChange}

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

Create

</button>



</div>




</form>



</div>


</div>

);

}