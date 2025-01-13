import React, { useState } from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useNavigate } from "react-router-dom";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import { Breadcrumb, Modal } from "antd";
import { useTranslation } from "react-i18next";

const Anxiety = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalSaveDrafts, setIsModalSaveDrafts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
              <h2 className="fs-20 mb-10 pageName tgb">Anxiety</h2>
              <Breadcrumb
                className="breadcrumb"
                separator={
                  <span>
                    <img src={breadcrumb} alt="" />
                  </span>
                }
                items={[
                  {
                    title: "Products",
                  },
                  {
                    title: "Claims",
                  },
                  {
                    title: "Health Educational Claim Choices",
                  },
                  {
                    title: "Quiz",
                  },
                  {
                    title: "Anxiety",
                  },
                ]}
              />
            </div>
          
          </div>
        </div>
      </div>
      <div className="py-50 mobileMargin">
        <div className="container">
          <div className="d-flex align-center justify-between mb-20 mobileHide">
            <div>
              <div className="tgb fs-20 mb-12">Anxiety</div>
              <p className="m-0">
                Discussion and Multiple Choice Quiz on Anxiety.
              </p>
            </div>
            <button
              className="saveDraft cursor-pointer"
              onClick={showModalSavedrafts}
            >
              Save as Draft
            </button>
          </div>
          <div className="quizCard">
            <div className="quizTitle">What is Anxiety?</div>
            <div className="radio-group">
              <label className="custom-radio">
                <input
                  type="radio"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A type of medication
              </label>

              <label className="custom-radio">
                <input
                  type="radio"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A natural response to stress
              </label>

              <label className="custom-radio">
                <input
                  type="radio"
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A form of exercise
              </label>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="option4"
                  checked={selectedOption === "option4"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A type of sleep disorder
              </label>
            </div>
          </div>
          <div className="quizCard">
            <div className="quizTitle">What is Anxiety?</div>
            <div className="radio-group">
              <label className="custom-radio">
                <input
                  type="radio"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A type of medication
              </label>

              <label className="custom-radio">
                <input
                  type="radio"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A natural response to stress
              </label>

              <label className="custom-radio">
                <input
                  type="radio"
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A form of exercise
              </label>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="option4"
                  checked={selectedOption === "option4"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A type of sleep disorder
              </label>
            </div>
          </div>
          <div className="quizCard">
            <div className="quizTitle">What is Anxiety?</div>
            <div className="radio-group">
              <label className="custom-radio">
                <input
                  type="radio"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A type of medication
              </label>

              <label className="custom-radio">
                <input
                  type="radio"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A natural response to stress
              </label>

              <label className="custom-radio">
                <input
                  type="radio"
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A form of exercise
              </label>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="option4"
                  checked={selectedOption === "option4"}
                  onChange={handleChange}
                />
                <span className="radio-checkmark"></span>
                A type of sleep disorder
              </label>
            </div>
          </div>
          <div className="text-end ">
              <button
                className="saveBtn disable w-100 cursor-pointer"
                onClick={showModal}
              >
                {t("Submit")}
              </button>
            </div>
        </div>
      </div>
      <Modal
        className="ok-modal2"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={null}
      >
        <div className="tgb fs-20 lh-25 mb-40 text-center">Thank you for completing the quiz!</div>
        <div className="text-center">
          <button className="saveBtn cursor-pointer w-84" onClick={()=>navigate("/claims")}>
          Ok
          </button>
        </div>
      </Modal>
      <Modal
        className="mx-424"
        centered
        open={isModalSaveDrafts}
        onOk={handleOkSavedrafts}
        onCancel={handleCancelSavedrafts}
        footer={null}
        closeIcon={null}
      >
        <div className="tgb fs-20 lh-25 mb-40 text-center">{t("Do you want to save your progress as Draft?")}</div>
        <div className="yesNoOption">
                  <button className="noBtn" onClick={()=>navigate("/quiz-list")}>
                  {t("Discard")}
                  </button>
                  <button className="yesBtn" onClick={()=>navigate("/quiz-list")}>
                  {t("Save")}
                  </button>
                </div>
      </Modal>
    </>
  );
};

export default Anxiety;
