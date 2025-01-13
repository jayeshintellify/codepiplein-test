import * as Yup from "yup";

export const supportReqValidationSchema = (t) =>
  Yup.object().shape({
    firstName: Yup.string().required(t("Please enter first name")),
    lastName: Yup.string().required(t("Please enter last name")),
    emailId: Yup.string().required(t("Please enter email address")),
    memberId: Yup.string().required(t("Please enter Member ID")),
    description: Yup.string().required(t("Please enter description")),
  });

export const profileChangeSchema = (t) =>
  Yup.object().shape({
    addressLine1: Yup.string().required(t("Please enter address line 1")),
    // state: Yup.string().required("State is required"),
    city: Yup.string().required(t("Please enter city")),
    zip: Yup.string().required(t("Please enter zip code")),
  });
