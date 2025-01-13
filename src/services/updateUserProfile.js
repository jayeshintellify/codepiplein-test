import Http from "./http";

export const updateUserProfileAPI = (data) => {
  return Http.post("api/user/updateUserProfile",data);
};
