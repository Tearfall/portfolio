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
// 1. COLOR PALETTE (one light set, one dark set)
// ------------------------------------------------------------
// Visitors flip between the two with the toggle button in the corner; the
// choice is remembered, and a first-time visitor gets whichever their
// operating system is set to.
//
//   bg        page background
//   surface   card and form fills
//   ink       body text, rules, outlined buttons
//   accent    the italic line in the headline, the eyebrow, underlines
//   accent2   the primary button, card labels, "View project" links
//   onAccent  text drawn on top of an accent fill — keep it readable
export const PALETTE = {
  light: { bg: '#fafaf8', surface: '#ffffff', ink: '#1c1c1a', accent: '#f29e4c', accent2: '#048ba8', onAccent: '#ffffff' },
  dark:  { bg: '#14130f', surface: '#1e1c17', ink: '#f3f0e7', accent: '#f2a65a', accent2: '#45bcd4', onAccent: '#14130f' },
}

// The teal/slate palette from the plain-HTML portfolio, if you prefer it —
// drop it into `light` above:
// { bg: '#eff4f7', surface: '#e3ecf1', ink: '#10202b', accent: '#0e7c86', accent2: '#4c6473', onAccent: '#ffffff' }

// ------------------------------------------------------------
// 2. PROFILE
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
  resume_url: 'https://drive.google.com/file/d/1plWkpb2rT4L09BubiSVy3pWSHB-nb1Or/view?usp=sharing',
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
// 3. PROJECTS
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
// 4. SKILLS
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
