import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let user = localStorage.getItem("user") || {};

  return Object.keys(user).length ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default PrivateRoutes;
