import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useRef } from "react";
import { X, Plus, Trash2, Loader2 } from "lucide-react";

function PrescriptionForm({ onClose }) {
  const [formData, setFormData] = useState({
    doctorName: "",
    hospitalName: "",
    medicines: [{ name: "", dosage: "", timing: "" }],
    location: { lat: "", lng: "" },
    date: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index] = { ...newMedicines[index], [field]: value };
    setFormData((prev) => ({ ...prev, medicines: newMedicines }));
  };

  const handleAddMedicine = () => {
    setFormData((prev) => ({
      ...prev,
      medicines: [...prev.medicines, { name: "", dosage: "", timing: "" }],
    }));
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, medicines: newMedicines }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { doctorName, hospitalName, medicines, location, date } = formData;
    if (
      !doctorName || !hospitalName || !date || !location.lat || !location.lng ||
      medicines.some((med) => !med.name || !med.dosage || !med.timing)
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const formDataPayload = new FormData();
      formDataPayload.append("doctorName", doctorName);
      formDataPayload.append("hospitalName", hospitalName);
      formDataPayload.append("date", new Date(date).toISOString());
      formDataPayload.append("location", JSON.stringify(location));
      formDataPayload.append("medicines", JSON.stringify(medicines));
      if (imagePreview) {
        formDataPayload.append("documentUpload", imagePreview);
      }
      await axiosInstance.post("/auth/prescriptions", formDataPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Prescription created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Failed to create prescription.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    borderRadius: "0.5rem",
    border: "1.5px solid var(--color-med-slate-200)",
    background: "white",
    color: "var(--color-med-slate-800)",
    outline: "none",
    fontFamily: "inherit",
  };
  const labelStyle = {
    display: "block",
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--color-med-slate-600)",
    marginBottom: "0.375rem",
  };

  return (
    <div>
      {/* Modal Header */}
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
            Fill in the prescription details below
          </p>
        </div>
        <button className="btn-icon" onClick={onClose} type="button">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Doctor & Hospital */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Doctor Name *</label>
              <input
                type="text"
                required
                style={inputStyle}
                placeholder="Dr. John Doe"
                value={formData.doctorName}
                onChange={(e) => setFormData((prev) => ({ ...prev, doctorName: e.target.value }))}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-med-blue-400)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-med-slate-200)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={labelStyle}>Hospital Name *</label>
              <input
                type="text"
                required
                style={inputStyle}
                placeholder="City Hospital"
                value={formData.hospitalName}
                onChange={(e) => setFormData((prev) => ({ ...prev, hospitalName: e.target.value }))}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-med-blue-400)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-med-slate-200)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label style={labelStyle}>Visit Date *</label>
            <input
              type="date"
              required
              style={{ ...inputStyle, maxWidth: "250px" }}
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-med-blue-400)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-med-slate-200)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>

          {/* Location */}
          <div>
            <label style={labelStyle}>Location (auto-detected)</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <input
                type="text"
                placeholder="Latitude"
                value={formData.location.lat}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: { ...prev.location, lat: e.target.value } }))}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Longitude"
                value={formData.location.lng}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: { ...prev.location, lng: e.target.value } }))}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Medicines */}
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: "0.75rem" }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Medicines *</label>
              <button
                type="button"
                onClick={handleAddMedicine}
                className="btn-med-secondary"
                style={{ fontSize: "0.8125rem", padding: "0.375rem 0.75rem" }}
              >
                <Plus size={14} />
                Add Medicine
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {formData.medicines.map((medicine, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0.875rem",
                    background: "var(--color-med-slate-50)",
                    borderRadius: "0.625rem",
                    border: "1px solid var(--color-med-slate-200)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-med-slate-600)" }}>
                      Medicine #{index + 1}
                    </span>
                    {formData.medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(index)}
                        className="btn-icon"
                        style={{ color: "#ef4444", width: "1.75rem", height: "1.75rem" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "0.5rem" }}>
                    <input
                      type="text"
                      required
                      style={inputStyle}
                      placeholder="Medicine name"
                      value={medicine.name}
                      onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      required
                      style={inputStyle}
                      placeholder="Dosage (e.g., 500mg)"
                      value={medicine.dosage}
                      onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                    />
                    <input
                      type="text"
                      required
                      style={inputStyle}
                      placeholder="Timing (e.g., Twice daily)"
                      value={medicine.timing}
                      onChange={(e) => handleMedicineChange(index, "timing", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label style={labelStyle}>Prescription Document (optional)</label>
            <div
              style={{
                border: "1.5px dashed var(--color-med-slate-200)",
                borderRadius: "0.5rem",
                padding: "1rem",
                background: "var(--color-med-slate-50)",
              }}
            >
              {imagePreview ? (
                <div className="flex items-center gap-3">
                  <img src={imagePreview} alt="Preview" style={{ width: "3rem", height: "3rem", objectFit: "cover", borderRadius: "0.5rem" }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--color-med-slate-600)", flex: 1 }}>Image selected</span>
                  <button type="button" onClick={removeImage} className="btn-icon" style={{ color: "#ef4444" }}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ width: "100%", fontSize: "0.875rem", color: "var(--color-med-slate-600)" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--color-med-slate-200)",
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
          }}
        >
          <button type="button" onClick={onClose} className="btn-med-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-med-primary" disabled={submitting}>
            {submitting ? (
              <><Loader2 size={15} style={{ animation: "spin 0.8s linear infinite" }} /> Saving…</>
            ) : (
              "Create Prescription"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PrescriptionForm;
