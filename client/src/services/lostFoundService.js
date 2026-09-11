import api from "../api/axios";


export const getLostFoundItems = () => {
  return api.get("/lost-found");
};


export const createLostFoundItem = (data) => {
  return api.post("/lost-found", data);
};


export const updateLostFoundStatus = (id, data) => {
  return api.patch(`/lost-found/${id}/status`, data);
};
