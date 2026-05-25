import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Shield, Truck, RotateCcw } from "lucide-react";
import Reveal from "../components/Reveal";
import { fetchProductBySlug } from "../lib/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        if (p.sizes && p.sizes.length === 1) setSize(p.sizes[0]);
      })
      .catch(() => setProduct(null));
  }, [slug]);

  if (product === null) {
    return (
      <div className="pt-32 px-4 md:px-8 lg:px-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="font-display text-5xl">Product not found</p>
        <Link to="/shop" className="mt-6 font-mono text-xs tracking-widest text-blood uppercase hover:underline">
          ← Back to shop
        </Link>
      </div>
    );
  }

  if (!product.slug) {
    return (
      <div className="pt-32 px-4 md:px-8 lg:px-12 grid lg:grid-cols-2 gap-8">
        <div className="aspect-[4/5] bg-smoke animate-pulse" />
        <div className="space-y-4">
          <div className="h-12 bg-smoke animate-pulse" />
          <div className="h-6 w-32 bg-smoke animate-pulse" />
        </div>
      </div>
    );
  }

  const onAdd = () => {
    if (product.sizes?.length > 1 && !size) {
      setError("Choose a size");
      return;
    }
    setError("");
    add(product, { quantity: qty, size });
  };

  return (
    <div className="pt-24 md:pt-28" data-testid="product-detail">
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-bone/60 hover:text-blood uppercase"
          data-testid="product-back"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="relative bg-ink lg:sticky lg:top-20 self-start">
          <div className="aspect-[4/5] lg:aspect-auto lg:h-[calc(100vh-5rem)] overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
              data-testid="product-image"
            />
          </div>
          <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest bg-ink/70 border border-[#222] px-2 py-1 uppercase">
            {product.category}
          </div>
        </div>

        <div className="px-4 md:px-8 lg:px-12 py-12 lg:py-20">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-3">
              <span className="inline-block h-px w-6 align-middle bg-blood mr-2" />
              {product.category}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-5xl md:text-7xl text-bone leading-none" data-testid="product-name">
              {product.name}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 font-display text-3xl text-bone" data-testid="product-price">
              ${product.price.toFixed(2)}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-8 text-bone/75 leading-relaxed max-w-xl">{product.description}</p>
          </Reveal>

          {product.sizes?.length > 0 && (
            <Reveal delay={300}>
              <div className="mt-10">
                <p className="font-mono text-[11px] tracking-[0.3em] text-bone/60 uppercase mb-3">Size</p>
                <div className="flex flex-wrap gap-2" data-testid="product-sizes">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[52px] px-4 py-3 font-mono text-xs tracking-widest uppercase border transition-colors ${
                        size === s
                          ? "border-blood bg-blood/10 text-bone"
                          : "border-[#222] text-bone/70 hover:border-blood hover:text-bone"
                      }`}
                      data-testid={`product-size-${s.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-[#222]">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 hover:text-blood"
                  aria-label="Decrease"
                  data-testid="product-qty-dec"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 font-mono text-sm" data-testid="product-qty">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-3 hover:text-blood"
                  aria-label="Increase"
                  data-testid="product-qty-inc"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={onAdd}
                className="flex-1 min-w-[220px] px-8 py-4 bg-blood text-ink font-mono text-xs tracking-[0.3em] uppercase red-glow hover:bg-exhaust"
                data-testid="product-add-to-cart"
              >
                Add to cart — ${(product.price * qty).toFixed(2)}
              </button>
            </div>
            {error && <p className="mt-3 text-blood font-mono text-xs tracking-widest uppercase" data-testid="product-error">{error}</p>}
          </Reveal>

          <Reveal delay={440}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#1a1a1a] pt-8">
              {[
                { Icon: Truck, t: "Free Shipping", s: "Orders over $100" },
                { Icon: RotateCcw, t: "30-Day Returns", s: "Unworn, with tags" },
                { Icon: Shield, t: "Numbered Batch", s: "Limited per drop" },
              ].map(({ Icon, t, s }) => (
                <div key={t} className="flex items-start gap-3">
                  <Icon size={18} className="text-blood mt-1" />
                  <div>
                    <p className="font-display text-base text-bone">{t}</p>
                    <p className="font-mono text-[10px] tracking-widest text-bone/50 uppercase mt-1">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
