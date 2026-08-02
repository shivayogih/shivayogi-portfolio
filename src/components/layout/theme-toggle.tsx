export function ThemeToggle() {
  return (
    <button
      className="icon-button"
      type="button"
      data-theme-toggle
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 2v14a7 7 0 0 1 0-14Z" />
      </svg>
    </button>
  );
}
