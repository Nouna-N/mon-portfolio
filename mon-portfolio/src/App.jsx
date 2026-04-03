import { useState, useEffect } from "react";
import photo from "./assets/photo.jpeg";
// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["À propos", "Compétences", "Expérience", "Projets", "Formation", "Contact"];

const SKILLS = [
  {
    icon: "◈",
    category: "IA & Data Science",
    color: "#6EE7B7",
    items: ["TensorFlow", "Machine Learning", "Deep Learning", "NLP", "FAISS", "Pandas", "Matplotlib", "Power BI"],
  },
  {
    icon: "◇",
    category: "Langages",
    color: "#93C5FD",
    items: ["Python", "Java", "Java EE", "PHP", "C"],
  },
  {
    icon: "◉",
    category: "Web & Mobile",
    color: "#F9A8D4",
    items: ["React.js", "React Native", "Node.js", "Express", "HTML/CSS", "JavaScript"],
  },
  {
    icon: "◎",
    category: "Bases de données",
    color: "#FCD34D",
    items: ["MySQL", "MongoDB", "JDBC"],
  },
  {
    icon: "⬡",
    category: "Big Data & DevOps",
    color: "#A78BFA",
    items: ["Hadoop", "MapReduce", "Spark", "Docker", "Git", "GitHub"],
  },
  {
    icon: "◐",
    category: "Langues",
    color: "#6EE7B7",
    items: ["Arabe — Natif", "Français — Courant", "Anglais — Intermédiaire"],
  },
];

const EXPERIENCES = [
  {
    date: "2026 — En cours",
    title: "Stagiaire — Système Décisionnel Intelligent",
    org: "OCP Groupe",
    location: "Maroc",
    desc: "Optimisation du pilotage industriel de la production d'acide phosphorique : Conception d'un système décisionnel intelligent sous Power BI intégrant des modèles prédictifs pour améliorer la performance et l'efficacité opérationnelle.",
    tags: ["Power BI", "Machine Learning", "Modèles Prédictifs", "Data Science", "Industrie"],
    current: true,
  },
  {
    date: "Août 2025",
    title: "Stage en Développement IA",
    org: "Nextronic ABA Technologie",
    location: "Maroc",
    desc: "Développement d'un modèle de détection d'objets par intelligence artificielle pour identifier automatiquement les plaques métalliques dans un environnement industriel.",
    tags: ["Computer Vision", "Deep Learning", "Python"],
  },
  {
    date: "Septembre 2024",
    title: "Recensement Général de la Population",
    org: "Haut-Commissariat au Plan",
    location: "Maroc",
    desc: "Collecte et saisie de données terrain lors d'une opération nationale. Développement de compétences en communication, rigueur analytique et travail d'équipe.",
    tags: ["Data Collection", "Terrain", "Travail d'équipe"],
  },
];

