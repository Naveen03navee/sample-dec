import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // IMPORTANT
    });
  };

  const handleRegister = async () => {
    try {
      if (!form.name || !form.phone) {
        alert("Please fill all required fields");
        return;
      }

      const res = await registerUser(form);
      alert(res);

      navigate("/otp");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;