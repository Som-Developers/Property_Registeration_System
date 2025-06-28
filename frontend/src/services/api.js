import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false, // since you're using token in response, not cookie
});

export const loginUser = async (userData) => {
  const response = await API.post("/users/login", userData);
  return response.data; // This is IMPORTANT
};
// ==========================
// ✅ Auth APIs
// ==========================
export const registerUser = (userData) => API.post("/users/register", userData);

// ==========================
// ✅ Property APIs (User)
export const getAllProperties = () => API.get("/properties");

// ==========================
// ✅ Admin APIs
export const approveProperty = (id) => API.put(`/admin/properties/${id}/approve`);
