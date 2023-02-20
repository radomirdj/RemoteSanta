import { Navigate, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthUserRoleSelector,
  getAuthUserTokenSelector,
} from "../../store/auth/selectors";
import { getSelfRequest } from "../../store/auth/actions";
import { UserRole } from "../../enums/UserRole";

function UserManagerRoute({ children }: { children: ReactNode }) {
  const stateToken = useSelector(getAuthUserTokenSelector);
  const stateUserRole = useSelector(getAuthUserRoleSelector);
  let token = localStorage.getItem("token");
  let userRole = localStorage.getItem("userRole");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSelfRequest(navigate));
  }, [dispatch]);

  useEffect(() => {
    token = localStorage.getItem("token");
    userRole = localStorage.getItem("userRole");
  }, [stateToken, stateUserRole]);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (userRole === UserRole.ADMIN) {
    return <Navigate to="/admin-home" replace />;
  }
  if (userRole === UserRole.BASIC_USER) {
    return <Navigate to="/" replace />;
  }
  return <div>{children}</div>;
}

export default UserManagerRoute;
