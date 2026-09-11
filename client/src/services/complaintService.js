import api from "../api/axios";


export const getComplaints = () => {
  return api.get("/complaints");
};


export const createComplaint = (data) => {
  return api.post("/complaints", data);
};


export const updateComplaintStatus = (id, data) => {
  return api.patch(`/complaints/${id}/status`, data);
};
