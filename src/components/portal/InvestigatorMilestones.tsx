"use client";

import { useEffect, useState } from "react";
import { loadMilestones, saveMilestones } from "@/lib/portal-data";
import type { Milestone } from "@/lib/portal-types";
import { MilestonesList } from "./MilestonesList";

export function InvestigatorMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMilestones(loadMilestones());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <p className="meta" style={{ padding: "80px 0", textAlign: "center" }}>
        Loading milestones…
      </p>
    );
  }

  return (
    <MilestonesList
      milestones={milestones}
      setMilestones={(next) => {
        setMilestones(next);
        saveMilestones(next);
      }}
    />
  );
}
