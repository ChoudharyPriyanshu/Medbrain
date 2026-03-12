import React, { useState } from "react";
import { Upload, X, Brain, CheckCircle } from "lucide-react";

function ImageUploadComponent() {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/png") {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Only PNG files are allowed!");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "image/png") {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Only PNG files are allowed!");
    }
  };

  const handleSubmit = () => {
    if (image) {
      alert("Image submitted!");
    } else {
      alert("Please upload an image first!");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.625rem",
              background: "linear-gradient(135deg, #7c3aed, var(--color-med-blue-600))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Brain size={18} color="white" />
          </div>
          <div>
            <h1 className="page-title">AI Diagnosis</h1>
            <p className="page-subtitle">Upload a medical image for AI-powered analysis</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "1.5rem 1.75rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {/* Upload Zone */}
          <div
            style={{
              width: "100%",
              padding: "3rem 2rem",
              border: dragActive
                ? "2px dashed var(--color-med-blue-500)"
                : "2px dashed var(--color-med-slate-300)",
              borderRadius: "1rem",
              background: dragActive
                ? "var(--color-med-blue-50)"
                : "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
              transition: "all 200ms",
              boxShadow: "var(--shadow-card)",
            }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/png"
              onChange={handleImageUpload}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                cursor: "pointer",
                zIndex: 1,
              }}
            />

            {image ? (
              <div style={{ textAlign: "center", position: "relative" }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setImage(null); }}
                  style={{
                    position: "absolute",
                    top: "-0.5rem",
                    right: "-0.5rem",
                    width: "1.75rem",
                    height: "1.75rem",
                    borderRadius: "50%",
                    background: "#ef4444",
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                >
                  <X size={12} color="white" />
                </button>
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "cover",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  }}
                />
                <div className="flex items-center gap-1.5" style={{ marginTop: "1rem", justifyContent: "center" }}>
                  <CheckCircle size={14} color="#16a34a" />
                  <p style={{ fontSize: "0.875rem", color: "#16a34a", fontWeight: 600 }}>
                    Image ready for analysis
                  </p>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-400)", marginTop: "0.375rem" }}>
                  Click or drag to replace
                </p>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "1rem",
                    background: "var(--color-med-blue-50)",
                    border: "1px solid var(--color-med-blue-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  <Upload size={24} color="var(--color-med-blue-500)" />
                </div>
                <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-med-slate-700)", marginBottom: "0.5rem" }}>
                  Drop your image here
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--color-med-slate-400)", marginBottom: "1rem" }}>
                  or click anywhere to browse your files
                </p>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    background: "var(--color-med-slate-100)",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-med-slate-500)",
                  }}
                >
                  PNG files only
                </span>
              </div>
            )}
          </div>

          {/* Info card */}
          <div
            className="med-card"
            style={{
              width: "100%",
              padding: "1.25rem",
              background: "linear-gradient(135deg, var(--color-med-blue-50), var(--color-med-teal-50))",
              border: "1px solid var(--color-med-blue-100)",
            }}
          >
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-med-blue-700)", marginBottom: "0.375rem" }}>
              ℹ️ How it works
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-med-slate-500)", lineHeight: 1.6 }}>
              Upload a PNG medical image (X-ray, scan, etc.) and our AI will analyze it to provide preliminary insights.
              Always consult a healthcare professional for definitive diagnosis.
            </p>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="btn-med-primary"
            disabled={!image}
            style={{
              padding: "0.875rem 3rem",
              fontSize: "1rem",
              opacity: image ? 1 : 0.5,
            }}
          >
            <Brain size={18} />
            Analyze Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadComponent;
