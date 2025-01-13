import React, { useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useLocation, useNavigate } from "react-router-dom";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
// import ShowMoreText from "react-show-more-text";

const QuizList = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

  const toggleShowMore = (index) => {
    setExpandedIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Remove index if already expanded
          : [...prev, index] // Add index if not expanded
    );
  };

  return (
    <>
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg pt-30 pb-16 breadcrumbAboslute justify-lg-center">
            <img
              src={backBtn}
              onClick={() => navigate("/health-quiz", { state: state })}
              className="cursor-pointer backBtn"
              alt=""
            />
            <img
              src={backBtnMobile}
              onClick={() => navigate("/health-quiz", { state: state })}
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
                    onClick: () => navigate("/health-quiz", { state: state }),
                  },
                  {
                    title: t("Quiz"),
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
            {state?.item?.quizData?.map((itemQuizData, indexQuizData) => {
              return itemQuizData?.quizSet?.map((itemQuizSet, indexQuizSet) => {
                const progressPercentage = itemQuizSet?.setQuestionsCount
                  ? (itemQuizSet?.setAttemptedQuestionsCount /
                      itemQuizSet?.setQuestionsCount) *
                    100
                  : 0;
                const isExpanded = expandedIndexes.includes(
                  `${indexQuizData}-${indexQuizSet}`
                );
                return (
                  <>
                    <div
                      className="doctorCard"
                      key={`quiz-set-${indexQuizData}-${indexQuizSet}`}
                    >
                      <div className="progressBar mb-8">
                        <div
                          className="progress"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="gm secondaryColor fs-14 mb-30">
                        {itemQuizSet?.setAttemptedQuestionsCount}/
                        {itemQuizSet?.setQuestionsCount} questions{" "}
                      </div>
                      <div className="fs-20 tgb mb-10">
                        {itemQuizSet?.setName}
                      </div>
                      {/* <p className="mb-32">{itemQuizSet?.setDescription}</p> */}
                      <div className="l15 mb-32">
                        {!isExpanded
                          ? itemQuizSet?.setDescription
                          : itemQuizSet?.setDescription?.slice(0, 100)}
                        {itemQuizSet?.setDescription?.length > 200 && (
                          <div
                            onClick={() =>
                              toggleShowMore(`${indexQuizData}-${indexQuizSet}`)
                            }
                            className="show-more-less-clickable"
                          >
                            {!isExpanded ? t("View less") : t("View more")}
                          </div>
                        )}
                      </div>
                      {itemQuizSet?.setStatus !== "complete"&& (
                      <button
                        className={
                          // itemQuizSet?.setStatus === "complete"
                          //   ? "startBtn not-allowed"
                            "startBtn cursor-pointer"
                        }
                        onClick={() => {
                          navigate("/quiz-form", {
                            state: { itemQuizSet: itemQuizSet, state: state },
                          });
                        }}
                        disabled={itemQuizSet?.setStatus === "complete"}
                      >
                        {t("Start")}
                      </button>
                      )}
                    </div>
                  </>
                );
              });
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizList;
