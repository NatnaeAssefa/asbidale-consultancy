"use client";

import { useEffect, useState } from "react";
import { loadMilestones } from "@/lib/portal-data";
import type { Milestone } from "@/lib/portal-types";
import { DashboardOverview } from "./DashboardOverview";

export function InvestigatorHome() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMilestones(loadMilestones());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <p className="meta" style={{ padding: "80px 0", textAlign: "center" }}>
        Loading your workspace…
      </p>
    );
  }

  return <DashboardOverview milestones={milestones} />;
}
