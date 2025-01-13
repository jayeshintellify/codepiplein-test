import React from "react";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";
import { useNavigate } from "react-router-dom";
import doneIcon from "../../assets/images/doneIcon.svg";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import { Breadcrumb, DatePicker } from "antd";
const DoctorVisitForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="commonHeader">
        <div className="container">
          <div className="headerBg pt-30 pb-16 breadcrumbAboslute">
            <img
              src={backBtn}
              onClick={() => navigate("/doctor-visit")}
              className="cursor-pointer backBtn"
              alt=""
            />
            <img
              src={backBtnMobile}
              onClick={() => navigate("/doctor-visit")}
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
                  {
                    title: "Form",
                  },
                ]}
              />
            </div>
            {/* <div className="mobileShow" onClick={() => navigate("/doctor-visit")}>
              <img src={doneIcon} alt="" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="py-50 mobileMargin">
        <div className="container">
          <div className="doctorFormMx">
            <div className="">
              <h3 className="fs-20 mb-20">Enter your Provider Name</h3>
              <input
                type="text"
                className="inputField"
                placeholder="Provider Name"
              />
            </div>
            <div className="">
              <h3 className="fs-20 mb-20">
                Enter your Provider Contact Information
              </h3>
              <input
                type="number"
                className="inputField"
                placeholder="Contact Information"
              />
            </div>

            <div className="">
              <h3 className="fs-20 mb-20">Claim Event Date</h3>
              <DatePicker className="datepicker" placeholder="MM/DD/YYYY" />
            </div>
            <div className="">
              <h3 className="fs-20 mb-20">Claim Event Reason</h3>
              <input
                type="text"
                className="inputField"
                placeholder="Claim Event Reason"
              />
            </div>

            <div className="text-center ">
              <button
                className="saveBtn disable cursor-pointer w-md-100"
                onClick={() => navigate("/doctor-visit")}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorVisitForm;
