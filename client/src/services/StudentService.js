import api from "../api/axios";


export const getStudents = ()=>{

return api.get("/students");

};



export const createStudent=(data)=>{

return api.post(
"/students",
data,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);

};



export const deleteStudent=(id)=>{

return api.delete(
`/students/${id}`
);

};