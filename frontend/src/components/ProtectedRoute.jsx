import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If user is not authenticated, start them on the Register page
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;

