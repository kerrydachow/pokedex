import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./lib/constants";
import PublicRoute from "./utility/PublicRoute";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Error401Page from "./pages/Error401Page";
import Error404Page from "./pages/Error404Page";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <main className="content">
            <Header />
            <Routes>
              <Route path={ROUTES.LANDING} element={<LandingPage />} exact />
              <Route exact path={ROUTES.LOGIN} element={<PublicRoute />}>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              </Route>
              <Route exact path={ROUTES.SIGNUP} element={<PublicRoute />}>
                <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
              </Route>
              <Route path="*" element={<Error404Page />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
