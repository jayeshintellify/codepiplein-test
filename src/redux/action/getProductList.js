import { createSlice } from "@reduxjs/toolkit";
import { getProductListAPI } from "../../services/getProductList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getProductListSlice = createSlice({
  name: "getProductList",
  initialState: data,
  reducers: {
    getProductListInfo(state) {
      state.isLoading = true;
    },
    getProductListInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getProductListInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getProductListInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getProductListHandler = (data) => async (dispatch) => {
  try {
    dispatch(getProductListAction.getProductListInfo());
    const response = await getProductListAPI(data);
    dispatch(getProductListAction.getProductListInfoSuccess(response));
  } catch (e) {
    dispatch(getProductListAction.getProductListInfoFailure(e));
  }
};
export default getProductListSlice.reducer;
export const getProductListAction = getProductListSlice.actions;
