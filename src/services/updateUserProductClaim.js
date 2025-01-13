import Http from "./http";

export const updateUserProductClaimAPI = (data) => {
  return Http.post("api/user/updateUserProductClaim", data);
};
