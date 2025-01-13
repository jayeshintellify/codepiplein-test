import React from "react";
import nodataDashboard from "../../assets/images/nodatadashboard.svg";
import { useTranslation } from "react-i18next";

const NoDataFound = () => {
  const { t } = useTranslation();
  return (
    <div className="mobileMargin noData">
      <div>
        <img src={nodataDashboard} alt="" />
        <p>{t("No data found")}</p>
      </div>
    </div>
  );
};

export default NoDataFound;
