import Http from "./http";

export const getProductFeaturesAPI = (data) => {
  return Http.post("api/user/getProductFeatures", data);
};
