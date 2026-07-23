import { Activity, Building2, MapPin, Users } from "lucide-react";

const sites = [
  {
    name: "AHRI — Mekelle",
    country: "Ethiopia",
    pi: "Dr. S. Tadesse",
    enrolled: 84,
    target: 120,
    status: "Enrolling" as const,
  },
  {
    name: "EPHI — Addis Ababa",
    country: "Ethiopia",
    pi: "Dr. M. Bekele",
    enrolled: 51,
    target: 80,
    status: "Enrolling" as const,
  },
  {
    name: "KEMRI — Kisumu",
    country: "Kenya",
    pi: "Dr. A. Otieno",
    enrolled: 0,
    target: 100,
    status: "Initiating" as const,
  },
  {
    name: "MUHAS — Dar es Salaam",
    country: "Tanzania",
    pi: "Dr. R. Mushi",
    enrolled: 22,
    target: 60,
    status: "Enrolling" as const,
  },
  {
    name: "AAU — Black Lion",
    country: "Ethiopia",
    pi: "Dr. H. Girma",
    enrolled: 0,
    target: 40,
    status: "Pending" as const,
  },
];

const statusClass = {
  Enrolling: "enrolling",
  Initiating: "initiating",
  Pending: "pending",
};

export function InvestigatorSites() {
  const totalEnrolled = sites.reduce((a, s) => a + s.enrolled, 0);
  const totalTarget = sites.reduce((a, s) => a + s.target, 0);
  const kpis = [
    {
      label: "Active sites",
      value: sites.filter((s) => s.status === "Enrolling").length,
      Icon: Building2,
    },
    { label: "Enrolled", value: totalEnrolled, Icon: Users },
    { label: "Target", value: totalTarget, Icon: Activity },
    {
      label: "Countries",
      value: new Set(sites.map((s) => s.country)).size,
      Icon: MapPin,
    },
  ];

  return (
    <div>
      <p className="portal-label">Sites & staffing</p>
      <h1 className="portal-title">Site Roster</h1>
      <p className="portal-lede">
        Enrollment status, principal investigators, and activation phase across
        regional study sites.
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

      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Site</th>
              <th>Country</th>
              <th>Principal Investigator</th>
              <th>Enrollment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((s) => (
              <tr key={s.name}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td style={{ color: "var(--muted)" }}>{s.country}</td>
                <td style={{ color: "var(--muted)" }}>{s.pi}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span className="portal-mini-track">
                      <span
                        style={{
                          width: `${Math.round((s.enrolled / s.target) * 100)}%`,
                        }}
                      />
                    </span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      {s.enrolled}/{s.target}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`portal-badge ${statusClass[s.status]}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
