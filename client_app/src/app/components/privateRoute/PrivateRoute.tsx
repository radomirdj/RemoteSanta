import { Navigate, Route } from "react-router-dom";
import { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
}

export default PrivateRoute;
