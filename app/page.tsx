/**
 * Lunas Landing Page — "Quiet Luxury" Premium Healthcare
 * Next.js App Router · Server Component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ScrollRevealFeatures } from "@/components/ScrollRevealFeatures";
import { ProblemSolution } from "@/components/ProblemSolution";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQTestimonials } from "@/components/FAQTestimonials";
import {
  Mail,
  ArrowRight,
  MapPin,
  Activity,
  AlertCircle,
  ShieldAlert,
  Pill as PillIcon,
  Heart,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Lunas — Your medical passport, always with you",
  description:
    "Lunas is a secure medical passport that gives first responders the right information at the right moment — through a single QR code.",
};

/* ────────────────────────────────────────────── */
/*  Pill Component                                */
/* ────────────────────────────────────────────── */

function MedicalTile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: any;
  label: string;
  value: string;
  tone: "ok" | "warn" | "danger";
}) {
  const toneColor =
    tone === "danger"
      ? "text-destructive"
      : tone === "warn"
        ? "text-amber-warm"
        : "text-sage";

  const toneBg =
    tone === "danger"
      ? "bg-destructive/10 border-destructive/20"
      : tone === "warn"
        ? "bg-amber-warm/10 border-amber-warm/20"
        : "bg-sage/10 border-sage/20";

  return (
    <div className={`flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300 hover:bg-white/5 hover:translate-y-[-2px] ${toneBg}`}>
      <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-night/40 backdrop-blur-sm border border-white/5`}>
        <Icon className={`h-4 w-4 ${toneColor}`} />
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-moonlight/30">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-semibold text-moonlight/90">{value}</div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Page                                          */
/* ────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory font-sans">
      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo variant="light" />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#why"
            className="transition-colors hover:text-foreground"
          >
            Why Lunas
          </a>
          <a href="#how" className="transition-colors hover:text-foreground">
            How it Works
          </a>
          <a href="#trust" className="transition-colors hover:text-foreground">
            Trust &amp; Security
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-foreground transition-colors hover:text-golden"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-night px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-glow"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-4">
        <div className="grid items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
          {/* Left — Copy */}
          <div>

            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tighter text-night md:text-7xl text-balance">
              Your medical passport,{" "}
              <em className="text-night/70">always with you.</em>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
              <span style={{ color: '#CFA157' }} className="font-semibold">Lunas</span> turns critical health information into a permanent QR code
              only verified medical professionals can read — so the people who
              treat you in an emergency see what matters in seconds.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-night px-7 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-glow"
              >
                Create your passport
              </Link>
              <Link
                href="/scan/demo-mp-2026-00428"
                className="rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-night transition-all hover:border-golden/40 hover:shadow-soft"
              >
                Try a demo scan
              </Link>
            </div>

          </div>

          {/* Right — Hero Card with Anti-Gravity effect */}
          <div className="group relative">
            {/* 3D Halo Glow Background */}
            <div className="absolute -inset-10 animate-pulse rounded-[3rem] bg-gradient-to-br from-golden/20 via-transparent to-amber-glow/10 blur-[80px]" />
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-night/40 via-transparent to-white/5 blur-2xl" />

            {/* Main Passport Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-night/90 p-8 text-moonlight shadow-2xl backdrop-blur-2xl transition-all duration-500 group-hover:scale-[1.01] group-hover:border-white/20">

              {/* Animated Glass Reflection Beam */}
              <div className="pointer-events-none absolute -left-[100%] top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 group-hover:left-[200%]" />

              {/* Top Glass Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-glow opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-glow"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-moonlight/40">
                    Live Emergency View
                  </span>
                </div>
                <div className="rounded-full border border-golden/20 bg-golden/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-golden">
                  Verified Identity
                </div>
              </div>

              {/* Patient Profile */}
              <div className="mt-10 flex items-end justify-between">
                <div>
                  <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
                    Maria Santos
                  </h2>
                  <div className="mt-3 flex items-center gap-4 text-xs font-medium tracking-widest text-moonlight/40">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3 w-3" /> 34 YEARS
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/10" />
                    <span className="flex items-center gap-1.5">
                      <Activity className="h-3 w-3" /> O-NEGATIVE
                    </span>
                  </div>
                </div>
                <div className="hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md sm:flex">
                  <div className="h-10 w-10 opacity-20 transition-opacity group-hover:opacity-40">
                    <Logo variant="light" />
                  </div>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Medical Data Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <MedicalTile
                  icon={ShieldAlert}
                  label="Critical Allergy"
                  value="Penicillin"
                  tone="danger"
                />
                <MedicalTile
                  icon={AlertCircle}
                  label="Food Allergy"
                  value="Shellfish"
                  tone="warn"
                />
                <MedicalTile
                  icon={Activity}
                  label="Condition"
                  value="Chronic Asthma"
                  tone="warn"
                />
                <MedicalTile
                  icon={PillIcon}
                  label="Medication"
                  value="Salbutamol"
                  tone="ok"
                />
              </div>

              {/* Bottom Drawer: Emergency Contact */}
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:bg-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-moonlight/30">
                      Primary Contact
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-base font-semibold">
                      Andres Santos
                      <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] font-medium uppercase text-moonlight/40">
                        Spouse
                      </span>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-golden/10 border border-golden/20">
                    <Heart className="h-4 w-4 text-golden" fill="currentColor" fillOpacity={0.1} />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-moonlight/50">
                  <span className="font-mono">+63 917 555 0142</span>
                </div>
              </div>

              {/* Holographic "Scan" Line */}
              <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full animate-[scan_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-golden/40 to-transparent opacity-20" />
            </div>

            {/* Secondary Floating Card (The Passport) */}
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-white/10 bg-night/80 p-4 shadow-2xl backdrop-blur-xl transition-all duration-700 hover:translate-y-[-10px] md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-golden/20 flex items-center justify-center">
                  <div className="h-6 w-6 border-2 border-golden rounded-sm flex items-center justify-center">
                    <div className="h-2 w-2 bg-golden rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-moonlight/40">
                    ID: MP-2026-004
                  </div>
                  <div className="text-xs font-semibold text-golden">
                    Permanent QR Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <ScrollRevealFeatures />

      {/* ═══════════════ PROBLEM & SOLUTION ═══════════════ */}
      <ProblemSolution />

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <HowItWorks />
      <FAQTestimonials />

      {/* ═══════════════ TRUST ═══════════════ */}
      <section id="trust" className="relative overflow-hidden bg-night py-32 text-moonlight">
        {/* Decorative background effects */}
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-golden/[0.03] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-amber-glow/[0.02] blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-20 text-center">
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tighter md:text-6xl text-balance">
              Privacy isn&apos;t a feature.
              <br /><span className="text-golden italic">It&apos;s the foundation.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-moonlight/40 leading-relaxed">
              Every design decision we make starts with your data sovereignty.
              We use the same standards as global financial institutions.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="inline-flex rounded-full bg-golden px-8 py-4 text-sm font-semibold text-night transition-all hover:shadow-moon hover:scale-105"
            >
              Create your free passport
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative bg-ivory text-muted-foreground overflow-hidden">
        {/* Decorative glow orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-golden/[0.04] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-amber-glow/[0.04] blur-[80px]" />

        {/* Thin golden divider */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-golden/20 to-transparent" />
        </div>

        {/* ── Main footer grid ── */}
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
            {/* Brand column */}
            <div className="space-y-5">
              <Logo variant="light" />
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground/70">
                A secure medical passport that gives first responders the right
                information at the right moment — through a single QR code.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                Philippines
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {/* Product */}
              <div>
                <h4 className="mb-4 font-display text-sm font-semibold tracking-wide text-night">
                  Product
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#features" className="transition-colors hover:text-golden">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#why" className="transition-colors hover:text-golden">
                      Why Lunas
                    </a>
                  </li>
                  <li>
                    <a href="#how" className="transition-colors hover:text-golden">
                      How it works
                    </a>
                  </li>
                  <li>
                    <a href="#trust" className="transition-colors hover:text-golden">
                      Security
                    </a>
                  </li>
                  <li>
                    <Link href="/scan/demo-mp-2026-00428" className="transition-colors hover:text-golden">
                      Demo scan
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="mb-4 font-display text-sm font-semibold tracking-wide text-night">
                  Resources
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Status
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="mb-4 font-display text-sm font-semibold tracking-wide text-night">
                  Legal
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/privacy" className="transition-colors hover:text-golden">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Data Processing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="mb-4 font-display text-sm font-semibold tracking-wide text-night">
                  Connect
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Partnerships
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-golden">
                      Press Kit
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── Newsletter CTA bar ── */}
        <div className="mx-auto max-w-6xl px-6 mb-10">
          <div className="rounded-2xl border border-border/50 bg-white px-8 py-6 shadow-soft">
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-golden/10">
                  <Mail className="h-5 w-5 text-golden" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-night">
                    Stay informed
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Product updates, security advisories, and healthcare news.
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center gap-3 md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-border bg-ivory px-4 py-2.5 text-sm text-night placeholder-muted-foreground/50 outline-none transition-colors focus:border-golden/30 focus:ring-1 focus:ring-golden/20"
                  />
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-night px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-glow">
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* ── Bottom bar ── */}
        <div className="border-t border-border/50">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
            <div className="text-xs text-muted-foreground/50">
              © {new Date().getFullYear()} Lunas · Team Otso-Otso · A SIKAPTala
              Ideathon project
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground/50">
              <Link href="/privacy" className="transition-colors hover:text-golden">
                Privacy
              </Link>
              <a href="#" className="transition-colors hover:text-golden">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-golden">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
