let users = [];

export const registerUser = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exist = users.find(u => u.phone === data.phone);

      if (exist) {
        reject("User already exists");
      } else {
        users.push(data);
        resolve("Registration Successful ✅");
      }
    }, 1000);
  });
};

export const loginUser = async (phone) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.phone === phone);

      if (!user) {
        reject("User not found");
      } else {
        resolve({ message: "OTP Sent ✅" });
      }
    }, 1000);
  });
};