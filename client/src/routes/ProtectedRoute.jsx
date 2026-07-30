import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { roleHome } from "../utils/roleHome";


export default function ProtectedRoute({children, roles}){


const {user,loading}=useAuth();



if(loading){

return null;

}



if(!user){

return <Navigate to="/login"/>

}


// Optional per-route role gate, e.g. <ProtectedRoute roles={["admin"]}>
if(roles && !roles.includes(user.role)){

return <Navigate to={roleHome(user.role)} />

}



return children;


}
