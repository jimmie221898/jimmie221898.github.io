/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * Experience, education and skills for the About section on the home page.
 * Edit this file to update them; keep it in step with the resume, which has
 * the details for each job.
 */

export interface Org {
  name: string;
  location: string;
  // Logo in /logos; without one the tile shows the initials
  logo?: string;
  // Dark tile for logos drawn in light colours
  logoOnDark?: boolean;
}

export interface Job extends Org {
  // Newest first
  roles: { title: string; dates: string }[];
}

export const jobs: Job[] = [
  {
    name: "Apple",
    location: "Cupertino, CA",
    logo: "/logos/apple.svg",
    roles: [{ title: "SoC Embedded Firmware Intern", dates: "Sep – Dec 2026" }],
  },
  {
    name: "AlumaPower",
    location: "Kitchener, ON",
    logo: "/logos/alumapower.png",
    logoOnDark: true,
    roles: [
      { title: "Firmware Engineering Intern", dates: "Jan – Apr 2026" },
      { title: "Firmware Engineering Intern", dates: "Jan – Apr 2025" },
      { title: "Systems Technician", dates: "May – Aug 2024" },
    ],
  },
  {
    name: "Ford Motor Company",
    location: "Windsor, ON",
    logo: "/logos/ford.svg",
    roles: [{ title: "R&D Test Engineering Intern", dates: "Sep – Dec 2023" }],
  },
  {
    name: "Clark Construction Management",
    location: "Toronto, ON",
    logo: "/logos/clark.png",
    roles: [{ title: "Field Engineering Intern", dates: "Jan – Apr 2023" }],
  },
];

export const education = {
  name: "University of Waterloo",
  location: "Waterloo, ON",
  logo: "/logos/uwaterloo.svg",
  degree: "BASc Electrical Engineering (Honours, Co-op)",
  dates: "Sep 2022 – Apr 2027",
};

export const languages = ["C", "C++", "Python", "VHDL"];

export const technologies = [
  "FreeRTOS",
  "STM32",
  "ARM Cortex-M",
  "POSIX",
  "Device drivers",
  "BSP",
  "CAN",
  "MQTT",
  "OpenOCD",
  "GDB",
  "Git",
  "Docker",
  "KiCad",
  "MATLAB",
];
