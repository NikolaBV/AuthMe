import "../App.css";
import "../styles/styles.css";
import TopNav from "../components/TopNav";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import { loginRequest } from "../authConfig";
import { useState } from "react";
function Home() {
  const { instance } = useMsal();
  const [user, setUser] = useState("");

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "/",
      })
      .catch((error) => console.log(error));
  };

  const handleLogoutPopup = () => {
    instance
      .logoutPopup({
        mainWindowRedirectUri: "/", // redirects the top level app after logout
        account: instance.getActiveAccount(),
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <TopNav
        handleLoginPopup={handleLoginPopup}
        handleLogoutPopup={handleLogoutPopup}
      ></TopNav>
      <UnauthenticatedTemplate></UnauthenticatedTemplate>
      <AuthenticatedTemplate></AuthenticatedTemplate>
    </>
  );
}

export default Home;
