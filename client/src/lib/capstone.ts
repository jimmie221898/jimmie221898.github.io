/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * Fourth year design project (FYDP / ECE 498) content — edit this file to
 * update the capstone section on the home page.
 */

import {
  BatteryMedium,
  Bluetooth,
  Cpu,
  HardDrive,
  Layers,
  Leaf,
  MapPin,
  Thermometer,
  type LucideIcon,
} from "lucide-react";

export interface CapstoneImage {
  src: string;
  alt: string;
  caption: string;
  fit: "cover" | "contain";
}

export interface CapstoneTerm {
  course: string;
  term: string;
  done: boolean;
  milestones: { label: string; date: string }[];
}

export interface CapstoneDriver {
  part: string;
  kind: string;
  bus: string;
  icon: LucideIcon;
  detail: string;
}

export interface CapstoneDocument {
  title: string;
  href: string;
  preview: string;
  // Page images for the on-site viewer, rendered from the PDF
  pages: string[];
  meta: string;
  description: string;
}

// Page images live in a folder beside the PDF, named 01.webp, 02.webp, ...
const pageImages = (dir: string, count: number) =>
  Array.from(
    { length: count },
    (_, i) => `${dir}/${String(i + 1).padStart(2, "0")}.webp`
  );

export interface Capstone {
  title: string;
  tagline: string;
  course: string;
  status: string;
  image: string;
  summary: string;
  award: { title: string; detail: string };
  overview: string[];
  role: string;
  stats: { value: string; label: string }[];
  contributions: { title: string; detail: string }[];
  driversNote: string;
  drivers: CapstoneDriver[];
  driverBase: CapstoneDriver;
  pipeline: { stage: string; detail: string; mine: boolean }[];
  technologies: string[];
  terms: CapstoneTerm[];
  gallery: CapstoneImage[];
  documents: CapstoneDocument[];
}

