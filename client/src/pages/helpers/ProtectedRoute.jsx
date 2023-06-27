import { useState, useMemo } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const location = useLocation();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useMemo(() => {
    const checkAuth = async () => {
      const response = await fetch(`${process.env.DEPLOYMENT_PREFIX}/api/check-auth`);
      const result = await response.json();
      if (result.user) setAuthenticated(true);
      setLoading(false);
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
