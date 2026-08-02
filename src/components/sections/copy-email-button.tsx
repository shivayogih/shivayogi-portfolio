export function CopyEmailButton({ email }: { email: string }) {
  return (
    <div className="copy-email">
      <button
        className="button button--secondary"
        type="button"
        data-copy-email={email}
      >
        Copy email
      </button>
      <p className="sr-only" aria-live="polite" role="status" data-copy-status />
    </div>
  );
}
