import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleLogin = async () => {
    try {
      if (!phone) {
        alert("Enter phone number");
        return;
      }

      const res = await loginUser(phone);
      alert(res.message);

      navigate("/otp");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;