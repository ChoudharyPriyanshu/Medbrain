import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye, EyeOff, Loader2, Lock, Mail, User,
  Calendar, UserCheck, Phone, HeartPulse, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
    mobile: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) signup(formData);
  };

  const Field = ({ id, label, icon: Icon, children }) => (
    <div>
      <label className="med-label" htmlFor={id}>{label}</label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon
            size={16}
            style={{
              position: "absolute",
              left: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-med-slate-400)",
              zIndex: 1,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );

  const inputStyle = { paddingLeft: "2.5rem" };

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
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Logo */}
          <div style={{ marginBottom: "2rem" }}>
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
              Create account
            </h1>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-med-slate-500)" }}>
              Start your health journey with MedBrain
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Field id="fullName" label="Full Name" icon={User}>
              <input
                id="fullName"
                type="text"
                className="med-input"
                style={inputStyle}
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </Field>

            <Field id="email" label="Email address" icon={Mail}>
              <input
                id="email"
                type="email"
                className="med-input"
                style={inputStyle}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Field>

            <Field id="password" label="Password" icon={Lock}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="med-input"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                placeholder="Min. 6 characters"
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
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Field id="age" label="Age" icon={Calendar}>
                <input
                  id="age"
                  type="number"
                  className="med-input"
                  style={inputStyle}
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </Field>

              <div>
                <label className="med-label" htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  className="med-select"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <Field id="mobile" label="Mobile Number" icon={Phone}>
              <input
                id="mobile"
                type="text"
                className="med-input"
                style={inputStyle}
                placeholder="+91 9999999999"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </Field>

            <button
              type="submit"
              className="btn-med-primary"
              disabled={isSigningUp}
              style={{ padding: "0.75rem", fontSize: "0.9375rem", marginTop: "0.5rem" }}
            >
              {isSigningUp ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "var(--color-med-blue-600)", fontWeight: 600, textDecoration: "none" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Illustration Panel */}
      <div
        className="hidden lg:flex"
        style={{
          background: "linear-gradient(145deg, var(--color-med-teal-700) 0%, var(--color-med-blue-700) 60%, var(--color-med-blue-900) 100%)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", top: "-100px", right: "-100px" }} />
        <div style={{ position: "absolute", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-70px", left: "-70px" }} />
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
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Join MedBrain
          </h2>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, opacity: 0.8, maxWidth: "280px", margin: "0 auto 2rem" }}>
            Take control of your health with AI-powered tools designed for modern healthcare.
          </p>
          {["✅ Free to get started", "🤖 AI health assistant", "📱 Mobile-friendly"].map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
