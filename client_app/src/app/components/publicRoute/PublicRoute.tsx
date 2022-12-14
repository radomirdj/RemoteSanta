import { Navigate, Route } from "react-router-dom";
import { ReactNode } from "react";

function PublicRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <div>{children}</div>;
}

export default PublicRoute;