export const capstone: Capstone = {
  title: "TerraScan",
  tagline: "Real-time crop health scanning for small farms",
  course: "ECE 498A/B · Spring 2026 – Winter 2027",
  status: "In progress",
  // Home page card
  image: "/photos/terrascan/system.webp",
  summary:
    "A low-cost scanner that mounts on existing farm equipment and maps canopy density and plant health as it moves through a field. I'm the team's firmware engineer.",
  award: {
    title: "CANConnect Micro-grant recipient",
    detail:
      "Awarded by the GLOCAL Foundation of Canada, with funding from the Canada Service Corps, to help pay for the build.",
  },
  overview: [
    "Only 36% of farms under 2,000 acres use digital agriculture tools, compared with 81% of operations over 5,000 acres. Cost is the biggest barrier.",
    "TerraScan is a low-cost scanner that mounts on existing farm equipment. As it moves through a field, a 2D LiDAR measures canopy density and a spectral sensor measures plant health (NDVI), with every reading tagged by GPS.",
  ],
  role: "I'm the team's firmware engineer, responsible for the STM32 firmware and the operator dashboard. My four teammates handle the FPGA pipeline and the electrical and power design.",
  stats: [
    { value: "7", label: "device drivers" },
    { value: "5", label: "sensors live at demo" },
    { value: "75–90%", label: "complete at first demo" },
  ],
  contributions: [
    {
      title: "TerraScanOS firmware",
      detail:
        "Wrote the STM32G474RE firmware as a layered stack (HAL wrappers, seven device drivers, application).",
    },
    {
      title: "Non-blocking I/O",
      detail:
        "Circular DMA with UART idle-line detection for the GPS and BLE streams, plus recovery that re-arms DMA after UART errors so a dropped Bluetooth connection can't silently kill reception.",
    },
    {
      title: "FPGA link",
      detail:
        "Co-designed the SPI protocol with the FPGA team: the FPGA raises an interrupt and the MCU reads a 20-byte frame over SPI DMA, outside interrupt context, then ACKs it. Built an SPI-slave mock on a second Nucleo so the link could be developed before the FPGA was ready.",
    },
    {
      title: "Data logging",
      detail:
        "Per-scan CSV logs on a removable USB drive through a CH376 FAT controller, with file names taken from GPS UTC time.",
    },
    {
      title: "Operator dashboard",
      detail:
        "Python app (customtkinter + bleak) to start and stop scans, set scan height, and watch live telemetry and faults, with automatic CSV logging. BLE runs on its own asyncio thread so the UI never blocks.",
    },
    {
      title: "FreeRTOS architecture",
      detail:
        "Designed the final firmware on FreeRTOS, to be implemented next term.",
    },
  ],
  driversNote:
    "The STM32 talks to every part below through a driver I wrote. The LiDAR connects straight to the FPGA, so it's handled on that side.",
  drivers: [
    {
      part: "NEO-M9N",
      kind: "GPS receiver",
      bus: "UART · DMA",
      icon: MapPin,
      detail:
        "Tags every reading with position and UTC time. Checks and parses NMEA sentences, and works out north and east velocity for the FPGA.",
    },
    {
      part: "AHT20",
      kind: "Temperature & humidity sensor",
      bus: "I2C",
      icon: Thermometer,
      detail:
        "Records field conditions alongside each scan. Checks calibration, triggers a measurement and decodes the reply into °C and %RH.",
    },
    {
      part: "AS7341",
      kind: "Spectral sensor",
      bus: "I2C",
      icon: Leaf,
      detail:
        "Measures plant health. Reads the 630 nm red and 910 nm near-infrared channels in one burst, flags saturated readings and computes NDVI.",
    },
    {
      part: "MAX17048",
      kind: "Battery fuel gauge",
      bus: "I2C",
      icon: BatteryMedium,
      detail:
        "Reads battery charge and cell voltage, which stream live to the dashboard.",
    },
    {
      part: "AT-09",
      kind: "Bluetooth LE module",
      bus: "UART · DMA",
      icon: Bluetooth,
      detail:
        "The wireless link to the dashboard. Sets the module up with AT commands, then carries scan commands in and live telemetry out.",
    },
    {
      part: "CH376",
      kind: "USB storage controller",
      bus: "UART",
      icon: HardDrive,
      detail:
        "Saves every scan to a USB drive. Mounts the drive, then creates, writes and closes each scan's CSV file through the chip's command set.",
    },
    {
      part: "FPGA link",
      kind: "Artix-7 FPGA",
      bus: "SPI · DMA",
      icon: Cpu,
      detail:
        "Hands sensor data to the FPGA for processing. Sends scan start/stop, sensor height, NIR and GPS data, and reads back LiDAR results.",
    },
  ],
  driverBase: {
    part: "Bus layer",
    kind: "I2C, UART, SPI & GPIO wrappers",
    bus: "STM32 HAL",
    icon: Layers,
    detail: "What all seven drivers are built on.",
  },
  pipeline: [
    {
      stage: "Sense",
      detail: "2D LiDAR, spectral (NIR), GPS, temperature/humidity",
      mine: false,
    },
    {
      stage: "Process",
      detail:
        "Artix-7 FPGA turns LiDAR and spectral data into canopy density and NDVI for every metre travelled",
      mine: false,
    },
    {
      stage: "Coordinate",
      detail:
        "STM32G474RE firmware: sensor drivers, GPS tagging, FPGA link and scan control",
      mine: true,
    },
    {
      stage: "Store & stream",
      detail: "CSV logs to a USB drive, live telemetry over Bluetooth LE",
      mine: true,
    },
    {
      stage: "Operate",
      detail: "Python dashboard to run scans and watch live data",
      mine: true,
    },
  ],
  technologies: [
    "C",
    "STM32G474RE",
    "DMA",
    "SPI",
    "I2C",
    "UART",
    "Bluetooth LE",
    "FAT32",
    "NMEA 0183",
    "Python",
    "Doxygen",
    "OpenOCD",
  ],
  terms: [
    {
      course: "ECE 498A",
      term: "Spring 2026",
      done: true,
      milestones: [
        { label: "Abstract & specs", date: "Jun 2026" },
        { label: "Detailed design", date: "Jul 2026" },
        { label: "Prototype demo", date: "Jul 2026" },
      ],
    },
    {
      course: "ECE 498B",
      term: "Winter 2027",
      done: false,
      milestones: [
        { label: "FPGA processing & custom PCB", date: "Jan–Feb 2027" },
        { label: "Enclosure & final testing", date: "Feb–Mar 2027" },
        { label: "Final demo & symposium", date: "Mar 2027" },
      ],
    },
  ],
  // Public copies only: student IDs, emails and per-student hours are redacted.
  documents: [
    {
      title: "Detailed Design Report",
      href: "/docs/terrascan-detailed-design-report.pdf",
      preview: "/docs/terrascan-detailed-design-report.webp",
      pages: pageImages("/docs/terrascan-detailed-design-report", 30),
      meta: "PDF · 30 pages · July 2026",
      description:
        "Specs, subsystem designs and the project timeline. My firmware architecture is in Section 3.3 and the dashboard in 3.5.",
    },
  ],
  gallery: [
    {
      src: "/photos/terrascan/system.webp",
      alt: "TerraScan prototype in a clear case: 3S LiPo battery, buck converters, Cmod A7 FPGA on a breadboard, STM32 Nucleo-G474RE, USB logger, GPS and Bluetooth modules",
      caption:
        "Full prototype on demo day (July 2026): 3S LiPo and buck converters, Cmod A7 FPGA, Nucleo-G474RE, GPS, BLE and USB logging",
      fit: "cover",
    },
    {
      src: "/photos/terrascan/sensor-module.webp",
      alt: "RPLIDAR C1 2D LiDAR on a black 3D-printed mount with its wiring harness",
      caption:
        "Sensor module: RPLIDAR C1 2D LiDAR on a 3D-printed mount, wired to the main unit through a twisted harness",
      fit: "cover",
    },
    {
      src: "/photos/terrascan/dashboard.webp",
      alt: "TerraScan dashboard showing live temperature, humidity, GPS and battery telemetry",
      caption:
        "Operator dashboard streaming live telemetry over BLE (location blurred)",
      fit: "contain",
    },
    {
      src: "/photos/terrascan/scan-data.webp",
      alt: "TerraScan dashboard Data tab during a scan, showing plant hits, plant-hit rate, red and NIR readings and NDVI",
      caption:
        "Data tab during a test scan: plant-hit rate from the FPGA link, plus red/NIR readings and NDVI",
      fit: "contain",
    },
    {
      src: "/photos/terrascan/block-diagram.webp",
      alt: "TerraScan system block diagram",
      caption: "System block diagram (team deliverable)",
      fit: "contain",
    },
  ],
};
