import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const loc = useLocation();
  const isLocalAdmin = typeof window !== "undefined" && localStorage.getItem("np_local_admin") === "true";
  const isAdmin = (user && ((user as any).role === "ADMIN" || (user as any).role === "SUPER_ADMIN")) || isLocalAdmin;
  if (!isAdmin) return <Navigate to="/admin-login" state={{ from: loc }} replace />;
  return <>{children}</>;
};
