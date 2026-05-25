import React, { useState } from "react";
import { Send, Instagram, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import Reveal from "../components/Reveal";
import { submitContact } from "../lib/api";

const initial = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required");
      return;
    }
    setSubmitting(true);
    try {
      await submitContact(form);
      toast.success("Message received. We'll get back to you.");
      setForm(initial);
    } catch (err) {
      toast.error("Couldn't send message. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 md:pt-32" data-testid="contact-page">
      <section className="px-4 md:px-8 lg:px-12 border-b border-[#1a1a1a] pb-12">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-3">
            <span className="inline-block h-px w-8 align-middle bg-blood mr-2" />
            Get in touch
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-bone leading-none">
            Hit us<br /><span className="text-blood">sideways.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-bone/70">
            Wholesale, press, collabs, custom drops, or just a question about your fit. Drop a line.
          </p>
        </Reveal>
      </section>

      <section className="px-4 md:px-8 lg:px-12 py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-10">
          <Reveal>
            <div>
              <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-2">— Email</p>
              <a href="mailto:hello@lockedangle.co" className="font-display text-3xl md:text-4xl hover:text-blood transition-colors" data-testid="contact-email-link">
                hello@lockedangle.co
              </a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase mb-2">— HQ</p>
              <p className="font-display text-3xl text-bone leading-tight">
                Track-side warehouse<br /><span className="text-bone/50">Coordinates classified</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="space-y-3">
              <p className="font-mono text-[11px] tracking-[0.4em] text-blood uppercase">— Follow</p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Instagram, label: "@lockedangle" },
                  { Icon: Mail, label: "Newsletter" },
                  { Icon: MapPin, label: "Events" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-3 border border-[#222] font-mono text-[11px] tracking-widest uppercase hover:border-blood hover:text-blood transition-colors"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-5 border border-[#1a1a1a] p-6 md:p-10 bg-smoke" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.3em] text-bone/60 uppercase mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    className="w-full bg-ink border border-[#222] px-4 py-3 text-bone font-sans focus:border-blood outline-none"
                    data-testid="contact-input-name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.3em] text-bone/60 uppercase mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="w-full bg-ink border border-[#222] px-4 py-3 text-bone font-sans focus:border-blood outline-none"
                    data-testid="contact-input-email"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-[0.3em] text-bone/60 uppercase mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="Wholesale / Press / Collab / Other"
                  className="w-full bg-ink border border-[#222] px-4 py-3 text-bone font-sans focus:border-blood outline-none"
                  data-testid="contact-input-subject"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-[0.3em] text-bone/60 uppercase mb-2">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  required
                  className="w-full bg-ink border border-[#222] px-4 py-3 text-bone font-sans focus:border-blood outline-none resize-none"
                  data-testid="contact-input-message"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blood text-ink font-mono text-xs tracking-[0.3em] uppercase red-glow hover:bg-exhaust disabled:opacity-60 disabled:cursor-not-allowed"
                data-testid="contact-submit"
              >
                {submitting ? "Sending..." : "Send Message"}
                <Send size={14} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
