import React, { useContext } from "react";
import loginImage from "../../assets/images/login.png";
import LogoWhite from "../../assets/images/LogoWhite.svg";
import PrimecareLogo from "../../assets/images/PrimecareLogo.svg";
import rightArrowGrey from "../../assets/images/rightArrowGrey.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../LanguageContext/themeContext";

const Langauge = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { changeLanguage } = useContext(ThemeContext);

  const handleClick = (value) => {
    changeLanguage(value);
    i18n.changeLanguage(value);
    navigate("/login");
  };

  return (
    <div className="loginFlex pc">
      <div className="w-50 h-100 position-relative mobileHide">
        <img src={loginImage} alt="" className="w-100 h-100 object-cover" />
        <img src={LogoWhite} alt="" className="loginLogo" />
        <div className="loginText">
          <h2 className="fs-32 text-white fw-700">
            Prime Care{" "}
            <span className="fs-28 text-white fw-300 gbo">
              Provides <br /> Nationwide <br /> Direct Primary Care
            </span>
          </h2>
        </div>
      </div>
      <div className="d-flex align-center justify-center w-lg-50 loginside">
        <div className="mx-420 mx-auto">
          <div className="text-center mb-40 mobileShow">
            <img src={PrimecareLogo} alt="" />
          </div>
          <h1 className="fs-36 mb-8 text-lg-center tgb">Choose</h1>
          <h2 className="fs-28 mb-40 text-lg-center tgb">
            your preferred language
          </h2>

          <div className="mobileDesign langaugeSelection">
            <div
              className="settingsChange mb-10"
              onClick={() => handleClick("en")}
            >
              <span className="">English</span>
              <img src={rightArrowGrey} alt="" />
            </div>
            <div className="settingsChange " onClick={() => handleClick("es")}>
              <span className="">Spanish</span>
              <img src={rightArrowGrey} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Langauge;
