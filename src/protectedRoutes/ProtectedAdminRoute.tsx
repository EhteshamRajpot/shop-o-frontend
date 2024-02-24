import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state: RootState) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    } else if (user.role !== "Admin") {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }
  return null; // or some fallback UI while loading
};

export default ProtectedAdminRoute;

interface RootState {
  user: {
    loading: boolean;
    isAuthenticated: boolean;
    user: {
      role: string;
    };
  };
}
