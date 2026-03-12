import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { useAuthStore } from "../store/useAuthStore";

// Routes that don't use the dashboard layout
const NO_LAYOUT_ROUTES = ["/login", "/signup", "/getstarted"];

function Layout({ children }) {
  const location = useLocation();
  const { authUser } = useAuthStore();

  const isPublicRoute = NO_LAYOUT_ROUTES.includes(location.pathname);

  // For public routes (landing, login, signup), render without sidebar
  if (isPublicRoute || !authUser) {
    return <div style={{ minHeight: "100vh" }}>{children}</div>;
  }

  // Authenticated dashboard layout
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-med-slate-50)" }}>
      {/* Sidebar — hidden on mobile, shown on lg+ */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Navbar */}
        <Navigation />

        {/* Page Content */}
        <main style={{ flex: 1, overflow: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;