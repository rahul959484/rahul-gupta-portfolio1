import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    id: 'bombay-mathurs',
    index: '01',
    name: 'Bombay Mathurs',
    type: 'Community platform & member directory',
    description:
      'A digital home for Mathur Association Bombay, bringing together member directories, zonal information, management, newsletters, events, and articles.',
    stack: ['Responsive UI', 'Member directory', 'Content platform'],
    tone: 'coral',
    url: 'https://www.bombaymathurs.com/',
  },
  {
    id: 'nexiom',
    index: '02',
    name: 'Nexiom',
    type: 'Advanced engineering consultancy',
    description:
      'A future-ready engineering presence for advanced manufacturing, connecting strategy, design, project delivery, and regulated industry expertise.',
    stack: ['Corporate web', 'Sector navigation', 'Responsive UI'],
    tone: 'cobalt',
    url: 'https://nexiom.in/',
  },
  {
    id: 'stayatlas',
    index: '03',
    name: 'StayAtlas',
    type: 'Luxury villa booking platform',
    description:
      'A full-stack booking experience for discovering and reserving luxury villas, with destination browsing, property details, search, authentication, and database operations.',
    stack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    tone: 'coral',
    url: 'https://www.stayatlas.in/',
  },
  {
    id: 'doc-converter',
    index: '04',
    name: 'Doc Converter',
    type: 'Private document toolkit',
    description:
      'A privacy-first workspace with 21 document tools for converting, merging, splitting, compressing, signing, repairing, and organizing files locally.',
    stack: ['React.js', 'PDF workflows', 'Local-first UX'],
    tone: 'cobalt',
    url: 'https://doc-converter-sigma.vercel.app/',
  },
  {
    id: 'kashvi-app',
    index: '05',
    name: 'Kashvi Communications',
    type: '360° marketing services app',
    description:
      'A mobile companion for a full-service advertising agency, making its branding, digital marketing, web, production, events, and inquiry services easy to explore.',
    stack: ['Android', 'Service discovery', 'Inquiry flow'],
    tone: 'coral',
    url: 'https://apkpure.net/kashvi-communications/com.example.kashvi',
  },
  {
    id: 'edubook',
    index: '06',
    name: 'EduBook',
    type: 'Student–teacher booking platform',
    description:
      'A modern appointment system that connects students and teachers through booking, schedules, notifications, messaging, and academic coordination.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    tone: 'cobalt',
    url: 'https://student-teacher-booking.vercel.app/',
  },
];

const skills = [
  { label: 'JavaScript', group: 'language', mark: 'JS' },
  { label: 'React.js', group: 'frontend', mark: 'R' },
  { label: 'Node.js', group: 'backend', mark: 'N' },
  { label: 'Express.js', group: 'backend', mark: 'E' },
  { label: 'MongoDB', group: 'data', mark: 'M' },
  { label: 'PostgreSQL', group: 'data', mark: 'P' },
  { label: 'Git / GitHub', group: 'delivery', mark: 'G' },
  { label: 'Docker', group: 'delivery', mark: 'D' },
  { label: 'GitHub Actions', group: 'delivery', mark: 'A' },
  { label: 'AWS', group: 'cloud', mark: 'AWS' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const navigateTo = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText('rahulgupta959484@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="portfolio-shell min-h-[100dvh] text-[#17203f]">
      <header className="fixed left-0 right-0 top-0 z-30 px-4 pt-4 sm:px-7 sm:pt-6">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between border border-[#17203f]/15 bg-[#f2f0e8]/90 px-4 py-3 shadow-[4px_5px_0_rgba(23,32,63,.09)] backdrop-blur-md sm:px-5"
          aria-label="Primary navigation"
        >
          <button
            type="button"
            onClick={() => navigateTo('top')}
            className="focus-ring flex items-center gap-3"
            data-testid="button-logo-home"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-[#17203f] font-mono text-sm font-medium text-[#b9f3ee]">
              RG
            </span>
            <span className="hidden text-sm font-bold tracking-[-.02em] sm:inline">Rahul Gupta</span>
          </button>

          <div className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[.12em] md:flex">
            {[
              ['work', 'Selected work'],
              ['approach', 'Approach'],
              ['experience', 'Experience'],
            ].map(([id, label]) => (
              <button
                type="button"
                key={id}
                onClick={() => navigateTo(id)}
                className="link-underline focus-ring text-[#17203f]/65 transition-colors hover:text-[#17203f]"
                data-testid={`button-nav-${id}`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigateTo('contact')}
            className="hidden items-center gap-2 bg-[#17203f] px-4 py-2.5 text-xs font-bold uppercase tracking-[.1em] text-[#b9f3ee] transition-transform hover:-translate-y-0.5 focus:ring-2 focus:ring-[#f0784f] focus:ring-offset-2 sm:flex"
            data-testid="button-nav-contact"
          >
            Start a conversation <ArrowUpRight size={14} />
          </button>
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
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-7xl border border-[#17203f]/15 bg-[#f2f0e8] p-3 shadow-[4px_5px_0_rgba(23,32,63,.09)] md:hidden">
            {[
              ['work', 'Selected work'],
              ['approach', 'Approach'],
              ['experience', 'Experience'],
              ['contact', 'Contact Rahul'],
            ].map(([id, label]) => (
              <button
                type="button"
                key={id}
                onClick={() => navigateTo(id)}
                className="focus-ring flex w-full items-center justify-between border-b border-[#17203f]/10 px-3 py-3 text-left text-sm font-semibold last:border-0"
                data-testid={`button-mobile-nav-${id}`}
              >
                {label} <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        )}
      </header>

      <section id="top" className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-48 lg:px-12">
        <div className="pointer-events-none absolute right-[6%] top-32 hidden h-52 w-52 rounded-full border border-[#17203f]/20 lg:block">
          <div className="hero-orbit absolute -right-3 top-1/2 h-5 w-5 rounded-full bg-[#f0784f]" />
          <div className="absolute inset-5 rounded-full border border-dashed border-[#17203f]/20" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#17203f]" />
        </div>
        <div className="grid items-end gap-14 lg:grid-cols-[1.2fr_.8fr] lg:gap-24">
          <div>
            <div className="reveal mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-[#17203f]/60">
              <span className="h-2 w-2 rounded-full bg-[#f0784f]" />
              Full Stack Developer · Mumbai, India
            </div>
            <h1 className="display-font reveal reveal-1 max-w-5xl text-[clamp(4rem,11vw,9.6rem)] font-semibold leading-[.83]">
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
            <p className="reveal reveal-2 mt-10 max-w-xl text-lg leading-relaxed text-[#17203f]/70 sm:text-xl">
              I&apos;m Rahul — a product-minded full-stack developer who takes ideas from first interface to shipped experience.
              I build clear, responsive products with JavaScript, React, Node.js, and modern web tooling — currently at <strong className="font-semibold text-[#17203f]">Kashvi Communications</strong>.
            </p>
            <div className="reveal reveal-2 mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[.12em] text-[#17203f]/55">
              <span>6 live builds</span>
              <span>Frontend to infrastructure</span>
              <span>Built in Mumbai</span>
            </div>
            <div className="reveal reveal-3 mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="focus-ring flex items-center gap-3 bg-[#17203f] px-5 py-3.5 text-sm font-bold text-[#b9f3ee] transition-all hover:-translate-y-1 hover:bg-[#087f8f]"
                data-testid="button-hero-contact"
              >
                Let&apos;s work together <ArrowUpRight size={17} />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('work')}
                className="focus-ring flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#17203f] transition-transform hover:translate-x-1"
                data-testid="button-hero-work"
              >
                See selected work <ArrowDownRight size={17} />
              </button>
            </div>
          </div>
          <div className="reveal reveal-3 relative lg:pb-8">
            <div className="ml-auto max-w-sm border-l-2 border-[#f0784f] pl-5">
              <p className="mono-font text-[11px] uppercase tracking-[.14em] text-[#17203f]/55">A note from the desk</p>
              <p className="mt-4 text-2xl font-semibold leading-tight tracking-[-.04em]">
                 From first idea to live product.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#17203f]/60">
                 I care about the connective tissue that makes a product feel trustworthy: clear flows, useful details, and dependable delivery.
              </p>
            </div>
            <div className="drift absolute -bottom-4 right-0 hidden h-16 w-16 rotate-12 bg-[#b9f3ee] p-2 text-center text-[10px] font-bold uppercase leading-tight text-[#17203f] sm:block">
              Systems
              <br />
              with a
              <br />
              pulse
            </div>
          </div>
        </div>
        <div className="mt-20 flex items-center gap-4 text-xs font-semibold uppercase tracking-[.12em] text-[#17203f]/45">
          <span className="h-px w-14 bg-[#17203f]/25" />
          Scroll to explore
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      <section id="approach" className="border-y border-[#17203f]/15 bg-[#17203f] text-[#f2f0e8]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.78fr_1.22fr] lg:px-12">
          <div>
            <p className="mono-font text-xs uppercase tracking-[.18em] text-[#b9f3ee]">01 / Point of view</p>
            <h2 className="display-font mt-7 max-w-sm text-5xl font-semibold leading-[.92] sm:text-6xl">
              Clarity is a technical skill.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-12">
            <div className="border-t border-[#f2f0e8]/20 pt-5">
              <p className="mono-font text-sm text-[#f0784f]">01</p>
              <h3 className="mt-7 text-xl font-semibold tracking-[-.03em]">Start with the user&apos;s next move</h3>
              <p className="mt-3 leading-relaxed text-[#f2f0e8]/60">A strong interface makes the right path feel natural. I bring that same discipline to APIs, data models, and deployments.</p>
            </div>
            <div className="border-t border-[#f2f0e8]/20 pt-5">
              <p className="mono-font text-sm text-[#b9f3ee]">02</p>
              <h3 className="mt-7 text-xl font-semibold tracking-[-.03em]">Make the complex legible</h3>
              <p className="mt-3 leading-relaxed text-[#f2f0e8]/60">JavaScript across the stack lets me hold the whole system in view — and make thoughtful trade-offs where they matter.</p>
            </div>
            <div className="border-t border-[#f2f0e8]/20 pt-5 sm:col-span-2">
              <p className="mono-font text-sm text-[#f0784f]">03</p>
              <h3 className="mt-7 max-w-md text-xl font-semibold tracking-[-.03em]">Ship with enough structure to keep moving</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-[#f2f0e8]/60">GitHub, Docker, GitHub Actions, and AWS are not just tools in the stack — they are how good work keeps its shape after launch.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono-font text-xs uppercase tracking-[.18em] text-[#087f8f]">02 / Selected work</p>
            <h2 className="display-font mt-5 text-6xl font-semibold leading-none sm:text-8xl">Made to matter.</h2>
          </div>
           <p className="max-w-xs text-sm leading-relaxed text-[#17203f]/60">Six live builds across communities, engineering, travel, documents, marketing, and education — each one shaped around a real user need.</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {projects.map((project) => {
            const isOpen = activeProject === project.id;
            const isCobalt = project.tone === 'cobalt';
            return (
              <article
                key={project.id}
                className={`project-card relative overflow-hidden border border-[#17203f]/15 p-6 sm:p-8 ${isCobalt ? 'bg-[#087f8f] text-[#f2f0e8]' : 'bg-[#f0784f] text-[#17203f]'}`}
                data-testid={`card-project-${project.id}`}
              >
                <div className="flex items-start justify-between">
                  <span className="mono-font text-xs opacity-70">{project.index}</span>
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
                <div className="mt-24 sm:mt-32">
                  <p className="mono-font text-xs uppercase tracking-[.14em] opacity-70">{project.type}</p>
                  <h3 className="display-font mt-4 text-6xl font-semibold leading-none sm:text-8xl">{project.name}</h3>
                  <p className="mt-7 max-w-md text-sm leading-relaxed opacity-80">{project.description}</p>
                </div>
                <div className="mt-9 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="border border-current/25 px-2.5 py-1.5 text-xs font-semibold">{tech}</span>
                  ))}
                </div>
                 <div className="mt-8 flex flex-wrap items-center gap-5">
                   {project.url && (
                     <a
                       href={project.url}
                       target="_blank"
                       rel="noreferrer"
                       className="focus-ring inline-flex items-center gap-2 border-b border-current/40 pb-1 text-sm font-bold"
                       data-testid={`link-project-visit-${project.id}`}
                     >
                       Visit live site <ArrowUpRight size={15} />
                     </a>
                   )}
                   <button
                     type="button"
                     onClick={() => setActiveProject(isOpen ? null : project.id)}
                     className="focus-ring flex items-center gap-2 text-sm font-bold"
                     aria-expanded={isOpen}
                     data-testid={`button-project-details-${project.id}`}
                   >
                     {isOpen ? 'Close project note' : 'Open project note'} <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                   </button>
                 </div>
                {isOpen && (
                  <div className="mt-5 border-t border-current/25 pt-5 text-sm leading-relaxed opacity-80" data-testid={`text-project-note-${project.id}`}>
                    A featured case study from Rahul&apos;s portfolio. Reach out directly for the implementation details and walkthrough.
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="border-t border-[#17203f]/15 bg-[#deddd3]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="mono-font text-xs uppercase tracking-[.18em] text-[#087f8f]">03 / The path so far</p>
              <h2 className="display-font mt-5 max-w-sm text-6xl font-semibold leading-[.88] sm:text-7xl">From interface to infrastructure.</h2>
              <p className="mt-7 max-w-xs text-sm leading-relaxed text-[#17203f]/60">A steady move toward owning more of the system — while keeping the people using it in focus.</p>
            </div>
            <div className="border-t border-[#17203f]/20">
              <div className="grid gap-5 border-b border-[#17203f]/20 py-8 sm:grid-cols-[.7fr_1.6fr_.7fr] sm:gap-8">
                <div className="mono-font text-xs uppercase tracking-[.12em] text-[#17203f]/50">Nov 2025 — now</div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-.04em]">Kashvi Communications</h3>
                  <p className="mt-1 text-sm font-semibold text-[#087f8f]">Full Stack Developer</p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#17203f]/60">Building across the product surface with JavaScript, React.js, Node.js, Express.js, databases, and cloud tooling.</p>
                </div>
                <div className="text-left text-xs font-semibold uppercase tracking-[.12em] text-[#17203f]/40 sm:text-right">Mumbai</div>
              </div>
              <div className="grid gap-5 border-b border-[#17203f]/20 py-8 sm:grid-cols-[.7fr_1.6fr_.7fr] sm:gap-8">
                <div className="mono-font text-xs uppercase tracking-[.12em] text-[#17203f]/50">Jun 2024 — Sep 2025</div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-.04em]">Fifth Quarter Infomedia</h3>
                  <p className="mt-1 text-sm font-semibold text-[#f0784f]">Frontend Developer Intern</p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#17203f]/60">Where the craft of responsive interfaces, component thinking, and careful front-end details took root.</p>
                </div>
                <div className="text-left text-xs font-semibold uppercase tracking-[.12em] text-[#17203f]/40 sm:text-right">Mumbai</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="mono-font text-xs uppercase tracking-[.18em] text-[#087f8f]">04 / Working toolkit</p>
            <h2 className="display-font mt-5 text-6xl font-semibold leading-[.88] sm:text-7xl">The pieces I reach for.</h2>
          </div>
          <div className="grid grid-cols-2 gap-px border border-[#17203f]/15 bg-[#17203f]/15 sm:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.label} className="group bg-[#f2f0e8] p-4 transition-colors hover:bg-[#b9f3ee] sm:p-5" data-testid={`text-skill-${skill.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="flex items-start justify-between gap-3">
                  <span className="mono-font text-[10px] text-[#17203f]/45">{skill.group}</span>
                  <span className="font-mono text-xs font-bold text-[#f0784f]">{skill.mark}</span>
                </div>
                <p className="mt-10 text-sm font-bold tracking-[-.02em]">{skill.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#17203f]/15 bg-[#b9f3ee]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_.8fr] lg:px-12">
          <div>
            <p className="mono-font text-xs uppercase tracking-[.18em] text-[#17203f]/60">05 / Credentials & honors</p>
            <h2 className="display-font mt-5 max-w-2xl text-5xl font-semibold leading-[.9] sm:text-7xl">Still learning. Already shipping.</h2>
          </div>
          <div className="space-y-0 border-t border-[#17203f]/20">
            <div className="border-b border-[#17203f]/20 py-5">
              <p className="mono-font text-[11px] uppercase tracking-[.14em] text-[#17203f]/55">Academic credential</p>
              <p className="mt-2 text-lg font-semibold">Bachelor of Engineering</p>
              <p className="mt-1 text-sm text-[#17203f]/65">Computer Engineering · Shree L.R Tiwari College of Engineering, Mumbai</p>
            </div>
            <div className="border-b border-[#17203f]/20 py-5">
              <p className="mono-font text-[11px] uppercase tracking-[.14em] text-[#17203f]/55">Academic standing</p>
              <p className="mt-2 text-lg font-semibold">Average CGPA 8.17</p>
              <p className="mt-1 text-sm text-[#17203f]/65">November 2022 — May 2026</p>
            </div>
            <div className="py-5">
              <p className="mono-font text-[11px] uppercase tracking-[.14em] text-[#17203f]/55">Professional progression</p>
              <p className="mt-2 text-lg font-semibold">Frontend → Full Stack</p>
              <p className="mt-1 text-sm text-[#17203f]/65">Fifth Quarter Infomedia → Kashvi Communications</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#f0784f]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="mono-font text-xs uppercase tracking-[.18em] text-[#17203f]/65">06 / Make an introduction</p>
              <h2 className="display-font mt-6 max-w-3xl text-[clamp(4rem,9vw,8rem)] font-semibold leading-[.8]">Have a good<br />problem?</h2>
              <p className="mt-9 max-w-md text-lg leading-relaxed text-[#17203f]/75">Tell me what you&apos;re working through. I&apos;d like to hear what needs making clearer.</p>
            </div>
            <div className="border-t border-[#17203f]/25 pt-6">
              <a href="mailto:rahulgupta959484@gmail.com" className="link-underline focus-ring flex items-center justify-between border-b border-[#17203f]/25 py-4 text-lg font-bold" data-testid="link-contact-email">
                rahulgupta959484@gmail.com <Mail size={18} />
              </a>
              <a href="tel:+919594884323" className="link-underline focus-ring flex items-center justify-between border-b border-[#17203f]/25 py-4 text-lg font-bold" data-testid="link-contact-phone">
                +91 9594884323 <Phone size={18} />
              </a>
              <button type="button" onClick={copyEmail} className="focus-ring mt-5 flex items-center gap-2 text-sm font-bold" data-testid="button-copy-email">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Email copied' : 'Copy email address'}
              </button>
              <div className="mt-8 flex gap-3">
                <a href="https://github.com/rahul959484" target="_blank" rel="noreferrer" className="focus-ring flex items-center gap-2 border border-[#17203f]/30 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-[#17203f] hover:text-[#f2f0e8]" data-testid="link-github">
                  <Github size={16} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/rahul-gupta-b3569231a" target="_blank" rel="noreferrer" className="focus-ring flex items-center gap-2 border border-[#17203f]/30 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-[#17203f] hover:text-[#f2f0e8]" data-testid="link-linkedin">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
               <a
                 href="https://rahul-gupta-portfolio-8zlk.vercel.app/"
                 target="_blank"
                 rel="noreferrer"
                 className="link-underline focus-ring mt-7 inline-flex items-center gap-2 text-sm font-bold"
                 data-testid="link-previous-portfolio"
               >
                 View previous portfolio <ArrowUpRight size={15} />
               </a>
            </div>
          </div>
          <footer className="mt-24 flex flex-col gap-4 border-t border-[#17203f]/25 pt-5 text-xs font-semibold uppercase tracking-[.1em] text-[#17203f]/60 sm:flex-row sm:items-center sm:justify-between">
            <span>Rahul Gupta · Full Stack Developer</span>
            <span className="flex items-center gap-2"><MapPin size={13} /> Mumbai, India</span>
            <button type="button" onClick={() => navigateTo('top')} className="focus-ring flex items-center gap-2 text-[#17203f]" data-testid="button-back-to-top">Back to top <ArrowUpRight size={14} /></button>
          </footer>
        </div>
      </section>
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