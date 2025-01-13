import Http from "./http";

export const getPendingMonthsAPI = (data) => {
  return Http.post("api/user/getUserPendingMonth", data);
};
