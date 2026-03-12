import React, { useState } from "react";
import RecordCard from "../components/RecordCard";
import NewPrescriptionModal from "../components/NewPrescriptionModal";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  FilePlus,
  Bot,
  Stethoscope,
  ClipboardList,
  TrendingUp,
  Calendar,
  ChevronRight,
} from "lucide-react";

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="stat-card animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-med-slate-500)" }}>
            {label}
          </p>
          <p style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-med-slate-800)", marginTop: "0.25rem" }}>
            {value}
          </p>
        </div>
        <div
          className="stat-card-icon"
          style={{ background: bg }}
        >
          <Icon size={20} color={color} />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div style={{ padding: "0", minHeight: "100%" }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {greeting()}, {authUser?.fullName?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="page-subtitle">
            Here's an overview of your medical records and health tools.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-med-primary"
        >
          <FilePlus size={16} />
          New Prescription
        </button>
      </div>

      <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          <StatCard
            icon={ClipboardList}
            label="Total Prescriptions"
            value="—"
            color="var(--color-med-blue-600)"
            bg="var(--color-med-blue-100)"
          />
          <StatCard
            icon={Calendar}
            label="Last Visit"
            value="—"
            color="var(--color-med-teal-600)"
            bg="var(--color-med-teal-100)"
          />
          <StatCard
            icon={TrendingUp}
            label="Health Score"
            value="—"
            color="#16a34a"
            bg="#dcfce7"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-med-slate-500)",
              marginBottom: "0.75rem",
            }}
          >
            Quick Actions
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.875rem" }}>
            <button
              onClick={() => navigate("/bot")}
              className="med-card med-card-clickable animate-fade-in-up"
              style={{
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                textAlign: "left",
                background: "linear-gradient(135deg, #eff6ff, #f0fdfa)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "0.625rem",
                  background: "linear-gradient(135deg, var(--color-med-blue-500), var(--color-med-teal-500))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Bot size={20} color="white" />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "var(--color-med-slate-800)", fontSize: "0.9375rem" }}>
                  AI Assistant
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)", marginTop: "0.125rem" }}>
                  Ask health questions
                </p>
              </div>
              <ChevronRight size={16} style={{ marginLeft: "auto", color: "var(--color-med-slate-400)" }} />
            </button>

            <button
              onClick={() => navigate("/quiz")}
              className="med-card med-card-clickable animate-fade-in-up"
              style={{
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                textAlign: "left",
                background: "linear-gradient(135deg, #f0fdfa, #f0fdf4)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "0.625rem",
                  background: "linear-gradient(135deg, var(--color-med-teal-500), #16a34a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Stethoscope size={20} color="white" />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "var(--color-med-slate-800)", fontSize: "0.9375rem" }}>
                  Quick Checkup
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)", marginTop: "0.125rem" }}>
                  Symptom assessment
                </p>
              </div>
              <ChevronRight size={16} style={{ marginLeft: "auto", color: "var(--color-med-slate-400)" }} />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="med-card med-card-clickable animate-fade-in-up"
              style={{
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                textAlign: "left",
                background: "linear-gradient(135deg, #faf5ff, #eff6ff)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "0.625rem",
                  background: "linear-gradient(135deg, #7c3aed, var(--color-med-blue-600))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FilePlus size={20} color="white" />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "var(--color-med-slate-800)", fontSize: "0.9375rem" }}>
                  Add Prescription
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)", marginTop: "0.125rem" }}>
                  Log a new record
                </p>
              </div>
              <ChevronRight size={16} style={{ marginLeft: "auto", color: "var(--color-med-slate-400)" }} />
            </button>
          </div>
        </div>

        {/* Medical Records Table */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.875rem",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-med-slate-500)",
              }}
            >
              Recent Prescriptions
            </p>
            <button
              className="btn-med-secondary"
              style={{ fontSize: "0.8125rem", padding: "0.375rem 0.875rem" }}
              onClick={() => setIsModalOpen(true)}
            >
              <FilePlus size={13} />
              Add New
            </button>
          </div>
          <RecordCard />
        </div>
      </div>

      {/* Modal */}
      <NewPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Home;
