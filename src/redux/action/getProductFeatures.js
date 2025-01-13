import { createSlice } from "@reduxjs/toolkit";
import { getProductFeaturesAPI } from "../../services/getProductFeatures";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getProductFeaturesSlice = createSlice({
  name: "getProductFeatures",
  initialState: data,
  reducers: {
    getProducteaturesInfo(state) {
      state.isLoading = true;
    },
    getProducteaturesSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getProducteaturesFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getProducteaturesReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getProductFeaturesHandler = (data) => async (dispatch) => {
  try {
    dispatch(getProductFeaturesAction.getProducteaturesInfo());
    const response = await getProductFeaturesAPI(data);
    dispatch(getProductFeaturesAction.getProducteaturesSuccess(response));
  } catch (e) {
    dispatch(getProductFeaturesAction.getProducteaturesFailure(e));
  }
};
export default getProductFeaturesSlice.reducer;
export const getProductFeaturesAction = getProductFeaturesSlice.actions;
