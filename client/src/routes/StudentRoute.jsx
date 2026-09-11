import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function StudentRoute({children}){


const {user}=useAuth();



if(!user){

return <Navigate to="/login"/>

}



if(user.role !== "student"){

return <Navigate to="/dashboard"/>

}



return children;


}