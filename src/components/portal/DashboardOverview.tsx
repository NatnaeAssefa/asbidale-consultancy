"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import type { Milestone } from "@/lib/portal-types";
import { MilestoneKanban } from "./MilestoneKanban";
import { StatusBadge } from "./StatusBadge";

const announcements = [
  [
    "KEMRI site activation review",
    "Ethics committee visit scheduled for 2026-07-30.",
  ],
  [
    "Interim CSR delivered",
    "Sponsor interim study report shared on 2026-06-24.",
  ],
  [
    "GCP training renewed",
    "All 12 investigators recertified through April 2027.",
  ],
];

export function DashboardOverview({ milestones }: { milestones: Milestone[] }) {
  const total = milestones.length;
  const completed = milestones.filter((m) => m.status === "completed").length;
  const inProgress = milestones.filter((m) => m.status === "in_progress").length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const cards = [
    { label: "Total milestones", value: total, Icon: Activity },
    { label: "In progress", value: inProgress, Icon: Clock },
    { label: "Completed", value: completed, Icon: CheckCircle2 },
  ];

  return (
    <div>
      <p className="portal-label">Secure workspace</p>
      <h1 className="portal-title">Investigator Dashboard</h1>
      <p className="portal-lede">
        Track project milestones and keep study status current for your
        sponsors.
      </p>

      <div className="portal-kpi-grid">
        {cards.map(({ label, value, Icon }) => (
          <article key={label} className="portal-kpi">
            <Icon size={18} className="icon" />
            <b>{value}</b>
            <span>{label}</span>
          </article>
        ))}
      </div>

      <div className="portal-panel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
          }}
        >
          <span style={{ fontWeight: 600 }}>Portfolio progress</span>
          <span style={{ color: "var(--muted)" }}>
            {completed}/{total} milestones · {pct}%
          </span>
        </div>
        <div className="portal-progress-track">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div style={{ marginTop: 36 }}>
        <MilestoneKanban milestones={milestones} />
      </div>

      <div className="portal-overview-split">
        <div>
          <div className="portal-section-head" style={{ marginTop: 0 }}>
            <h2>Recent milestones</h2>
            <Link href="/dashboard/milestones">
              View all <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="portal-list">
            {milestones.slice(0, 5).map((m) => (
              <div key={m.id} className="portal-list-row recent-row">
                <div>
                  <h3 style={{ fontSize: 16 }}>{m.title}</h3>
                  <p className="meta">
                    {m.study_name}
                    {m.due_date ? ` · due ${m.due_date}` : ""}
                  </p>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
            {!milestones.length ? (
              <p className="meta" style={{ padding: "24px 0" }}>
                No milestones assigned yet.
              </p>
            ) : null}
          </div>
        </div>

        <aside className="portal-announcements">
          <span className="eyebrow-dark">Announcements</span>
          {announcements.map(([title, body]) => (
            <div key={title} className="item">
              <p>{title}</p>
              <small>{body}</small>
            </div>
          ))}
          <Link href="/dashboard/documents">
            Open compliance library <ArrowUpRight size={13} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
