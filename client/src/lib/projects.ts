/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * Shared project data — edit this file to update all project content.
 */

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  overview: string;
  contributions: string[];
  technologies: string[];
  outcomes: string[];
  image: string;
  gallery?: string[];
  github?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    number: "01",
    title: "STM32 Remote Debugger",
    tagline: "Raspberry Pi CM4 + STLINK-V3 MODS",
    overview:
      "Designed and assembled a custom carrier board enabling remote firmware development and real time debugging of STM32 microcontrollers over ethernet.",
    contributions: [
      "Designed a multi layer PCB using KiCad integrating Raspberry Pi CM4 and STLINK-V3 MODS.",
      "Implemented remote SWD debugging using OpenOCD and GDB server.",
      "Routed high speed interfaces (ethernet, USB, SD card) with signal integrity considerations.",
      "Developed flexible power architecture supporting PoE and USB-C with current limiting and protection.",
      "Assembled, tested and validated the board on real STM32 targets.",
    ],
    technologies: [
      "STM32",
      "Raspberry Pi CM4",
      "STLINK-V3 MODS",
      "PoE",
      "USB-C",
      "OpenOCD",
      "GDB",
      "KiCad",
    ],
    outcomes: [
      "Enabled remote flashing, breakpoints and debugging without direct connection to the hardware.",
      "Overcame high density component soldering and multi rail power challenges.",
    ],
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-1-BKkBLDoxtm7rxMyMcPLM8H.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-1-BKkBLDoxtm7rxMyMcPLM8H.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-1-image2.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-1-pcb-layout1.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-1-pcb-layout2.webp",
    ],
  },
  {
    id: "project-2",
    number: "02",
    title: "Water Reservoir Irrigation Controller",
    tagline: "STM32 Nucleo Multi-Zone System",
    overview:
      "Developed a scaled embedded system controller for multi zone water reservoir irrigation system, automated pump operations and water distribution.",
    contributions: [
      "Designed firmware on an STM32 Nucleo MCU to control pump speed (PWM), servo valves and water level sensing via an ultrasonic sensor.",
      "Implemented UART and GPIO interfaces for manual control, terminal reporting, RGB LED indicators and dual seven segment displays.",
      "Developed a scaled time simulation logic to run a 24 hour irrigation cycle in a compressed demo time.",
      "Assembled a timer board PCB to keep track of and display system time.",
      "Created a breadboard prototype to test and validate real time operation.",
      "Designed a custom PCB shield to replace the breadboard prototype, integrating all sensor and actuator connections.",
    ],
    technologies: [
      "STM32",
      "PWM Motor Control",
      "Ultrasonic Distance Sensor",
      "Servo Motors",
      "UART",
      "GPIO",
      "RGB LEDs",
      "Dual Seven Segment Display",
      "C++",
      "VS Code",
      "Proteus",
    ],
    outcomes: [
      "Successfully automated multi zone irrigation with various restrictions.",
      "Enabled visualization of water levels, pump operations and timings via terminal and display.",
      "Experienced full design process from challenge to breadboard prototype and up to PCB design.",
    ],
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-2-HQtpuaAW6Hz5RfuqH9g3WY.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-2-pcb-layout.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-2-timer-board.webp",
    ],
  },
  {
    id: "project-3",
    number: "03",
    title: "Engine Test Bench and Diagnostics System",
    tagline: "Ford F-150 & Escape OEM Harness Integration",
    overview:
      "Designed and built a modular engine test bench using OEM harnesses from a Ford F-150 and a Ford Escape to safely test and validate fuel injectors, ignition components, throttle bodies and crankshaft systems without requiring a complete vehicle.",
    contributions: [
      "Reverse engineered OEM engine harnesses to isolate and interface with fuel injectors, ignition coils and throttle bodies.",
      "Designed a motor driven flywheel system with Arduino based speed control and RPM display via LCD interface to mechanically rotate the engine, enabling controlled crankshaft testing.",
      "Built a spark plug test enclosure with a hand held enabling switch and protective container to ensure safe ignition testing.",
      "Designed an injector test system with a transparent acrylic enclosure for spray pattern visualization.",
      "Created a standalone throttle body tester to validate actuation and response.",
    ],
    technologies: [
      "Arduino",
      "PWM Motor Control",
      "Fuel Injectors",
      "Spark Plugs",
      "Ignition Coils",
      "Wiring Harnesses",
      "C++",
      "Arduino IDE",
      "LCD Interface (I2C)",
    ],
    outcomes: [
      "Enabled controlled crankshaft rotation and subsystem testing without a full vehicle.",
      "Provided safe, repeatable diagnostics for ignition, injection and throttle systems.",
      "Combined mechanical, electrical and embedded control design into a unified automotive testing project.",
    ],
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-3-hpXkTnSzDonzE5GEGuFfxk.webp",
  },
  {
    id: "project-4",
    number: "04",
    title: "Appliance Energy Monitoring Prototype",
    tagline: "Real-Time Power Usage Detection",
    overview:
      "Designed and built a low cost embedded system to monitor appliance voltage and current levels and estimate power usage in order to identify inefficient household devices.",
    contributions: [
      "Interfaced voltage and AC current sensors with an STM32 microcontroller for real time measurement of electrical loads.",
      "Designed voltage divider circuit to safely scale voltage inputs within microcontrollers limits.",
      "Configured and calibrated 12 bit ADC for accurate voltage and current readings.",
      "Programmed C++ logic to calculate real time power and evaluate energy thresholds.",
      "Integrated an LCD display to show live voltage, current and power calculation.",
      "Implemented LED indicators to visually signal different energy usage modes (normal, high, over threshold).",
    ],
    technologies: [
      "STM32",
      "C++",
      "ADC",
      "LCD Interface",
      "LEDs",
      "Voltage Dividers",
    ],
    outcomes: [
      "Successfully demonstrated real time voltage, current and power monitoring.",
      "Created simple visual feedback with LEDs and LCD display.",
      "Integrated firmware and hardware into a functional and safe prototype.",
    ],
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400920061/WYsCWKHK6MtUQkkPkq6v6m/project-4-hBHMW3TAgjpuuvFHHLGwjU.webp",
  },
];
