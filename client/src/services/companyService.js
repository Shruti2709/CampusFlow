import api from "../api/axios";


export const getCompanies = ()=>{

return api.get("/companies");

};



export const createCompany=(data)=>{

return api.post(
"/companies",
data,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);

};



export const deleteCompany=(id)=>{

return api.delete(
`/companies/${id}`
);

};