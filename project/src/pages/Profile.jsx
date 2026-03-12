import React, { useState, useEffect } from "react";
import {
  User, Mail, Phone, MapPin, Heart, Activity,
  UserPlus, Save, CheckCircle, ChevronDown, ChevronUp,
} from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Section = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="med-card animate-fade-in-up" style={{ overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          background: "none",
          border: "none",
          borderBottom: open ? "1px solid var(--color-med-slate-200)" : "none",
          cursor: "pointer",
          transition: "background 150ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-med-slate-50)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <div className="flex items-center gap-2">
          <Icon size={18} color="var(--color-med-blue-600)" />
          <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-med-slate-800)" }}>
            {title}
          </span>
        </div>
        {open ? <ChevronUp size={16} color="var(--color-med-slate-400)" /> : <ChevronDown size={16} color="var(--color-med-slate-400)" />}
      </button>
      {open && <div style={{ padding: "1.25rem" }}>{children}</div>}
    </div>
  );
};

const Field = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="med-label" htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="med-input"
    />
  </div>
);

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "", age: "", mobile: "", gender: "", email: "",
    dateOfBirth: "", height: "", weight: "", bloodType: "", phoneNumber: "",
    address: "", city: "", state: "", zipCode: "",
    emergencyContactName: "", emergencyContactRelationship: "", emergencyContactPhone: "",
    chronicDiseases: "", surgeries: "", allergies: "", currentMedications: "",
    familyHistory: "", smokingStatus: "", alcoholConsumption: "", physicalActivity: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/auth/check");
        const { fullName, age, mobile, gender, email } = response.data;
        setFormData((prev) => ({ ...prev, fullName, age, mobile, gender, email }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post("/auth/update-profile", formData)
      .then(() => {
        setSaved(true);
        toast.success("Profile updated successfully!");
        setTimeout(() => setSaved(false), 3000);
      })
      .catch(() => toast.error("Failed to update profile."));
  };

  const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" };
  const grid3 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: "linear-gradient(135deg, var(--color-med-blue-500), var(--color-med-teal-500))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={18} color="white" />
          </div>
          <div>
            <h1 className="page-title">Medical Profile</h1>
            <p className="page-subtitle">Manage your personal health information</p>
          </div>
        </div>
        <button
          type="submit"
          form="profile-form"
          className="btn-med-primary"
          style={saved ? { background: "linear-gradient(135deg, #16a34a, #0d9488)" } : {}}
        >
          {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Profile</>}
        </button>
      </div>

      <form id="profile-form" onSubmit={handleSubmit}>
        <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Basic Info */}
          <Section title="Basic Information" icon={User}>
            <div style={{ ...grid3, marginBottom: "1rem" }}>
              <div style={{ gridColumn: "span 2" }}>
                <Field label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Dr. John Doe" />
              </div>
              <div>
                <label className="med-label" htmlFor="gender">Gender</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="med-select">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div style={grid3}>
              <Field label="Age" name="age" type="number" value={formData.age} onChange={handleChange} placeholder="25" />
              <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              <Field label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
          </Section>

          {/* Physical Stats */}
          <Section title="Physical Stats" icon={Activity}>
            <div style={grid3}>
              <Field label="Height (cm)" name="height" type="number" value={formData.height} onChange={handleChange} placeholder="175" />
              <Field label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="70" />
              <div>
                <label className="med-label" htmlFor="bloodType">Blood Type</label>
                <select id="bloodType" name="bloodType" value={formData.bloodType} onChange={handleChange} className="med-select">
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </Section>

          {/* Contact */}
          <Section title="Contact Information" icon={Mail}>
            <div style={{ ...grid2, marginBottom: "1rem" }}>
              <Field label="Phone Number" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="+91 9999999999" />
              <Field label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main Street" />
            </div>
            <div style={grid3}>
              <Field label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Mumbai" />
              <Field label="State" name="state" value={formData.state} onChange={handleChange} placeholder="Maharashtra" />
              <Field label="ZIP Code" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="400001" />
            </div>
          </Section>

          {/* Emergency Contact */}
          <Section title="Emergency Contact" icon={UserPlus}>
            <div style={grid3}>
              <Field label="Name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} placeholder="Jane Doe" />
              <Field label="Relationship" name="emergencyContactRelationship" value={formData.emergencyContactRelationship} onChange={handleChange} placeholder="Spouse" />
              <Field label="Phone" name="emergencyContactPhone" type="tel" value={formData.emergencyContactPhone} onChange={handleChange} placeholder="+91 9999999999" />
            </div>
          </Section>

          {/* Medical History */}
          <Section title="Medical History" icon={Heart}>
            <div style={grid2}>
              <div>
                <label className="med-label" htmlFor="chronicDiseases">Chronic Diseases</label>
                <textarea
                  id="chronicDiseases"
                  name="chronicDiseases"
                  value={formData.chronicDiseases}
                  onChange={handleChange}
                  placeholder="e.g., Diabetes, Hypertension"
                  className="med-input"
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>
              <div>
                <label className="med-label" htmlFor="allergies">Allergies</label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., Penicillin, Peanuts"
                  className="med-input"
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>
              <div>
                <label className="med-label" htmlFor="currentMedications">Current Medications</label>
                <textarea
                  id="currentMedications"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  placeholder="List current medications"
                  className="med-input"
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>
              <div>
                <label className="med-label" htmlFor="familyHistory">Family History</label>
                <textarea
                  id="familyHistory"
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  placeholder="Notable family medical history"
                  className="med-input"
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>
            </div>
          </Section>

          {/* Lifestyle */}
          <Section title="Lifestyle" icon={Activity} defaultOpen={false}>
            <div style={grid3}>
              <div>
                <label className="med-label">Smoking Status</label>
                <select name="smokingStatus" value={formData.smokingStatus} onChange={handleChange} className="med-select">
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
              </div>
              <div>
                <label className="med-label">Alcohol Consumption</label>
                <select name="alcoholConsumption" value={formData.alcoholConsumption} onChange={handleChange} className="med-select">
                  <option value="">Select</option>
                  <option value="none">None</option>
                  <option value="occasional">Occasional</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div>
                <label className="med-label">Physical Activity</label>
                <select name="physicalActivity" value={formData.physicalActivity} onChange={handleChange} className="med-select">
                  <option value="">Select</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very active</option>
                </select>
              </div>
            </div>
          </Section>

        </div>
      </form>
    </div>
  );
};

export default Profile;