import { Settings, Bell, Shield, Moon, Monitor, Palette, Info } from "lucide-react";

const SettingsPage = () => {
  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.625rem",
              background: "linear-gradient(135deg, var(--color-med-slate-600), var(--color-med-slate-800))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Settings size={18} color="white" />
          </div>
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your account preferences</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "48rem" }}>

        {/* Appearance */}
        <div className="med-card animate-fade-in-up">
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-med-slate-200)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <Palette size={18} color="var(--color-med-blue-600)" />
            <h2 style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-med-slate-800)" }}>Appearance</h2>
          </div>
          <div style={{ padding: "1.25rem" }}>
            <p style={{ fontSize: "0.875rem", color: "var(--color-med-slate-500)", marginBottom: "1rem" }}>
              The interface uses a clean medical theme with blue and teal colors designed for healthcare professionals.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {[
                { label: "Medical Blue", color: "var(--color-med-blue-600)" },
                { label: "Medical Teal", color: "var(--color-med-teal-600)" },
                { label: "Slate Gray", color: "var(--color-med-slate-600)" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <div style={{ width: "1.25rem", height: "1.25rem", borderRadius: "0.375rem", background: color }} />
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="med-card animate-fade-in-up">
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-med-slate-200)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <Bell size={18} color="var(--color-med-blue-600)" />
            <h2 style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-med-slate-800)" }}>Notifications</h2>
          </div>
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Prescription Reminders", desc: "Get notified about upcoming prescription refills" },
              { label: "Health Tips", desc: "Weekly health and wellness tips" },
              { label: "System Updates", desc: "Important platform notifications" },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-med-slate-700)" }}>{label}</p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-400)" }}>{desc}</p>
                </div>
                <div
                  style={{
                    width: "3rem",
                    height: "1.5rem",
                    borderRadius: "9999px",
                    background: "var(--color-med-blue-500)",
                    position: "relative",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "0.2rem",
                      top: "0.2rem",
                      width: "1.1rem",
                      height: "1.1rem",
                      borderRadius: "50%",
                      background: "white",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="med-card animate-fade-in-up">
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-med-slate-200)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <Shield size={18} color="var(--color-med-blue-600)" />
            <h2 style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-med-slate-800)" }}>Privacy & Security</h2>
          </div>
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button className="btn-med-secondary" style={{ alignSelf: "flex-start" }}>Change Password</button>
            <button className="btn-med-secondary" style={{ alignSelf: "flex-start" }}>Download My Data</button>
            <button className="btn-med-danger" style={{ alignSelf: "flex-start" }}>Delete Account</button>
          </div>
        </div>

        {/* About */}
        <div className="med-card animate-fade-in-up">
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-med-slate-200)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <Info size={18} color="var(--color-med-blue-600)" />
            <h2 style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-med-slate-800)" }}>About MedBrain</h2>
          </div>
          <div style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[["Version", "1.0.0"], ["Platform", "Web Application"], ["Built with", "React + Node.js + MongoDB"]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between" style={{ fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--color-med-slate-500)" }}>{k}</span>
                  <span style={{ color: "var(--color-med-slate-700)", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
