/*
 * Page titles and link-preview text. The app sets the tab title from this,
 * and the build (vite.config.ts) writes a copy of index.html per route with
 * the matching tags, so links shared on LinkedIn etc. preview correctly.
 */

import { projects } from "./projects";

export const SITE_URL = "https://jimmie221898.github.io";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

const home: PageMeta = {
  path: "/",
  title: "James Byrne · Embedded Systems Engineer",
  description:
    "Portfolio of James Byrne, an Electrical Engineering student at the University of Waterloo (graduating April 2027) focused on embedded firmware, device drivers and real-time systems.",
};

export const pages: PageMeta[] = [
  home,
  {
    path: "/capstone",
    title: "TerraScan Capstone · James Byrne",
    description:
      "TerraScan, my fourth year design project: a low-cost scanner that mounts on existing farm equipment and maps canopy density and plant health. I'm the team's firmware engineer.",
  },
  ...projects.map(project => ({
    path: `/project/${project.id}`,
    title: `${project.title} · James Byrne`,
    description: project.overview,
  })),
];

/** Meta for a path; unknown paths get the home page's. */
export const pageMeta = (path: string) =>
  pages.find(page => page.path === path) ?? home;
