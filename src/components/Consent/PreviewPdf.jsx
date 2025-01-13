import React, { useEffect, useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import NoDataFound from "../NoDataFound/NoDataFound";
// import { zoomPlugin } from '@react-pdf-viewer/zoom';


const PreviewPdf = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  // const zoomPluginInstance = zoomPlugin();
  // const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  useEffect(() => {
    const url = state?.fileUrl;
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
            <h2 className="tgb">{state?.fileName}</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pdfViewer">
          <div className="mx-887 mx-auto h-100 position-relative">
          {pdfUrl ? (
            <>
           {/* <div className=" absoluteIcon ">
           <ZoomOutButton />
            <ZoomPopover />
            <ZoomInButton />
           </div> */}
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl={pdfUrl} 
                />
              </Worker>
              </>
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewPdf;
