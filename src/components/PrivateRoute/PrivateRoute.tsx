import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLoggedIn, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/teachers" replace state={{ from: location }} />;
  }

  return children;
}