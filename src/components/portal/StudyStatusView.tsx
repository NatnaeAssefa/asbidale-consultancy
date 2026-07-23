"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import {
  STUDY_OPTIONS,
  loadMilestones,
  saveMilestones,
} from "@/lib/portal-data";
import type { Milestone, MilestoneStatus } from "@/lib/portal-types";
import { StatusBadge } from "./StatusBadge";

export function StudyStatusView() {
  const [all, setAll] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState(STUDY_OPTIONS[0]);
  const [status, setStatus] = useState<MilestoneStatus>("not_started");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setAll(loadMilestones());
    setLoading(false);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const entry: Milestone = {
      id: `m-${Date.now()}`,
      title: "Study status update",
      study_name: study,
      status,
      notes,
      created_date: new Date().toISOString(),
    };
    const next = [entry, ...all];
    setAll(next);
    saveMilestones(next);
    setNotes("");
    setStatus("not_started");
    setBusy(false);
  };

  return (
    <div>
      <p className="portal-label">Study status</p>
      <h1 className="portal-title">Update Study Status</h1>
      <p className="portal-lede">
        Post a new status entry for a study in your portfolio. Sponsors see the
        latest status in their workspace.
      </p>

      <form className="portal-form" onSubmit={submit}>
        <label>
          <span className="field-label">Study</span>
          <select value={study} onChange={(e) => setStudy(e.target.value)}>
            {STUDY_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="field-label">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as MilestoneStatus)}
          >
            <option value="not_started">Not started</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label className="full">
          <span className="field-label">Status note</span>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Summary of progress, blockers, or next steps…"
          />
        </label>
        <button type="submit" disabled={busy} style={{ gridColumn: "1 / -1" }}>
          <Check size={16} /> {busy ? "Posting…" : "Post status update"}
        </button>
      </form>

      <h2 className="portal-title" style={{ fontSize: 24, marginTop: 40 }}>
        Recent activity
      </h2>
      <div className="portal-list">
        {loading ? (
          <p className="meta" style={{ padding: "24px 0" }}>
            Loading…
          </p>
        ) : (
          all.map((m) => (
            <div
              key={m.id}
              className="portal-list-row recent-row"
            >
              <div>
                <h3 style={{ fontSize: 16 }}>{m.study_name}</h3>
                <p className="meta">
                  {m.title}
                  {m.due_date ? ` · ${m.due_date}` : ""}
                </p>
                {m.notes ? <p className="note">{m.notes}</p> : null}
              </div>
              <StatusBadge status={m.status} />
            </div>
          ))
        )}
        {!loading && !all.length ? (
          <p className="meta" style={{ padding: "24px 0" }}>
            No status updates posted yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
