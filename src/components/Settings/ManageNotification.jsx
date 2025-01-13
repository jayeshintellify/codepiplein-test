import React, { useEffect, useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useNavigate } from "react-router-dom";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import { Breadcrumb, Modal, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCommonMessage } from "../../common/CommonMessage";
import {
  updateUserProfileAction,
  updateUserProfileHandler,
} from "../../redux/action/updateUserProfile";
import Loader from "../Loder/loader";
import { STATUS_CODE } from "../../common";
import { getUserProfileHandler } from "../../redux/action/getUserProfile";
import { getItem, setItem } from "../../common/localStorage";

const ManageNotification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const messageApi = useCommonMessage();

  const loginResponse = JSON.parse(getItem("loginResponse"));
  const getUserProfileSelector = useSelector((state)=>state?.getUserProfileData)
  const updateUserProfileSelector = useSelector(
    (state) => state?.updateUserProfile
  );

  const [preferences, setPreferences] = useState(
    loginResponse.userPreferenceConfig
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);

  const handleSwitchChange = (key, checked) => {
    if (!checked) {
      // Open the modal for confirmation before turning off
      setPendingChange({ key, checked });
      setIsModalOpen(true);
    } else {
      // Directly update preferences and call API when switching on
      const updatedPreferences = { ...preferences, [key]: checked };
      setPreferences(updatedPreferences);

      const payload = {
        id: loginResponse?.id,
        userPreferenceConfig: updatedPreferences,
      };

      dispatch(updateUserProfileHandler(payload));
    }
  };

  useEffect(() => {
    const userConfig = getUserProfileSelector?.data?.data?.userPreferenceConfig ?? {};
    setPreferences(userConfig);
  }, [getUserProfileSelector])

  const handleConfirmChange = () => {
    if (pendingChange) {
      const updatedPreferences = {
        ...preferences,
        [pendingChange.key]: pendingChange.checked,
      };

      setPreferences(updatedPreferences); // Update the preferences state
      setPendingChange(null);
      setIsModalOpen(false);

      const payload = {
        id: loginResponse?.id,
        userPreferenceConfig: {
          sms: updatedPreferences.sms,
          push: updatedPreferences.push,
          email: updatedPreferences.email,
        },
      };
      dispatch(updateUserProfileHandler(payload));
    }
  };

  const handleCancelChange = () => {
    setPendingChange(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateUserProfileSelector?.data?.statusCode === STATUS_CODE.OK) {
      messageApi.open({
        type: "success",
        content: updateUserProfileSelector?.data?.message,
      });
      setItem(
        "loginResponse",
        JSON.stringify(updateUserProfileSelector?.data?.data)
      );
      dispatch(updateUserProfileAction.updateUserProfileInfoReset());
    } else if (
      updateUserProfileSelector?.data?.statusCode === STATUS_CODE.BAD_REQUEST ||
      updateUserProfileSelector?.data?.statusCode === STATUS_CODE.NOT_FOUND ||
      updateUserProfileSelector?.data?.statusCode ===
        STATUS_CODE.SERVER_ERROR ||
      updateUserProfileSelector?.data?.statusCode === STATUS_CODE.UNAUTHORIZED
    ) {
      messageApi.open({
        type: "error",
        content: updateUserProfileSelector?.data?.message,
      });
      dispatch(updateUserProfileAction.updateUserProfileInfoReset());
    }
  }, [updateUserProfileSelector]);

  useEffect(() => {
    dispatch(getUserProfileHandler());
  }, []);

  return (
    <>
      {updateUserProfileSelector?.isLoading && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg pt-30 pb-16 breadcrumbAboslute">
            <img
              src={backBtn}
              onClick={() => navigate("/settings")}
              className="cursor-pointer backBtn"
              alt=""
            />
            <img
              src={backBtnMobile}
              onClick={() => navigate("/settings")}
              className="cursor-pointer backBtnMobile mobileAbsolute"
              alt=""
            />
            <div>
              <h2 className="fs-20 mb-10 pageName tgb">
                {t("Manage Notifications")}
              </h2>
              <Breadcrumb
                className="breadcrumb cursor-pointer"
                separator={
                  <span>
                    <img src={breadcrumb} alt="" />
                  </span>
                }
                items={[
                  {
                    title: t("Settings"),
                    onClick : () => navigate("/settings")
                  },
                  {
                    title: t("Manage Notifications"),
                  },
                ]}
              />
            </div>
            {/* <div className="mobileShow" onClick={() => navigate("/settings")}>
              <img src={doneIcon} alt="" />
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="py-50 mobileMargin">
        <div className="container">
          <div className="notificationCard">
            <div className="d-flex align-center justify-between gap-10 emailBorder">
              <div className="tgb fw-600">Email</div>
              <Switch defaultChecked onChange={handleSwitchChange} />
              <Modal
                className="custom-modal responsiveModal text-center"
                open={isModalOpen}
                onCancel={handleCancelChange}
                footer={null}
                closeIcon={null}
                centered
              >
                <div className="tgb fs-20 mb-12 text-center">
                  {t("Manage Notifications")}
                </div>
                <div className="lh-25 mb-40 text-center">
                  Are you sure you want to turn off the notification?
                </div>
                <div className="yesNoOption">
                  <button className="noBtn" onClick={handleCancelChange}>
                    Cancel
                  </button>
                  <button className="yesBtn" onClick={handleCancelChange}>
                    Yes
                  </button>
                </div>
              </Modal>
            </div>
            <div>Important updates sent to your inbox.</div>
          </div>
        </div>
      </div> */}
      <div className="py-50 mobileMargin">
        <div className="container">
          {[
            {
              key: "push",
              label: "Notifications",
              message: "Important updates sent to your inbox.",
            },
            {
              key: "email",
              label: "Email",
              message: "Instant updates on your device screen.",
            },
            {
              key: "sms",
              label: "SMS Notifications",
              message: "Urgent info via text messages.",
            },
          ].map((notification) => (
            <div key={notification.key} className="notificationCard">
              <div className="d-flex align-center justify-between gap-10 emailBorder">
                <div className="gb fw-600">{t(notification.label)}</div>
                <Switch
                  checked={preferences[notification.key]}
                  onChange={(checked) =>
                    handleSwitchChange(notification.key, checked)
                  }
                />
              </div>
              <div>{t(notification?.message)}</div>
            </div>
          ))}

          <Modal
            className="custom-modal responsiveModal text-center"
            open={isModalOpen}
            onCancel={handleCancelChange}
            footer={null}
            closeIcon={null}
            centered
          >
            <div className="gb fs-20 mb-12 text-center">
              {t("Manage Notifications")}
            </div>
            <div className="lh-25 mb-40 text-center">
              {t("Are you sure you want to turn off the notification?")}
            </div>
            <div className="yesNoOption">
              <button className="noBtn" onClick={handleCancelChange}>
                {t("Cancel")}
              </button>
              <button className="yesBtn" onClick={handleConfirmChange}>
                {t("Yes")}
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ManageNotification;
