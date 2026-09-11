import api from "../api/axios";

export const getDriveQuestions = (driveId) => api.get(`/drive-qa/${driveId}`);
export const postDriveQuestion = (driveId, question) => api.post(`/drive-qa/${driveId}`, { question });
export const answerDriveQuestion = (questionId, data) => api.put(`/drive-qa/${questionId}/answer`, data);
