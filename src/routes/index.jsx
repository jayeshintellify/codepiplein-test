import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes";
import PrivateRoute from "./PrivateRoutes";
import Sidebar from "../components/Sidebar/Sidebar";
import MobileSidebar from "../components/Sidebar/MobileSidebar";
import Footer from "../components/Footer/Footer";
import { CommonMessageProvider } from "../common/CommonMessage";

const AppRoutes = () => {
  return (
    <>
      <CommonMessageProvider>
        <Suspense>
          <Routes>
            {routes.map((route, index) => (
              <Route
                path={route?.path}
                key={"route_" + index}
                element={
                  route?.isLayout && route.isPrivate ? (
                    <PrivateRoute redirectPath="/">
                        <Sidebar />
                        <div className="rightSide">
                          <MobileSidebar />
                          <route.element />
                          <Footer />
                        </div>
                      </PrivateRoute>
                  ) : !route?.isLayout && route.isPrivate? (
                    <PrivateRoute redirectPath="/">
                      <route.element />
                   </PrivateRoute>
                  ):(
                    <route.element />
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </CommonMessageProvider>
    </>
  );
};

export default AppRoutes;
