import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { Search, ChevronLeft, ChevronRight, ExternalLink, FileText, Calendar, User, Hospital } from "lucide-react";

function RecordCard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 8;
  const navigate = useNavigate();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authUser) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get(`/auth/prescriptions`);
        setRecords(response.data);
      } catch (err) {
        setError("Failed to fetch records");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
    const interval = setInterval(fetchRecords, 10000);
    return () => clearInterval(interval);
  }, [authUser]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="med-card" style={{ padding: "3rem", textAlign: "center" }}>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            border: "3px solid var(--color-med-blue-200)",
            borderTopColor: "var(--color-med-blue-600)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto",
          }}
        />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="med-card" style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>
          You are not logged in. Please log in to view your prescriptions.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="med-card" style={{ padding: "3rem", textAlign: "center" }}>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            border: "3px solid var(--color-med-blue-200)",
            borderTopColor: "var(--color-med-blue-600)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 1rem",
          }}
        />
        <p style={{ fontSize: "0.875rem", color: "var(--color-med-slate-400)" }}>
          Loading your records…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="med-card" style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>{error}</p>
      </div>
    );
  }

  // Sort newest first
  const sorted = [...records].reverse();
  const filtered = sorted.filter(
    (r) =>
      r.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
      r.hospitalName?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  if (records.length === 0) {
    return (
      <div
        className="med-card"
        style={{
          padding: "3rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "0.875rem",
            background: "var(--color-med-slate-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FileText size={24} color="var(--color-med-slate-400)" />
        </div>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--color-med-slate-600)",
          }}
        >
          No prescriptions yet
        </p>
        <p style={{ fontSize: "0.875rem", color: "var(--color-med-slate-400)" }}>
          Click "New Prescription" to add your first medical record.
        </p>
      </div>
    );
  }

  return (
    <div className="med-card animate-fade-in">
      {/* Search & Count */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--color-med-slate-200)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-med-slate-400)",
            }}
          />
          <input
            type="text"
            placeholder="Search by doctor or hospital…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="med-input"
            style={{ paddingLeft: "2.25rem", fontSize: "0.8125rem" }}
          />
        </div>
        <span
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-med-slate-500)",
            whiteSpace: "nowrap",
          }}
        >
          {filtered.length} record{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="med-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Hospital</th>
              <th>Date</th>
              <th>Documents</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--color-med-slate-400)" }}>
                  No records match your search.
                </td>
              </tr>
            ) : (
              paginated.map((record) => {
                const { doctorName, hospitalName, date, _id, documentUpload } = record;
                return (
                  <tr
                    key={_id}
                    onClick={() => navigate(`/prescription/${_id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                            background: "var(--color-med-blue-100)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <User size={12} color="var(--color-med-blue-600)" />
                        </div>
                        <span style={{ fontWeight: 600, color: "var(--color-med-slate-800)" }}>
                          {doctorName || "—"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span style={{ color: "var(--color-med-slate-600)" }}>
                          {hospitalName || "—"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} color="var(--color-med-slate-400)" />
                        <span>
                          {date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                        </span>
                      </div>
                    </td>
                    <td>
                      {documentUpload && documentUpload.length > 0 ? (
                        <a
                          href={documentUpload[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="badge-blue"
                          style={{ textDecoration: "none" }}
                        >
                          <ExternalLink size={10} />
                          View Doc
                        </a>
                      ) : (
                        <span className="badge-orange">No Doc</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn-med-secondary"
                        style={{ fontSize: "0.75rem", padding: "0.375rem 0.75rem" }}
                        onClick={(e) => { e.stopPropagation(); navigate(`/prescription/${_id}`); }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            padding: "0.875rem 1.25rem",
            borderTop: "1px solid var(--color-med-slate-200)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)" }}>
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              className="btn-icon"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              style={{ opacity: page === 1 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: p === page ? "var(--color-med-blue-600)" : "transparent",
                  color: p === page ? "white" : "var(--color-med-slate-600)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
              >
                {p}
              </button>
            ))}
            <button
              className="btn-icon"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              style={{ opacity: page === totalPages ? 0.4 : 1 }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Add spin keyframe
const style = document.createElement("style");
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);

export default RecordCard;
