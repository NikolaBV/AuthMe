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
    return new Promise((resolve, reject) => {
      instance
        .loginPopup({
          ...loginRequest,
          redirectUri: "/",
        })
        .then((response) => {
          setUser(response.account.name);
          setLoggedIn(true);
          localStorage.setItem("user", response.account.name);
          localStorage.setItem("loggedIn", true);
          console.log(loggedIn);
          resolve(response); // Resolve the promise with the response
        })
        .catch((error) => {
          console.log(error);
          reject(error); // Reject the promise with the error
        });
    });
  };

  const handleLogoutPopup = () => {
    return new Promise((resolve, reject) => {
      instance
        .logoutPopup({
          mainWindowRedirectUri: "/",
          account: instance.getActiveAccount(),
        })
        .then(() => {
          setUser("");
          setLoggedIn(false);
          localStorage.removeItem("user");
          localStorage.setItem("loggedIn", false);
          console.log(loggedIn);
          resolve(); // Resolve the promise when logout is successful
        })
        .catch((error) => {
          console.log(error);
          reject(error); // Reject the promise if there's an error
        });
    });
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
