import api from "../api/axios";


export const getDrives = () => {
  return api.get("/drives");
};


export const createDrive = (data) => {
  return api.post("/drives", data);
};


export const deleteDrive = (id) => {
  return api.delete(`/drives/${id}`);
};


export const registerStudent = (id, data) => {
  return api.post(
    `/drives/${id}/register`,
    data
  );
};