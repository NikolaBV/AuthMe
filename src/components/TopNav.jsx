import { Link } from "react-router-dom";

export default function TopNav({
  handleLoginPopup,
  handleLogoutPopup,
  loggedIn,
}) {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Home
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {loggedIn && (
              <li>
                <Link
                  to="/profile"
                  className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded"
                >
                  User profile
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={handleLoginPopup}
                className="bg-transparent hover:bg-blue-500 text-white -semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded"
              >
                Log in
              </button>
            </li>
            <li>
              <button
                onClick={handleLogoutPopup}
                className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
