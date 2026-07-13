/**
 * Self-directed courses — not credentials. None of these grant an accredited
 * certificate; they're tracked here as evidence of continuous, hands-on
 * learning outside of work.
 */

export type Course = {
  title: string;
  hours: number;
  url: string;
  free?: boolean;
  inProgress?: boolean;
  highlights?: string[];
};

export type CourseProvider = {
  name: string;
  url: string;
  courses: Course[];
};

export const courseProviders: CourseProvider[] = [
  {
    name: "Go Casts",
    url: "https://gocasts.ir",
    courses: [
      {
        title: "Go & Backend Bootcamp (with team-building)",
        hours: 40,
        url: "https://shop.gocasts.ir/product/go",
        inProgress: true,
        highlights: [
          "Go language fundamentals and idiomatic backend patterns",
          "Cloud-native app design, containers, and Kubernetes basics",
          "Event-driven / message-driven architecture in practice",
          "Code reviews and team-building inside a real engineering team",
        ],
      },
    ],
  },
  {
    name: "Behrad Zari",
    url: "https://behradz.ir",
    courses: [
      {
        title: "System Design 1–4 — Observability to Microservices",
        hours: 51,
        url: "https://behradz.ir/courses/system-design-1/",
        inProgress: true,
        highlights: [
          "Scalability, observability, and resource estimation for production services",
          "Resilience patterns and async processing with queues and brokers",
          "Multi-database architectures, replication, and sharding for high availability",
          "Microservices migration strategy, service boundaries, and org-scale tradeoffs",
        ],
      },
      {
        title: "Art of Coding",
        hours: 21,
        url: "https://behradz.ir/courses/art-of-coding/",
        highlights: [
          "Software engineering fundamentals and systems thinking at the code level",
          "Layered, modular design for reusable components in real projects",
          "Production-readiness checklist for shipping projects",
          "Clean code practices and reducing technical debt",
        ],
      },
    ],
  },
  {
    name: "Code with Mosh",
    url: "https://codewithmosh.com",
    courses: [
      { title: "Claude Code for Professional Developers", hours: 9, url: "https://codewithmosh.com/p/claude-code" },
      { title: "Build AI-Powered Apps", hours: 7, url: "https://codewithmosh.com/p/build-ai-powered-apps" },
      { title: "The Ultimate Docker Course", hours: 5, url: "https://codewithmosh.com/p/the-ultimate-docker-course" },
      { title: "The Ultimate Git Course", hours: 6, url: "https://codewithmosh.com/p/the-ultimate-git-course" },
      { title: "Complete SQL Mastery", hours: 11, url: "https://codewithmosh.com/p/complete-sql-mastery" },
      { title: "The Complete Node.js Course", hours: 15, url: "https://codewithmosh.com/p/the-complete-node-js-course" },
      { title: "The Ultimate Next.js Series", hours: 12, url: "https://codewithmosh.com/p/ultimate-nextjs-series" },
      {
        title: "The Ultimate React Native Series",
        hours: 12,
        url: "https://codewithmosh.com/p/the-ultimate-react-native-course",
      },
      { title: "React Testing Mastery", hours: 11, url: "https://codewithmosh.com/p/react-testing-mastery" },
      { title: "React 18: Intermediate Topics", hours: 6, url: "https://codewithmosh.com/p/ultimate-react-part2" },
      { title: "React 18 for Beginners", hours: 8, url: "https://codewithmosh.com/p/ultimate-react-part1" },
      { title: "The Ultimate TypeScript Course", hours: 5, url: "https://codewithmosh.com/p/the-ultimate-typescript" },
      { title: "The Ultimate JavaScript Series", hours: 10, url: "https://codewithmosh.com/p/ultimate-javascript-series" },
      { title: "The Ultimate HTML5 & CSS3 Series", hours: 14, url: "https://codewithmosh.com/p/the-ultimate-html-css" },
    ],
  },
];
