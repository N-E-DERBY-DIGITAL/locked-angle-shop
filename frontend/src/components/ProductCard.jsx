import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, index = 0 }) => {
  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group block bg-smoke border border-[#1d1d1d] hover:border-blood transition-colors duration-300"
      data-testid={`product-card-${product.slug}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-bone/70 bg-ink/70 px-2 py-1 border border-[#222]">
            {String(index + 1).padStart(2, "0")} / {product.category}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "inset 0 -60px 80px -20px rgba(230,32,32,0.25)" }}
        />
      </div>
      <div className="flex items-start justify-between px-4 py-4 gap-4">
        <div>
          <h3 className="font-display text-xl md:text-2xl text-bone leading-none">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="font-mono text-[11px] tracking-widest text-bone/50 mt-2 uppercase">
              {product.tagline}
            </p>
          )}
        </div>
        <div className="font-mono text-sm text-bone whitespace-nowrap pt-1" data-testid={`product-price-${product.slug}`}>
          ${product.price.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
