import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const loc = useLocation();

  // Allow admin if:
  // 1) backend returned role === "admin", or
  // 2) local demo admin was used (stored flag)
  const isLocalAdmin =
    typeof window !== "undefined" && localStorage.getItem("np_local_admin") === "true";
  const isAdmin = (user && (user as any).role === "admin") || isLocalAdmin;

  if (!isAdmin) return <Navigate to="/admin/login" state={{ from: loc }} replace />;

  return <>{children}</>;
};
