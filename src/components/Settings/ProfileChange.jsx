import React, { useEffect, useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useNavigate } from "react-router-dom";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import downArrowGrey from "../../assets/images/downArrowGrey.svg";
import { Breadcrumb } from "antd";
import CommonModal from "./CommonModal";
import { useCommonMessage } from "../../common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateUserProfileAction,
  updateUserProfileHandler,
} from "../../redux/action/updateUserProfile";
import { STATUS_CODE } from "../../common";
import Loader from "../Loder/loader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { handleKeyPressSpace } from "../../common/CommonFunctions";
import { profileChangeSchema } from "./settingsValidation";
import { getUserProfileHandler } from "../../redux/action/getUserProfile";
import { getItem, setItem } from "../../common/localStorage";

const ProfileChange = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeNumber, setChangeNumber] = useState("Number");
  const [openIndex, setOpenIndex] = useState(null);
  const messageApi = useCommonMessage();

  const getUserProfile = JSON.parse(getItem("loginResponse"));
  const getUserProfileSelector = useSelector(
    (state) => state?.getUserProfileData
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const defaultOption = getUserProfile?.state || "";

  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const options = getUserProfile?.stateList?.map((item) => ({
    value: item,
    label: item,
  }));

  const updateUserProfileSelector = useSelector(
    (state) => state?.updateUserProfile
  );

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChangeAccourdian = (value) => {
    setOpenIndex(null);
    setSelectedOption(value);
  };

  const handleChangeNumber = () => {
    setChangeNumber("Number");
    setIsModalOpen(true);
  };
  const handleChangeEmail = (values) => {
    setChangeNumber("Email");
    setIsModalOpen(true);
  };

  const handleFormSubmit = (values) => {
    if (values?.addressLine1 && values?.city && values?.zip) {
      let payload = {
        id: getUserProfile?.id,
        address: values?.addressLine1.trim(),
        address2: values?.addressLine2.trim(),
        city: values?.city.trim(),
        state: selectedOption,
        zip: values?.zip.trim(),
      };
      dispatch(updateUserProfileHandler(payload));
    }
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
      updateUserProfileSelector?.data?.statusCode === STATUS_CODE.SERVER_ERROR
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
      {(updateUserProfileSelector?.isLoading === true ||
        getUserProfileSelector?.isLoading === true) && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      <div className="commonHeader">
        <div className="container position-relative">
          <div className="headerBg pt-30 pb-16 breadcrumbAboslute">
            <div className="mobileAbsolute">
              <img
                src={backBtn}
                onClick={() => navigate("/settings")}
                className="cursor-pointer backBtn"
                alt=""
              />
              <img
                src={backBtnMobile}
                onClick={() => navigate("/settings")}
                className="cursor-pointer backBtnMobile "
                alt=""
              />
            </div>
            <div>
              <h2 className="fs-20 mb-10 pageName tgb">{t("Settings")}</h2>
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
                    onClick: () => navigate("/settings"),
                  },
                  {
                    title: t("Profile"),
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
      <div className="py-30 mb-100 mobileMargin">
        <div className="mx-887 mx-auto h-100">
          <div className="profileBorder">
            <div className="userInitials gb">{`${
              getUserProfile?.firstName?.charAt(0) || ""
            }${getUserProfile?.lastName?.charAt(0) || ""}`}</div>
          </div>
          <div className="tgb mx-auto fs-20 text-center mb-40">
            {getUserProfile?.firstName + " " + getUserProfile?.lastName}
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              firstName: getUserProfileSelector?.data?.data?.firstName ?? "",
              lastName: getUserProfileSelector?.data?.data?.lastName ?? "",
              phoneNumber:
                getUserProfileSelector?.data?.data?.phoneNumber ?? "",
              emailId: getUserProfileSelector?.data?.data?.emailAddress ?? "",
              gender: getUserProfileSelector?.data?.data?.gender ?? "",
              dateOfBirth:
                getUserProfileSelector?.data?.data?.dateOfBirth ?? "",
              memberId: getUserProfileSelector?.data?.data?.caspioUserId ?? "",
              addressLine1: getUserProfileSelector?.data?.data?.address ?? "",
              addressLine2: getUserProfileSelector?.data?.data?.address2 ?? "",
              city: getUserProfileSelector?.data?.data?.city ?? "",
              state: getUserProfileSelector?.data?.data?.state,
              zip: getUserProfileSelector?.data?.data?.zip ?? "",
            }}
            validationSchema={profileChangeSchema(t)}
            onSubmit={(values, formikBag) => {
              handleFormSubmit(values, formikBag);
            }}
          >
            {({
              setErrors,
              setFieldValue,
              setFieldError,
              resetForm,
              values,
            }) => (
              <Form>
                <div className="formgrid mb-40">
                  <div className="disbleInput">
                    <h3 className="fs-20 mb-20">{t("First Name")}</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder="James"
                      name="firstName"
                      disabled
                    />
                  </div>
                  <div className="disbleInput">
                    <h3 className="fs-20 mb-20">{t("Last Name")}</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder="Madission"
                      name="lastName"
                      disabled
                    />
                  </div>
                  <div className=" position-relative">
                    <h3 className="fs-20 mb-20">{t("Phone Number")}</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      disabled
                    />
                    <div className="editField" onClick={handleChangeNumber}>
                      {t("Edit")}
                    </div>
                  </div>
                  <div className=" position-relative">
                    <h3 className="fs-20 mb-20">{t("Email ID")}</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder="Email ID"
                      name="emailId"
                      disabled
                    />
                    <div className="editField" onClick={handleChangeEmail}>
                      {t("Edit")}
                    </div>
                  </div>
                  <div className="disbleInput">
                    <h3 className="fs-20 mb-20">{t("Gender")}</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder="Male"
                      name="gender"
                    />
                  </div>
                  <div className="disbleInput">
                    <h3 className="fs-20 mb-20">{t("Date of Birth")}</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder="12-12-1965"
                      name="dateOfBirth"
                    />
                  </div>
                  <div className="disbleInput">
                    <h3 className="fs-20 mb-20">{t("Member ID")}</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder="12345"
                      name="memberId"
                    />
                  </div>
                  <div>
                    <h3 className="fs-20 mb-20">{t("Address Line 1")}*</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder={t("Please enter address line 1")}
                      name="addressLine1"
                      maxLength="100"
                      onKeyPress={handleKeyPressSpace}
                      autoComplete="Off"
                    />
                    <ErrorMessage
                      name="addressLine1"
                      component="div"
                      className="fs-14 error-message"
                    />
                  </div>
                  <div>
                    <h3 className="fs-20 mb-20">{t("Address Line 2")}</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder={t("Please enter address line 2")}
                      name="addressLine2"
                      maxLength="100"
                      onKeyPress={handleKeyPressSpace}
                      autoComplete="Off"
                    />
                  </div>
                  <div>
                    <h3 className="fs-20 mb-20">{t("City")}*</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder={t("Please enter city")}
                      name="city"
                      maxLength="50"
                      onKeyPress={handleKeyPressSpace}
                      autoComplete="Off"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="fs-14 error-message"
                    />
                  </div>
                  <div>
                    <h3 className="fs-20 mb-20">{t("State")}*</h3>
                    <div className="position-relative">
                      <div
                        className={` inputField  active ${
                          openIndex === 0 ? "rotate focus" : ""
                        }`}
                        onClick={() => handleToggle(0)}
                      >
                        <span>{selectedOption || "Please select state"}</span>
                        <img
                          src={downArrowGrey}
                          alt=""
                          className="dropdownArrow"
                        />
                      </div>
                      <div
                        className="menuState"
                        style={{
                          display: openIndex === 0 ? "block" : "none",
                        }}
                      >
                        <div
                          className=" cursor-pointer fs-16"
                          // onClick={() => handleChangeAccourdian("IL")}
                        >
                          {options?.map((option, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                handleChangeAccourdian(option.value)
                              }
                              className="cursor-pointer"
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="fs-20 mb-20">{t("ZIP Code")}*</h3>
                    <Field
                      type="text"
                      className="inputField"
                      placeholder={t("Please enter zip code")}
                      name="zip"
                      maxLength="10"
                      onKeyPress={handleKeyPressSpace}
                      autoComplete="Off"
                    />
                    <ErrorMessage
                      name="zip"
                      component="div"
                      className="fs-14 error-message"
                    />
                  </div>
                </div>
                <div className="text-center ">
                  <button className="saveBtn cursor-pointer  w-md-100">
                    {t("Save")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {isModalOpen && (
        <CommonModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          changeNumber={changeNumber}
          setChangeNumber={setChangeNumber}
        />
      )}
    </>
  );
};

export default ProfileChange;
