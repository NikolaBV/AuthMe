import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import { loginRequest } from "./authConfig";
import { useState } from "react";

function App() {
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
  const handleUserDetails = async () => {
    console.log(instance.getAllAccounts().at(0).name);
    setUser(instance.getAllAccounts().at(0).name);
  };
  return (
    <>
      <h1> User</h1>
      <button onClick={handleLoginPopup}>Log in</button>
      <button onClick={handleLogoutPopup}>Log out</button>
      <button onClick={handleUserDetails}>Details</button>
      <UnauthenticatedTemplate>
        <h1>Login</h1>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <h1>You are {user}</h1>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
