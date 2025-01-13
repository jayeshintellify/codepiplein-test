import React, { useEffect, useRef, useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useNavigate } from "react-router-dom";
import ReactSignatureCanvas from "react-signature-canvas";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loder/loader";
import { getShowAgreementHandler } from "../../redux/action/getShowAgreement";
import {
  acceptAgreementAction,
  acceptAgreementHandler,
} from "../../redux/action/acceptAgreement";
import { useCommonMessage } from "../../common/CommonMessage";
import { useTranslation } from "react-i18next";
import { getItem } from "../../common/localStorage";

const Esign = () => {
  const [isSigned, setIsSigned] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const { t } = useTranslation();

  const acceptAgreementSelctor = useSelector((state) => state?.acceptAgreement);
  const getShowAgreementSelector = useSelector(
    (state) => state?.getShowAgreementMain
  );
  const messageApi = useCommonMessage();

  const getLoginId = getItem("adminId");

  useEffect(() => {
    dispatch(getShowAgreementHandler());
  }, []);

  const signatureRef = useRef(null);

  const clear = () => {
    signatureRef.current.clear();
    setIsSigned(false);
  };

  useEffect(() => {
    if (acceptAgreementSelctor?.data?.statusCode === 200) {
      navigate("/pdf-review", { state: acceptAgreementSelctor });
    }
  }, [acceptAgreementSelctor]);

  const save = () => {
    if (signatureRef.current.isEmpty()) {
      // Optionally, you can show an error message to the user
      alert("Please provide a signature before continuing.");
      return;
    }

    const dataURL = signatureRef.current.toDataURL();
    let payload = {
      userId: getLoginId,
      agreementVersion: getShowAgreementSelector?.data?.data?.agreementVersion,
      deviceId: "",
      platform: "",
      location: "",
      base64Image: dataURL,
    };

    dispatch(acceptAgreementHandler(payload));
  };

  useEffect(() => {
    if (acceptAgreementSelctor?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: acceptAgreementSelctor?.data?.message,
      });
      dispatch(acceptAgreementAction.acceptAgreementInfoReset());
    }
  }, [acceptAgreementSelctor]);

  // Function to check if the canvas is empty and update the state
  const handleSignature = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      setIsSigned(true);
    }
  };
  return (
    <>
      {acceptAgreementSelctor?.isLoading && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg">
            <img
              src={backBtn}
              onClick={() => navigate("/consent")}
              className="cursor-pointer backBtn"
              alt=""
            />
            <img
              src={backBtnMobile}
              onClick={() => navigate("/consent")}
              className="cursor-pointer backBtnMobile"
              alt=""
            />
            <h2 className="tgb">{t("eSign - Document")}</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="py-50 mobileSignMargin">
          <h2 className="mb-20 ">{t("Draw your signature on the box below")}</h2>
          <ReactSignatureCanvas
            ref={signatureRef}
            penColor="black"
            canvasProps={{ className: "signature-canvas mb-20" }}
            onEnd={handleSignature}
          />
          <div className="text-end mb-40 cursor-pointer" onClick={clear}>
            {t("Clear")}
          </div>
          <div className="mx420 mx-auto">
            <button
              onClick={save}
              disabled={!isSigned}
              className={`primaryButton w-100 cursor-pointer ${
                !isSigned ? "disable" : "activated"
              }`}
            >
              {t("Continue")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Esign;
