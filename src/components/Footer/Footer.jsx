import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const activeToggle = (value) => {
    navigate(value);
  };
  return (
    <>
      <footer className="">
        <div className="footer">
          <div
            className={`footerItem ${
              window.location.pathname === "/dashboard" ? "active" : ""
            }`}
            onClick={() => activeToggle("/dashboard")}
          >
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect
                      id="Rectangle_401"
                      data-name="Rectangle 401"
                      width="20"
                      height="20"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                  </clipPath>
                </defs>
                <g id="Home" transform="translate(19300 9796)">
                  <rect
                    id="Rectangle_405"
                    data-name="Rectangle 405"
                    width="24"
                    height="24"
                    transform="translate(-19300 -9796)"
                    fill="none"
                  />
                  <g
                    id="fi-rr-home"
                    transform="translate(-19298 -9794)"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_313"
                      data-name="Path 313"
                      d="M19.268,7.561,12.947,1.239a4.173,4.173,0,0,0-5.893,0L.733,7.561A2.482,2.482,0,0,0,0,9.328v8.181a2.5,2.5,0,0,0,2.5,2.5h15a2.5,2.5,0,0,0,2.5-2.5V9.328a2.482,2.482,0,0,0-.733-1.768ZM12.5,18.343h-5V15.064a2.5,2.5,0,1,1,5,0Zm5.833-.833a.833.833,0,0,1-.833.833H14.167V15.064a4.167,4.167,0,1,0-8.333,0v3.278H2.5a.833.833,0,0,1-.833-.833V9.328a.84.84,0,0,1,.244-.589L8.232,2.42a2.507,2.507,0,0,1,3.537,0l6.321,6.322a.841.841,0,0,1,.244.587Z"
                      transform="translate(0 -0.004)"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="fs-10">{t("Home")}</div>
          </div>
          <div
            className={`footerItem ${
              window.location.pathname === "/claims" ? "active" : ""
            }`}
            onClick={() => activeToggle("/claims")}
          >
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect
                      id="Rectangle_400"
                      data-name="Rectangle 400"
                      width="20"
                      height="20"
                      fill="#eaf6fc"
                    />
                  </clipPath>
                </defs>
                <g
                  id="Group_1685"
                  data-name="Group 1685"
                  transform="translate(19233 9796)"
                >
                  <rect
                    id="Rectangle_406"
                    data-name="Rectangle 406"
                    width="24"
                    height="24"
                    transform="translate(-19233 -9796)"
                    fill="none"
                  />
                  <g
                    id="fi-rr-document"
                    transform="translate(-19231 -9794)"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_312"
                      data-name="Path 312"
                      d="M14.5,11.667a.833.833,0,0,1-.833.833H7a.833.833,0,0,1,0-1.667h6.667a.833.833,0,0,1,.833.833Zm-3.333,2.5H7a.833.833,0,0,0,0,1.667h4.167a.833.833,0,0,0,0-1.667Zm7.5-5.429v7.1A4.172,4.172,0,0,1,14.5,20H6.167A4.172,4.172,0,0,1,2,15.833V4.167A4.172,4.172,0,0,1,6.167,0H9.929a5.8,5.8,0,0,1,4.125,1.708l2.9,2.9a5.793,5.793,0,0,1,1.709,4.124ZM12.876,2.887A4.173,4.173,0,0,0,12,2.237v3.6a.833.833,0,0,0,.833.833h3.6a4.15,4.15,0,0,0-.651-.875ZM17,8.737c0-.137-.027-.269-.039-.4H12.833a2.5,2.5,0,0,1-2.5-2.5V1.706c-.135-.012-.267-.039-.4-.039H6.167a2.5,2.5,0,0,0-2.5,2.5V15.833a2.5,2.5,0,0,0,2.5,2.5H14.5a2.5,2.5,0,0,0,2.5-2.5Z"
                      transform="translate(-0.333 0)"
                      fill="#eaf6fc"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="fs-10">{t("Claims")}</div>
          </div>
          <div
            className={`footerItem ${
              window.location.pathname === "/contact" ? "active" : ""
            }`}
            onClick={() => activeToggle("/contact")}
          >
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect
                      id="Rectangle_404"
                      data-name="Rectangle 404"
                      width="20"
                      height="20"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                  </clipPath>
                </defs>
                <g id="Call" transform="translate(19097 9796)">
                  <rect
                    id="Rectangle_408"
                    data-name="Rectangle 408"
                    width="24"
                    height="24"
                    transform="translate(-19097 -9796)"
                    fill="none"
                  />
                  <g
                    id="fi-rr-phone-call"
                    transform="translate(-19095 -9794)"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_317"
                      data-name="Path 317"
                      d="M10.84.833A.833.833,0,0,1,11.673,0a8.342,8.342,0,0,1,8.333,8.333.833.833,0,0,1-1.667,0,6.674,6.674,0,0,0-6.667-6.667A.833.833,0,0,1,10.84.833ZM11.673,5a3.333,3.333,0,0,1,3.333,3.333.833.833,0,0,0,1.667,0,5,5,0,0,0-5-5,.833.833,0,0,0,0,1.667Zm7.578,8.949a2.583,2.583,0,0,1,0,3.648l-.758.874C11.667,25.006-4.941,8.4,1.492,1.555L2.451.721A2.568,2.568,0,0,1,6.056.755c.026.026,1.57,2.032,1.57,2.032a2.583,2.583,0,0,1-.006,3.568L6.656,7.568a10.651,10.651,0,0,0,5.776,5.788l1.221-.971a2.583,2.583,0,0,1,3.568,0S19.225,13.923,19.25,13.949ZM18.1,15.161s-1.994-1.534-2.02-1.56a.917.917,0,0,0-1.291,0c-.022.023-1.7,1.362-1.7,1.362a.834.834,0,0,1-.816.127A12.507,12.507,0,0,1,4.923,7.75a.833.833,0,0,1,.121-.833s1.339-1.682,1.362-1.7a.917.917,0,0,0,0-1.291C6.38,3.9,4.846,1.9,4.846,1.9a.917.917,0,0,0-1.258.033l-.958.833c-4.7,5.653,9.691,19.248,14.645,14.566l.759-.875a.934.934,0,0,0,.071-1.3Z"
                      transform="translate(-0.006 0)"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="fs-10">{t("Contact")}</div>
          </div>
          <div
            className={`footerItem ${
              window.location.pathname === "/faqs" ? "active" : ""
            }`}
            onClick={() => activeToggle("/faqs")}
          >
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect
                      id="Rectangle_403"
                      data-name="Rectangle 403"
                      width="20"
                      height="20"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                  </clipPath>
                </defs>
                <g id="FAQ" transform="translate(19166 9796)">
                  <rect
                    id="Rectangle_407"
                    data-name="Rectangle 407"
                    width="24"
                    height="24"
                    transform="translate(-19166 -9796)"
                    fill="none"
                  />
                  <g
                    id="fi-rr-shield-interrogation"
                    transform="translate(-19164 -9794)"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_316"
                      data-name="Path 316"
                      d="M10.333,12.5a.833.833,0,0,1-.833-.833A3.294,3.294,0,0,1,11.136,9a1.662,1.662,0,0,0,.833-1.77A1.687,1.687,0,0,0,10.636,5.9,1.667,1.667,0,0,0,8.667,7.543.833.833,0,1,1,7,7.543a3.331,3.331,0,1,1,4.941,2.921,1.656,1.656,0,0,0-.774,1.2.833.833,0,0,1-.833.833Zm.661,7.3c1.8-.723,7.673-3.567,7.673-9.764V5.727a4.161,4.161,0,0,0-2.855-3.955L10.6.042a.821.821,0,0,0-.525,0L4.855,1.772A4.161,4.161,0,0,0,2,5.727v4.309c0,5.468,5.838,8.813,7.627,9.708a1.942,1.942,0,0,0,.706.256A1.867,1.867,0,0,0,10.994,19.8ZM15.287,3.353A2.5,2.5,0,0,1,17,5.727v4.309c0,5.153-5.072,7.593-6.627,8.218-1.573-.787-6.706-3.7-6.706-8.218V5.727A2.5,2.5,0,0,1,5.38,3.353l4.953-1.642ZM10.333,14.167a.833.833,0,1,0,.589.244A.834.834,0,0,0,10.333,14.167Z"
                      transform="translate(-0.333 0)"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="fs-10">{t("FAQs")}</div>
          </div>
          <div
            className={`footerItem ${
              window.location.pathname === "/settings" ? "active" : ""
            }`}
            onClick={() => activeToggle("/settings")}
          >
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect
                      id="Rectangle_402"
                      data-name="Rectangle 402"
                      width="20"
                      height="20"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                  </clipPath>
                </defs>
                <g id="Settings" transform="translate(19032 9796)">
                  <rect
                    id="Rectangle_409"
                    data-name="Rectangle 409"
                    width="24"
                    height="24"
                    transform="translate(-19032 -9796)"
                    fill="none"
                  />
                  <g
                    id="fi-rr-settings"
                    transform="translate(-19030 -9794)"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_314"
                      data-name="Path 314"
                      d="M11.333,8a3.333,3.333,0,1,0,2.357.976A3.333,3.333,0,0,0,11.333,8Zm0,5a1.667,1.667,0,1,1,1.178-.488A1.666,1.666,0,0,1,11.333,13Z"
                      transform="translate(-1.333 -1.333)"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                    <path
                      id="Path_315"
                      data-name="Path 315"
                      d="M17.946,11.583l-.37-.213a7.583,7.583,0,0,0,0-2.742l.37-.213a2.5,2.5,0,0,0-2.5-4.333l-.371.214A7.48,7.48,0,0,0,12.7,2.928V2.5a2.5,2.5,0,1,0-5,0v.428A7.481,7.481,0,0,0,5.327,4.3l-.372-.216a2.5,2.5,0,0,0-2.5,4.333l.37.213a7.583,7.583,0,0,0,0,2.742l-.37.213a2.5,2.5,0,0,0,2.5,4.333l.371-.214A7.48,7.48,0,0,0,7.7,17.072V17.5a2.5,2.5,0,1,0,5,0v-.428A7.48,7.48,0,0,0,15.074,15.7l.373.215a2.5,2.5,0,1,0,2.5-4.333ZM15.822,8.437a5.872,5.872,0,0,1,0,3.125.834.834,0,0,0,.387.944l.9.522a.834.834,0,1,1-.833,1.444l-.9-.523a.833.833,0,0,0-1.012.137,5.819,5.819,0,0,1-2.7,1.563.833.833,0,0,0-.626.808V17.5a.833.833,0,0,1-1.667,0V16.457a.833.833,0,0,0-.626-.807,5.82,5.82,0,0,1-2.7-1.566.833.833,0,0,0-1.012-.137l-.9.522a.833.833,0,1,1-.833-1.443l.9-.522a.833.833,0,0,0,.387-.944,5.873,5.873,0,0,1,0-3.125.833.833,0,0,0-.388-.941l-.9-.522a.834.834,0,0,1,.833-1.444l.9.523a.833.833,0,0,0,1.012-.134,5.82,5.82,0,0,1,2.7-1.562.833.833,0,0,0,.626-.811V2.5a.833.833,0,0,1,1.667,0V3.543a.833.833,0,0,0,.626.808,5.82,5.82,0,0,1,2.7,1.566.833.833,0,0,0,1.012.137l.9-.522a.833.833,0,1,1,.833,1.443l-.9.522a.834.834,0,0,0-.386.941Z"
                      transform="translate(-0.201 0)"
                      fill="#c2e5f3"
                      stroke="#143359"
                      stroke-width="0.5"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="fs-10">{t("Settings")}</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
