import { createSlice } from "@reduxjs/toolkit";
import { updateUserProductClaimAPI } from "../../services/updateUserProductClaim";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateUserProductClaimSlice = createSlice({
  name: "updateUserProductClaim",
  initialState: data,
  reducers: {
    updateUserProductClaimInfo(state) {
      state.isLoading = true;
    },
    updateUserProductClaimInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateUserProductClaimInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateUserProductClaimInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateUserProductClaimHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateUserProductClaimAction.updateUserProductClaimInfo());
    const response = await updateUserProductClaimAPI(data);
    dispatch(
      updateUserProductClaimAction.updateUserProductClaimInfoSuccess(response)
    );
  } catch (e) {
    dispatch(updateUserProductClaimAction.updateUserProductClaimInfoFailure(e));
  }
};
export default updateUserProductClaimSlice.reducer;
export const updateUserProductClaimAction = updateUserProductClaimSlice.actions;
