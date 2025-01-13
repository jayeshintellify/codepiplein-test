import Http from "./http";

export const supportRequestAPI = (data) => {
  return Http.post("api/support/send/openApi",data);
};
