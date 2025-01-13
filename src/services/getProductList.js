import Http from "./http";

export const getProductListAPI = (data) => {
  return Http.post("api/user/getProducts",data);
};
