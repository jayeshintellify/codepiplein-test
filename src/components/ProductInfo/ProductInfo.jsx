import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useLocation, useNavigate } from "react-router-dom";
import downArrow from "../../assets/images/downArrow.svg";
import { useTranslation } from "react-i18next";
import pdfViewIcon from "../../assets/images/pdfViewIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { getItem } from "../../common/localStorage";
import { getProductListHandler } from "../../redux/action/getProductList";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";

const ProductInfo = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const getAdminId = getItem("adminId");
  // const zoomPluginInstance = zoomPlugin();
  // const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
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

  useEffect(() => {
    const url = state?.item?.content?.file?.url;
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
                onClick={() => navigate("/dashboard")}
                className="backBtn"
              />
              <img
                src={backBtnMobile}
                alt=""
                onClick={() => navigate("/dashboard")}
                className="backBtnMobile"
              />
            </div>
            <div className="w100lg">
              <h2 className="pageName tgb mobileHide fs-20 fw-600 mb-10 text-lg-center ">
                {getItem("productName")
                  ? getItem("productName")
                  : getAllProductListSelector?.data?.data?.products?.[0]
                      ?.productName}
              </h2>
              <h2 className="pageName tgb mobileShow fs-20 fw-600 mb-10 text-lg-center ">
                {getItem("featureName")
                  ? getItem("featureName")
                  : getAllProductListSelector?.data?.data?.products?.[0]
                      ?.featureName}
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
                    title:
                      state?.item?.featureName ||
                      getItem("featureName"),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {state?.item?.content?.type === "pdf_url" && pdfUrl ? (
        <div className="container">
          <div className="pdfViewer position-relative">
            <div className="mx-887 mx-auto h-100">
              {/* <div className=" absoluteIcon ">
                <ZoomOutButton />
                <ZoomPopover />
                <ZoomInButton />
              </div> */}
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl={pdfUrl} />
              </Worker>
            </div>
          </div>
        </div>
      ) : !state?.item?.content?.type ||
        state?.item?.content?.componants?.length === 0 ? (
        <NoDataFound />
      ) : state?.item?.content?.type === "Dpcextra" ? (
        <div className="mainSection container">
          <div className="dashboardGrid dpcExtra">
            {state?.item?.content?.componants?.map((item, index) => {
              return (
                <div
                  className="dashboardCard"
                  onClick={() =>
                    navigate("/dpcextra", {
                      state: { itemData: item, stateDashboard: state },
                    })
                  }
                  key={index}
                >
                  <img
                    src={item?.iconUrl}
                    alt=""
                    className="mb-16 featureImage"
                  />
                  <div className="gb fs-20 fw-600">{item?.name}</div>
                  <img src={downArrow} alt="" className="redirectArrow" />
                </div>
              );
            })}
          </div>
        </div>
      ) : state?.item?.content?.type === "html" ? (
        <>
          <div className="container py-50 mobileMargin">
            <iframe
              title="Dynamic Content"
              className="iframeheight"
              srcDoc={state?.item?.content?.html?.html_content}
              style={{
                width: "100%",
                border: "none",
              }}
            />
          </div>
        </>
      ) : state?.item?.content?.type === "multi_pdf" ? (
        <div className="mainSection container">
          <div className="dashboardGrid dpcExtra">
            {state?.item?.content?.files?.map((item, index) => {
              return (
                <div
                  className="dashboardCard"
                  onClick={() =>
                    navigate("/explanation-of-benifits-history", {
                      state: { itemData: item, stateDashboard: state },
                    })
                  }
                  key={index}
                >
                  <img
                    src={pdfViewIcon}
                    alt=""
                    className="mb-16 featureImage"
                  />
                  <div className="gb fs-20 fw-600">{item?.fileName}</div>
                  <img src={downArrow} alt="" className="redirectArrow" />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default ProductInfo;
