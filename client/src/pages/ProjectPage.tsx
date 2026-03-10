import Navbar from "@/components/Navbar";
import { projects } from "@/lib/projects";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Github,
} from "lucide-react";
import { Link, useParams } from "wouter";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <h1
            className="font-display text-4xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Project not found
          </h1>
          <Link href="/">
            <span className="text-primary font-body text-sm hover:underline">
              ← Back to home
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === params.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div key={project.id} className="min-h-screen bg-background">
      <Navbar />

      {/* HERO - Minimalist 180px strip */}
      <section className="relative h-[180px] overflow-hidden bg-secondary/20">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80"
        />

        {/* Subtle gradient overlay to keep it feeling clean */}
        <div className="absolute inset-0 bg-background/40" />

        <div className="absolute bottom-6 left-0 right-0">
          <div className="container">
            <span
              className="font-mono-custom text-2xl font-medium text-white/60 select-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {project.number}
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {/* Back */}
          <Link href="/#projects">
            <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 mb-12 group animate-fade-up">
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <span
                className="font-body text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                All Projects
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* MAIN CONTENT */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 animate-fade-up-delay-1">
                <div className="v-rule h-6" />
                <span
                  className="font-mono-custom text-xs tracking-widest uppercase text-primary"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Projects
                </span>
              </div>

              <h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-2 animate-fade-up-delay-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h1>

              <p
                className="font-body text-lg text-primary font-medium mb-8 animate-fade-up-delay-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {project.tagline}
              </p>

              {/* Overview */}
              <div className="mb-12 animate-fade-up-delay-3">
                <h2
                  className="font-display text-xl font-semibold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Overview
                </h2>
                <p
                  className="font-body text-base leading-relaxed text-foreground"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {project.overview}
                </p>
              </div>

              {/* Contributions */}
              <div className="mb-12 animate-fade-up-delay-3">
                <h2
                  className="font-display text-xl font-semibold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  My Contributions
                </h2>

                <ul className="space-y-3">
                  {project.contributions.map((contribution: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span
                        className="font-body text-sm text-muted-foreground leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {contribution}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="mb-12 animate-fade-up-delay-3">
                <h2
                  className="font-display text-xl font-semibold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Outcomes & Highlights
                </h2>

                <ul className="space-y-3">
                  {project.outcomes.map((outcome: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span
                        className="font-body text-sm text-muted-foreground leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1 animate-fade-up-delay-2">
              <div className="sticky top-24 space-y-8">
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3
                    className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Technologies
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
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

                {(project.github || project.liveUrl) && (
                  <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                    <h3
                      className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wide"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Links
                    </h3>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 bg-secondary rounded-lg hover:bg-accent transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <Github size={16} />
                          <span className="font-body text-sm">
                            View on GitHub
                          </span>
                        </div>
                        <ArrowUpRight size={14} />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                      >
                        <span className="font-body text-sm font-medium">
                          Live Demo
                        </span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT NAVIGATION ───────────────────────────────── */}
      <section className="border-t border-border py-12">
        <div className="container">
          <div className="flex items-center justify-between gap-8">
            {/* Previous */}
            {prevProject ? (
              <Link href={`/project/${prevProject.id}`}>
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
                      Previous
                    </p>
                    <p
                      className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {prevProject.title}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Back to all */}
            <Link href="/#projects">
              <span
                className="font-mono-custom text-xs text-muted-foreground hover:text-primary transition-colors duration-200 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                All Projects
              </span>
            </Link>

            {/* Next */}
            {nextProject ? (
              <Link href={`/project/${nextProject.id}`}>
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
                      {nextProject.title}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-border">
          <div className="container">
            <h2
              className="font-display text-2xl font-semibold text-foreground mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((imageUrl: string, index: number) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl bg-card border border-border"
                >
                  <img
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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