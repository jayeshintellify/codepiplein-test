import Http from "./http";

export const setLanguageAPI = (data) => {
  return Http.post("user/setLanguage",data);
};
