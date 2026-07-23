"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          organization: String(data.get("organization") || ""),
          interest: String(data.get("interest") || ""),
          message: String(data.get("message") || ""),
        }),
      });
      const payload = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(payload.error || "Could not send your message.");
      }
      setStatus("Thank you — we will be in touch shortly.");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="f-eyebrow">Send an inquiry</div>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="cf-org">Organization</label>
        <input id="cf-org" name="organization" type="text" />
      </div>
      <div className="field">
        <label htmlFor="cf-topic">Area of interest</label>
        <select
          id="cf-topic"
          name="interest"
          defaultValue="Clinical Research & CRO"
        >
          <option>Clinical Research &amp; CRO</option>
          <option>AI &amp; Digital Health</option>
          <option>Monitoring &amp; Evaluation</option>
          <option>Training &amp; Capacity Building</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" required />
      </div>
      <button type="submit" className="btn solid" disabled={loading}>
        {loading ? "Sending…" : "Send message"}
      </button>
      {status ? <p className="f-status">{status}</p> : null}
      {error ? (
        <p className="f-status" style={{ color: "#be123c" }}>
          {error}
        </p>
      ) : null}
    </form>
  );
}
