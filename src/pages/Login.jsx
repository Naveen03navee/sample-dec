import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    alert("Verifying user...");
    navigate("/otp");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Welcome Back</h2>

      <div className="w-80">
        <InputField
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button text="Login with OTP" onClick={handleLogin} />

        <p className="mt-3 text-sm">
          New user?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;