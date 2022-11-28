import React, { createContext, useState } from "react";
import axios from 'axios';

export const UserProfileContext = createContext({
  refreshToken: null,
  accessToken: null,
  user: null,
  logout: () => {},
  setUser: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  isUserAuthenticated: () => false,
});

const getUserFromLocalStorage = () => {
  const stringifiedUser = localStorage.getItem('user-details');

  if (stringifiedUser === "undefined") {
    return null;
  }

  const loggedInUser = JSON.parse(stringifiedUser)
  return loggedInUser;
}

const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access-token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh-token') || null);

  const logout = async () => {
    setAccessToken(null);
    setUser(null);
    setRefreshToken(null);
    await axios.delete(`http://localhost:4001/api/token/deleteRefresh`, { data: {token: refreshToken }});
    console.log("Logged user out!")
    localStorage.clear();
    window.location.reload(false);
  }

  const isUserAuthenticated = () => {
    return !!user && !!accessToken && !!refreshToken;
  }

  return (
    <UserProfileContext.Provider
      value={{
        logout,
        isUserAuthenticated,
        setAccessToken,
        setRefreshToken,
        setUser,
        user,
        accessToken,
        refreshToken,
      }}
    >
      { children }
    </UserProfileContext.Provider>
  )
};

export default UserProfileProvider
