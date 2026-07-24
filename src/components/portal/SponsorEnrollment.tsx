"use client";

import { Activity, MapPin, Target, Users } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const curve = [
  { month: "Feb", enrolled: 4 },
  { month: "Mar", enrolled: 18 },
  { month: "Apr", enrolled: 41 },
  { month: "May", enrolled: 72 },
  { month: "Jun", enrolled: 110 },
  { month: "Jul", enrolled: 157 },
];

const activation = [
  ["AHRI — Mekelle", "2026-02", "Active"],
  ["EPHI — Addis Ababa", "2026-03", "Active"],
  ["MUHAS — Dar es Salaam", "2026-05", "Active"],
  ["KEMRI — Kisumu", "2026-07", "Initiating"],
  ["AAU — Black Lion", "2026-08", "Pending"],
] as const;

const statusClass = {
  Active: "active_ok",
  Initiating: "initiating",
  Pending: "pending",
};

export function SponsorEnrollment() {
  const kpis = [
    { label: "Screened", value: "312", Icon: Activity },
    { label: "Enrolled", value: "157", Icon: Users },
    { label: "Target", value: "400", Icon: Target },
    { label: "Countries", value: "3", Icon: MapPin },
  ];

  return (
    <div>
      <p className="portal-label">Enrollment & sites</p>
      <h1 className="portal-title">Enrollment Curve</h1>
      <p className="portal-lede">
        Cumulative enrollment against target, with site activation milestones
        across the region.
      </p>

      <div className="portal-kpi-grid cols-4">
        {kpis.map(({ label, value, Icon }) => (
          <article key={label} className="portal-kpi">
            <Icon size={18} className="icon" />
            <b>{value}</b>
            <span>{label}</span>
          </article>
        ))}
      </div>

      <div className="portal-charts" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="portal-chart-box">
          <h2>Cumulative enrollment</h2>
          <div className="portal-chart-area" style={{ height: 256 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curve} margin={{ left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ border: "1px solid #cbd5e1", fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="enrolled"
                  stroke="#2dbd4a"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="portal-chart-box">
          <h2>Site activation</h2>
          <div style={{ marginTop: 12 }}>
            {activation.map(([name, date, st]) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  paddingBottom: 12,
                  marginBottom: 12,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{name}</p>
                  <p className="meta">Activated {date}</p>
                </div>
                <span className={`portal-badge ${statusClass[st]}`}>{st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
