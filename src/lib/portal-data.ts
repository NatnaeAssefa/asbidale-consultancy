import type { Milestone, SponsorInquiry } from "./portal-types";

const MILESTONES_KEY = "asbidale.milestones";
const INQUIRIES_KEY = "asbidale.inquiries";

export const DEMO_MILESTONES: Milestone[] = [
  {
    id: "m1",
    title: "Site initiation visit — AHRI Mekelle",
    study_name: "TB Vaccine Phase IIb",
    status: "completed",
    due_date: "2026-03-12",
    priority: "high",
    description: "Complete SIV checklist and train site staff on protocol v3.1.",
    notes: "SIV closed; all action items cleared.",
    created_date: "2026-03-01T10:00:00Z",
  },
  {
    id: "m2",
    title: "First patient enrolled",
    study_name: "TB Vaccine Phase IIb",
    status: "completed",
    due_date: "2026-04-02",
    priority: "high",
    created_date: "2026-03-20T10:00:00Z",
  },
  {
    id: "m3",
    title: "Interim monitoring visit — Q2",
    study_name: "TB Vaccine Phase IIb",
    status: "in_progress",
    due_date: "2026-07-28",
    priority: "medium",
    description: "Source data verification for cohorts A–C.",
    notes: "Visit day 2 of 3; SDV at 68%.",
    created_date: "2026-06-15T10:00:00Z",
  },
  {
    id: "m4",
    title: "Ethics renewal package",
    study_name: "Pediatric Malaria Cohort",
    status: "in_progress",
    due_date: "2026-08-10",
    priority: "high",
    description: "Compile annual progress report for AAU IRB.",
    created_date: "2026-06-01T10:00:00Z",
  },
  {
    id: "m5",
    title: "Lab assay validation report",
    study_name: "AI Diagnostic Validation",
    status: "not_started",
    due_date: "2026-08-30",
    priority: "medium",
    description: "Finalize sensitivity/specificity tables for sponsor CSR.",
    created_date: "2026-07-01T10:00:00Z",
  },
  {
    id: "m6",
    title: "Community sensitization — Gambella",
    study_name: "Pediatric Malaria Cohort",
    status: "completed",
    due_date: "2026-05-20",
    priority: "low",
    created_date: "2026-04-10T10:00:00Z",
  },
  {
    id: "m7",
    title: "KEMRI site activation review",
    study_name: "AI Diagnostic Validation",
    status: "not_started",
    due_date: "2026-09-05",
    priority: "high",
    description: "Green-light initiation pending ERC approval.",
    created_date: "2026-07-10T10:00:00Z",
  },
  {
    id: "m8",
    title: "Study status update",
    study_name: "TB Vaccine Phase IIb",
    status: "in_progress",
    notes: "Enrollment on pace; two screen failures this week.",
    created_date: "2026-07-18T10:00:00Z",
  },
];

export const DEMO_INQUIRIES: SponsorInquiry[] = [
  {
    id: "i1",
    name: "Sara Okonkwo",
    email: "s.okonkwo@acmepharma.com",
    organization: "Acme Pharma",
    interest: "Clinical Research & CRO",
    message:
      "We are evaluating East Africa sites for a Phase II vaccine trial and would like a feasibility brief.",
    status: "new",
    created_date: "2026-07-12T09:30:00Z",
  },
  {
    id: "i2",
    name: "James Rivera",
    email: "jrivera@globalhealth.org",
    organization: "Global Health Partners",
    interest: "Digital Health & Telemedicine",
    message:
      "Interested in a regional telemedicine pilot linked to our malaria cohort study.",
    status: "reviewing",
    created_date: "2026-07-05T14:10:00Z",
  },
  {
    id: "i3",
    name: "Dr. Helen Park",
    email: "helen.park@allegrobio.be",
    organization: "Allegro Bio",
    interest: "AI-Driven Healthcare",
    message:
      "Please share a proposal for diagnostic AI validation support in Ethiopia.",
    status: "responded",
    created_date: "2026-06-22T11:00:00Z",
  },
];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadMilestones(): Milestone[] {
  const stored = readJson<Milestone[] | null>(MILESTONES_KEY, null);
  if (!stored?.length) {
    writeJson(MILESTONES_KEY, DEMO_MILESTONES);
    return [...DEMO_MILESTONES];
  }
  return stored;
}

export function saveMilestones(milestones: Milestone[]) {
  writeJson(MILESTONES_KEY, milestones);
}

export function loadInquiries(): SponsorInquiry[] {
  const stored = readJson<SponsorInquiry[] | null>(INQUIRIES_KEY, null);
  if (!stored?.length) {
    writeJson(INQUIRIES_KEY, DEMO_INQUIRIES);
    return [...DEMO_INQUIRIES];
  }
  return stored;
}

export const STUDY_OPTIONS = [
  "TB Vaccine Phase IIb",
  "Pediatric Malaria Cohort",
  "AI Diagnostic Validation",
];
