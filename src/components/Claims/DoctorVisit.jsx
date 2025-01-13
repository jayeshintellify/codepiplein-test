import React from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useNavigate } from "react-router-dom";
import doneIcon from "../../assets/images/doneIcon.svg";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import { Breadcrumb } from "antd";
const DoctorVisit = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg pt-30 pb-16 breadcrumbAboslute justify-lg-center">
            <img
              src={backBtn}
              onClick={() => navigate("/claims")}
              className="cursor-pointer backBtn mobileAbsolute"
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
                    title: "Doctor Visits",
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
            <div className="fs-20 tgb mb-10">
            Doctor Visits
            </div>
            <p className="mb-100">Complete at least one claim event per month from the claims.</p>
            <button className="startBtn cursor-pointer"onClick={()=>navigate("/doctor-visit-form")} >Start</button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorVisit;
