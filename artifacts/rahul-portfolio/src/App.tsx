import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

// ==========================================
// RESUME DATA & DEFINITIONS
// ==========================================

interface ProjectItem {
  id: string;
  index: string;
  name: string;
  type: string;
  category: 'all' | 'fullstack' | 'client' | 'tools';
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
  tone: 'coral' | 'cobalt';
  url?: string;
  featured?: boolean;
}

const projects: ProjectItem[] = [
  {
    id: 'edubook',
    index: '01',
    name: 'EduBook',
    type: 'Academic Advising & Mentorship Platform',
    category: 'fullstack',
    period: 'Nov 2023 – May 2024',
    description:
      'A web-based platform designed to eliminate student-advisor coordination friction through automated scheduling, student profiles, and real-time academic tracking.',
    highlights: [
      'Built student profile management and advisor-student calendar meeting scheduling engine.',
      'Implemented real-time academic progress tracking and milestone alerts.',
      'Dual data layer using MongoDB for student records and Firebase for instant notification delivery.',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Firebase', 'MongoDB', 'REST APIs'],
    tone: 'cobalt',
    url: 'https://student-teacher-booking.vercel.app/',
    featured: true,
  },
  {
    id: 'bombay-mathurs',
    index: '02',
    name: 'Bombay Mathurs',
    type: 'Community Platform & Member Directory',
    category: 'client',
    period: '2024 – 2025',
    description:
      'A high-traffic digital home for Mathur Association Bombay, bringing together member directories, zonal information, management committees, events, and community newsletters.',
    highlights: [
      'Architected searchable member directory with zonal indexing and responsive detail views.',
      'Structured content publishing workflow for quarterly bulletins and community announcements.',
      'Optimized for cross-device mobile and desktop accessibility with zero performance degradation.',
    ],
    stack: ['React.js', 'Tailwind CSS', 'Member Directory', 'Content Platform', 'Responsive UX'],
    tone: 'coral',
    url: 'https://www.bombaymathurs.com/',
  },
  {
    id: 'nexiom',
    index: '03',
    name: 'Nexiom',
    type: 'Advanced Engineering Consultancy',
    category: 'client',
    period: '2025',
    description:
      'A future-ready engineering web presence for advanced manufacturing and engineering consulting, connecting strategy, sector taxonomy, and regulated industry case studies.',
    highlights: [
      'Engineered structured multi-sector discovery architecture for high-tech manufacturing clients.',
      'Achieved 98+ Lighthouse scores with component lazy-loading and asset compression.',
      'Responsive, high-credibility layout tailored for industrial manufacturing leaders.',
    ],
    stack: ['React.js', 'Sector Navigation', 'Tailwind CSS', 'Performance Optimization'],
    tone: 'cobalt',
    url: 'https://nexiom.in/',
  },
  {
    id: 'doc-converter',
    index: '04',
    name: 'Doc Converter',
    type: 'Privacy-First Document Suite',
    category: 'tools',
    period: '2024',
    description:
      'A client-side private workspace featuring 21 document utilities for converting, merging, splitting, compressing, and signing files without external server uploads.',
    highlights: [
      '21 client-side PDF and document processing modules running in browser memory.',
      'Zero data leakage architecture: zero file uploads to external servers for complete privacy.',
      'Instant local processing with intuitive drag-and-drop workflow.',
    ],
    stack: ['React.js', 'PDF Workflows', 'Local-First UX', 'Tailwind CSS'],
    tone: 'cobalt',
    url: 'https://doc-converter-sigma.vercel.app/',
  },
  {
    id: 'kashvi-app',
    index: '05',
    name: 'Kashvi Communications',
    type: '360° Marketing & Advertising Platform',
    category: 'client',
    period: '2025',
    description:
      'Official digital and mobile platform for Kashvi Communications, a 360° advertising agency, streamlining service discovery, portfolio exploration, and client inquiry generation.',
    highlights: [
      'Designed interactive service showcase for branding, digital marketing, and production verticals.',
      'Built streamlined lead capture inquiry pipeline integrated with backend CRM.',
      'Published live on Google Play / APK ecosystem with smooth touch interactions.',
    ],
    stack: ['Android App', 'JavaScript', 'Service Discovery', 'Inquiry Pipeline', 'API Integration'],
    tone: 'coral',
    url: 'https://apkpure.net/kashvi-communications/com.example.kashvi',
  },
];

interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'cloud' | 'core';
  categoryLabel: string;
  badge: string;
  description: string;
}

const skillsData: SkillItem[] = [
  // Languages
  { name: 'JavaScript (ES6+)', category: 'languages', categoryLabel: 'Language', badge: 'JS', description: 'Async/Await, Closures, DOM, Functional Patterns' },
  { name: 'Java', category: 'languages', categoryLabel: 'Language', badge: 'JAVA', description: 'OOP principles, Data Structures, Algorithmic thinking' },
  { name: 'C / C++', category: 'languages', categoryLabel: 'Language', badge: 'C++', description: 'System fundamentals, Memory layout, Pointer mechanics' },
  
  // Frontend
  { name: 'React.js', category: 'frontend', categoryLabel: 'Frontend', badge: 'REACT', description: 'Custom Hooks, Context API, Virtual DOM, Component Design' },
  { name: 'Tailwind CSS', category: 'frontend', categoryLabel: 'Frontend', badge: 'TW', description: 'Responsive layouts, Design systems, Micro-animations' },
  { name: 'HTML5 & CSS3', category: 'frontend', categoryLabel: 'Frontend', badge: 'HTML/CSS', description: 'Semantic markup, Accessibility (WCAG), CSS Grid/Flexbox' },
  
  // Backend
  { name: 'Node.js', category: 'backend', categoryLabel: 'Backend', badge: 'NODE', description: 'Asynchronous event loop, Stream processing, Middleware' },
  { name: 'Express.js', category: 'backend', categoryLabel: 'Backend', badge: 'EXPRESS', description: 'RESTful API routing, Request validation, Error middleware' },
  { name: 'REST APIs', category: 'backend', categoryLabel: 'Backend', badge: 'API', description: 'Clean contract design, CRUD operations, Status semantics' },
  { name: 'Socket.IO', category: 'backend', categoryLabel: 'Backend', badge: 'SOCKET', description: 'Real-time duplex events, Notification channels' },
  
  // Databases
  { name: 'PostgreSQL', category: 'databases', categoryLabel: 'Database', badge: 'PGSQL', description: 'Relational schemas, Foreign keys, Indexing, Transactions' },
  { name: 'MongoDB', category: 'databases', categoryLabel: 'Database', badge: 'MONGO', description: 'Document models, Aggregation pipelines, Atlas hosting' },
  
  // DevOps & Cloud
  { name: 'AWS (Cloud)', category: 'cloud', categoryLabel: 'DevOps & Cloud', badge: 'AWS', description: 'EC2 compute, S3 asset buckets, VPC networking, Route 53' },
  { name: 'Docker', category: 'cloud', categoryLabel: 'DevOps & Cloud', badge: 'DOCKER', description: 'Containerization, Multi-stage builds, Container lifecycle' },
  { name: 'GitHub Actions', category: 'cloud', categoryLabel: 'DevOps & Cloud', badge: 'CI/CD', description: 'Automated CI pipelines, Build validations, Deploy scripts' },
  { name: 'Git / GitHub', category: 'cloud', categoryLabel: 'DevOps & Cloud', badge: 'GIT', description: 'Branch workflows, Semantic commits, Collaborative PRs' },
  { name: 'Render / Vercel', category: 'cloud', categoryLabel: 'DevOps & Cloud', badge: 'DEPLOY', description: 'Automated previews, Edge delivery, SSL management' },
  
  // Core Concepts
  { name: 'JWT Authentication', category: 'core', categoryLabel: 'Core Architecture', badge: 'AUTH', description: 'Token validation, Role-based auth, Refresh mechanisms' },
  { name: 'CRUD & System Flow', category: 'core', categoryLabel: 'Core Architecture', badge: 'CRUD', description: 'Full-stack data lifecycles, Sanitization, Error boundaries' },
  { name: 'CI/CD & Deployment', category: 'core', categoryLabel: 'Core Architecture', badge: 'OPS', description: 'Automated releases, Environment variables, Zero downtime' },
];

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  type: string;
  badgeLabel: string;
  tone: 'coral' | 'mint' | 'cobalt';
  description: string;
  competencies: string[];
  verificationNote: string;
}

