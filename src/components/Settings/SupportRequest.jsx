import React, { useEffect, useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useNavigate } from "react-router-dom";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import { Breadcrumb } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  supportRequestAction,
  supportRequestHandler,
} from "../../redux/action/supportRequest";
import Loader from "../Loder/loader";
import { supportReqValidationSchema } from "./settingsValidation";
import { STATUS_CODE } from "../../common";
import { useCommonMessage } from "../../common/CommonMessage";
import { handleKeyPressSpace } from "../../common/CommonFunctions";
import { useTranslation } from "react-i18next";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SupportRequestModal from "./SupportRequestModal";
import { getItem } from "../../common/localStorage";

const SupportRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messageApi = useCommonMessage();
  const { t } = useTranslation();

  const supportRequestSelector = useSelector((state) => state?.supportRequest);
  const supportReqData = JSON.parse(getItem("loginResponse"));

  const handleFormSubmit = (values) => {
    if (
      values?.firstName &&
      values?.lastName &&
      values?.emailId &&
      values?.memberId &&
      // values?.phoneNumber &&
      values?.description
    ) {
      let payload = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        emailId: values?.emailId,
        memberId: values?.memberId,
        // phoneNumber: values?.phoneNumber,
        description: values?.description,
      };
      dispatch(supportRequestHandler(payload));
    }
  };

  useEffect(() => {
    if (supportRequestSelector?.data?.statusCode === STATUS_CODE.OK) {
      messageApi.open({
        type: "success",
        content: supportRequestSelector?.data?.message,
      });
      setIsModalOpen(true);
      dispatch(supportRequestAction.supportRequestInfoReset());
    }
  }, [supportRequestSelector]);

  return (
    <>
      {supportRequestSelector?.isLoading && (
        <Loader loaderTransForm="loaderTransForm" />
      )}
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg pt-30 pb-16 breadcrumbAboslute">
            <img
              src={backBtn}
              onClick={() => navigate("/settings")}
              className="cursor-pointer backBtn"
              alt=""
            />
            <img
              src={backBtnMobile}
              onClick={() => navigate("/settings")}
              className="cursor-pointer backBtnMobile mobileAbsolute"
              alt=""
            />
            <div>
              <h2 className="fs-20 mb-10 pageName tgb">{t("Support Request")}</h2>
              <Breadcrumb
                className="breadcrumb cursor-pointer"
                separator={
                  <span>
                    <img src={breadcrumb} alt="" />
                  </span>
                }
                items={[
                  {
                    title: t("Settings"),
                    onClick: () => navigate("/settings"),
                  },
                  {
                    title: t("Support Request"),
                  },
                ]}
              />
            </div>
            {/* <div className="mobileShow" onClick={() => navigate("/settings")}>
              <img src={doneIcon} alt="" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="py-50 mobileMargin">
        <Formik
          enableReinitialize
          initialValues={{
            firstName: supportReqData?.firstName,
            lastName: supportReqData?.lastName,
            emailId: supportReqData?.emailAddress,
            memberId: supportReqData?.caspioUserId,
            description: "",
          }}
          validationSchema={supportReqValidationSchema(t)}
          onSubmit={(values, formikBag) => {
            handleFormSubmit(values, formikBag);
          }}
        >
          {({ setErrors, setFieldValue, setFieldError, resetForm, values }) => (
            <Form>
              <div className="supportgrid mb-40 py-50 mx-auto">
                <div className="">
                  <h3 className="fs-20 mb-20">{t("First Name")}*</h3>
                  <Field
                    type="text"
                    className="inputField"
                    placeholder={t("First Name")}
                    name="firstName"
                    autoComplete="Off"
                    maxLength={40}
                    onKeyPress={handleKeyPressSpace}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="fs-14 error-message"
                  />
                </div>
                <div className="">
                  <h3 className="fs-20 mb-20">{t("Last Name")}*</h3>
                  <Field
                    type="text"
                    className="inputField"
                    placeholder={t("Last Name")}
                    name="lastName"
                    autoComplete="Off"
                    maxLength={40}
                    onKeyPress={handleKeyPressSpace}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="fs-14 error-message"
                  />
                </div>

                <div className="">
                  <h3 className="fs-20 mb-20">{t("Email ID")}*</h3>
                  <Field
                    type="text"
                    className="inputField"
                    placeholder={t("Email ID")}
                    name="emailId"
                    autoComplete="Off"
                    onKeyPress={handleKeyPressSpace}
                  />
                  <ErrorMessage
                    name="emailId"
                    component="div"
                    className="fs-14 error-message"
                  />
                </div>

                <div className="">
                  <h3 className="fs-20 mb-20">{t("Member ID")}*</h3>
                  <Field
                    type="text"
                    className="inputField"
                    placeholder={t("Member ID")}
                    name="memberId"
                    autoComplete="Off"
                    onKeyPress={handleKeyPressSpace}
                  />
                  <ErrorMessage
                    name="memberId"
                    component="div"
                    className="fs-14 error-message"
                  />
                </div>
                <div>
                  <h3 className="fs-20 mb-20">{t("Description")}*</h3>
                  <Field
                    rows={5}
                    className="inputField"
                    type="textarea"
                    placeholder={t("Description")}
                    name="description"
                    maxLength="500"
                    onKeyPress={handleKeyPressSpace}
                    autoComplete="Off"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="fs-14 error-message"
                  />
                </div>
              </div>
              <div className="text-center ">
                <button className="saveBtn cursor-pointer w-support" type="submit">
                  {t("Send")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isModalOpen && (
        // <Modal
        //   className="ok-modal2"
        //   centered
        //   open={isModalOpen}
        //   onOk={handleOk}
        //   onCancel={handleCancel}
        //   footer={null}
        //   closeIcon={null}
        // >
        //   <div className="tgb fs-20 lh-25 mb-40 text-center">
        //     Support Request sent successfully!
        //   </div>
        //   <div className="text-center">
        //     <button
        //       className="saveBtn cursor-pointer w-117"
        //       onClick={() => navigate("/settings")}
        //     >
        //       Ok
        //     </button>
        //   </div>
        // </Modal>
        <SupportRequestModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default SupportRequest;
