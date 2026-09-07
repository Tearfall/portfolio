// ============================================================
// Portfolio content — this is the ONLY file you edit.
// The site is fully static: no database, no admin panel, no build secrets.
// Change a value here, run `npm run build`, and it ships.
// ============================================================

import avatar from '../assets/profile.png'
import talosCover from '../assets/projects/talos.png'
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
export const ACTIVE_THEME = 5

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
  name: 'Mavi Joar Crisostomo',
  title: 'Web Developer',
  bio: 'A passionate web developer specializing in beautiful and functional websites. Computer science graduate, strongest in front-end and UI/UX, and steadily growing into backend work.',
  email: 'crisostomo.mavijoar2003@gmail.com',
  phone: '+63 994 418 5812',
  location: 'Cavite, Philippines',
  avatar_url: avatar,
  resume_url: '',
  github_url: 'https://github.com/Tearfall',
  linkedin_url: 'https://www.linkedin.com/in/mavi-joar-crisostomo/',
  twitter_url: '',
  website_url: '',
  instagram_url: 'https://www.instagram.com/i.am.joar/',

  // Longer "About me" copy carried over from the previous portfolio.
  // No theme renders this yet — kept here so the text isn't lost.
  about: [
    'I am a computer science graduate with a strong foundation in programming and web development. I have experience in building responsive and user-friendly websites using modern technologies.',
    "During my academic career, I specialized in front-end development and UI/UX design. While this remains my primary strength, I'm actively expanding my skills into backend development to become a more versatile developer.",
    'My goal is to create seamless user experiences that are both functional and visually appealing, while also writing clean and understandable code.',
  ],
}

// ------------------------------------------------------------
// 4. PROJECTS
// ------------------------------------------------------------
// tech_stack is a comma-separated string; the themes split it themselves.
// Card link order: project_url -> repo_url -> design_url.
// `tags` is carried over from the old site and is not rendered by any theme yet.
export const projects = [
  {
    id: 'talos',
    title: 'Talos',
    description: "Data visualization and analytics platform for an institution's strategic planning.",
    tech_stack: 'Vue, JavaScript, Tailwind, Firebase',
    image_url: talosCover,
    project_url: '',
    repo_url: '',
    design_url: 'https://www.figma.com/design/L2IDrSvZnucxpGm6iszkm1/Talos?node-id=0-1&t=yNukCu08nlS0LALk-1',
    tags: ['Web App', 'Data Visualization', 'Analytics'],
    featured: true,
  },
  {
    id: 'nerdi',
    title: 'Nerdi',
    description: 'A mobile studying tool for students with interactive flashcards and quizzes.',
    tech_stack: 'Android Studio, Firebase, Java',
    image_url: nerdiCover,
    project_url: '',
    repo_url: 'https://github.com/Tearfall/Nerdi',
    design_url: 'https://www.figma.com/design/GhZbsVBeqmTZkpzjiXdTR8/Nerdi?node-id=0-1&t=ccwOylWyXWSbdP5o-1',
    tags: ['Mobile App', 'Flashcards', 'Quizzes'],
    featured: true,
  },
  {
    id: 'promee',
    title: 'Promee',
    description: 'A task management tool integrated with a Kanban board and the 3-2-1 productivity rule for improved self-productivity and project management.',
    tech_stack: 'Android Studio, Firebase, Java',
    image_url: promeeCover,
    project_url: '',
    repo_url: '',
    design_url: 'https://www.figma.com/design/hJ0cbAc0AJqTEj1q8atvJS/Promee--Shared-?node-id=0-1&t=eu12JQittV94VUbP-1',
    tags: ['Mobile App', 'Task Management', 'Kanban'],
    featured: false,
  },
  {
    id: 'mitolohiya',
    title: 'Mitolohiya',
    description: 'A mobile game based on Philippine mythology.',
    tech_stack: 'Unity, C#',
    image_url: mitolohiyaCover,
    project_url: '',
    repo_url: 'https://github.com/TearUp16/mito_dev',
    design_url: '',
    tags: ['Mobile Game', '2D', 'Top-down'],
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
    id: 'gs-junior-swe',
    company: 'GoodStrings Inc.',
    role: 'Junior Software Engineer',
    start_date: 'July 2025',
    end_date: '',
    description: [
      '• Engineered and improved the email chat feature for client CRM systems, leading to more efficient client communication.',
      '• Developed a bulk data import feature and export-to-PDF and Excel functionality, enhancing data management capabilities.',
      '• Designed and developed responsive and user-friendly interfaces, improving overall user experience.',
      '• Used Query Builder and Eloquent ORM to implement full CRUD operations for new system features.',
      '• Optimized data retrieval through Eloquent ORM queries, improving system performance.',
      '• Collaborated with team members to debug and resolve critical bugs within the existing CRM architecture.',
      "• Performed manual QA testing on the company's platform and fixed front-end and back-end issues in assigned systems.",
      '• Built a simple income-expense tracker web application with Laravel and Vue.js as an independent project.',
    ].join('\n'),
  },
  {
    id: 'gs-apprentice',
    company: 'GoodStrings Inc.',
    role: 'Backend Developer Apprentice',
    start_date: 'April 2025',
    end_date: 'July 2025',
    description: [
      '• Used both Query Builder and Eloquent ORM to implement CRUD operations for new system features.',
      '• Designed and developed custom features for client CRM systems.',
      '• Debugged and resolved issues within the existing CRM architecture.',
      '• Engineered database queries through Eloquent ORM to optimize data retrieval.',
      '• Collaborated with team members to identify and fix critical system bugs.',
    ].join('\n'),
  },
  {
    id: 'gs-intern',
    company: 'GoodStrings Inc.',
    role: 'Intern',
    start_date: 'January 2025',
    end_date: 'March 2025',
    description: '',
  },
]

// ------------------------------------------------------------
// 6. EDUCATION
// ------------------------------------------------------------
// Empty for now — the previous portfolio had no education section.
// Fill in an entry like this and it appears automatically:
// { id: 'bscs', school: 'Your University', degree: 'BS Computer Science',
//   start_date: '2019', end_date: '2023', description: '' },
export const education = []

// ------------------------------------------------------------
// 7. SKILLS
// ------------------------------------------------------------
// `category` groups them on the page. The order here is the order shown.
export const skills = [
  { id: 'vue', name: 'Vue.js', category: 'Frontend' },
  { id: 'html', name: 'HTML5', category: 'Frontend' },
  { id: 'css', name: 'CSS3', category: 'Frontend' },
  { id: 'js', name: 'JavaScript', category: 'Frontend' },
  { id: 'tailwind', name: 'Tailwind', category: 'Frontend' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend' },

  { id: 'laravel', name: 'Laravel', category: 'Backend' },
  { id: 'php', name: 'PHP', category: 'Backend' },
  { id: 'java', name: 'Java', category: 'Backend' },
  { id: 'csharp', name: 'C#', category: 'Backend' },
  { id: 'mysql', name: 'MySQL', category: 'Backend' },
  { id: 'firebase', name: 'Firebase', category: 'Backend' },

  { id: 'androidstudio', name: 'Android Studio', category: 'Tools' },
  { id: 'vscode', name: 'VS Code', category: 'Tools' },
  { id: 'unity', name: 'Unity', category: 'Tools' },
  { id: 'git', name: 'Git', category: 'Tools' },
  { id: 'github', name: 'GitHub', category: 'Tools' },
  { id: 'figma', name: 'Figma', category: 'Tools' },
]
