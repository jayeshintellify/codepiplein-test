import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/LogoWhite.svg";
import logout from "../../assets/images/logout.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getProductListHandler } from "../../redux/action/getProductList";
import { getNotificationCountsHandler } from "../../redux/action/getNotificationsCounts";
import { Modal } from "antd";
import { getItem, setItem } from "../../common/localStorage";


const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productMenu, setProductMenu] = useState(true);

  const getAllProductListSelector = useSelector(
    (state) => state?.getProductList
  );
  const getProductFeaturesSelector = useSelector(
    (state) => state?.getProductFeatures
  );
  const { t } = useTranslation();
  const getAdminId = getItem("adminId");

  const activeToggle = (value) => {
    setProductMenu(false);
    navigate(value, { state: getProductFeaturesSelector });
  };

  useEffect(() => {
    let payload = {
      userId: getAdminId,
      refBrandId: 2,
    };
    dispatch(getProductListHandler(payload));
  }, []);

  const [activeProductName, setActiveProductName] = useState(() => {
    const storedProductName = getItem("productName");
    return (
      storedProductName ||
      getAllProductListSelector?.data?.data?.products?.[0]?.productName
    );
  });

  useEffect(() => {
    dispatch(getNotificationCountsHandler({ userId: getAdminId ?? 0 }));
  }, []);

  const handleCancelChange = () => {
    setIsModalOpen(false);
  };

  const handleConfirmChange = () => {
    setIsModalOpen(false);
    localStorage.clear();
    // navigate("/");
    window.location.replace("/")
  };

  const handleProductClick = (item) => {
    navigate("/dashboard", { state: item });
    setItem("groupId", item?.groupId);
    setItem("productCode", item?.productCode);
    setItem("productName", item?.productName);
    setActiveProductName(item?.productName);
  }

  return (
    <>
        <div className="sidebar">
          <div>
            <div className="sidebarHeader">
              <img
                src={Logo}
                alt=""
                className="cursor-pointer"
                onClick={() => navigate("/dashboard")}
              />
            </div>
            <div className="sidebarContent">
              <div className="">
                <div
                  className={`productMenu listItem ${
                    window.location.pathname === "/dashboard" ? "" : ""
                  } ${productMenu ? "rotate active" : ""}`}
                  onClick={() => setProductMenu(!productMenu)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      id="Group_1512"
                      data-name="Group 1512"
                      transform="translate(-48 -201.76)"
                    >
                      <rect
                        id="Rectangle_145"
                        data-name="Rectangle 145"
                        width="24"
                        height="24"
                        transform="translate(48 201.76)"
                        fill="none"
                      />
                      <path
                        id="Path_1163"
                        data-name="Path 1163"
                        d="M19.268,7.565,12.947,1.24a4.172,4.172,0,0,0-5.893,0L.733,7.565A2.484,2.484,0,0,0,0,9.334V17.52a2.5,2.5,0,0,0,2.5,2.5h15a2.5,2.5,0,0,0,2.5-2.5V9.334a2.484,2.484,0,0,0-.733-1.769ZM12.5,18.354h-5v-3.28a2.5,2.5,0,1,1,5,0Zm5.833-.834a.834.834,0,0,1-.833.834H14.167v-3.28a4.167,4.167,0,1,0-8.333,0v3.28H2.5a.834.834,0,0,1-.833-.834V9.334a.841.841,0,0,1,.244-.59L8.232,2.422a2.506,2.506,0,0,1,3.537,0l6.321,6.325a.841.841,0,0,1,.244.587Z"
                        transform="translate(50 203.739)"
                        fill="#eaf6fc"
                      />
                    </g>
                  </svg>
                  <span>{t("Products")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="dropdownArrow"
                  >
                    <g
                      id="Group_1513"
                      data-name="Group 1513"
                      transform="translate(-0.033)"
                    >
                      <rect
                        id="Rectangle_438"
                        data-name="Rectangle 438"
                        width="24"
                        height="24"
                        transform="translate(0.033)"
                        fill="none"
                      />
                      <path
                        id="fi-rr-angle-small-right"
                        d="M14.37,9.182,10.531,5.248a.822.822,0,0,0-1.179,0,.859.859,0,0,0-.183.279.877.877,0,0,0,0,.659.859.859,0,0,0,.183.279L13.2,10.391a.856.856,0,0,1,.183.279.877.877,0,0,1,0,.659.857.857,0,0,1-.183.279L9.351,15.533a.873.873,0,0,0,0,1.213.823.823,0,0,0,1.184,0l3.839-3.934a2.616,2.616,0,0,0,0-3.634Z"
                        transform="translate(-0.07 1)"
                        fill="#eaf6fc"
                      />
                    </g>
                  </svg>
                </div>
                {getAllProductListSelector?.data?.data?.products?.map(
                  (item, index) => {
                    return productMenu &&
                      getAllProductListSelector?.data?.data?.products?.length >
                        0 && (
                      <div
                        key={index}
                        className={`productList cursor-pointer ${
                          getItem("productName") === item?.productName ||
                          (!getItem("productName") &&
                            getAllProductListSelector?.data?.data?.products?.[0]?.productName === item?.productName)
                            ? "activated"
                            : ""
                        }`}
                        onClick={() => handleProductClick(item)}
                      >
                        {item?.productName}
                      </div>
                    );
                  }
                )}
                <div
                  className={`listItem ${
                    window.location.pathname === "/claims" ? "active" : ""
                  }`}
                  onClick={() => activeToggle("/claims")}
                >
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
                  <span>{t("Claims")}</span>
                </div>
                <div
                  className={`listItem ${
                    window.location.pathname === "/contact" ? "active" : ""
                  }`}
                  onClick={() => activeToggle("/contact")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      id="Group_1376"
                      data-name="Group 1376"
                      transform="translate(-48 0)"
                    >
                      <rect
                        id="Rectangle_145"
                        data-name="Rectangle 145"
                        width="24"
                        height="24"
                        transform="translate(48 0)"
                        fill="none"
                      />
                      <path
                        id="Path_1165"
                        data-name="Path 1165"
                        d="M10.857.835A.835.835,0,0,1,11.692,0a8.356,8.356,0,0,1,8.347,8.347.835.835,0,0,1-1.669,0,6.685,6.685,0,0,0-6.678-6.678.835.835,0,0,1-.835-.835Zm.835,4.174a3.339,3.339,0,0,1,3.339,3.339.835.835,0,0,0,1.669,0,5.013,5.013,0,0,0-5.008-5.008.835.835,0,0,0,0,1.669Zm7.59,8.964a2.587,2.587,0,0,1,0,3.654l-.76.876C11.686,25.047-4.949,8.415,1.495,1.557l.96-.835A2.572,2.572,0,0,1,6.066.756c.026.026,1.573,2.035,1.573,2.035a2.588,2.588,0,0,1-.006,3.574L6.666,7.581a10.669,10.669,0,0,0,5.785,5.8l1.223-.972a2.588,2.588,0,0,1,3.573-.005S19.256,13.946,19.282,13.972Zm-1.149,1.214s-2-1.537-2.023-1.563a.918.918,0,0,0-1.293,0c-.023.023-1.706,1.365-1.706,1.365a.835.835,0,0,1-.817.127A12.528,12.528,0,0,1,4.931,7.763a.835.835,0,0,1,.121-.835S6.393,5.243,6.416,5.222a.918.918,0,0,0,0-1.293C6.39,3.9,4.853,1.9,4.853,1.9a.918.918,0,0,0-1.26.033l-.96.835C-2.076,8.435,12.34,22.051,17.3,17.362l.76-.876a.936.936,0,0,0,.071-1.3Z"
                        transform="translate(49.961 2.002)"
                        fill="#eaf6fc"
                      />
                    </g>
                  </svg>
                  <span>{t("Contact")}</span>
                </div>
                <div
                  className={`listItem ${
                    window.location.pathname === "/FAQs" ? "active" : ""
                  }`}
                  onClick={() => activeToggle("/FAQs")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      id="Group_1376"
                      data-name="Group 1376"
                      transform="translate(-48 0)"
                    >
                      <rect
                        id="Rectangle_145"
                        data-name="Rectangle 145"
                        width="24"
                        height="24"
                        transform="translate(48 0)"
                        fill="none"
                      />
                      <path
                        id="Path_1166"
                        data-name="Path 1166"
                        d="M10.5,12.5a.859.859,0,0,1-.6-.244.825.825,0,0,1-.249-.589,3.25,3.25,0,0,1,.492-1.538A3.33,3.33,0,0,1,11.319,9a1.675,1.675,0,0,0,.719-.749,1.632,1.632,0,0,0,.131-1.021,1.676,1.676,0,0,0-.472-.87,1.7,1.7,0,0,0-1.627-.436,1.713,1.713,0,0,0-.658.332,1.671,1.671,0,0,0-.451.575,1.639,1.639,0,0,0-.16.708.825.825,0,0,1-.249.589.862.862,0,0,1-1.2,0A.825.825,0,0,1,7.1,7.543a3.278,3.278,0,0,1,.318-1.409,3.342,3.342,0,0,1,.9-1.145,3.423,3.423,0,0,1,1.242-.646,3.459,3.459,0,0,1,2.726.368,3.372,3.372,0,0,1,1.018.952,3.282,3.282,0,0,1-.1,3.9,3.381,3.381,0,0,1-1.064.9,1.674,1.674,0,0,0-.534.513,1.636,1.636,0,0,0-.256.689.825.825,0,0,1-.249.589A.858.858,0,0,1,10.5,12.5Zm.674,7.3C13.01,19.076,19,16.232,19,10.036V5.727a4.105,4.105,0,0,0-.8-2.44,4.24,4.24,0,0,0-2.109-1.515L10.768.042a.853.853,0,0,0-.535,0L4.912,1.772A4.24,4.24,0,0,0,2.8,3.287,4.106,4.106,0,0,0,2,5.727v4.309c0,5.468,5.954,8.813,7.78,9.708A2.006,2.006,0,0,0,10.5,20,1.932,1.932,0,0,0,11.174,19.8ZM15.553,3.353a2.547,2.547,0,0,1,1.265.91A2.467,2.467,0,0,1,17.3,5.727v4.309c0,5.152-5.174,7.592-6.76,8.217-1.6-.787-6.84-3.7-6.84-8.217V5.727a2.467,2.467,0,0,1,.482-1.464,2.547,2.547,0,0,1,1.265-.91L10.5,1.712ZM10.5,14.166a.862.862,0,0,0-.472.14.837.837,0,0,0-.313.374.819.819,0,0,0-.048.481.829.829,0,0,0,.233.427.856.856,0,0,0,.435.228.866.866,0,0,0,.491-.047.847.847,0,0,0,.381-.307A.821.821,0,0,0,11.1,14.41.859.859,0,0,0,10.5,14.166Z"
                        transform="translate(50 2.001)"
                        fill="#eaf6fc"
                      />
                    </g>
                  </svg>
                  <span>{t("FAQs")}</span>
                </div>
                <div
                  className={`listItem ${
                    window.location.pathname === "/settings" ? "active" : ""
                  }`}
                  onClick={() => activeToggle("/settings")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      id="Group_1376"
                      data-name="Group 1376"
                      transform="translate(-48 0)"
                    >
                      <rect
                        id="Rectangle_145"
                        data-name="Rectangle 145"
                        width="24"
                        height="24"
                        transform="translate(48 0)"
                        fill="none"
                      />
                      <g
                        id="Group_1381"
                        data-name="Group 1381"
                        transform="translate(51 2)"
                      >
                        <path
                          id="Path_314"
                          data-name="Path 314"
                          d="M11.334,8a3.334,3.334,0,1,0,2.358.976A3.335,3.335,0,0,0,11.334,8Zm0,5a1.667,1.667,0,1,1,1.179-.488A1.667,1.667,0,0,1,11.334,13Z"
                          transform="translate(-2.334 -1.333)"
                          fill="#eaf6fc"
                        />
                        <path
                          id="Path_315"
                          data-name="Path 315"
                          d="M17.951,11.583l-.37-.213a7.581,7.581,0,0,0,0-2.742l.37-.213a2.5,2.5,0,0,0-2.5-4.333l-.371.214A7.483,7.483,0,0,0,12.7,2.928V2.5a2.5,2.5,0,0,0-5,0v.428A7.484,7.484,0,0,0,5.329,4.3l-.373-.216a2.5,2.5,0,1,0-2.5,4.333l.37.213a7.581,7.581,0,0,0,0,2.742l-.37.213a2.5,2.5,0,0,0,2.5,4.333l.371-.214A7.483,7.483,0,0,0,7.7,17.073V17.5a2.5,2.5,0,0,0,5,0v-.428A7.483,7.483,0,0,0,15.078,15.7l.373.215a2.5,2.5,0,1,0,2.5-4.333ZM15.827,8.437a5.871,5.871,0,0,1,0,3.125.833.833,0,0,0,.387.944l.9.522a.834.834,0,0,1-.834,1.444l-.905-.523a.834.834,0,0,0-1.013.138,5.821,5.821,0,0,1-2.7,1.563.833.833,0,0,0-.626.808V17.5a.834.834,0,0,1-1.667,0V16.457a.833.833,0,0,0-.626-.808,5.822,5.822,0,0,1-2.7-1.566.834.834,0,0,0-1.013-.137l-.9.523a.833.833,0,1,1-.834-1.443l.9-.522a.833.833,0,0,0,.387-.944,5.872,5.872,0,0,1,0-3.125.833.833,0,0,0-.388-.941l-.9-.522a.834.834,0,0,1,.834-1.444l.905.523A.834.834,0,0,0,6.04,5.917a5.822,5.822,0,0,1,2.7-1.563.833.833,0,0,0,.626-.811V2.5a.834.834,0,0,1,1.667,0V3.543a.833.833,0,0,0,.626.808,5.822,5.822,0,0,1,2.7,1.566.834.834,0,0,0,1.013.138l.9-.523a.833.833,0,1,1,.834,1.443l-.9.522a.833.833,0,0,0-.386.941Z"
                          transform="translate(-1.203 0)"
                          fill="#eaf6fc"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>{t("Settings")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebarFooter">
            <div
              className="listItem"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <img src={logout} alt="" /> <span>{t("Logout")}</span>
            </div>
          </div>
        </div>
      {isModalOpen && (
        <Modal
          className="custom-modal responsiveModal text-center"
          open={isModalOpen}
          onCancel={handleCancelChange}
          footer={null}
          closeIcon={null}
          centered
        >
          <div className="gb fs-20 mb-40 text-center">
            {t("Are you sure to log out?")}
          </div>

          <div className="yesNoOption">
            <button className="noBtn" onClick={handleCancelChange}>
              {t("Cancel")}
            </button>
            <button className="yesBtn" onClick={handleConfirmChange}>
              {t("Yes")}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Sidebar;
