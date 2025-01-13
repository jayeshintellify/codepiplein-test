import { createSlice } from "@reduxjs/toolkit";
import { supportRequestAPI } from "../../services/supportRequest";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const supportRequestSlice = createSlice({
  name: "supportRequest",
  initialState: data,
  reducers: {
    supportRequestInfo(state) {
      state.isLoading = true;
    },
    supportRequestInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    supportRequestInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    supportRequestInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const supportRequestHandler = (data) => async (dispatch) => {
  try {
    dispatch(supportRequestAction.supportRequestInfo());
    const response = await supportRequestAPI(data);
    dispatch(supportRequestAction.supportRequestInfoSuccess(response));
  } catch (e) {
    dispatch(supportRequestAction.supportRequestInfoFailure(e));
  }
};
export default supportRequestSlice.reducer;
export const supportRequestAction = supportRequestSlice.actions;
