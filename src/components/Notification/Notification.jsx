import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import nodatanotification from "../../assets/images/nodatanotification.svg";
import { Breadcrumb } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { getNotificationsHandler } from "../../redux/action/getNotifications";
import {
  updateNotificationAction,
  updateNotificationHandler,
} from "../../redux/action/updateNotification";
import { useCommonMessage } from "../../common/CommonMessage";
import { getItem } from "../../common/localStorage";
import Loader from "../Loder/loader";

const Notification = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const messageApi = useCommonMessage();
  const { t } = useTranslation();
  const getNotificationSelector = useSelector(
    (state) => state?.getNotifications
  );

  const updateNotificationSelector = useSelector(
    (state) => state?.updateNotification
  );

  const notifications =
    getNotificationSelector?.data?.data?.notifications || [];
  // Separate notifications into "Today" and "Earlier"

  const todayNotifications = notifications.filter((item) =>
    moment().isSame(moment(item?.createdAt), "day")
  );

  const earlierNotifications = notifications.filter(
    (item) => !moment().isSame(moment(item?.createdAt), "day")
  );

  const getAdminId = getItem("adminId");

  useEffect(() => {
    let payload = {
      userId: getAdminId ?? 0,
      unreadOnly: false,
    };
    dispatch(getNotificationsHandler(payload));
  }, []);

  const updateNotification = (item) => {
    let payload = {
      notificationIds: [item?.id],
    };
    dispatch(updateNotificationHandler(payload));
  };

  useEffect(() => {
    if (updateNotificationSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: updateNotificationSelector?.data?.message,
      });
      dispatch(updateNotificationAction.updateNotificationInfoReset());
      let payload = {
        userId: getAdminId ?? 0,
        unreadOnly: false,
      };
      dispatch(getNotificationsHandler(payload));
    }
  }, [updateNotificationSelector]);

  return (
    <>
    {getNotificationSelector?.isLoading && <Loader loaderTransForm = "loaderTransForm" />}
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
              <h2 className="pageName tgb fs-20 fw-600 mb-10 text-lg-center">
                {t("Notifications")}
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
                    title: t("Notifications"),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-887 mx-auto py-50 mobileMargin">
        <div className="mb-30">
          {todayNotifications?.length > 0 && (
            <>
              <div className="fs-16 gb fw-600 mb-16">{t("Today")}</div>
              {todayNotifications?.map((item, index) => (
                <div
                  className={
                    item?.readStatus === false
                      ? "notification unread"
                      : "notification"
                  }
                  key={index}
                  onClick={() => updateNotification(item)}
                >
                  <div className="fs-20 gb fw-600 mb-22">{item?.title}</div>
                  <p className="mb-40">{item?.description}</p>
                  <div className="text-end fs-14">
                    {moment(item?.createdAt).format("DD MMMM")}
                  </div>
                </div>
              ))}
            </>
          )}
          {earlierNotifications?.length > 0 && (
            <>
              <div className="fs-16 gb fw-600 mb-16">{t("Earlier")}</div>
              {earlierNotifications?.map((item, index) => (
                <div
                  className="notification"
                  key={index}
                  onClick={() => updateNotification(item)}
                >
                  <div className="fs-20 gb fw-600 mb-22">{item?.title}</div>
                  <p className="mb-40">{item?.description}</p>
                  <div className="text-end fs-14">
                    {moment(item?.createdAt).format("DD MMMM")}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {todayNotifications?.length === 0 &&
          earlierNotifications?.length === 0 && (
            <div className=" noData">
              <div>
                <img src={nodatanotification} alt="" />
                <p>{t("No notifications found")}</p>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Notification;
