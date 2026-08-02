type TagListProps = {
  items: readonly string[];
  compact?: boolean;
};

export function TagList({ items, compact = false }: TagListProps) {
  return (
    <ul className={compact ? "tag-list tag-list--compact" : "tag-list"}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
