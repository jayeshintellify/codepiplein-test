import { createSlice } from "@reduxjs/toolkit";
import { updateNotificationTypeAPI } from "../../services/updateNotificationStatus";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updatNotificationSlice = createSlice({
  name: "updateNotification",
  initialState: data,
  reducers: {
    updateNotificationInfo(state) {
      state.isLoading = true;
    },
    updateNotificationInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateNotificationInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateNotificationInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateNotificationHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateNotificationAction.updateNotificationInfo());
    const response = await updateNotificationTypeAPI(data);
    dispatch(updateNotificationAction.updateNotificationInfoSuccess(response));
  } catch (e) {
    dispatch(updateNotificationAction.updateNotificationInfoFailure(e));
  }
};
export default updatNotificationSlice.reducer;
export const updateNotificationAction = updatNotificationSlice.actions;
