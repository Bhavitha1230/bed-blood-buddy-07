import { useState } from "react";
import { Link } from "react-router-dom";
import { Droplets, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-4">
            <Droplets className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">Bed & Blood Tracker</h1>
          <p className="text-xs text-muted-foreground mt-1">{isLogin ? "Sign in to your account" : "Create a new account"}</p>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex mb-6 rounded-lg bg-accent p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${!isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Register
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Full Name</label>
                  <input type="text" className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Dr. Jane Smith" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Hospital</label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground">
                    <option>Select hospital...</option>
                    <option>City General Hospital</option>
                    <option>St. Mary's Medical Center</option>
                    <option>Metro Emergency Hospital</option>
                    <option>National Heart Institute</option>
                    <option>Apollo Care Hospital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Role</label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground">
                    <option>Hospital Staff</option>
                    <option>Administrator</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">Email</label>
              <input type="email" className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="jane@hospital.org" />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} className="w-full h-9 rounded-md border border-input bg-background px-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all duration-150">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-[10px] text-muted-foreground">
            Enable Lovable Cloud for live authentication
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="text-primary hover:underline">← Back to Dashboard</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
