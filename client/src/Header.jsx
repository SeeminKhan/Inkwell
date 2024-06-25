import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userInfo) => {
        setUserInfo(userInfo);
      });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className=" text-whit shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="italic text-4xl font-bold tracking-widest text-pink-300 hover:text-cyan-200">
        Inkwell
        </Link>
        <nav className="space-x-4">
          {username ? (
            <>
            <Link
                to="/"
                className="text-2xl font-semibold text-nowrap text-gray-300 hover:text-emerald-500 transition-colors duration-200"
              >
                Home Page
              </Link>
              <Link
                to="/create"
                className="text-2xl font-semibold text-nowrap text-gray-300 hover:text-emerald-500 transition-colors duration-200"
              >
                Create Post
              </Link>
              <button
                onClick={logout}
                className="text-2xl font-semibold text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Logout ({username})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-2xl font-semibold text-gray-300 hover:text-cyan-300 transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="text-2xl font-semibold text-gray-300 hover:text-cyan-300 transition-colors duration-200">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
