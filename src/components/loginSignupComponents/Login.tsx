import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface LoginProps {
  setLoginPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setSignUpPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setRequestResetPasswordPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({
  setLoginPopUp,
  setSignUpPopUp,
  setRequestResetPasswordPopUp,
  setToken ,
  
}: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // Handle Login
  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/req-login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      setSuccess(true);
      setToken(response.data.token); // Trigger re-fetch in NavBar
      setMessage("Login successful!");

      setTimeout(() => setLoginPopUp(false), 1500); // Auto-close after success
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="h-fit py-[3vh] relative rounded-md w-[95%] card flex flex-col items-center">
      {/* Close Button */}
      <RxCross1
        onClick={() => setLoginPopUp(false)}
        size={25}
        className="text-gray-600 absolute top-2 right-2 cursor-pointer hover:text-gray-400"
      />

      <h1 className="w-fit mx-auto h-fit py-3 text-2xl tracking-wider text-blue-600 font-bold font-roboto">
        Login
      </h1>

      <div className="rounded-lg shadow-lg w-[90%] mx-auto">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none focus:ring-none"
        />
        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none focus:ring-none"
        />
        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mb-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {/* Sign Up Link */}
        <p className=" text-sm text-gray-400">
          Forgot password?{" "}
          <span
            onClick={() => {
              setRequestResetPasswordPopUp(true);
              setLoginPopUp(false);
            }}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Reset password
          </span>
        </p>{" "}
        <p className=" text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => {
              setLoginPopUp(false);
              setSignUpPopUp(true);
            }}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
        {/* Message Display */}
        {message && (
          <p
            className={`mt-1 text-center text-sm ${
              success ? "text-green-400" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
