import { createSlice } from "@reduxjs/toolkit";
import { getUserProductClaimAPI } from "../../services/getUserProductClaim";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getUserProductClaimSlice = createSlice({
  name: "getUserProductClaim",
  initialState: data,
  reducers: {
    getUserProductClaimInfo(state) {
      state.isLoading = true;
    },
    getUserProductClaimInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getUserProductClaimInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getUserProductClaimInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getUserProductClaimHandler = (data) => async (dispatch) => {
  try {
    dispatch(getUserProductClaimAction.getUserProductClaimInfo());
    const response = await getUserProductClaimAPI(data);
    dispatch(
      getUserProductClaimAction.getUserProductClaimInfoSuccess(response)
    );
  } catch (e) {
    dispatch(getUserProductClaimAction.getUserProductClaimInfoFailure(e));
  }
};
export default getUserProductClaimSlice.reducer;
export const getUserProductClaimAction = getUserProductClaimSlice.actions;
