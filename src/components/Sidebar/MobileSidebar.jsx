import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import notificationIcon from "../../assets/images/notificationIcon.svg";
import mobileMenu from "../../assets/images/mobileMenu.svg";
import Logo from "../../assets/images/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getNotificationCountsHandler } from "../../redux/action/getNotificationsCounts";
import { getItem, setItem } from "../../common/localStorage";

const MobileSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAdminId = getItem("adminId");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const getNotificationsCountsSelector = useSelector(
    (state) => state?.getNotificationsCounts
  );

  const getAllProductListSelector = useSelector(
    (state) => state?.getProductList
  );

  useEffect(() => {
    if (getAdminId) {
      dispatch(getNotificationCountsHandler({ userId: getAdminId ?? 0 }));
    }
  }, [getAdminId]);

  useEffect(() => {
    if (getNotificationsCountsSelector?.data?.data?.userAgreement === false) {
      navigate("/consent");
    }
  }, [getNotificationsCountsSelector]);

  useEffect(() => {
    dispatch(getNotificationCountsHandler({ userId: getAdminId ?? 0 }));
  }, []);

  return (
    <>
      <div className="header">
        <div className="headerFlex">
          <div
            className="mobileShow cursor-pointer"
            onClick={() => setMobileSidebar(true)}
          >
            <img src={mobileMenu} alt="" />
          </div>
          <div>
            {" "}
            {window.location.pathname === "/dashboard" ? (
              <>
                <h2 className="pageName fs-20 fw-600 mb-10 tgb">
                  {getItem("productName")
                    ? getItem("productName")
                    : getAllProductListSelector?.data?.data?.products?.[0]
                        ?.productName}
                </h2>
                <Breadcrumb
                  className="breadcrumb"
                  separator={
                    <span>
                      <img src={breadcrumb} alt="" />
                    </span>
                  }
                  items={[
                    {
                      // title: t(
                      //   window.location.pathname
                      //     .split("/")
                      //     .filter(Boolean)
                      //     .map(
                      //       (part) =>
                      //         part.charAt(0).toUpperCase() + part.slice(1)
                      //     )
                      //     .join(" / ")
                      // ),
                      title : t("Products")
                    },
                  ]}
                />
              </>
            ) : (
              <div className="fw-600 tgb">
                {t(
                  window.location.pathname
                    .split("/")
                    .filter(Boolean)
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(" / ")
                )}
              </div>
            )}
          </div>
          <div
            className="cursor-pointer badge"
            onClick={() => navigate("/notification")}
          >
            <img src={notificationIcon} alt="" />
            <sup>
              {getNotificationsCountsSelector?.data?.data?.notificationCount}
            </sup>
          </div>
        </div>
      </div>
      <div
        className={`mobileSidebar mobileShow  ${
          mobileSidebar === true ? "appear" : ""
        }`}
      >
        <div className="mx-280">
          <div className="headerLogoImage">
            <img src={Logo} alt="" />
          </div>
          <div className="p-20">
            <div className="tgb fw-600 mb-20 fs-18">My Products</div>
            {getAllProductListSelector?.data?.data?.products?.map(
              (item, index) => {
                return (
                  <h3
                    className={`productList cursor-pointer ${
                      getItem("productName") ===
                        item?.productName ||
                      (!getItem("productName") &&
                        getAllProductListSelector?.data?.data?.products?.[0]
                          ?.productName === item?.productName)
                        ? "activated"
                        : ""
                    }`}
                    onClick={() => {
                      navigate("/dashboard", { state: item });
                      setItem("groupId", item?.groupId);
                      setItem("productCode", item?.productCode);
                      setItem("productName", item?.productName);
                      setMobileSidebar(false);
                    }}
                    key={index}
                  >
                    {item?.productName}
                  </h3>
                );
              }
            )}
          </div>
        </div>
      </div>
      {mobileSidebar === true ? (
        <>
          <div
            className="mobileOverlay mobileShow cursor-pointer"
            onClick={() => setMobileSidebar(false)}
          ></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MobileSidebar;
