import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className=" px-10 py-8 rounded-2xl shadow-lg shadow-black/20 border border-blue-400 text-center">
          <h1 className="text-3xl">Please Log In</h1>
          <p className="mt-6">You need to login to access this page.</p>
          <p
            className="mt-4 text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login from here
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export { ProtectedRoute };
