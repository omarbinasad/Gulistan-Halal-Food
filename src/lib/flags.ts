/** Flag-inspired colour stripes used as a lightweight emblem (no image assets needed). */
const flagStripes: Record<string, string[]> = {
  BD: ["#006a4e", "#f42a41", "#006a4e"],
  IN: ["#ff9933", "#ffffff", "#138808"],
  NP: ["#dc143c", "#003893"],
  PK: ["#ffffff", "#01411c", "#01411c"],
  TH: ["#a51931", "#f4f5f8", "#2d2a4a", "#f4f5f8", "#a51931"],
  ID: ["#ce1126", "#ffffff"],
  MY: ["#cc0001", "#ffffff", "#010066"],
  VN: ["#da251d", "#ffcd00", "#da251d"],
  BR: ["#009c3b", "#ffdf00", "#002776"],
};

/** CSS background for a country's emblem circle. */
export function flagBackground(countryCode: string): string {
  const colors = flagStripes[countryCode] ?? ["#0d5a45", "#f5efe4"];
  const step = 100 / colors.length;
  return `linear-gradient(180deg, ${colors.map((c, i) => `${c} ${i * step}% ${(i + 1) * step}%`).join(", ")})`;
}
