import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentAccessToken } from "../../lib/features/auth/authSlice";

export const RequireAuth = () => {
  const token = useSelector(getCurrentAccessToken);
  const location = useLocation();
  
  return(
    token ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  )
};
