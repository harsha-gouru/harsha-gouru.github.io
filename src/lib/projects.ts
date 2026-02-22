export interface Project {
  title: string;
  description: string;
  url: string;
  tag: string;
}

export const projects: Project[] = [
  {
    title: "LLM Inspector",
    description:
      "Educational tool to trace and visualize local LLM internals in real-time. See tokens, attention, hidden states, and probabilities.",
    url: "https://github.com/harsha-gouru/llm-inspector",
    tag: "ai",
  },
  {
    title: "Pay-Per-Joke API",
    description:
      "Micropayment-powered joke API using the x402 protocol on Base. Pay $0.001 per joke in USDC.",
    url: "https://github.com/harsha-gouru",
    tag: "web3",
  },
  {
    title: "RSS Reader",
    description:
      "A minimal, modern RSS reader with Anthropic-inspired design.",
    url: "https://github.com/harsha-gouru/RSS",
    tag: "tools",
  },
  {
    title: "Tinker Studio",
    description:
      "A web-based LLM training platform. Experiment management, dataset handling, real-time monitoring, and interactive playground.",
    url: "https://github.com/harsha-gouru/tinker-studio",
    tag: "ai",
  },
];
