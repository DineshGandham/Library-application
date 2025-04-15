
const Header = ({handleLogOut}) => {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <a href="/" className="hover:opacity-80">MyLogo</a>
      </div>

      <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        onClick={() => handleLogOut()}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
