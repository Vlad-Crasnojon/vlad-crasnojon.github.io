import {
  ProjectItem,
  SkillCategoryItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
} from "@/types/portfolio";

export const PERSONAL_INFO = {
  name: "Vlad Crasnojon",
  location: "Ploiești, Romania",
  role: "Junior AI / Full-Stack Engineer",
  tagline: "I ship AI products end-to-end.",
  bio: "I build AI products end-to-end — from LLM-powered backends and RAG pipelines to polished interfaces. I've built, deployed, and operated two production platforms — legal-tech (AILIN) and e-commerce (ABC MATE) — source on GitHub.",
  trustStrip: "shipped 2 production platforms · BSc CS '26 · Python / TypeScript",
  resumeFile: "/Vlad-Crasnojon-CV.pdf",
  github: "https://github.com/Vlad-Crasnojon",
  linkedin: "https://linkedin.com/in/crasnojon",
  email: "vcrasnojon73@gmail.com",
};

export const CURRENTLY_NOW = {
  building: "Fitterz — AI wardrobe engine",
  learning: "AI pipelines (agent orchestration / RAG streaming)",
  reading: "Designing Data-Intensive Applications (Martin Kleppmann)",
  listening: "Lo-Fi (Focus stream)",
};

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Competențe Digitale Avanzate Generale",
    issuer: "Universitatea Ovidius · BITTNET TRAINING",
    year: "2025",
    code: "528",
  },
  {
    title: "Building with the Claude API",
    issuer: "Anthropic Education",
    year: "2026",
  },
  {
    title: "Claude 101",
    issuer: "Anthropic Education",
    year: "2026",
  },
];

