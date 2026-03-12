import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  Bell,
  User,
  ChevronDown,
  ClipboardList,
  Settings,
} from "lucide-react";

function Navigation() {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = authUser?.fullName
    ? authUser.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <header
      style={{
        height: "var(--navbar-height)",
        background: "white",
        borderBottom: "1px solid var(--color-med-slate-200)",
        boxShadow: "var(--shadow-navbar)",
        display: "flex",
        alignItems: "center",
        padding: "0 1.25rem",
        gap: "1rem",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Mobile Logo (hidden on large screens where sidebar shows it) */}
      <Link
        to="/"
        className="flex items-center gap-2 lg:hidden"
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            width: "2rem",
            height: "2rem",
            background: "linear-gradient(135deg, var(--color-med-blue-600), var(--color-med-teal-500))",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClipboardList size={14} color="white" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-med-slate-800)" }}>
          Med<span style={{ color: "var(--color-med-blue-600)" }}>Brain</span>
        </span>
      </Link>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right section */}
      <div className="flex items-center gap-2">
        {authUser ? (
          <>
            {/* Notifications */}
            <button
              className="btn-icon relative"
              title="Notifications"
              onClick={() => { }}
            >
              <Bell size={18} />
              <span
                style={{
                  position: "absolute",
                  top: "0.375rem",
                  right: "0.375rem",
                  width: "0.5rem",
                  height: "0.5rem",
                  background: "var(--color-med-blue-500)",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            </button>

            {/* Profile Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.375rem 0.625rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-med-slate-100)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "2.125rem",
                    height: "2.125rem",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-med-blue-500), var(--color-med-teal-500))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-med-slate-700)", lineHeight: "1.2" }}>
                    {authUser.fullName || "User"}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "var(--color-med-slate-400)", lineHeight: "1.2" }}>
                    Patient
                  </span>
                </div>
                <ChevronDown
                  size={14}
                  style={{
                    color: "var(--color-med-slate-400)",
                    transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms",
                  }}
                />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 0.5rem)",
                    background: "white",
                    borderRadius: "0.75rem",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid var(--color-med-slate-200)",
                    minWidth: "11rem",
                    zIndex: 100,
                    overflow: "hidden",
                    animation: "fadeInUp 0.2s ease",
                  }}
                >
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-med-slate-100)" }}>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-med-slate-700)" }}>
                      {authUser.fullName}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-med-slate-400)" }}>
                      {authUser.email}
                    </p>
                  </div>
                  <div style={{ padding: "0.5rem" }}>
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/profile"); }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: "var(--color-med-slate-600)",
                        fontWeight: 500,
                        transition: "background 150ms",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-med-slate-100)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <User size={15} />
                      My Profile
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/settings"); }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: "var(--color-med-slate-600)",
                        fontWeight: 500,
                        transition: "background 150ms",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-med-slate-100)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Settings size={15} />
                      Settings
                    </button>
                    <div style={{ height: "1px", background: "var(--color-med-slate-100)", margin: "0.375rem 0" }} />
                    <button
                      onClick={() => { setProfileOpen(false); logout(); }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: "#ef4444",
                        fontWeight: 500,
                        transition: "background 150ms",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn-med-secondary"
              style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn-med-primary"
              style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      {/* Close dropdown on outside click */}
      {profileOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 99 }}
          onClick={() => setProfileOpen(false)}
        />
      )}
    </header>
  );
}

export default Navigation;