const PROJECTS = [
  {
    year: "2025",
    title: "Smart Glove — Langue des Signes",
    desc: "Système de reconnaissance gestuelle temps réel pour la langue des signes américaine (ASL). Gant connecté avec ESP32, capteurs flex et MPU6050, modèle Random Forest (>95% précision), API Flask et dashboard React avec synthèse vocale intégrée.",
    tech: ["Python", "Flask", "React", "Machine Learning", "ESP32", "IoT"],
    accent: "#6EE7B7",
    link: "https://github.com/SersifAbdeljalil/smart-glove-sign",
  },
  {
    year: "2024",
    title: "Réservation Salles & Emplois du Temps",
    desc: "Plateforme web complète de gestion des réservations de salles et génération d'emplois du temps par filière. Trois rôles : Admin, Professeur et Étudiant. Génération et impression d'emplois du temps, notifications de changement d'horaire, gestion des départements, filières et statistiques.",
    tech: ["React", "Node.js", "MySQL", "JavaScript", "CSS"],
    accent: "#93C5FD",
    link: "https://github.com/enimsay21/site_web_resevation_salle_emplois_de-_temps",
  },
  {
    year: "2025",
    title: "Chatbot de Recherche Scientifique",
    desc: "Chatbot intelligent facilitant la recherche d'articles scientifiques via NLP et indexation vectorielle FAISS. Interface conversationnelle avancée avec récupération sémantique.",
    tech: ["Python", "NLP", "FAISS", "Deep Learning"],
    accent: "#F9A8D4",
    link: "https://github.com/Nouna-N/chatbot",
  },
  {
    year: "2025",
    title: "App Mobile — Gestion des Livres",
    desc: "Application mobile complète d'inscription, emprunt et retour de livres. Backend RESTful sécurisé avec authentification JWT et base de données relationnelle.",
    tech: ["React Native", "Node.js", "Express", "MySQL", "JWT"],
    accent: "#FCD34D",
    link: "https://github.com/Nouna-N/BiblioClick",
  },
  {
    year: "2024",
    title: "Plateforme CHU El Jadida",
    desc: "Système de gestion hospitalière universitaire. Architecture MVC rigoureuse, patrons de conception avancés et interface de gestion des patients et des services.",
    tech: ["Java EE", "JDBC", "MySQL", "MVC"],
    accent: "#A78BFA",
    link: "https://github.com/Nouna-N/Application-CHU-JEE-JDBC-design-patterns",
  },
  {
    year: "2023",
    title: "LoadLifter — Bras Robotique",
    desc: "Conception et développement d'un bras robotisé autonome pour déplacer des objets vers un chariot. Intégration microprocesseurs et électronique embarquée.",
    tech: ["Microprocesseurs", "Électronique", "Robotique", "Embarqué"],
    accent: "#6EE7B7",
  },
];

const EDUCATION = [
  {
    period: "2024 — Présent",
    degree: "Master en Ingénierie Informatique & Analyse de Données",
    school: "Faculté des Sciences d'El Jadida",
    country: "Maroc",
  },
  {
    period: "2021 — 2024",
    degree: "Licence Fondamentale en Sciences Mathématiques et Informatiques",
    school: "Faculté des Sciences d'El Jadida",
    country: "Maroc",
  },
  {
    period: "2021",
    degree: "Baccalauréat en Sciences Physiques",
    school: "Lycée Omar Ibn Abd al-Aziz",
    country: "Khmiss des Zemamra, Maroc",
  },
];

const CERTS = [
  { name: "AWS Academy Cloud Foundations", issuer: "AWS Academy", year: "2026", link: "https://www.credly.com/go/PCOGMoYu" },
  { name: "Power BI", issuer: "365 DataScience", year: "2025" },
  { name: "Introduction to Python", issuer: "365 DataScience", year: "2025" },
];

