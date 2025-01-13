import Http from "./http";

export const sendOtpAPI = (data) => {
  return Http.post("user/sendOtp",data);
};
