import { createSlice } from "@reduxjs/toolkit";
import { verifyOtpAPI } from "../../services/verifyOtp";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState: data,
  reducers: {
    verifyOtpInfo(state) {
      state.isLoading = true;
    },
    verifyOtpInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    verifyOtpInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    verifyOtpInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const verifyOtpHandler = (data) => async (dispatch) => {
  try {
    dispatch(verifyOtpAction.verifyOtpInfo());
    const response = await verifyOtpAPI(data);
    dispatch(verifyOtpAction.verifyOtpInfoSuccess(response));
  } catch (e) {
    dispatch(verifyOtpAction.verifyOtpInfoFailure(e));
  }
};
export default verifyOtpSlice.reducer;
export const verifyOtpAction = verifyOtpSlice.actions;
