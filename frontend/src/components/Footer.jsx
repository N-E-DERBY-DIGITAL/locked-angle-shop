import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter, Music2 } from "lucide-react";

const Footer = () => (
  <footer className="bg-ink border-t border-[#1a1a1a] mt-24" data-testid="site-footer">
    <div className="px-4 md:px-8 lg:px-12 py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 bg-blood" />
          <span className="font-display text-3xl tracking-wide">
            LOCKED <span className="text-blood">/</span> ANGLE
          </span>
        </div>
        <p className="mt-6 max-w-md text-bone/60 text-sm leading-relaxed">
          Gear for drivers, fans and JDM obsessives. Built at the track. Shipped worldwide.
        </p>
        <div className="mt-8 flex items-center gap-3">
          {[
            { Icon: Instagram, label: "Instagram", href: "#" },
            { Icon: Youtube, label: "YouTube", href: "#" },
            { Icon: Twitter, label: "Twitter", href: "#" },
            { Icon: Music2, label: "TikTok", href: "#" },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="p-3 border border-[#222] hover:border-blood hover:text-blood transition-colors"
              data-testid={`footer-social-${label.toLowerCase()}`}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-xl text-bone">Shop</h4>
        <ul className="mt-4 space-y-2 text-sm">
          {[
            ["All", "/shop"],
            ["Tees", "/shop?category=TEES"],
            ["Hoodies", "/shop?category=HOODIES"],
            ["Outerwear", "/shop?category=OUTERWEAR"],
            ["Headwear", "/shop?category=HEADWEAR"],
            ["Accessories", "/shop?category=ACCESSORIES"],
          ].map(([label, to]) => (
            <li key={label}>
              <Link to={to} className="text-bone/70 hover:text-blood transition-colors" data-testid={`footer-shop-${label.toLowerCase()}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display text-xl text-bone">Info</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li><Link to="/about" className="text-bone/70 hover:text-blood transition-colors" data-testid="footer-link-about">About</Link></li>
          <li><Link to="/contact" className="text-bone/70 hover:text-blood transition-colors" data-testid="footer-link-contact">Contact</Link></li>
          <li><span className="text-bone/40">Shipping & Returns</span></li>
          <li><span className="text-bone/40">Privacy</span></li>
        </ul>
      </div>
    </div>

    <div className="px-4 md:px-8 lg:px-12 py-6 border-t border-[#1a1a1a] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <p className="font-mono text-[11px] tracking-widest text-bone/40 uppercase">
        © {new Date().getFullYear()} Locked Angle Supply Co. — Built sideways.
      </p>
      <p className="font-mono text-[11px] tracking-widest text-bone/40 uppercase">
        No posers. No compromises.
      </p>
    </div>
  </footer>
);

export default Footer;
