import { createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "../../services/login";
import { STATUS_CODE } from "../../common";
import { setItem } from "../../common/localStorage";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const loginDetailsSlice = createSlice({
  name: "loginSliceDetails",
  initialState: data,
  reducers: {
    loginDetailsSliceInfo(state) {
      state.isLoading = true;
    },
    loginDetailsSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    loginDetailsSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    loginDetailsSliceReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const loginHandler = (data) => async (dispatch) => {
  try {
    dispatch(loginSliceAction.loginDetailsSliceInfo());
    const response = await loginAPI(data);
    dispatch(loginSliceAction.loginDetailsSliceSuccess(response));
    if(response?.statusCode === STATUS_CODE.OK){
      localStorage.setItem("token", response?.data?.token)
      setItem("adminId", response?.data?.id)
      setItem("loginResponse",JSON.stringify(response?.data))
    }
  } catch (e) {
    dispatch(loginSliceAction.loginDetailsSliceFailure(e));
  }
};
export default loginDetailsSlice.reducer;
export const loginSliceAction = loginDetailsSlice.actions;
