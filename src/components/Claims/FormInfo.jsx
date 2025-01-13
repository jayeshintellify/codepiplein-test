import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { Breadcrumb } from "antd";
import breadcrumb from "../../assets/images/breadcrumb.svg";
// import ShowMoreText from "react-show-more-text";

const FormInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 120;
  const navigate = useNavigate();

  const { state } = useLocation();
  const { t } = useTranslation();

  const navigateToFormstart = () => {
    navigate("/form", { state: state });
  };

  const totalQuestions = state?.item?.formData?.length || 0;
  const attemptedQuestions = state?.item?.formData?.filter(
    (question) => question?.userAnswer?.trim() !== ""
  ).length;

  // Calculate progress
  const progressPercentage =
    totalQuestions > 0 ? (attemptedQuestions / totalQuestions) * 100 : 0;

  return (
    <>
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg pt-30 pb-16 breadcrumbAboslute justify-lg-center">
            <img
              src={backBtn}
              onClick={() => navigate("/claims")}
              className="cursor-pointer backBtn"
              alt=""
            />
            <img
              src={backBtnMobile}
              onClick={() => navigate("/claims")}
              className="cursor-pointer backBtnMobile mobileAbsolute"
              alt=""
            />
            <div>
              <h2 className="fs-20 mb-10 pageName tgb">{t("Form")}</h2>
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
                    title: t("Claims"),
                    onClick: () => navigate("/claims"),
                  },
                  //   {
                  //     title: t("Form"),
                  //   },
                  {
                    title: state?.item?.claimName,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-50 mobileMargin">
        <div className="container">
          <div className="doctorGrid">
            <div className="doctorCard">
              <div>
                <div className="progressBar mb-8">
                  <div
                    className="progress"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="fs-20 tgb mb-10">{state?.item?.formTitle}</div>
              <div className="l15">
                {/* <ShowMoreText
                  lines={5}
                  more="View more"
                  less={
                    state?.item?.formDescription?.split("\n")?.length > 5
                      ? "View less"
                      : null
                  }
                  className="content-css"
                  anchorClass="show-more-less-clickable"
                  expanded={true}
                  truncatedEndingComponent={"... "}
                >
                  {state?.item?.formDescription}
                </ShowMoreText> */}
                {isExpanded
                  ? state?.item?.formDescription
                  : state?.item?.formDescription.length > charLimit
                  ? `${state?.item?.formDescription.substring(0, charLimit)}...`
                  : state?.item?.formDescription}
              </div>

              {state?.item?.formDescription.length > charLimit && (
                <div
                  className="show-more-less-clickable"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? t("View less") : t("View more")}
                </div>
              )}

              <button
                className="startBtn cursor-pointer"
                onClick={navigateToFormstart}
              >
                {t("Start")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormInfo;
