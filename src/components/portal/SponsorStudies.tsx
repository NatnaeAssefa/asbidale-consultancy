"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Milestone } from "@/lib/portal-types";
import { StatusBadge } from "./StatusBadge";

export function SponsorStudies({ milestones }: { milestones: Milestone[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const studies: Record<string, Milestone[]> = {};
  milestones.forEach((m) => {
    (studies[m.study_name] ||= []).push(m);
  });

  return (
    <div>
      <p className="portal-label">Study portfolio</p>
      <h1 className="portal-title">Studies & Milestones</h1>
      <p className="portal-lede">
        Drill into each study to inspect milestone status, notes, and upcoming
        due dates.
      </p>

      <div className="portal-list" style={{ marginTop: 36 }}>
        {Object.entries(studies).map(([name, items]) => {
          const completed = items.filter((i) => i.status === "completed").length;
          const pct = items.length
            ? Math.round((completed / items.length) * 100)
            : 0;
          const isOpen = open === name;
          return (
            <div key={name}>
              <button
                type="button"
                className="study-toggle"
                onClick={() => setOpen(isOpen ? null : name)}
              >
                <div>
                  <h3>{name}</h3>
                  <p className="meta">
                    {completed}/{items.length} milestones · {pct}% complete
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 14 }}
                >
                  <span className="portal-mini-track hide-sm">
                    <span style={{ width: `${pct}%` }} />
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} color="var(--muted)" />
                  ) : (
                    <ChevronDown size={18} color="var(--muted)" />
                  )}
                </div>
              </button>
              {isOpen
                ? items.map((m) => (
                    <div key={m.id} className="study-detail">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 16,
                          alignItems: "center",
                        }}
                      >
                        <h4 style={{ fontWeight: 600 }}>{m.title}</h4>
                        <StatusBadge status={m.status} />
                      </div>
                      {m.description ? (
                        <p className="desc">{m.description}</p>
                      ) : null}
                      <p className="meta">
                        {m.due_date ? `Due ${m.due_date}` : ""}
                        {m.priority ? ` · ${m.priority} priority` : ""}
                      </p>
                      {m.notes ? <p className="note">{m.notes}</p> : null}
                    </div>
                  ))
                : null}
            </div>
          );
        })}
        {!milestones.length ? (
          <p className="meta" style={{ padding: "40px 0" }}>
            No studies available.
          </p>
        ) : null}
      </div>
    </div>
  );
}
