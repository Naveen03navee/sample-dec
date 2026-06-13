import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    alert("Registration Successful ✅");
    navigate("/otp");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Create Account</h2>

      <div className="w-80">
        <InputField type="text" name="name" placeholder="Full Name" onChange={handleChange} />
        <InputField type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
        <InputField type="email" name="email" placeholder="Email (optional)" onChange={handleChange} />

        <Button text="Register" onClick={handleRegister} />

        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;