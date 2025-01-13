import Http from "./http";

export const getUserProductClaimAPI = (data) => {
  return Http.post("api/user/getUserProductClaim",data);
};
