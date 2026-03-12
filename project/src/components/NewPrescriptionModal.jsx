import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import PrescriptionForm from "./PrescriptionForm";
import { X, FilePlus, QrCode, ChevronRight } from "lucide-react";

function NewPrescriptionModal({ isOpen, onClose }) {
  const [showForm, setShowForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const qrCodeCanvasRef = useRef(null);

  useEffect(() => {
    if (qrCodeData && qrCodeCanvasRef.current) {
      QRCode.toCanvas(qrCodeCanvasRef.current, qrCodeData, (error) => {
        if (error) console.error("Error generating QR code:", error);
      });
    }
  }, [qrCodeData]);

  if (!isOpen) return null;

  const generateQRCode = () => {
    const prescriptionId = "prescription-" + Math.random().toString(36).substr(2, 9);
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfHCYq-sVvprhYCAL1h0h56uIx9b8CD75K1adgCJnzLANfcsw/viewform?prescriptionId=${prescriptionId}`;
    setQrCodeData(formUrl);
    setShowQRCode(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) { setShowForm(false); setShowQRCode(false); onClose(); } }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: showForm ? "56rem" : "28rem",
          maxHeight: "92vh",
          overflowY: "auto",
          transition: "max-width 300ms ease",
        }}
      >
        {!showForm ? (
          <>
            {/* Header */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--color-med-slate-200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2 style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--color-med-slate-800)" }}>
                  New Prescription
                </h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)", marginTop: "0.125rem" }}>
                  Choose how to add your prescription
                </p>
              </div>
              <button
                onClick={() => { setShowQRCode(false); onClose(); }}
                className="btn-icon"
              >
                <X size={18} />
              </button>
            </div>

            {/* Options */}
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Manual Entry */}
              <button
                onClick={() => setShowForm(true)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.125rem",
                  borderRadius: "0.75rem",
                  border: "1.5px solid var(--color-med-blue-200)",
                  background: "linear-gradient(135deg, var(--color-med-blue-50), #eff6ff)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--color-med-blue-400)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--color-med-blue-200)"}
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
                  <FilePlus size={18} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-med-slate-800)" }}>
                    Enter Manually
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)", marginTop: "0.125rem" }}>
                    Fill in prescription details yourself
                  </p>
                </div>
                <ChevronRight size={16} color="var(--color-med-slate-400)" />
              </button>

              {/* QR Code */}
              <button
                onClick={generateQRCode}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.125rem",
                  borderRadius: "0.75rem",
                  border: "1.5px solid var(--color-med-teal-200)",
                  background: "linear-gradient(135deg, var(--color-med-teal-50), #f0fdfa)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--color-med-teal-400)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--color-med-teal-200)"}
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
                  <QrCode size={18} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-med-slate-800)" }}>
                    Generate via PA
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)", marginTop: "0.125rem" }}>
                    Scan QR code to fill via Google Form
                  </p>
                </div>
                <ChevronRight size={16} color="var(--color-med-slate-400)" />
              </button>

              {/* QR Code Display */}
              {showQRCode && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    padding: "1.25rem",
                    background: "var(--color-med-slate-50)",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--color-med-slate-200)",
                    textAlign: "center",
                    animation: "fadeInUp 0.3s ease",
                  }}
                >
                  <p style={{ fontWeight: 600, color: "var(--color-med-slate-700)", marginBottom: "0.75rem" }}>
                    Scan to fill out the form
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <canvas ref={qrCodeCanvasRef} style={{ borderRadius: "0.5rem" }} />
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-med-slate-400)", marginTop: "0.75rem" }}>
                    The QR code links to the prescription form
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid var(--color-med-slate-200)",
                textAlign: "right",
              }}
            >
              <button
                onClick={() => { setShowQRCode(false); onClose(); }}
                className="btn-med-secondary"
                style={{ fontSize: "0.875rem" }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <PrescriptionForm
            onClose={() => {
              setShowForm(false);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default NewPrescriptionModal;
