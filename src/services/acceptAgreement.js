import Http from "./http";

export const acceptAgreementAPI = (data) => {
  return Http.post("acceptAgreement",data);
};
