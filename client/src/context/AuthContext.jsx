import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";


const AuthContext = createContext();



export function AuthProvider({ children }) {


const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);



useEffect(()=>{


const savedUser =
localStorage.getItem("user");

const token =
localStorage.getItem("token");


if(savedUser){
setUser(
JSON.parse(savedUser)
);
}


if(token){

// Re-validate against the server so a stale/edited localStorage
// value can never grant access it shouldn't have.
getProfile()
.then((res)=>{
setUser(res.data);
localStorage.setItem("user", JSON.stringify(res.data));
})
.catch(()=>{
setUser(null);
localStorage.removeItem("user");
localStorage.removeItem("token");
})
.finally(()=>{
setLoading(false);
});

}else{
setLoading(false);
}


},[]);




const loginUser=(userData)=>{


setUser(userData);


localStorage.setItem(
"user",
JSON.stringify(userData)
);


localStorage.setItem(
"token",
userData.token
);


};




const logout=()=>{


setUser(null);

localStorage.removeItem("user");

localStorage.removeItem("token");


};




return (

<AuthContext.Provider

value={{

user,

loginUser,

logout,

loading

}}

>

{children}

</AuthContext.Provider>

);


}



export const useAuth=()=>useContext(AuthContext);
