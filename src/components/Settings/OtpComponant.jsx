import React, { useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import editIconBlue from "../../assets/images/editIconBlue.svg";
import { Form, Formik } from "formik";
import {
  verifyOtpAction,
  verifyOtpHandler,
} from "../../redux/action/verifyOtp";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loder/loader";
import { STATUS_CODE } from "../../common";
import { useCommonMessage } from "../../common/CommonMessage";
import { sendOtpHandler } from "../../redux/action/sendOtp";
import { useTranslation } from "react-i18next";
import { getItem } from "../../common/localStorage";

const OtpComponant = ({
  otpEntry,
  setOtpEntry,
  setChangeNumber,
  setIsModalOpen,
  email,
  emailValue,
  phoneNumber,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const messageApi = useCommonMessage();

  const getAdminId = JSON.parse(getItem("loginResponse"));

  const verifyOtpSelector = useSelector((state) => state?.verifyOtp);
  const updateUserSelector = useSelector((state) => state?.updateUserProfile);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleFormSubmit1 = () => {
    if (!otp) {
      setError(t("Please enter OTP"));
      return;
    } else if (otp) {
      let payload = {
        userId: getAdminId?.id,
        phoneNumber: phoneNumber ? "+1" + phoneNumber : undefined,
        emailAddress: emailValue ? emailValue.trim() : undefined,
        otp: otp,
      };
      dispatch(verifyOtpHandler(payload));
    }
  };

  const resendOtp = () => {
    let payload = {
      emailAddress: emailValue ? emailValue.trim() : undefined,
      phoneNumber: phoneNumber ? "+1" + phoneNumber.trim() : undefined,
    };
    dispatch(sendOtpHandler(payload));
    setError("");
    setSeconds(30);
    setOtp("")
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    if (verifyOtpSelector?.data?.statusCode === STATUS_CODE.OK) {
      messageApi.open({
        type: "success",
        content: verifyOtpSelector?.data?.message,
      });
      setOtp("");
      setOtpEntry(false);
      setChangeNumber("verify");
      dispatch(verifyOtpAction.verifyOtpInfoReset());
    } else if (
      verifyOtpSelector?.data?.statusCode === STATUS_CODE.BAD_REQUEST ||
      verifyOtpSelector?.data?.statusCode === STATUS_CODE.NOT_FOUND ||
      verifyOtpSelector?.data?.statusCode === STATUS_CODE.SERVER_ERROR
    ) {
      messageApi.open({
        type: "error",
        content: verifyOtpSelector?.data?.message,
      });
      dispatch(verifyOtpAction.verifyOtpInfoReset());
    } else if (verifyOtpSelector?.message) {
      messageApi.open({
        type: "error",
        content: verifyOtpSelector?.message,
      });
      dispatch(verifyOtpAction.verifyOtpInfoReset());
    }
  }, [verifyOtpSelector]);

  const handleEnterOTP = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!otp) {
        setError(t("Please enter OTP"));
        return;
      } else if (otp) {
        let payload = {
          userId: getAdminId?.id,
          phoneNumber: phoneNumber ? "+1" + phoneNumber : undefined,
          emailAddress: emailValue ? emailValue.trim() : undefined,
          otp: otp,
        };
        dispatch(verifyOtpHandler(payload));
      }
    }
  };

  return (
    <>
      {(verifyOtpSelector?.isLoading || updateUserSelector?.isLoading) && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      <div className="gb fs-20 mb-12 text-center">{t("Enter OTP")}</div>
      <div className="lh-25 mb-20 text-center mb-12">
        {t("Enter the verification code sent on")}
      </div>
      <div className="fw-600 gb d-flex justify-center align-center gap-6 mb-20">
        {emailValue || "+1" + phoneNumber}
        <img
          src={editIconBlue}
          alt=""
          className="cursor-pointer"
          onClick={() => {
            setOtpEntry(false);
            setChangeNumber(emailValue ? "Email" : "Number");
          }}
        />
      </div>
      <Formik
        initialValues={{
          otp: "",
        }}
        onSubmit={(values, formikBag) => {
          handleFormSubmit1(values, formikBag);
        }}
      >
        {({ setErrors, setFieldValue, setFieldError, resetForm, values }) => (
          <Form>
            <MuiOtpInput
              className="otpComponant mb-10"
              length={6}
              value={otp}
              onChange={handleChange}
              onKeyDown={(e) => handleEnterOTP(e)}
            />
            {!otp && <p className="fs-14 error-message">{error}</p>}
            <div className="text-end mb-40">
              {seconds > 0 || minutes > 0 ? (
                <p>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <>
                  <p>
                    <p className="fs-12 cursor-pointer">
                      <span onClick={resendOtp}>{t("Resend")}</span>
                    </p>
                  </p>
                </>
              )}
            </div>
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
                {t("Verify")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OtpComponant;
