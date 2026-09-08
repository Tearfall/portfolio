// ============================================================
// Portfolio content — this is the ONLY file you edit.
// The site is fully static: no database, no admin panel, no build secrets.
// Change a value here, run `npm run build`, and it ships.
// ============================================================

import avatar from '../assets/profile.png'

import financeLanding from '../assets/projects/finance/landing.png'
import financeDashboard from '../assets/projects/finance/dashboard.png'
import financeCompany from '../assets/projects/finance/company.png'
import financeAccountTitles from '../assets/projects/finance/account-titles.png'
import financeTransaction from '../assets/projects/finance/transaction.png'
import financeEntry from '../assets/projects/finance/entry.png'
import financeImport from '../assets/projects/finance/import.png'
import financeReports from '../assets/projects/finance/reports.png'

import talos0 from '../assets/projects/talos/0.png'
import talos1 from '../assets/projects/talos/1.png'
import talos2 from '../assets/projects/talos/2.png'
import talos3 from '../assets/projects/talos/3.png'
import talos4 from '../assets/projects/talos/4.png'

import nerdiCover from '../assets/projects/nerdi.png'
import promeeCover from '../assets/projects/promee.png'
import mitolohiyaCover from '../assets/projects/mitolohiya.png'

// ------------------------------------------------------------
// 1. WHICH THEME TO SHOW
// ------------------------------------------------------------
// 1 = Warm editorial    — cream page, serif headline, rounded cards
// 2 = Structural grid   — bold uppercase, monospace labels, ruled rows
// 3 = Dark split        — dark sidebar next to a deep panel
// 4 = Playful organic   — bright page, floating blobs, pill tags
// 5 = Minimal centered  — quiet centered layout, single accent line
// 6 = Bauhaus blocks    — full-bleed grid of solid color tiles
export const ACTIVE_THEME = 3

// ------------------------------------------------------------
// 2. COLOR PALETTE (shared by every theme)
// ------------------------------------------------------------
// Each theme spends these differently — see the guide below.
export const PALETTE = {
  bg: '#fafaf8',
  surface: '#ffffff',
  ink: '#1c1c1a',
  accent: '#f29e4c',
  accent2: '#048ba8',
}

// The teal/slate palette from the plain-HTML portfolio, if you prefer it —
// swap it into PALETTE above:
// { bg: '#eff4f7', surface: '#e3ecf1', ink: '#10202b', accent: '#0e7c86', accent2: '#4c6473' }

// 1 — bg = page cream, surface = card fill, ink = text, accent = highlights/tags, accent2 = primary button
// 2 — bg = page fill, ink = headline/rules/text, accent = labels + metadata (surface/accent2 unused)
// 3 — ink = both dark panels, bg = light text on dark, accent = nav highlight + tags, accent2 = links
// 4 — bg = page fill, accent = blob + sparkles + pill text, accent2 = second blob, ink = headline + pill fill
// 5 — bg = page fill, surface = thumbnail fallback, ink = text, accent = kicker/divider/links/tech
// 6 — ink = hero + footer tiles, accent/accent2 = alternating tile fills, bg = page gutter

// ------------------------------------------------------------
// 3. PROFILE
// ------------------------------------------------------------
export const profile = {
  name: 'Joar Crisostomo',
  full_name: 'Mavi Joar C. Crisostomo', // used in the footer copyright line
  title: 'Full Stack Web Developer',
  bio: 'I build features end to end database, API, and the interface someone actually clicks. Currently at GoodStrings Inc., working on a School Management System and CRM System. BS Computer Science, Cum Laude, STI College Dasmariñas.',
  email: 'crisostomo.mavijoar2003@gmail.com',
  phone: '+63 994 418 5812',
  location: 'General Trias, Cavite, Philippines',
  timezone: '',
  avatar_url: avatar,
  resume_url: '',
  github_url: 'https://github.com/tearfall',
  linkedin_url: 'https://www.linkedin.com/in/mavi-joar-crisostomo/',
  twitter_url: '',
  website_url: '',
  instagram_url: 'https://www.instagram.com/i.am.joar/',

  // Where the contact form posts. Every theme has its own contact section;
  // clear this and they fall back to showing contact details only.
  formspree_url: 'https://formspree.io/f/mblojogz',

  // Longer "Background" copy — rendered by every theme as the About section.
  about: [
    'I graduated Cum Laude with a BS in Computer Science from STI College Dasmariñas in July 2025, after an ICT: Mobile App and Web Development track (graduated with honors, 2021) that got me writing code years before the degree did. GoodStrings Inc. is my first web development job. I started as an intern in January 2025 and was brought on as a junior web developer six months later.',
    'Outside of work, I explored ideas through school projects: a study app, a productivity app, and a game. I enjoy the parts of software most people skip past — the query that has to be right, the interface that has to be clear and usable.',
  ],
}

