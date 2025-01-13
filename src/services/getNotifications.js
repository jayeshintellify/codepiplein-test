import Http from "./http";

export const getNotificationsAPI = (data) => {
  return Http.post("api/notifications/getUserNotification",data);
};
