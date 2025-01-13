import React, { useEffect, useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import downloadPdf from "../../assets/images/downloadPdf.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getShowAgreementHandler } from "../../redux/action/getShowAgreement";
import { useTranslation } from "react-i18next";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import NoDataFound from "../NoDataFound/NoDataFound";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";

const PdfReview = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { state } = useLocation();
  // const zoomPluginInstance = zoomPlugin();
  // const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  useEffect(() => {
    dispatch(getShowAgreementHandler());
  }, []);

  const handleDownload = () => {
    const fileUrl = state?.data?.data?.files?.[0]?.fileUrl;
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      console.error("File URL is missing");
    }
  };
  useEffect(() => {
    const url = state?.data?.data?.files?.[0]?.fileUrl;
    if (url) {
      setPdfUrl(url);
    } else {
      console.error("PDF URL is invalid or missing");
    }
  }, [state]);

  return (
    <>
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
            <h2 className="tgb">{state?.data?.data?.files?.[0]?.fileName}</h2>
          </div>
        </div>
      </div>
      <div className="container marginTop80">
        {/* <h3 className="pdfPageNumber">
          <span>01</span> of <span>02</span>
        </h3> */}
        <div className="mx-887 mx-auto h-100 position-relative">
          <div className="pdfReview mb-40">
            {pdfUrl ? (
              <>
              {/* <div className=" absoluteIcon signedDoc">
                  <ZoomOutButton />
                  <ZoomPopover />
                  <ZoomInButton />
                </div> */}
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                   <Viewer fileUrl={pdfUrl} />
                </Worker>
                <div className="downloadPdf" onClick={handleDownload}>
                  <img src={downloadPdf} alt="" />
                </div>
              </>
            ) : (
              <NoDataFound />
            )}
          </div>

          <div className="mx-420 mx-auto p-0">
            <button
              className="primaryButton w-100 mb-40 cursor-pointer"
              onClick={() => navigate("/show-sign-document", { state: state })}
            >
              {t("Continue")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfReview;
