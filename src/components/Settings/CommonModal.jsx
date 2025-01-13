import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import OtpComponant from "./OtpComponant";
import editIconBlue from "../../assets/images/editIconBlue.svg";
import { STATUS_CODE } from "../../common";
import { sendOtpAction, sendOtpHandler } from "../../redux/action/sendOtp";
import { useCommonMessage } from "../../common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { handleKeyPressSpace } from "../../common/CommonFunctions";
import Loader from "../Loder/loader";
import { useTranslation } from "react-i18next";
import { getUserProfileHandler } from "../../redux/action/getUserProfile";

const CommonModal = ({
  isModalOpen,
  setIsModalOpen,
  changeNumber,
  setChangeNumber,
}) => {
  const { t } = useTranslation();
  const [otpEntry, setOtpEntry] = useState(false);
  const messageApi = useCommonMessage();
  const dispatch = useDispatch();
  const sendOtpSelector = useSelector((state) => state?.sendOtp);
  const [emailValue, setEmailValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
    dispatch(getUserProfileHandler());
  };

  const handleFormSubmit = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError("");
    setErrorPhoneNumber("");
    // Check if email is invalid
    if (changeNumber === "Email") {
      if (!emailValue) {
        setError(t("Please enter email address"));
        return;
      } else if (!emailRegex.test(emailValue)) {
        setError(t("Please enter a valid email address"));
        return;
      }
    }

    // Check if phone number is invalid
    if (changeNumber === "Number") {
      if (!phoneNumber) {
        return setErrorPhoneNumber(t("Please enter phone number"));
      }
    }
    // Prepare payload
    let payload = {
      emailAddress: emailValue ? emailValue.trim() : undefined,
      phoneNumber: phoneNumber ? "+1" + phoneNumber.trim() : undefined,
    };

    // Call the API
    dispatch(sendOtpHandler(payload));
  };

  useEffect(() => {
    if (
      sendOtpSelector?.data?.statusCode === STATUS_CODE.BAD_REQUEST ||
      sendOtpSelector?.data?.statusCode === STATUS_CODE.NOT_FOUND ||
      sendOtpSelector?.data?.statusCode === STATUS_CODE.SERVER_ERROR
    ) {
      messageApi.open({
        type: "error",
        content: sendOtpSelector?.data?.message,
      });
      dispatch(sendOtpAction.sendOtpInfoReset());
    } else if (sendOtpSelector?.data?.statusCode === STATUS_CODE.OK) {
      messageApi.open({
        type: "success",
        content: sendOtpSelector?.data?.message,
      });
      setChangeNumber("");
      setOtpEntry(true);
      dispatch(sendOtpAction.sendOtpInfoReset());
    } else if (sendOtpSelector?.message) {
      messageApi.open({
        type: "error",
        content: sendOtpSelector?.message,
      });
      dispatch(sendOtpAction.sendOtpInfoReset());
    }
  }, [sendOtpSelector]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (changeNumber === "Email") {
        if (!emailValue) {
          setError(t("Please enter email address"));
          return;
        } else if (!emailRegex.test(emailValue)) {
          setError(t("Please enter a valid email address"));
          return;
        } else {
          setError("");
        }
      }

      if (changeNumber === "Number") {
        if (!phoneNumber) {
          return setErrorPhoneNumber(t("Please enter phone number"));
        }
      }
      // Prepare payload
      let payload = {
        emailAddress: emailValue ? emailValue.trim() : undefined,
        phoneNumber: phoneNumber ? "+1" + phoneNumber.trim() : undefined,
      };
      dispatch(sendOtpHandler(payload));
    }
  };

  return (
    <>
      {sendOtpSelector?.isLoading && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      <Modal
        className="custom-modal responsiveModal  text-center"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        closeIcon={null}
        centered
      >
        <Formik
          initialValues={{
            country_code: "",
            phoneNumber: "",
            emailId: "",
          }}
          onSubmit={(values, formikBag) => {
            handleFormSubmit(values, formikBag);
          }}
        >
          {({ setErrors, setFieldValue, setFieldError, resetForm, values }) => (
            <Form>
              {changeNumber === "Number" ? (
                <>
                  <div className="gb fs-20 mb-12 text-center">
                    {t("New Phone Number")}
                  </div>
                  <div className="lh-25 mb-20 text-center">
                    {t("Please enter a new phone number to generate")}{" "}
                    <span className="fw-600 gb">
                      {t("One Time Password (OTP)")}
                    </span>
                  </div>
                  <div className="d-flex gap-6 mb-40">
                    <span className="inputField contryCode">+1</span>
                    <input
                      type="number"
                      className="inputField"
                      placeholder={t("Phone Number")}
                      onKeyPress={handleKeyPressSpace}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setErrorPhoneNumber("");
                      }}
                      defaultValue={phoneNumber}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                  </div>
                  {errorPhoneNumber && (
                    <p className="fs-14 error-message">{errorPhoneNumber}</p>
                  )}
                  <div className="yesNoOption">
                    <button
                      className="noBtn"
                      onClick={() => {
                        setIsModalOpen(false);
                        setError("");
                      }}
                    >
                      {t("Cancel")}
                    </button>
                    <button className="yesBtn" type="submit">
                      {t("Continue")}
                    </button>
                  </div>
                </>
              ) : changeNumber === "Email" ? (
                <>
                  <div className="gb fs-20 mb-12 text-center">{t("New Email")}</div>
                  <div className="lh-25 mb-20 text-center">
                    {t("Please enter a new Email ID to generate")}{" "}
                    <span className="fw-600 gb">
                      {t("One Time Password (OTP)")}
                    </span>
                  </div>
                  <div className="d-flex gap-6 mb-40">
                    <input
                      type="text"
                      className="inputField"
                      placeholder={t("Email ID")}
                      name="emailId"
                      onChange={(e) => {
                        setEmailValue(e.target.value);
                        setError("");
                      }}
                      onKeyPress={handleKeyPressSpace}
                      autoComplete="off"
                      defaultValue={emailValue}
                      onKeyDown={(e) => handleEnter(e)}
                    />
                  </div>
                  {error && <p className="fs-14 error-message">{error}</p>}
                  <div className="yesNoOption">
                    <button
                      className="noBtn"
                      onClick={() => {
                        setIsModalOpen(false);
                        setError("");
                      }}
                    >
                      {t("Cancel")}
                    </button>
                    <button className="yesBtn" type="submit">
                      {t("Continue")}
                    </button>
                  </div>
                </>
              ) : changeNumber === "verify" ? (
                <>
                  <div className="gb fs-20 lh-25 mb-40 text-center">
                    {emailValue
                      ? t("Your Email ID has been changed successfully")
                      : t("Your phone number has been changed successfully")}
                  </div>
                  <div className="text-center">
                    <button
                      className="saveBtn cursor-pointer w-117"
                      onClick={handleCloseModal}
                    >
                      {t("Okay")}
                    </button>
                  </div>
                </>
              ) : null}
            </Form>
          )}
        </Formik>
        {otpEntry && (
          <OtpComponant
            otpEntry={otpEntry}
            setOtpEntry={setOtpEntry}
            setChangeNumber={setChangeNumber}
            setIsModalOpen={setIsModalOpen}
            emailValue={emailValue}
            phoneNumber={phoneNumber}
          />
        )}
      </Modal>
    </>
  );
};

export default CommonModal;
