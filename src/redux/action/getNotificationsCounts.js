import { createSlice } from "@reduxjs/toolkit";
import { getNotificationCountsAPI } from "../../services/getNotificationsCounts";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getNotificationsCounts = createSlice({
  name: "getNotificationsCounts",
  initialState: data,
  reducers: {
    getNotificationsCountInfo(state) {
      state.isLoading = true;
    },
    getNotificationsCountSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getNotificationsCountFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getNotificationsCountReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getNotificationCountsHandler = (data) => async (dispatch) => {
  try {
    dispatch(getNotificationsCountsAction.getNotificationsCountInfo());
    const response = await getNotificationCountsAPI(data);
    dispatch(
      getNotificationsCountsAction.getNotificationsCountSuccess(response)
    );
  } catch (e) {
    dispatch(getNotificationsCountsAction.getNotificationsCountFailure(e));
  }
};
export default getNotificationsCounts.reducer;
export const getNotificationsCountsAction = getNotificationsCounts.actions;
