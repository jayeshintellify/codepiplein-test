import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import dpcWebsite from "../../assets/images/dpcWebsite.svg";
import dpcPhone from "../../assets/images/dpcPhone.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import downloadPdf from "../../assets/images/downloadPdf.svg";
import { useCommonMessage } from "../../common/CommonMessage";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../NoDataFound/NoDataFound";
import { getItem } from "../../common/localStorage";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { getProductListHandler } from "../../redux/action/getProductList";
import {
  ssoDialCareAction,
  ssoDialCareHandler,
} from "../../redux/action/ssoDialCare";
import Loader from "../Loder/loader";

const Dpcextra = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const navigate = useNavigate();
  const getAdminId = getItem("adminId");
  const { state } = useLocation();
  const { t } = useTranslation();
  const messageApi = useCommonMessage();
  const dispatch = useDispatch();
  // const zoomPluginInstance = zoomPlugin();
  // const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const ssoDialCareSelector = useSelector((state) => state?.ssoDialCare);

  const getAllProductListSelector = useSelector(
    (state) => state?.getProductList
  );

  const handleDownload = () => {
    const fileUrl = state?.itemData?.detailContent?.fileUrl;
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      console.error("File URL is missing");
    }
  };
  const navigateToWebsite = () => {
    if (state?.itemData?.detailContent?.url) {
      window.open(state?.itemData?.detailContent?.url, "_blank");
    } else if (!state?.itemData?.detailContent?.url) {
      messageApi.open({
        type: "error",
        content: "Website link is not available",
      });
    }
  };

  const goToPhone = () => {
    if (state?.itemData?.detailContent?.phone) {
      const phoneNumber = state?.itemData?.detailContent?.phone;
      return phoneNumber ? `tel:${phoneNumber}` : "#";
    } else if (!state?.itemData?.detailContent?.phone) {
      messageApi.open({
        type: "error",
        content: "Phone is not available",
      });
    }
  };

  const navigateToVirtualCare = () => {
    dispatch(ssoDialCareHandler());
    // if(state?.itemData?.detailContent?.virtualCare){
    //   window.open(state?.itemData?.detailContent?.virtualCare,"_blank")
    // }else if(!state?.itemData?.detailContent?.virtualCare) {
    //   messageApi.open({
    //     type: "error",
    //     content: "No Link available",
    //   });
    // }
  };

  useEffect(() => {
    if (ssoDialCareSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: ssoDialCareSelector?.data?.message,
      });
      window.open(ssoDialCareSelector?.data?.data?.url, "_blank");
      dispatch(ssoDialCareAction.ssoDialCareInfoReset());
    } else if (ssoDialCareSelector?.data?.statusCode === 403) {
      messageApi.open({
        type: "error",
        content: ssoDialCareSelector?.data?.message,
      });
      dispatch(ssoDialCareAction.ssoDialCareInfoReset());
    } else if (ssoDialCareSelector?.message) {
      messageApi.open({
        type: "error",
        content: ssoDialCareSelector?.message,
      });
      dispatch(ssoDialCareAction.ssoDialCareInfoReset());
    }
  }, [ssoDialCareSelector]);

  useEffect(() => {
    const url = state?.itemData?.detailContent?.fileUrl;
    if (url) {
      setPdfUrl(url);
    } else {
      console.error("PDF URL is invalid or missing");
    }
  }, [state]);

  useEffect(() => {
    if (getAdminId) {
      let payload = {
        userId: getAdminId,
        refBrandId: 2,
      };
      dispatch(getProductListHandler(payload));
    }
  }, [getAdminId]);

  return (
    <>
      {ssoDialCareSelector?.isLoading && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
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
                    title: state?.itemData?.name,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="pdfViewer">
          <div className="d-flex dpcBtns justify-center gap-20 mb-30">
            {state?.itemData?.detailContent?.phone &&
            state?.itemData?.detailContent?.url ? (
              <>
                <a className="dpcBtn" href={goToPhone()}>
                  <img src={dpcPhone} alt="" />
                  <div>{t("Phone")}</div>
                </a>
                <div className="dpcBtn" onClick={navigateToWebsite}>
                  <img src={dpcWebsite} alt="" />
                  <div>{t("Website")}</div>
                </div>
              </>
            ) : state?.itemData?.detailContent?.phone ? (
              <a className="dpcBtn" href={goToPhone()}>
                <img src={dpcPhone} alt="" />
                <div>{t("Phone")}</div>
              </a>
            ) : state?.itemData?.detailContent?.virtualCare ? (
              <>
                <div className="dpcBtn" onClick={navigateToVirtualCare}>
                  {/* <img src={dpcGloble} alt="" /> */}
                  <div>{t("Virtual Care")}</div>
                </div>
              </>
            ) : state?.itemData?.detailContent?.url ? (
              <div className="dpcBtn" onClick={navigateToWebsite}>
                <img src={dpcWebsite} alt="" />
                <div>{t("Website")}</div>
              </div>
            ) : null}
          </div>
          {/* {state?.itemData?.detailContent?.fileUrl && ( */}
          <div className=" mx-auto position-relative">
            <div className="pdfReview mb-40">
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
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Dpcextra;
