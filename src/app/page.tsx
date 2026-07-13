"use client";

import { useState, useEffect, useCallback } from "react";
import type { ReactElement } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type SubProject = { title: string; challenge?: string; process?: string; solution?: string };
type Outcome = { stat: string; label: string };
type Project = { title: string; category: string; year: string; client?: string; tagline?: string; heroImageUrl?: string; subProjects?: SubProject[]; outcomes?: { stats: Outcome[]; reflection: string }; embedUrl?: string; thumbnailUrl?: string };

const workTabs = ["UX", "Graphic Design", "Motion", "Photography", "Failures"] as const;

const workProjects: Record<string, Project[]> = {
  UX: [
    { title: "JobNimbus Mobile App", category: "Mobile UX", year: "2022 – 2026", client: "Roofers", tagline: "JobNimbus is a CRM built for roofing and home exteriors contractors — helping sales reps track leads, coordinate production with homeowners, and manage the entire job lifecycle from signed contract to finished roof and final payment.", heroImageUrl: "/JobNimbus Mobile app/Hero.png", thumbnailUrl: "/JobNimbus Mobile app/Header.png", subProjects: [{ title: "Web Parity", challenge: "When I joined JobNimbus the mobile app covered roughly 40% of what the web product could do — and users felt it. Sales reps were hauling laptops to job sites or waiting until they got back to the office to log notes, update statuses, and fill out forms. The goal was to close that gap to 90% parity within six months, prioritizing the workflows that field crews and sales reps touched every day. The challenge wasn't just feature count — it was figuring out which web capabilities actually mattered in a mobile context and designing them to feel native, not ported." }, { title: "Photo Reports" }, { title: "Sub Contractors" }, { title: "Photo Annotations" }], outcomes: { stats: [{ stat: "3.4★", label: "App store rating before" }, { stat: "4.8★", label: "App store rating after" }, { stat: "+1.4", label: "Stars gained" }], reflection: "When I joined the team the JobNimbus mobile app sat at a 3.4-star average across the App Store and Google Play — largely driven by crashes, missing features, and a UI that hadn't kept pace with the web product. Over four years we methodically closed the gap: shipping web parity features, rebuilding photo workflows, overhauling sub-contractor access, and introducing inline photo annotations. The app now holds a 4.8-star average. The biggest lesson: rating improvements follow trust improvements. Every time we reduced friction in a high-frequency workflow, reviews moved." } },
    { title: "AI Mobile Design Builder", category: "Web App", year: "2024" },
    { title: "ThermoWorks Mobile App", category: "User Research", year: "2023" },
    { title: "EventDreamer", category: "Landing page and event management", year: "2023" },
  ],
  "Graphic Design": [
    { title: "JobNimbus Pillar Posters", category: "Branding", year: "2024" },
    { title: "Sunny Dayz", category: "Branding", year: "2024" },
    { title: "Packaging Design", category: "Product", year: "2023" },
    { title: "Magazine Layout", category: "Editorial", year: "2023" },
  ],
  Motion: [
    { title: "Demo Reel", category: "Motion Graphics", year: "2020", embedUrl: "https://player.vimeo.com/video/434784051?badge=0&autopause=0&player_id=0&app_id=58479", thumbnailUrl: "https://i.vimeocdn.com/video/918251788-58e2e44f097232a2dd41b1597df9a758268bd76c568a253d52b1c8c335b47078-d_640?region=us" },
    { title: "UVU Convocation", category: "Video", year: "2019", embedUrl: "https://player.vimeo.com/video/379922304?badge=0&autopause=0&player_id=0&app_id=58479", thumbnailUrl: "https://i.vimeocdn.com/video/840119054-8493c24b63a5bfe983607b7cc454423e843cd44630489a131aa109df9e0260f9-d_640?region=us" },
    { title: "UVU Convocation 2020", category: "Video", year: "2020", embedUrl: "https://player.vimeo.com/video/522161043?badge=0&autopause=0&player_id=0&app_id=58479", thumbnailUrl: "https://i.vimeocdn.com/video/1081386545-bca59249a08706720986ac0d04e77ff11f7251a990b7c0dcaf42e5f5d0512fca-d_640?region=us" },
    { title: "Golf", category: "Film", year: "2019", embedUrl: "https://player.vimeo.com/video/327076333?badge=0&autopause=0&player_id=0&app_id=58479", thumbnailUrl: "https://i.vimeocdn.com/video/771253435-651f5afc2356e11fce67f2e699d8b6108c872c1efdc21468be4277790055daea-d_640?region=us" },
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

type GalleryPhoto = { id: number; src: string; caption: string };

const galleryPhotos: GalleryPhoto[] = [
  { id: 1,  src: "/Photography/IMG_1666.jpg",            caption: "" },
  { id: 2,  src: "/Photography/IMG_1952.jpg",            caption: "" },
  { id: 3,  src: "/Photography/IMG_2598.jpg",            caption: "" },
  { id: 4,  src: "/Photography/IMG_3686.jpg",            caption: "" },
  { id: 5,  src: "/Photography/IMG_4394.jpg",            caption: "" },
  { id: 6,  src: "/Photography/IMG_4438_jpg.jpg",        caption: "" },
  { id: 7,  src: "/Photography/IMG_5902-2.jpg",          caption: "" },
  { id: 8,  src: "/Photography/IMG_6764.jpg",            caption: "" },
  { id: 9,  src: "/Photography/IMG_7023.jpg",            caption: "" },
  { id: 10, src: "/Photography/IMG_7417-2.jpg",          caption: "" },
  { id: 11, src: "/Photography/20190729-_MG_2771.jpg",   caption: "" },
  { id: 12, src: "/Photography/20190730-_MG_3061.jpg",   caption: "" },
  { id: 13, src: "/Photography/K&K-46.jpg",              caption: "" },
  { id: 14, src: "/Photography/_MG_0064.jpg",            caption: "" },
  { id: 15, src: "/Photography/_MG_0454.jpg",            caption: "" },
  { id: 16, src: "/Photography/_MG_1979.jpg",            caption: "" },
  { id: 17, src: "/Photography/anna newborn-32.jpg",     caption: "" },
];

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

function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const markLoaded = useCallback((id: number) => {
    setLoaded((prev) => new Set(prev).add(id));
  }, []);
  const total = galleryPhotos.length;

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, close, prev, next]);

  const current = lightboxIndex !== null ? galleryPhotos[lightboxIndex] : null;

  return (
    <div>
      {/* Masonry grid — 2 columns mobile, 3 desktop */}
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {galleryPhotos.map((photo, i) => (
          <div
            key={photo.id}
            className={`break-inside-avoid w-full overflow-hidden rounded-xl cursor-zoom-in relative group ${!loaded.has(photo.id) ? "min-h-[160px] bg-[#161c16]" : ""}`}
            onClick={() => setLightboxIndex(i)}
          >
            {!loaded.has(photo.id) && (
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1e2e1e]/60 to-transparent animate-[shimmer_1.4s_ease-in-out_infinite] bg-[length:200%_100%]" />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption || `Photo ${i + 1}`}
              className={`w-full h-auto block transition-opacity duration-700 ${loaded.has(photo.id) ? "opacity-100" : "opacity-0"}`}
              onLoad={() => markLoaded(photo.id)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {current !== null && (
        <div
          className="fixed inset-0 z-[9990] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3"
            aria-label="Previous"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="flex flex-col items-center gap-3 max-w-[88vw] max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.caption || `Photo ${lightboxIndex! + 1}`}
              className="max-w-full max-h-[82vh] object-contain rounded-lg"
            />
            {current.caption && (
              <span className="text-xs text-white/40">{current.caption}</span>
            )}
            <span className="text-xs text-white/25">{lightboxIndex! + 1} / {total}</span>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3"
            aria-label="Next"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9990] bg-black/95 flex flex-col items-center justify-center px-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors p-2"
        aria-label="Close"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {project.embedUrl ? (
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src={project.embedUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title={project.title}
            />
          </div>
        ) : (
          <div className="aspect-video bg-[#161c16] border border-[#1e2e1e] rounded-xl flex items-center justify-center">
            <p className="text-sm text-[#4a6a4a]">Video coming soon</p>
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-[#c8e6c8]">{project.title}</p>
            <p className="text-sm text-[#6b8f6b]">{project.category}</p>
          </div>
          <span className="text-sm text-[#4a6a4a]">{project.year}</span>
        </div>
      </div>
    </div>
  );
}

function WorkView({ onProjectSelect }: { onProjectSelect: (p: Project) => void }) {
  const [activeTab, setActiveTab] = useState<string>("UX");
  const [selectedVideo, setSelectedVideo] = useState<Project | null>(null);
  const isPhoto = activeTab === "Photography";
  const isMotion = activeTab === "Motion";
  const projects = (isPhoto || isMotion) ? workProjects[activeTab] ?? [] : workProjects[activeTab] ?? [];

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

      {isPhoto ? (
        <PhotoGallery />
      ) : isMotion ? (
        <>
          {selectedVideo && (
            <VideoModal project={selectedVideo} onClose={() => setSelectedVideo(null)} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(project)}
              >
                <div className="aspect-video bg-[#161c16] rounded-xl mb-3 overflow-hidden border border-[#1e2e1e] group-hover:border-[#3a5a3a] transition-colors relative flex items-center justify-center">
                  {project.thumbnailUrl && (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="tv-img absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity"
                    />
                  )}
                  <div className="tv-snow" />
                  <div className="tv-static" />
                  {/* Play button */}
                  <div className="relative flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border border-[#3a5a3a] group-hover:border-[#6b8f6b] bg-black/30 flex items-center justify-center transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#6b8f6b] group-hover:text-[#a8d8a8] transition-colors ml-0.5">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                    {!project.embedUrl && <span className="text-xs text-[#2a402a]">Coming soon</span>}
                  </div>
                  <div className="absolute inset-0 bg-[#c8e6c8]/0 group-hover:bg-[#c8e6c8]/[0.03] transition-colors" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium group-hover:text-[#a8d8a8] transition-colors">{project.title}</h3>
                    <p className="text-sm text-[#6b8f6b]">{project.category}</p>
                  </div>
                  <span className="text-sm text-[#4a6a4a]">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group cursor-pointer"
              onClick={() => onProjectSelect(project)}
            >
              <div className="aspect-[16/10] bg-[#161c16] rounded-xl mb-3 overflow-hidden border border-[#1e2e1e] group-hover:border-[#3a5a3a] transition-colors relative flex items-center justify-center">
                {project.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="text-sm text-[#3a5a3a]">[ image ]</span>
                )}
                <div className="absolute inset-0 bg-[#c8e6c8]/0 group-hover:bg-[#c8e6c8]/[0.03] transition-colors" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium group-hover:text-[#a8d8a8] transition-colors">{project.title}</h3>
                  <p className="text-sm text-[#6b8f6b]">{project.category}</p>
                </div>
                <span className="text-sm text-[#4a6a4a]">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Project / Case Study ─────────────────────────────────────────────────────

function ImagePlaceholder({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`bg-[#161c16] border border-[#1e2e1e] rounded-xl flex flex-col items-center justify-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a402a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      {label && <span className="text-xs text-[#3a5a3a]">{label}</span>}
    </div>
  );
}

function ProjectView({ project, onBack }: { project: Project; onBack: () => void }) {
  const [activeSubIdx, setActiveSubIdx] = useState(0);
  const activeSub = project.subProjects?.[activeSubIdx];
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-24">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-[#6b8f6b] hover:text-[#a8d8a8] transition-colors mb-10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Work
      </button>

      {/* Hero */}
      <div className="mb-12">
        <p className="text-xs tracking-[0.25em] uppercase text-[#6b8f6b] mb-3">
          {project.category} — {project.year}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">{project.title}</h1>
        <p className="text-[#6b8f6b] max-w-xl text-base leading-relaxed">
          {project.tagline ?? "A brief tagline describing the essence of this project and the problem it solved. One or two sentences setting the scene."}
        </p>
      </div>

      {/* Hero image */}
      {project.heroImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.heroImageUrl} alt={`${project.title} hero`} className="w-full aspect-[21/9] object-cover object-top rounded-xl mb-16" />
      ) : (
        <ImagePlaceholder label="Hero Image" className="w-full aspect-[21/9] mb-16" />
      )}

      {/* Meta strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1e2e1e] rounded-xl overflow-hidden mb-16">
        {[
          { label: "Role", value: "Lead Designer" },
          { label: "Year", value: project.year },
          { label: "Tools", value: "Figma, Claude Code" },
          { label: "Client", value: project.client ?? "[ Client Name ]" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#0d130d] px-6 py-5">
            <p className="text-xs tracking-[0.2em] uppercase text-[#4a6a4a] mb-1">{label}</p>
            <p className="text-sm text-[#c8e6c8]">{value}</p>
          </div>
        ))}
      </div>

      {/* Sub-project selector */}
      {project.subProjects && (
        <div className="flex gap-3 mb-16 flex-wrap">
          {project.subProjects.map((sub, i) => (
            <button
              key={sub.title}
              onClick={() => setActiveSubIdx(i)}
              className={`px-5 py-2 text-base rounded-full whitespace-nowrap transition-all border ${
                activeSubIdx === i
                  ? "bg-[#1e3a1e] border-[#a8d8a8] text-[#c8e6c8] font-semibold"
                  : "bg-transparent border-[#2a4a2a] text-[#6b8f6b] hover:border-[#4a6a4a] hover:text-[#a8d8a8]"
              }`}
            >
              {sub.title}
            </button>
          ))}
        </div>
      )}

      {/* Challenge */}
      <section className="mb-20">
        <p className="text-xs tracking-[0.25em] uppercase text-[#4a6a4a] mb-4">01 — Challenge</p>
        <h2 className="text-2xl font-semibold mb-6">What problem were we solving?</h2>

        <p className="text-[#a8d8a8] leading-relaxed text-sm max-w-2xl mb-8">
          {activeSub?.challenge
            ?? (activeSub
              ? `Describe the core problem for ${activeSub.title}. What was broken, missing, or frustrating? Include any relevant user research findings, business constraints, or existing pain points that framed the challenge.`
              : "Describe the core problem or tension that kicked off this project. What was broken, missing, or frustrating? Include any relevant user research findings, business constraints, or existing pain points that framed the challenge."
            )
          }
        </p>
        <ImagePlaceholder label="Research / Discovery" className="w-full aspect-[16/7]" />
      </section>

      {/* Process */}
      <section className="mb-20">
        <p className="text-xs tracking-[0.25em] uppercase text-[#4a6a4a] mb-3">02 — Process</p>
        <h2 className="text-2xl font-semibold mb-5">{activeSub ? `How we approached ${activeSub.title}` : "How we got there"}</h2>
        <p className="text-[#a8d8a8] leading-relaxed text-sm max-w-2xl mb-8">
          Walk through the design process — explorations, sketches, wireframes, iterations, and
          pivots. This is where you show your thinking, not just your outcomes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ImagePlaceholder label="Sketches" className="aspect-[4/3]" />
          <ImagePlaceholder label="Wireframes" className="aspect-[4/3]" />
          <ImagePlaceholder label="Iteration" className="aspect-[4/3]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImagePlaceholder label="User Testing" className="aspect-[16/9]" />
          <ImagePlaceholder label="Feedback / Revision" className="aspect-[16/9]" />
        </div>
      </section>

      {/* Solution */}
      <section className="mb-20">
        <p className="text-xs tracking-[0.25em] uppercase text-[#4a6a4a] mb-3">03 — Solution</p>
        <h2 className="text-2xl font-semibold mb-5">{activeSub ? `${activeSub.title} — final design` : "The final design"}</h2>
        <ImagePlaceholder label="Final Design — Full Width" className="w-full aspect-[16/8] mb-10" />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-[#a8d8a8] leading-relaxed text-sm">
            <p>
              Describe the solution in detail. What decisions were made and why? How does the
              final design address the problem defined in the challenge section?
            </p>
            <p>
              Highlight key interactions, design decisions, or principles that make this solution
              stand out or work particularly well for the user.
            </p>
          </div>
          <div className="space-y-4">
            <ImagePlaceholder label="Detail View" className="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="mb-20">
        <p className="text-xs tracking-[0.25em] uppercase text-[#4a6a4a] mb-3">04 — Outcomes</p>
        <h2 className="text-2xl font-semibold mb-8">Results & impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {(project.outcomes?.stats ?? [
            { stat: "00%", label: "Metric one placeholder" },
            { stat: "00%", label: "Metric two placeholder" },
            { stat: "00x", label: "Metric three placeholder" },
          ]).map(({ stat, label }) => (
            <div key={label} className="border border-[#1e2e1e] rounded-xl px-6 py-8 text-center">
              <p className="text-4xl font-semibold text-[#c8e6c8] mb-2">{stat}</p>
              <p className="text-xs text-[#6b8f6b]">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-[#a8d8a8] leading-relaxed text-sm max-w-2xl">
          {project.outcomes?.reflection ?? "Summarize the impact: what changed after this shipped? What did you learn? What would you do differently? A brief honest reflection makes the case study more credible and human."}
        </p>
      </section>

      {/* Divider */}
      <div className="border-t border-[#1e2e1e] mb-10" />

      {/* Footer CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#4a6a4a] mb-1">Next up</p>
          <p className="text-sm text-[#6b8f6b]">Browse more work</p>
        </div>
        <button
          onClick={onBack}
          className="px-5 py-2.5 border border-[#2a402a] text-[#a8d8a8] text-sm rounded-lg hover:bg-[#161c16] transition-colors"
        >
          ← Back to Work
        </button>
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
        <a
          href="https://www.linkedin.com/in/joshua-taylor-39730a138/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-xl border border-[#1e2e1e] hover:bg-[#161c16] hover:border-[#3a5a3a] transition-colors"
        >
          <span className="text-[#6b8f6b]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </span>
          <div>
            <div className="font-medium">LinkedIn</div>
            <div className="text-sm text-[#6b8f6b]">joshua-taylor-39730a138</div>
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

const staticViews: Record<string, (props: { onNav: (view: string) => void }) => ReactElement> = {
  home: HomeView,
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNav = (id: string) => {
    setActiveView(id);
    setMenuOpen(false);
    setSelectedProject(null);
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
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-black/50 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile slide-in drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0d130d] border-l border-[#1e2e1e] z-50 md:hidden flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2e1e]">
          <span className="font-semibold text-sm">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 text-[#6b8f6b] hover:text-[#a8d8a8] transition-colors"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col p-3 gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left flex items-center gap-2 px-4 py-3 text-sm rounded-lg transition-colors ${
                activeView === link.id
                  ? "text-[#c8e6c8] bg-[#161c16]"
                  : "text-[#6b8f6b] hover:text-[#a8d8a8] hover:bg-[#161c16]"
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
        </nav>
      </div>

      {/* Page Content */}
      <main className="flex-1">
        {activeView === "work" ? (
          selectedProject ? (
            <ProjectView
              project={selectedProject}
              onBack={() => setSelectedProject(null)}
            />
          ) : (
            <WorkView onProjectSelect={setSelectedProject} />
          )
        ) : (
          staticViews[activeView]?.({ onNav: handleNav })
        )}
      </main>
    </div>
  );
}
