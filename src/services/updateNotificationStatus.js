import Http from "./http";

export const updateNotificationTypeAPI = (data) => {
  return Http.post("api/notifications/updateNotificationStatus",data);
};
