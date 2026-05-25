# Locked Angle Supply Co. — PRD

## Original Problem Statement
Build a full ecommerce website called **Locked Angle Supply Co.** — a raw, aggressive drift car culture streetwear brand.
Design aesthetic: Dark luxury meets motorsport aggression. High-end streetwear colliding with underground JDM culture.
Colours: #0a0a0a base, #f0ede8 text, #e62020 red accent, #ff5500 exhaust orange. Used sparingly as power accents.
Typography: Large, bold, condensed headers. Heavy uppercase display fonts + clean body text.
Motion: Smooth scroll, fade/slide on scroll, hero parallax, red glow hover, grain overlay.
Pages: Homepage, Shop, About, Contact. Features: product grid + filters, Add to Cart, mobile responsive, clean checkout.
Vibe: Supreme meets Formula Drift; Highsnobiety meets JDM underground. Dark, cinematic, powerful.

## User Choices
- Checkout: **Mock checkout** (Shopify deferred)
- Products: **Seeded sample catalog** (admin panel deferred — user will connect Shopify later)
- Auth: **Guest checkout only**
- Product images: **AI-curated / dark streetwear stock**
- Contact form: **Saves to DB only** (real email deferred)

## Architecture
- **Backend**: FastAPI + MongoDB (Motor async). Single `server.py` exposing `/api/*` routes. Seeds 12 products on startup if empty.
- **Frontend**: React 19 + React Router 7 + Tailwind + Shadcn UI primitives (Toaster/Sonner). Cart state in `CartContext` (localStorage-backed). IntersectionObserver-based `Reveal` for scroll-in animations. CSS-only marquee + parallax (no framer-motion dependency).
- **Design system**: Bebas Neue (display) + Chivo (body), square-edge components, fixed grain overlay, red/orange accents only.

## Personas
- **The Driver**: Owns a JDM build, tracks weekends. Wants heavyweight gear that survives paddock abuse.
- **The Fan**: Doesn't drift but lives the culture. Wants tees/hoodies with credible references.
- **The Collector**: Buys numbered drops. Cares about batch numbers, fabric weight, limited availability.

## Core Requirements (Static)
- Dark, cinematic, motorsport aggression aesthetic
- Pages: Home, Shop, Product Detail, About, Contact, Checkout
- Product grid with category filters + sort
- Add to Cart with size + qty
- Cart drawer with edit/remove
- Mock checkout that persists order with `LA-XXXXXXXX` order number
- Contact form persistence
- Mobile responsive nav with hamburger menu
- No purple gradients, no pastels, no rounded bubbly fonts, no generic AI look

## What's Been Implemented (2026-02-25)
- ✅ Backend: `/api/products` (+ category/featured filters), `/api/products/featured`, `/api/categories`, `/api/products/{slug}`, `/api/orders` (POST + GET), `/api/contact` (POST)
- ✅ 12 seeded products across 5 categories (TEES, HOODIES, OUTERWEAR, HEADWEAR, ACCESSORIES) with curated images and copy
- ✅ Homepage: Cinematic hero with parallax + grain + red accent line + headline "BUILT FOR THE SIDEWAYS", marquee ticker, featured products, brand statement, collection banner with CTA, secondary marquee
- ✅ Shop page with category tabs and sort
- ✅ Product detail page with size selection, qty stepper, Add to Cart
- ✅ Cart drawer (slide-in) with qty/remove and checkout entry
- ✅ Checkout page with form, validation, order summary, success screen
- ✅ About page with brand story + 4 pillars
- ✅ Contact page with form (saves to DB, toast feedback)
- ✅ Persistent fixed nav, animated mobile menu, minimal footer with social links
- ✅ Scroll-reveal animations, red-glow button hover, smoke/grain overlay
- ✅ data-testid attributes on every interactive + key info element
- ✅ Full backend + frontend testing — 100% pass

## Prioritized Backlog
### P0 (none — MVP complete)
### P1 (post-MVP enhancements)
- Connect real Shopify Storefront API (replace seed products + add Shopify Checkout redirect)
- Real email for contact form (Resend / SendGrid)
- Real payment integration (Stripe) for non-Shopify path
- Product image gallery (multiple images per product) + zoom
- Wishlist / saved items
- Search bar in Shop
- Newsletter signup with double opt-in
### P2 (growth)
- Lookbook / editorial pages tied to drops
- Customer reviews + photos (UGC)
- "Limited stock" countdown for numbered batches
- Admin dashboard (orders, contacts, stock)
- Affiliate / referral program for drivers/teams

## Next Tasks
1. User to provide Shopify Storefront API creds or Stripe key when ready to enable real checkout
2. User to provide Resend/SendGrid key + verified sender for live contact form emails
3. Consider P1 wishlist + search as next sprint
