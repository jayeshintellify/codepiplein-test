import { Collapse } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import nodatafaq from "../../assets/images/nodatafaq.svg";
import { useDispatch, useSelector } from "react-redux";
import { getProductFeaturesHandler } from "../../redux/action/getProductFeatures";
import Loader from "../../components/Loder/loader";
import { getItem } from "../../common/localStorage";

const FAQs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getAdminId = getItem("adminId");
  const getGroupId = getItem("groupId");
  const getProdcuctId = getItem("productCode");

  const getProductFeaturesSelector = useSelector(
    (state) => state?.getProductFeatures
  );
  console.log(getProductFeaturesSelector,"getProductFeaturesSelector")

  const getAllProductListSelector = useSelector(
    (state) => state?.getProductList
  );

  useEffect(() => {
    if (getAdminId) {
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
  }, [getAdminId, getGroupId, getProdcuctId,getAllProductListSelector]);

  const MinusOutlined = () => (
    <svg
      id="Group_1174"
      data-name="Group 1174"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_439"
            data-name="Rectangle 439"
            width="24"
            height="24"
            fill="#15345a"
          />
        </clipPath>
      </defs>
      <rect
        id="Rectangle_441"
        data-name="Rectangle 441"
        width="24"
        height="24"
        fill="none"
      />
      <g id="Group_1174-2" data-name="Group 1174" transform="translate(0 0.48)">
        <rect
          id="Rectangle_440"
          data-name="Rectangle 440"
          width="18.24"
          height="19.2"
          transform="translate(3.84 1.92)"
          fill="none"
        />
        <g id="fi-rs-add" clip-path="url(#clip-path)">
          <path
            id="Path_362"
            data-name="Path 362"
            d="M9.14,0A9.15,9.15,0,1,0,15.6,2.68,9.14,9.14,0,0,0,9.14,0Zm0,16.756a7.625,7.625,0,1,1,5.383-2.233A7.616,7.616,0,0,1,9.14,16.756ZM9.9,8.378h3.047V9.9H5.331V8.378H9.9Z"
            transform="translate(2.381 2.38)"
            fill="#15345a"
          />
        </g>
      </g>
    </svg>
  );
  const PlusOutlined = () => (
    <svg
      id="Group_1175"
      data-name="Group 1175"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_442"
            data-name="Rectangle 442"
            width="20"
            height="20"
            fill="#15345a"
          />
        </clipPath>
      </defs>
      <rect
        id="Rectangle_443"
        data-name="Rectangle 443"
        width="24"
        height="24"
        fill="none"
      />
      <g id="fi-rs-add" transform="translate(2 2)" clip-path="url(#clip-path)">
        <path
          id="Path_363"
          data-name="Path 363"
          d="M10,0a10.011,10.011,0,1,0,7.068,2.932A10,10,0,0,0,10,0Zm0,18.333a8.342,8.342,0,1,1,5.89-2.443A8.333,8.333,0,0,1,10,18.333Zm.833-9.167h3.333v1.667H10.833v3.333H9.167V10.833H5.833V9.167H9.167V5.833h1.667Z"
          transform="translate(0)"
          fill="#15345a"
        />
      </g>
    </svg>
  );
  const customExpandIcon = ({ isActive }) =>
    isActive ? <MinusOutlined /> : <PlusOutlined />;

  return (
    <>
      {getProductFeaturesSelector?.isLoading && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      {getProductFeaturesSelector?.data?.data?.faq?.content?.questions?.length >
      0 ? (
        <>
          <div className="mainSection">
            <Collapse
              accordion
              items={getProductFeaturesSelector?.data?.data?.faq?.content?.questions?.map(
                (item) => {
                  return {
                    label: item?.question,
                    children: item?.answer,
                  };
                }
              )}
              expandIcon={customExpandIcon}
            />
          </div>
        </>
      ) : (
        <div className="mobileMargin noData">
          <div>
            <img src={nodatafaq} alt="" />
            <p>{t("No faqs found")}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQs;
