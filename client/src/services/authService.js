import api from "../api/axios";


export const register = (data)=>{
  return api.post(
    "/auth/register",
    data
  );
};


export const login = (data)=>{
  return api.post(
    "/auth/login",
    data
  );
};


export const logout = ()=>{
  return api.post(
    "/auth/logout"
  );
};


export const getProfile = ()=>{
  return api.get(
    "/auth/me"
  );
};