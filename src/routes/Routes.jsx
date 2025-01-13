import { useNavigate } from "react-router-dom";
import Login from "../components/Login/Login";
import Consent from "../components/Consent/Consent";
import PreviewPdf from "../components/Consent/PreviewPdf";
import Esign from "../components/Consent/Esign";
import PdfReview from "../components/Consent/PdfReview";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import Dashboard from "../components/Dashboard/Dashboard";
import Contact from "../components/Contact/Contact";
import Notification from "../components/Notification/Notification";
import FAQs from "../components/FAQs/FAQs";
import Settings from "../components/Settings/Settings";
import ProfileChange from "../components/Settings/ProfileChange";
import SupportRequest from "../components/Settings/SupportRequest";
import ManageNotification from "../components/Settings/ManageNotification";
import Claims from "../components/Claims/Claims";
import HealthRiskAssessment from "../components/Claims/HealthRiskAssessment";
import DoctorVisit from "../components/Claims/DoctorVisit";
import DoctorVisitForm from "../components/Claims/DoctorVisitForm";
import HealthQuiz from "../components/Claims/HealthQuiz";
import QuizList from "../components/Claims/QuizList";
import Anxiety from "../components/Claims/Anxiety";
import Langauge from "../components/Login/LanguageSelection";
import Form from "../components/Claims/Form";
import Dpcextra from "../components/Dashboard/Dpcextra";
import Quiz from "../components/Claims/Quiz";
import PdfReview2 from "../components/Consent/PdfPreview2";
import ExplanationOfBenifitaHistoryDetails from "../components/ExplanationOfBeniftsHistory/ExplanationOfBenifitaHistoryDetails";
import FormInfo from "../components/Claims/FormInfo";

const NoMatch = () => {
  const navigate = useNavigate();
  navigate("/");
};

export const routes = [
  {
    element: Dashboard,
    path: "/dashboard",
    isPrivate: true,
    isLayout: true,
  },
  {
    element: Dpcextra,
    path: "/dpcextra",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: Login,
    path: "/login",
    isPrivate: false,
    isLayout: false,
  },
  {
    element: Consent,
    path: "/consent",
    isPrivate: false,
    isLayout: false,
  },
  {
    element: ExplanationOfBenifitaHistoryDetails,
    path: "/explanation-of-benifits-history",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: PreviewPdf,
    path: "/preview-pdf",
    isPrivate: false,
    isLayout: false,
  },
  {
    element: Esign,
    path: "/eSign",
    isPrivate: false,
    isLayout: false,
  },
  {
    element: PdfReview,
    path: "/pdf-review",
    isPrivate: false,
    isLayout: false,
  },
  {
    element: PdfReview2,
    path: "/show-sign-document",
    isPrivate: false,
    isLayout: false,
  },
  {
    element: ProductInfo,
    path: "/product-info",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: Contact,
    path: "/contact",
    isPrivate: true,
    isLayout: true,
  },
  {
    element: Notification,
    path: "/notification",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: FAQs,
    path: "/FAQs",
    isPrivate: true,
    isLayout: true,
  },
  {
    element: Settings,
    path: "/settings",
    isPrivate: true,
    isLayout: true,
  },
  {
    element: Claims,
    path: "/claims",
    isPrivate: true,
    isLayout: true,
  },
  {
    element: ProfileChange,
    path: "/profile-change",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: SupportRequest,
    path: "/support-request",
    isPrivate: false,
    isLayout: false,
  },
  {
    element: ManageNotification,
    path: "/manage-notification",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: HealthRiskAssessment,
    path: "/health-risk-assessment",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: DoctorVisit,
    path: "/doctor-visit",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: DoctorVisitForm,
    path: "/doctor-visit-form",
    isPrivate: false,
    isLayout: false,
  },
  {
    element: HealthQuiz,
    path: "/health-quiz",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: FormInfo,
    path: "/form-info",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: QuizList,
    path: "/quiz-list",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: Anxiety,
    path: "/anxiety",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: Form,
    path: "/form",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: Quiz,
    path: "/quiz-form",
    isPrivate: true,
    isLayout: false,
  },
  {
    element: Langauge,
    path: "/",
    isPrivate: false,
    isLayout: false,
  },

  { path: "*", element: NoMatch },
];
