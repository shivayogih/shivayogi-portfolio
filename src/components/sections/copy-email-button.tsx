"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email copied to clipboard.");
    } catch {
      setStatus(`Copy failed. Email: ${email}`);
    }
  };

  return (
    <div className="copy-email">
      <button
        className="button button--secondary"
        type="button"
        data-copy-email={email}
        onClick={copyEmail}
      >
        Copy email
      </button>
      <p className="sr-only" aria-live="polite" role="status" data-copy-status>
        {status}
      </p>
    </div>
  );
}
