export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
  stack: string[];
  year: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "LLM Inspector",
    description:
      "Real-time visualization of LLM internals — trace token generation, attention patterns, hidden states, and probability distributions as they happen. Built to understand what's actually going on inside these models.",
    url: "https://github.com/harsha-gouru/llm-inspector",
    tags: ["ai", "interpretability"],
    stack: ["TypeScript", "React", "WebSockets"],
    year: "2026",
    featured: true,
  },
  {
    title: "x402 Pay-Per-Request API",
    description:
      "Experimenting with Coinbase's x402 protocol — HTTP-native micropayments on Base using USDC. Server middleware intercepts requests, client auto-signs payments. Exploring what autonomous agent-to-agent commerce looks like.",
    url: "https://github.com/coinbase/x402",
    tags: ["web3", "payments", "agents"],
    stack: ["Node.js", "Express", "x402", "Base"],
    year: "2026",
    featured: true,
  },
  {
    title: "Tinker Studio",
    description:
      "Web-based platform for training and fine-tuning LLMs. Experiment tracking, dataset management, real-time loss curves, and an interactive playground to test checkpoints mid-training.",
    url: "https://github.com/harsha-gouru/tinker-studio",
    tags: ["ai", "ml-ops"],
    stack: ["TypeScript", "Next.js", "Python"],
    year: "2026",
    featured: true,
  },
  {
    title: "Indic Heritage Digitizer",
    description:
      "Document intelligence pipeline for digitizing Indian manuscripts and heritage texts. Integrated Sarvam AI's document API for OCR across 22 Indian languages + English.",
    url: "https://github.com/harsha-gouru",
    tags: ["ai", "nlp", "indic"],
    stack: ["Next.js", "Sarvam AI", "TypeScript"],
    year: "2026",
  },
  {
    title: "Discord Archiver",
    description:
      "Data extraction tool for archiving Discord channel history into a local SQLite database. Built for preserving community knowledge.",
    url: "https://github.com/harsha-gouru/Discord-Archiver",
    tags: ["tools", "data"],
    stack: ["Python", "SQLite", "Discord API"],
    year: "2025",
  },
  {
    title: "Local LLM Benchmarking",
    description:
      "Running and benchmarking local LLMs with llama.cpp. Measuring inference speed, memory footprint, and quality across different quantization levels.",
    url: "https://github.com/harsha-gouru",
    tags: ["ai", "infra"],
    stack: ["C++", "llama.cpp", "Python"],
    year: "2025",
  },
];
