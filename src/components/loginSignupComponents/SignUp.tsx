import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
interface SignUpProps {
  setSignUpPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthResult: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUp({ setSignUpPopUp ,setLoginPopUp,setAuthResult}: SignUpProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  // Request OTP
  const requestOTP = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/req-otp",
        { email }
      );
      setSuccess(true);
      setAuthResult(prev=>!prev)
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
    setLoading(false);
  };

  // Verify OTP and Sign Up
  const verifyOTP = async () => {
    setVerifying(true);
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/req-signup", // Correct endpoint
        { name, email, password, otp }
      );
      setMessage(response.data.message);
      localStorage.setItem("token",response.data.token);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setTimeout(() => setSignUpPopUp(false), 2000); // Auto-close after success
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
    setVerifying(false);
  };

  return (
    <div className="h-fit py-[3vh] relative rounded-md w-[95%] card flex flex-col items-center">
      {/* Close Button */}
      <RxCross1
        onClick={() => setSignUpPopUp(false)}
        size={25}
        className="text-gray-600 absolute top-2 right-2 cursor-pointer hover:text-gray-400"
      />

      <h1 className="w-fit mx-auto h-fit py-3 text-2xl tracking-wider text-blue-600 font-bold font-roboto">
        Sign Up
      </h1>

      <div className="rounded-lg shadow-lg w-[90%] mx-auto">
        <h2 className="text-xl text-center w-full font-bold mb-4 text-white">
          Email Verification
        </h2>

        {!otpSent ? (
          <>
            {/* Name Input */}

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none focus:ring-none focus:none"
            />
            <button
              onClick={requestOTP}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mb-4"
              disabled={loading}
            >
              {loading ? "Sending..." : "Request OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />{" "}
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* OTP Input */}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Verify OTP and Sign Up */}
            <button
              onClick={verifyOTP}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mb-4"
              disabled={verifying}
            >
              {verifying ? "Verifying..." : "Verify & Sign Up"}
            </button>
          </>
        )}

        {/* Message Display */}
        {message && (
          <p
            className={`mt-1 text-center text-sm ${
              success ? "text-gray-400" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <div className="flex gap-2">

          Already have an account? <button  onClick={()=>{
            setSignUpPopUp(false);
            setLoginPopUp(true);
          }}   className="text-blue-700 underline" >Login in</button>
        </div>
        
      </div>
    </div>
  );
}

export default SignUp;
