import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const { open, setOpen, items, subtotal, updateQty, remove, count } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        data-testid="cart-backdrop"
      />
      <aside
        className={`fixed top-0 right-0 z-[80] h-full w-full sm:w-[440px] bg-smoke border-l border-[#1a1a1a] transition-transform duration-500 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="cart-drawer"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 bg-blood" />
            <h3 className="font-display text-2xl">YOUR CART <span className="text-bone/40 text-base ml-2">({count})</span></h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:text-blood transition-colors"
            aria-label="Close cart"
            data-testid="cart-close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin" data-testid="cart-items">
          {items.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="font-display text-3xl text-bone/80">EMPTY GARAGE</p>
              <p className="font-mono text-xs tracking-widest text-bone/40 mt-2 uppercase">No gear in the cart yet</p>
              <button
                onClick={() => { setOpen(false); navigate("/shop"); }}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blood text-ink font-mono text-xs tracking-widest uppercase red-glow hover:bg-exhaust"
                data-testid="cart-empty-shop-cta"
              >
                Shop the range
              </button>
            </div>
          ) : (
            <ul>
              {items.map((it) => (
                <li
                  key={it.key}
                  className="flex gap-4 px-6 py-5 border-b border-[#1a1a1a]"
                  data-testid={`cart-item-${it.slug}`}
                >
                  <div className="w-20 h-24 bg-ink shrink-0 overflow-hidden">
                    <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-display text-lg leading-tight truncate">{it.name}</h4>
                        <p className="font-mono text-[10px] tracking-widest text-bone/50 uppercase mt-1">
                          {it.size ? `Size ${it.size}` : "One size"}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(it.key)}
                        className="text-bone/50 hover:text-blood"
                        aria-label="Remove"
                        data-testid={`cart-remove-${it.slug}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#222]">
                        <button
                          className="px-2 py-1 hover:text-blood"
                          onClick={() => updateQty(it.key, it.quantity - 1)}
                          aria-label="Decrease"
                          data-testid={`cart-dec-${it.slug}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 font-mono text-xs" data-testid={`cart-qty-${it.slug}`}>{it.quantity}</span>
                        <button
                          className="px-2 py-1 hover:text-blood"
                          onClick={() => updateQty(it.key, it.quantity + 1)}
                          aria-label="Increase"
                          data-testid={`cart-inc-${it.slug}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-mono text-sm">${(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#1a1a1a] px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-bone/60 uppercase">Subtotal</span>
              <span className="font-display text-2xl" data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-bone/40 uppercase">
              Shipping calculated at checkout
            </p>
            <button
              onClick={() => { setOpen(false); navigate("/checkout"); }}
              className="w-full px-6 py-4 bg-blood text-ink font-mono text-xs tracking-widest uppercase red-glow hover:bg-exhaust transition-colors"
              data-testid="cart-checkout-btn"
            >
              Checkout
            </button>
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="block text-center font-mono text-[11px] tracking-widest text-bone/60 hover:text-blood uppercase"
              data-testid="cart-continue-shopping"
            >
              Continue shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
