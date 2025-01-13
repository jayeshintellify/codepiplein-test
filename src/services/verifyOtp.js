import Http from "./http";

export const verifyOtpAPI = (data) => {
  return Http.post("user/verifyOtp",data);
};