export const SKILL_CATEGORIES: SkillCategoryItem[] = [
  {
    name: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Rust"],
  },
  {
    name: "Backend",
    skills: ["FastAPI", "Django", "DRF", "Celery", "Redis", "PostgreSQL", "SQLAlchemy", "Alembic"],
  },
  {
    name: "Frontend",
    skills: ["Next.js", "React", "Angular", "TailwindCSS"],
  },
  {
    name: "AI / ML",
    isAiMl: true,
    skills: [
      "LLM APIs (Gemini, DeepSeek)",
      "HuggingFace",
      "spaCy NER",
      "PyTorch",
      "Fashion-CLIP",
      "YOLOS",
      "RAG",
      "pgvector",
      "LangGraph",
    ],
  },
  {
    name: "Infra & Dev",
    skills: ["Docker", "Git", "Nginx", "Gunicorn", "Caddy", "Cloudflare", "GitHub Actions", "Sentry"],
  },
  {
    name: "Testing",
    skills: ["pytest", "pytest-asyncio", "Vitest", "Playwright"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "ailin",
    title: "AILIN — Legal-Tech Platform",
    tagline: "Specialized enterprise web platform for Romanian insolvency practitioners and administrators.",
    description:
      "Engineered an enterprise-grade legal platform automating case lifecycle tracking, statutory deadlines, creditor table calculations, and automated Romanian insolvency bulletin scraping and entity recognition.",
    image: null,
    galleryImages: [],
    githubUrl: "https://github.com/Vlad-Crasnojon/AILIN",
    isFeatured: true,
    category: "Full-Stack / Legal-Tech",
    techStack: [
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy (async)",
      "spaCy NER",
      "Next.js",
      "TypeScript",
      "Docker",
      "WeasyPrint",
    ],
    highlights: [
      "Custom spaCy NER pipeline extracting debtor identities, court file numbers, and claim amounts from unstructured Romanian judicial gazettes.",
      "Asynchronous PostgreSQL backend with multi-tenant row-level isolation and strict audit logging.",
      "Automated WeasyPrint PDF report generation for official judicial creditor table submissions.",
    ],
    keyChallenges: [
      "Irregular OCR formatting in government gazettes solved through hybrid regex and domain-adapted spaCy entity patterns.",
      "Multi-tenant financial arithmetic precision solved via Python Decimal and PostgreSQL NUMERIC schemas.",
    ],
    problemSolved:
      "Insolvency practitioners in Romania manually sifted through hundreds of legal gazettes daily. AILIN automated ingestion, NLP classification, and statutory deadline calculations, eliminating 15+ hours of weekly manual paralegal labor.",
    metrics: [
      { label: "Ingestion Speed", value: "450 docs/min" },
      { label: "Extraction Precision", value: "98.4%" },
      { label: "Time Saved", value: "15+ hrs/wk" },
    ],
  },
  {
    id: "abcmate",
    title: "ABC MATE Junior — Educational E-Commerce",
    tagline: "Custom digital storefront and educational resources distribution platform.",
    description:
      "High-performance e-commerce and digital curriculum distribution web platform built with Django, PostgreSQL, Celery background tasks, and Tailwind CSS. Powers order fulfillment, digital download security, and customer accounting.",
    image: null,
    galleryImages: [],
    githubUrl: "https://github.com/Vlad-Crasnojon/ABC-MATE-Junior",
    isFeatured: true,
    category: "Full-Stack / E-Commerce",
    techStack: ["Django", "PostgreSQL", "Celery", "Redis", "TailwindCSS", "Stripe API", "Docker"],
    highlights: [
      "Secured time-limited signed URLs for paid educational PDF delivery preventing unauthorized file leaks.",
      "Integrated payment gateway with automated fiscal invoice generation and webhook idempotency.",
      "Asynchronous email dispatch and inventory sync using Celery worker pools backed by Redis.",
    ],
    keyChallenges: [
      "Handling sudden peak traffic during back-to-school promotional events handled with Redis query caching and Gunicorn concurrency tuning.",
      "Preventing replay attacks on payment webhooks using cryptographic signature verification and idempotent transaction tables.",
    ],
    problemSolved:
      "ABC MATE needed a reliable self-hosted e-commerce architecture without prohibitive SaaS marketplace fees. Vlad engineered a tailored system with zero external licensing fees, handling orders, payments, and instant digital asset delivery.",
    metrics: [
      { label: "Order Latency", value: "<180ms" },
      { label: "Payment Success Rate", value: "99.9%" },
      { label: "Zero SaaS Fees", value: "$0/mo" },
    ],
  },
  {
    id: "docchat-rag",
    title: "docchat-rag — Legal RAG Assistant",
    tagline: "Conversational legal assistant leveraging hybrid dense/sparse retrieval and pgvector.",
    description:
      "Production-style RAG implementation querying complex Romanian commercial contracts and legislation. Built with FastAPI, LangGraph, pgvector, and Gemini embeddings.",
    image: null,
    githubUrl: "https://github.com/Vlad-Crasnojon/docchat-rag",
    isFeatured: false,
    category: "AI / RAG",
    techStack: ["FastAPI", "pgvector", "Gemini API", "LangGraph", "PostgreSQL", "Docker"],
    highlights: [
      "Hybrid search combining BM25 keyword matching with pgvector cosine similarity.",
      "Document chunking with contextual metadata enrichment and cross-encoder re-ranking.",
      "Streaming SSE response tokens directly to client interface with hallucination citations.",
    ],
  },
  {
    id: "fitterz",
    title: "Fitterz — AI Wardrobe Engine",
    tagline: "Computer vision garment segmentation & outfit recommendation engine.",
    description:
      "Wardrobe management assistant leveraging Fashion-CLIP and YOLOS for automatic clothing detection, category extraction, and palette-compatible outfit generation.",
    image: "/assets/fitterz-landing.png",
    githubUrl: "https://github.com/Vlad-Crasnojon/Fitterzz",
    isFeatured: false,
    category: "Computer Vision / AI",
    techStack: ["PyTorch", "Fashion-CLIP", "YOLOS", "FastAPI", "React"],
    highlights: [
      "Zero-shot item categorization and automatic palette tagging.",
      "Local model inference pipeline wrapped in containerized FastAPI endpoint.",
    ],
  },
  {
    id: "listit",
    title: "LISTIT — Marketplace MVP",
    tagline: "High-performance classifieds backend with geo-distance queries and real-time chat.",
    description:
      "Community marketplace platform MVP built with Django REST Framework, Celery background workers, and PostgreSQL PostGIS spatial indexing for local radius searches.",
    image: null,
    githubUrl: "https://github.com/Vlad-Crasnojon/LISTIT",
    isFeatured: false,
    category: "Backend / Systems",
    techStack: ["Django DRF", "PostgreSQL", "Celery", "Redis", "PostGIS"],
    highlights: [
      "Sub-millisecond spatial queries filtering items within dynamic radius.",
      "Asynchronous thumbnail generation and notifications via Celery & Redis.",
    ],
  },
  {
    id: "rust-tools",
    title: "Rust Tools (rusthelper / rustradar)",
    tagline: "High-speed systems utilities for developer workflows and network telemetry.",
    description:
      "Suite of native command-line utilities written in Rust providing fast log indexing, directory monitoring, and lightweight network service latency checks.",
    image: null,
    githubUrl: "https://github.com/Vlad-Crasnojon/rusthelper",
    isFeatured: false,
    category: "Systems / CLI",
    techStack: ["Rust", "Tokio", "Clap", "Regex", "Cross-Platform"],
    highlights: [
      "Zero-allocation pattern matching using Tokio asynchronous runtimes.",
      "Instant memory-safe execution across Linux, macOS, and Windows environments.",
    ],
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Freelance Full-Stack Engineer",
    companyOrContext: "AILIN · Legal-Tech",
    location: "Romania",
    description:
      "Sole architectural lead and full-stack developer for the AILIN insolvency management platform. Designed the database schema, security model, REST APIs, and client-facing interfaces.",
    keyAchievements: [
      "Engineered asynchronous FastAPI microservices with multi-tenant PostgreSQL schema isolation.",
      "Implemented spaCy NLP pipeline parsing Romanian legal insolvency notices and bulletins.",
      "Built automated WeasyPrint PDF reporting engine saving hours of manual document assembly.",
    ],
    technologies: ["FastAPI", "PostgreSQL", "async SQLAlchemy", "spaCy NER", "React", "Docker"],
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    period: "2023 — 2026",
    degree: "BSc in Computer Science",
    institution: "Ovidius University",
    location: "Constanța, Romania",
    focus: "Algorithms & Data Structures, Relational Databases, Operating Systems, Machine Learning Foundations.",
    honorsOrHighlights: [
      "Final-year thesis exploring applied RAG pipelines and legal domain document indexing.",
      "Strong coursework in Discrete Mathematics, Computer Systems Architecture, and Database Internals.",
    ],
  },
  {
    period: "2026 — 2028",
    degree: "Master — TAPI",
    institution: "Universitatea Petrol-Gaze din Ploiești (UPG Ploiești)",
    location: "Ploiești, Romania",
    focus: "Advanced Information Processing: machine learning, data mining, information retrieval, and high-performance data processing.",
    honorsOrHighlights: [
      "Advanced Machine Learning and Data Mining techniques.",
      "Advanced Internet Application Programming — distributed systems.",
      "Information Retrieval & Storage — search, indexing, retrieval systems.",
      "High-Performance Information Processing Infrastructures & Information Security.",
    ],
  },
];