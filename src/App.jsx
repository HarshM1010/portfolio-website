import { useState } from "react";

const RESUME_LINK = "https://drive.google.com/file/d/11xcnqo93vdEAI_i15c_SCU4zgS_M-Bt-/view?usp=drivesdk";

const NAV = ["about", "projects", "skills", "contact"];

const PROJECTS = [
  {
    name: "StudyNotion",
    preview: "https://placehold.co/800x450/111111/3b82f6?text=StudyNotion+Preview",
    tech: ["React.js", "Tailwind CSS", "Express", "MongoDB"],
    points: [
      "Full-stack role-based e-learning platform with JWT authentication.",
      "Students can purchase, review, and wishlist courses.",
      "Instructors can publish and update courses; admins manage categories.",
      "Cron job for scheduled account deletion.",
    ],
    github: "https://github.com/HarshM1010/StudyNotionFinalProject",
    live: "",
  },
  {
    name: "Social Chat App",
    preview: "https://placehold.co/800x450/111111/3b82f6?text=Social+Chat+App+Preview",
    tech: ["Next.js", "Nest.js", "Neo4j", "MongoDB", "Redis", "GraphQL"],
    points: [
      "Graph-based social network with hybrid database architecture.",
      "JWT auth + Redis for distributed rate-limiting and session management.",
      "Dockerized services via CI/CD pipelines to Vercel and Render.",
    ],
    github: "https://github.com/HarshM1010/Social-chat-app",
    live: "",
  },
];

const SKILLS = [
  {
    group: "Languages",
    icon: "{ }",
    items: [
      { name: "C / C++", icon: "⚙" },
      { name: "TypeScript", icon: "Ts" },
      { name: "JavaScript", icon: "Js" },
      { name: "SQL", icon: "⬡" },
      { name: "GraphQL", icon: "◈" },
      { name: "Cypher (Neo4j)", icon: "◎" },
    ],
  },
  {
    group: "Frameworks",
    icon: "◻",
    items: [
      { name: "Next.js", icon: "▲" },
      { name: "Nest.js", icon: "◑" },
      { name: "React.js", icon: "⬡" },
      { name: "Express.js", icon: "⇒" },
      { name: "Tailwind CSS", icon: "◈" },
    ],
  },
  {
    group: "Databases",
    icon: "◫",
    items: [
      { name: "Neo4j", icon: "◎" },
      { name: "MongoDB", icon: "◑" },
      { name: "Redis", icon: "◈" },
      { name: "PostgreSQL", icon: "⬡" },
    ],
  },
  {
    group: "Tools",
    icon: "⚒",
    items: [
      { name: "Git", icon: "⑂" },
      { name: "Docker", icon: "◻" },
      { name: "VS Code", icon: "◈" },
    ],
  },
  {
    group: "Concepts",
    icon: "◈",
    items: [
      { name: "Data Structures & Algorithms", icon: "⊞" },
      { name: "Object-Oriented Programming", icon: "◎" },
      { name: "DBMS", icon: "◫" },
      { name: "REST APIs", icon: "⇌" },
      { name: "Graph Theory", icon: "⬡" },
      { name: "OS / Networks", icon: "⊟" },
    ],
  },
];

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(null); // project name of open preview

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Message from ${form.name} — Portfolio`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:maneharsh513@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');

        :root {
          --bg:           #000000;
          --bg-card:      #0a0a0a;
          --bg-input:     #0a0a0a;
          --bg-contact:   #080808;
          --border:       #1f1f1f;
          --border-hover: #333333;
          --text:         #e8e8e8;
          --text-muted:   #888888;
          --text-dim:     #444444;
          --accent:       #3b82f6;
          --tag-bg:       #111111;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { background: var(--bg); }
        ::selection { background: var(--accent); color: #fff; }

        .port-root {
          font-family: 'IBM Plex Mono', monospace;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          font-size: 15px;
          line-height: 1.7;
        }

        /* ── Navbar ── */
        .navbar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(0,0,0,0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-link {
          font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-muted); cursor: pointer; background: none;
          border: none; font-family: inherit; transition: color 0.2s; padding: 0;
        }
        .nav-link:hover { color: var(--text); }
        .nav-link.active { color: var(--text); border-bottom: 1px solid var(--accent); padding-bottom: 2px; }

        .resume-btn {
          font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 7px 16px; color: var(--accent);
          border: 1px solid #1d3d6b; border-radius: 4px; cursor: pointer;
          font-family: inherit; transition: background 0.2s;
          text-decoration: none; display: inline-flex; align-items: center; gap: 7px;
          background: transparent;
        }
        .resume-btn:hover { background: rgba(59,130,246,0.1); }

        /* ── Sections ── */
        .section-divider { border-top: 1px solid var(--border); padding: 90px 0; }

        /* ── Justified intro paragraphs ── */
        .intro-para {
          text-align: justify;
          text-justify: inter-word;
        }

        /* ── Cards ── */
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color 0.2s;
        }
        .card:hover { border-color: var(--border-hover); }

        /* ── Project preview image ── */
        .project-preview {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid var(--border);
          display: block;
          margin-bottom: 20px;
          cursor: zoom-in;
          transition: opacity 0.2s, border-color 0.2s;
        }
        .project-preview:hover { opacity: 0.85; border-color: var(--border-hover); }

        /* ── Lightbox ── */
        .lightbox-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.92);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          cursor: zoom-out;
        }
        .lightbox-img {
          max-width: 100%; max-height: 90vh;
          border-radius: 8px;
          border: 1px solid var(--border-hover);
          box-shadow: 0 0 60px rgba(59,130,246,0.1);
        }
        .lightbox-close {
          position: absolute; top: 20px; right: 24px;
          font-family: inherit; font-size: 13px; letter-spacing: 0.1em;
          color: var(--text-muted); background: none; border: 1px solid var(--border);
          border-radius: 4px; padding: 6px 12px; cursor: pointer;
        }
        .lightbox-close:hover { color: var(--text); border-color: var(--border-hover); }

        /* ── Tech tags ── */
        .tag {
          font-size: 13px; letter-spacing: 0.04em;
          background: var(--tag-bg); border: 1px solid var(--border);
          color: var(--text-muted); padding: 3px 12px; border-radius: 4px;
        }

        /* ── Contact box ── */
        .contact-box {
          background: var(--bg-contact);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 40px 44px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .contact-divider {
          border-left: 1px solid var(--border);
          padding-left: 48px;
        }

        @media (max-width: 700px) {
          .contact-box {
            grid-template-columns: 1fr;
            padding: 28px 24px;
            gap: 32px;
          }
          .contact-divider { border-left: none; border-top: 1px solid var(--border); padding-left: 0; padding-top: 32px; }
        }

        /* ── Form inputs ── */
        .form-input {
          width: 100%; background: #111;
          border: 1px solid var(--border); border-radius: 6px;
          color: var(--text); font-family: inherit; font-size: 14px;
          padding: 11px 16px; outline: none; transition: border-color 0.2s;
          resize: none;
        }
        .form-input::placeholder { color: var(--text-dim); }
        .form-input:focus { border-color: var(--accent); }

        /* ── Contact links ── */
        .contact-link {
          display: flex; align-items: center; gap: 14px;
          color: var(--text-muted); text-decoration: none; font-size: 14px;
          padding: 12px 0; border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }
        .contact-link:hover { color: var(--text); }
        .contact-link:last-child { border-bottom: none; }

        /* ── Mobile menu ── */
        .menu-btn {
          display: none; background: none; border: 1px solid var(--border);
          color: var(--text-muted); padding: 6px 12px; font-size: 13px;
          cursor: pointer; font-family: inherit; letter-spacing: 0.1em; border-radius: 3px;
        }

        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .menu-btn { display: block; }
          .mobile-nav { display: flex; flex-direction: column; gap: 20px; padding: 24px 0; border-top: 1px solid var(--border); }
        }
        @media (min-width: 701px) {
          .mobile-nav { display: none; }
        }
      `}</style>

      {/* Lightbox */}
      {previewOpen && (
        <div className="lightbox-overlay" onClick={() => setPreviewOpen(null)}>
          <button className="lightbox-close" onClick={() => setPreviewOpen(null)}>✕ close</button>
          <img
            className="lightbox-img"
            src={PROJECTS.find(p => p.name === previewOpen)?.preview}
            alt={`${previewOpen} preview`}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      <div className="port-root">

        {/* ── Navbar ── */}
        <nav className="navbar">
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
              <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.05em" }}>
                <span style={{ color: "var(--accent)" }}>_</span>hm
              </span>

              <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                {NAV.map((n) => (
                  <button key={n} className={`nav-link ${active === n ? "active" : ""}`} onClick={() => scrollTo(n)}>
                    {n}
                  </button>
                ))}
                <a href={RESUME_LINK} target="_blank" rel="noreferrer" className="resume-btn">
                  <DownloadIcon /> Resume
                </a>
              </div>

              <button className="menu-btn" onClick={() => setMenuOpen(p => !p)}>
                {menuOpen ? "close" : "menu"}
              </button>
            </div>

            {menuOpen && (
              <div className="mobile-nav">
                {NAV.map((n) => (
                  <button key={n} className={`nav-link ${active === n ? "active" : ""}`} onClick={() => scrollTo(n)}>{n}</button>
                ))}
                <a href={RESUME_LINK} target="_blank" rel="noreferrer" className="resume-btn" style={{ alignSelf: "flex-start" }}>
                  ↓ Resume
                </a>
              </div>
            )}
          </div>
        </nav>

        <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 28px" }}>

          {/* ── About / Hero ── */}
          <section id="about" style={{ paddingTop: 110, paddingBottom: 100 }}>
            <p style={{ fontSize: 13, letterSpacing: "0.15em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 18 }}>
              Hello, I'm
            </p>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 58px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#f0f0f0", marginBottom: 32 }}>
              Harsh Mane
            </h1>

            <p className="intro-para" style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 22 }}>
              I'm a third-year Electronics & Telecommunication Engineering student at{" "}
              <span style={{ color: "var(--text)" }}>IIIT Bhubaneswar</span>, passionate about building robust and scalable web applications.
              My journey into software development started with curiosity about how large platforms handle millions of users — and that curiosity has never stopped driving me forward.
            </p>

            <p className="intro-para" style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 22 }}>
              My primary interest lies in{" "}
              <span style={{ color: "var(--text)" }}>backend engineering</span> — designing systems that are clean, maintainable, and built to scale.
              I enjoy working with technologies like{" "}
              <span style={{ color: "var(--text)" }}>Nest.js, GraphQL, Redis, and Neo4j</span>, and I'm constantly exploring how distributed architectures,
              caching strategies, and graph databases can solve real-world problems efficiently.
              Writing APIs that are not just functional but thoughtfully structured is something I care deeply about.
            </p>

            <p className="intro-para" style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 40 }}>
              Beyond coding, I actively sharpen my problem-solving skills through competitive programming —
              having solved 400+ problems across LeetCode and GeeksforGeeks.
              I believe strong fundamentals in{" "}
              <span style={{ color: "var(--text)" }}>data structures, algorithms, and system design</span> are what separate good engineers from great ones.
              I'm currently seeking internship opportunities to contribute meaningfully and grow alongside experienced teams.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("projects")} style={{ fontFamily: "inherit", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 24px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}>
                View projects
              </button>
              <button onClick={() => scrollTo("contact")} style={{ fontFamily: "inherit", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 24px", background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: 5, cursor: "pointer" }}>
                Get in touch
              </button>
            </div>

            <div style={{ marginTop: 70, display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[["CGPA", "8.08 / 10"], ["Problems Solved", "400+"]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 26, fontWeight: 500, color: "var(--text)" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 5 }}>{label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Projects ── */}
          <section id="projects" className="section-divider">
            <p style={{ fontSize: 12, letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 10 }}>
              01 <span style={{ color: "var(--text-dim)" }}>/ projects</span>
            </p>
            <h2 style={{ fontSize: 24, fontWeight: 500, color: "var(--text)", marginBottom: 40 }}>Things I've built</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {PROJECTS.map((p) => (
                <div key={p.name} className="card" style={{ padding: "32px 36px" }}>

                  {/* Preview image */}
                  <img
                    className="project-preview"
                    src={p.preview}
                    alt={`${p.name} landing page preview`}
                    onClick={() => setPreviewOpen(p.name)}
                    title="Click to enlarge"
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 18 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 500, color: "#f0f0f0" }}>{p.name}</h3>
                    <div style={{ display: "flex", gap: 12 }}>
                      <a href={p.github} target="_blank" rel="noreferrer"
                        style={{ fontSize: 13, color: "var(--text-dim)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}
                        onMouseOver={e => e.currentTarget.style.color = "var(--text)"}
                        onMouseOut={e => e.currentTarget.style.color = "var(--text-dim)"}
                      >
                        <GithubIcon /> github
                      </a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer"
                          style={{ fontSize: 13, color: "var(--text-dim)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}
                          onMouseOver={e => e.currentTarget.style.color = "var(--accent)"}
                          onMouseOut={e => e.currentTarget.style.color = "var(--text-dim)"}
                        >
                          <ExternalIcon /> live
                        </a>
                      )}
                    </div>
                  </div>

                  <ul style={{ listStyle: "none", marginBottom: 22 }}>
                    {p.points.map((pt, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 6 }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Skills ── */}
          <section id="skills" className="section-divider">
            <p style={{ fontSize: 12, letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 10 }}>
              02 <span style={{ color: "var(--text-dim)" }}>/ skills</span>
            </p>
            <h2 style={{ fontSize: 24, fontWeight: 500, color: "var(--text)", marginBottom: 40 }}>Technical skills</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
              {SKILLS.map(({ group, icon, items }) => (
                <div key={group} className="card" style={{ padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 14 }}>{icon}</span>
                    {group}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {items.map(({ name, icon: ic }) => (
                      <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 13, color: "var(--accent)", width: 18, textAlign: "center", flexShrink: 0 }}>{ic}</span>
                        <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Contact ── */}
          <section id="contact" className="section-divider">
            <p style={{ fontSize: 12, letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 10 }}>
              03 <span style={{ color: "var(--text-dim)" }}>/ contact</span>
            </p>
            <h2 style={{ fontSize: 24, fontWeight: 500, color: "var(--text)", marginBottom: 14 }}>Get in touch</h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 540, marginBottom: 40 }}>
              I'm currently open to internships and collaboration. Reach out via email, connect on LinkedIn, or drop me a message below.
            </p>

            {/* Big contact box — two columns */}
            <div className="contact-box">

              {/* Left — links */}
              <div>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 22 }}>Find me on</p>
                {[
                  { icon: "✉", label: "maneharsh513@gmail.com", href: "mailto:maneharsh513@gmail.com" },
                  { icon: "in", label: "linkedin / harsh-mane", href: "https://linkedin.com/in/harsh-mane-206183280" },
                  { icon: "gh", label: "github / HarshM1010", href: "https://github.com/HarshM1010" },
                ].map((c) => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact-link">
                    <span style={{ fontSize: 13, color: "var(--accent)", width: 22, textAlign: "center", fontWeight: 600 }}>{c.icon}</span>
                    {c.label}
                  </a>
                ))}
              </div>

              {/* Right — form */}
              <div className="contact-divider">
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 22 }}>Send a message</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input className="form-input" type="text" placeholder="Your name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className="form-input" type="email" placeholder="Your email"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <textarea className="form-input" rows={4} placeholder="Your message..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  <div>
                    <button
                      onClick={handleSend}
                      disabled={!form.name || !form.email || !form.message}
                      style={{
                        fontFamily: "inherit", fontSize: 14, letterSpacing: "0.08em",
                        textTransform: "uppercase", padding: "12px 24px",
                        background: (!form.name || !form.email || !form.message) ? "rgba(59,130,246,0.12)" : "var(--accent)",
                        color: (!form.name || !form.email || !form.message) ? "var(--text-dim)" : "#fff",
                        border: "none", borderRadius: 5,
                        cursor: (!form.name || !form.email || !form.message) ? "default" : "pointer",
                      }}
                    >
                      Send message →
                    </button>
                    {sent && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#4ade80", marginTop: 14 }}>
                        <span>✓</span> Opening your mail client...
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ── Footer ── */}
          <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 14, color: "var(--text-dim)" }}>© 2025 Harsh Mane</span>
            <span style={{ fontSize: 14, color: "var(--text-dim)" }}>IIIT Bhubaneswar · B.Tech ECE</span>
          </footer>

        </main>
      </div>
    </>
  );
}