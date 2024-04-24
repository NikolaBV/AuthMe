import "../App.css";
import "../styles/styles.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

function Home() {
  return (
    <>
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
