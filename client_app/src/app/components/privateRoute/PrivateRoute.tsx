import { Navigate, Route } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAuthUserTokenSelector } from "../../store/auth/selectors";

function PrivateRoute({ children }: { children: ReactNode }) {
  const stateToken = useSelector(getAuthUserTokenSelector);
  let token = localStorage.getItem("token");
  useEffect(() => {
    token = localStorage.getItem("token");
  }, [stateToken]);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
}

export default PrivateRoute;
