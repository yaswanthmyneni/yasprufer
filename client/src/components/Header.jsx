import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { api } from "../api";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.get("/user/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white flex justify-between items-center px-10 py-5 border-b border-gray-800">
      <h1
        className="text-3xl text-gray-700 font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Yasprufer
      </h1>
      <div className="flex items-center gap-6 text-lg">
        <p
          className="text-gray-700 cursor-pointer"
          onClick={() => {
            navigate("/create-problem");
          }}
        >
          Create problem
        </p>
        <p
          className="text-gray-700 cursor-pointer"
          onClick={() => {
            navigate("/problem");
          }}
        >
          Problems
        </p>
        {user ? (
          <button
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export { Header };
