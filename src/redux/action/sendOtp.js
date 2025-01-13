import { createSlice } from "@reduxjs/toolkit";
import { sendOtpAPI } from "../../services/sendOtp";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const sendOtpSlice = createSlice({
  name: "sendOtp",
  initialState: data,
  reducers: {
    sendOtpInfo(state) {
      state.isLoading = true;
    },
    sendOtpInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    sendOtpInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    sendOtpInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const sendOtpHandler = (data) => async (dispatch) => {
  try {
    dispatch(sendOtpAction.sendOtpInfo());
    const response = await sendOtpAPI(data);
    dispatch(sendOtpAction.sendOtpInfoSuccess(response));
  } catch (e) {
    dispatch(sendOtpAction.sendOtpInfoFailure(e));
  }
};
export default sendOtpSlice.reducer;
export const sendOtpAction = sendOtpSlice.actions;
