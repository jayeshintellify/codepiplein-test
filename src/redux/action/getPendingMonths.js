import { createSlice } from "@reduxjs/toolkit";
import { getPendingMonthsAPI } from "../../services/getPendingMonths";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getPendingMonthsSlice = createSlice({
  name: "getPendingMonths",
  initialState: data,
  reducers: {
    getPendingMonthsInfo(state) {
      state.isLoading = true;
    },
    getPendingMonthsInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getPendingMonthsInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getPendingMonthsInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getPendingMonthsHandler = (data) => async (dispatch) => {
  try {
    dispatch(getPendingMonthsAction.getPendingMonthsInfo());
    const response = await getPendingMonthsAPI(data);
    dispatch(getPendingMonthsAction.getPendingMonthsInfoSuccess(response));
  } catch (e) {
    dispatch(getPendingMonthsAction.getPendingMonthsInfoFailure(e));
  }
};
export default getPendingMonthsSlice.reducer;
export const getPendingMonthsAction = getPendingMonthsSlice.actions;
