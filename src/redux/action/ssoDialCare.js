import { createSlice } from "@reduxjs/toolkit";
import { ssoDialCareAPI } from "../../services/ssoDialCare";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const ssoDialCareSlice = createSlice({
  name: "ssoDialCare",
  initialState: data,
  reducers: {
    ssoDialCareInfo(state) {
      state.isLoading = true;
    },
    ssoDialCareInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    ssoDialCareInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    ssoDialCareInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const ssoDialCareHandler = (data) => async (dispatch) => {
  try {
    dispatch(ssoDialCareAction.ssoDialCareInfo());
    const response = await ssoDialCareAPI(data);
    dispatch(ssoDialCareAction.ssoDialCareInfoSuccess(response));
  } catch (e) {
    dispatch(ssoDialCareAction.ssoDialCareInfoFailure(e));
  }
};
export default ssoDialCareSlice.reducer;
export const ssoDialCareAction = ssoDialCareSlice.actions;
