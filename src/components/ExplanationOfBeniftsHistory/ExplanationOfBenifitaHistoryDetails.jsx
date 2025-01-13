import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import downloadPdf from "../../assets/images/downloadPdf.svg";
import { useTranslation } from "react-i18next";
import { useCommonMessage } from "../../common/CommonMessage";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import NoDataFound from "../NoDataFound/NoDataFound";
import { getItem } from "../../common/localStorage";
import { getProductListHandler } from "../../redux/action/getProductList";
import { useDispatch, useSelector } from "react-redux";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";

const ExplanationOfBenifitaHistoryDetails = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const { state } = useLocation();
  const messageApi = useCommonMessage();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const zoomPluginInstance = zoomPlugin();
  // const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const getAdminId = getItem("adminId");
  const getAllProductListSelector = useSelector(
    (state) => state?.getProductList
  );
  useEffect(() => {
    if (getAdminId) {
      let payload = {
        userId: getAdminId,
        refBrandId: 2,
      };
      dispatch(getProductListHandler(payload));
    }
  }, [getAdminId]);

  const handleDownload = () => {
    const fileUrl = state?.itemData?.url;
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else if (!fileUrl) {
      messageApi.open({
        type: "error",
        content: "Website link is not available",
      });
    }
  };

  useEffect(() => {
    const url = state?.itemData?.url;
    if (url) {
      setPdfUrl(url);
    } else {
      console.error("PDF URL is invalid or missing");
    }
  }, [state]);

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="d-flex gap-20 align-center">
            <div className="cursor-pointer mobileAbsolute">
              <img
                src={backBtn}
                alt=""
                onClick={() =>
                  navigate("/product-info", {
                    state: state?.stateDashboard,
                  })
                }
                className="backBtn"
              />
              <img
                src={backBtnMobile}
                alt=""
                onClick={() =>
                  navigate("/product-info", {
                    state: state?.stateDashboard,
                  })
                }
                className="backBtnMobile"
              />
            </div>
            <div className="w100lg">
              <h2 className="pageName tgb fs-20 fw-600 mb-10 text-lg-center ">
                {getItem("productName")
                  ? getItem("productName")
                  : getAllProductListSelector?.data?.data?.products?.[0]
                      ?.productName}
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
                    title: t("Products"),
                    onClick: () => navigate("/dashboard"),
                  },
                  {
                    title: state?.stateDashboard?.item?.featureName,
                    onClick: () =>
                      navigate("/product-info", {
                        state: state?.stateDashboard,
                      }),
                  },
                  {
                    title: state?.itemData?.fileName,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="pdfViewer2 marginTop80">
          <div className=" mx-auto h-100 position-relative">
            <div className="pdfReview2 mb-40">
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
                    <Viewer fileUrl={pdfUrl}  />
                  </Worker>
                  <div className="downloadPdf" onClick={handleDownload}>
                    <img src={downloadPdf} alt="" />
                  </div>
                </>
              ) : (
                <NoDataFound />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplanationOfBenifitaHistoryDetails;
