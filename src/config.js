// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to personalise the whole portfolio.
// ─────────────────────────────────────────────────────────────
import photo from './assets/me.jpg' // seated photo (skills scene, desk monitor)
import photoStanding from './assets/photo.jpg' // standing photo (hero)

// 🎨 THEME COLOURS — change these two values to recolour the whole site
// (buttons, gradients, glows, highlights, particles…). Works in dark & light mode.
// Ready-made combos you can paste in:
//   Emerald → Sky   : '#10b981', '#38bdf8'   (default)
//   Violet → Pink   : '#8b5cf6', '#ec4899'
//   Orange → Amber  : '#f97316', '#f59e0b'
//   Blue → Indigo   : '#3b82f6', '#6366f1'
//   Red → Rose      : '#ef4444', '#f43f5e'
//   Teal → Lime     : '#14b8a6', '#84cc16'
// ✉️ CONTACT FORM: paste your free Web3Forms access key here (see GUIDE.md, step 1).
// While it is empty, the form falls back to opening the visitor's email app.
export const contactForm = {
  web3formsKey: '5a21fc04-c8d9-4422-b0d6-6428b35f0820',
}

export const theme = {
  accent: '#10b981',
  accent2: '#38bdf8',
}

export const profile = {
  firstName: 'Hamid',
  lastName: 'Ahmat',
  fullName: 'Nguilimy Hamid Ahmat Brahim',
  initials: 'HA',
  role: 'Web, Mobile & Full-Stack Developer',
  title: 'Web, Mobile & Data Builder',
  status: 'Open to opportunities',
  location: 'Kigali, Rwanda',
  education: 'Computer Science & Data Science — Kigali Independent University (ULK)',
  photo,
  photoStanding,
  tagline:
    'Computer Science & Data Science student building websites, cross-platform mobile apps, robust APIs and data-driven tools with React, Next.js, React Native, TypeScript, Node.js & Python.',
  email: 'nguilimyhamid0727@gmail.com',
  // Leave a link empty ('') to hide its icon.
  // 📄 CV: put your PDF in the /public folder (e.g. public/cv.pdf), then set '/cv.pdf' here.
  //    Leave '' to hide the "Download CV" buttons.
  cv: '/cv.pdf',
  socials: {
    github: 'https://github.com/nguilimy',
    linkedin: 'https://www.linkedin.com/in/nguilimy-hamid-ahmat-brahim-40033b343',
    twitter: 'https://x.com/hamid_ahma59250',
    instagram: 'https://www.instagram.com/hamidahmat_nguilimy_0727/',
    facebook: 'https://www.facebook.com/hamid.ahmat.184',
  },
}

// Shown in the pinned "skills" scene (name, self-rated level %, colour)
export const skills = [
  { name: 'React Native', level: 88, color: '#61dafb' },
  { name: 'React', level: 85, color: '#61dafb' },
  { name: 'TypeScript', level: 82, color: '#3178c6' },
  { name: 'JavaScript', level: 88, color: '#f7df1e' },
  { name: 'Node.js / Express', level: 85, color: '#68a063' },
  { name: 'Python', level: 85, color: '#3776ab' },
  { name: 'Flask / FastAPI', level: 78, color: '#22d3a5' },
  { name: 'MySQL', level: 80, color: '#00758f' },
  { name: 'MongoDB', level: 75, color: '#47a248' },
  { name: 'Firebase', level: 75, color: '#ffca28' },
  { name: 'scikit-learn / ML', level: 72, color: '#f89939' },
  { name: 'Docker', level: 70, color: '#2496ed' },
  { name: 'PHP', level: 68, color: '#8892bf' },
  { name: 'C / C++', level: 70, color: '#659ad2' },
]

// Bento cards in the "My Skills" section
export const expertise = [
  {
    icon: 'mobile',
    title: 'Web & Mobile Development',
    text: 'Responsive websites with React and Next.js, and cross-platform iOS & Android apps with React Native and Expo — clean UI systems and solid state management.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'React Native', 'Expo', 'TypeScript'],
    size: 'wide',
  },
  {
    icon: 'server',
    title: 'Backend & APIs',
    text: 'Secure REST APIs with authentication (JWT, Google OAuth), email/SMS integrations and documented endpoints, backed by SQL & NoSQL databases.',
    tags: ['Node.js', 'Express', 'Flask', 'FastAPI', 'MySQL', 'MongoDB', 'Swagger'],
    size: 'tall',
  },
  {
    icon: 'data',
    title: 'Data Science & ML',
    text: 'From data cleaning and analysis to training and serving machine-learning models.',
    tags: ['Pandas', 'scikit-learn', 'TensorFlow', 'R', 'Power BI'],
    size: 'normal',
  },
  {
    icon: 'cloud',
    title: 'Cloud & DevOps',
    text: 'Containerised deployments with automated CI/CD pipelines on the cloud.',
    tags: ['Docker', 'GitHub Actions', 'AWS', 'Azure', 'Render', 'Vercel'],
    size: 'normal',
  },
]

