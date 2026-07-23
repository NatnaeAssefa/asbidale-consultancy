import type { MilestoneStatus } from "@/lib/portal-types";

const labels: Record<MilestoneStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};

export function StatusBadge({ status }: { status: MilestoneStatus }) {
  return (
    <span className={`portal-badge ${status}`}>{labels[status] ?? status}</span>
  );
}
