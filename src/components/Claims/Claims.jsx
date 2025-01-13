import React, { useEffect, useState } from "react";
import rightArrow from "../../assets/images/rightArrow.svg";
import completed from "../../assets/images/completed.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPendingMonthsHandler } from "../../redux/action/getPendingMonths";
import Loader from "../../components/Loder/loader";
import { getUserProductClaimHandler } from "../../redux/action/getUserProductClaim";
import { useTranslation } from "react-i18next";
import {
  updateUserProductClaimAction,
  updateUserProductClaimHandler,
} from "../../redux/action/updateUserProductClaim";
import { useCommonMessage } from "../../common/CommonMessage";
import NoDataFound from "../NoDataFound/NoDataFound";
import { getItem } from "../../common/localStorage";

const Claims = () => {
  const [activeMonth, setActiveMonth] = useState(null);
  const [claimData, setClaimData] = useState([]);
  const messageApi = useCommonMessage();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { state } = useLocation();
  const dispatch = useDispatch();

  const getPendingMonthsSelector = useSelector(
    (state) => state?.getPendingMonths
  );
  const getAllProductListSelector = useSelector(
    (state) => state?.getProductList
  );

  const getUserProductClaimSelector = useSelector(
    (state) => state?.getUserProductClaim
  );

  const updateUserProductClaimSelector = useSelector(
    (state) => state?.updateUserProductClaim
  );

  useEffect(() => {
    if (getPendingMonthsSelector?.data?.data?.pendingMonths?.length > 0) {
      setActiveMonth(getPendingMonthsSelector.data.data.pendingMonths[0]);
    }
  }, [getPendingMonthsSelector]);

  const getAdminId = getItem("adminId");
  const getGroupId = getItem("groupId");
  const getProductCode = getItem("productCode");

  useEffect(() => {
    if (getAdminId && getAllProductListSelector?.data?.statusCode === 200) {
      let payload = {
        userId: getAdminId ?? 0,
        groupId: getGroupId
          ? getGroupId
          : getAllProductListSelector?.data?.data?.products[0].groupId,
        productCode: getProductCode
          ? getProductCode
          : getAllProductListSelector?.data?.data?.products[0].productCode,
      };
      dispatch(getPendingMonthsHandler(payload));
    }
  }, [getAllProductListSelector]);

  useEffect(() => {
    if (getPendingMonthsSelector?.data?.statusCode === 200 && activeMonth) {
      let payload = {
        userId: getAdminId ?? 0,
        groupId: getGroupId
          ? getGroupId
          : getAllProductListSelector?.data?.data?.products[0].groupId,
        productCode: getProductCode
          ? getProductCode
          : getAllProductListSelector?.data?.data?.products[0].productCode,
        targetMonth: activeMonth
          ? activeMonth
          : getPendingMonthsSelector?.data?.data?.pendingMonths?.[0],
      };
      dispatch(getUserProductClaimHandler(payload));
    }
  }, [activeMonth]);

  useEffect(() => {
    if (activeMonth) {
      const tempData = getUserProductClaimSelector?.data?.data?.claim?.map(
        (item) => {
          if (
            item.claimType === "url" ||
            item.claimType === "form" ||
            item?.claimType === "offlineClaim" ||
            item?.claimType === "quiz"
          ) {
            return item;
          }
        }
      );
      setClaimData(tempData);
    }
  }, [getUserProductClaimSelector, activeMonth]);

  const handleMonthsWiseData = (item) => {
    setActiveMonth(item);
  };

  const handleClaimCards = (item) => {
    if (item?.claimType === "url") {
      const updatedData = claimData.map((obj) => {
        if (obj?.id === item.id) {
          return {
            ...obj,
            claimStatus: "COMPLETE",
          };
        }
        return obj;
      });

      const payload = {
        id: getUserProductClaimSelector?.data?.data?.id,
        claim: updatedData,
      };

      dispatch(updateUserProductClaimHandler(payload));
      window.open(item?.urlData, "_blank");
    } else if (item?.claimType === "form") {
      navigate("/form-info", {
        state: {
          item: item,
          getUserProductClaimSelector: getUserProductClaimSelector,
        },
      });
    } else if (item?.claimType === "quiz") {
      navigate("/health-quiz", {
        state: {
          item: item,
          getUserProductClaimSelector: getUserProductClaimSelector,
        },
      });
    }
  };

  useEffect(() => {
    if (updateUserProductClaimSelector?.message) {
      messageApi.open({
        type: "error",
        content: updateUserProductClaimSelector?.message,
      });
      dispatch(updateUserProductClaimAction.updateUserProductClaimInfoReset());
    } else if (updateUserProductClaimSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: updateUserProductClaimSelector?.data?.message,
      });
      dispatch(updateUserProductClaimAction.updateUserProductClaimInfoReset());
    }
  }, [updateUserProductClaimSelector]);

  return (
    <>
      {(getUserProductClaimSelector?.isLoading ||
        updateUserProductClaimSelector?.isLoading) && (
        <Loader loaderTransform="loaderTransform" />
      )}
      <div className="mainSection">
        <div className="overflowx w-100 mb-30">
          <div className="d-flex gap-8 align-center">
            {getPendingMonthsSelector?.data?.data?.pendingMonths?.map(
              (item) => {
                const month = item.substring(0, 3); 
                const year = item.slice(-2); 
                return (
                  <div
                    className={`month fs-16 cursor-pointer ${
                      activeMonth === item ? "active" : ""
                    }`}
                    onClick={() => handleMonthsWiseData(item)}
                  >
                    {`${month}${year}`}
                  </div>
                );
              }
            )}
          </div>
        </div>
        {claimData?.length > 0 ? (
          <>
            {claimData
              ?.filter((item) => item?.claimType !== "offlineClaim")
              ?.map((item, index) => (
                <div className="claimGrid" key={index}>
                  <div
                    className={`claimCard tgb fs-20 mb-20 ${
                      item?.claimStatus === "COMPLETE" &&
                      (item?.claimType === "form")
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() =>
                      !(
                        item.claimStatus === "COMPLETE" &&
                        (item.claimType === "form" )
                      ) && handleClaimCards(item)
                    }
                  >
                    {item?.claimName}
                    {item.claimStatus === "COMPLETE" &&
                    (item.claimType === "form" ||
                      item.claimType === "quiz") ? null : (
                      <img src={rightArrow} alt="Right Arrow" />
                    )}
                    {item.claimStatus === "COMPLETE" &&
                      (item.claimType === "form" ||
                        item.claimType === "quiz") && (
                        <img src={completed} alt="Completed" />
                      )}
                  </div>
                </div>
              ))}
          </>
        ) : (
          <NoDataFound />
        )}
      </div>
    </>
  );
};

export default Claims;
