import { createSlice } from "@reduxjs/toolkit";
import { getShowAgreementAPI } from "../../services/getShowAgreement";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getShowAgreementSlice = createSlice({
  name: "getShowAgreementMain",
  initialState: data,
  reducers: {
    getShowAgreementInfo(state) {
      state.isLoading = true;
    },
    getShowAgreementInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getShowAgreementInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getShowAgreementInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getShowAgreementHandler = (data) => async (dispatch) => {
  try {
    dispatch(getShowAgreementAction.getShowAgreementInfo());
    const response = await getShowAgreementAPI(data);
    dispatch(getShowAgreementAction.getShowAgreementInfoSuccess(response));
  } catch (e) {
    dispatch(getShowAgreementAction.getShowAgreementInfoFailure(e));
  }
};
export default getShowAgreementSlice.reducer;
export const getShowAgreementAction = getShowAgreementSlice.actions;
