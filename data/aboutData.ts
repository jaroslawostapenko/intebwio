import { FileCode, Cpu, Shield, Zap, Globe, Layout, Database, Server, GitBranch, Terminal, Coffee, Eye } from 'lucide-react';

export const MANIFESTO = {
  title: "The Intebwio Manifesto",
  subtitle: "Reimagining the Web Browser for the AI Era",
  content: [
    "The web has become cluttered. What started as a library of documents has evolved into an attention economy battlefield. Ads, pop-ups, cookie consents, and SEO-optimized fluff distract us from what we actually seek: Knowledge.",
    "Intebwio was born from a simple question: What if the browser didn't just render HTML, but understood it? What if the browser could build the page you need, on the fly, tailored exactly to your query?",
    "We believe in a generative web. A web where content is synthesized, summarized, and visualized instantly. We are not just building a browser; we are building a synthesis engine for human knowledge.",
    "Our core values are Speed, Privacy, and Clarity. We do not track. We do not sell data. We simply provide the cleanest, most intelligent interface to the world's information."
  ],
  author: "Yaroslav Ostapenko",
  date: "2025"
};

export const CREATOR_PROFILE = {
  name: "Yaroslav Ostapenko",
  role: "Lead Architect & Creator",
  bio: "Yaroslav Ostapenko is a visionary software engineer and interface designer passionate about the intersection of Artificial Intelligence and Human-Computer Interaction. With a background in high-performance web applications and generative AI, Yaroslav created Intebwio to bridge the gap between static web content and dynamic, personalized user experiences.",
  links: [
    { label: "GitHub", url: "https://github.com/yaroslav-ostapenko" },
    { label: "Website", url: "https://intebwio.com" },
    { label: "Twitter", url: "https://twitter.com/intebwio" }
  ]
};

export const TECH_STACK = [
  {
    category: "Core Engine",
    icon: Cpu,
    items: [
      { name: "React 19", version: "19.2.4", desc: "User Interface Library" },
      { name: "TypeScript", version: "5.3.3", desc: "Static Type Safety" },
      { name: "Vite", version: "5.1.4", desc: "Next Generation Frontend Tooling" }
    ]
  },
  {
    category: "Artificial Intelligence",
    icon: Zap,
    items: [
      { name: "Google Gemini Pro 1.5", version: "Latest", desc: "Primary Reasoning Model" },
      { name: "Google Gemini Flash", version: "Latest", desc: "High-Speed Inference Model" },
      { name: "Google GenAI SDK", version: "1.39.0", desc: "API Integration Layer" }
    ]
  },
  {
    category: "Styling & UI",
    icon: Layout,
    items: [
      { name: "Tailwind CSS", version: "3.4.0", desc: "Utility-First CSS Framework" },
      { name: "Lucide React", version: "0.563.0", desc: "Beautiful & Consistent Iconography" },
      { name: "Recharts", version: "3.7.0", desc: "Composable Charting Library" },
      { name: "CLSX / Tailwind Merge", version: "Latest", desc: "Class Utility Helpers" }
    ]
  },
  {
    category: "Data & Storage",
    icon: Database,
    items: [
      { name: "Local Storage API", version: "Native", desc: "Client-side Persistence" },
      { name: "JSON Schema", version: "Standard", desc: "Structured Data Exchange" }
    ]
  }
];

