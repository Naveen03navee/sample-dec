import { useState } from "react";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      background: "#111827",
      color: "#f8fafc",
    }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 22 }}>EV Ride-Hailing Admin</h2>
        <p style={{ margin: 0, color: "#94a3b8" }}>Live operational dashboard</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search drivers, vehicles, stations"
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid #334155",
            background: "#1f2937",
            color: "#f8fafc",
            outline: "none",
            minWidth: 280,
          }}
        />
      </div>
    </header>
  );
}
