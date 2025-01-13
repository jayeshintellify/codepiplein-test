import * as Yup from "yup";

export const loginValidationSsnIdSchema = (t) =>
  Yup.object().shape({
    ssnId: Yup.string().required(t("Please enter SSN ID")),
    dateOfBirth: Yup.date()
      .nullable()
      .required(t("Date of Birth is Required"))
      .typeError(t("Please enter a valid date")),
  });

export const loginValidationMemberIdSchema = (t) =>
  Yup.object().shape({
    memberId: Yup.string().required(t("Please enter Member ID")),
    dateOfBirth: Yup.date()
      .nullable()
      .required(t("Date of Birth is Required"))
      .typeError(t("Please enter a valid date")),
  });
