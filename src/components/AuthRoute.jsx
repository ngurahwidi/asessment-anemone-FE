import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />; // kalau belum login, lempar ke login
  }
  return children;
};

export const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/student" replace />; // kalau sudah login, jangan balik ke login
  }
  return children;
};
