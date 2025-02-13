import React, { useState } from "react";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

function EnterOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verificationId, setVerificationId] = useState(""); // Store verification ID from Firebase
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate=useNavigate()

  // Handle OTP input changes
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if the current one is filled
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle Backspace to move focus to previous field
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      // Move focus to previous field if current field is empty
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  // Handle OTP paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").split("");
    if (pastedData.length === 6) {
      setOtp(pastedData);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join(""); // Combine OTP array into a single string
    if (enteredOtp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsVerifying(true);
    const auth = getAuth();
    const credential = PhoneAuthProvider.credential(verificationId, enteredOtp);

    signInWithCredential(auth, credential)
      .then((userCredential) => {
        console.log("User signed in successfully:", userCredential.user);
        setIsVerifying(false);
        // Redirect to the dashboard or protected route
        navigate("/home");
      })
      .catch((error) => {
        setError("Invalid OTP. Please try again.");
        setIsVerifying(false);
        console.error("Error verifying OTP:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-center text-2xl font-semibold mb-4">Enter OTP</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          We’ve sent you an OTP to verify your identity.
        </p>

        <div className="flex space-x-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(e, index)}
              id={`otp-input-${index}`}
              className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-md"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleVerifyOtp}
          disabled={isVerifying}
          className="w-full mt-6 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg"
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

export default EnterOtp;
