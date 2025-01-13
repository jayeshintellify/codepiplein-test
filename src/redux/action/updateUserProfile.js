import { createSlice } from "@reduxjs/toolkit";
import { updateUserProfileAPI } from "../../services/updateUserProfile";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateUserProfileSlice = createSlice({
  name: "updateUserProfile",
  initialState: data,
  reducers: {
    updateUserProfileInfo(state) {
      state.isLoading = true;
    },
    updateUserProfileInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateUserProfileInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateUserProfileInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateUserProfileHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateUserProfileAction.updateUserProfileInfo());
    const response = await updateUserProfileAPI(data);
    dispatch(updateUserProfileAction.updateUserProfileInfoSuccess(response));
  } catch (e) {
    dispatch(updateUserProfileAction.updateUserProfileInfoFailure(e));
  }
};
export default updateUserProfileSlice.reducer;
export const updateUserProfileAction = updateUserProfileSlice.actions;
