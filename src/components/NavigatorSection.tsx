import Link from "next/link";
import {
  Activity,
  FileCheck2,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";

const cards: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Country pathways",
    text: "Regulatory and ethics submission routes, activation steps, and country briefs.",
    Icon: MapPin,
  },
  {
    title: "Study readiness",
    text: "Feasibility signals across sites, investigators, laboratories, and patient access.",
    Icon: Activity,
  },
  {
    title: "Regulatory intelligence",
    text: "AVAREF relevance, national requirements, and decision-ready pathway summaries.",
    Icon: FileCheck2,
  },
  {
    title: "Network access",
    text: "Structured visibility into regional institutions and specialist collaborators.",
    Icon: Users,
  },
];

export function NavigatorSection() {
  return (
    <section id="navigator" className="navigator-band">
      <div className="wrap">
        <div className="navigator-head">
          <div>
            <div className="eyebrow">
              Sec. 05 &mdash; Africa Clinical Trial Navigator
            </div>
            <h2>
              Turn regional complexity into <em>study readiness.</em>
            </h2>
          </div>
          <div>
            <p className="navigator-lede">
              A sponsor-focused intelligence layer for understanding pathways,
              partners, and execution conditions across East Africa—without
              replacing formal regulatory advice.
            </p>
            <Link href="/#contact" className="navigator-cta">
              Request a country brief →
            </Link>
          </div>
        </div>

        <div className="navigator-grid">
          {cards.map(({ title, text, Icon }) => (
            <article key={title} className="navigator-card">
              <Icon className="nav-icon" size={22} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
