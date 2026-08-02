import { withBasePath } from "@/config/site";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="shell shell--reading">
        <p className="eyebrow">404 · Route not found</p>
        <h1>This path is outside the current architecture.</h1>
        <p>The page may have moved, or the address may be incomplete.</p>
        <a className="button button--primary" href={withBasePath("/")}>
          Return to portfolio
        </a>
      </div>
    </section>
  );
}