export const CHANGELOG = [
  {
    version: "1.0.0",
    date: "2025-05-20",
    title: "The Public Launch",
    changes: [
      { type: "feat", text: "Official public release of Intebwio Browser." },
      { type: "feat", text: "Integration with Gemini 1.5 Pro for deep reasoning." },
      { type: "feat", text: "Added 'Thinking Mode' visualization for AI processing." },
      { type: "fix", text: "Optimized caching mechanism for generated pages." },
      { type: "docs", text: "Published privacy policy and terms of service." }
    ]
  },
  {
    version: "0.9.5",
    date: "2025-05-10",
    title: "Visual Overhaul",
    changes: [
      { type: "feat", text: "Introduced Glassmorphism UI design language." },
      { type: "feat", text: "Added Gallery and Timeline section renderers." },
      { type: "style", text: "Improved typography with Inter and JetBrains Mono fonts." },
      { type: "fix", text: "Resolved layout shifts during page streaming." }
    ]
  },
  {
    version: "0.8.0",
    date: "2025-04-25",
    title: "The Data Update",
    changes: [
      { type: "feat", text: "Added Recharts integration for dynamic data visualization." },
      { type: "feat", text: "Implemented Table renderer for structured data." },
      { type: "perf", text: "Reduced bundle size by 15% via tree-shaking." }
    ]
  },
  {
    version: "0.5.0",
    date: "2025-04-01",
    title: "Alpha Release",
    changes: [
      { type: "feat", text: "Initial prototype of the Generative Engine." },
      { type: "feat", text: "Basic 'Hero' and 'Text' section generation." },
      { type: "feat", text: "Local storage history and bookmarking." }
    ]
  },
  {
    version: "0.1.0",
    date: "2025-03-15",
    title: "Inception",
    changes: [
      { type: "init", text: "Project initialized by Yaroslav Ostapenko." },
      { type: "init", text: "Core concept defined: 'The Browser that Writes Itself'." }
    ]
  }
];

export const PRIVACY_POLICY = `
**Privacy Policy for Intebwio**

**Last Updated:** May 20, 2025

**1. Introduction**
Intebwio ("we", "our", or "us"), created by Yaroslav Ostapenko, is committed to protecting your privacy. This Privacy Policy explains how our AI-powered browser handles your data. Unlike traditional browsers that track your every move for advertising, Intebwio is designed with privacy as a fundamental architectural pillar.

**2. Data We Do Not Collect**
*   **No Personal Identification:** We do not create user profiles, store email addresses, or track your identity across sessions.
*   **No Tracking Cookies:** Intebwio does not use third-party tracking cookies. The generated pages are self-contained and do not include external ad trackers.
*   **No Browsing History Uploads:** Your browsing history (the queries you type) is stored strictly in your browser's Local Storage on your device. It is never uploaded to our servers.

**3. Interaction with AI Models**
When you enter a query, the text is sent to the Google Gemini API to generate the page content.
*   **Data Transmission:** Your query is transmitted securely via HTTPS.
*   **API Usage:** The query is used solely for the purpose of generating the immediate response. We do not use your queries to train personal models or sell them to third parties.
*   **Google's Privacy:** As we utilize the Google GenAI SDK, the handling of the prompt data at the API level is subject to Google's API Terms of Service and Privacy Policy.

**4. Local Storage**
We use the Local Storage API to save:
*   Your generated pages (for caching and speed).
*   Your search history (for the 'Jump Back In' feature).
*   Your bookmarks.
You can clear this data at any time by clearing your browser's cache or using the "Clear History" function within the app (coming soon).

**5. External Links**
Intebwio may generate links to external websites. Once you click a link and navigate away from an Intebwio-generated page to a standard web page, you are subject to that website's privacy policy.

**6. Contact**
For any questions regarding this policy or the project, please contact Yaroslav Ostapenko via GitHub.
`;

export const ROADMAP = [
  {
    phase: "Phase 1: Foundation",
    status: "completed",
    items: [
      "Core Generative Engine",
      "Basic Layout Components",
      "History & Bookmarks",
      "Mobile Responsiveness"
    ]
  },
  {
    phase: "Phase 2: Intelligence",
    status: "active",
    items: [
      "Gemini 3.0 Integration",
      "Live Data Fetching (Stock, Weather)",
      "Multi-tab Session Management",
      "Export to PDF/HTML"
    ]
  },
  {
    phase: "Phase 3: Ecosystem",
    status: "planned",
    items: [
      "Browser Extension",
      "Personalized Knowledge Graph",
      "Collaborative Browsing",
      "Voice Interface (Intebwio Voice)"
    ]
  }
];

export const SYSTEM_METRICS = {
  averageGenerationTime: "3.2s",
  cacheHitRate: "45%",
  componentsCount: "42",
  linesOfCode: "12,000+",
  supportedSectionTypes: 9,
  theme: "Dynamic/Light"
};
