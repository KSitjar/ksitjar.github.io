export type ResumeMetric = {
  value: string;
  label: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  bullets: string[];
};

export const resumeSummary = {
  headline: "Digital product manager focused on trusted fintech growth.",
  body:
    "Kenneth brings product strategy, delivery discipline, and hands-on technical fluency to digital onboarding platforms. His work spans acquisition funnels, API-driven integrations, experimentation, cloud cost stewardship, compliance, and cross-functional release management.",
};

export const competencies = [
  "Product strategy and roadmapping",
  "Digital onboarding and acquisition funnels",
  "API productization and partner integrations",
  "Experiment design, feature flags, and KPI reporting",
  "Customer journey mapping and conversion optimization",
  "Agile delivery across Scrum and Kanban teams",
  "Stakeholder, vendor, risk, and compliance alignment",
  "KYC/AML, InfoSec, SDLC, and audit-ready delivery",
];

export const featuredMetrics: ResumeMetric[] = [
  { value: "20K+", label: "monthly digital applications owned" },
  { value: "58.5%", label: "new-account abandonment reduction" },
  { value: "201.8%", label: "new-account completion lift" },
  { value: "4.8", label: "digital onboarding member satisfaction" },
];

export const keyResults: ResumeMetric[] = [
  { value: "64.7%", label: "membership abandonment reduction" },
  { value: "115%", label: "prospect conversion rate increase" },
  { value: "87", label: "digital onboarding NPS" },
  { value: "84%", label: "known security vulnerability reduction" },
];

export const experience: Experience[] = [
  {
    role: "Digital Product Manager",
    company: "VyStar Credit Union",
    period: "Aug 2020 - Present",
    summary:
      "Owns the roadmap and delivery rhythm for a high-volume digital account-opening platform serving prospective and existing members.",
    bullets: [
      "Leads acquisition and onboarding funnel improvements across customer experience, compliance, fraud prevention, funding, and growth outcomes.",
      "Partners with Engineering, UX, DevOps, QA, Risk, Compliance, and InfoSec to ship auditable digital releases.",
      "Uses funnel analytics, A/B testing, feature flags, and KPI dashboards to prioritize work and measure impact.",
      "Manages API integrations that support identity verification, account opening, funding, and related onboarding workflows.",
      "Sustained platform availability while improving security posture and optimizing cloud infrastructure spend.",
    ],
  },
  {
    role: "Senior QA Automation Engineer",
    company: "TEKsystems / Florida Blue",
    period: "Jul 2019 - Jul 2020",
    summary:
      "Helped product and engineering teams improve release confidence for APIs and digital onboarding components.",
    bullets: [
      "Expanded automation coverage to reduce regression time and improve delivery speed.",
      "Worked with product teams to clarify API specifications for an in-house payments solution.",
      "Supported incident monitoring and defect triage to reduce production risk.",
    ],
  },
  {
    role: "Senior QA Automation Engineer / Testing Analyst",
    company: "Citigroup",
    period: "May 2015 - Jul 2019",
    summary:
      "Built automation and quality practices across web, mobile, and API integration work.",
    bullets: [
      "Introduced BDD practices with Cucumber and Selenium to make testing more reusable and product-readable.",
      "Integrated automated API testing into delivery pipelines to improve release quality.",
      "Used defect trends and customer insights to surface onboarding friction and guide continuous improvement.",
    ],
  },
];

export const education = [
  {
    credential: "Bachelor of Applied Science, IT Management",
    institution: "Florida State College at Jacksonville",
  },
];

export const certifications = [
  "Professional Scrum Product Owner I (PSPO I)",
  "Professional Scrum Master I (PSM I)",
];
