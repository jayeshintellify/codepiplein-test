import React, { useEffect, useState } from "react";
import loginImage from "../../assets/images/login.png";
import LogoWhite from "../../assets/images/LogoWhite.svg";
import PrimecareLogo from "../../assets/images/PrimecareLogo.svg";
import { DatePicker, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCommonMessage } from "../../common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginHandler, loginSliceAction } from "../../redux/action/loginSlice";
import {
  loginValidationMemberIdSchema,
  loginValidationSsnIdSchema,
} from "./LoginValidation";
import {
  handleKeyPressSpace,
  handleNumberFieldLength,
  handleSSNNumberFieldLength,
} from "../../common/CommonFunctions";
import moment from "moment";
import { STATUS_CODE } from "../../common";
import Loader from "../../components/Loder/loader"

const { TabPane } = Tabs;

const Login = () => {
  const [activeTab, setActiveTab] = useState("1");
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageApi = useCommonMessage();

  const loginSelector = useSelector((state) => state?.loginSliceDetails);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleFormSubmit = (values) => {
    let payload = {
      caspioUserId: values?.memberId,
      ssn: values?.ssnId,
      dob: values?.dateOfBirth,
      deviceType: "COMMON",
      deviceId: "12324",
      fcmToken: "23e24324",
      modelName: "S3-9889",
      deviceName: "Samsung s4",
      brand: "Samsung",
    };
    dispatch(loginHandler(payload));
  };

  useEffect(() => {
    if (loginSelector?.data?.statusCode === STATUS_CODE.OK) {
      messageApi.open({
        type: "success",
        content: loginSelector?.data?.message,
      });
      if (loginSelector?.data?.data?.userAgreement === true) {
        navigate("/dashboard");
      } else if (loginSelector?.data?.data?.userAgreement === false) {
        navigate("/consent");
      }
      dispatch(loginSliceAction.loginDetailsSliceReset());
    } else if (
      loginSelector?.data?.statusCode === STATUS_CODE.NOT_FOUND ||
      loginSelector?.data?.statusCode === STATUS_CODE.BAD_REQUEST
    ) {
      messageApi.open({
        type: "error",
        content: loginSelector?.data?.message,
      });
      dispatch(loginSliceAction.loginDetailsSliceReset());
    }
    else if (
      loginSelector?.message
    ) {
      messageApi.open({
        type: "error",
        content: loginSelector?.message,
      });
      dispatch(loginSliceAction.loginDetailsSliceReset());
    }
  }, [loginSelector]);

  const navigateToSupportRequest = () => {
    navigate("/support-request");
  };

  return (
    <>
    {loginSelector?.isLoading && <Loader loaderTransform = "loaderTransform"/>}
    <div className="loginFlex pc">
      <div className="w-50 h-100 position-relative mobileHide">
        <img src={loginImage} alt="" className="w-100 h-100 object-cover" />
        <img src={LogoWhite} alt="" className="loginLogo" />
        <div className="loginText">
          <h2 className="fs-32 text-white fw-700">
            {t("Prime Care")}{" "}
            <span className="fs-28 text-white fw-300 gbo">
              {t("Provides")} <br /> {t("Nationwide")} <br />{" "}
              {t("Direct Primary Care")}
            </span>
          </h2>
        </div>
      </div>
      <div className="d-flex align-center justify-center w-lg-50 loginside">
        <div className="mx-420 mx-auto">
          <div className="text-center mb-40 mobileShow">
            <img src={PrimecareLogo} alt="" />
          </div>
          <h1 className="fs-36 mb-8 text-lg-center tgb">{t("Login")}</h1>
          <h2 className="fs-28 mb-40 text-lg-center tgb">
            {t("to your account")}
          </h2>

          <Formik
            initialValues={{
              ssnId: "",
              dateOfBirth: null,
              memberId: "",
            }}
            validationSchema={
              activeTab === "1"
                ? loginValidationSsnIdSchema(t)
                : loginValidationMemberIdSchema(t)
            }
            onSubmit={(values, formikBag) => {
              handleFormSubmit(values, formikBag);
            }}
          >
            {({ setFieldValue, resetForm }) => (
              <Form>
                <Tabs
                  defaultActiveKey="1"
                  activeKey={activeTab}
                  onChange={(key) => {
                    setActiveTab(key);
                    resetForm({});
                  }}
                  className="mb-30 logintab"
                >
                  <TabPane tab={t("SSN ID")} key="1" />
                  <TabPane tab={t("Member ID")} key="2" />
                </Tabs>
                <div className="mb-40">
                  {activeTab === "1" && (
                    <>
                      <div className="mb-20">
                        <h2 className="fs-20 mb-20">
                          {t("Enter your SSN ID")}*
                        </h2>
                        <Field
                          type="text"
                          className="inputField"
                          placeholder={t("SSN ID")}
                          name="ssnId"
                          onKeyPress={handleKeyPressSpace}
                          onInput={(event) => handleSSNNumberFieldLength(event)}
                          maxLength={4}
                          autoComplete="off"
                          onKeyDown={(event) => {
                            if (
                              event.key === "ArrowUp" ||
                              event.key === "ArrowDown"
                            ) {
                              event.preventDefault(); 
                            }
                          }}
                        />
                        <ErrorMessage
                          name="ssnId"
                          component="div"
                          className="fs-14 error-message"
                        />
                      </div>
                      <div className="mb-40">
                        <h2 className="fs-20 mb-20">{t("Enter your DOB")}*</h2>
                        <DatePicker
                          className="datepicker"
                          placeholder={t("MM/DD/YYYY")}
                          onChange={(date, dateString) => {
                            setFieldValue("dateOfBirth", dateString);
                          }}
                          format="MM/DD/YYYY"
                          name="dateOfBirth"
                          disabledDate={(current) => {
                            return current && current > moment().endOf("day");
                          }}
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component="div"
                          className="fs-14 error-message"
                        />
                      </div>
                    </>
                  )}
                  {activeTab === "2" && (
                    <>
                      <div className="mb-20">
                        <h2 className="fs-20 mb-20">
                          {t("Enter your Member ID")}*
                        </h2>
                        <Field
                          type="text"
                          className="inputField"
                          placeholder={t("Member ID")}
                          name="memberId"
                          onKeyPress={handleKeyPressSpace}
                          onInput={(event) => handleNumberFieldLength(event)}
                          maxLength={10}
                          autoComplete="off"
                          onKeyDown={(event) => {
                            if (
                              event.key === "ArrowUp" ||
                              event.key === "ArrowDown"
                            ) {
                              event.preventDefault(); 
                            }
                          }}
                        />
                        <ErrorMessage
                          name="memberId"
                          component="div"
                          className="fs-14 error-message"
                        />
                      </div>
                      <div className="mb-40">
                        <h2 className="fs-20 mb-20">{t("Enter your DOB")}*</h2>
                        <DatePicker
                          className="datepicker"
                          placeholder={t("MM/DD/YYYY")}
                          format="MM/DD/YYYY"
                          name="dateOfBirth"
                          onChange={(date, dateString) => {
                            setFieldValue("dateOfBirth", dateString);
                          }}
                          disabledDate={(current) => {
                            return current && current > moment().endOf("day");
                          }}
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component="div"
                          className="fs-14 error-message"
                        />
                      </div>
                    </>
                  )}
                </div>
                <button
                  className="primaryButton w-100 mb-40 cursor-pointer"
                >
                  {t("Continue")}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mb-30 text-lg-center">
            {t("By Signing in you agree to our")}{" "}
            <span
              className="gm cursor-pointer"
              onClick={() =>
                window.open("https://primecaregs.com/notice-of-privacy-practices-for-primecare/", "_blank")
              }
            >
              {t("Privacy Policy")}
            </span>
          </div>
          <div
            className="text-center text-underline text-underline cursor-pointer"
            onClick={navigateToSupportRequest}
          >
            {t("Having trouble signing in?")}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
