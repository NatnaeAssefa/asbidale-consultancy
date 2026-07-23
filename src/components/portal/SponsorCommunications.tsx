"use client";

import { useEffect, useState } from "react";
import { Building2, Clock, Mail, Tag } from "lucide-react";
import { loadInquiries } from "@/lib/portal-data";
import type { SponsorInquiry } from "@/lib/portal-types";

const statusClass = {
  new: "new",
  reviewing: "reviewing",
  responded: "responded",
} as const;

export function SponsorCommunications() {
  const [items, setItems] = useState<SponsorInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItems(loadInquiries());
    setLoading(false);
  }, []);

  return (
    <div>
      <p className="portal-label">Communications</p>
      <h1 className="portal-title">Inquiry Inbox</h1>
      <p className="portal-lede">
        Sponsor and partner inquiries received through the public site, with
        routing status.
      </p>

      <div className="portal-list" style={{ marginTop: 36 }}>
        {loading ? (
          <p className="meta" style={{ padding: "24px 0" }}>
            Loading…
          </p>
        ) : (
          items.map((i) => (
            <div key={i.id} className="portal-list-row">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <h3 style={{ fontSize: 16 }}>{i.name}</h3>
                <span className={`portal-badge ${statusClass[i.status]}`}>
                  {i.status}
                </span>
              </div>
              <div className="portal-meta-row">
                <span>
                  <Mail size={14} /> {i.email}
                </span>
                <span>
                  <Building2 size={14} /> {i.organization}
                </span>
                <span>
                  <Tag size={14} /> {i.interest}
                </span>
                <span>
                  <Clock size={14} />{" "}
                  {new Date(i.created_date).toLocaleDateString()}
                </span>
              </div>
              <p className="desc">{i.message}</p>
            </div>
          ))
        )}
        {!loading && !items.length ? (
          <p className="meta" style={{ padding: "40px 0" }}>
            No inquiries yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
