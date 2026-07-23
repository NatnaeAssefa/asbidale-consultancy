import {
  AlertTriangle,
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

const docs = [
  {
    name: "Protocol v3.1 — Amendment approval",
    type: "Regulatory",
    status: "Current",
    date: "2026-06-18",
    owner: "EFDA",
  },
  {
    name: "Ethics approval — AHRI site",
    type: "Ethics",
    status: "Current",
    date: "2026-05-02",
    owner: "AAU IRB",
  },
  {
    name: "Ethics approval — KEMRI site",
    type: "Ethics",
    status: "Under review",
    date: "2026-07-30",
    owner: "KEMRI ERC",
  },
  {
    name: "GCP training — 12 investigators",
    type: "Training",
    status: "Current",
    date: "2026-04-21",
    owner: "Asbidale",
  },
  {
    name: "Monitoring visit report — Q2",
    type: "Monitoring",
    status: "Current",
    date: "2026-06-30",
    owner: "CRA Team",
  },
  {
    name: "Safety management plan",
    type: "Regulatory",
    status: "Expiring",
    date: "2026-08-15",
    owner: "Pharmacovigilance",
  },
] as const;

const typeIcon = {
  Regulatory: FileCheck2,
  Ethics: ShieldCheck,
  Training: ClipboardCheck,
  Monitoring: ClipboardCheck,
};

const statusClass = {
  Current: "current",
  "Under review": "under_review",
  Expiring: "expiring",
};

export function InvestigatorDocuments() {
  const current = docs.filter((d) => d.status === "Current").length;
  const kpis = [
    { label: "Documents", value: docs.length, Icon: FileCheck2 },
    { label: "Current", value: current, Icon: ShieldCheck },
    {
      label: "Expiring",
      value: docs.filter((d) => d.status === "Expiring").length,
      Icon: AlertTriangle,
    },
    { label: "Compliance", value: "94%", Icon: ClipboardCheck },
  ];

  return (
    <div>
      <p className="portal-label">Documents & compliance</p>
      <h1 className="portal-title">Regulatory Library</h1>
      <p className="portal-lede">
        Track approvals, ethics submissions, GCP training, and monitoring
        reports — the foundation of audit-ready delivery.
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
                <p className="meta">
                  {d.type} · {d.owner}
                </p>
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
