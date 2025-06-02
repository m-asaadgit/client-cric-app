import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams(); // Get token from URL params
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle Password Reset
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${apiUrl}/api/user/req-new-password/${token}`, {
        newPassword,
      });

      setSuccess(true);
      setMessage(response.data.message || "Password updated successfully!");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after success
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.response?.data?.message || "Failed to reset password.");
    }

    setLoading(false);
  };

  return (
    <div className="w-[100%] h-[100vh] center card  " >
         <div className="h-fit py-[3vh] rounded-md w-[95%] card flex flex-col items-center">
      <h1 className="w-fit mx-auto h-fit py-3 text-2xl tracking-wider text-blue-600 font-bold font-roboto">
        Reset Password
      </h1>

      <div className="rounded-lg shadow-lg w-[90%] mx-auto">
        {/* New Password Input */}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none"
        />

        {/* Reset Button */}
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mb-4"
          disabled={loading}
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        {/* Message Display */}
        {message && (
          <p className={`mt-1 text-center text-sm ${success ? "text-green-400" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
    </div>
   
  );
}

export default ResetPassword;
