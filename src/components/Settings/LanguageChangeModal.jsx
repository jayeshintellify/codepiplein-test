import React, { useState } from "react";
import { Modal, Radio } from "antd";
import { useTranslation } from "react-i18next";
import selectedIcon from "../../assets/images/selectedIcon.svg";
import { getItem, setItem } from "../../common/localStorage";
import { setLanguageHandler } from "../../redux/action/setLanguage";
import { useDispatch } from "react-redux";

const LanguageChangeModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(getItem("language") || "en");
  const { t, i18n } = useTranslation();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItem("language", value);
    i18n.changeLanguage(value);
    let payload = {
      deviceId:"12324",
      language:value
    }
    dispatch(setLanguageHandler(payload))
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const options = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
  ];

  return (
    <Modal
      className="custom-modal responsiveModal text-center"
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
      closeIcon={null}
      centered
    >
      <div className="tgb fs-20 mb-12 text-center">{t("Change Language")}</div>
      <div className="lh-25 mb-20 text-center">
        {t("Select your preferred Language")}
      </div>
      <Radio.Group
        value={value}
        onChange={handleChange}
        optionType="button"
        buttonStyle="solid"
        className="custom-radio-group mb-24"
      >
        {options?.map((option) => (
          <Radio.Button
            key={option.value}
            value={option.value}
            className={`custom-radio-button ${
              option.disabled ? "disabled" : ""
            }`}
          >
            <div className="d-flex justify-between optionBtn align-center">
              {option.label}
              <img src={selectedIcon} alt="" />
            </div>
          </Radio.Button>
        ))}
      </Radio.Group>
      <div className="text-center">
        <button className="saveBtn cursor-pointer" onClick={handleCloseModal}>
          {t("Save")}
        </button>
      </div>
    </Modal>
  );
};

export default LanguageChangeModal;