// ── STYLES ────────────────────────────────────────────────────────────────────
const injectStyles = () => {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@300;400;500&family=Sora:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    :root {
      --bg: #060608;
      --bg1: #0c0c12;
      --bg2: #101018;
      --surface: #13131e;
      --surface2: #18182a;
      --border: #1f1f35;
      --border2: #2a2a45;
      --text: #ffffff;
      --muted: #d0d0e8;
      --dim: #5050a0;
      --green: #6EE7B7;
      --blue: #93C5FD;
      --pink: #F9A8D4;
      --yellow: #FCD34D;
      --purple: #A78BFA;
      --white: #ffffff;
    }

    body { background: var(--bg); color: var(--text); font-family: 'Sora', sans-serif; font-weight: 300; overflow-x: hidden; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--dim); border-radius: 2px; }

    /* NAV */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; justify-content: space-between; align-items: center;
      padding: 1.2rem 4rem;
      backdrop-filter: blur(24px) saturate(180%);
      background: rgba(6,6,8,0.75);
      border-bottom: 1px solid var(--border);
      transition: padding 0.3s;
    }
    .nav.scrolled { padding: 0.9rem 4rem; }
    .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-style: italic; color: var(--green); letter-spacing: 0.02em; }
    .nav-links { display: flex; gap: 0; list-style: none; }
    .nav-link-btn {
      background: none; border: none; cursor: pointer;
      font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
      color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase;
      padding: 0.5rem 1.2rem; transition: color 0.3s; position: relative;
    }
    .nav-link-btn::after { content: ''; position: absolute; bottom: 0; left: 50%; right: 50%; height: 1px; background: var(--green); transition: left 0.3s, right 0.3s; }
    .nav-link-btn:hover, .nav-link-btn.active { color: var(--text); }
    .nav-link-btn:hover::after, .nav-link-btn.active::after { left: 1.2rem; right: 1.2rem; }
    .nav-avail { display: flex; align-items: center; gap: 0.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--green); }
    .pulse { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulseAnim 2s ease-in-out infinite; }
    @keyframes pulseAnim { 0%,100%{box-shadow:0 0 0 0 rgba(110,231,183,0.4)} 50%{box-shadow:0 0 0 6px rgba(110,231,183,0)} }

    /* HERO */
    .hero {
      min-height: 100vh; display: flex; align-items: center;
      padding: 6rem 4rem 3rem; position: relative; overflow: hidden;
    }
    .hero-bg-orb {
      position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
    }
    .orb1 { width: 600px; height: 600px; background: rgba(110,231,183,0.07); top: -100px; right: -100px; }
    .orb2 { width: 400px; height: 400px; background: rgba(147,197,253,0.05); bottom: -50px; left: 10%; }
    .hero-grid {
      position: absolute; inset: 0;
      background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 80px 80px; opacity: 0.2;
      mask-image: radial-gradient(ellipse at 60% 50%, black 20%, transparent 70%);
    }
    .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 420px; gap: 6rem; align-items: center; position: relative; z-index: 1; }
    .hero-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--green); letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
    .hero-eyebrow::before { content: ''; width: 2.5rem; height: 1px; background: var(--green); }
    .hero-name { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 5.5vw, 6rem); font-weight: 400; line-height: 1.0; margin-bottom: 0.5rem; }
    .hero-name-italic { font-style: italic; color: var(--green); }
    .hero-role { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: var(--muted); margin: 1.5rem 0 1rem; letter-spacing: 0.05em; }
    .hero-role span { color: var(--blue); }
    .hero-bio { font-size: 0.95rem; color: var(--muted); line-height: 1.85; max-width: 480px; margin-bottom: 2.5rem; }
    .hero-actions { display: flex; gap: 1rem; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 0.6rem;
      padding: 0.9rem 2rem; background: var(--green); color: #050a08;
      border: none; border-radius: 6px; cursor: pointer;
      font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500;
      transition: all 0.3s; text-decoration: none;
    }
    .btn-primary:hover { background: #34d399; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(110,231,183,0.25); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 0.6rem;
      padding: 0.9rem 2rem; background: transparent; color: var(--text);
      border: 1px solid var(--border2); border-radius: 6px; cursor: pointer;
      font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
      transition: all 0.3s; text-decoration: none;
    }
    .btn-ghost:hover { border-color: var(--green); color: var(--green); transform: translateY(-3px); }

    /* HERO CARD */
    .profile-card {
      background: var(--surface); border: 1px solid var(--border2); border-radius: 20px;
      padding: 2.5rem; position: relative; overflow: hidden;
      animation: floatCard 6s ease-in-out infinite;
    }
    @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    .profile-card::before {
      content: ''; position: absolute; top: 0; left: 20%; right: 20%; height: 1px;
      background: linear-gradient(90deg, transparent, var(--green), transparent);
    }
    .profile-avatar {
      width: 72px; height: 72px; border-radius: 16px;
      background: linear-gradient(135deg, #1a2e24, #0c1f18);
      border: 1px solid rgba(110,231,183,0.2);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif; font-size: 1.8rem; font-style: italic;
      color: var(--green); margin-bottom: 1.2rem;
    }
    .profile-name { font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 0.2rem; }
    .profile-title { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1.5rem; }
    .profile-divider { height: 1px; background: var(--border); margin: 1.2rem 0; }
    .profile-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; margin-bottom: 1.5rem; }
    .pstat { text-align: center; }
    .pstat-val { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--green); display: block; line-height: 1; }
    .pstat-lbl { font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }
    .profile-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .chip { padding: 0.3rem 0.75rem; background: rgba(110,231,183,0.06); border: 1px solid rgba(110,231,183,0.15); border-radius: 20px; font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--green); letter-spacing: 0.05em; }

    /* SECTION BASE */
    .section { padding: 3rem 4rem; }
    .section-inner { max-width: 1200px; margin: 0 auto; }
    .section-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--green); letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem; }
    .section-eyebrow::before { content: ''; width: 1.5rem; height: 1px; background: var(--green); }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem,3.5vw,3rem); font-weight: 400; line-height: 1.1; margin-bottom: 2rem; }
    .section-title em { font-style: italic; color: var(--green); }
    .alt-bg { background: var(--bg1); }

    /* ABOUT */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
    .about-text { font-size: 0.95rem; color: var(--muted); line-height: 1.9; }
    .about-text p { margin-bottom: 1.2rem; }
    .about-text strong { color: var(--text); }
    .about-values { display: grid; gap: 1rem; }
    .value-item { background: var(--surface); border: 1px solid var(--border); border-left: 2px solid var(--green); border-radius: 8px; padding: 1.2rem 1.5rem; transition: border-color 0.3s, transform 0.3s; }
    .value-item:hover { border-color: var(--green); transform: translateX(6px); }
    .value-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--green); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.3rem; }
    .value-desc { font-size: 0.85rem; color: var(--muted); }

    /* SKILLS */
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
    .skill-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
      padding: 1.8rem; transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
      position: relative; overflow: hidden; cursor: default;
    }
    .skill-card:hover { transform: translateY(-6px); }
    .skill-card-glow { position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; border-radius: 50%; filter: blur(40px); opacity: 0.15; transition: opacity 0.3s; }
    .skill-card:hover .skill-card-glow { opacity: 0.3; }
    .skill-icon-wrap { font-size: 1.2rem; margin-bottom: 1rem; font-family: monospace; }
    .skill-cat { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.1rem; }
    .skill-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .skill-pill { padding: 0.3rem 0.7rem; background: var(--bg); border: 1px solid var(--border2); border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: #ffffff; letter-spacing: 0.04em; transition: border-color 0.2s; }
    .skill-card:hover .skill-pill { border-color: var(--dim); }

    /* EXPERIENCE TIMELINE */
    .timeline { position: relative; padding-left: 2.5rem; }
    .timeline::before { content: ''; position: absolute; left: 0; top: 12px; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--green), transparent); }
    .tl-item { position: relative; padding-bottom: 3.5rem; }
    .tl-dot { position: absolute; left: -2.5rem; top: 10px; width: 11px; height: 11px; border-radius: 50%; background: var(--bg); border: 2px solid var(--green); box-shadow: 0 0 14px rgba(110,231,183,0.5); }
    .tl-date { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--green); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.8rem; }
    .tl-current-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.2rem 0.7rem; background: rgba(110,231,183,0.12); border: 1px solid rgba(110,231,183,0.35); border-radius: 20px; font-size: 0.58rem; color: var(--green); letter-spacing: 0.08em; }
    .tl-current-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--green); animation: pulseAnim 1.5s ease-in-out infinite; }
    .tl-header { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 0.3rem; flex-wrap: wrap; }
    .tl-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; }
    .tl-org { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--muted); letter-spacing: 0.1em; }
    .tl-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.8; margin-bottom: 1rem; max-width: 620px; }
    .tl-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .tl-tag { padding: 0.25rem 0.75rem; background: rgba(110,231,183,0.06); border: 1px solid rgba(110,231,183,0.2); border-radius: 20px; font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--green); }

    /* PROJECTS */
    .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .project-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
      padding: 2rem; position: relative; overflow: hidden;
      transition: transform 0.4s cubic-bezier(.22,.68,0,1.2), border-color 0.3s, box-shadow 0.3s;
      cursor: default;
    }
    .project-card:hover { transform: translateY(-8px) scale(1.01); }
    .project-card-top { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.2rem; }
    .project-emoji { font-size: 2rem; }
    .project-year-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--muted); letter-spacing: 0.1em; padding: 0.25rem 0.6rem; background: var(--bg); border: 1px solid var(--border2); border-radius: 4px; }
    .project-title { font-family: 'Playfair Display', serif; font-size: 1.35rem; margin-bottom: 0.8rem; }
    .project-desc { font-size: 0.88rem; color: var(--muted); line-height: 1.78; margin-bottom: 1.3rem; }
    .project-footer { display: flex; justify-content: space-between; align-items: end; }
    .project-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .project-tech-tag { padding: 0.2rem 0.6rem; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-size: 0.56rem; letter-spacing: 0.06em; }
    .project-accent-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(.22,.68,0,1.2); }
    .project-card:hover .project-accent-bar { transform: scaleX(1); }

    /* EDUCATION */
    .edu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-bottom: 3rem; }
    .edu-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 2rem; position: relative; overflow: hidden; transition: transform 0.3s; }
    .edu-card:hover { transform: translateY(-4px); }
    .edu-bar { position: absolute; top: 0; left: 0; bottom: 0; width: 3px; border-radius: 3px 0 0 3px; }
    .edu-year { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--green); letter-spacing: 0.12em; margin-bottom: 0.8rem; }
    .edu-degree { font-family: 'Playfair Display', serif; font-size: 1.1rem; line-height: 1.35; margin-bottom: 0.6rem; }
    .edu-school { font-size: 0.82rem; color: var(--muted); }
    .certs-row { display: flex; gap: 1rem; flex-wrap: wrap; }
    .cert-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 1.2rem 1.8rem; display: flex; align-items: center; gap: 1rem; transition: border-color 0.3s, transform 0.3s; }
    .cert-card:hover { border-color: var(--yellow); transform: translateY(-3px); }
    .cert-icon { font-size: 1.5rem; }
    .cert-name { font-size: 0.92rem; font-weight: 500; margin-bottom: 0.15rem; }
    .cert-issuer { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--muted); letter-spacing: 0.08em; }

    /* CONTACT */
    .contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
    .contact-info h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 0.8rem; }
    .contact-info p { font-size: 0.9rem; color: var(--muted); line-height: 1.8; margin-bottom: 2rem; }
    .contact-links-list { display: flex; flex-direction: column; gap: 0.8rem; }
    .contact-link-item { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.2rem; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; text-decoration: none; color: #ffffff; transition: border-color 0.3s, transform 0.3s; }
    .contact-link-item:hover { border-color: var(--green); transform: translateX(6px); }
    .contact-link-icon { font-size: 1rem; width: 2rem; text-align: center; }
    .contact-link-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }
    .contact-link-value { font-size: 0.85rem; color: #ffffff; }

    /* CONTACT FORM */
    .contact-form { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 2.5rem; position: relative; overflow: hidden; }
    .contact-form::before { content: ''; position: absolute; top: 0; left: 20%; right: 20%; height: 1px; background: linear-gradient(90deg, transparent, var(--green), transparent); }
    .form-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 0.3rem; }
    .form-subtitle { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--muted); letter-spacing: 0.1em; margin-bottom: 2rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1.2rem; }
    .form-label { display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.5rem; }
    .form-input, .form-textarea, .form-select {
      width: 100%; background: var(--bg1); border: 1px solid var(--border2); border-radius: 8px;
      padding: 0.85rem 1rem; color: #ffffff; font-family: 'Sora', sans-serif; font-size: 0.88rem; font-weight: 300;
      transition: border-color 0.3s, box-shadow 0.3s; outline: none; appearance: none;
    }
    .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(110,231,183,0.1); }
    .form-input::placeholder, .form-textarea::placeholder { color: var(--dim); }
    .form-textarea { resize: vertical; min-height: 120px; }
    .form-select option { background: var(--bg1); }
    .form-submit {
      width: 100%; padding: 1rem; background: var(--green); color: #050a08;
      border: none; border-radius: 8px; cursor: pointer;
      font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500;
      transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.6rem;
    }
    .form-submit:hover:not(:disabled) { background: #34d399; box-shadow: 0 8px 32px rgba(110,231,183,0.25); transform: translateY(-2px); }
    .form-submit:disabled { opacity: 0.6; }
    .form-success { text-align: center; padding: 2rem; }
    .form-success-icon { font-size: 3rem; margin-bottom: 1rem; }
    .form-success-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--green); }
    .form-success-text { font-size: 0.85rem; color: var(--muted); }
    .form-error-msg { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: #f87171; margin-top: 0.3rem; }

    /* FOOTER */
    .footer { border-top: 1px solid var(--border); padding: 2rem 4rem; display: flex; justify-content: space-between; align-items: center; }
    .footer-logo { font-family: 'Playfair Display', serif; font-style: italic; color: var(--green); }
    .footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--muted); letter-spacing: 0.1em; }
    .footer-links { display: flex; gap: 1.5rem; }
    .footer-link { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--muted); text-decoration: none; letter-spacing: 0.1em; transition: color 0.3s; }
    .footer-link:hover { color: var(--green); }

    /* ANIMATIONS */
    @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
    .fade-up-2 { animation-delay: 0.22s; opacity: 0; }
    .fade-up-3 { animation-delay: 0.36s; opacity: 0; }
    .fade-up-4 { animation-delay: 0.52s; opacity: 0; }
    .fade-up-5 { animation-delay: 0.65s; opacity: 0; }

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      .hero-inner { grid-template-columns: 1fr; }
      .profile-card { display: none; }
      .skills-grid { grid-template-columns: repeat(2,1fr); }
      .projects-grid { grid-template-columns: 1fr; }
      .edu-grid { grid-template-columns: 1fr; }
      .about-grid { grid-template-columns: 1fr; }
      .contact-layout { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .nav { padding: 1rem 1.5rem; }
      .nav-links { display: none; }
      .hero { padding: 7rem 1.5rem 3rem; }
      .section { padding: 4rem 1.5rem; }
      .skills-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .footer { flex-direction: column; gap: 1rem; padding: 1.5rem; text-align: center; }
    }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};

