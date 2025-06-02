import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface RequestResetPasswordProps {
  setRequestResetPasswordPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function RequestResetPassword({
  setRequestResetPasswordPopUp,setLoginPopUp
}: RequestResetPasswordProps) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // Handle Reset Password Request
  const handleResetRequest = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/req-reset-password",
        { email }
      );

      setSuccess(true);
      setMessage(
        response.data.message || "Password reset link sent to your email!"
      );
    } catch (error: any) {
      setSuccess(false);
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="h-fit py-[3vh] relative rounded-md w-[95%] card flex flex-col items-center">
      {/* Close Button */}
      <RxCross1
        onClick={() => setRequestResetPasswordPopUp(false)}
        size={25}
        className="text-gray-600 absolute top-2 right-2 cursor-pointer hover:text-gray-400"
      />

      <h1 className="w-fit mx-auto h-fit py-3 text-2xl tracking-wider text-blue-600 font-bold font-roboto">
        Forgot Password
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

        {/* Reset Button */}
        <button
          onClick={handleResetRequest}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mb-4"
          disabled={loading}
        >
          {loading ? "Requesting..." : "Request Reset Link"}
        </button>

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

export default RequestResetPassword;
