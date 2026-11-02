/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * About section on the home page: bio, links, languages and technologies on
 * the left; education and experience on the right. Content lives in
 * lib/experience.ts.
 */

import {
  education,
  jobs,
  languages,
  technologies,
  type Org,
} from "@/lib/experience";
import { Linkedin, Mail } from "lucide-react";

function LogoTile({ org }: { org: Org }) {
  const initials = org.name
    .split(" ")
    .slice(0, 2)
    .map(word => word[0])
    .join("");
  return (
    <div
      className={`flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-lg border p-2 ${
        org.logoOnDark
          ? "bg-[#16191d] border-transparent"
          : "bg-card border-border"
      }`}
    >
      {org.logo ? (
        <img src={org.logo} alt="" className="max-w-full max-h-full" />
      ) : (
        <span
          className="font-display text-sm font-semibold text-muted-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  );
}

function Tags({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3
        className="font-mono-custom text-xs tracking-widest uppercase text-muted-foreground mb-4"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span
            key={item}
            className="px-3 py-1 bg-accent text-accent-foreground rounded-full font-mono-custom text-xs"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// Name and location on one line, then title and dates rows; on phones the
// location and dates stack under what they belong to
function OrgHeader({ org }: { org: Org }) {
  return (
    <div className="sm:flex sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
      <h3
        className="font-display text-lg font-semibold text-foreground leading-snug"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {org.name}
      </h3>
      <span
        className="block font-mono-custom text-xs text-muted-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {org.location}
      </span>
    </div>
  );
}

function TitleRow({ title, dates }: { title: string; dates: string }) {
  return (
    <p className="sm:flex sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4 mt-1 sm:mt-0.5">
      <span
        className="block font-body text-sm text-foreground"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {title}
      </span>
      <span
        className="block font-mono-custom text-xs text-muted-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {dates}
      </span>
    </p>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container">
        <div className="flex items-center gap-3 mb-10">
          <div className="v-rule h-6" />
          <span
            className="font-mono-custom text-xs tracking-widest uppercase text-primary"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            About
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: bio, links + skills */}
          <div>
            <ColumnHeading>About me</ColumnHeading>
            <div className="space-y-5 mb-8">
              <p
                className="font-body text-base leading-relaxed text-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                I'm an Electrical Engineering student at the University of
                Waterloo, expected to graduate in April 2027, with a focus on
                embedded systems, firmware development and hardware-software
                integration. I enjoy working close to hardware, building
                reliable low-level firmware, developing drivers and creating
                practical engineering solutions that interact with real
                hardware.
              </p>
              <p
                className="font-body text-base leading-relaxed text-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Through co-ops and school projects, I have worked on embedded
                firmware, hardware diagnostics and test platforms for real-world
                systems. I'm particularly interested in real-time systems,
                driver development and designing robust solutions that interact
                with physical hardware.
              </p>
              <p
                className="font-body text-base leading-relaxed text-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Outside of school and work, I enjoy playing hockey and flag
                football, watching the Seahawks and gaming.
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-6 mb-12">
              <a
                href="https://www.linkedin.com/in/jeb22/"
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
                  LinkedIn
                </span>
              </a>
              <a
                href="mailto:jimmie221898@gmail.com"
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
                  Email
                </span>
              </a>
            </div>

            <div className="space-y-8">
              <Tags title="Languages" items={languages} />
              <Tags title="Technologies" items={technologies} />
            </div>
          </div>

          {/* Right: education + experience */}
          <div>
            <ColumnHeading>Education</ColumnHeading>
            <div className="flex gap-4 mb-14">
              <LogoTile org={education} />
              <div className="flex-1 min-w-0">
                <OrgHeader org={education} />
                <TitleRow title={education.degree} dates={education.dates} />
              </div>
            </div>

            <ColumnHeading>Experience</ColumnHeading>
            <ul className="space-y-7">
              {jobs.map(job => (
                <li key={job.name} className="flex gap-4">
                  <LogoTile org={job} />
                  <div className="flex-1 min-w-0">
                    <OrgHeader org={job} />
                    {job.roles.map(role => (
                      <TitleRow key={role.dates} {...role} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
