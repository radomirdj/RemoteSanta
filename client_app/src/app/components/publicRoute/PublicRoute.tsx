import { Navigate, Route } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAuthUserTokenSelector } from "../../store/auth/selectors";

function PublicRoute({ children }: { children: ReactNode }) {
  const stateToken = useSelector(getAuthUserTokenSelector);
  let token = localStorage.getItem("token");
  useEffect(() => {
    token = localStorage.getItem("token");
  }, [stateToken]);
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <div>{children}</div>;
}

export default PublicRoute;
