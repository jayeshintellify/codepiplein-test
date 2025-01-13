import Http from "./http";

export const getUserProfileAPI = (data) => {
  return Http.post("api/user/getUserProfile",data);
};
