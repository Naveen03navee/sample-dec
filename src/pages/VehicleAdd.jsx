import { useState } from "react";
import { Link } from "react-router-dom";
import { vehicleService } from "../services/vehicleService";

export default function VehicleAdd() {
  const [vehicle, setVehicle] = useState({
    model: "",
    plate: "",
    status: "Active",
    battery: "100%",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (event) => {
    setVehicle((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newVehicle = {
      id: vehicle.plate.trim() || `EV-${Date.now()}`,
      name: vehicle.model.trim() || "New Vehicle",
      status: vehicle.status,
      kms: "0",
      battery: vehicle.battery.trim() || "100%",
      lastService: new Date().toISOString().slice(0, 10),
    };

    vehicleService.addVehicle(newVehicle);
    setSubmitted(true);
    setVehicle({ model: "", plate: "", status: "Active", battery: "100%" });
  };

  return (
    <section style={{ display: "grid", gap: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ margin: 0 }}>Add Vehicle</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
            Register a new electric vehicle into the fleet management system.
          </p>
        </div>
        <Link
          to="/vehicles"
          style={{
            padding: "12px 20px",
            borderRadius: 999,
            background: "#0f172a",
            color: "#38bdf8",
            border: "1px solid #334155",
            textDecoration: "none",
          }}
        >
          Back to vehicles
        </Link>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 20, padding: 24, borderRadius: 24, background: "#111827", color: "#f8fafc", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.2)" }}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ color: "#cbd5e1" }}>Vehicle model</span>
            <input
              value={vehicle.model}
              onChange={handleChange("model")}
              placeholder="e.g. Tesla Model 3"
              style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc" }}
              required
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ color: "#cbd5e1" }}>License plate</span>
            <input
              value={vehicle.plate}
              onChange={handleChange("plate")}
              placeholder="e.g. EV-1234"
              style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc" }}
              required
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ color: "#cbd5e1" }}>Status</span>
            <select
              value={vehicle.status}
              onChange={handleChange("status")}
              style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc" }}
            >
              <option>Active</option>
              <option>Charging</option>
              <option>Inspection</option>
              <option>Pending</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ color: "#cbd5e1" }}>Battery status</span>
            <input
              value={vehicle.battery}
              onChange={handleChange("battery")}
              placeholder="e.g. 95%"
              style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc" }}
              required
            />
          </label>
        </div>

        <button type="submit" style={{ padding: "14px 20px", borderRadius: 999, border: "none", background: "#38bdf8", color: "#0f172a", cursor: "pointer" }}>
          Save vehicle
        </button>

        {submitted && (
          <div style={{ padding: 16, borderRadius: 16, background: "#12283a", color: "#f8fafc" }}>
            Vehicle <strong>{vehicle.model}</strong> saved successfully.
          </div>
        )}
      </form>
    </section>
  );
}
