export type MilestoneStatus = "not_started" | "in_progress" | "completed";

export type Milestone = {
  id: string;
  title: string;
  study_name: string;
  status: MilestoneStatus;
  due_date?: string;
  priority?: "low" | "medium" | "high";
  description?: string;
  notes?: string;
  created_date?: string;
};

export type InquiryStatus = "new" | "reviewing" | "responded";

export type SponsorInquiry = {
  id: string;
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
  status: InquiryStatus;
  created_date: string;
};

export type AuthUser = {
  email: string;
  name: string;
  role: "investigator" | "sponsor" | "both";
};
