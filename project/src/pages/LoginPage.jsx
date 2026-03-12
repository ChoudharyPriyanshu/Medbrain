import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, HeartPulse, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "white",
      }}
      className="max-lg:grid-cols-1"
    >
      {/* Left — Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "var(--color-med-slate-50)",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* Logo */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div className="flex items-center gap-2" style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  background: "linear-gradient(135deg, var(--color-med-blue-600), var(--color-med-teal-500))",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HeartPulse size={16} color="white" />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "var(--color-med-slate-800)",
                  letterSpacing: "-0.02em",
                }}
              >
                Med<span style={{ color: "var(--color-med-blue-600)" }}>Brain</span>
              </span>
            </div>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--color-med-slate-800)",
                letterSpacing: "-0.02em",
                marginBottom: "0.375rem",
              }}
            >
              Welcome back
            </h1>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-med-slate-500)" }}>
              Sign in to access your health dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Email */}
            <div>
              <label className="med-label" htmlFor="email">Email address</label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-med-slate-400)",
                  }}
                />
                <input
                  id="email"
                  type="email"
                  className="med-input pl-10"
                  placeholder="you@example.com"
                  style={{ paddingLeft: "2.5rem" }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="med-label" htmlFor="password">Password</label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-med-slate-400)",
                  }}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="med-input pl-10"
                  placeholder="••••••••"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-med-slate-400)",
                    padding: 0,
                    display: "flex",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-med-primary"
              disabled={isLoggingIn}
              style={{ padding: "0.75rem", fontSize: "0.9375rem", marginTop: "0.5rem" }}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontSize: "0.875rem",
              color: "var(--color-med-slate-500)",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "var(--color-med-blue-600)", fontWeight: 600, textDecoration: "none" }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Medical Illustration Panel */}
      <div
        className="hidden lg:flex"
        style={{
          background: "linear-gradient(145deg, var(--color-med-blue-700) 0%, var(--color-med-teal-600) 50%, var(--color-med-blue-800) 100%)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            top: "-80px",
            right: "-80px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            bottom: "-60px",
            left: "-60px",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white" }}>
          <div
            style={{
              width: "6rem",
              height: "6rem",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <HeartPulse size={40} color="white" />
          </div>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Your Health, <br />Our Priority
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              opacity: 0.8,
              maxWidth: "280px",
              margin: "0 auto 2rem",
            }}
          >
            Access your prescriptions, chat with AI, and manage your health
            all in one secure platform.
          </p>
          {/* Feature pills */}
          {["🔒 End-to-end encrypted", "🤖 AI-powered insights", "📋 Smart records"].map(
            (item) => (
              <div
                key={item}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "9999px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  margin: "0.25rem",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
