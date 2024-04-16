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
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "/",
      })
      .then((response) => {
        setUser(response.account.name);
        localStorage.setItem("user", response.account.name);
        setLoggedIn(true);
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
        localStorage.removeItem("user");
        setLoggedIn(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <TopNav
        handleLoginPopup={handleLoginPopup}
        handleLogoutPopup={handleLogoutPopup}
        loggedIn={loggedIn}
      ></TopNav>
      <UnauthenticatedTemplate>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl">Welcome to the Home Page</h1>
          <p className="text-lg mt-4">
            This page is accessible to unautheticated users.
          </p>
        </div>
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl">Welcome {localStorage.user}</h1>
          <p className="text-lg mt-4">
            This page is available only if you are authenticated
          </p>
        </div>
      </AuthenticatedTemplate>
    </>
  );
}

export default Home;
