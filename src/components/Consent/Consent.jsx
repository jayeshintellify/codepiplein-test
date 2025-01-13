import React, { useEffect, useState } from "react";
import pdfIcon from "../../assets/images/pdfIcon.svg";
import rightArrow from "../../assets/images/rightArrow.svg";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getShowAgreementHandler } from "../../redux/action/getShowAgreement";
import Loader from "../Loder/loader";

const Consent = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const getShowAgreementSelector = useSelector(
    (state) => state?.getShowAgreementMain
  );
  useEffect(() => {
    dispatch(getShowAgreementHandler());
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      {getShowAgreementSelector?.isLoading && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      <div className="">
        <div className="consentForm mx-auto">
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: getShowAgreementSelector?.data?.data?.agreementHtml,
            }}
          />
          <div className="divider"></div>
          <h2 className="fw-600 mb-20"> {t("Review and Sign Documents.")}</h2>

          <div className="d-flex gap-10 mb-40 flex-lg">
            {getShowAgreementSelector?.data?.data?.files?.map((item, index) => {
              return (
                <div
                  className="pdfPreview justify-between cursor-pointer "
                  onClick={() => navigate("/preview-pdf", { state: item })}
                  key={index}
                >
                  <div className="d-flex align-center gap-6">
                    <img src={pdfIcon} alt="" />
                    <p className="m-0">
                    {item?.fileName}
                    </p>
                  </div>
                  <img src={rightArrow} alt="" />
                </div>
              );
            })}
          </div>
          <div className="d-flex mb-40">
            <Checkbox
              className="customCheckbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            >
              {t("I agree to review and sign the documents.")}
            </Checkbox>
          </div>
          <div className="mx420">
            <button
              // className="primaryButton w-100 cursor-pointer disable  activeted"
              className={`primaryButton w-100 cursor-pointer ${
                isChecked ? "activeted" : "disable"
              }`}
              onClick={() => navigate("/eSign")}
              disabled={!isChecked}
            >
              {t("Sign Document")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consent;
