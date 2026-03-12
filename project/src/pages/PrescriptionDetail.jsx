import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Pill,
  MapPin,
  ExternalLink,
  FileText,
  User,
  Building2,
  Calendar,
} from "lucide-react";

function PrescriptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [30, 46],
    iconAnchor: [15, 46],
    popupAnchor: [0, -46],
    shadowUrl: markerShadowUrl,
    shadowSize: [50, 50],
  });

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axiosInstance.get(`/auth/prescriptions/${id}`);
        setPrescription(response.data);
      } catch (err) {
        setError("Failed to fetch prescription details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrescription();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: "1rem" }}>
        <Loader2 size={32} style={{ animation: "spin 0.8s linear infinite", color: "var(--color-med-blue-500)" }} />
        <p style={{ color: "var(--color-med-slate-500)", fontSize: "0.9375rem" }}>Loading prescription…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: "1rem" }}>
        <AlertCircle size={40} color="#ef4444" />
        <p style={{ color: "#ef4444", fontWeight: 600 }}>{error}</p>
        <button className="btn-med-secondary" onClick={() => navigate("/")}><ArrowLeft size={15} /> Back to Dashboard</button>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <p style={{ color: "var(--color-med-slate-500)" }}>No prescription found.</p>
      </div>
    );
  }

  const { doctorName, hospitalName, date, medicines, documentUpload, location } = prescription;
  const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;

  return (
    <div style={{ padding: "0" }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-3">
          <button
            className="btn-icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="page-title">Prescription Details</h1>
            <p className="page-subtitle">{new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>
        {documentUpload && documentUpload.length > 0 && (
          <a
            href={documentUpload[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-med-primary"
            style={{ textDecoration: "none" }}
          >
            <ExternalLink size={15} />
            View Document
          </a>
        )}
      </div>

      <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Patient / Doctor Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          <div className="med-card animate-fade-in-up" style={{ padding: "1.25rem" }}>
            <div className="flex items-center gap-3">
              <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.625rem", background: "var(--color-med-blue-100)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <User size={18} color="var(--color-med-blue-600)" />
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-med-slate-400)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Doctor</p>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-med-slate-800)" }}>{doctorName || "—"}</p>
              </div>
            </div>
          </div>
          <div className="med-card animate-fade-in-up" style={{ padding: "1.25rem" }}>
            <div className="flex items-center gap-3">
              <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.625rem", background: "var(--color-med-teal-100)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Building2 size={18} color="var(--color-med-teal-600)" />
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-med-slate-400)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Hospital</p>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-med-slate-800)" }}>{hospitalName || "—"}</p>
              </div>
            </div>
          </div>
          <div className="med-card animate-fade-in-up" style={{ padding: "1.25rem" }}>
            <div className="flex items-center gap-3">
              <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.625rem", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Calendar size={18} color="#d97706" />
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-med-slate-400)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</p>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-med-slate-800)" }}>{new Date(date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medicines Table */}
        <div className="med-card animate-fade-in-up">
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--color-med-slate-200)",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <Pill size={18} color="var(--color-med-blue-600)" />
            <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-med-slate-800)" }}>
              Medicines
            </h2>
            <span className="badge-blue" style={{ marginLeft: "auto" }}>
              {medicines?.length || 0} item{medicines?.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="med-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Timing / Duration</th>
                </tr>
              </thead>
              <tbody>
                {medicines && medicines.length > 0 ? (
                  medicines.map((med, index) => (
                    <tr key={index}>
                      <td>
                        <span
                          style={{
                            width: "1.75rem",
                            height: "1.75rem",
                            borderRadius: "50%",
                            background: "var(--color-med-blue-100)",
                            color: "var(--color-med-blue-700)",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Pill size={14} color="var(--color-med-teal-500)" />
                          <span style={{ fontWeight: 600, color: "var(--color-med-slate-800)" }}>
                            {med.name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge-teal">{med.dosage}</span>
                      </td>
                      <td style={{ color: "var(--color-med-slate-600)" }}>
                        {med.timing}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "var(--color-med-slate-400)" }}>
                      No medicines listed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Files */}
        {documentUpload && documentUpload.length > 0 && (
          <div className="med-card animate-fade-in-up">
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-med-slate-200)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <FileText size={18} color="var(--color-med-blue-600)" />
              <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-med-slate-800)" }}>Prescription Files</h2>
            </div>
            <div style={{ padding: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {documentUpload.map((file, index) => (
                <a
                  key={index}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-med-secondary"
                  style={{ textDecoration: "none", fontSize: "0.875rem" }}
                >
                  <ExternalLink size={14} />
                  Document {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="med-card animate-fade-in-up">
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--color-med-slate-200)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.625rem" }}>
            <div className="flex items-center gap-2">
              <MapPin size={18} color="var(--color-med-blue-600)" />
              <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-med-slate-800)" }}>Hospital Location</h2>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-med-primary"
              style={{ textDecoration: "none", fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
            >
              <ExternalLink size={13} />
              Open in Maps
            </a>
          </div>
          <div style={{ borderRadius: "0 0 0.75rem 0.75rem", overflow: "hidden" }}>
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[location.lat, location.lng]} icon={defaultIcon}>
                <Popup>Location of {hospitalName}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PrescriptionDetail;
