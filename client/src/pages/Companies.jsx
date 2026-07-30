import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Building2, Trash2 } from "lucide-react";

import {
  getCompanies,
  deleteCompany
} from "../services/companyService";

import AddCompanyModal from "../components/company/AddCompanyModal";
import { useAuth } from "../context/AuthContext";



export default function Companies(){


const { user } = useAuth();

const canManage = user?.role === "admin" || user?.role === "recruiter";

const [companies,setCompanies]=useState([]);

const [loading,setLoading]=useState(true);

const [showModal,setShowModal]=useState(false);




const fetchCompanies=async()=>{


try{


const response =
await getCompanies();


setCompanies(
response.data
);



}catch(error){


toast.error(
"Failed to load companies"
);



}finally{

setLoading(false);

}


};




useEffect(()=>{

fetchCompanies();

},[]);




const handleDelete=async(id)=>{


try{


await deleteCompany(id);


toast.success(
"Company deleted"
);


fetchCompanies();



}catch(error){


toast.error(
error.response?.data?.message || "Delete failed"
);


}


};




return (

<div>



<div className="flex justify-between items-center mb-8">


<div>

<h1 className="text-3xl font-bold">
Companies
</h1>


<p className="text-gray-500">
{
canManage
? "Manage placement companies"
: "Browse companies hiring on campus"
}
</p>

</div>



{
canManage &&

<button

onClick={()=>setShowModal(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-xl"

>

+ Add Company

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

companies.length === 0
?
<p className="text-gray-500">No companies yet.</p>
:

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


{
companies.map((company)=>(


<div

key={company._id}

className="bg-white rounded-3xl p-6 shadow-sm border"

>


<div className="flex justify-between">


<div className="flex gap-3 items-center">


{
company.logo
?

<img
src={`http://localhost:5000${company.logo}`}
className="w-12 h-12 rounded-xl object-cover"
/>

:

<div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
<Building2/>
</div>

}



<div>

<h2 className="font-bold text-xl">

{company.name}

</h2>


<p className="text-gray-500">

{company.location}

</p>


</div>


</div>




{
canManage &&

<button

onClick={()=>handleDelete(company._id)}

className="text-red-500"

>

<Trash2 size={20}/>

</button>

}



</div>




<div className="mt-5 space-y-2 text-gray-700">


<p>
Package: {company.package}
</p>


<p>
Eligibility: {company.eligibility}
</p>


<p>
Website: {company.website}
</p>


</div>



</div>



))

}



</div>

}



{
showModal &&

<AddCompanyModal

closeModal={()=>setShowModal(false)}

refresh={fetchCompanies}

/>

}



</div>

);


}
