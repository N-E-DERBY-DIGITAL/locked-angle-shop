import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import { fetchProducts, fetchCategories } from "../lib/api";

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
  { key: "name", label: "A–Z" },
];

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const initialCategory = (params.get("category") || "ALL").toUpperCase();
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    const q = category === "ALL" ? {} : { category };
    fetchProducts(q)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));

    if (category === "ALL") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    setParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    else if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    else arr.sort((a, b) => Number(b.featured) - Number(a.featured));
    return arr;
  }, [products, sort]);

  const tabs = ["ALL", ...categories];

  return (
    <div className="pt-28 md:pt-32" data-testid="shop-page">
      <section className="px-4 md:px-8 lg:px-12 border-b border-[#1a1a1a] pb-10">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-3">
            <span className="inline-block h-px w-8 align-middle bg-blood mr-2" />
            The Range
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-bone leading-none">
            Shop <span className="text-blood">/</span> Range
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-bone/70">
            Heavyweight cotton, numbered batches and gear built to take abuse. Filter by category below.
          </p>
        </Reveal>
      </section>

      <section className="px-4 md:px-8 lg:px-12 py-8 border-b border-[#1a1a1a]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-wrap gap-2" data-testid="shop-categories">
            {tabs.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 font-mono text-[11px] tracking-[0.25em] uppercase border transition-colors ${
                  category === c
                    ? "border-blood text-bone bg-blood/10"
                    : "border-[#222] text-bone/60 hover:border-blood hover:text-blood"
                }`}
                data-testid={`shop-cat-${c.toLowerCase()}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-bone/50 uppercase">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-ink border border-[#222] px-3 py-2 font-mono text-xs tracking-widest uppercase text-bone hover:border-blood focus:border-blood outline-none"
              data-testid="shop-sort"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-12 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-smoke border border-[#1a1a1a] animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-4xl text-bone">NOTHING IN THIS CATEGORY</p>
            <p className="font-mono text-xs tracking-widest text-bone/50 mt-3 uppercase">Try another filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" data-testid="shop-grid">
            {sorted.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;
