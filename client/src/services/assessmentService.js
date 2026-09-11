import api from "../api/axios";

export const getAssessments = () => api.get("/assessments");
export const getAssessmentById = (id) => api.get(`/assessments/${id}`);
export const submitAssessment = (id, answers) => api.post(`/assessments/${id}/submit`, { answers });
