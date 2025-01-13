import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/LanguageContext/themeContext";
import AppRoutes from "./routes";
import store from "./redux/store";
import './i18n';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <AppRoutes />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
