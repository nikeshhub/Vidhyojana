import React from "react";
import { Route, Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  return !!authToken;
};

const getUserRole = () => {
  return "admin";
};

const PrivateRoute = ({ element: Element, roles, ...rest }) => (
  <Route
    {...rest}
    element={
      isAuthenticated() ? (
        roles.includes(getUserRole()) ? (
          <Element />
        ) : (
          <Navigate to="/login" replace />
        )
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
);

export default PrivateRoute;
