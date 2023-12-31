import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

import UserProfileProvider from "./contexts/UserProfile.Context";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProfileProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProfileProvider>
);
