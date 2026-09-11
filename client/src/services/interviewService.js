import api from "../api/axios";


export const getInterviews = () => {
  return api.get("/interviews");
};


export const createInterview = (data) => {
  return api.post("/interviews", data);
};


export const updateInterviewStatus = (id,data) => {
  return api.patch(
    `/interviews/${id}/status`,
    data
  );
};


export const deleteInterview = (id) => {
  return api.delete(`/interviews/${id}`);
};