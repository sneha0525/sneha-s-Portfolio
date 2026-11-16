import heroImage from '../assets/images/hero_designer_studio_1794731065570.jpg';
import shotHome from '../assets/images/shot_home_1794753877204.jpg';
import shotDetail from '../assets/images/shot_detail_1794753872180.jpg';
import shotCheckout from '../assets/images/shot_checkout_1794753874919.jpg';
import shotProfile from '../assets/images/shot_profile_1794753876784.jpg';
import ecommerceImage from '../assets/images/ui_saas_workspace_1794731067071.jpg';
import financeImage from '../assets/images/ui_fintech_mobile_1794731067121.jpg';
import todoImage from '../assets/images/ui_editorial_mobile_1794731169084.jpg';
import parkingImage from '../assets/images/project_smart_parking_1794753876900.jpg';

export const PROFILE = {
  name: 'Sneha Sharma',
  role: 'UI/UX designer · data as a bonus',
  differentiator:
    'I care about both clean data and clean design, from the first wireframe to the query.',
  email: 'snehasharmavatas.24@gmail.com',
  phone: '+91 7814769673',
  linkedin: 'https://www.linkedin.com/in/sneha-sharma-2107b1322/',
  behance: 'https://www.behance.net/snehasharma210',
  behanceProject:
    'https://www.behance.net/gallery/258514473/UI-Designs?platform=direct',
};

export const HERO_IMAGE = heroImage;

export const WORK_SHOTS = [
  {
    label: 'Home',
    src: shotHome,
  },
  {
    label: 'Detail',
    src: shotDetail,
  },
  {
    label: 'Checkout',
    src: shotCheckout,
  },
  {
    label: 'Profile',
    src: shotProfile,
  },
];

export const PROJECTS = [
  {
    id: 'ecommerce-db',
    tag: 'SQL · DBMS',
    title: 'E-Commerce Database Management System',
    desc: 'Relational e-commerce DB; advanced SQL queries for order and sales reports.',
    img: ecommerceImage,
  },
  {
    id: 'finance-tracker',
    tag: 'C',
    title: 'Personal Finance Tracker',
    desc: 'Income and expenses, summary reports, financial trends and budget status.',
    img: financeImage,
  },
  {
    id: 'todo-list',
    tag: 'Data Structures in C',
    title: 'To-Do List',
    desc: 'Linked-list insertion, deletion, traversal and efficient memory management.',
    img: todoImage,
  },
  {
    id: 'smart-parking',
    tag: 'OOP C++',
    title: 'Smart Parking Slot',
    desc: 'Classes, inheritance, polymorphism; fee calculation and real-time details.',
    img: parkingImage,
  },
];

export const HERO_ROWS: Array<[string, string, boolean]> = [
  ['Figma, UI/UX', 'primary', true],
  ['SQL', 'HackerRank 4 Stars', false],
  ['ER Diagrams', 'daily', false],
  ['HTML, CSS, JS', 'fluent', false],
];

export const WORKFLOW: Array<[string, string]> = [
  ['Research', 'Users, goals and the data behind them.'],
  ['Model', 'ER diagram and normalised structure.'],
  ['Design', 'Flows and components in Figma.'],
  ['Ship', 'Specs and HTML, CSS, JavaScript handoff.'],
];

export const STACK: Array<[string, string]> = [
  ['Programming', 'Python, C, C++'],
  ['Web', 'HTML, CSS, JavaScript'],
  ['Database', 'DBMS, SQL (HackerRank 4 Stars)'],
  ['Data Modeling', 'ER Diagrams, Normalization'],
  ['Data Structures', 'Linked Lists, Arrays'],
  ['Concepts', 'OOP, Data Integrity, Query Optimization'],
];

export const CERTS = [
  'Python · Coursera (2025)',
  'DBMS · HackerRank (4 Star, 2025)',
  'HTML5, CSS3, JavaScript · Infosys (2025)',
  'Design Thinking & Creativity · LinkedIn (2024)',
];

export const MARQUEE = [
  'Open to internships',
  'UI/UX first',
  'Data integrity',
  'Based in India',
];
