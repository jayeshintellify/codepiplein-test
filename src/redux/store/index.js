import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../action/loginSlice";
import getProductListSlice from "../action/getProductList";
import getShowAgreementSlice from "../action/getShowAgreement";
import acceptAgreementSlice from "../action/acceptAgreement";
import getNotificationSlice from "../action/getNotifications";
import getNotificationCountsSlice from "../action/getNotificationsCounts";
import getProductFeaturesSlice from "../action/getProductFeatures";
import updateNotificationSlice from "../action/updateNotification";
import supportRequestSlice from "../action/supportRequest";
import updateUserProfileSlice from "../action/updateUserProfile";
import sendOtpSlice from "../action/sendOtp";
import verifyOtpSlice from "../action/verifyOtp";
import getPendingMonthsSlice from "../action/getPendingMonths";
import getUserProductClaimSlice from "../action/getUserProductClaim";
import updateUserProductClaimSlice from "../action/updateUserProductClaim";
import getUserProfileSlice from "../action/getUserProfile";
import ssoDialCareSlice from "../action/ssoDialCare";
import setLanguageSlice from "../action/setLanguage";

const store = configureStore({
  reducer: {
    loginSliceDetails: loginSlice,
    getProductList: getProductListSlice,
    getShowAgreementMain: getShowAgreementSlice,
    acceptAgreement: acceptAgreementSlice,
    getNotifications: getNotificationSlice,
    getNotificationsCounts: getNotificationCountsSlice,
    getProductFeatures: getProductFeaturesSlice,
    updateNotification: updateNotificationSlice,
    supportRequest: supportRequestSlice,
    updateUserProfile: updateUserProfileSlice,
    sendOtp: sendOtpSlice,
    verifyOtp: verifyOtpSlice,
    getPendingMonths: getPendingMonthsSlice,
    getUserProductClaim: getUserProductClaimSlice,
    updateUserProductClaim: updateUserProductClaimSlice,
    getUserProfileData: getUserProfileSlice,
    ssoDialCare: ssoDialCareSlice,
    setLanguageMain: setLanguageSlice,
  },
});

export default store;
