import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  return auth?.userInfo?.userExists ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
