import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserTokenSelector } from "../../store/auth/selectors";
import { getSelfRequest } from "../../store/auth/actions";

function AdminRoute({ children }: { children: ReactNode }) {
  const stateToken = useSelector(getAuthUserTokenSelector);
  let token = localStorage.getItem("token");
  let userRole = localStorage.getItem("userRole");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelfRequest());
  }, [dispatch]);

  useEffect(() => {
    token = localStorage.getItem("token");
    userRole = localStorage.getItem("userRole");
  }, [stateToken]);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (userRole === "BASIC_USER") {
    return <Navigate to="/" replace />;
  }
  return <div>{children}</div>;
}

export default AdminRoute;
