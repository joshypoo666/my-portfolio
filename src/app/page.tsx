"use client";

import { useState } from "react";
import type { ReactElement } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const workTabs = ["UX", "Graphic Design", "Motion", "Photography", "Failures"] as const;

const workProjects: Record<string, { title: string; category: string; year: string }[]> = {
  UX: [
    { title: "JobNimbus Mobile App", category: "Mobile UX", year: "2024" },
    { title: "AI Mobile Design System", category: "Web App", year: "2024" },
    { title: "ThermoWorks Mobile App", category: "User Research", year: "2023" },
    { title: "Onboarding Experience", category: "Product Design", year: "2023" },
  ],
  "Graphic Design": [
    { title: "JobNimbus Pillar Posters", category: "Branding", year: "2024" },
    { title: "Sunny Dayz", category: "Branding", year: "2024" },
    { title: "Packaging Design", category: "Product", year: "2023" },
    { title: "Magazine Layout", category: "Editorial", year: "2023" },
  ],
  Motion: [
    { title: "Demo Reel", category: "Motion Graphics", year: "2024" },
    { title: "Promo Video", category: "Video", year: "2024" },
    { title: "Social Media Reels", category: "Content", year: "2023" },
    { title: "Title Sequence", category: "Film", year: "2023" },
  ],
  Photography: [
    { title: "Product Shoot", category: "Commercial", year: "2024" },
    { title: "Portrait Series", category: "Portrait", year: "2024" },
    { title: "Street Photography", category: "Documentary", year: "2023" },
    { title: "Event Coverage", category: "Events", year: "2023" },
  ],
  Failures: [
    { title: "App That Never Shipped", category: "Lesson Learned", year: "2023" },
    { title: "Rebrand Nobody Wanted", category: "Client Work", year: "2022" },
    { title: "Over-Engineered Website", category: "Side Project", year: "2022" },
    { title: "Pitch That Got Rejected", category: "Proposal", year: "2021" },
  ],
};

// ─── Views ───────────────────────────────────────────────────────────────────

function HomeView({ onNav }: { onNav: (view: string) => void }) {
  return (
    <>
      <div className="crt-glitch-overlay" />
    <div className="glitch-home flex flex-col items-center justify-center min-h-[calc(100vh-57px)] px-6 text-center">
      <p className="text-xs tracking-[0.25em] uppercase text-[#6b8f6b] mb-4">
        Designer &amp; Creative Thinker
      </p>
      <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
        Joshua D. Taylor
      </h1>
      <p className="text-[#6b8f6b] max-w-md text-base leading-relaxed mb-10">
        I design brands, products, and experiences that leave an impression.
        Based in Utah, working everywhere.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => onNav("work")}
          className="px-6 py-3 bg-[#c8e6c8] text-[#0d130d] text-sm font-semibold rounded-lg hover:bg-[#a8d8a8] transition-colors"
        >
          View Work
        </button>
        <button
          onClick={() => onNav("contact")}
          className="px-6 py-3 border border-[#2a402a] text-[#a8d8a8] text-sm rounded-lg hover:bg-[#161c16] transition-colors"
        >
          Get in Touch
        </button>
      </div>
    </div>
    </>
  );
}

