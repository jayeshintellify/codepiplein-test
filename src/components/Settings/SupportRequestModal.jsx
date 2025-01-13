import { Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../common/localStorage";

const SupportRequestModal = ({ isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAdminId = getItem("adminId");
  
  const handleSupportRequest = () => {
    if (getAdminId) {
      navigate("/settings");
    } else {
      navigate("/login");
    }
  };

  return (
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
        {t("Support Request sent successfully!")}
      </div>
      <div className="text-center">
        <button
          className="saveBtn cursor-pointer w-117"
          onClick={handleSupportRequest}
        >
          {t("Okay")}
        </button>
      </div>
    </Modal>
  );
};

export default SupportRequestModal;
