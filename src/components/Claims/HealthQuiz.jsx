import React, { useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useLocation, useNavigate } from "react-router-dom";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
// import ReactReadMoreReadLess from "react-read-more-read-less";
// import ShowMoreText from "react-show-more-text";

const HealthQuiz = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpand = (index) => {
    setExpandedIndexes((prevState) =>
      prevState.includes(index)
        ? prevState.filter((i) => i !== index)
        : [...prevState, index]
    );
  };
  const navigate = useNavigate();

  const { state } = useLocation();
  const { t } = useTranslation();

  const navigateToQuizList = () => {
    navigate("/quiz-list", { state: state });
  };

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
              <h2 className="fs-20 mb-10 pageName tgb">Claims</h2>
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
            {state?.item?.quizData?.map((quizDataItem, quizDataIndex) => {
              const isExpanded = expandedIndexes.includes(quizDataIndex);
              const characterLimit = quizDataItem?.quizDescription?.length;
              return (
                <>
                  <div className="doctorCard" key={quizDataIndex}>
                    <div className="fs-20 tgb mb-10">
                      {quizDataItem?.quizName}
                    </div>
                    <div className="l15 mb-32">
                      <div
                        className={`content-css ${
                          isExpanded ? "expanded" : "collapsed"
                        }`}
                      >
                        {/* {quizDataItem?.quizDescription} */}
                        {!isExpanded
                          ? quizDataItem?.quizDescription
                          : quizDataItem?.quizDescription?.slice(0, 100)}
                      </div>
                      {characterLimit > 120 && (
                        <div
                          className="show-more-less-clickable"
                          onClick={() => toggleExpand(quizDataIndex)}
                        >
                          {!isExpanded ? t("View less") : t("View more")}
                        </div>
                      )}
                    </div>
                    <button
                      className="startBtn cursor-pointer"
                      // onClick={() => navigate("/quiz-list")}
                      onClick={navigateToQuizList}
                    >
                      {t("Take a Quiz")}
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthQuiz;
