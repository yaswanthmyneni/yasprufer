import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Login</h1>
      <form className="flex flex-col ">
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-[20rem] mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-[20rem] mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={(e) => handleLogin(e)}
          className="w-[20rem] cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-3"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="w-[20rem] cursor-pointer border border-gray-400 py-2 rounded-lg"
        >
          Signup
        </button>
      </form>
    </section>
  );
};

export { Login };
