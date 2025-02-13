import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
export default function LoginNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  const handleNumberSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate phone number (10 digits only)
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Start OTP sending process
    setIsSendingOtp(true);

    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    
    
      signInWithPhoneNumber(`+1${phoneNumber}`, recaptchaVerifier) // Adjust country code
      .then((confirmationResult) => {
        setIsSendingOtp(false);
        setVerificationId(confirmationResult.verificationId); // Store verification ID to verify OTP later
        navigate("/enter-otp", { state: { verificationId } }); // Redirect to OTP page
      })
      .catch((error) => {
        setIsSendingOtp(false);
        setError("Failed to send OTP. Please try again.");
        console.error("Error sending OTP: ", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Sign In with Phone Number
        </h2>
        <form onSubmit={handleNumberSubmit}>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Enter your phone number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setError("");
                setPhoneNumber(e.target.value);
              }}
              placeholder="1234567890"
              maxLength={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isSendingOtp}
            className="w-full bg-indigo-500 text-white py-3 rounded-lg mt-4"
          >
            {isSendingOtp ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
