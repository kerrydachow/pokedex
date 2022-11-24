import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./lib/constants";
import Header from "./components/ui/Header";
import LandingPage from "./pages/LandingPage";

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
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
