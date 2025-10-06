import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

type Role = "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";
type User = { id: string; email: string; name: string; role: Role };

type AuthResult = { success: boolean; message: string };

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string, name: string) => Promise<AuthResult>;
  logout: () => void;
  validatePassword: (pw: string) => { ok: boolean; reasons: string[] };
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "np_auth_token";
const ADMIN_FALLBACK = { email: "admin@yourshop.com", password: "Admin#2025!" };

// Helper function to decode JWT token
function decodeJWT(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const localAdmin = localStorage.getItem("np_local_admin");
      
      if (token) {
        try {
          // Try to get profile from backend
          const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data.success) {
            setUser(response.data.data.user);
          } else {
            localStorage.removeItem(TOKEN_KEY);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem(TOKEN_KEY);
          
          // Fallback to local admin if the backend auth fails
          if (localAdmin === "true") {
            setUser({
              id: "local-admin",
              email: ADMIN_FALLBACK.email,
              name: "Local Admin",
              role: "ADMIN"
            });
          }
        }
      } else if (localAdmin === "true") {
        // Local admin fallback
        setUser({
          id: "local-admin",
          email: ADMIN_FALLBACK.email,
          name: "Local Admin",
          role: "ADMIN"
        });
      }
      
      setIsLoading(false);
    };
    
    initAuth();
  }, []);

  const validatePassword = (pw: string) => {
    const reasons: string[] = [];
    if (pw.length < 6) reasons.push("At least 6 characters");
    if (!/[a-z]/.test(pw)) reasons.push("At least one lowercase letter");
    if (!/[A-Z]/.test(pw)) reasons.push("At least one uppercase letter");
    if (!/[0-9]/.test(pw)) reasons.push("At least one digit");
    if (!/[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]/.test(pw)) reasons.push("At least one special character");
    return { ok: reasons.length === 0, reasons };
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Try backend authentication first
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      });
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.removeItem("np_local_admin"); // Clear local admin flag
        setUser(user);
        return { success: true, message: "Login successful" };
      }
    } catch (error: any) {
      console.error('Backend login failed:', error);
      
      // Fallback to local admin authentication
      if (email === ADMIN_FALLBACK.email && password === ADMIN_FALLBACK.password) {
        const localUser: User = {
          id: "local-admin",
          email: ADMIN_FALLBACK.email,
          name: "Local Admin",
          role: "ADMIN"
        };
        
        localStorage.setItem("np_local_admin", "true");
        setUser(localUser);
        return { success: true, message: "Login successful (local admin)" };
      }
    }
    
    return { success: false, message: "Invalid email or password" };
  };

  const signup = async (email: string, password: string, name: string): Promise<AuthResult> => {
    const pwd = validatePassword(password);
    if (!pwd.ok) {
      return { success: false, message: `Weak password: ${pwd.reasons.join(", ")}` };
    }
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        name,
        email,
        password
      });
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem(TOKEN_KEY, token);
        setUser(user);
        return { success: true, message: "Account created successfully" };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      return { success: false, message };
    }
    
    return { success: false, message: "Signup failed" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("np_local_admin");
  };

  const value = useMemo(
    () => ({
      user,
      isAdmin: user?.role === "ADMIN" || user?.role === "SUPER_ADMIN",
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      signup,
      logout,
      validatePassword,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
