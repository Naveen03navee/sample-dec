// src/services/authService.js

// Mock user storage (temporary)
let users = [];

// 🔹 Register User
export const registerUser = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = users.find(
        (u) => u.phone === data.phone
      );

      if (existingUser) {
        reject("User already exists");
      } else {
        users.push(data);
        resolve("Registration Successful ✅");
      }
    }, 1000);
  });
};

// 🔹 Login User (OTP Simulation)
export const loginUser = async (phone) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.phone === phone);

      if (!user) {
        reject("User not found");
      } else {
        resolve({
          message: "OTP Sent Successfully 📩",
          otp: "1234", // mock OTP
        });
      }
    }, 1000);
  });
};

// 🔹 Verify OTP
export const verifyOTP = async (enteredOtp) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (enteredOtp === "1234") {
        resolve("Login Successful ✅");
      } else {
        reject("Invalid OTP ❌");
      }
    }, 1000);
  });
};