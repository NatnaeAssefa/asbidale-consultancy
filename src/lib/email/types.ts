export type InquiryEmailData = {
  name: string;
  email: string;
  organization?: string;
  interest: string;
  message: string;
};

export type SendEmailResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string };
