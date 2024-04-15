export default function TopNav({
  handleLoginPopup,
  handleLogoutPopup,
  handleUserDetails,
}) {
  return (
    <>
      <button
        onClick={handleLoginPopup}
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Log in
      </button>
      <button
        onClick={handleLogoutPopup}
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Log out
      </button>
    </>
  );
}
