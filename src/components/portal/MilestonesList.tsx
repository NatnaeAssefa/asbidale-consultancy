"use client";

import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import type { Milestone, MilestoneStatus } from "@/lib/portal-types";
import { saveMilestones } from "@/lib/portal-data";
import { StatusBadge } from "./StatusBadge";

export function MilestonesList({
  milestones,
  setMilestones,
}: {
  milestones: Milestone[];
  setMilestones: (next: Milestone[]) => void;
}) {
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ status: MilestoneStatus; notes: string }>(
    { status: "not_started", notes: "" },
  );
  const [saving, setSaving] = useState(false);

  const startEdit = (m: Milestone) => {
    setEditId(m.id);
    setDraft({ status: m.status, notes: m.notes || "" });
  };

  const save = (id: string) => {
    setSaving(true);
    const next = milestones.map((m) =>
      m.id === id ? { ...m, status: draft.status, notes: draft.notes } : m,
    );
    setMilestones(next);
    saveMilestones(next);
    setEditId(null);
    setSaving(false);
  };

  return (
    <div>
      <p className="portal-label">Project milestones</p>
      <h1 className="portal-title">Milestones</h1>
      <p className="portal-lede">
        Update the status of your assigned milestones to keep sponsors informed
        in real time.
      </p>

      <div className="portal-list" style={{ marginTop: 36 }}>
        {milestones.map((m) => (
          <div key={m.id} className="portal-list-row">
            <div
              style={{
                display: "grid",
                gap: 14,
                gridTemplateColumns: "1.4fr 1fr auto",
                alignItems: "start",
              }}
              className="milestone-edit-grid"
            >
              <div>
                <h3>{m.title}</h3>
                <p className="meta">
                  {m.study_name}
                  {m.due_date ? ` · due ${m.due_date}` : ""}
                </p>
                {m.description ? <p className="desc">{m.description}</p> : null}
              </div>

              <div style={{ textAlign: "right" }}>
                {editId === m.id ? (
                  <select
                    className="portal-inline-select"
                    value={draft.status}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        status: e.target.value as MilestoneStatus,
                      })
                    }
                  >
                    <option value="not_started">Not started</option>
                    <option value="in_progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  <StatusBadge status={m.status} />
                )}
                {m.priority ? (
                  <p className="meta" style={{ marginTop: 8 }}>
                    Priority: {m.priority}
                  </p>
                ) : null}
              </div>

              <div className="portal-actions">
                {editId === m.id ? (
                  <>
                    <button
                      type="button"
                      className="portal-btn"
                      disabled={saving}
                      onClick={() => save(m.id)}
                    >
                      <Check size={15} /> Save
                    </button>
                    <button
                      type="button"
                      className="portal-btn ghost"
                      onClick={() => setEditId(null)}
                    >
                      <X size={15} />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="portal-btn ghost"
                    onClick={() => startEdit(m)}
                  >
                    <Pencil size={15} /> Update
                  </button>
                )}
              </div>
            </div>

            {editId === m.id ? (
              <div style={{ marginTop: 12, maxWidth: 420 }}>
                <label className="field-label" style={{ display: "block" }}>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    Notes
                  </span>
                  <textarea
                    className="portal-inline-textarea"
                    style={{ marginTop: 8 }}
                    rows={2}
                    value={draft.notes}
                    onChange={(e) =>
                      setDraft({ ...draft, notes: e.target.value })
                    }
                    placeholder="Add a status note for the sponsor…"
                  />
                </label>
              </div>
            ) : null}
            {editId !== m.id && m.notes ? (
              <p className="note">{m.notes}</p>
            ) : null}
          </div>
        ))}
        {!milestones.length ? (
          <p className="meta" style={{ padding: "40px 0" }}>
            No milestones assigned to you yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
