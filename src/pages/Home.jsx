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
        setLoggedIn(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <TopNav
        handleLoginPopup={handleLoginPopup}
        handleLogoutPopup={handleLogoutPopup}
        isLoggedIn={loggedIn}
        user={user}
      ></TopNav>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl">Welcome to the Home Page</h1>
        <p className="text-lg mt-4">
          This page is accessible to all users, authenticated or not.
        </p>
      </div>

      <AuthenticatedTemplate>
        <h1>{user}</h1>
      </AuthenticatedTemplate>
    </>
  );
}

export default Home;
