/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * Home page: Left-anchored hero, about section, project grid, contact section.
 * Warm stone background, Fraunces display, Outfit body, sage green accents.
 * Fade-up entrance animations, spring hover on project cards.
 */

import Navbar from "@/components/Navbar";
import { projects } from "@/lib/projects";
import {
  ArrowDownToLine,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Link } from "wouter";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/hero-bg-97CJvH8hdDwThTxJ2JEKze.webp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-background/60" />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            {/* Vertical rule + label */}
            <div className="flex items-center gap-4 mb-8 animate-fade-up">
              <div className="v-rule h-8" />
              <span
                className="font-mono-custom text-xs tracking-widest uppercase text-primary"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.95] mb-6 animate-fade-up-delay-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your
              <br />
              <em className="text-primary not-italic">Name</em>
              <br />
              Here
            </h1>

            {/* Tagline */}
            <p
              className="font-body text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-up-delay-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Software developer & designer crafting thoughtful digital
              experiences. Passionate about clean code and elegant solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
              <a
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-body font-medium text-sm hover:bg-primary/90 transition-all duration-200 hover:gap-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                View Projects
                <ArrowRight size={16} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-background/80 text-foreground rounded-md font-body font-medium text-sm hover:bg-secondary transition-all duration-200 backdrop-blur-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <ArrowDownToLine size={16} />
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up-delay-5">
          <span
            className="font-mono-custom text-xs text-muted-foreground tracking-widest uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Section label + heading */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="v-rule h-6" />
                <span
                  className="font-mono-custom text-xs tracking-widest uppercase text-primary"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  About
                </span>
              </div>
              <h2
                className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A little bit
                <br />
                about <em className="text-primary not-italic">me</em>
              </h2>

              {/* Social links */}
              <div className="flex flex-col gap-3">
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Linkedin
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  <span
                    className="font-body text-sm link-underline"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    linkedin.com/in/yourprofile
                  </span>
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Github
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  <span
                    className="font-body text-sm link-underline"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    github.com/yourusername
                  </span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Mail
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  <span
                    className="font-body text-sm link-underline"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    your.email@example.com
                  </span>
                </a>
              </div>
            </div>

            {/* Right: Bio text */}
            <div className="space-y-5">
              <p
                className="font-body text-base leading-relaxed text-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Hi! I'm a software developer based in [Your City]. I love
                building things that live on the internet — from clean,
                accessible user interfaces to robust backend systems.
              </p>
              <p
                className="font-body text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                I studied [Your Degree] at [Your University] and have since
                worked on projects ranging from web applications to data
                pipelines. I'm always looking to learn new technologies and
                tackle interesting problems.
              </p>
              <p
                className="font-body text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                When I'm not coding, you can find me [your hobbies/interests].
                I'm currently open to full-time roles and freelance
                opportunities.
              </p>

              {/* Skills tags */}
              <div className="pt-4 flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Node.js",
                  "Python",
                  "SQL",
                  "Git",
                  "Figma",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full font-mono-custom text-xs"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <section id="projects" className="py-24 lg:py-32 bg-secondary/40">
        <div className="container">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="v-rule h-6" />
            <span
              className="font-mono-custom text-xs tracking-widest uppercase text-primary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Work
            </span>
          </div>
          <div className="flex items-end justify-between mb-14">
            <h2
              className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Selected
              <br />
              <em className="text-primary not-italic">Projects</em>
            </h2>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="project-card group bg-card rounded-xl overflow-hidden border border-border cursor-pointer">
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Number overlay */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="font-mono-custom text-xs font-medium px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-muted-foreground"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {project.number}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    <h3
                      className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="font-body text-xs text-primary font-medium mb-4"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {project.tagline}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-accent text-accent-foreground rounded font-mono-custom text-xs"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span
                          className="px-2 py-0.5 bg-accent text-accent-foreground rounded font-mono-custom text-xs"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1 text-primary font-body text-sm font-medium group-hover:gap-2 transition-all duration-200">
                      <span style={{ fontFamily: "var(--font-body)" }}>
                        View project
                      </span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="py-24 lg:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="v-rule h-6" />
              <span
                className="font-mono-custom text-xs tracking-widest uppercase text-primary"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Contact
              </span>
            </div>
            <h2
              className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let's work
              <br />
              <em className="text-primary not-italic">together</em>
            </h2>
            <p
              className="font-body text-base text-muted-foreground mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              I'm currently open to new opportunities. Whether you have a
              project in mind, a question, or just want to say hello — my inbox
              is always open.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-body font-medium text-sm hover:bg-primary/90 transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Mail size={16} />
                Say Hello
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-md font-body font-medium text-sm hover:bg-secondary transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="font-display text-sm font-medium text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Name
          </span>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Mail size={18} />
            </a>
          </div>
          <span
            className="font-mono-custom text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} · Built with care
          </span>
        </div>
      </footer>
    </div>
  );
}
