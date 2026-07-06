"use client";

import { useState } from "react";
import type { ReactElement } from "react";

const NavIcons: Record<string, () => ReactElement> = {
  chat: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  work: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  about: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  contact: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  stuff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

const navItems = [
  { id: "chat", label: "Chat" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "stuff", label: "Classified" },
];

function ChatView() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <h1 className="text-3xl font-semibold mb-2">Hey, I&apos;m Joshua.</h1>
      <p className="text-[#6b8f6b] text-center max-w-md">
        Designer & creative thinker. Ask me anything about my work, experience,
        or just say hello.
      </p>
      {/* Input Bar */}
      <div className="mt-8 w-full max-w-lg">
        <div className="flex items-center gap-3 bg-[#161c16] border border-[#2a402a] rounded-2xl px-4 py-3">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-sm outline-none placeholder-[#4a6a4a] text-[#c8e6c8]"
            readOnly
          />
          <button className="p-1.5 rounded-lg bg-white text-black hover:bg-[#a8d8a8] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6 max-w-lg w-full">
        {[
          "Tell me about yourself",
          "Show me your work",
          "What tools do you use?",
          "How can I contact you?",
        ].map((prompt) => (
          <button
            key={prompt}
            className="text-left text-sm px-4 py-3 rounded-xl border border-[#1e2e1e] hover:bg-[#161c16] transition-colors text-[#a8d8a8]"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

const workTabs = ["UX", "Graphic Design", "Motion", "Photography"] as const;

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
};

function WorkView() {
  const [activeTab, setActiveTab] = useState<string>("UX");
  const projects = workProjects[activeTab];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-2">Selected Work</h2>
      <p className="text-[#6b8f6b] mb-6">A collection of projects I&apos;ve worked on.</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-[#1e2e1e]">
        {workTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-white"
                : "text-[#4a6a4a] hover:text-[#6b8f6b]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group cursor-pointer"
          >
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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">About Me</h2>
      <div className="space-y-4 text-[#a8d8a8] leading-relaxed">
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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
      <div className="space-y-4">
        <a
          href="mailto:joshdtaylor6@gmail.com"
          className="flex items-center gap-3 p-4 rounded-xl border border-[#1e2e1e] hover:bg-[#161c16] transition-colors"
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
          className="flex items-center gap-3 p-4 rounded-xl border border-[#1e2e1e] hover:bg-[#161c16] transition-colors"
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

function StuffView() {
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
      <div className="flex flex-col items-center justify-center h-full px-6">
        <div className="w-12 h-12 rounded-full bg-[#161c16] border border-[#1e2e1e] flex items-center justify-center mb-4 text-[#6b8f6b]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">This page is private</h2>
        <p className="text-sm text-[#6b8f6b] mb-6 text-center max-w-sm">
          Enter the password to view this content.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUnlock();
          }}
          className="w-full max-w-xs space-y-3"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            className="w-full bg-[#161c16] border border-[#2a402a] rounded-xl px-4 py-3 text-sm outline-none placeholder-[#4a6a4a] text-[#c8e6c8] focus:border-[#4a6a4a] transition-colors"
          />
          {error && (
            <p className="text-sm text-red-400">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="w-full bg-white text-black rounded-xl px-4 py-3 text-sm font-medium hover:bg-[#a8d8a8] transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-2">My Stuff</h2>
      <p className="text-[#6b8f6b] mb-8">Resources, tools, and things I find interesting.</p>
      <div className="text-[#4a6a4a] text-center py-12 border border-dashed border-[#1e2e1e] rounded-xl">
        Coming soon
      </div>
    </div>
  );
}

const views: Record<string, () => JSX.Element> = {
  chat: ChatView,
  work: WorkView,
  about: AboutView,
  contact: ContactView,
  stuff: StuffView,
};

export default function Home() {
  const [activeView, setActiveView] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ActiveComponent = views[activeView];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } flex-shrink-0 bg-[#141e14] border-r border-[#1e2e1e] flex flex-col transition-all duration-200 overflow-hidden`}
      >
        <div className="p-4 border-b border-[#1e2e1e]">
          <h1 className="font-semibold text-sm whitespace-nowrap">Joshua D. Taylor</h1>
          <p className="text-xs text-[#6b8f6b] whitespace-nowrap">Designer & Creative Thinker</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                activeView === item.id
                  ? "bg-[#1a2e1a] text-[#c8e6c8]"
                  : "text-[#6b8f6b] hover:bg-[#141e14] hover:text-[#a8d8a8]"
              }`}
            >
              <span className="flex-shrink-0">{NavIcons[item.id]?.()}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#111611] overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e2e1e]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-[#161c16] transition-colors text-[#6b8f6b]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <span className="text-sm text-[#6b8f6b]">
            {navItems.find((n) => n.id === activeView)?.label}
          </span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <ActiveComponent />
        </div>

        {/* Input Bar is inside ChatView */}
      </main>
    </div>
  );
}
