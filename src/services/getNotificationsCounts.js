import Http from "./http";

export const getNotificationCountsAPI = (data) => {
  return Http.post("api/notifications/getUnreadUserNotificationCount", data);
};
