import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileAPI } from "../../services/getUserProfile";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getUserProfileSlice = createSlice({
  name: "getUserProfileData",
  initialState: data,
  reducers: {
    getUserProfileInfo(state) {
      state.isLoading = true;
    },
    getUserProfileInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getUserProfileInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getUserProfileInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getUserProfileHandler = (data) => async (dispatch) => {
  try {
    dispatch(getUserProfileAction.getUserProfileInfo());
    const response = await getUserProfileAPI(data);
    dispatch(getUserProfileAction.getUserProfileInfoSuccess(response));
  } catch (e) {
    dispatch(getUserProfileAction.getUserProfileInfoFailure(e));
  }
};
export default getUserProfileSlice.reducer;
export const getUserProfileAction = getUserProfileSlice.actions;
