import api from "../api/axios";


export const createProfile = (data) => {
  return api.post(
    "/student-profile",
    data
  );
};


export const getProfile = () => {
  return api.get(
    "/student-profile"
  );
};


export const updateProfile = (data) => {
  return api.put(
    "/student-profile",
    data
  );
};