import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

const ABOUT_BG =
  "https://static.prod-images.emergentagent.com/jobs/0450ab58-01ee-41cf-8117-a1dd4e85d11b/images/1f779d9b1e8e2e0223c2e9e904cf1ace4bb8f7b91a4a5feea329d07f9f815ae7.png";

const PILLARS = [
  { no: "01", t: "Track First", d: "Every fit gets tested where the smoke is — paddocks, garages, late nights." },
  { no: "02", t: "Heavyweight", d: "Real fabric weights. Real construction. No flimsy garments to look good once and die in the wash." },
  { no: "03", t: "Numbered Batches", d: "Limited drops, batch-tagged. When it's gone, it's gone. No restocks." },
  { no: "04", t: "JDM Obsessed", d: "Made for people who can tell the difference between a 4G63 and a 2JZ from across the carpark." },
];

const About = () => (
  <div data-testid="about-page">
    {/* HERO */}
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <img src={ABOUT_BG} alt="Underground garage" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 vignette" />
      <div className="relative h-full px-4 md:px-8 lg:px-12 flex flex-col justify-end pb-12">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-4">
            <span className="inline-block h-px w-8 align-middle bg-blood mr-2" />
            Our Story
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-bone leading-[0.9]">
            We make gear<br />for the <span className="text-blood">sideways life.</span>
          </h1>
        </Reveal>
      </div>
    </section>

    {/* STORY */}
    <section className="px-4 md:px-8 lg:px-12 py-20 md:py-32 grid lg:grid-cols-12 gap-12">
      <Reveal className="lg:col-span-5">
        <p className="font-mono text-[11px] tracking-[0.4em] text-bone/50 uppercase">— Manifesto</p>
        <h2 className="mt-4 font-display text-5xl md:text-6xl text-bone leading-none">
          No boardroom.<br /><span className="text-blood">Just smoke.</span>
        </h2>
      </Reveal>
      <Reveal delay={120} className="lg:col-span-7 space-y-6 text-bone/75 text-lg leading-relaxed max-w-2xl">
        <p>
          Locked Angle wasn't built in a boardroom. It was built at the track — in the smoke, the noise and the sideways chaos that only drifters understand.
        </p>
        <p>
          We make gear for people who know what a locked angle feels like. Drivers, fans and JDM obsessives welcome. No posers. No compromises. Just the sideways life.
        </p>
        <p className="text-bone/60">
          Every piece in the line gets the same treatment: heavyweight fabric, considered cuts, numbered batches and the kind of detail you only notice after you've worn it ten times.
        </p>
      </Reveal>
    </section>

    {/* PILLARS */}
    <section className="px-4 md:px-8 lg:px-12 py-20 border-t border-[#1a1a1a]">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-3">
          <span className="inline-block h-px w-8 align-middle bg-blood mr-2" />
          The Code
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-bone leading-none mb-14">
          Four rules.<br /><span className="text-bone/40">No exceptions.</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
        {PILLARS.map((p, i) => (
          <Reveal key={p.no} delay={i * 80} className="bg-ink p-8 md:p-12">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase">{p.no}</p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl text-bone">{p.t}</h3>
                <p className="mt-3 text-bone/70 max-w-md">{p.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="px-4 md:px-8 lg:px-12 py-24 border-t border-[#1a1a1a]">
      <Reveal>
        <div className="max-w-3xl">
          <h2 className="font-display text-5xl md:text-7xl text-bone leading-none">
            Built for the <span className="text-blood">sideways.</span>
          </h2>
          <p className="mt-6 text-bone/70 max-w-xl">
            Pull up to the next drop. Get a piece while the batch is still warm.
          </p>
          <Link
            to="/shop"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-blood text-ink font-mono text-xs tracking-[0.3em] uppercase red-glow hover:bg-exhaust"
            data-testid="about-shop-cta"
          >
            Shop the range
            <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </section>
  </div>
);

export default About;
