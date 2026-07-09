"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Thank you — we will be in touch shortly.");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="f-eyebrow">Send an inquiry</div>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" type="text" required />
      </div>
      <div className="field">
        <label htmlFor="cf-org">Organization</label>
        <input id="cf-org" type="text" />
      </div>
      <div className="field">
        <label htmlFor="cf-topic">Area of interest</label>
        <select id="cf-topic" defaultValue="Clinical Research & CRO">
          <option>Clinical Research &amp; CRO</option>
          <option>AI &amp; Digital Health</option>
          <option>Monitoring &amp; Evaluation</option>
          <option>Training &amp; Capacity Building</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" required />
      </div>
      <button type="submit" className="btn solid">
        Send message
      </button>
      {status ? <p className="f-status">{status}</p> : null}
    </form>
  );
}