function WorkView() {
  const [activeTab, setActiveTab] = useState<string>("UX");
  const projects = workProjects[activeTab];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-2">Selected Work</h2>
      <p className="text-[#6b8f6b] mb-8">A collection of projects I&apos;ve worked on.</p>

      <div className="flex gap-1 mb-8 border-b border-[#1e2e1e] overflow-x-auto scrollbar-none">
        {workTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-[#c8e6c8]"
                : "text-[#4a6a4a] hover:text-[#6b8f6b]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c8e6c8] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.title} className="group cursor-pointer">
            <div className="aspect-[16/10] bg-[#161c16] rounded-xl mb-3 overflow-hidden border border-[#1e2e1e] group-hover:border-[#3a5a3a] transition-colors flex items-center justify-center">
              <span className="text-sm text-[#3a5a3a]">Coming Soon</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-[#6b8f6b]">{project.category}</p>
              </div>
              <span className="text-sm text-[#4a6a4a]">{project.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-8">About Me</h2>
      <div className="space-y-5 text-[#a8d8a8] leading-relaxed text-base">
        <p>
          I&apos;m Joshua D. Taylor — a designer focused on building brands and
          experiences that matter.
        </p>
        <p>
          With a background in visual design and a passion for storytelling, I
          approach every project with curiosity and intention. I believe great
          design sits at the intersection of form, function, and feeling.
        </p>
        <p>
          From concept to execution, I work closely with clients to bring ideas
          to life — whether that&apos;s a complete brand identity, a digital
          product, or a printed publication.
        </p>
      </div>
    </div>
  );
}

function ContactView() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-2">Get in Touch</h2>
      <p className="text-[#6b8f6b] mb-8">I&apos;d love to hear about your project.</p>
      <div className="space-y-4">
        <a
          href="mailto:joshdtaylor6@gmail.com"
          className="flex items-center gap-4 p-5 rounded-xl border border-[#1e2e1e] hover:bg-[#161c16] hover:border-[#3a5a3a] transition-colors"
        >
          <span className="text-[#6b8f6b]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <div>
            <div className="font-medium">Email</div>
            <div className="text-sm text-[#6b8f6b]">joshdtaylor6@gmail.com</div>
          </div>
        </a>
        <a
          href="tel:8018897220"
          className="flex items-center gap-4 p-5 rounded-xl border border-[#1e2e1e] hover:bg-[#161c16] hover:border-[#3a5a3a] transition-colors"
        >
          <span className="text-[#6b8f6b]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z" />
            </svg>
          </span>
          <div>
            <div className="font-medium">Phone</div>
            <div className="text-sm text-[#6b8f6b]">801-889-7220</div>
          </div>
        </a>
      </div>
    </div>
  );
}

function ClassifiedView() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (password === "joshtaylorrocks66") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-57px)] px-6">
        <div className="w-12 h-12 rounded-full bg-[#161c16] border border-[#1e2e1e] flex items-center justify-center mb-4 text-[#6b8f6b]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Classified</h2>
        <p className="text-sm text-[#6b8f6b] mb-6 text-center max-w-sm">
          Enter the password to view this content.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); handleUnlock(); }}
          className="w-full max-w-xs space-y-3"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            className="w-full bg-[#161c16] border border-[#2a402a] rounded-xl px-4 py-3 text-sm outline-none placeholder-[#4a6a4a] text-[#c8e6c8] focus:border-[#4a6a4a] transition-colors"
          />
          {error && <p className="text-sm text-red-400">Incorrect password. Try again.</p>}
          <button
            type="submit"
            className="w-full bg-[#c8e6c8] text-[#0d130d] rounded-xl px-4 py-3 text-sm font-semibold hover:bg-[#a8d8a8] transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-2">Classified</h2>
      <p className="text-[#6b8f6b] mb-8">Resources, tools, and things I find interesting.</p>
      <div className="text-[#4a6a4a] text-center py-12 border border-dashed border-[#1e2e1e] rounded-xl">
        Coming soon
      </div>
    </div>
  );
}

const views: Record<string, (props: { onNav: (view: string) => void }) => ReactElement> = {
  home: HomeView,
  work: ({ onNav }) => <WorkView />,
  about: ({ onNav }) => <AboutView />,
  contact: ({ onNav }) => <ContactView />,
  classified: ({ onNav }) => <ClassifiedView />,
};

// ─── Nav ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "classified", label: "Classified" },
];

// ─── App ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeView, setActiveView] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const ActiveView = views[activeView];

  const handleNav = (id: string) => {
    setActiveView(id);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#1e2e1e] bg-[#0d130d] sticky top-0 z-50">
        <button
          onClick={() => handleNav("home")}
          className="font-semibold text-sm tracking-wide hover:text-[#a8d8a8] transition-colors"
        >
          <span className="hidden sm:inline">Joshua D. Taylor</span>
          <span className="sm:hidden">JDT</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeView === link.id
                  ? "text-[#c8e6c8] bg-[#161c16]"
                  : "text-[#6b8f6b] hover:text-[#a8d8a8] hover:bg-[#161c16]"
              }`}
            >
              {link.label}
              {link.id === "classified" && (
                <span className="ml-1.5 inline-flex">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#6b8f6b] hover:text-[#a8d8a8] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d130d] border-b border-[#1e2e1e] px-4 py-2 sticky top-[57px] z-40">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left flex items-center gap-2 px-3 py-3 text-sm rounded-lg transition-colors ${
                activeView === link.id
                  ? "text-[#c8e6c8] bg-[#161c16]"
                  : "text-[#6b8f6b]"
              }`}
            >
              {link.label}
              {link.id === "classified" && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1">
        <ActiveView onNav={handleNav} />
      </main>
    </div>
  );
}
