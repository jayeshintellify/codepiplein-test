import { Navigate } from "react-router";

const PrivateRoute = ({children,redirectPath }) => {
  return localStorage.getItem("token") ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectPath || "/"} />
  );
};

export default PrivateRoute;