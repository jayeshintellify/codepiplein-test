import { Breadcrumb } from "antd";
import React from "react";
import breadcrumb from "../../assets/images/breadcrumb.svg";
import backBtn from "../../assets/images/backBtn.svg";
import backBtnMobile from "../../assets/images/backBtnMobile.svg";

import { useNavigate } from "react-router-dom";
const HealthRiskAssessment = () => {
    const navigate = useNavigate()
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="d-flex gap-20 align-center">
            <div className="cursor-pointer mobileAbsolute">
              <img src={backBtn} alt="" onClick={()=>navigate("/claims")} className="backBtn"/>
              <img src={backBtnMobile} alt="" onClick={()=>navigate("/claims")} className="backBtnMobile"/>
            </div>
            <div className="w100lg">
              <h2 className="pageName tgb fs-20 fw-600 mb-10 text-lg-center ">Claims</h2>
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
                    title: "Health Risk Assessment",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pdfViewer">
          <div className="mx-887 mx-auto h-100">
            <iframe className="w-100 h-100" src="https://hc2u-stage-bucket.s3.us-west-2.amazonaws.com/user_agreement/1.0/Authorization%20to%20Release%20FINAL.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240905T114728Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518399&X-Amz-Credential=AKIATCKAQKBRWAZO4C4O%2F20240905%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=86c1a550d4626bde9ccc8b9d1a8049735c7d0507ed23dcd9a1105ecd09eaaa22"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthRiskAssessment;
