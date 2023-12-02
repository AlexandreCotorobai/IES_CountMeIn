import { useAuthContext } from "@/contexts/auth";
import React from "react";
import { Navigate } from "react-router-dom";
  
export const ProtectedRoute = ({ page }: { page: React.ComponentType}): React.ReactElement => {

  const {isLogged} = useAuthContext()

  if (!isLogged()) {
    return <Navigate to={"/login"} replace/>
  }

  return React.createElement(page, {});
};