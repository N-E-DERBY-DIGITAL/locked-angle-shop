import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import Reveal from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { createOrder } from "../lib/api";

const initial = {
  full_name: "",
  email: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  notes: "",
};

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const shipping = useMemo(() => (subtotal >= 100 || subtotal === 0 ? 0 : 12), [subtotal]);
  const total = subtotal + shipping;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({
          product_id: i.product_id,
          slug: i.slug,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          image_url: i.image_url,
        })),
        subtotal,
        shipping,
        total,
        ...form,
      };
      const created = await createOrder(payload);
      setOrder(created);
      clear();
      toast.success(`Order ${created.order_number} confirmed`);
    } catch (err) {
      toast.error("Couldn't place order. Check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    return (
      <div className="pt-32 px-4 md:px-8 lg:px-12 min-h-[70vh]" data-testid="checkout-success">
        <div className="max-w-2xl">
          <CheckCircle2 size={48} className="text-blood" />
          <h1 className="mt-6 font-display text-6xl md:text-8xl text-bone leading-none">
            Order<br /><span className="text-blood">Locked in.</span>
          </h1>
          <p className="mt-6 text-bone/70">
            Thanks <span className="text-bone">{order.full_name}</span>. A confirmation has been logged for{" "}
            <span className="text-bone font-mono" data-testid="checkout-order-number">{order.order_number}</span>.
            You'll get an email at <span className="text-bone">{order.email}</span> once the gear ships.
          </p>
          <div className="mt-8 border border-[#1a1a1a] p-6 bg-smoke">
            <p className="font-mono text-[10px] tracking-widest text-bone/50 uppercase mb-4">Order Summary</p>
            <div className="space-y-2">
              {order.items.map((it) => (
                <div key={`${it.product_id}-${it.size}`} className="flex items-center justify-between text-sm">
                  <span className="text-bone/80">{it.name} × {it.quantity}</span>
                  <span className="font-mono">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#222] flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-bone/60 uppercase">Total</span>
              <span className="font-display text-2xl">${order.total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blood text-ink font-mono text-xs tracking-widest uppercase red-glow hover:bg-exhaust"
              data-testid="checkout-continue-shopping"
            >
              Keep shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#222] font-mono text-xs tracking-widest uppercase hover:border-blood hover:text-blood"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 px-4 md:px-8 lg:px-12 min-h-[60vh] flex flex-col items-center justify-center text-center" data-testid="checkout-empty">
        <p className="font-display text-6xl">EMPTY GARAGE</p>
        <p className="font-mono text-xs tracking-widest text-bone/40 mt-3 uppercase">Nothing to check out</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-8 px-8 py-4 bg-blood text-ink font-mono text-xs tracking-widest uppercase red-glow hover:bg-exhaust"
        >
          Shop the range
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32" data-testid="checkout-page">
      <section className="px-4 md:px-8 lg:px-12 border-b border-[#1a1a1a] pb-10">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-3">
            <span className="inline-block h-px w-8 align-middle bg-blood mr-2" />
            Checkout
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-6xl md:text-8xl text-bone leading-none">
            Final<br /><span className="text-blood">/ Lock in.</span>
          </h1>
        </Reveal>
      </section>

      <section className="px-4 md:px-8 lg:px-12 py-12 grid lg:grid-cols-12 gap-10">
        <form onSubmit={onSubmit} className="lg:col-span-7 space-y-6" data-testid="checkout-form">
          <fieldset className="space-y-4 border border-[#1a1a1a] p-6 bg-smoke">
            <legend className="font-display text-2xl px-2">Contact</legend>
            <div className="grid md:grid-cols-2 gap-4">
              <Field name="full_name" label="Full Name" value={form.full_name} onChange={onChange} required testId="checkout-fullname" />
              <Field name="email" label="Email" type="email" value={form.email} onChange={onChange} required testId="checkout-email" />
            </div>
            <Field name="phone" label="Phone (optional)" value={form.phone} onChange={onChange} testId="checkout-phone" />
          </fieldset>

          <fieldset className="space-y-4 border border-[#1a1a1a] p-6 bg-smoke">
            <legend className="font-display text-2xl px-2">Shipping Address</legend>
            <Field name="address_line1" label="Address Line 1" value={form.address_line1} onChange={onChange} required testId="checkout-address1" />
            <Field name="address_line2" label="Address Line 2" value={form.address_line2} onChange={onChange} testId="checkout-address2" />
            <div className="grid md:grid-cols-3 gap-4">
              <Field name="city" label="City" value={form.city} onChange={onChange} required testId="checkout-city" />
              <Field name="state" label="State / Region" value={form.state} onChange={onChange} testId="checkout-state" />
              <Field name="postal_code" label="Postal Code" value={form.postal_code} onChange={onChange} required testId="checkout-zip" />
            </div>
            <Field name="country" label="Country" value={form.country} onChange={onChange} required testId="checkout-country" />
          </fieldset>

          <fieldset className="space-y-4 border border-[#1a1a1a] p-6 bg-smoke">
            <legend className="font-display text-2xl px-2">Notes</legend>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.3em] text-bone/60 uppercase mb-2">Order Notes (optional)</label>
              <textarea
                name="notes"
                rows={3}
                value={form.notes}
                onChange={onChange}
                className="w-full bg-ink border border-[#222] px-4 py-3 text-bone font-sans focus:border-blood outline-none resize-none"
                data-testid="checkout-notes"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-blood text-ink font-mono text-xs tracking-[0.3em] uppercase red-glow hover:bg-exhaust disabled:opacity-60 disabled:cursor-not-allowed"
            data-testid="checkout-place-order"
          >
            <Lock size={14} />
            {submitting ? "Placing order..." : `Place Order — $${total.toFixed(2)}`}
          </button>
          <p className="font-mono text-[10px] tracking-widest text-bone/40 uppercase text-center">
            * This is a demo checkout. No payment is processed.
          </p>
        </form>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 border border-[#1a1a1a] bg-smoke">
            <div className="px-6 py-5 border-b border-[#1a1a1a]">
              <h3 className="font-display text-2xl">Your Order</h3>
            </div>
            <ul className="px-6 py-4 divide-y divide-[#1a1a1a]" data-testid="checkout-items">
              {items.map((it) => (
                <li key={it.key} className="py-4 flex gap-4">
                  <div className="w-16 h-20 bg-ink overflow-hidden shrink-0">
                    <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg leading-tight truncate">{it.name}</p>
                    <p className="font-mono text-[10px] tracking-widest text-bone/50 uppercase mt-1">
                      {it.size ? `Size ${it.size}` : "One size"} · Qty {it.quantity}
                    </p>
                  </div>
                  <p className="font-mono text-sm whitespace-nowrap">${(it.price * it.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="px-6 py-5 border-t border-[#1a1a1a] space-y-2">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} testId="checkout-subtotal" />
              <Row label="Shipping" value={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`} testId="checkout-shipping" />
              <div className="pt-3 border-t border-[#222] flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-bone/60 uppercase">Total</span>
                <span className="font-display text-3xl" data-testid="checkout-total">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

const Field = ({ name, label, type = "text", value, onChange, required, testId }) => (
  <div>
    <label className="block font-mono text-[10px] tracking-[0.3em] text-bone/60 uppercase mb-2">
      {label}{required && <span className="text-blood ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-ink border border-[#222] px-4 py-3 text-bone font-sans focus:border-blood outline-none"
      data-testid={testId}
    />
  </div>
);

const Row = ({ label, value, testId }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="font-mono text-[11px] tracking-widest text-bone/60 uppercase">{label}</span>
    <span className="font-mono" data-testid={testId}>{value}</span>
  </div>
);

export default Checkout;
