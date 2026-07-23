"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Globe2,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Milestone } from "@/lib/portal-types";

const STATUS_COLORS: Record<string, string> = {
  completed: "#1018cc",
  in_progress: "#f59e0b",
  not_started: "#cbd5e1",
};

export function SponsorOverview({ milestones }: { milestones: Milestone[] }) {
  const studies = useMemo(() => {
    const map: Record<
      string,
      {
        name: string;
        total: number;
        completed: number;
        in_progress: number;
        not_started: number;
      }
    > = {};
    milestones.forEach((m) => {
      if (!map[m.study_name]) {
        map[m.study_name] = {
          name: m.study_name,
          total: 0,
          completed: 0,
          in_progress: 0,
          not_started: 0,
        };
      }
      map[m.study_name].total++;
      map[m.study_name][m.status]++;
    });
    return Object.values(map);
  }, [milestones]);

  const total = milestones.length;
  const completed = milestones.filter((m) => m.status === "completed").length;
  const inProgress = milestones.filter((m) => m.status === "in_progress").length;
  const notStarted = milestones.filter((m) => m.status === "not_started").length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const pieData = [
    { name: "Completed", value: completed, key: "completed" },
    { name: "In progress", value: inProgress, key: "in_progress" },
    { name: "Not started", value: notStarted, key: "not_started" },
  ];

  const kpis = [
    { label: "Active studies", value: studies.length, Icon: Globe2 },
    { label: "Milestones", value: total, Icon: Activity },
    { label: "In progress", value: inProgress, Icon: Clock },
    { label: "Completed", value: completed, Icon: CheckCircle2 },
  ];

  const barData = studies.map((s) => ({
    name:
      s.name.replace(/Phase.*|Cohort|Validation/, "").trim() || s.name,
    completed: s.completed,
    inProgress: s.in_progress,
    notStarted: s.not_started,
  }));

  return (
    <div>
      <p className="portal-label">Sponsor workspace</p>
      <h1 className="portal-title">Portfolio Overview</h1>
      <p className="portal-lede">
        Real-time visibility across your active studies, milestones, and
        regional activation.
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

      <div className="portal-charts">
        <div className="portal-chart-box">
          <h2>Milestone status</h2>
          <div className="portal-chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {pieData.map((d) => (
                    <Cell key={d.name} fill={STATUS_COLORS[d.key]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ border: "1px solid #cbd5e1", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="portal-legend">
            {pieData.map((d) => (
              <span key={d.name}>
                <i style={{ background: STATUS_COLORS[d.key] }} />
                {d.name}: {d.value}
              </span>
            ))}
          </div>
        </div>

        <div className="portal-chart-box">
          <h2>Portfolio progress</h2>
          <div className="portal-chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e2e8f0"
                />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  width={90}
                  stroke="#94a3b8"
                />
                <Tooltip
                  contentStyle={{ border: "1px solid #cbd5e1", fontSize: 12 }}
                />
                <Bar dataKey="completed" stackId="a" fill="#1018cc" />
                <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" />
                <Bar dataKey="notStarted" stackId="a" fill="#cbd5e1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="portal-section-head">
        <h2>Study portfolio</h2>
        <Link href="/sponsor-dashboard/studies">
          View detail <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="portal-table-wrap" style={{ marginTop: 14 }}>
        <table className="portal-table">
          <thead>
            <tr>
              <th>Study</th>
              <th>Milestones</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((s) => {
              const sp = s.total
                ? Math.round((s.completed / s.total) * 100)
                : 0;
              return (
                <tr key={s.name}>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td style={{ color: "var(--muted)" }}>
                    {s.completed}/{s.total}
                  </td>
                  <td>
                    <span className="portal-mini-track">
                      <span style={{ width: `${sp}%` }} />
                    </span>
                  </td>
                  <td>
                    <span
                      className={`portal-badge ${
                        sp >= 100
                          ? "on_track"
                          : sp > 0
                            ? "active_warn"
                            : "pending"
                      }`}
                    >
                      {sp >= 100 ? "On track" : sp > 0 ? "Active" : "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
            {!studies.length ? (
              <tr>
                <td colSpan={4} style={{ color: "var(--muted)" }}>
                  No studies in your portfolio yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <p className="meta" style={{ marginTop: 18, fontSize: 12 }}>
        3 countries active · {pct}% overall completion
      </p>
    </div>
  );
}