// ------------------------------------------------------------
// 4. PROJECTS
// ------------------------------------------------------------
// tech_stack is a comma-separated string; the themes split it themselves.
// image_url is the cover shown on the card. `gallery` is what the lightbox
// shows when someone clicks that cover — add or reorder images freely.
// "View project" link order: project_url -> repo_url -> design_url. Leave all
// three empty and no link is shown (the gallery still works).
export const projects = [
  {
    id: 'finance-hub',
    title: 'Finance Hub',
    kind: 'Web App',
    note: 'Independent project · In progress',
    description:
      'An accounting module for administrators to manage invoicing, billing, general ledger entries, and financial reporting in one place. It replaces manual spreadsheet workflows with a centralized system for tracking transactions, generating reports, and keeping financial data synchronized across the platform.',
    tech_stack: 'Laravel, Vue 3, Inertia.js',
    image_url: financeLanding,
    gallery: [
      financeLanding,
      financeDashboard,
      financeCompany,
      financeAccountTitles,
      financeTransaction,
      financeEntry,
      financeImport,
      financeReports,
    ],
    project_url: 'https://finance-hub-joar.fly.dev/',
    repo_url: '',
    design_url: '',
    featured: true,
  },
  {
    id: 'talos',
    title: 'Talos',
    kind: 'Thesis',
    note: 'Recognized: Outstanding Thesis/Capstone Defense, Dec 2024 · Best Software Development Project, Jul 2025',
    description:
      'A data visualization and analysis tool — my capstone project. Designed the interface in Figma, then built it with Vue.js on top of an HTML/CSS/JS foundation.',
    tech_stack: 'Vue.js, JavaScript, Figma',
    image_url: talos0,
    gallery: [talos0, talos1, talos2, talos3, talos4],
    project_url: '',
    repo_url: '',
    design_url: 'https://www.figma.com/design/L2IDrSvZnucxpGm6iszkm1/Talos?node-id=1161-508&p=f&t=fTl9He3SvYYraBZp-0',
    featured: true,
  },
  {
    id: 'nerdi',
    title: 'Nerdi',
    kind: 'Android',
    note: 'Group project',
    description:
      'A study companion app with interactive flashcards and quiz-style review, built to make exam prep faster to set up and easier to stick with.',
    tech_stack: 'Android Studio, Java, Figma',
    image_url: nerdiCover,
    gallery: [nerdiCover],
    project_url: '',
    repo_url: 'https://github.com/Tearfall/Nerdi',
    design_url: 'https://www.figma.com/design/GhZbsVBeqmTZkpzjiXdTR8/Nerdi?node-id=0-1&p=f&t=M1VUaNjh2PQofus7-0',
    featured: false,
  },
  {
    id: 'promee',
    title: 'Promee',
    kind: 'Android',
    note: 'Group project',
    description:
      'A personal productivity app pairing a Kanban board with the 3-2-1 rule, so tasks get prioritized instead of just listed.',
    tech_stack: 'Android Studio, Java, Figma',
    image_url: promeeCover,
    gallery: [promeeCover],
    project_url: '',
    repo_url: 'https://github.com/Tearfall/Promee_Application',
    design_url: 'https://www.figma.com/design/hJ0cbAc0AJqTEj1q8atvJS/Promee--Shared-?node-id=0-1&p=f&t=mjO3M76cnogXx1rT-0',
    featured: false,
  },
  {
    id: 'mitolohiya',
    title: 'Mitolohiya',
    kind: 'Unity',
    note: 'Group project',
    description:
      'A 2D pixel-art RPG with a world and story built around Philippine mythology — my first full game, end to end.',
    tech_stack: 'Unity, C#, Figma',
    image_url: mitolohiyaCover,
    gallery: [mitolohiyaCover],
    project_url: '',
    repo_url: 'https://github.com/Tearfall/mito_dev',
    design_url: '',
    featured: false,
  },
]

