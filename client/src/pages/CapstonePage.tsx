/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * Capstone page: the fourth year design project (TerraScan) in full, linked
 * from the capstone card on the home page. Gallery + summary card,
 * contributions, device drivers, documents, system pipeline and term timeline.
 * Content lives in lib/capstone.ts.
 */

import DocumentViewer from "@/components/DocumentViewer";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCloseOnBack } from "@/hooks/useCloseOnBack";
import { capstone } from "@/lib/capstone";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Eye,
  Maximize2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function CapstonePage() {
  const [active, setActive] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  // href of the document open in the viewer
  const [openDoc, setOpenDoc] = useState<string | null>(null);
  const image = capstone.gallery[active];

  useCloseOnBack(fullScreen, () => setFullScreen(false), "capstoneFullScreen");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* CONTENT - no photo strip like the project pages, since the gallery
          below opens with the same photo */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Dot-grid texture, faded out at the top and bottom edges */}
        <div className="absolute inset-0 dot-grid opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />

        <div className="container relative">
          {/* Back */}
          <Link href="/#capstone">
            <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 mb-12 group animate-fade-up">
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <span
                className="font-body text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Back to home
              </span>
            </div>
          </Link>

          {/* Page header */}
          <div className="flex items-center gap-3 mb-4 animate-fade-up-delay-1">
            <div className="v-rule h-6" />
            <span
              className="font-mono-custom text-xs tracking-widest uppercase text-primary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Capstone
            </span>
          </div>
          <h1
            className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-14 animate-fade-up-delay-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fourth Year
            <br />
            Design <em className="text-primary not-italic">Project</em>
          </h1>

          {/* Feature card: gallery + summary */}
          <div className="grid grid-cols-1 lg:grid-cols-5 bg-card border border-border rounded-xl overflow-hidden animate-fade-up-delay-3">
            {/* Gallery */}
            <div className="lg:col-span-3 bg-secondary/60 border-b lg:border-b-0 lg:border-r border-border">
              <button
                type="button"
                onClick={() => setFullScreen(true)}
                aria-label={`View full screen: ${image.alt}`}
                className={`group relative flex items-center justify-center w-full aspect-[4/3] overflow-hidden ${
                  image.fit === "cover"
                    ? "bg-card"
                    : "bg-secondary dot-grid p-5 sm:p-8"
                }`}
              >
                {/* Photos fill the frame; screenshots and diagrams float on the grid */}
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={`animate-in fade-in duration-300 ${
                    image.fit === "cover"
                      ? "w-full h-full object-cover"
                      : "max-w-full max-h-full rounded-md shadow-lg"
                  }`}
                />
                <span className="absolute top-3 right-3 p-2 rounded-md bg-background/80 backdrop-blur-sm text-muted-foreground opacity-80 group-hover:opacity-100 group-hover:text-primary transition-all duration-200">
                  <Maximize2 size={14} />
                </span>
              </button>

              {/* Full-screen view: closes on X, Esc, a click on the backdrop, or Back */}
              <Dialog open={fullScreen} onOpenChange={setFullScreen}>
                <DialogPortal>
                  <DialogOverlay className="bg-black/95" />
                  <DialogPrimitive.Content
                    aria-describedby={undefined}
                    onClick={() => setFullScreen(false)}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 sm:p-10 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-200"
                  >
                    <DialogTitle className="sr-only">{image.alt}</DialogTitle>
                    <img
                      src={image.src}
                      alt={image.alt}
                      onClick={e => e.stopPropagation()}
                      className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
                    />
                    <p
                      className="font-body text-sm text-white/80 text-center max-w-2xl"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {image.caption}
                    </p>
                    <DialogClose
                      aria-label="Close full-screen view"
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
                    >
                      <X size={20} />
                    </DialogClose>
                  </DialogPrimitive.Content>
                </DialogPortal>
              </Dialog>
              <div className="p-4 sm:p-5">
                <p
                  className="font-body text-xs text-muted-foreground mb-4 min-h-[2.5em]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {image.caption}
                </p>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {capstone.gallery.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show image: ${img.caption}`}
                      aria-pressed={i === active}
                      className={`aspect-[4/3] rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        i === active
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt=""
                        className="w-full h-full object-cover bg-card"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2 p-6 md:p-8 flex flex-col">
              <span
                className="inline-flex self-start items-center gap-2 px-3 py-1 mb-5 rounded-full bg-accent text-accent-foreground font-mono-custom text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {capstone.status}
              </span>

              <h2
                className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {capstone.title}
              </h2>
              <p
                className="font-body text-sm text-primary font-medium mb-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {capstone.tagline}
              </p>
              <p
                className="font-mono-custom text-xs text-muted-foreground mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {capstone.course}
              </p>

              <div className="flex items-start gap-3 p-3 mb-6 rounded-lg border border-border">
                <Award
                  size={18}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <div>
                  <p
                    className="font-body text-sm font-medium text-foreground leading-snug"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {capstone.award.title}
                  </p>
                  <p
                    className="font-body text-xs text-muted-foreground leading-relaxed mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {capstone.award.detail}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {capstone.overview.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-body text-sm leading-relaxed text-foreground"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-accent/60 mb-8">
                <p
                  className="font-mono-custom text-xs tracking-widest uppercase text-primary mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  My role
                </p>
                <p
                  className="font-body text-sm leading-relaxed text-foreground"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {capstone.role}
                </p>
              </div>

              <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {capstone.stats.map(stat => (
                  <div key={stat.label}>
                    <p
                      className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-foreground whitespace-nowrap"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="font-body text-xs text-muted-foreground leading-snug mt-1"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What I built, drivers, documents. How it works sits beside What I
            built on desktop and comes after the documents on phones. */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-x-16 lg:gap-y-20 mt-16 lg:mt-20">
            <div className="lg:col-span-3 lg:row-start-1">
              <h2
                className="font-display text-2xl font-semibold text-foreground mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What I built
              </h2>
              <ul className="space-y-5">
                {capstone.contributions.map(item => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <p
                      className="font-body text-sm text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span className="font-medium text-foreground">
                        {item.title}.
                      </span>{" "}
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Device drivers: one card per part, then the bus layer they sit on */}
            <div className="lg:col-span-5">
              <h2
                className="font-display text-2xl font-semibold text-foreground mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Device drivers
              </h2>
              <p
                className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {capstone.driversNote}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...capstone.drivers, capstone.driverBase].map(driver => {
                  const isBase = driver === capstone.driverBase;
                  const Icon = driver.icon;
                  return (
                    <li
                      key={driver.part}
                      className={`flex flex-col p-5 rounded-xl border ${
                        isBase
                          ? "border-dashed border-border bg-secondary/40"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <span
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                            isBase
                              ? "bg-secondary text-muted-foreground"
                              : "bg-accent text-primary"
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <span
                          className="px-2 py-0.5 rounded border border-border font-mono-custom text-[0.65rem] uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {driver.bus}
                        </span>
                      </div>
                      <p
                        className="font-display text-lg font-semibold text-foreground leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {driver.part}
                      </p>
                      <p
                        className="font-body text-xs font-medium text-primary mt-1 mb-3"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {driver.kind}
                      </p>
                      <p
                        className="font-body text-sm text-muted-foreground leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {driver.detail}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <h2
                className="font-display text-2xl font-semibold text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Documents
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* The whole card opens the viewer (the title button's ::after
                    covers it); the download link sits above that layer */}
                {capstone.documents.map(doc => (
                  <div
                    key={doc.href}
                    className="group relative flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/60 transition-colors duration-200"
                  >
                    <img
                      src={doc.preview}
                      alt=""
                      className="w-16 sm:w-20 aspect-[17/22] object-cover object-top rounded border border-border bg-white flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => setOpenDoc(doc.href)}
                        aria-label={`Preview ${doc.title}`}
                        className="text-left font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {doc.title}
                      </button>
                      <p
                        className="font-mono-custom text-xs text-muted-foreground mt-0.5"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {doc.meta}
                      </p>
                      <p
                        className="font-body text-xs text-muted-foreground leading-relaxed mt-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {doc.description}
                      </p>
                      <div
                        className="flex items-center gap-5 mt-3 font-body text-xs font-medium"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <span className="inline-flex items-center gap-1.5 text-primary">
                          <Eye size={14} />
                          Preview
                        </span>
                        <a
                          href={doc.href}
                          download={`${capstone.title} ${doc.title}.pdf`}
                          className="relative z-10 inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          <ArrowDownToLine size={14} />
                          Download PDF
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {capstone.documents.map(doc => (
                <DocumentViewer
                  key={doc.href}
                  doc={doc}
                  downloadName={`${capstone.title} ${doc.title}.pdf`}
                  open={openDoc === doc.href}
                  onOpenChange={open => setOpenDoc(open ? doc.href : null)}
                />
              ))}
            </div>

            <div className="lg:col-span-2 lg:col-start-4 lg:row-start-1">
              <h2
                className="font-display text-2xl font-semibold text-foreground mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How it works
              </h2>
              <p
                className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="inline-block h-3 w-3 rounded-sm border-2 border-primary/60 bg-accent" />
                My part of the system
              </p>
              <ol>
                {capstone.pipeline.map((step, i) => (
                  <li key={step.stage}>
                    {i > 0 && (
                      <div
                        className="flex justify-center py-1.5 text-muted-foreground/60"
                        aria-hidden="true"
                      >
                        <ArrowDown size={14} />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-lg border ${
                        step.mine
                          ? "border-primary/60 bg-accent/60"
                          : "border-border bg-card"
                      }`}
                    >
                      <p
                        className={`font-mono-custom text-xs tracking-widest uppercase mb-1 ${
                          step.mine ? "text-primary" : "text-muted-foreground"
                        }`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {step.stage}
                      </p>
                      <p
                        className="font-body text-sm text-foreground leading-snug"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap gap-2 mt-8">
                {capstone.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full font-mono-custom text-xs"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16 lg:mt-20 p-6 md:p-8 bg-card border border-border rounded-xl">
            <h2
              className="font-display text-2xl font-semibold text-foreground mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Where it's at
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
              {capstone.terms.map(term => (
                <div key={term.course}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5 md:pr-6">
                    <span
                      className="font-mono-custom text-xs tracking-widest uppercase text-foreground"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {term.course}
                    </span>
                    <span
                      className="font-mono-custom text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {term.term}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono-custom text-[0.65rem] uppercase tracking-wider ${
                        term.done
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground border border-border"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {term.done ? "Complete" : "Up next"}
                    </span>
                  </div>

                  <ol className="relative flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-4">
                    {/* Track: solid once a term is done, dashed while planned */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-[11px] top-3 bottom-7 md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:w-auto ${
                        term.done
                          ? "w-0.5 bg-primary md:h-0.5"
                          : "w-0 border-l-2 border-dashed border-border md:h-0 md:border-l-0 md:border-t-2"
                      }`}
                    />
                    {term.milestones.map(milestone => (
                      <li
                        key={milestone.label}
                        className="relative flex md:flex-col items-start gap-4 md:gap-3"
                      >
                        <span
                          className={`relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                            term.done
                              ? "bg-primary text-primary-foreground"
                              : "bg-card border-2 border-border"
                          }`}
                        >
                          {term.done && <Check size={14} strokeWidth={3} />}
                        </span>
                        <div className="md:pr-4">
                          <p
                            className="font-body text-sm font-medium text-foreground leading-snug"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {milestone.label}
                          </p>
                          <p
                            className="font-mono-custom text-xs text-muted-foreground mt-1"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {milestone.date}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAGE NAVIGATION ──────────────────────────────────── */}
      <section className="border-t border-border py-12">
        <div className="container">
          <div className="flex items-center justify-between gap-8">
            <Link href="/#capstone">
              <div className="group flex items-center gap-4 cursor-pointer">
                <ArrowLeft
                  size={20}
                  className="text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all duration-200"
                />
                <div>
                  <p
                    className="font-mono-custom text-xs text-muted-foreground uppercase tracking-widest mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Back
                  </p>
                  <p
                    className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Home
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/#projects">
              <div className="group flex items-center gap-4 cursor-pointer text-right">
                <div>
                  <p
                    className="font-mono-custom text-xs text-muted-foreground uppercase tracking-widest mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Next
                  </p>
                  <p
                    className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Selected Projects
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-border py-8">
        <div className="container flex items-center justify-center">
          <span
            className="font-mono-custom text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} James Byrne
          </span>
        </div>
      </footer>
    </div>
  );
}
