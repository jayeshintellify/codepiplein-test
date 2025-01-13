import React, { useEffect } from "react";
import downArrow from "../../assets/images/downArrow.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductFeaturesHandler } from "../../redux/action/getProductFeatures";
import { getProductListHandler } from "../../redux/action/getProductList";
import Loader from "../Loder/loader";
import NoDataFound from "../NoDataFound/NoDataFound";
import { getItem, setItem } from "../../common/localStorage";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProductFeaturesSelector = useSelector(
    (state) => state?.getProductFeatures
  );
  const getAllProductListSelector = useSelector(
    (state) => state?.getProductList
  );

  const getAdminId = getItem("adminId");
  const getGroupId = getItem("groupId");
  const getProdcuctId = getItem("productCode");

  useEffect(() => {
    if (getAdminId) {
      let payload = {
        userId: getAdminId,
        refBrandId: 2,
      };
      dispatch(getProductListHandler(payload));
    }
  }, [getAdminId]);

  useEffect(() => {
    if (getAdminId && getAllProductListSelector?.data?.data?.products?.length>0) {
      let payload = {
        userId: getAdminId ?? 0,
        // groupId:  getGroupId,
        groupId: getGroupId
          ? getGroupId
          : getAllProductListSelector?.data?.data?.products[0].groupId,
        productCode: getProdcuctId
          ? getProdcuctId
          : getAllProductListSelector?.data?.data?.products[0].productCode,
        // productCode:  getProdcuctId,
      };
      dispatch(getProductFeaturesHandler(payload));
    }
  }, [getGroupId, getProdcuctId, getAllProductListSelector]);

  return (
    <>
      {getProductFeaturesSelector?.isLoading === true ? (
        <Loader loaderTransForm="loaderTransForm" />
      ) : (
        <div>
          {getProductFeaturesSelector?.data?.data?.productFeature?.length >
          0 ? (
            <>
              <div className="mainSection">
                <div className="dashboardGrid">
                  {getProductFeaturesSelector?.data?.data?.productFeature?.map(
                    (item, index) => {
                      return (
                        <div
                          className="dashboardCard"
                          onClick={() => {
                            setItem(
                              "featureName",
                              item?.featureName
                            );
                            navigate("/product-info", { state: { item } });
                          }}
                          key={index}
                        >
                          <img
                            src={item?.iconUrl}
                            alt=""
                            className="mb-16 featureImage"
                          />
                          <div className="tgb fs-20 fw-600">
                            {item?.featureName}
                          </div>
                          <img
                            src={downArrow}
                            alt=""
                            className="redirectArrow"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </>
          ) : (
            <NoDataFound />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
