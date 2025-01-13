import Http from "./http";

export const getShowAgreementAPI = (data) => {
  return Http.post("showAgreement",data);
};
