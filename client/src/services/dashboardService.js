import api from "../api/axios";


export const getDashboardStats = ()=>{

return api.get("/dashboard");

};