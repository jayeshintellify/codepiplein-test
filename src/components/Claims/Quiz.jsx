import React, { useEffect, useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useLocation, useNavigate } from "react-router-dom";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import { Breadcrumb, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProductClaimAction,
  updateUserProductClaimHandler,
} from "../../redux/action/updateUserProductClaim";
import { useCommonMessage } from "../../common/CommonMessage";
import downArrowGrey from "../../assets/images/downArrowGrey.svg";
import { useTranslation } from "react-i18next";
import doneIcon from "../../assets/images/doneIcon.svg";

const Quiz = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const messageApi = useCommonMessage();
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalSaveDrafts, setIsModalSaveDrafts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempState, setTempState] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState(
    state?.itemQuizSet?.setQuestions || []
  );

  const updateUserProductClaimSelector = useSelector(
    (state) => state?.updateUserProductClaim
  );

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChangeAccourdian = (value, questionText) => {
    setOpenIndex(null);
    // setSelectedOption(value);
    setSelectedOption((prev) => ({
      ...prev,
      [questionText]: value,
    }));
  };

  // const handleChange = (e, questionText, questionType) => {
  //   const { value, checked, type } = e.target;

  //   // Update `selectedOption`
  //   setSelectedOption((prev) => {
  //     if (questionType === "radio") {
  //       // For radio, set the value directly
  //       return {
  //         ...prev,
  //         [questionText]: value,
  //       };
  //     } else if (questionType === "checkBox") {
  //       // Ensure previous value is an array for checkboxes
  //       const currentValue = Array.isArray(prev[questionText])
  //         ? prev[questionText]
  //         : [];

  //       // Add or remove the value based on whether the checkbox is checked
  //       const updatedValue = checked
  //         ? [...new Set([...currentValue, value])] // Add new value and remove duplicates
  //         : currentValue.filter((v) => v !== value); // Remove value if unchecked

  //       return {
  //         ...prev,
  //         [questionText]: updatedValue, // Update the selectedOption state
  //       };
  //     }
  //     return prev;
  //   });

  //   // Update `formData`
  //   setFormData((prevFormData) =>
  //     prevFormData.map((item) => {
  //       if (item.questionText === questionText) {
  //         if (questionType === "radio") {
  //           return { ...item, userAnswer: value }; // For radio, update the user answer directly
  //         } else if (questionType === "checkBox") {
  //           // Ensure that `userAnswer` is always an array for checkbox questions
  //           const currentAnswers = Array.isArray(item.userAnswer)
  //             ? item.userAnswer
  //             : typeof item.userAnswer === "string"
  //             ? item.userAnswer.split(",").map((ans) => ans.trim())
  //             : []; // Split if it's a string into an array of answers

  //           // Combine old and new values, ensuring uniqueness (no duplicates)
  //           const updatedAnswers = checked
  //             ? [...new Set([...currentAnswers, value])] // Add new value and remove duplicates
  //             : currentAnswers.filter((v) => v !== value); // Remove value if unchecked
  //           setTempState(updatedAnswers);
  //           return { ...item, userAnswer: updatedAnswers }; // Update `userAnswer`
  //         }
  //       }
  //       return item;
  //     })
  //   );
  // };
  const handleChange = (e, questionText, questionType) => {
    const { value, checked, type } = e.target;

    // Update `selectedOption`
    setSelectedOption((prev) => {
      if (questionType === "radio") {
        // For radio, set the value directly
        return {
          ...prev,
          [questionText]: value,
        };
      } else if (questionType === "checkBox") {
        // Ensure previous value is an array for checkboxes
        const currentValue = Array.isArray(prev[questionText])
          ? prev[questionText]
          : [];

        // Add or remove the value based on whether the checkbox is checked
        const updatedValue = checked
          ? [...new Set([...currentValue, value])] // Add new value and remove duplicates
          : currentValue.filter((v) => v !== value); // Remove value if unchecked

        return {
          ...prev,
          [questionText]: updatedValue, // Update the selectedOption state
        };
      }
      return prev;
    });

    // Update `formData`
    setFormData((prevFormData) =>
      prevFormData.map((item) => {
        if (item.questionText === questionText) {
          if (questionType === "radio") {
            return { ...item, userAnswer: value }; // For radio, update the user answer directly
          } else if (questionType === "checkBox") {
            // Ensure that `userAnswer` is always an array for checkbox questions
            const currentAnswers = Array.isArray(item.userAnswer)
              ? item.userAnswer
              : typeof item.userAnswer === "string"
              ? item.userAnswer.split(",").map((ans) => ans.trim())
              : []; // Split if it's a string into an array of answers

            // Combine old and new values, ensuring uniqueness (no duplicates)
            const updatedAnswers = checked
              ? [...new Set([...currentAnswers, value])] // Add new value and remove duplicates
              : currentAnswers.filter((v) => v !== value); // Remove value if unchecked

            // Set tempState correctly
            setTempState(updatedAnswers);
            return { ...item, userAnswer: updatedAnswers }; // Update `userAnswer`
          }
        }
        return item;
      })
    );
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalSavedrafts = () => {
    setIsModalSaveDrafts(true);
  };
  const handleOkSavedrafts = () => {
    setIsModalSaveDrafts(false);
  };
  const handleCancelSavedrafts = () => {
    setIsModalSaveDrafts(false);
  };

  useEffect(() => {
    if (updateUserProductClaimSelector?.message) {
      messageApi.open({
        type: "error",
        content: updateUserProductClaimSelector?.message,
      });
      dispatch(updateUserProductClaimAction.updateUserProductClaimInfoReset());
    } else if (updateUserProductClaimSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: updateUserProductClaimSelector?.data?.message,
      });
      dispatch(updateUserProductClaimAction.updateUserProductClaimInfoReset());
      navigate("/claims");
    }
  }, [updateUserProductClaimSelector]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateAnswers = () => {
      let isValid = true;
      let validationErrors = [];

      formData?.forEach((item) => {
        const userAnswer =
          selectedOption[item?.questionText] || item?.userAnswer;

        // Check if question is answered based on its type
        if (item?.questionType === "dropDownSingle" && !userAnswer) {
          isValid = false;
          validationErrors.push(`${item?.questionText} is required.`);
        }
        if (
          item?.questionType === "dropDownMulti" &&
          (!userAnswer || userAnswer.length === 0)
        ) {
          isValid = false;
          validationErrors.push(`${item?.questionText} is required.`);
        }
        if (item?.questionType === "radio" && !userAnswer) {
          isValid = false;
          validationErrors.push(`${item?.questionText} is required.`);
        }
        if (
          item?.questionType === "checkBox" &&
          (!userAnswer || userAnswer.length === 0)
        ) {
          isValid = false;
          validationErrors.push(`${item?.questionText} is required.`);
        }
      });

      if (!isValid) {
        // Show error toast if there are validation errors
        messageApi.open({
          type: "error",
          content: "Please select all answer",
        });
      }

      return isValid;
    };

    if (validateAnswers()) {
      const getUpdatedAnswer = (questionItem, userAnswer) => {
        if (
          questionItem?.questionType === "checkBox" &&
          Array.isArray(userAnswer)
        ) {
          // Remove leading comma if exists
          return tempState.join(",").replace(/^,/, "");
        }
        if (questionItem?.questionType === "radio") {
          return userAnswer || questionItem?.userAnswer;
        }
        if (
          questionItem?.questionType === "dropDownMulti" &&
          Array.isArray(userAnswer)
        ) {
          // Remove leading comma if exists
          return userAnswer.join(",").replace(/^,/, "");
        }
        return userAnswer || questionItem?.userAnswer;
      };

      const updateQuizSet = (quizSet) => {
        return quizSet?.map((setItem) => {
          let attemptedQuestionsCount = 0; // Initialize counter for non-empty userAnswer

          const updatedSetQuestions = setItem?.setQuestions?.map(
            (questionItem) => {
              const userAnswer = selectedOption[questionItem?.questionText];
              const updatedAnswer = getUpdatedAnswer(questionItem, userAnswer);

              if (updatedAnswer !== "") {
                attemptedQuestionsCount++; // Increment count for non-empty answers
              }

              return {
                ...questionItem,
                userAnswer: updatedAnswer,
              };
            }
          );

          // Only update setStatus to 'complete' if both conditions are true:
          const updatedSetStatus =
            setItem?.setName === state?.itemQuizSet?.setName &&
            attemptedQuestionsCount > 0
              ? "complete" // Update to 'complete' if both conditions are true
              : setItem?.setStatus;

          return {
            ...setItem,
            setQuestions: updatedSetQuestions,
            setAttemptedQuestionsCount: attemptedQuestionsCount, // Add attempted count
            setStatus: updatedSetStatus, // Apply updated status
          };
        });
      };
      // Working fine in this but quizStatus not set in this.
      // const updatedData =
      //   state?.state?.getUserProductClaimSelector?.data?.data?.claim.map(
      //     (claim) => {
      //       if (claim?.id !== state?.state?.item?.id) return claim;

      //       // Process each quizSet and determine if all setStatus are "complete"
      //       const updatedQuizData = claim?.quizData?.map((quizItem) => ({
      //         ...quizItem,
      //         quizSet: updateQuizSet(quizItem?.quizSet),
      //         quizStatus:"complete"
      //       }));
      //       const allSetsComplete = updatedQuizData.every((quizItem) =>
      //         quizItem?.quizSet?.every(
      //           (setItem) => setItem?.setStatus === "complete"
      //         )
      //       );

      //       // Check if all sets have setStatus === "complete"

      //       return {
      //         ...claim,
      //         claimStatus: allSetsComplete ? "COMPLETE" : claim?.claimStatus, // Update claimStatus if all sets are complete
      //         quizData: updatedQuizData,
      //       };
      //     }
      //   );

      const updatedData =
        state?.state?.getUserProductClaimSelector?.data?.data?.claim.map(
          (claim) => {
            if (claim?.id !== state?.state?.item?.id) return claim;

            // Process each quizSet and determine if all setStatus are "complete"
            const updatedQuizData = claim?.quizData?.map((quizItem) => {
              const updatedQuizSet = updateQuizSet(quizItem?.quizSet);
              const allSetsComplete = updatedQuizSet.every(
                (setItem) => setItem?.setStatus === "complete"
              );

              return {
                ...quizItem,
                quizSet: updatedQuizSet,
                // quizStatus: allSetsComplete ? "complete" : quizItem?.quizStatus, // Set quizStatus to "complete" if all sets are complete
                quizStatus:"complete"
              };
            });

            // Check if all sets in all quizData have setStatus === "complete"
            const allQuizComplete = updatedQuizData.every((quizItem) =>
              quizItem?.quizSet?.every(
                (setItem) => setItem?.setStatus === "complete"
              )
            );

            // Update claimStatus if all sets are complete
            return {
              ...claim,
              // claimStatus: allQuizComplete ? "COMPLETE" : claim?.claimStatus,
              claimStatus:"COMPLETE",
              quizData: updatedQuizData,
            };
          }
        );

      const payload = {
        id: state?.state?.getUserProductClaimSelector?.data?.data?.id,
        claim: updatedData,
      };

      dispatch(updateUserProductClaimHandler(payload));
      // console.log(payload, "payload");
    }
  };

  const saveAsDraftFunction = (e) => {
    e.preventDefault();

    const getUpdatedAnswer = (questionItem, userAnswer1) => {
      if (
        questionItem?.questionType === "checkBox" &&
        Array.isArray(userAnswer1)
      ) {
        return userAnswer1.join(",");
      }
      if (questionItem?.questionType === "radio") {
        return userAnswer1 || questionItem?.userAnswer;
      }
      if (
        questionItem?.questionType === "dropDownMulti" &&
        Array.isArray(userAnswer1)
      ) {
        return userAnswer1.length > 0 ? userAnswer1.join(",") : "";
      }
      return userAnswer1;
    };

    const updatedData =
      state?.state?.getUserProductClaimSelector?.data?.data?.claim.map(
        (claim) => {
          if (claim?.id !== state?.state?.item?.id) return claim;

          return {
            ...claim,
            claimStatus: "DRAFT", // Setting claim status to DRAFT
            quizData: claim?.quizData?.map((quizItem) => ({
              ...quizItem,
              quizSet: quizItem?.quizSet?.map((setItem) => {
                if (setItem?.setName === state?.itemQuizSet?.setName) {
                  let attemptedQuestionsCount = 0;
                  const updatedSetQuestions = setItem?.setQuestions?.map(
                    (questionItem) => {
                      const userAnswer = formData.find(
                        (item) =>
                          item.questionText === questionItem?.questionText
                      )?.userAnswer;

                      const userAnswer1 = selectedOption[
                        questionItem?.questionText
                      ]
                        ? selectedOption[questionItem?.questionText]
                        : questionItem?.userAnswer;

                      const updatedAnswer = getUpdatedAnswer(
                        questionItem,
                        userAnswer1
                      );

                      if (updatedAnswer !== "") {
                        attemptedQuestionsCount++;
                      }

                      return {
                        ...questionItem,
                        userAnswer: updatedAnswer,
                      };
                    }
                  );

                  return {
                    ...setItem,
                    setStatus: "DRAFT",
                    setQuestions: updatedSetQuestions,
                    setAttemptedQuestionsCount: attemptedQuestionsCount,
                  };
                }

                return setItem;
              }),
            })),
          };
        }
      );
    const payload = {
      id: state?.state?.getUserProductClaimSelector?.data?.data?.id,
      claim: updatedData,
    };
    dispatch(updateUserProductClaimHandler(payload));
    // console.log(payload,"payloadpayloadpayloadpayloadpayloadpayload")
  };

  // const saveAsDraftFunction = (e) => {
  //   e.preventDefault();

  //   const getUpdatedAnswer = (questionItem, userAnswer) => {
  //     if (
  //       questionItem?.questionType === "checkBox" &&
  //       Array.isArray(userAnswer)
  //     ) {
  //       return userAnswer.join(",");
  //     }
  //     if (questionItem?.questionType === "radio") {
  //       return userAnswer || questionItem?.userAnswer;
  //     }
  //     if (
  //       questionItem?.questionType === "dropDownMulti" &&
  //       Array.isArray(userAnswer)
  //     ) {
  //       return userAnswer.join(",");
  //     }
  //     return userAnswer || questionItem?.userAnswer;
  //   };

  //   const updatedData =
  //     state?.state?.getUserProductClaimSelector?.data?.data?.claim.map(
  //       (claim) => {
  //         if (claim?.id !== state?.state?.item?.id) return claim;
  //         return {
  //           ...claim,
  //           claimStatus: "DRAFT", // Setting claim status to DRAFT
  //           quizData: claim?.quizData?.map((quizItem) => ({
  //             ...quizItem,
  //             quizSet: quizItem?.quizSet?.map((setItem) => {
  //               // Check if this is the set you want to update by matching setName, setDescription, etc.
  //               if (setItem?.setName === state?.itemQuizSet?.setName) {
  //                 // Example: Update the set with specific setName
  //                 let attemptedQuestionsCount = 0; // Initialize counter for non-empty userAnswer
  //                 const updatedSetQuestions = setItem?.setQuestions?.map(
  //                   (questionItem) => {
  //                     const userAnswer =
  //                       selectedOption[questionItem?.questionText];
  //                     const updatedAnswer = getUpdatedAnswer(
  //                       questionItem,
  //                       userAnswer,
  //                     );

  //                     if (updatedAnswer !== "") {
  //                       attemptedQuestionsCount++; // Increment count for non-empty answers
  //                     }

  //                     return {
  //                       ...questionItem,
  //                       userAnswer: updatedAnswer,
  //                     };
  //                   }
  //                 );

  //                 return {
  //                   ...setItem,
  //                   setStatus: "DRAFT", // Update to "DRAFT" for this particular set
  //                   setQuestions: updatedSetQuestions,
  //                   setAttemptedQuestionsCount: attemptedQuestionsCount, // Add attempted count
  //                 };
  //               }

  //               return setItem; // Return the unmodified set if not the target one
  //             }),
  //           })),
  //         };
  //       }
  //     );

  //   const payload = {
  //     id: state?.state?.getUserProductClaimSelector?.data?.data?.id,
  //     claim: updatedData,
  //   };

  //   // Log or dispatch payload
  //   // dispatch(updateUserProductClaimHandler(payload));
  // };

  return (
    <>
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg pt-30 pb-16  justify-lg-between">
            <img
              src={backBtn}
              onClick={showModalSavedrafts}
              className="cursor-pointer backBtn"
              alt=""
            />
            <img
              src={backBtnMobile}
              onClick={showModalSavedrafts}
              className="cursor-pointer backBtnMobile"
              alt=""
            />
            <div>
              <h2 className="fs-20 mb-10 pageName tgb">{t("Quiz Form")}</h2>
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
                    title: t("ClaimTesting"),
                    onClick: () =>
                      navigate("/quiz-list", { state: state?.state }),
                  },
                  {
                    title: state?.itemQuizSet?.setName,
                  },
                ]}
              />
            </div>
            <div
              className="mobileShow cursor-pointer"
              onClick={showModalSavedrafts}
            >
              <img src={doneIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-50 mobileMargin">
        <div className="container">
          <div className="d-flex align-center justify-between mb-20 mobileHide">
            <div>
              <div className="tgb fs-20 mb-12">{t("Quiz")}</div>
              <p className="m-0">{t("Discussion and Multiple Choice form")}</p>
            </div>
            <button
              className="saveDraft cursor-pointer"
              onClick={showModalSavedrafts}
            >
              {t("Save as Draft")}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {formData?.map((item, index) => (
              <div className="quizCard" key={index}>
                <div className="quizTitle">{item?.questionText}</div>
                <div className="radio-group">
                  {/* Dropdown with single select */}
                  {item?.questionType === "dropDownSingle" && (
                    <div className="position-relative">
                      <div
                        className={`inputField active ${
                          openIndex === 0 ? "rotate focus" : ""
                        }`}
                        onClick={() => handleToggle(0)}
                      >
                        <span>
                          {selectedOption[item?.questionText] ||
                            selectedOption[index] ||
                            item?.userAnswer ||
                            "Choose from options"}
                        </span>
                        <img
                          src={downArrowGrey}
                          alt=""
                          className="dropdownArrow"
                        />
                      </div>
                      <div
                        className="menuState"
                        style={{
                          display: openIndex === 0 ? "block" : "none",
                        }}
                      >
                        {item?.answerChoice?.map((option, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              handleChangeAccourdian(option, item?.questionText)
                            }
                            className="cursor-pointer"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* dropdown with multiple select */}
                  {item?.questionType === "dropDownMulti" && (
                    <div className="position-relative">
                      <Select
                        mode="multiple"
                        // defaultValue={
                        //   selectedOption[item?.questionText] ||
                        //   selectedOption[index]
                        // }
                        // defaultValue={
                        //   (item?.userAnswer
                        //     ? item?.userAnswer.split(",")
                        //     : []) ||
                        //   selectedOption[item?.questionText] ||
                        //   selectedOption[index] ||
                        //   []
                        // }
                        defaultValue={
                          (item?.userAnswer
                            ? item?.userAnswer.split(",")
                            : []) ||
                          selectedOption[item?.questionText] ||
                          selectedOption[index] ||
                          []
                        }
                        onChange={(value) =>
                          handleChangeAccourdian(value, item?.questionText)
                        }
                        style={{ width: "100%" }}
                      >
                        {item?.answerChoice?.map((option, index) => (
                          <Select.Option key={index} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  )}

                  {/* {item?.questionType === "textField" && (
                    <div className="textFieldInput">
                      <input
                        type="text"
                        value={
                          selectedOption[item?.questionText] ||
                          item?.userAnswer ||
                          ""
                        }
                        onChange={(e) =>
                          setSelectedOption({
                            ...selectedOption,
                            [item?.questionText]: e.target.value, // Update the selected answer
                          })
                        }
                        placeholder="Enter your answer"
                      />
                    </div>
                  )} */}
                  {/* Only render radio buttons for other question types */}
                  {item?.questionType !== "dropDownSingle" &&
                    item?.questionType !== "dropDownMulti" &&
                    item?.answerChoice?.map((choice, choiceIndex) => (
                      // <label className="custom-radio" key={choiceIndex}>
                      <label
                        className={
                          item?.questionType === "radio"
                            ? "custom-radio"
                            : "customCheckbox"
                        }
                        key={choiceIndex}
                      >
                        <input
                          type={item?.questionType}
                          value={choice}
                          // When add then below checked work
                          // when save as draft then that checked work
                          checked={
                            item?.questionType === "radio"
                              ? item?.userAnswer === choice
                              : Array.isArray(item?.userAnswer)
                              ? item?.userAnswer.includes(choice)
                              : String(item?.userAnswer)
                                  ?.split(",")
                                  .map((ans) => ans.trim())
                                  .includes(choice)
                          }
                          onChange={(e) =>
                            handleChange(
                              e,
                              item?.questionText,
                              item?.questionType
                            )
                          }
                        />
                        {/* <span className="radio-checkmark"></span> */}
                        <div
                          className={
                            item?.questionType === "radio"
                              ? "radio-checkmark"
                              : "checkbox-checkmark"
                          }
                        ></div>
                        {choice}
                      </label>
                    ))}
                </div>
              </div>
            ))}
            <div className="text-end ">
              <button
                className="saveBtn w-100 cursor-pointer"
                //   onClick={showModal}
              >
                {t("Submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          className="ok-modal2"
          centered
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          closeIcon={null}
        >
          <div className="tgb fs-20 lh-25 mb-40 text-center">
            {t("Thank you for completing the quiz!")}
          </div>
          <div className="text-center">
            <button
              className="saveBtn cursor-pointer w-84"
              onClick={() => navigate("/claims")}
            >
              {t("Okay")}
            </button>
          </div>
        </Modal>
      )}
      {isModalSaveDrafts && (
        <Modal
          className="mx-424"
          centered
          open={isModalSaveDrafts}
          onOk={handleOkSavedrafts}
          onCancel={handleCancelSavedrafts}
          footer={null}
          closeIcon={null}
        >
          <div className="tgb fs-20 lh-25 mb-40 text-center">
            {t("Do you want to save your progress as Draft?")}
          </div>
          <div className="yesNoOption">
            <button
              className="noBtn"
              onClick={() => navigate("/quiz-list", { state: state?.state })}
            >
              {t("Discard")}
            </button>
            <button className="yesBtn" onClick={saveAsDraftFunction}>
              {t("Save")}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Quiz;
