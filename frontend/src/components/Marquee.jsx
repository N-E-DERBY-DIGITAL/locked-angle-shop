import React from "react";

const DEFAULT_PHRASES = [
  "LOCKED ANGLE",
  "DRIFT CULTURE",
  "JDM",
  "BUILT SIDEWAYS",
  "SMOKE & STEEL",
];

export const Marquee = ({ phrases = DEFAULT_PHRASES, speed = "normal" }) => {
  const speedClass = speed === "fast" ? "animate-marquee-fast" : "animate-marquee";
  const block = phrases.map((p, i) => (
    <span key={i} className="inline-flex items-center gap-8 mx-8">
      <span className="font-display text-4xl md:text-5xl lg:text-6xl text-bone tracking-wide">
        {p}
      </span>
      <span className="text-blood font-display text-4xl md:text-5xl lg:text-6xl">·</span>
    </span>
  ));

  return (
    <div
      className="relative w-full overflow-hidden border-y border-[#222] bg-ink py-6"
      data-testid="ticker-marquee"
    >
      <div className={`flex w-max ${speedClass}`}>
        <div className="flex shrink-0 items-center">{block}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{block}</div>
      </div>
    </div>
  );
};

export default Marquee;
