import { useEffect, useState } from "react";
import { vehicleService } from "../services/vehicleService";

const statusColors = {
  Active: "#22c55e",
  Pending: "#f59e0b",
  Charging: "#38bdf8",
  Inspection: "#f97316",
};

export default function VehicleTable() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    setVehicles(vehicleService.getVehicles());
  }, []);

  return (
    <div style={{ padding: 24, borderRadius: 24, background: "#111827", color: "#f8fafc", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0 }}>Vehicle inventory</h2>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>Track vehicle status, range, and service history.</p>
        </div>
        <button style={{
          padding: "10px 16px",
          borderRadius: 999,
          border: "1px solid #334155",
          background: "transparent",
          color: "#f8fafc",
          cursor: "pointer",
        }}>
          Filter
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ color: "#94a3b8", textAlign: "left", borderBottom: "1px solid #334155" }}>
              <th style={{ padding: "14px 12px" }}>ID</th>
              <th style={{ padding: "14px 12px" }}>Vehicle</th>
              <th style={{ padding: "14px 12px" }}>Status</th>
              <th style={{ padding: "14px 12px" }}>Mileage</th>
              <th style={{ padding: "14px 12px" }}>Battery</th>
              <th style={{ padding: "14px 12px" }}>Last service</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} style={{ borderBottom: "1px solid #334155" }}>
                <td style={{ padding: "14px 12px" }}>{vehicle.id}</td>
                <td style={{ padding: "14px 12px" }}>{vehicle.name}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    borderRadius: 999,
                    background: "rgba(255, 255, 255, 0.06)",
                    color: statusColors[vehicle.status] || "#cbd5e1",
                  }}>
                    {vehicle.status}
                  </span>
                </td>
                <td style={{ padding: "14px 12px" }}>{vehicle.kms}</td>
                <td style={{ padding: "14px 12px" }}>{vehicle.battery}</td>
                <td style={{ padding: "14px 12px" }}>{vehicle.lastService}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
