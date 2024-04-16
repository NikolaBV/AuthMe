// Layout.js
import React from "react";
import TopNav from "./TopNav";

import { loginRequest } from "../authConfig";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";

const Layout = ({ children }) => {
  const { instance } = useMsal();
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "/",
      })
      .then((response) => {
        setUser(response.account.name);
        setLoggedIn(true);
        localStorage.setItem("user", response.account.name);
        localStorage.setItem("loggedIn", loggedIn);
      })
      .catch((error) => console.log(error));
  };

  const handleLogoutPopup = () => {
    instance
      .logoutPopup({
        mainWindowRedirectUri: "/",
        account: instance.getActiveAccount(),
      })
      .then(() => {
        setUser("");
        setLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <TopNav
        handleLoginPopup={handleLoginPopup}
        handleLogoutPopup={handleLogoutPopup}
        loggedIn={localStorage.loggedIn}
      ></TopNav>
      {children}
    </>
  );
};

export default Layout;
