import React, { useEffect, useState } from "react";
import editIcon from "../../assets/images/editIcon.svg";
import supportIcon from "../../assets/images/supportIcon.svg";
import languageIcon from "../../assets/images/languageIcon.svg";
import notificationManageIcon from "../../assets/images/notificationManageIcon.svg";
import rightArrowGrey from "../../assets/images/rightArrowGrey.svg";
import logoutMobile from "../../assets/images/logoutMobile.svg";
import { useNavigate } from "react-router-dom";
import LanguageChangeModal from "./LanguageChangeModal";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileHandler } from "../../redux/action/getUserProfile";
import Loader from "../Loder/loader";
import { getItem } from "../../common/localStorage";

const Settings = () => {
  const getUserProfile = JSON.parse(getItem("loginResponse"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const setLanguageSelector = useSelector((state) => state?.setLanguageMain);
  const getUserProfileSelector = useSelector(
    (state) => state?.getUserProfileData
  );

  const { t } = useTranslation();

  const handleSwitchChange = (checked) => {
    setIsModalOpen(true);
  };

  const handleCancelChange = () => {
    setIsLogoutModal(false);
  };

  const handleConfirmChange = () => {
    setIsLogoutModal(false);
    localStorage.clear();
    // navigate("/");
    window.location.replace("/");
  };

  useEffect(() => {
    dispatch(getUserProfileHandler());
  }, []);

  return (
    <>
      {getUserProfileSelector?.isLoading === true ||
      setLanguageSelector?.isLoading === true ? (
        <Loader loaderTransForm="loaderTransForm" />
      ) : (
        <div className="mainSection">
          <div className="w-lg-50">
            <div className="mb-30">
              <div className="fs-16 tgb fw-700 mb-12">{t("Profile")}</div>
              <div className="profileName">
                <div className="div d-flex align-center gap-16">
                  <div className="nameInitials  tgb">{`${
                    getUserProfile?.firstName?.charAt(0) || ""
                  }${getUserProfile?.lastName?.charAt(0) || ""}`}</div>
                  <div className="">
                    {getUserProfile?.firstName + " " + getUserProfile?.lastName}
                  </div>
                </div>
                <img
                  src={editIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => navigate("/profile-change")}
                />
              </div>
            </div>
            <div>
              <div className="fs-16 tgb fw-700 mb-12">{t("Settings")}</div>
              <div className="mobileDesign">
                <div
                  className="settingsChange mb-10"
                  onClick={() => navigate("/support-request")}
                >
                  <div className="div d-flex align-center gap-16">
                    <img src={supportIcon} alt="" />
                    <div className="">{t("Support Request")}</div>
                  </div>
                  <img src={rightArrowGrey} alt="" />
                </div>
                <div
                  className="settingsChange mb-10"
                  onClick={() => navigate("/manage-notification")}
                >
                  <div className="div d-flex align-center gap-16">
                    <img src={notificationManageIcon} alt="" />
                    <div className="">{t("Manage Notifications")}</div>
                  </div>
                  <img src={rightArrowGrey} alt="" />
                </div>
                <div
                  className="settingsChange mb-10"
                  onClick={handleSwitchChange}
                >
                  <div className="div d-flex align-center gap-16">
                    <img src={languageIcon} alt="" />
                    <div className="">{t("Language")}</div>
                  </div>
                  <div className="d-flex align-center gap-6">
                    <span className="text-grey">
                      {getItem("language") === "en" ? "English" : "Spanish"}
                    </span>
                    <img src={rightArrowGrey} alt="" />
                  </div>
                </div>
                <div
                  className="settingsChange mb-10 mobileShow"
                  onClick={() => {
                    setIsLogoutModal(true);
                  }}
                >
                  <div className="div d-flex align-center gap-16">
                    <img src={logoutMobile} alt="" />
                    <div className="">Logout</div>
                  </div>
                </div>
              </div>
              {isModalOpen && (
                <LanguageChangeModal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              )}
              {isLogoutModal && (
                <Modal
                  className="custom-modal responsiveModal text-center"
                  open={isLogoutModal}
                  onCancel={handleCancelChange}
                  footer={null}
                  closeIcon={null}
                  centered
                >
                  <div className="gb fs-20 mb-12 text-center">
                    {t("Are you sure to log out?")}
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
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
