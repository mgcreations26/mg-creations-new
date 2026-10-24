"use client";

import Link from "next/link";
import { useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<FormState>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrorMsg(data.error ?? "Something went wrong. Please try again.");
                setStatus("error");
            } else {
                setStatus("sent");
            }
        } catch {
            setErrorMsg("Network error. Please check your connection and try again.");
            setStatus("error");
        }
    }

    return (
        <main className="flex min-h-screen flex-col bg-[#fffaf5] text-[#241f1b]">

            {/* ── HERO ── */}
            <section className="px-5 pb-12 pt-20 text-center lg:px-8">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#e85d3f]">
                    We&apos;d Love to Hear From You
                </p>
                <h1 className="mt-3 text-6xl font-black uppercase tracking-tight sm:text-7xl">
                    Contact Us
                </h1>
                <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-black/55">
                    Have a question, custom order request, or just want to say hi? Send us a message and we&apos;ll get back to you within 1–2 business days.
                </p>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="mx-auto w-full max-w-7xl flex-1 px-5 pb-24 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">

                    {/* ── INFO CARDS ── */}
                    <aside className="flex flex-col gap-5">
                        {/* Email */}
                        <div className="rounded-[1.75rem] bg-white p-7 border border-black/5 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0eb] text-[#e85d3f] text-2xl">
                                ✉️
                            </div>
                            <h2 className="mt-4 text-sm font-black uppercase tracking-widest text-black/40">Email Us</h2>
                            <a
                                href="mailto:hello@mgcreations.store"
                                id="contact-email-link"
                                className="mt-1 block text-lg font-black text-[#241f1b] hover:text-[#e85d3f] transition-colors"
                            >
                                hello@mgcreations.store
                            </a>
                        </div>

                        {/* Response time */}
                        <div className="rounded-[1.75rem] bg-white p-7 border border-black/5 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0eb] text-[#e85d3f] text-2xl">
                                🕐
                            </div>
                            <h2 className="mt-4 text-sm font-black uppercase tracking-widest text-black/40">Response Time</h2>
                            <p className="mt-1 text-lg font-black">1–2 Business Days</p>
                            <p className="mt-2 text-sm text-black/50 leading-relaxed">
                                We reply to every message. Mon – Fri, 9am–6pm EST.
                            </p>
                        </div>

                        {/* Custom orders */}
                        <div className="rounded-[1.75rem] bg-[#e85d3f] p-7 text-white shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">
                                🎨
                            </div>
                            <h2 className="mt-4 text-sm font-black uppercase tracking-widest text-white/70">Custom Orders</h2>
                            <p className="mt-1 text-lg font-black leading-snug">Want something made just for you?</p>
                            <p className="mt-2 text-sm text-white/75 leading-relaxed">
                                We love custom requests! Reach out with your idea and we&apos;ll make it happen.
                            </p>
                        </div>

                        {/* Quick links */}
                        <div className="rounded-[1.75rem] bg-white p-7 border border-black/5 shadow-sm">
                            <h2 className="text-sm font-black uppercase tracking-widest text-black/40">Quick Links</h2>
                            <div className="mt-4 flex flex-col gap-3">
                                {[
                                    { label: "FAQ", href: "/faq" },
                                    { label: "Shipping Policy", href: "/shipping" },
                                    { label: "Returns & Refunds", href: "/returns" },
                                ].map(({ label, href }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="flex items-center justify-between rounded-xl border border-black/5 bg-[#fffaf5] px-4 py-3 text-sm font-bold transition hover:border-[#e85d3f] hover:text-[#e85d3f]"
                                    >
                                        {label}
                                        <span className="text-[#e85d3f]">→</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* ── CONTACT FORM ── */}
                    <div className="rounded-[1.75rem] bg-white p-8 border border-black/5 shadow-sm lg:p-10">
                        {status === "sent" ? (
                            /* Success State */
                            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#fff0eb] text-4xl">
                                    ✅
                                </div>
                                <h2 className="mt-6 text-4xl font-black uppercase">Message Sent!</h2>
                                <p className="mx-auto mt-4 max-w-sm text-base text-black/55 leading-relaxed">
                                    Thanks for reaching out! We&apos;ll get back to you within 1–2 business days.
                                </p>
                                <button
                                    id="contact-send-another-btn"
                                    onClick={() => { setStatus("idle"); setErrorMsg(""); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                    className="mt-8 rounded-full border-2 border-[#e85d3f] px-7 py-3 text-sm font-black text-[#e85d3f] transition hover:bg-[#e85d3f] hover:text-white"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            /* Form */
                            <form id="contact-form" onSubmit={handleSubmit} noValidate>
                                <h2 className="text-3xl font-black uppercase tracking-tight">Send a Message</h2>
                                <p className="mt-2 text-sm text-black/45">
                                    Fill out the form below and we&apos;ll be in touch soon.
                                </p>

                                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                    {/* Name */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="contact-name" className="text-xs font-black uppercase tracking-widest text-black/40">
                                            Full Name *
                                        </label>
                                        <input
                                            id="contact-name"
                                            name="name"
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Jane Doe"
                                            className="rounded-xl border border-black/10 bg-[#fffaf5] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-black/25 focus:border-[#e85d3f] focus:ring-2 focus:ring-[#e85d3f]/15"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="contact-email" className="text-xs font-black uppercase tracking-widest text-black/40">
                                            Email Address *
                                        </label>
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="jane@email.com"
                                            className="rounded-xl border border-black/10 bg-[#fffaf5] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-black/25 focus:border-[#e85d3f] focus:ring-2 focus:ring-[#e85d3f]/15"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="mt-5 flex flex-col gap-2">
                                    <label htmlFor="contact-subject" className="text-xs font-black uppercase tracking-widest text-black/40">
                                        Subject *
                                    </label>
                                    <select
                                        id="contact-subject"
                                        name="subject"
                                        required
                                        value={form.subject}
                                        onChange={handleChange}
                                        className="rounded-xl border border-black/10 bg-[#fffaf5] px-4 py-3 text-sm font-medium outline-none transition focus:border-[#e85d3f] focus:ring-2 focus:ring-[#e85d3f]/15"
                                    >
                                        <option value="" disabled>Select a topic…</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="custom">Custom Order Request</option>
                                        <option value="shipping">Shipping Question</option>
                                        <option value="return">Return / Refund</option>
                                        <option value="wholesale">Wholesale Inquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="mt-5 flex flex-col gap-2">
                                    <label htmlFor="contact-message" className="text-xs font-black uppercase tracking-widest text-black/40">
                                        Message *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell us what's on your mind…"
                                        className="resize-none rounded-xl border border-black/10 bg-[#fffaf5] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-black/25 focus:border-[#e85d3f] focus:ring-2 focus:ring-[#e85d3f]/15"
                                    />
                                </div>

                                {/* Submit */}
                                <div className="mt-7 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <button
                                            id="contact-submit-btn"
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="rounded-full bg-[#e85d3f] px-9 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#d94f32] disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {status === "sending" ? "Sending…" : "Send Message →"}
                                        </button>
                                        <p className="text-xs text-black/35">* Required fields</p>
                                    </div>
                                    {status === "error" && errorMsg && (
                                        <div id="contact-error-msg" role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                            ⚠️ {errorMsg}
                                        </div>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main >
    );
}
