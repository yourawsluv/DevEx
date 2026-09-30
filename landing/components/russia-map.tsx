import { readFileSync } from "node:fs";
import path from "node:path";

const PIN = /<path d="M(-?\d+\.?\d*)\s+(-?\d+\.?\d*)[^"]*" fill="#00FFFF"/g;

/** Cyan venue marks, ordered west to east so they switch on in a sweep. */
function tagVenuePins(svg: string) {
  const found = [...svg.matchAll(PIN)];
  const order = found
    .map((match, index) => ({ index, x: Number(match[1]), y: Number(match[2]) }))
    .sort((a, b) => a.x - b.x || a.y - b.y);
  const rank = new Map(order.map((item, index) => [item.index, index]));
  let index = 0;
  return svg.replace(PIN, (path) => {
    const i = rank.get(index++) ?? 0;
    return path
      .replace("<path ", `<path class="venue-pin" style="--i:${i}" `)
      .replace('fill="#00FFFF"', 'fill="currentColor"');
  });
}

export function RussiaMap() {
  const svg = tagVenuePins(
    readFileSync(path.join(process.cwd(), "public/brand/map-russia.svg"), "utf8"),
  );

  return (
    <>
      <div
        role="img"
        aria-label="Карта заведений, внедривших систему автоматизации Гуляш"
        className="russia-map map-reveal text-paper [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var el=document.querySelector(".map-reveal:not(.pins-play)");if(!el||el.dataset.pinsBound)return;el.dataset.pinsBound="1";var play=function(){el.classList.add("pins-play");window.removeEventListener("scroll",onScroll);if(io)io.disconnect();if(timer)clearInterval(timer);};if(matchMedia("(prefers-reduced-motion: reduce)").matches){play();return;}var visible=function(){var r=el.getBoundingClientRect(),v=window.innerHeight,s=Math.min(r.bottom,v)-Math.max(r.top,0);return s>48&&s>Math.min(r.height,v)*0.18;};var io=null,timer=null,onScroll=function(){if(visible())play();};io=new IntersectionObserver(function(entries){if(entries.some(function(e){return e.isIntersecting;}))onScroll();},{threshold:[0,0.12,0.3]});io.observe(el);onScroll();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("load",onScroll);var n=0;timer=setInterval(function(){n++;onScroll();if(n>40)clearInterval(timer);},100);})();`,
        }}
      />
    </>
  );
}
