import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Nav = () => {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? "bg-ink/95 backdrop-blur-md border-b border-[#1a1a1a]" : "bg-transparent"
      }`}
      data-testid="site-nav"
    >
      <div className="px-4 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" data-testid="nav-logo">
          <span className="inline-block h-3 w-3 bg-blood" />
          <span className="font-display text-2xl md:text-3xl tracking-wide leading-none">
            LOCKED <span className="text-blood">/</span> ANGLE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.25em] transition-colors ${
                  isActive ? "text-blood" : "text-bone/80 hover:text-blood"
                }`
              }
              data-testid={`nav-link-${l.label.toLowerCase()}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 px-3 py-2 border border-[#222] hover:border-blood transition-colors"
            data-testid="nav-open-cart"
            aria-label="Open cart"
          >
            <ShoppingBag size={16} />
            <span className="font-mono text-xs tracking-widest">CART</span>
            <span
              className="ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-blood text-ink font-mono text-[11px] font-bold"
              data-testid="nav-cart-count"
            >
              {count}
            </span>
          </button>
          <button
            type="button"
            className="md:hidden p-2 border border-[#222] hover:border-blood"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#1a1a1a] bg-ink" data-testid="nav-mobile-menu">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `py-3 border-b border-[#1a1a1a] font-display text-2xl tracking-wide ${
                    isActive ? "text-blood" : "text-bone"
                  }`
                }
                data-testid={`nav-mobile-${l.label.toLowerCase()}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
