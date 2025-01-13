import { createSlice } from "@reduxjs/toolkit";
import { getNotificationsAPI } from "../../services/getNotifications";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getNotificationSlice = createSlice({
  name: "getNotifications",
  initialState: data,
  reducers: {
    getNotificationsInfo(state) {
      state.isLoading = true;
    },
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getNotificationsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getNotificationsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getNotificationsHandler = (data) => async (dispatch) => {
  try {
    dispatch(getNotificationsAction.getNotificationsInfo());
    const response = await getNotificationsAPI(data);
    dispatch(getNotificationsAction.getNotificationsSuccess(response));
  } catch (e) {
    dispatch(getNotificationsAction.getNotificationsFailure(e));
  }
};
export default getNotificationSlice.reducer;
export const getNotificationsAction = getNotificationSlice.actions;
