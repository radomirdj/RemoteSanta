import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode } from "react";

import { getAuthUserSelector } from "../../store/auth/selectors";

function PrivateRoute({ children }: { children: ReactNode }) {
  console.log("PrivateRoute -> children", children);
  const user = useSelector(getAuthUserSelector);
  if (!user.accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
}

export default PrivateRoute;
