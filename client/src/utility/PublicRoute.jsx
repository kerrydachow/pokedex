import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserProfileContext } from "../contexts/UserProfile.Context";
import { ROUTES } from "../lib/constants";

const PublicRoute = (props) => {
  const { user, refreshToken } = useContext(UserProfileContext);
  let isLoggedIn = false;
  if (!!user && !!refreshToken) {
    isLoggedIn = true;
  }

  return isLoggedIn ? (
    <Navigate to={ROUTES.LANDING} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
