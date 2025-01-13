import React, { useEffect } from "react";
import contact from "../../assets/images/contact.svg";
import nodatacontact from "../../assets/images/nodatacontact.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getProductFeaturesHandler } from "../../redux/action/getProductFeatures";
import { getItem } from "../../common/localStorage";
import { useCommonMessage } from "../../common/CommonMessage";
import {
  ssoDialCareAction,
  ssoDialCareHandler,
} from "../../redux/action/ssoDialCare";
import Loader from "../Loder/loader";

const Contact = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const messageApi = useCommonMessage();

  const ssoDialCareSelector = useSelector((state) => state?.ssoDialCare);

  const getAdminId = getItem("adminId");
  const getGroupId = getItem("groupId");
  const getProdcuctId = getItem("productCode");

  const getProductFeaturesSelector = useSelector(
    (state) => state?.getProductFeatures
  );

  const getAllProductListSelector = useSelector(
    (state) => state?.getProductList
  );

  useEffect(() => {
    if (getAdminId && getProductFeaturesSelector) {
      let payload = {
        userId: getAdminId ?? 0,
        groupId: getGroupId
          ? getGroupId
          : getAllProductListSelector?.data?.data?.products?.[0].groupId,
        productCode: getProdcuctId
          ? getProdcuctId
          : getAllProductListSelector?.data?.data?.products?.[0].productCode,
      };
      dispatch(getProductFeaturesHandler(payload));
    }
  }, [getGroupId, getProdcuctId, getAllProductListSelector]);

  const virtualCareHandler = () => {
    dispatch(ssoDialCareHandler());
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

  return (
    <>
      {ssoDialCareSelector?.isLoading && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      <div className="mainSection">
        {getProductFeaturesSelector?.data?.data?.contactInfo?.content
          ?.contactInfo?.number && (
          <>
            <div className="contactFlex d-flex gap-20 align-center">
              <div className="contactNumber">
                <img src={contact} alt="" />
                <div className="fs-20 fw-600 gb">
                  {state?.data?.data?.contactInfo?.content?.contactInfo
                    ?.number ||
                    getProductFeaturesSelector?.data?.data?.contactInfo?.content
                      ?.contactInfo?.number}
                </div>
              </div>
              {/* <button className="secondaryButton mobileHide">
              {t("Contact")}
            </button> */}
              <a
                href={`tel:${
                  state?.data?.data?.contactInfo?.content?.contactInfo
                    ?.number ||
                  getProductFeaturesSelector?.data?.data?.contactInfo?.content
                    ?.contactInfo?.number
                }`}
                className="secondaryButton mobileHide"
              >
                {t("Contact")}
              </a>
              <a
                href={`tel:${getProductFeaturesSelector?.data?.data?.contactInfo?.content?.contactInfo?.number}`}
                className="secondaryButton mobileShow"
              >
                {t("Contact")}
              </a>
            </div>
          </>
        )}
        <div className="d-flex gap-20 align-center">
          <div className="virtualCare">
            <button
              className="secondaryButton w-100 cursor-pointer"
              onClick={virtualCareHandler}
            >
              {t("Virtual Care")}
            </button>
          </div>
        </div>
      </div>
      {/* {isModalOpen && (
        <Modal
          className="custom-modal text-center  contactModal"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}
          closeIcon={null}
          centered
        >
          <div className="gb fs-16 fw-600 text-center mb-24">
            Call +1 12345 12345
          </div>
          <div className="yesNoOption">
            <button className="noBtn" onClick={handleCloseModal}>
              Cancel
            </button>
            <button className="yesBtn" onClick={handleCloseModal}>
              Verify
            </button>
          </div>
        </Modal>
      )} */}
    </>
  );
};

export default Contact;
