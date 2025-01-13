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

const Form = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const messageApi = useCommonMessage();
  const [openIndex, setOpenIndex] = useState(null);
  const [openIndex1, setOpenIndex1] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalSaveDrafts, setIsModalSaveDrafts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempState, setTempState] = useState([]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(state?.item?.formData || []);

  const { t } = useTranslation();

  const updateUserProductClaimSelector = useSelector(
    (state) => state?.updateUserProductClaim
  );

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleToggle1 = (index) => {
    setOpenIndex1(openIndex1 === index ? null : index);
  };

  const handleChangeAccourdian = (value, questionText) => {
    setOpenIndex(null);
    // setSelectedOption(value);
    setSelectedOption((prev) => ({
      ...prev,
      [questionText]: value,
    }));
  };

  // const handleChange = (e, questionText) => {
  //   const { value, checked, type } = e.target;

  //   setSelectedOption((prev) => {
  //     if (type === "radio") {
  //       // For radio, set the value directly
  //       return {
  //         ...prev,
  //         [questionText]: value,
  //       };
  //     } else if (type === "checkbox") {
  //       // For checkboxes, add or remove the value from the array
  //       const currentValue = prev[questionText] || [];
  //       const updatedValue = checked
  //         ? [...currentValue, value] // Add the value if checked
  //         : currentValue.filter((v) => v !== value); // Remove if unchecked

  //       return {
  //         ...prev,
  //         [questionText]: updatedValue,
  //       };
  //     }
  //     return prev;
  //   });

  //   // Update `formData`
  //   setFormData((prevFormData) =>
  //     prevFormData.map((item) => {
  //       if (item.questionText === questionText) {
  //         if (type === "radio") {
  //           return { ...item, userAnswer: value }; // Set selected answer for radio
  //         } else if (type === "checkbox") {
  //           const updatedAnswers = checked
  //             ? [...(item.userAnswer || []), value] // Add to array if checked
  //             : (item.userAnswer || []).filter((v) => v !== value); // Remove if unchecked
  //           return { ...item, userAnswer: updatedAnswers };
  //         }
  //       }
  //       return item; // No change for other questions
  //     })
  //   );
  // };
  // Radio and sinle select chack box

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

  const showModal = () => {
    setIsModalOpen(true);
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const validateAnswers = () => {
  //     let isValid = true;
  //     let validationErrors = [];

  //     formData?.forEach((item) => {
  //       const userAnswer =
  //         selectedOption[item?.questionText] || item?.userAnswer;

  //       // Check if question is answered based on its type
  //       if (item?.questionType === "dropDownSingle" && !userAnswer) {
  //         isValid = false;
  //         validationErrors.push(`${item?.questionText} is required.`);
  //       }
  //       if (
  //         item?.questionType === "dropDownMulti" &&
  //         (!userAnswer || userAnswer.length === 0)
  //       ) {
  //         isValid = false;
  //         validationErrors.push(`${item?.questionText} is required.`);
  //       }
  //       if (item?.questionType === "radio" && !userAnswer) {
  //         isValid = false;
  //         validationErrors.push(`${item?.questionText} is required.`);
  //       }
  //       if (
  //         item?.questionType === "checkBox" &&
  //         (!userAnswer || userAnswer.length === 0)
  //       ) {
  //         isValid = false;
  //         validationErrors.push(`${item?.questionText} is required.`);
  //       }
  //       if (item?.questionType === "textField" && !userAnswer) {
  //         isValid = false;
  //         validationErrors.push(`${item?.questionText} is required.`);
  //       }
  //     });

  //     if (!isValid) {
  //       // Show error toast if there are validation errors
  //       messageApi.open({
  //         type: "error",
  //         content: "Please select all answer",
  //       });
  //     }

  //     return isValid;
  //   };
  //   if (validateAnswers()) {
  //     const updatedData =
  //       state?.getUserProductClaimSelector?.data?.data?.claim.map((obj) => {
  //         if (obj?.id === state?.item?.id) {
  //           return {
  //             ...obj,
  //             claimStatus: "COMPLETE",
  //             formData: obj?.formData?.map((question) => {
  //               const userAnswer = selectedOption[question?.questionText];
  //               return {
  //                 ...question,
  //                 userAnswer:
  //                   question?.questionType === "checkBox"
  //                     ? Array.isArray(userAnswer)
  //                       ? tempState.join(",")
  //                       : question?.userAnswer
  //                     : question?.questionType === "textField"
  //                     ? userAnswer || question?.userAnswer
  //                     : question?.questionType === "radio"
  //                     ? userAnswer || question?.userAnswer
  //                     : question?.questionType === "dropDownMulti"
  //                     ? userAnswer?.join(",") || question?.userAnswer
  //                     : userAnswer || question?.userAnswer,
  //               };
  //             }),
  //           };
  //         }
  //         return obj;
  //       });

  //     const payload = {
  //       id: state?.getUserProductClaimSelector?.data?.data?.id,
  //       claim: updatedData,
  //     };

  //     dispatch(updateUserProductClaimHandler(payload));
  //   }
  // };

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
        if (item?.questionType === "textField" && !userAnswer) {
          isValid = false;
          validationErrors.push(`${item?.questionText} is required.`);
        }
      });

      if (!isValid) {
        // Show error toast if there are validation errors
        messageApi.open({
          type: "error",
          content: "Please select all answers",
        });
      }

      return isValid;
    };

    if (validateAnswers()) {
      const updatedData =
        state?.getUserProductClaimSelector?.data?.data?.claim.map((obj) => {
          if (obj?.id === state?.item?.id) {
            return {
              ...obj,
              claimStatus: "COMPLETE",
              formData: obj?.formData?.map((question) => {
                const userAnswer =
                  selectedOption[question?.questionText] ||
                  question?.userAnswer;
                let newUserAnswer;

                if (question?.questionType === "checkBox") {
                  newUserAnswer = Array.isArray(userAnswer)
                    ? userAnswer
                        .filter((answer) =>
                          question?.answerChoice.includes(answer)
                        )
                        .join(",")
                    : question?.userAnswer;
                } else if (question?.questionType === "textField") {
                  newUserAnswer = userAnswer || question?.userAnswer;
                } else if (question?.questionType === "radio") {
                  newUserAnswer = userAnswer || question?.userAnswer;
                } else if (question?.questionType === "dropDownMulti") {
                  newUserAnswer =
                    Array.isArray(userAnswer) && userAnswer.length > 0
                      ? userAnswer.join(",")
                      : userAnswer?.length === 0
                      ? ""
                      : question?.userAnswer;
                } else {
                  newUserAnswer = userAnswer || question?.userAnswer;
                }

                return {
                  ...question,
                  userAnswer: newUserAnswer,
                };
              }),
            };
          }
          return obj;
        });

      const payload = {
        id: state?.getUserProductClaimSelector?.data?.data?.id,
        claim: updatedData,
      };

      dispatch(updateUserProductClaimHandler(payload));
    }
  };

  // save as draft function
  // const saveAsDraftFunction = (e) => {
  //   e.preventDefault();
  //   const updatedData =
  //     state?.getUserProductClaimSelector?.data?.data?.claim.map((obj) => {
  //       if (obj?.id === state?.item?.id) {
  //         return {
  //           ...obj,
  //           claimStatus: "DRAFT",
  //           formData: obj?.formData?.map((question) => {
  //             console.log(question, "question");
  //             const userAnswer = formData.find(
  //               (item) => item.questionText === question?.questionText
  //             )?.userAnswer;
  //             const userAnswer1 = selectedOption[question.questionText]

  //             return {
  //               ...question,
  //               // userAnswer:
  //               // question?.questionType === "checkBox"
  //               //   ? Array.isArray(userAnswer)
  //               //     ? userAnswer.filter((answer) => question?.answerChoice.includes(answer)).join(",") // Only keep answers that are in answerChoice
  //               //     : question?.userAnswer // Fallback to previous userAnswer if no valid answer
  //               //   : question?.answerChoice?.includes(userAnswer)
  //               //   ? userAnswer // Handle non-checkbox answers like radio or text
  //               //   : question?.userAnswer, // Fallback to previous answer if no match

  //               userAnswer:
  //                 question?.questionType === "checkBox"
  //                   ? Array.isArray(userAnswer)
  //                     ? userAnswer
  //                         .filter((answer) =>
  //                           question?.answerChoice.includes(answer)
  //                         )
  //                         .join(",")
  //                     : question?.userAnswer
  //                   : question?.questionType === "textField"
  //                   ? userAnswer1 || question?.userAnswer // For textField, use the entered value
  //                   : question?.questionType === "radio"
  //                   ? userAnswer || question?.userAnswer // Fallback for radio
  //                   : question?.questionType === "dropDownMulti" // Handle multi-select dropdown
  //                   ? userAnswer1?.join(",") || question?.userAnswer // Ensure array is joined for dropDownMulti
  //                   : userAnswer1 || question?.userAnswer, // Default fallback if not handled explicitly
  //             };
  //           }),
  //         };
  //       }
  //       return obj;
  //     });

  //   const payload = {
  //     id: state?.getUserProductClaimSelector?.data?.data?.id,
  //     claim: updatedData,
  //   };

  //   console.log(payload, "payloadpayload");
  //   // Log or dispatch payload
  //   // dispatch(updateUserProductClaimHandler(payload));
  // };

  const saveAsDraftFunction = (e) => {
    e.preventDefault();

    const updatedData =
      state?.getUserProductClaimSelector?.data?.data?.claim.map((obj) => {
        if (obj?.id === state?.item?.id) {
          return {
            ...obj,
            claimStatus: "DRAFT",
            formData: obj?.formData?.map((question) => {
              const userAnswer = formData.find(
                (item) => item.questionText === question?.questionText
              )?.userAnswer;

              const userAnswer1 = selectedOption[question.questionText]
                ? selectedOption[question.questionText]
                : question?.userAnswer;

              let newUserAnswer;

              if (question?.questionType === "checkBox") {
                newUserAnswer = Array.isArray(userAnswer)
                  ? userAnswer
                      .filter((answer) =>
                        question?.answerChoice.includes(answer)
                      )
                      .join(",")
                  : question?.userAnswer;
              } else if (question?.questionType === "textField") {
                newUserAnswer = userAnswer1 || question?.userAnswer;
              } else if (question?.questionType === "radio") {
                newUserAnswer = userAnswer || question?.userAnswer;
              } else if (question?.questionType === "dropDownMulti") {
                // Check if userAnswer1 is a valid array with length
                newUserAnswer =
                  Array.isArray(userAnswer1) && userAnswer1.length > 0
                    ? userAnswer1.join(",")
                    : userAnswer1?.length === 0
                    ? ""
                    : userAnswer;
              } else {
                newUserAnswer = userAnswer1 || question?.userAnswer;
              }

              return {
                ...question,
                userAnswer: newUserAnswer, // Set userAnswer to null if empty
              };
            }),
          };
        }
        return obj;
      });

    const payload = {
      id: state?.getUserProductClaimSelector?.data?.data?.id,
      claim: updatedData,
    };

    // Log or dispatch payload
    dispatch(updateUserProductClaimHandler(payload));
  };

  return (
    <>
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg pt-30 pb-16 breadcrumbAboslute justify-lg-center">
            <img
              src={backBtn}
              onClick={showModalSavedrafts}
              className="cursor-pointer backBtn"
              alt=""
            />
            <img
              src={backBtnMobile}
              onClick={showModalSavedrafts}
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
                  {
                    title: state?.claimType,
                  },
                  {
                    title: state?.item?.claimName,
                    onClick: () => navigate("/form-info",{state:state}),
                  },
                  {
                    title: state?.item?.formTitle,
                  },
                ]}
              />
              {console.log(state,"statestatestate")}
            </div>
          </div>
        </div>
      </div>
      <div className="py-50 mobileMargin">
        <div className="container">
          <div className="d-flex align-center justify-between mb-20 mobileHide">
            <div>
              <div className="tgb fs-20 mb-12">{t("Form")}</div>
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

                  {item?.questionType === "textField" && (
                    <div className="textFieldInput">
                      <input
                        type="text"
                        className="inputField"
                        value={
                          selectedOption[item?.questionText] ||
                          item?.userAnswer ||
                          ""
                        }
                        onChange={(e) =>
                          setSelectedOption({
                            ...selectedOption,
                            [item?.questionText]: e.target.value, 
                          })
                        }
                        placeholder="Enter your answer"
                      />
                    </div>
                  )}
                  {/* Only render radio buttons for other question types */}
                  {item?.questionType !== "dropDownSingle" &&
                    item?.questionType !== "dropDownMulti" &&
                    item?.questionType !== "textField" &&
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
            <button className="noBtn" onClick={() => navigate("/claims")}>
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

export default Form;
