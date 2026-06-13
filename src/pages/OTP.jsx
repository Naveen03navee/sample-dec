import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    alert("Login Successful ✅");
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl mb-4">Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="p-3 border rounded-lg mb-3"
      />

      <Button text="Verify" onClick={handleVerify} />
    </div>
  );
};

export default OTP;