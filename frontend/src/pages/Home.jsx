import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import Marquee from "../components/Marquee";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import { fetchFeatured } from "../lib/api";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/0450ab58-01ee-41cf-8117-a1dd4e85d11b/images/700c6f590b4e4053591209db060e11ce9470d226828e68da9207019cfdefb0f4.png";
const BANNER_BG =
  "https://static.prod-images.emergentagent.com/jobs/0450ab58-01ee-41cf-8117-a1dd4e85d11b/images/0813ed2140629a7c256d7c777cb6b8c18a09c2af0a1d7eb70bd2ad010e9df16b.png";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    fetchFeatured().then(setFeatured).catch(() => setFeatured([]));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
        data-testid="hero-section"
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.35}px, 0) scale(1.06)` }}
        >
          <img
            src={HERO_BG}
            alt="Drift car with massive smoke"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 vignette" />
          <div className="absolute inset-0 smoke-mask" />
        </div>

        {/* red side accent line */}
        <div className="absolute left-4 md:left-8 lg:left-12 top-1/3 bottom-1/3 w-px bg-blood/70" />

        <div className="relative h-full px-4 md:px-8 lg:px-12 flex flex-col justify-end pb-16 md:pb-24">
          <div className="max-w-5xl">
            <Reveal>
              <p className="font-mono text-[11px] md:text-xs tracking-[0.4em] uppercase text-blood mb-6">
                <span className="inline-block h-px w-10 align-middle bg-blood mr-3" />
                Locked Angle Supply Co. — Est. Sideways
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="font-display text-[14vw] sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] leading-[0.88] text-bone"
                data-testid="hero-headline"
              >
                BUILT FOR<br />
                THE <span className="text-blood">SIDEWAYS</span>
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-8 max-w-xl text-base md:text-lg text-bone/75 leading-relaxed">
                Gear for drivers, fans and JDM obsessives. Heavyweight cotton. Smoke-tested. Track-approved.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-blood text-ink font-mono text-xs tracking-[0.25em] uppercase red-glow hover:bg-exhaust transition-colors"
                  data-testid="hero-shop-cta"
                >
                  Shop the range
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 px-7 py-4 border border-bone/30 text-bone font-mono text-xs tracking-[0.25em] uppercase hover:border-blood hover:text-blood transition-colors"
                  data-testid="hero-about-cta"
                >
                  Our Story
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="absolute right-4 md:right-8 lg:right-12 bottom-10 hidden md:flex flex-col items-end gap-3 text-right">
            <span className="font-mono text-[10px] tracking-[0.4em] text-bone/50 uppercase">Scroll</span>
            <ChevronDown size={18} className="text-bone/50 animate-bounce" />
          </div>

          {/* corner stats */}
          <div className="absolute top-24 right-4 md:right-8 lg:right-12 hidden md:block text-right">
            <p className="font-mono text-[10px] tracking-[0.4em] text-bone/40 uppercase">N 35.6762° E 139.6503</p>
            <p className="font-mono text-[10px] tracking-[0.4em] text-bone/40 uppercase mt-1">SMOKE / STEEL / TANDEM</p>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* FEATURED PRODUCTS */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-32" data-testid="featured-section">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-3">
                <span className="inline-block h-px w-8 align-middle bg-blood mr-2" />
                Drop 001
              </p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-bone leading-none">
                Featured<br /><span className="text-blood">Heavyweights</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="self-start md:self-end inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase text-bone/70 hover:text-blood transition-colors"
              data-testid="featured-view-all"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
          {featured.length === 0 && (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-smoke border border-[#1a1a1a] animate-pulse" />
            ))
          )}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="relative bg-ink border-y border-[#1a1a1a]" data-testid="brand-statement">
        <div className="px-4 md:px-8 lg:px-12 py-24 md:py-40">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-8">
              <span className="inline-block h-px w-8 align-middle bg-blood mr-2" />
              Manifesto
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-bone max-w-6xl">
              Locked Angle wasn't built in a <span className="text-bone/40">boardroom.</span>
              <br />
              It was built at the <span className="text-blood">track</span> — in the smoke, the noise and the sideways chaos that only drifters understand.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COLLECTION BANNER */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden" data-testid="collection-banner">
        <img
          src={BANNER_BG}
          alt="Gritty streetwear model"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-transparent" />
        <div className="relative h-full px-4 md:px-8 lg:px-12 flex flex-col justify-center max-w-3xl">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-6">
              <span className="inline-block h-px w-8 align-middle bg-blood mr-2" />
              The Range
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-bone leading-none">
              No posers.<br />
              <span className="text-blood">No compromises.</span>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-md text-bone/75">
              Limited drops. Numbered batches. Built to be worn into the smoke, not framed on a wall.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 px-8 py-4 bg-blood text-ink font-mono text-xs tracking-[0.3em] uppercase red-glow hover:bg-exhaust"
                data-testid="banner-shop-cta"
              >
                Shop the range
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* small marquee bottom */}
      <Marquee speed="fast" phrases={["BUILT SIDEWAYS", "★", "TANDEM ONLY", "★", "SMOKE & STEEL", "★", "JDM OBSESSED", "★"]} />
    </div>
  );
};

export default Home;
