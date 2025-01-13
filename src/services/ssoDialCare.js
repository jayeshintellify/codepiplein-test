import Http from "./http";

export const ssoDialCareAPI = (data) => {
  return Http.post("sso/dialCare/login", data);
};
