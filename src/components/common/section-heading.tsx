type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  headingId,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
