import {
  AlertTriangle,
  ClipboardCheck,
  FileCheck2,
  FileText,
} from "lucide-react";

const docs = [
  {
    name: "Clinical Study Report — Interim",
    type: "Study report",
    status: "Delivered",
    date: "2026-06-24",
  },
  {
    name: "Regulatory submission — AVAREF",
    type: "Regulatory",
    status: "Submitted",
    date: "2026-05-12",
  },
  {
    name: "Serious adverse event — SAE-04",
    type: "Safety",
    status: "Under review",
    date: "2026-07-08",
  },
  {
    name: "Data management plan v2",
    type: "Operational",
    status: "Delivered",
    date: "2026-04-03",
  },
  {
    name: "Statistical analysis plan",
    type: "Operational",
    status: "Delivered",
    date: "2026-03-19",
  },
  {
    name: "Annual DSMB review",
    type: "Safety",
    status: "Scheduled",
    date: "2026-09-15",
  },
] as const;

const statusClass = {
  Delivered: "delivered",
  Submitted: "submitted",
  "Under review": "under_review",
  Scheduled: "scheduled",
};

const typeIcon = {
  "Study report": FileText,
  Regulatory: FileCheck2,
  Safety: AlertTriangle,
  Operational: ClipboardCheck,
};

export function SponsorDocuments() {
  const kpis = [
    { label: "Deliverables", value: docs.length, Icon: ClipboardCheck },
    {
      label: "Delivered",
      value: docs.filter((d) => d.status === "Delivered").length,
      Icon: FileCheck2,
    },
    {
      label: "Under review",
      value: docs.filter((d) => d.status === "Under review").length,
      Icon: AlertTriangle,
    },
    { label: "On-time", value: "96%", Icon: FileText },
  ];

  return (
    <div>
      <p className="portal-label">Reports & submissions</p>
      <h1 className="portal-title">Document Vault</h1>
      <p className="portal-lede">
        Study reports, regulatory submissions, and safety records — curated for
        sponsor oversight.
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

      <div className="portal-list" style={{ marginTop: 28 }}>
        {docs.map((d) => {
          const Icon = typeIcon[d.type];
          return (
            <div key={d.name} className="portal-doc-row">
              <span className="portal-doc-icon">
                <Icon size={18} />
              </span>
              <div>
                <h3 style={{ fontSize: 15 }}>{d.name}</h3>
                <p className="meta">{d.type}</p>
              </div>
              <span className="meta">{d.date}</span>
              <span className={`portal-badge ${statusClass[d.status]}`}>
                {d.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
