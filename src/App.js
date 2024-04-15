import "./App.css";
import "./styles/styles.css"
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
      <button onClick={handleLoginPopup} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Log in
</button>
<button onClick={handleLogoutPopup} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Log out
</button>
      <button onClick={handleUserDetails} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      User details
</button>
      <UnauthenticatedTemplate>
        <h1>Login</h1>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <h1>You are {user}</h1>
      </AuthenticatedTemplate>

      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </>
  );
}

export default App;
