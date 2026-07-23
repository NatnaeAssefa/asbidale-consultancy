"use client";

import type { Milestone } from "@/lib/portal-types";

const columns: { key: Milestone["status"]; label: string }[] = [
  { key: "not_started", label: "Not started" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Completed" },
];

export function MilestoneKanban({ milestones }: { milestones: Milestone[] }) {
  return (
    <div>
      <div className="portal-section-head" style={{ marginTop: 0 }}>
        <h2>Milestone board</h2>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          {milestones.length} total
        </span>
      </div>
      <div className="kanban">
        {columns.map((col) => {
          const items = milestones.filter((m) => m.status === col.key);
          return (
            <div key={col.key} className="kanban-col">
              <div className="kanban-col-head">
                <span>
                  <span className={`kanban-dot ${col.key}`} />
                  {col.label}
                </span>
                <span>{items.length}</span>
              </div>
              <div className="kanban-body">
                {items.map((m) => (
                  <div key={m.id} className="kanban-card">
                    <p>{m.title}</p>
                    <small>{m.study_name}</small>
                    {m.due_date ? <small>Due {m.due_date}</small> : null}
                    {m.priority === "high" ? (
                      <span className="portal-badge high">High priority</span>
                    ) : null}
                  </div>
                ))}
                {!items.length ? (
                  <p className="kanban-empty">No items</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
