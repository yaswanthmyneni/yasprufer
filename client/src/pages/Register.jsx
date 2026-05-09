import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/user/signup`,
      form,
      {
        withCredentials: true,
      },
    );
    const res2 = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/user/dashboard`,
      {
        withCredentials: true,
      },
    );
    if (res2.data.user) {
      navigate("/dashboard");
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sign Up
        </h2>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={(e) => handleSignup(e)}
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export { Register };
