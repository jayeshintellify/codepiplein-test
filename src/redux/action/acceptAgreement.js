import { createSlice } from "@reduxjs/toolkit";
import { acceptAgreementAPI } from "../../services/acceptAgreement";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const acceptAgreementSlice = createSlice({
  name: "acceptAgreement",
  initialState: data,
  reducers: {
    acceptAgreementInfo(state) {
      state.isLoading = true;
    },
    acceptAgreementInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    acceptAgreementInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    acceptAgreementInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const acceptAgreementHandler = (data) => async (dispatch) => {
  try {
    dispatch(acceptAgreementAction.acceptAgreementInfo());
    const response = await acceptAgreementAPI(data);
    dispatch(acceptAgreementAction.acceptAgreementInfoSuccess(response));
  } catch (e) {
    dispatch(acceptAgreementAction.acceptAgreementInfoFailure(e));
  }
};
export default acceptAgreementSlice.reducer;
export const acceptAgreementAction = acceptAgreementSlice.actions;
