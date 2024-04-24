// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Layout from "./components/Layout"; // Import the Layout component
import reportWebVitals from "./reportWebVitals";
import { msalConfig } from "./authConfig";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
      </MsalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
