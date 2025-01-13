import Http from "./http";

export const loginAPI = (data) => {
  return Http.post("user/login",data);
};
