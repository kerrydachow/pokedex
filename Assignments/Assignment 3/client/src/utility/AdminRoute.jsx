import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserProfileContext } from "../contexts/UserProfile.Context";
import { ROUTES } from "../lib/constants";

const AdminRoute = (props) => {
  const { user, refreshToken } = useContext(UserProfileContext);
  let isLoggedIn = false;
  if (!!user && !!refreshToken) {
    isLoggedIn = true;
  }
  let isAdmin = user?.userType === "admin";
  console.log(user?.userType);

  return isLoggedIn && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.ERROR_401} />
  );
};

export default AdminRoute;
