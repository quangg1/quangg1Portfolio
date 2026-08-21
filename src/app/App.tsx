import { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  ChevronDown,
  Terminal,
  Code2,
  Layers,
  Database,
  Globe,
  Cpu,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Calendar,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Upload,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import imgAbout from "figma:asset/5b4f19c9a3ac274ee7fa0dd44872aab24c3f9151.png";
import imgMem1 from "figma:asset/a9936188eb6db85cde1d0d3430a54cec4b131df6.png";
import imgMem2 from "figma:asset/e0cc2bffa238528c70726effe30d53298f9dc026.png";

const NAV_ITEMS = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Contact",
];
const SKILLS = [
  {
    category: "Languages",
    icon: <Code2 size={16} />,
    items: [
      { name: "Python", level: 80 },
      { name: "TypeScript / JavaScript", level: 78 },
      { name: "SQL", level: 72 },
    ],
  },
  {
    category: "Backend",
    icon: <Database size={16} />,
    items: [
      { name: "NestJS / FastAPI", level: 76 },
      { name: "Node.js / Express", level: 78 },
      { name: "PostgreSQL / Prisma", level: 74 },
      { name: "MongoDB / Redis", level: 72 },
    ],
  },
  {
    category: "Frontend",
    icon: <Globe size={16} />,
    items: [
      { name: "React / Next.js", level: 80 },
      { name: "Three.js", level: 66 },
      { name: "Tailwind CSS", level: 82 },
    ],
  },
  {
    category: "AI",
    icon: <Cpu size={16} />,
    items: [
      { name: "LangGraph + RAG", level: 74 },
      { name: "Gemini / OpenAI", level: 78 },
      { name: "n8n workflows", level: 80 },
    ],
  },
  {
    category: "DevOps",
    icon: <Zap size={16} />,
    items: [
      { name: "Docker", level: 70 },
      { name: "GitHub Actions / CI/CD", level: 68 },
      { name: "Playwright / Vitest", level: 66 },
      { name: "pytest", level: 62 },
    ],
  },
];
const PROJECTS = [
  {
    title: "CosmoLearn Edu",
    description:
      "Full-stack 3D education platform with an interactive Solar System simulator and a multi-layer AI tutoring agent (LangGraph + RAG).",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Three.js",
      "LangGraph",
    ],
    category: "Full Stack · AI",
    highlight: "JPL Horizons + Kepler solver",
    live: "#projects",
    repo: "#projects",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    title: "Mood Garden",
    description:
      "Offline-first emotional journaling app: the garden grows with consistency, not mood. Tested, containerized, and deployed on Render.",
    tech: [
      "Next.js",
      "NestJS",
      "FastAPI",
      "PostgreSQL",
      "Redis/BullMQ",
      "Docker",
      "GitHub Actions",
    ],
    category: "Full Stack",
    highlight: "Vitest · Playwright · Render",
    live: "#projects",
    repo: "#projects",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
];
const EXPERIENCE = [
  {
    role: "AI Engineer Intern",
    company: "Veron Group Company",
    period: "Jul 2025 — Jan 2026",
    location: "Ho Chi Minh City",
    description:
      "Built an n8n automation pipeline that cut internal document processing time, integrating OpenAI/Gemini for content generation. Shipped an AI lesson-planning tool on RAG so teachers generate structured plans from uploaded curriculum.",
    tags: ["n8n", "RAG", "OpenAI", "Gemini"],
  },
];
const EDUCATION = {
  degree: "Bachelor of Information Technology",
  major: "Software Engineering",
  school: "University of Technology and Engineering",
  period: "Aug 2022 — Nov 2026",
  gpa: "3.0",
};
const CERTS = [
  { name: "TOEIC 890 / 990", meta: "IIG Vietnam · 2026" },
  {
    name: "Machine Learning Specialization",
    meta: "Coursera · 2024",
  },
];
const STATS = [
  { value: "3.0", label: "Final GPA" },
  { value: "890", label: "TOEIC" },
  { value: "6 mo", label: "AI Intern" },
  { value: "2", label: "Shipped products" },
];

function useTypingEffect(
  words: string[],
  speed = 80,
  pause = 2000,
) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(
        () => setCharIdx((c) => c + 1),
        speed,
      );
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(
        () => setCharIdx((c) => c - 1),
        speed / 2,
      );
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

function SkillBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-mono text-foreground/80">
          {name}
        </span>
        <span className="text-xs font-mono text-primary">
          {level}%
        </span>
      </div>
      <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const go = (next: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setCurrentIndex(next);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleNext = () =>
    go((currentIndex + 1) % PROJECTS.length);
  const handlePrev = () =>
    go((currentIndex - 1 + PROJECTS.length) % PROJECTS.length);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.muted = false;
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const project = PROJECTS[currentIndex];

  return (
    <div className="relative w-full">
      <div className="flex flex-col lg:flex-row gap-8 items-center bg-card/40 border border-border rounded-lg p-6 md:p-8">
        <div className="w-full lg:w-1/3 flex flex-col justify-center order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-primary border border-primary/30 px-2 py-1 rounded-sm">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {project.highlight}
            </span>
          </div>
          <h3
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-wide"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {project.title}
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-foreground/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/3 order-1 lg:order-2 relative aspect-[16/10] bg-black border border-border rounded-md overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-10 bg-zinc-900 border-b border-border flex items-center px-4 z-20 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto bg-black/50 border border-white/5 rounded-md px-4 py-1 text-[10px] font-mono text-muted-foreground w-1/2 text-center truncate">
              demo · {project.title}
            </div>
          </div>

          <div className="absolute top-10 left-0 right-0 bottom-0 bg-zinc-950">
            <video
              ref={videoRef}
              key={project.title}
              src={project.videoUrl}
              loop
              playsInline
              controls
              className="w-full h-full object-cover"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 hover:bg-black/20 transition-colors"
              >
                <span className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-mono font-semibold">
                  <PlayCircle size={18} /> Play demo
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="p-3 border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-3 border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex gap-3">
          {PROJECTS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => go(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function InternshipGallery() {
  const [images, setImages] = useState<string[]>([
    imgAbout,
    imgMem1,
    imgMem2,
  ]);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return;
    const added = Array.from(e.target.files).map((f) =>
      URL.createObjectURL(f),
    );
    setImages((prev) => [...prev, ...added]);
    e.target.value = "";
  };

  return (
    <div className="mt-16 border border-border bg-card/20 p-6 md:p-10 rounded-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h3
            className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            <ImageIcon size={20} className="text-primary" />
            INTERNSHIP MEMORIES
          </h3>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            Click a photo to open full size
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-4 py-2.5 text-xs font-mono hover:bg-primary/20 transition-colors"
        >
          <Upload size={14} /> Upload Photos
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setLightboxIdx(i)}
            className="relative aspect-[4/5] overflow-hidden border border-border rounded-sm group"
          >
            <img
              src={src}
              alt={`Memory ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            className="absolute top-6 right-6 text-muted-foreground hover:text-primary bg-card/50 p-2.5 rounded-full border border-border"
          >
            <X size={24} />
          </button>
          <img
            src={images[lightboxIdx]}
            alt={`Photo ${lightboxIdx + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-md border border-border/50"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 md:left-10 p-3 rounded-full border border-border bg-card/80"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx(
                    (lightboxIdx - 1 + images.length) %
                      images.length,
                  );
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className="absolute right-4 md:right-10 p-3 rounded-full border border-border bg-card/80"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx(
                    (lightboxIdx + 1) % images.length,
                  );
                }}
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-8 font-mono text-xs bg-card/80 px-4 py-2 rounded-full border border-border">
                {lightboxIdx + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const typed = useTypingEffect([
    "Backend Software Engineer",
    "AI Engineer",
    "RAG & Multi-agent Systems",
    "Seeking AI/SWE Internship",
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = [
        "about",
        "skills",
        "projects",
        "experience",
        "education",
        "contact",
      ];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("hero");
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)",
          backgroundSize: "100% 3px",
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm font-bold text-primary tracking-widest hover:text-accent transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {"<"}QUANG.DEV{"/>"}
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-xs font-mono tracking-widest uppercase transition-colors hover:text-primary ${
                  activeSection === item.toLowerCase()
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-card border-b border-border px-6 pb-6 pt-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left py-3 text-sm font-mono text-muted-foreground hover:text-primary transition-colors border-b border-border/50 last:border-0"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span
                className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Seeking AI / Software Engineer Internship
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-black text-foreground leading-none tracking-tight mb-4 uppercase"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              NGUYỄN MINH
              <br />
              <span className="text-primary">PHÚ QUANG</span>
            </h1>

            <div className="flex items-center gap-3 mb-8 h-10">
              <Terminal
                size={16}
                className="text-primary flex-shrink-0"
              />
              <span
                className="text-lg md:text-2xl font-mono text-muted-foreground"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {typed}
                <span className="animate-pulse text-primary">
                  |
                </span>
              </span>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Computer Science student passionate about building
              modern web applications and scalable systems.
              Eager to learn, contribute to real-world projects,
              and grow as a Software Engineer.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-mono font-semibold hover:bg-accent transition-colors tracking-wide group"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                View Projects
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-2 border border-border text-foreground/80 px-6 py-3 text-sm font-mono font-semibold hover:border-primary/60 hover:text-foreground transition-colors tracking-wide"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <Mail size={14} />
                Contact Me
              </button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px border border-border/50">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="bg-card/50 p-6 text-center border-r border-border/50 last:border-r-0"
              >
                <div
                  className="text-3xl md:text-4xl font-black text-primary mb-1"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        >
          <ChevronDown size={20} />
        </button>
      </section>

      <section
        id="about"
        className="py-24 border-t border-border"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=600&h=720&fit=crop&auto=format"
                  alt="Developer setup"
                  className="w-full h-80 md:h-[480px] object-cover grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-color" />
              </div>

              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary" />

              <div
                className="absolute bottom-8 left-4 right-4 bg-background/90 backdrop-blur-sm border border-border p-4 font-mono text-xs"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground ml-2 text-[10px]">
                    whoami.ts
                  </span>
                </div>
                <div className="text-muted-foreground">
                  <span className="text-primary">const</span>{" "}
                  quang = {"{"}
                  <br />
                  {"  "}
                  <span className="text-accent">
                    location
                  </span>:{" "}
                  <span className="text-foreground/70">
                    "HCM City, VN"
                  </span>
                  ,
                  <br />
                  {"  "}
                  <span className="text-accent">
                    focus
                  </span>:{" "}
                  <span className="text-foreground/70">
                    "Full-stack Web Dev"
                  </span>
                  ,
                  <br />
                  {"  "}
                  <span className="text-accent">
                    status
                  </span>:{" "}
                  <span className="text-green-400">
                    "seeking internship"
                  </span>
                  <br />
                  {"}"}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-mono text-primary tracking-widest uppercase"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  01 / About
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <h2
                className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-none"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                SHIPPING
                <br />
                <span className="text-primary">PRODUCTION</span>
                <br />
                AI SYSTEMS
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  I am a Backend and AI Engineer intern who
                  ships production-minded applications with
                  Python, Node.js, and React: RAG pipelines,
                  multi-agent systems, automated tests, and
                  containers.
                </p>
                <p>
                  At Veron Group I automated internal document
                  workflows with n8n and OpenAI/Gemini, then
                  built a RAG lesson planner so teachers get
                  structured plans from uploaded curriculum —
                  not a toy demo, an internal tool people
                  actually used.
                </p>
                <p>
                  Independently I architected CosmoLearn (3D
                  solar-system lab + LangGraph tutors) and Mood
                  Garden (offline-first NestJS/FastAPI monorepo,
                  CI, Render). I am looking for an AI/Software
                  Engineer internship where I can own backend
                  and AI features end-to-end.
                </p>
              </div>

              <div
                className="mt-8 flex flex-wrap gap-6 text-sm font-mono text-muted-foreground"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-primary" />
                  <span>HCM City, VN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar
                    size={13}
                    className="text-primary"
                  />
                  <span>Available Immediately</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={13} className="text-primary" />
                  <span>On-site / Hybrid</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href="https://github.com/quangg1"
                  className="p-2.5 border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all rounded-sm"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/quang-nguy%E1%BB%85n-89b96a291"
                  className="p-2.5 border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all rounded-sm"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=nguyenminhphuquang123@gmail.com"
                  className="p-2.5 border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all rounded-sm"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="py-24 border-t border-border bg-card/30"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <span
              className="text-xs font-mono text-primary tracking-widest uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              02 / Skills
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="mb-10">
            <h2
              className="text-4xl md:text-5xl font-black text-foreground leading-none"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              TECHNICAL
              <span className="text-primary"> ARSENAL</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {SKILLS.map((group, gi) => (
              <div
                key={group.category}
                className="border border-border bg-card p-6 rounded-sm"
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-primary">
                    {group.icon}
                  </span>
                  <span
                    className="text-xs font-mono tracking-widest uppercase text-muted-foreground"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {group.category}
                  </span>
                </div>
                {group.items.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={gi * 100 + si * 80}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p
              className="text-xs font-mono text-muted-foreground mb-4 tracking-widest uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Also familiar with:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "JavaScript",
                "Next.js",
                "Firebase",
                "MySQL",
                "AWS (EC2/S3)",
                "Jest",
                "Redux",
                "GraphQL Basics",
                "UI/UX Design",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-muted-foreground border border-border px-3 py-1 rounded-sm hover:border-primary/40 hover:text-foreground/80 transition-colors"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="py-24 border-t border-border"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <span
              className="text-xs font-mono text-primary tracking-widest uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              03 / Projects
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <h2
              className="text-4xl md:text-5xl font-black text-foreground leading-none"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              SELECTED
              <span className="text-primary"> WORK</span>
            </h2>
            <a
              href="#"
              className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase group"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
                All on GitHub
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          <ProjectSlider />
        </div>
      </section>

      <section
        id="experience"
        className="py-24 border-t border-border bg-card/30"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <span
              className="text-xs font-mono text-primary tracking-widest uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              04 / Experience
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <h2
              className="text-4xl md:text-5xl font-black text-foreground leading-none"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              WHERE I&apos;VE
              <span className="text-primary"> WORKED</span>
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-px bg-border hidden md:block"
              style={{ left: "191px" }}
            />

            <div className="space-y-0">
              {EXPERIENCE.map((exp, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col md:flex-row gap-6 md:gap-12 border-b border-border py-8 last:border-b-0 hover:bg-card/30 transition-colors px-4 -mx-4"
                >
                  <div className="md:w-48 md:text-right flex-shrink-0">
                    <div
                      className="text-xs font-mono text-muted-foreground tracking-widest mb-1"
                      style={{
                        fontFamily:
                          "'JetBrains Mono', monospace",
                      }}
                    >
                      {exp.period}
                    </div>
                    <div
                      className="text-sm font-bold text-primary"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                      }}
                    >
                      {exp.company}
                    </div>
                    <div
                      className="flex items-center gap-1 text-xs text-muted-foreground md:justify-end mt-1"
                      style={{
                        fontFamily:
                          "'JetBrains Mono', monospace",
                      }}
                    >
                      <MapPin size={10} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div
                    className="hidden md:flex items-start pt-1.5 flex-shrink-0"
                    style={{ marginLeft: "-4.5px" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary border-2 border-background group-hover:scale-125 transition-transform" />
                  </div>

                  <div className="flex-1">
                    <h3
                      className="text-lg font-bold text-foreground mb-3"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1.25rem",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono text-primary/70 border border-primary/20 px-2 py-0.5 rounded-sm"
                          style={{
                            fontFamily:
                              "'JetBrains Mono', monospace",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <InternshipGallery />
        </div>
      </section>
      <section
        id="education"
        className="py-24 border-t border-border"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <span
              className="text-xs font-mono text-primary tracking-widest uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              05 / Education
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="border border-border bg-card p-8">
              <p className="text-xs font-mono text-primary mb-2">
                {EDUCATION.period}
              </p>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {EDUCATION.degree}
              </h3>
              <p className="text-muted-foreground mb-1">
                {EDUCATION.major}
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                {EDUCATION.school}
              </p>
              <p
                className="mt-6 text-3xl font-black text-primary"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              ></p>
            </div>
            <div className="space-y-4">
              {CERTS.map((c) => (
                <div
                  key={c.name}
                  className="border border-border bg-card/50 p-6"
                >
                  <p
                    className="font-bold text-foreground"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                  >
                    {c.name}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    {c.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="py-24 border-t border-border"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <span
              className="text-xs font-mono text-primary tracking-widest uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              05 / Contact
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2
                className="text-4xl md:text-5xl font-black text-foreground leading-none mb-6"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                LET&apos;S BUILD
                <br />
                <span className="text-primary">SOMETHING</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                Whether you have an internship role, a freelance
                project, or just want to connect — my inbox is
                open. I typically respond within 24 hours.
              </p>

              <div
                className="space-y-4 font-mono text-sm"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=nguyenminhphuquang123@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail size={14} className="text-primary" />
                  <span>nguyenminhphuquang123@gmail.com</span>
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
                <a
                  href="https://github.com/quangg1"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Github size={14} className="text-primary" />
                  <span>github.com/quangg1</span>
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/quang-nguy%E1%BB%85n-89b96a291"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Linkedin
                    size={14}
                    className="text-primary"
                  />
                  <span>
                    linkedin.com/in/quang-nguyễn-89b96a291
                  </span>
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="font-mono text-xs text-muted-foreground"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            © 2026 Nguyễn Minh Phú Quang. Built with React +
            Tailwind.
          </span>
          <div
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
            Seeking Internships
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-primary/30 bg-primary/5 p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
        <div className="w-12 h-12 border-2 border-primary flex items-center justify-center">
          <Zap size={20} className="text-primary" />
        </div>
        <div>
          <p
            className="font-bold text-foreground mb-1"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.25rem",
            }}
          >
            Message sent.
          </p>
          <p
            className="text-sm text-muted-foreground font-mono"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            I&apos;ll get back to you within 24h.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          className="block text-xs font-mono text-muted-foreground mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Name
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-colors font-mono rounded-sm"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          className="block text-xs font-mono text-muted-foreground mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-colors font-mono rounded-sm"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label
          className="block text-xs font-mono text-muted-foreground mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Message
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-colors font-mono rounded-sm resize-none"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          placeholder="Hello Quang, we have an internship opening..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-3 text-sm font-mono font-bold tracking-widest uppercase hover:bg-accent transition-colors flex items-center justify-center gap-2 group"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Send Message
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    </form>
  );
}