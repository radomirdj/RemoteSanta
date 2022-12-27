import { Navigate, Route } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserTokenSelector } from "../../store/auth/selectors";
import { getSelfRequest } from "../../store/auth/actions";

function PrivateRoute({ children }: { children: ReactNode }) {
  const stateToken = useSelector(getAuthUserTokenSelector);
  let token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelfRequest());
  }, [dispatch]);

  useEffect(() => {
    token = localStorage.getItem("token");
  }, [stateToken]);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
}

export default PrivateRoute;
