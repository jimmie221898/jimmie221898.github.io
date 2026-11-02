/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * Capstone section on the home page: one card in the project-card style that
 * links to the full write-up on /capstone. Content lives in lib/capstone.ts.
 */

import { capstone } from "@/lib/capstone";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const TAGS_SHOWN = 6;

export default function CapstoneSection() {
  return (
    <section id="capstone" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dot-grid texture, faded out at the top and bottom edges */}
      <div className="absolute inset-0 dot-grid opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />

      <div className="container relative">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="v-rule h-6" />
          <span
            className="font-mono-custom text-xs tracking-widest uppercase text-primary"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Capstone
          </span>
        </div>
        <h2
          className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-14"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Fourth Year
          <br />
          Design <em className="text-primary not-italic">Project</em>
        </h2>

        {/* Same look as the project cards, laid out wide since it stands alone */}
        <Link href="/capstone">
          <div className="project-card group grid grid-cols-1 md:grid-cols-2 bg-card rounded-xl overflow-hidden border border-border cursor-pointer">
            {/* Thumbnail: 4:3, but stretches if the text column runs taller */}
            <div className="relative overflow-hidden aspect-[4/3] md:self-stretch md:justify-self-stretch">
              <img
                src={capstone.image}
                alt={capstone.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Status overlay */}
              <div className="absolute top-4 left-4">
                <span
                  className="inline-flex items-center gap-2 font-mono-custom text-xs font-medium px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-muted-foreground"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  {capstone.status}
                </span>
              </div>
            </div>

            {/* Card content */}
            <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <h3
                className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {capstone.title}
              </h3>
              <p
                className="font-body text-xs text-primary font-medium mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {capstone.tagline}
              </p>
              <p
                className="font-body text-sm text-muted-foreground leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {capstone.summary}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {capstone.technologies.slice(0, TAGS_SHOWN).map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-accent text-accent-foreground rounded font-mono-custom text-xs"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tech}
                  </span>
                ))}
                {capstone.technologies.length > TAGS_SHOWN && (
                  <span
                    className="px-2 py-0.5 bg-accent text-accent-foreground rounded font-mono-custom text-xs"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    +{capstone.technologies.length - TAGS_SHOWN} more
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1 text-primary font-body text-sm font-medium group-hover:gap-2 transition-all duration-200">
                <span style={{ fontFamily: "var(--font-body)" }}>
                  View capstone
                </span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