// Horizontal-scroll project gallery
export const projects = [
  {
    name: 'SMART',
    title: 'Smart Delivery Logistics',
    description: 'Mobile logistics app: create shipments step-by-step, live tracking, fleet & vehicle management, alerts and a delivery dashboard.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Zod'],
    stats: [['Shipments', '1,284'], ['In transit', '312'], ['Vehicles', '48']],
    link: 'https://github.com/nguilimy/Smart_Delivary_Logistic',
  },
  {
    name: 'FINFLOW',
    title: 'FinFlow',
    description: 'Personal finance mobile app with secure sign-up/login and a dashboard, powered by a Python API with JWT auth, deployed on Render.',
    stack: ['Expo Router', 'NativeWind', 'TypeScript', 'Python', 'JWT'],
    stats: [['Balance', '$4,820'], ['Income', '$2,300'], ['Spent', '$1,140']],
    link: 'https://github.com/nguilimy/FinFlow',
  },
  {
    name: 'SPAM',
    title: 'Spam Detection (MLOps)',
    description: 'ML web app that classifies SMS as spam or not using Naive Bayes — trained, containerised with Docker and deployed to AWS / Azure via CI/CD.',
    stack: ['Python', 'scikit-learn', 'Flask', 'Docker', 'GitHub Actions'],
    stats: [['Dataset', '5,572 SMS'], ['Model', 'Naive Bayes'], ['Deploy', 'Docker']],
    link: 'https://github.com/nguilimy/Spam-Detection',
  },
  {
    name: 'API',
    title: 'Auth & Notifications API',
    description: 'Express + MySQL backend with JWT & Google OAuth login, email (Nodemailer) and SMS (Twilio) notifications, documented with Swagger.',
    stack: ['Node.js', 'Express', 'MySQL', 'Passport', 'Swagger'],
    stats: [['Auth', 'JWT'], ['OAuth', 'Google'], ['Docs', 'Swagger']],
    link: 'https://github.com/nguilimy/BackEnd',
  },
  {
    name: 'CRUD',
    title: 'React + Node CRUD',
    description: 'Full-stack CRUD application with a React (Vite) frontend and an Express + MongoDB (Mongoose) REST API.',
    stack: ['React', 'Vite', 'Express', 'MongoDB'],
    stats: [['Create', 'POST'], ['Update', 'PUT'], ['Delete', 'DEL']],
    link: 'https://github.com/nguilimy/REACT-NODE-CRUD',
  },
  {
    name: 'E-SHOP',
    title: 'E-Shop',
    description: 'Responsive e-commerce storefront with product listings and cart interactions built in vanilla HTML, CSS & JavaScript.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    stats: [['Products', '36'], ['Cart', '3'], ['Total', '$249']],
    link: 'https://github.com/nguilimy/E-Shop',
  },
]

// Floating avatars in the "What Clients Say" section.
// 👁 Hidden for now. Set to true once the quotes below are real ones.
export const showTestimonials = false
// ⚠ PLACEHOLDERS — replace with real quotes from teachers, classmates or clients before publishing.
export const testimonials = [
  { initials: 'AB', name: 'Placeholder Name', role: 'Lecturer, ULK', color: '#7c3aed', quote: 'Replace this with a real quote from a lecturer or mentor.' },
  { initials: 'CD', name: 'Placeholder Name', role: 'Classmate', color: '#0ea5e9', quote: 'Replace this with a real quote from a teammate you built a project with.' },
  { initials: 'EF', name: 'Placeholder Name', role: 'Client', color: '#db2777', quote: 'Replace this with feedback from someone you built something for.' },
  { initials: 'GH', name: 'Placeholder Name', role: 'Team Lead', color: '#e11d48', quote: 'Replace this with a real quote.' },
  { initials: 'IJ', name: 'Placeholder Name', role: 'Hackathon teammate', color: '#2563eb', quote: 'Replace this with a real quote.' },
  { initials: 'KL', name: 'Placeholder Name', role: 'Mentor', color: '#d97706', quote: 'Replace this with a real quote.' },
]
