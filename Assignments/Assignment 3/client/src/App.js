import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./lib/constants";
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path={ROUTES.LANDING}
          element={<LandingPage />}
          exact
        />
      </Routes>
    </div>
  );
}

export default App;
