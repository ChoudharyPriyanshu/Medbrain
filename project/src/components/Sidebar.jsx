import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    Home,
    User,
    Bot,
    Stethoscope,
    Brain,
    Settings,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: Home, to: "/" },
    { label: "AI Assistant", icon: Bot, to: "/bot" },
    { label: "Quick Checkup", icon: Stethoscope, to: "/quiz" },
    { label: "Diagnose", icon: Brain, to: "/diagnos" },
    { label: "Profile", icon: User, to: "/profile" },
    { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside
            style={{
                width: collapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
                minHeight: "100vh",
                background: "white",
                borderRight: "1px solid var(--color-med-slate-200)",
                boxShadow: "var(--shadow-sidebar)",
                transition: "width 250ms cubic-bezier(0.4,0,0.2,1)",
                display: "flex",
                flexDirection: "column",
                position: "sticky",
                top: 0,
                zIndex: 40,
                overflow: "hidden",
            }}
        >
            {/* Logo Row */}
            <div
                style={{
                    height: "var(--navbar-height)",
                    borderBottom: "1px solid var(--color-med-slate-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "space-between",
                    padding: collapsed ? "0 0.75rem" : "0 1rem",
                    flexShrink: 0,
                }}
            >
                {!collapsed && (
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
                            <ClipboardList size={14} color="white" />
                        </div>
                        <span
                            style={{
                                fontWeight: 700,
                                fontSize: "1.0625rem",
                                color: "var(--color-med-slate-800)",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Med<span style={{ color: "var(--color-med-blue-600)" }}>Brain</span>
                        </span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="btn-icon"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 p-2 flex-1 pt-3">
                {!collapsed && (
                    <p className="section-header" style={{ fontSize: "0.7rem", paddingLeft: "0.5rem" }}>
                        MENU
                    </p>
                )}
                {navItems.map(({ label, icon: Icon, to }) => {
                    const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={`sidebar-link ${isActive ? "active" : ""}`}
                            title={collapsed ? label : ""}
                            style={collapsed ? { justifyContent: "center", padding: "0.625rem" } : {}}
                        >
                            <Icon
                                size={18}
                                style={{
                                    flexShrink: 0,
                                    color: isActive ? "var(--color-med-blue-600)" : "inherit",
                                }}
                            />
                            {!collapsed && <span>{label}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div
                    style={{
                        padding: "1rem",
                        borderTop: "1px solid var(--color-med-slate-200)",
                    }}
                >
                    <div
                        style={{
                            background: "linear-gradient(135deg, var(--color-med-blue-50), var(--color-med-teal-50))",
                            borderRadius: "0.625rem",
                            padding: "0.875rem",
                            border: "1px solid var(--color-med-blue-100)",
                        }}
                    >
                        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-med-blue-700)", marginBottom: "0.25rem" }}>
                            MedBrain v1.0
                        </p>
                        <p style={{ fontSize: "0.7rem", color: "var(--color-med-slate-500)" }}>
                            Your AI Health Companion
                        </p>
                    </div>
                </div>
            )}
        </aside>
    );
}
