"use client";

import { useEffect, useState } from "react";
import { loadMilestones } from "@/lib/portal-data";
import type { Milestone } from "@/lib/portal-types";
import { SponsorStudies } from "./SponsorStudies";

export function SponsorStudiesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMilestones(loadMilestones());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <p className="meta" style={{ padding: "80px 0", textAlign: "center" }}>
        Loading studies…
      </p>
    );
  }

  return <SponsorStudies milestones={milestones} />;
}
