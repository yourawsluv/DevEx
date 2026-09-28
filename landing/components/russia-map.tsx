import { readFileSync } from "node:fs";
import path from "node:path";

export function RussiaMap() {
  const svg = readFileSync(path.join(process.cwd(), "public/brand/map-russia.svg"), "utf8");

  return (
    <div
      role="img"
      aria-label="Карта заведений, внедривших систему автоматизации Гуляш"
      className="russia-map text-paper [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
