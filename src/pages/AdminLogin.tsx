import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const FALLBACK_ADMIN = { email: "admin@yourshop.com", password: "Admin#2025!" };

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [email, setEmail] = useState(FALLBACK_ADMIN.email);
  const [password, setPassword] = useState(FALLBACK_ADMIN.password);
  const [error, setError] = useState<string | null>(null);

  const strong = (pw: string) =>
    /.{10,}/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[A-Z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[!@#$%^&*()_\-+={}\[\]|:;"'<>,.?/~`]/.test(pw);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password); // uses your existing backend first
      const dest = location?.state?.from?.pathname || "/admin";
      navigate(dest, { replace: true });
    } catch (err: any) {
      if (email === FALLBACK_ADMIN.email && password === FALLBACK_ADMIN.password) {
        localStorage.setItem("np_local_admin", "true");
        navigate("/admin", { replace: true });
      } else {
        setError(err?.message || "Login failed");
      }
    }
  };

  const ok = strong(password);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-lg">
        <h1 className="text-3xl font-serif font-bold mb-6 text-foreground">Admin Login</h1>
        <form onSubmit={onSubmit} className="space-y-4 bg-card p-6 rounded-2xl shadow-elegant border border-border">
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2" required />
            {!ok && <p className="mt-2 text-xs text-destructive">Password must be 10+ chars and include upper, lower, digit, and special.</p>}
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <Button type="submit" variant="premium" size="lg" className="w-full" disabled={!ok}>Sign in</Button>
          <p className="text-xs text-muted-foreground">Tip: default admin is <b>{FALLBACK_ADMIN.email}</b> / <b>{FALLBACK_ADMIN.password}</b></p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
