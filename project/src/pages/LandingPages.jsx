import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import {
  ClipboardDocumentListIcon,
  BoltIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, HeartPulse } from "lucide-react";

const features = [
  {
    title: "Smart Records",
    description:
      "Securely store and access your complete medical history anytime, anywhere.",
    Icon: ClipboardDocumentListIcon,
    gradient: "linear-gradient(135deg, var(--color-med-blue-500), var(--color-med-blue-700))",
    bg: "var(--color-med-blue-50)",
    badge: "Records",
  },
  {
    title: "AI Companion",
    description:
      "Get instant health information and guidance powered by advanced AI.",
    Icon: BoltIcon,
    gradient: "linear-gradient(135deg, var(--color-med-teal-500), var(--color-med-teal-700))",
    bg: "var(--color-med-teal-50)",
    badge: "AI Powered",
  },
  {
    title: "Health Insights",
    description:
      "AI-powered preliminary health analysis and personalized wellness guidance.",
    Icon: BeakerIcon,
    gradient: "linear-gradient(135deg, #7c3aed, var(--color-med-blue-600))",
    bg: "#faf5ff",
    badge: "Analytics",
  },
];

function FeatureCard({ title, description, Icon, gradient, bg, badge, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: "white",
        borderRadius: "1rem",
        padding: "2rem 1.5rem",
        border: "1px solid var(--color-med-slate-200)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1rem",
        cursor: "default",
        transition: "box-shadow 250ms",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.12)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)")
      }
    >
      <div
        style={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "0.875rem",
          background: gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(37,99,235,0.2)",
        }}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-med-blue-600)",
            background: "var(--color-med-blue-50)",
            borderRadius: "9999px",
            padding: "0.15rem 0.6rem",
            marginBottom: "0.5rem",
          }}
        >
          {badge}
        </span>
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--color-med-slate-800)",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--color-med-slate-500)", lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #eff6ff 0%, #f0fdfa 40%, #faf5ff 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav Bar */}
      <nav
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-med-slate-200)",
          padding: "0 2rem",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="flex items-center gap-2">
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
            <HeartPulse size={14} color="white" />
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.125rem",
              color: "var(--color-med-slate-800)",
              letterSpacing: "-0.02em",
            }}
          >
            Med<span style={{ color: "var(--color-med-blue-600)" }}>Brain</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="btn-med-secondary"
            style={{ fontSize: "0.875rem" }}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="btn-med-primary"
            style={{ fontSize: "0.875rem" }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 1.5rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: "640px" }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-med-blue-50)",
              border: "1px solid var(--color-med-blue-200)",
              borderRadius: "9999px",
              padding: "0.375rem 1rem",
              marginBottom: "1.5rem",
            }}
          >
            <Zap size={13} color="var(--color-med-blue-600)" />
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-med-blue-700)",
              }}
            >
              AI-Powered Healthcare Platform
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--color-med-slate-900)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            Your Smart{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-med-blue-600), var(--color-med-teal-500))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Health Partner
            </span>
          </h1>

          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 500,
              color: "var(--color-med-teal-600)",
              marginBottom: "1.5rem",
              minHeight: "2rem",
            }}
          >
            <Typewriter
              options={{
                strings: [
                  "AI-Powered Medical Assistance",
                  "Smart Prescription Management",
                  "Intelligent Health Insights",
                  "Your Digital Health Companion",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-med-slate-500)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
            }}
          >
            MedBrain combines AI and medical expertise to help you manage
            prescriptions, get instant health insights, and stay on top of
            your wellness.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="btn-med-primary"
              style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}
            >
              Start for Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="btn-med-secondary"
              style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}
            >
              Sign In
            </button>
          </div>

          {/* Trust indicators */}
          <div
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{ marginTop: "2rem" }}
          >
            {["🔒 Secure & Private", "⚡ AI-Powered", "💊 Smart Records"].map(
              (item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-med-slate-500)",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            maxWidth: "900px",
            width: "100%",
            marginTop: "4rem",
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--color-med-slate-200)",
          padding: "1.25rem 2rem",
          textAlign: "center",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-400)" }}>
          © 2025 MedBrain. All rights reserved. Built with ❤️ for better healthcare.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;