// ------------------------------------------------------------
// 5. EXPERIENCE (newest first)
// ------------------------------------------------------------
// Leave end_date as '' for a role you're still in — themes show "Present".
// Line breaks inside a description are preserved on the page.
export const experience = [
  {
    id: 'goodstrings',
    company: 'GoodStrings Inc.',
    role: 'Junior Web Developer',
    start_date: 'Jul 2025',
    end_date: '',
    track:
      'Progressed from OJT Intern (Jan–Mar 2025) → Backend Developer Apprentice (Apr–Jul 2025) → Junior Web Developer (Jul 2025–present), same team, six months.',
    description: [
      '• Introduced a customizable and printable ID Template layout feature with data mapping in an ID system, improving the flexibility of overall setup of ID Templates.',
      "• Built and improved an email chat feature inside the company's client CRM, streamlining how client teams communicate.",
      '• Added a text-to-speech announcer and standby video queueing system to support smoother customer queue handling and announcements.',
      "• Developed responsive layouts for a customizable landing page within the company's CRM system, improving usability across screen sizes.",
      "• Shipped a bulk data import tool and export-to-PDF/Excel functionality, extending the platform's data-handling capabilities.",
      "• Implemented full CRUD operations for new system features using Laravel's Query Builder and Eloquent ORM.",
      '• Optimized database queries through Eloquent ORM to improve data retrieval and overall system performance.',
      '• Identified, tracked, replicated, and fixed bugs within the school platform to improve stability and support smoother day-to-day operations.',
      '• Debugged and resolved critical issues within the existing CRM architecture alongside the development team.',
      '• Ran manual QA on the platform and fixed both front-end and back-end issues in assigned systems.',
    ].join('\n'),
  },
]

// ------------------------------------------------------------
// 6. EDUCATION (newest first)
// ------------------------------------------------------------
export const education = [
  {
    id: 'bscs',
    school: 'STI College Dasmariñas',
    degree: 'BS Computer Science',
    start_date: '2021',
    end_date: 'Jul 2025',
    description: 'Graduated Cum Laude.',
  },
  {
    id: 'ict',
    school: 'STI College Dasmariñas',
    degree: 'ICT: Mobile App & Web Development',
    start_date: '2019',
    end_date: 'Jun 2021',
    description: 'Graduated with honors.',
  },
]

// ------------------------------------------------------------
// 7. RECOGNITION (newest first)
// ------------------------------------------------------------
export const recognition = [
  { id: 'cum-laude', title: "IT Customer Support Basics", issuer: 'Cisco Networking Academy ', date: 'Aug 2026' },
  { id: 'cum-laude', title: "Cum Laude & Dean's Lister", issuer: 'STI College Dasmariñas', date: 'Jul 2025' },
  { id: 'best-software', title: 'Best Software Development Project', issuer: 'STI College Dasmariñas', date: 'Jul 2025' },
  { id: 'outstanding-thesis', title: 'Outstanding Thesis/Capstone Defense', issuer: 'STI College Dasmariñas', date: 'Dec 2024' },
  { id: 'cybersecurity-101', title: 'Cybersecurity 101: Cybersecurity for Everyone', issuer: 'STI College Dasmariñas', date: 'Dec 2024' },
  { id: 'java-foundations', title: 'Java Foundations', issuer: 'Oracle Academy', date: 'Jun 2022' },
]

// ------------------------------------------------------------
// 8. SKILLS
// ------------------------------------------------------------
// `category` groups them on the page. The order here is the order shown.
export const skills = [
  { id: 'vue', name: 'Vue.js', category: 'Frontend' },
  { id: 'htmlcss', name: 'HTML & CSS', category: 'Frontend' },
  { id: 'js', name: 'JavaScript', category: 'Frontend' },
  { id: 'tailwind', name: 'Tailwind', category: 'Frontend' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend' },

  { id: 'laravel', name: 'PHP & Laravel', category: 'Backend' },
  { id: 'java', name: 'Java', category: 'Backend' },
  { id: 'csharp', name: 'C#', category: 'Backend' },
  { id: 'mysql', name: 'MySQL', category: 'Backend' },
  { id: 'firebase', name: 'Firebase', category: 'Backend' },

  { id: 'androidstudio', name: 'Android Studio', category: 'Tools' },
  { id: 'unity', name: 'Unity', category: 'Tools' },
  { id: 'figma', name: 'Figma', category: 'Tools' },
  { id: 'git', name: 'Git & GitHub', category: 'Tools' },
]
