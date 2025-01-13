import { createSlice } from "@reduxjs/toolkit";
import { setLanguageAPI } from "../../services/setLanguage";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const setLanguageSlice = createSlice({
  name: "setLanguageMain",
  initialState: data,
  reducers: {
    setLanguageInfo(state) {
      state.isLoading = true;
    },
    setLanguageInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    setLanguageInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    setLanguageInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const setLanguageHandler = (data) => async (dispatch) => {
  try {
    dispatch(setLanguageAction.setLanguageInfo());
    const response = await setLanguageAPI(data);
    dispatch(setLanguageAction.setLanguageInfoSuccess(response));
  } catch (e) {
    dispatch(setLanguageAction.setLanguageInfoFailure(e));
  }
};
export default setLanguageSlice.reducer;
export const setLanguageAction = setLanguageSlice.actions;