// ── COMPONENTS ─────────────────────────────────────────────────────────────────

function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const ids = ["about", "skills", "experience", "projects", "education", "contact"];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">Nouhaila Chahmi</div>
      <ul className="nav-links">
        {NAV_LINKS.map((label, i) => (
          <li key={label}>
            <button className={`nav-link-btn ${activeSection === ids[i] ? "active" : ""}`} onClick={() => scrollTo(ids[i])}>
              {label}
            </button>
          </li>
        ))}
      </ul>
      <div className="nav-avail">
        <div className="pulse" />
        Stagiaire OCP Groupe
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-bg-orb orb1" />
      <div className="hero-bg-orb orb2" />
      <div className="hero-grid" />
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow fade-up fade-up-1">Stagiaire OCP Groupe · El Jadida, Maroc</div>
          <h1 className="hero-name fade-up fade-up-2">
            <span className="hero-name-italic">Nouhaila</span><br />Chahmi
          </h1>
          <p className="hero-role fade-up fade-up-3">
            Master en <span>Ingénierie Informatique</span> & <span>Analyse de Données</span>
          </p>
          <p className="hero-bio fade-up fade-up-4">
            Actuellement stagiaire chez <strong style={{color:"var(--green)"}}>OCP Groupe</strong>, je travaille sur l'optimisation du pilotage industriel de la production d'acide phosphorique via un système décisionnel intelligent sous Power BI intégrant des modèles prédictifs. Passionnée par l'IA, la data science et le développement d'applications.
          </p>
          <div className="hero-actions fade-up fade-up-5">
            <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              ✉ Me contacter
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>
              ↓ Mon expérience OCP
            </button>
          </div>
        </div>
        <div>
          <div className="profile-card">
            <div className="profile-avatar">
               <img src={photo} alt="Nouhaila Chahmi" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px" }} />
            </div>
            <div className="profile-name">Nouhaila Chahmi</div>
            <div className="profile-title">ML · Data Science · Web Dev</div>
            <div className="profile-divider" />
            <div className="profile-stats">
              <div className="pstat"><span className="pstat-val">6</span><span className="pstat-lbl">Projets</span></div>
              <div className="pstat"><span className="pstat-val">3</span><span className="pstat-lbl">Stages</span></div>
              <div className="pstat"><span className="pstat-val">3</span><span className="pstat-lbl">Langues</span></div>
            </div>
            <div className="profile-divider" />
            <div className="profile-chips">
              {["OCP Groupe", "Power BI", "Python", "TensorFlow", "React", "NLP"].map(t => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section alt-bg" id="skills">
      <div className="section-inner">
        <div className="section-eyebrow">Expertise</div>
        <h2 className="section-title">Compétences <em>techniques</em></h2>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div className="skill-card" key={s.category} style={{ ["--hover-border"]: s.color }}>
              <div className="skill-card-glow" style={{ background: s.color }} />
              <div className="skill-cat" style={{ color: s.color }}>{s.category}</div>
              <div className="skill-pills">
                {s.items.map(item => <span className="skill-pill" key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-inner">
        <div className="section-eyebrow">Parcours</div>
        <h2 className="section-title">Expériences <em>professionnelles</em></h2>
        <div className="timeline">
          {EXPERIENCES.map((e) => (
            <div className="tl-item" key={e.title}>
              <div className="tl-dot" style={e.current ? { background: "var(--green)", boxShadow: "0 0 20px rgba(110,231,183,0.7)" } : {}} />
              <div className="tl-date">
                {e.date}
                {e.current && <span className="tl-current-badge">En cours</span>}
              </div>
              <div className="tl-header">
                <div className="tl-title" style={e.current ? { color: "#ffffff" } : {}}>{e.title}</div>
                <div className="tl-org" style={e.current ? { color: "var(--green)" } : {}}>{e.org} — {e.location}</div>
              </div>
              <div className="tl-desc">{e.desc}</div>
              <div className="tl-tags">
                {e.tags.map(t => <span className="tl-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section alt-bg" id="projects">
      <div className="section-inner">
        <div className="section-eyebrow">Réalisations</div>
        <h2 className="section-title">Projets <em>sélectionnés</em></h2>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div className="project-card" key={p.title} style={{ "--acc": p.accent }}>
              <div className="project-card-top">
                <div className="project-year-badge">{p.year}</div>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="project-gh-link" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: p.accent, textDecoration: "none", border: `1px solid ${p.accent}40`, borderRadius: "4px", padding: "0.2rem 0.6rem", transition: "all 0.2s" }}>↗ GitHub</a>}
              </div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-footer">
                <div className="project-tech">
                  {p.tech.map(t => (
                    <span className="project-tech-tag" key={t} style={{ background: p.accent + "15", border: `1px solid ${p.accent}30`, color: p.accent }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-accent-bar" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section" id="education">
      <div className="section-inner">
        <div className="section-eyebrow">Formation</div>
        <h2 className="section-title">Parcours <em>académique</em></h2>
        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <div className="edu-card" key={e.degree}>
              <div className="edu-bar" style={{ background: i === 0 ? "var(--green)" : i === 1 ? "var(--blue)" : "var(--purple)" }} />
              <div className="edu-year">{e.period}</div>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-school">{e.school} — {e.country}</div>
            </div>
          ))}
        </div>
        <div className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>Certifications</div>
        <div className="certs-row">
          {CERTS.map(c => (
            <div className="cert-card" key={c.name} style={c.link ? { cursor: "pointer" } : {}}>
              {c.link ? (
                <a href={c.link} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit", display: "contents" }}>
                  <div>
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-issuer">{c.issuer} · {c.year}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "var(--green)", marginTop: "0.3rem", letterSpacing: "0.1em" }}>↗ Voir le badge</div>
                  </div>
                </a>
              ) : (
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">{c.issuer} · {c.year}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Votre nom est requis.";
    if (!form.email.trim()) e.email = "Votre email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Format d'email invalide.";
    if (!form.subject) e.subject = "Veuillez choisir un sujet.";
    if (!form.message.trim() || form.message.length < 20) e.message = "Le message doit contenir au moins 20 caractères.";
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(err => ({ ...err, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("sending");

    try {
      const response = await fetch("https://portfolio-backend-nouhaila.vercel.app/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-form">
        <div className="form-success">
          <div className="form-success-icon" style={{fontFamily:"'Playfair Display',serif", fontSize:"3rem", color:"var(--green)"}}>✓</div>
          <div className="form-success-title">Message envoyé !</div>
          <div className="form-success-text">Votre message a bien été reçu. Je vous répondrai dans les 24–48h.</div>
          <button className="btn-ghost" style={{ marginTop: "1.5rem", cursor: "pointer", border: "1px solid var(--border2)", borderRadius: "8px", padding: "0.8rem 1.5rem" }} onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}>
            Nouveau message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <div className="form-title">Envoyer un message</div>
      <div className="form-subtitle">RÉPONSE SOUS 24–48H · TOUJOURS OUVERTE AUX OPPORTUNITÉS</div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Votre nom *</label>
          <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Jean Dupont" />
          {errors.name && <div className="form-error-msg">⚠ {errors.name}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Votre email *</label>
          <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jean@entreprise.com" />
          {errors.email && <div className="form-error-msg">⚠ {errors.email}</div>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Sujet *</label>
        <select className="form-select" name="subject" value={form.subject} onChange={handleChange}>
          <option value="">Choisissez un sujet...</option>
          <option value="Proposition de stage">Proposition de stage</option>
          <option value="Offre d'emploi">Offre d'emploi</option>
          <option value="Collaboration sur un projet">Collaboration sur un projet</option>
          <option value="Question technique">Question technique</option>
          <option value="Autre">Autre</option>
        </select>
        {errors.subject && <div className="form-error-msg">⚠ {errors.subject}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Message *</label>
        <textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Décrivez votre projet, opportunité ou question..." />
        {errors.message && <div className="form-error-msg">⚠ {errors.message}</div>}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "var(--dim)", marginTop: "0.3rem", textAlign: "right" }}>
          {form.message.length} caractères
        </div>
      </div>

      <button className="form-submit" onClick={handleSubmit} disabled={status === "sending"}>
        {status === "sending" ? "⏳ Envoi en cours..." : "↗ Envoyer le message"}
      </button>
      {status === "error" && (
        <div className="form-error-msg" style={{ marginTop: "0.8rem", textAlign: "center", fontSize: "0.7rem" }}>
          ⚠ Erreur d'envoi. Réessayez ou écrivez directement à chahminouhaila4@gmail.com
        </div>
      )}
    </div>
  );
}

function Contact() {
  return (
    <section className="section alt-bg" id="contact">
      <div className="section-inner">
        <div className="section-eyebrow">Contact</div>
        <h2 className="section-title">Travaillons <em>ensemble</em></h2>
        <div className="contact-layout">
          <div className="contact-info">
            <h3>Prête pour de nouveaux défis</h3>
            <p>
              Actuellement stagiaire chez OCP Groupe, je travaille sur un système décisionnel intelligent intégrant Power BI et des modèles prédictifs pour optimiser la production industrielle. Ouverte à toute opportunité de collaboration ou d'échange.
            </p>
            <div className="contact-links-list">
              <a href="mailto:chahminouhaila4@gmail.com" className="contact-link-item">
                <span className="contact-link-icon" style={{color:"#ffffff"}}>@</span>
                <div>
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-value">chahminouhaila4@gmail.com</div>
                </div>
              </a>
              <a href="tel:+212609305021" className="contact-link-item">
                <span className="contact-link-icon" style={{color:"#ffffff", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem"}}>TEL</span>
                <div>
                  <div className="contact-link-label">Téléphone</div>
                  <div className="contact-link-value">+212 609 305 021</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/nouhaila-chahmi-485542351" target="_blank" rel="noreferrer" className="contact-link-item">
                <span className="contact-link-icon" style={{color:"#ffffff", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem", fontWeight:"500"}}>in</span>
                <div>
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-value">nouhaila-chahmi-485542351</div>
                </div>
              </a>
              <a href="https://github.com/Nouna-N" target="_blank" rel="noreferrer" className="contact-link-item">
                <span className="contact-link-icon" style={{color:"#ffffff", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem"}}>gh</span>
                <div>
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-value">Nouna-N</div>
                </div>
              </a>
              <div className="contact-link-item">
                <span className="contact-link-icon" style={{color:"#ffffff", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem"}}>loc</span>
                <div>
                  <div className="contact-link-label">Localisation</div>
                  <div className="contact-link-value">El Jadida, Maroc</div>
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">Nouhaila Chahmi</div>
      <div className="footer-copy">© 2026 · Tous droits réservés</div>
      <div className="footer-links">
        <a href="https://github.com/Nouna-N" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
        <a href="https://www.linkedin.com/in/nouhaila-chahmi-485542351" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
        <a href="mailto:chahminouhaila4@gmail.com" className="footer-link">Email</a>
      </div>
    </footer>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    injectStyles();
    const ids = ["about", "skills", "experience", "projects", "education", "contact"];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { threshold: 0.4 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav activeSection={activeSection} />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}