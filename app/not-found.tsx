import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap" style={{ minHeight: "80svh", display: "grid", alignContent: "center", gap: 24, paddingTop: "var(--navh)" }}>
      <span className="label">404</span>
      <h1 className="display h-l">
        This frame is <em className="it">missing.</em>
      </h1>
      <p>
        <Link className="btn btn--solid" href="/">
          Back to the work
        </Link>
      </p>
    </main>
  );
}