const certificatesData: CertificateItem[] = [
  {
    id: 'fifth-quarter-intern',
    title: 'Software Developer Intern Certificate',
    issuer: 'Fifth Quarter Infomedia PVT. LTD',
    issuedDate: 'Issued September 2025',
    type: 'Professional Experience Credential',
    badgeLabel: 'Verified Industry Credential',
    tone: 'coral',
    description:
      'Awarded upon successful completion of a rigorous 15-month internship focusing on scalable front-end systems, responsive UI components, cross-browser compatibility, and application stability.',
    competencies: [
      'Scalable Web Interface Engineering (HTML5, CSS3, JavaScript)',
      'Cross-Browser & Multi-Device Compatibility Testing',
      'Interactive UI Component System Architecture',
      'Client-Side Performance Optimization & Bug Resolution',
      'Collaborative Agile Engineering Workflow',
    ],
    verificationNote: 'Issued following 15 months of active contributions at Fifth Quarter Infomedia PVT. LTD, Mumbai.',
  },
  {
    id: 'honor-degree-ds',
    title: 'Honors Specialization in Data Science',
    issuer: 'Shree L.R Tiwari College of Engineering (Mumbai University)',
    issuedDate: 'Concurrently with Major Degree (2022 – 2026)',
    type: 'University Academic Honor',
    badgeLabel: 'Merit Honors Degree',
    tone: 'mint',
    description:
      'Awarded the competitive opportunity by college academic council to pursue an advanced Honors specialization in Data Science concurrently with the Bachelor of Engineering major.',
    competencies: [
      'Statistical Analysis & Exploratory Data Computing',
      'Predictive Modeling & Machine Learning Principles',
      'Data Engineering Pipelines & Model Evaluation',
      'Quantitative Problem Solving & Algorithmic Design',
      'Data Structures & Advanced Analytics',
    ],
    verificationNote: 'Awarded to top-tier percentile students based on academic standing and faculty recommendation.',
  },
  {
    id: 'be-computer-eng',
    title: 'Bachelor of Engineering in Computer Engineering',
    issuer: 'Shree L.R Tiwari College of Engineering, Mumbai',
    issuedDate: 'Nov 2022 – May 2026 (Avg CGPA: 8.17)',
    type: 'Undergraduate Engineering Degree',
    badgeLabel: 'Academic Excellence (CGPA 8.17)',
    tone: 'cobalt',
    description:
      'Comprehensive 4-year technical curriculum encompassing software engineering, distributed systems, database design, operating systems, cloud architecture, and web technology.',
    competencies: [
      'Object-Oriented Programming (Java, C++)',
      'Database Management Systems (RDBMS, NoSQL)',
      'Computer Networks, Security & Cloud Protocols',
      'Software Engineering & Project Management',
      'Full Stack Web Development Methodologies',
    ],
    verificationNote: 'Consistently maintained an 8.17 Average CGPA across coursework and practical laboratories.',
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [skillCategory, setSkillCategory] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Quick message form state
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const navigateTo = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const copyEmail = async () => {
    const email = 'rahulgupta959484@gmail.com';
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const helper = document.createElement('textarea');
        helper.value = email;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        helper.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    setMsgSent(true);
    window.setTimeout(() => {
      setMsgName('');
      setMsgEmail('');
      setMsgText('');
      setMsgSent(false);
    }, 3500);
  };

  const filteredProjects = projects.filter(
    (p) => projectFilter === 'all' || p.category === projectFilter,
  );

  const filteredSkills = skillsData.filter(
    (s) => skillCategory === 'all' || s.category === skillCategory,
  );

  return (
    <main className="portfolio-shell min-h-[100dvh] text-[#17203f]">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Primary Sticky Header */}
      <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 sm:px-7 sm:pt-6">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between border border-[#17203f]/15 bg-[#f2f0e8]/92 px-4 py-3 shadow-[4px_5px_0_rgba(23,32,63,.09)] backdrop-blur-md sm:px-6"
          aria-label="Primary navigation"
        >
          {/* Logo & Identity */}
          <button
            type="button"
            onClick={() => navigateTo('top')}
            className="focus-ring flex items-center gap-3"
            data-testid="button-logo-home"
          >
            <span className="flex h-9 w-9 items-center justify-center bg-[#17203f] font-mono text-sm font-semibold text-[#b9f3ee] shadow-xs">
              RG
            </span>
            <div className="text-left">
              <span className="block text-sm font-bold tracking-tight">Rahul Gupta</span>
              <span className="hidden text-[11px] font-medium text-[#17203f]/60 sm:block">Full Stack Developer</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[.12em] md:flex">
            {[
              ['work', 'Work'],
              ['skills', 'Skills'],
              ['experience', 'Experience'],
              ['certifications', 'Certificates'],
              ['approach', 'Approach'],
            ].map(([id, label]) => (
              <button
                type="button"
                key={id}
                onClick={() => navigateTo(id)}
                className="link-underline focus-ring text-[#17203f]/70 transition-colors hover:text-[#17203f]"
                data-testid={`button-nav-${id}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Header Action CTAs */}
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="focus-ring flex items-center gap-2 border border-[#17203f]/30 px-3.5 py-2 text-xs font-bold uppercase tracking-[.08em] transition-all hover:bg-[#17203f] hover:text-[#f2f0e8]"
              data-testid="button-nav-resume"
            >
              <FileText size={14} /> Resume
            </button>
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="focus-ring flex items-center gap-2 bg-[#17203f] px-4 py-2 text-xs font-bold uppercase tracking-[.08em] text-[#b9f3ee] transition-all hover:-translate-y-0.5 hover:bg-[#087f8f]"
              data-testid="button-nav-contact"
            >
              Let&apos;s Talk <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring flex h-9 w-9 items-center justify-center border border-[#17203f]/20 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-7xl border border-[#17203f]/15 bg-[#f2f0e8] p-4 shadow-[6px_8px_0_rgba(23,32,63,.12)] md:hidden">
            <div className="flex flex-col gap-1">
              {[
                ['work', 'Selected Work'],
                ['skills', 'Skills & Tech Stack'],
                ['experience', 'Professional Experience'],
                ['certifications', 'Certificates & Honors'],
                ['approach', 'Philosophy & Approach'],
                ['contact', 'Contact Rahul'],
              ].map(([id, label]) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => navigateTo(id)}
                  className="focus-ring flex w-full items-center justify-between border-b border-[#17203f]/10 py-3 text-left text-sm font-semibold"
                  data-testid={`button-mobile-nav-${id}`}
                >
                  {label} <ArrowUpRight size={15} />
                </button>
              ))}
              <div className="mt-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setResumeOpen(true);
                  }}
                  className="focus-ring flex w-full items-center justify-center gap-2 border border-[#17203f] bg-[#17203f] py-3 text-center text-sm font-bold text-[#b9f3ee]"
                  data-testid="button-mobile-view-resume"
                >
                  <FileText size={16} /> View & Download Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section id="top" className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-44 lg:px-12">
        {/* Subtle Decorative Geometry */}
        <div className="pointer-events-none absolute right-[6%] top-28 hidden h-64 w-64 rounded-full border border-[#17203f]/15 lg:block">
          <div className="hero-orbit absolute -right-3 top-1/2 h-6 w-6 rounded-full bg-[#f0784f]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-[#17203f]/20" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#17203f]" />
        </div>

        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-20">
          <div>
            {/* Live Availability Status Pill */}
            <div className="reveal mb-6 inline-flex items-center gap-3 border border-[#17203f]/20 bg-[#f2f0e8] px-3.5 py-1.5 shadow-[2px_2px_0_rgba(23,32,63,.08)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#087f8f] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#087f8f]" />
              </span>
              <span className="mono-font text-xs font-bold uppercase tracking-[.14em] text-[#17203f]">
                Full Stack Developer · Mumbai, India
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="display-font reveal reveal-1 max-w-5xl text-[clamp(3.8rem,10vw,8.8rem)] font-bold leading-[.84]">
              Build the
              <br />
              <span className="relative inline-block text-[#087f8f]">
                useful
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 330 18" fill="none" aria-hidden="true">
                  <path d="M2 11C82 1 204 3 327 10" stroke="#f0784f" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              <span className="text-[#17203f]">clearly.</span>
            </h1>

            {/* Resume Objective Statement */}
            <p className="reveal reveal-2 mt-8 max-w-2xl text-lg leading-relaxed text-[#17203f]/80 sm:text-xl">
              I&apos;m <strong>Rahul Gupta</strong> — a JavaScript-focused Full Stack Developer with hands-on experience building scalable, responsive web applications with <strong>React.js, Node.js, Express, databases, and AWS</strong>. Currently delivering production web applications at <strong className="text-[#17203f]">Kashvi Communications</strong>.
            </p>

            {/* Resume Fast Metrics Ribbon */}
            <div className="reveal reveal-2 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="border border-[#17203f]/15 bg-[#deddd3]/60 p-3">
                <span className="mono-font text-[10px] uppercase tracking-wider text-[#17203f]/60">Academic Merit</span>
                <p className="mt-1 font-mono text-xl font-bold text-[#087f8f]">8.17 CGPA</p>
                <p className="text-[11px] text-[#17203f]/70">B.E Computer Eng</p>
              </div>
              <div className="border border-[#17203f]/15 bg-[#deddd3]/60 p-3">
                <span className="mono-font text-[10px] uppercase tracking-wider text-[#17203f]/60">Production</span>
                <p className="mt-1 font-mono text-xl font-bold text-[#f0784f]">5 Builds</p>
                <p className="text-[11px] text-[#17203f]/70">Shipped Live Apps</p>
              </div>
              <div className="border border-[#17203f]/15 bg-[#deddd3]/60 p-3">
                <span className="mono-font text-[10px] uppercase tracking-wider text-[#17203f]/60">Cloud Stack</span>
                <p className="mt-1 font-mono text-xl font-bold text-[#17203f]">AWS & Docker</p>
                <p className="text-[11px] text-[#17203f]/70">EC2, S3, Route 53</p>
              </div>
              <div className="border border-[#17203f]/15 bg-[#deddd3]/60 p-3">
                <span className="mono-font text-[10px] uppercase tracking-wider text-[#17203f]/60">Honors</span>
                <p className="mt-1 font-mono text-xl font-bold text-[#087f8f]">Data Science</p>
                <p className="text-[11px] text-[#17203f]/70">Specialization</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="reveal reveal-3 mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('work')}
                className="focus-ring flex items-center gap-2 bg-[#17203f] px-5 py-3.5 text-sm font-bold text-[#b9f3ee] transition-all hover:-translate-y-1 hover:bg-[#087f8f]"
                data-testid="button-hero-work"
              >
                Explore Projects <ArrowDownRight size={17} />
              </button>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="focus-ring flex items-center gap-2 border border-[#17203f] bg-[#f2f0e8] px-5 py-3.5 text-sm font-bold text-[#17203f] transition-all hover:-translate-y-1 hover:bg-[#b9f3ee]"
                data-testid="button-hero-resume-modal"
              >
                <FileText size={17} /> View Resume
              </button>
              <button
                type="button"
                onClick={() => navigateTo('certifications')}
                className="focus-ring flex items-center gap-2 border border-[#17203f]/30 px-4 py-3.5 text-sm font-semibold text-[#17203f] transition-all hover:border-[#17203f]"
                data-testid="button-hero-certs"
              >
                <Award size={17} /> Certificates
              </button>
            </div>
          </div>

          {/* Hero Aside / Manifesto Note */}
          <div className="reveal reveal-3 relative lg:pb-6">
            <div className="border-l-3 border-[#f0784f] bg-[#f2f0e8]/80 p-6 pl-6 shadow-[4px_6px_0_rgba(23,32,63,.06)]">
              <p className="mono-font text-[11px] uppercase tracking-[.14em] text-[#17203f]/60">Engineering Philosophy</p>
              <p className="mt-4 text-2xl font-bold leading-tight tracking-[-.03em]">
                From first interface to reliable deployment.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#17203f]/70">
                A great product requires clear code at every tier. I connect responsive user interfaces with robust Express REST APIs, performant PostgreSQL/MongoDB data models, and automated deployment pipelines.
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-[#17203f]/15 pt-4 text-xs font-semibold text-[#17203f]/70">
                <ShieldCheck size={16} className="text-[#087f8f]" />
                <span>Clean CRUD • JWT Auth • Cloud Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex items-center gap-4 text-xs font-semibold uppercase tracking-[.12em] text-[#17203f]/50">
          <span className="h-px w-14 bg-[#17203f]/25" />
          Scroll to explore projects & credentials
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ==========================================
          01: PHILOSOPHY & APPROACH
      ========================================== */}
      <section id="approach" className="border-y border-[#17203f]/15 bg-[#17203f] text-[#f2f0e8]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.78fr_1.22fr] lg:px-12">
          <div>
            <p className="mono-font text-xs uppercase tracking-[.18em] text-[#b9f3ee]">01 / Point of view</p>
            <h2 className="display-font mt-6 max-w-sm text-5xl font-bold leading-[.92] sm:text-6xl">
              Clarity is a technical skill.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#f2f0e8]/70">
              Writing scalable software is not just about choosing frameworks; it&apos;s about building systems where the next step is obvious to both user and developer.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-12">
            <div className="border-t border-[#f2f0e8]/20 pt-5">
              <p className="mono-font text-sm text-[#f0784f]">01</p>
              <h3 className="mt-5 text-xl font-bold tracking-[-.03em]">Start with the user&apos;s next move</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#f2f0e8]/65">
                A strong interface makes the right path feel natural. I bring that same intentionality to database schemas, REST APIs, and error boundaries.
              </p>
            </div>
            <div className="border-t border-[#f2f0e8]/20 pt-5">
              <p className="mono-font text-sm text-[#b9f3ee]">02</p>
              <h3 className="mt-5 text-xl font-bold tracking-[-.03em]">Make full-stack systems coherent</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#f2f0e8]/65">
                JavaScript across frontend and backend lets me hold the complete lifecycle in view — making thoughtful trade-offs between client rendering and server performance.
              </p>
            </div>
            <div className="border-t border-[#f2f0e8]/20 pt-5 sm:col-span-2">
              <p className="mono-font text-sm text-[#f0784f]">03</p>
              <h3 className="mt-5 max-w-md text-xl font-bold tracking-[-.03em]">Ship with infrastructure that lasts</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f2f0e8]/65">
                GitHub Actions, Docker containers, and AWS environments (EC2, S3, Route 53) are integral parts of the craft. They ensure good code maintains its stability and speed in production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          02: SELECTED WORK (FILTERABLE + RESUME HIGHLIGHTS)
      ========================================== */}
      <section id="work" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#17203f]/15 pb-8">
          <div>
            <p className="mono-font text-xs uppercase tracking-[.18em] text-[#087f8f]">02 / Featured Projects</p>
            <h2 className="display-font mt-4 text-5xl font-bold leading-none sm:text-7xl">Made to matter.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#17203f]/70">
            Engineered across education, community platforms, documents, mobile agency platforms, and corporate consultancy.
          </p>
        </div>

        {/* Project Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mono-font mr-2 text-xs uppercase text-[#17203f]/50">Filter:</span>
          {[
            ['all', 'All Projects (5)'],
            ['fullstack', 'Full Stack & Cloud'],
            ['client', 'Client Platforms'],
            ['tools', 'Tools & Utilities'],
          ].map(([key, label]) => (
            <button
              type="button"
              key={key}
              onClick={() => setProjectFilter(key)}
              className={`focus-ring interactive-pill border px-3.5 py-1.5 text-xs font-bold transition-all ${
                projectFilter === key
                  ? 'border-[#17203f] bg-[#17203f] text-[#b9f3ee]'
                  : 'border-[#17203f]/20 bg-[#f2f0e8] text-[#17203f]/70 hover:border-[#17203f]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {filteredProjects.map((project) => {
            const isOpen = activeProject === project.id;
            const isCobalt = project.tone === 'cobalt';
            return (
              <article
                key={project.id}
                className={`project-card relative flex flex-col justify-between overflow-hidden border border-[#17203f]/20 p-6 sm:p-8 ${
                  isCobalt ? 'bg-[#087f8f] text-[#f2f0e8]' : 'bg-[#f0784f] text-[#17203f]'
                }`}
                data-testid={`card-project-${project.id}`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="mono-font text-xs font-bold opacity-75">{project.index}</span>
                      {project.featured && (
                        <span className="border border-current/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          Resume Highlight
                        </span>
                      )}
                    </div>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name} live site`}
                        className="focus-ring flex h-10 w-10 items-center justify-center border border-current/30 transition-transform hover:-translate-y-1"
                        data-testid={`link-project-${project.id}`}
                      >
                        <ArrowUpRight className="project-arrow" size={18} />
                      </a>
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center border border-current/30">
                        <ArrowUpRight className="project-arrow" size={18} />
                      </span>
                    )}
                  </div>

                  <div className="mt-14 sm:mt-20">
                    <div className="flex items-center justify-between">
                      <p className="mono-font text-xs uppercase tracking-[.14em] opacity-75">{project.type}</p>
                      <span className="mono-font text-xs opacity-65">{project.period}</span>
                    </div>
                    <h3 className="display-font mt-3 text-4xl font-bold leading-none sm:text-6xl">{project.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed opacity-85">{project.description}</p>
                  </div>

                  {/* Stack Badges */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-current/25 bg-black/5 px-2 py-1 text-[11px] font-semibold tracking-tight"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions & Expandable Deep-Dive */}
                <div className="mt-8 border-t border-current/20 pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center gap-2 border-b border-current/40 pb-1 text-sm font-bold"
                        data-testid={`link-project-visit-${project.id}`}
                      >
                        Launch live build <ArrowUpRight size={15} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveProject(isOpen ? null : project.id)}
                      className="focus-ring flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                      aria-expanded={isOpen}
                      data-testid={`button-project-details-${project.id}`}
                    >
                      {isOpen ? 'Hide Architecture' : 'View Architecture'}
                      <ChevronDown size={15} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Expandable Technical Breakdown */}
                  {isOpen && (
                    <div className="mt-4 space-y-2 border-t border-current/20 pt-4 text-xs" data-testid={`text-project-note-${project.id}`}>
                      <p className="font-bold uppercase tracking-wider opacity-90">Technical Key Takeaways:</p>
                      <ul className="space-y-1.5 opacity-90">
                        {project.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          03: WORKING TOOLKIT & SKILLS (CATEGORIZED TABS)
      ========================================== */}
      <section id="skills" className="border-t border-[#17203f]/15 bg-[#deddd3]/50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#17203f]/15 pb-8">
            <div>
              <p className="mono-font text-xs uppercase tracking-[.18em] text-[#087f8f]">03 / Technical Matrix</p>
              <h2 className="display-font mt-4 text-5xl font-bold leading-none sm:text-7xl">Working toolkit.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#17203f]/70">
              Directly aligned with production experience across modern JavaScript architectures, backend databases, containerization, and AWS cloud orchestration.
            </p>
          </div>

          {/* Skill Category Selector */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              ['all', 'All Core Skills'],
              ['frontend', 'Frontend & UI'],
              ['backend', 'Backend & APIs'],
              ['databases', 'Databases'],
              ['cloud', 'DevOps & Cloud'],
              ['languages', 'Languages'],
              ['core', 'Architecture'],
            ].map(([cat, label]) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSkillCategory(cat)}
                className={`focus-ring interactive-pill border px-3.5 py-1.5 text-xs font-bold transition-all ${
                  skillCategory === cat
                    ? 'border-[#17203f] bg-[#17203f] text-[#b9f3ee]'
                    : 'border-[#17203f]/20 bg-[#f2f0e8] text-[#17203f]/70 hover:border-[#17203f]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Categorized Skills Grid */}
          <div className="mt-8 grid grid-cols-1 gap-px border border-[#17203f]/15 bg-[#17203f]/15 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col justify-between bg-[#f2f0e8] p-5 transition-colors hover:bg-[#b9f3ee]"
                data-testid={`text-skill-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="mono-font text-[10px] uppercase tracking-wider text-[#17203f]/50">
                      {skill.categoryLabel}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#f0784f]">{skill.badge}</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold tracking-tight text-[#17203f]">{skill.name}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#17203f]/70">{skill.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 border-t border-[#17203f]/10 pt-3 text-[11px] font-semibold text-[#087f8f]">
                  <CheckCircle2 size={13} />
                  <span>Production Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          04: PROFESSIONAL EXPERIENCE
      ========================================== */}
      <section id="experience" className="border-t border-[#17203f]/15 bg-[#deddd3]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="mono-font text-xs uppercase tracking-[.18em] text-[#087f8f]">04 / Career Path</p>
              <h2 className="display-font mt-4 max-w-sm text-5xl font-bold leading-[.88] sm:text-7xl">
                From interface to infrastructure.
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#17203f]/70">
                A steady trajectory from responsive front-end mastery into full-stack architecture, database design, and cloud deployments.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="focus-ring inline-flex items-center gap-2 border border-[#17203f] bg-[#17203f] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#b9f3ee] transition-all hover:bg-[#087f8f]"
                >
                  <Download size={15} /> Download Full CV
                </button>
              </div>
            </div>

            <div className="border-t border-[#17203f]/20">
              {/* Role 1: Kashvi Communications */}
              <div className="border-b border-[#17203f]/20 py-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-3 w-3 rounded-full bg-[#087f8f]" />
                    <span className="mono-font text-xs font-bold uppercase tracking-[.12em] text-[#087f8f]">
                      Nov 2025 — Present (Active)
                    </span>
                  </div>
                  <span className="mono-font text-xs text-[#17203f]/50">Mumbai, India</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">Full Stack Developer</h3>
                <p className="text-sm font-semibold text-[#17203f]/80">Kashvi Communications</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#17203f]/75">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#087f8f]" />
                    <span>Developing responsive and high-performance web applications utilizing <strong>HTML5, CSS3, JavaScript, Node.js, and Express.js</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#087f8f]" />
                    <span>Handling end-to-end API integration and complex database operations with <strong>MongoDB and PostgreSQL</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#087f8f]" />
                    <span>Executing performance tuning, bundle optimization, and automated cloud workflows for production deployments.</span>
                  </li>
                </ul>
              </div>

              {/* Role 2: Fifth Quarter Infomedia */}
              <div className="border-b border-[#17203f]/20 py-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-3 w-3 rounded-full bg-[#f0784f]" />
                    <span className="mono-font text-xs font-bold uppercase tracking-[.12em] text-[#f0784f]">
                      June 2024 — Sep 2025 (15 Months)
                    </span>
                  </div>
                  <span className="mono-font text-xs text-[#17203f]/50">Mumbai, India</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">Frontend Developer Intern</h3>
                <p className="text-sm font-semibold text-[#17203f]/80">Fifth Quarter Infomedia PVT. LTD</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#17203f]/75">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0784f]" />
                    <span>Developed scalable and responsive web interfaces using <strong>HTML5, CSS3, and modern JavaScript</strong>, ensuring seamless cross-browser compatibility.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0784f]" />
                    <span>Engineered interactive UI components, tuned frontend load times, and resolved critical defects to enhance overall user experience and application stability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0784f]" />
                    <span>Awarded the formal <strong>Software Developer Intern Certificate (Issued Sep 2025)</strong> upon successful completion.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          05: CERTIFICATIONS & HONORS (NEW DEDICATED SECTION)
      ========================================== */}
      <section id="certifications" className="border-y border-[#17203f]/15 bg-[#b9f3ee]/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#17203f]/15 pb-8">
            <div>
              <p className="mono-font text-xs uppercase tracking-[.18em] text-[#087f8f]">05 / Verified Credentials</p>
              <h2 className="display-font mt-4 text-5xl font-bold leading-none sm:text-7xl">
                Certifications & Honors.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#17203f]/75">
              Formally verified credentials, internship milestones, and academic honors earned throughout technical education and industry tenure.
            </p>
          </div>

          {/* Certificate Cards Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {certificatesData.map((cert) => {
              const isCoral = cert.tone === 'coral';
              const isMint = cert.tone === 'mint';
              return (
                <div
                  key={cert.id}
                  className="cert-card flex flex-col justify-between border border-[#17203f]/20 bg-[#f2f0e8] p-6 shadow-[4px_6px_0_rgba(23,32,63,.08)]"
                >
                  <div>
                    {/* Badge Pill */}
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          isCoral
                            ? 'border-[#f0784f]/40 bg-[#f0784f]/15 text-[#17203f]'
                            : isMint
                            ? 'border-[#087f8f]/40 bg-[#b9f3ee]/50 text-[#087f8f]'
                            : 'border-[#17203f]/30 bg-[#17203f]/10 text-[#17203f]'
                        }`}
                      >
                        <ShieldCheck size={13} /> {cert.badgeLabel}
                      </span>
                      <span className="mono-font text-[10px] text-[#17203f]/50">{cert.type}</span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-[#17203f]">
                      {cert.title}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-[#087f8f]">{cert.issuer}</p>
                    <p className="mono-font mt-1 text-[11px] text-[#17203f]/60">{cert.issuedDate}</p>

                    <p className="mt-4 text-xs leading-relaxed text-[#17203f]/75">{cert.description}</p>

                    {/* Competencies Preview */}
                    <div className="mt-5 border-t border-[#17203f]/10 pt-4">
                      <p className="mono-font text-[10px] font-bold uppercase tracking-wider text-[#17203f]/60">
                        Key Competencies:
                      </p>
                      <ul className="mt-2 space-y-1.5 text-xs text-[#17203f]/80">
                        {cert.competencies.slice(0, 3).map((comp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check size={13} className="mt-0.5 shrink-0 text-[#087f8f]" />
                            <span>{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Button */}
                  <div className="mt-6 border-t border-[#17203f]/10 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="focus-ring flex w-full items-center justify-center gap-2 border border-[#17203f] bg-transparent py-2 text-xs font-bold uppercase tracking-wider text-[#17203f] transition-colors hover:bg-[#17203f] hover:text-[#b9f3ee]"
                      data-testid={`button-view-cert-${cert.id}`}
                    >
                      <Eye size={14} /> View Credential Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          06: EDUCATION & ACADEMIC RECOGNITION
      ========================================== */}
      <section className="border-b border-[#17203f]/15 bg-[#deddd3]/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-12">
          <div>
            <p className="mono-font text-xs uppercase tracking-[.18em] text-[#087f8f]">06 / Academic Base</p>
            <h2 className="display-font mt-4 text-4xl font-bold sm:text-5xl">Engineered for depth.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#17203f]/70">
              Rigorous undergraduate training coupled with concurrent data science specialization in Mumbai.
            </p>
          </div>

          <div className="border border-[#17203f]/15 bg-[#f2f0e8] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#17203f]/15 pb-4">
              <div className="flex items-center gap-2">
                <GraduationCap size={20} className="text-[#087f8f]" />
                <h3 className="text-lg font-bold">Shree L.R Tiwari College of Engineering</h3>
              </div>
              <span className="mono-font text-xs font-bold text-[#f0784f]">Nov 2022 — May 2026</span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mono-font text-[11px] uppercase tracking-wider text-[#17203f]/60">Major Degree</p>
                <p className="mt-1 font-bold text-[#17203f]">Bachelor of Engineering</p>
                <p className="text-xs text-[#17203f]/70">Computer Engineering</p>
              </div>
              <div>
                <p className="mono-font text-[11px] uppercase tracking-wider text-[#17203f]/60">Cumulative Metric</p>
                <p className="mt-1 font-mono text-xl font-bold text-[#087f8f]">8.17 / 10.0 CGPA</p>
                <p className="text-xs text-[#17203f]/70">Consistent High Standing</p>
              </div>
            </div>

            <div className="mt-6 border-t border-[#17203f]/15 pt-5">
              <div className="inline-flex items-center gap-2 border border-[#087f8f]/30 bg-[#b9f3ee]/30 px-3 py-1 text-xs font-bold text-[#087f8f]">
                <Sparkles size={14} /> Honors Specialization in Data Science Awardee
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#17203f]/70">
                Selected among competitive student applicants to pursue concurrent advanced Data Science honors focusing on algorithmic models, data analytics, and computational pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          07: CONTACT & INTRODUCTION
      ========================================== */}
      <section id="contact" className="bg-[#f0784f] text-[#17203f]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <p className="mono-font text-xs uppercase tracking-[.18em] text-[#17203f]/70">07 / Make an introduction</p>
              <h2 className="display-font mt-6 max-w-3xl text-[clamp(3.8rem,9vw,7.5rem)] font-bold leading-[.84]">
                Have a good
                <br />
                problem?
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#17203f]/80">
                Tell me what you&apos;re building. Whether you need a full-stack engineer for a production platform, a contract sprint, or a technical consultation, my inbox is always open.
              </p>

              {/* Direct Reach Contacts */}
              <div className="mt-10 max-w-md border-t border-[#17203f]/25 pt-6">
                <a
                  href="mailto:rahulgupta959484@gmail.com"
                  className="link-underline focus-ring flex items-center justify-between border-b border-[#17203f]/25 py-4 text-base font-bold sm:text-lg"
                  data-testid="link-contact-email"
                >
                  rahulgupta959484@gmail.com <Mail size={18} />
                </a>
                <a
                  href="tel:+919594884323"
                  className="link-underline focus-ring flex items-center justify-between border-b border-[#17203f]/25 py-4 text-base font-bold sm:text-lg"
                  data-testid="link-contact-phone"
                >
                  +91 9594884323 <Phone size={18} />
                </a>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="focus-ring flex items-center gap-2 border border-[#17203f]/30 bg-transparent px-4 py-2.5 text-xs font-bold transition-colors hover:bg-[#17203f] hover:text-[#f2f0e8]"
                    data-testid="button-copy-email"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? 'Copied to Clipboard!' : 'Copy Email Address'}
                  </button>
                  <a
                    href="https://github.com/rahul959484"
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex items-center gap-2 border border-[#17203f]/30 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-[#17203f] hover:text-[#f2f0e8]"
                    data-testid="link-github"
                  >
                    <Github size={15} /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rahul-gupta-b3569231a"
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex items-center gap-2 border border-[#17203f]/30 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-[#17203f] hover:text-[#f2f0e8]"
                    data-testid="link-linkedin"
                  >
                    <Linkedin size={15} /> LinkedIn
                  </a>
                </div>

                <div className="mt-6">
                  <a
                    href="https://rahul-gupta-portfolio-8zlk.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline focus-ring inline-flex items-center gap-2 text-xs font-bold"
                    data-testid="link-previous-portfolio"
                  >
                    View previous portfolio archive <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Interactive Inquiry Form */}
            <div className="border border-[#17203f]/25 bg-[#f2f0e8] p-6 sm:p-8 shadow-[6px_8px_0_rgba(23,32,63,.15)]">
              <div className="flex items-center justify-between border-b border-[#17203f]/15 pb-4">
                <h3 className="text-xl font-bold tracking-tight">Quick Message</h3>
                <span className="mono-font text-xs text-[#087f8f]">Direct to Rahul</span>
              </div>

              {msgSent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#087f8f] text-[#f2f0e8]">
                    <Check size={24} />
                  </div>
                  <h4 className="mt-4 text-lg font-bold">Message noted!</h4>
                  <p className="mt-2 text-xs text-[#17203f]/70">
                    Thanks for reaching out. Opening default mail client for complete delivery.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="msg-name" className="mono-font block text-xs font-bold uppercase tracking-wider text-[#17203f]/70">
                      Your Name
                    </label>
                    <input
                      id="msg-name"
                      type="text"
                      required
                      value={msgName}
                      onChange={(e) => setMsgName(e.target.value)}
                      placeholder="e.g. Maya Sharma"
                      className="focus-ring mt-1.5 w-full border border-[#17203f]/25 bg-white px-3.5 py-2.5 text-sm text-[#17203f] placeholder:text-[#17203f]/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="msg-email" className="mono-font block text-xs font-bold uppercase tracking-wider text-[#17203f]/70">
                      Your Email
                    </label>
                    <input
                      id="msg-email"
                      type="email"
                      required
                      value={msgEmail}
                      onChange={(e) => setMsgEmail(e.target.value)}
                      placeholder="e.g. maya@company.com"
                      className="focus-ring mt-1.5 w-full border border-[#17203f]/25 bg-white px-3.5 py-2.5 text-sm text-[#17203f] placeholder:text-[#17203f]/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="msg-text" className="mono-font block text-xs font-bold uppercase tracking-wider text-[#17203f]/70">
                      Project or Opportunity Details
                    </label>
                    <textarea
                      id="msg-text"
                      rows={4}
                      required
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      placeholder="Tell me what you're working on or need built..."
                      className="focus-ring mt-1.5 w-full border border-[#17203f]/25 bg-white px-3.5 py-2.5 text-sm text-[#17203f] placeholder:text-[#17203f]/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="focus-ring flex w-full items-center justify-center gap-2 bg-[#17203f] py-3 text-sm font-bold uppercase tracking-wider text-[#b9f3ee] transition-all hover:bg-[#087f8f]"
                  >
                    <Send size={15} /> Send Quick Inquiry
                  </button>
                  <p className="text-center text-[11px] text-[#17203f]/60">
                    Alternatively, write directly to <strong className="text-[#17203f]">rahulgupta959484@gmail.com</strong>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Footer Bar */}
          <footer className="mt-20 flex flex-col gap-4 border-t border-[#17203f]/25 pt-6 text-xs font-semibold uppercase tracking-[.1em] text-[#17203f]/70 sm:flex-row sm:items-center sm:justify-between">
            <span>Rahul Gupta · Full Stack Developer · Mumbai</span>
            <span className="flex items-center gap-2">
              <MapPin size={13} /> Mumbai, Maharashtra, India
            </span>
            <button
              type="button"
              onClick={() => navigateTo('top')}
              className="focus-ring flex items-center gap-2 text-[#17203f] hover:underline"
              data-testid="button-back-to-top"
            >
              Back to top <ArrowUpRight size={14} />
            </button>
          </footer>
        </div>
      </section>

      {/* ==========================================
          CERTIFICATE DETAIL MODAL
      ========================================== */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#17203f]/70 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="animate-modal relative max-h-[90vh] w-full max-w-xl overflow-y-auto border-2 border-[#17203f] bg-[#f2f0e8] p-6 shadow-[10px_14px_0_rgba(23,32,63,1)] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="focus-ring absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-[#17203f] bg-white"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 border-b border-[#17203f]/15 pb-4">
              <Award size={22} className="text-[#f0784f]" />
              <span className="mono-font text-xs font-bold uppercase tracking-wider text-[#087f8f]">
                {selectedCert.badgeLabel}
              </span>
            </div>

            <div className="mt-5">
              <h3 className="display-font text-2xl font-bold sm:text-3xl text-[#17203f]">
                {selectedCert.title}
              </h3>
              <p className="mt-1 font-semibold text-[#087f8f]">{selectedCert.issuer}</p>
              <p className="mono-font mt-1 text-xs text-[#17203f]/60">{selectedCert.issuedDate}</p>

              <div className="mt-5 border-l-2 border-[#f0784f] bg-[#deddd3]/50 p-4 text-xs leading-relaxed text-[#17203f]/80">
                {selectedCert.description}
              </div>

              <div className="mt-6">
                <h4 className="mono-font text-xs font-bold uppercase tracking-wider text-[#17203f]">
                  Validated Competencies:
                </h4>
                <ul className="mt-3 space-y-2 text-xs">
                  {selectedCert.competencies.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white/60 p-2 border border-[#17203f]/10">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#087f8f]" />
                      <span className="font-medium text-[#17203f]">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[#17203f]/15 pt-4 text-[11px] text-[#17203f]/60">
                <strong>Verification Record:</strong> {selectedCert.verificationNote}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="focus-ring border border-[#17203f] bg-[#17203f] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#b9f3ee]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          FULL RESUME MODAL
      ========================================== */}
      {resumeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#17203f]/80 p-3 backdrop-blur-xs sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className="animate-modal relative flex max-h-[92vh] w-full max-w-3xl flex-col border-2 border-[#17203f] bg-[#f2f0e8] shadow-[12px_16px_0_rgba(23,32,63,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#17203f] bg-[#17203f] px-6 py-4 text-[#f2f0e8]">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-[#b9f3ee]" />
                <span className="font-bold text-sm sm:text-base">Rahul Gupta — Official Curriculum Vitae</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="focus-ring hidden items-center gap-1.5 border border-[#b9f3ee] px-3 py-1 text-xs font-bold text-[#b9f3ee] hover:bg-[#b9f3ee] hover:text-[#17203f] sm:flex"
                >
                  <Download size={13} /> Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  className="focus-ring flex h-8 w-8 items-center justify-center text-[#f2f0e8] hover:text-[#f0784f]"
                  aria-label="Close resume modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="overflow-y-auto p-6 text-[#17203f] sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="border-b border-[#17203f]/20 pb-5">
                <h2 className="display-font text-3xl font-bold sm:text-4xl">Rahul Gupta</h2>
                <p className="mt-1 font-semibold text-[#087f8f]">JavaScript-focused Full Stack Developer</p>
                <div className="mono-font mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#17203f]/70">
                  <span>Phone: +91 9594884323</span>
                  <span>Email: rahulgupta959484@gmail.com</span>
                  <span>GitHub: github.com/rahul959484</span>
                  <span>LinkedIn: in/rahul-gupta-b3569231a</span>
                </div>
              </div>

              {/* Objective */}
              <div>
                <h3 className="mono-font text-xs font-bold uppercase tracking-wider text-[#087f8f]">
                  Professional Objective
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#17203f]/80">
                  JavaScript-focused Full Stack Developer with hands-on experience in building scalable and responsive web applications using React.js, Node.js, and modern web technologies. Skilled in developing high-performance user-centric solutions with strong problem-solving and collaboration abilities.
                </p>
              </div>

              {/* Skills Matrix */}
              <div>
                <h3 className="mono-font text-xs font-bold uppercase tracking-wider text-[#087f8f]">
                  Technical Skills
                </h3>
                <div className="mt-2 space-y-1 text-xs leading-relaxed text-[#17203f]/80">
                  <p><strong>• Programming Languages:</strong> JavaScript (ES6+), Java, C/C++</p>
                  <p><strong>• Frontend:</strong> HTML5, CSS3, Tailwind CSS, JavaScript, React.js</p>
                  <p><strong>• Backend:</strong> Node.js, Express.js, REST APIs, Socket.IO</p>
                  <p><strong>• Databases:</strong> MongoDB, PostgreSQL</p>
                  <p><strong>• DevOps & Cloud:</strong> Git/GitHub, Docker, GitHub Actions, AWS (EC2, S3, VPC, Route 53), Render</p>
                  <p><strong>• Core Concepts:</strong> JWT Authentication, CRUD Operations, API Integration, CI/CD, Deployment</p>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="mono-font text-xs font-bold uppercase tracking-wider text-[#087f8f]">
                  Professional Experience
                </h3>
                <div className="mt-3 space-y-4 text-xs">
                  <div className="border-l-2 border-[#087f8f] pl-3">
                    <div className="flex justify-between font-bold text-sm">
                      <span>Full Stack Developer — Kashvi Communications</span>
                      <span className="mono-font text-xs text-[#087f8f]">Nov 2025 – Present</span>
                    </div>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-[#17203f]/80">
                      <li>Developing responsive web applications using HTML5, CSS3, JavaScript, Node.js, and Express.js.</li>
                      <li>Handling API integration, database operations with MongoDB/PostgreSQL, and performance optimization for production deployments.</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-[#f0784f] pl-3">
                    <div className="flex justify-between font-bold text-sm">
                      <span>Frontend Developer Intern — Fifth Quarter Infomedia PVT. LTD</span>
                      <span className="mono-font text-xs text-[#f0784f]">June 2024 – Sep 2025</span>
                    </div>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-[#17203f]/80">
                      <li>Developed scalable and responsive web interfaces using HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility.</li>
                      <li>Built interactive UI components, optimized frontend performance, and resolved bugs to enhance user experience and application stability.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="mono-font text-xs font-bold uppercase tracking-wider text-[#087f8f]">
                  Key Projects
                </h3>
                <div className="mt-3 space-y-4 text-xs">
                  <div className="bg-white/70 p-3 border border-[#17203f]/10">
                    <div className="flex justify-between font-bold text-sm">
                      <span>Kashvi Communications – 360° Marketing & Agency Platform</span>
                      <span className="mono-font text-xs text-[#17203f]/60">2025</span>
                    </div>
                    <p className="mt-1 text-[#17203f]/70"><strong>Tools:</strong> JavaScript, Android, REST APIs, Service Architecture</p>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-[#17203f]/80">
                      <li>Designed interactive service showcase for branding, digital marketing, and production verticals.</li>
                      <li>Built streamlined lead capture inquiry pipeline integrated with backend CRM.</li>
                      <li>Published live on Google Play / APK ecosystem with smooth touch interactions.</li>
                    </ul>
                  </div>

                  <div className="bg-white/70 p-3 border border-[#17203f]/10">
                    <div className="flex justify-between font-bold text-sm">
                      <span>EduBook – Academic Advising System</span>
                      <span className="mono-font text-xs text-[#17203f]/60">Nov 2023 – May 2024</span>
                    </div>
                    <p className="mt-1 text-[#17203f]/70"><strong>Tools:</strong> HTML, CSS, JavaScript, Node.js, Firebase, MongoDB</p>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-[#17203f]/80">
                      <li>A web-based platform designed to streamline interaction between students and academic advisors.</li>
                      <li>Features include student profile management, advisor-student meeting scheduling, and real-time academic progress tracking.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education & Certifications */}
              <div>
                <h3 className="mono-font text-xs font-bold uppercase tracking-wider text-[#087f8f]">
                  Education & Certifications
                </h3>
                <div className="mt-3 space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-bold">
                      <span>Shree L.R Tiwari College of Engineering, Mumbai</span>
                      <span className="mono-font text-xs">Nov 2022 – May 2026</span>
                    </div>
                    <p className="text-[#17203f]/80">Bachelor of Engineering in Computer Engineering · <strong>Average CGPA: 8.17</strong></p>
                  </div>
                  <div>
                    <p className="font-bold">Software Developer Intern Certificate — Fifth Quarter Infomedia PVT. LTD</p>
                    <p className="text-[#17203f]/70">Issued September 2025</p>
                  </div>
                  <div>
                    <p className="font-bold">Honor Degree in Data Science Specialization</p>
                    <p className="text-[#17203f]/70">Awarded the opportunity by college to pursue Honors specialization concurrently with major degree.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between border-t border-[#17203f]/20 bg-[#deddd3]/50 px-6 py-4">
              <span className="text-xs text-[#17203f]/60">Ready for full-time opportunities & technical projects</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="focus-ring border border-[#17203f] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#17203f] hover:text-[#f2f0e8]"
                >
                  Print / Save
                </button>
                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  className="focus-ring border border-[#17203f] bg-[#17203f] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#b9f3ee]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;