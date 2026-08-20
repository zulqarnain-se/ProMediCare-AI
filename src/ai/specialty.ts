/**
 * Snaps a model-suggested specialty name onto an allowed hospital specialty list.
 * Prefers exact case-insensitive match, then fuzzy substring, then first allowed / General Medicine.
 */
export function snapSpecialtyToAllowed(recommended: string, names: string[]): string {
  const matched = names.find(
    (n) => n.trim().toLowerCase() === recommended.trim().toLowerCase(),
  );
  if (matched) return matched;

  const fuzzy = names.find((n) => {
    const a = n.trim().toLowerCase();
    const b = recommended.trim().toLowerCase();
    return a.includes(b) || b.includes(a);
  });
  return fuzzy ?? names[0] ?? "General Medicine";
}
