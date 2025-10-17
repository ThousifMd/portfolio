import React, { useState, useEffect, useRef } from 'react';

// Styles
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --black: #000000;
    --darkgrey: #1a1a1a;
    --grey: #404040;
    --midgrey: #808080;
    --lightgrey: #d4d4d4;
    --white: #ffffff;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: var(--white);
    background: var(--black);
    overflow-x: hidden;
  }

  @media (hover: hover) and (pointer: fine) {
    body, a, button {
      cursor: none;
    }
  }

  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--grey);
    z-index: 1000;
    padding: 1.5rem 0;
    transition: all 0.3s;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -1px;
    cursor: pointer;
  }

  .logo span {
    color: var(--midgrey);
    font-weight: 300;
  }

  .logo:hover {
    animation: glitch 0.3s ease;
  }

  @keyframes glitch {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
  }

  .nav-menu {
    list-style: none;
    display: flex;
    gap: 3rem;
  }

  .nav-link {
    text-decoration: none;
    color: var(--lightgrey);
    font-weight: 400;
    font-size: 0.95rem;
    transition: color 0.3s;
    letter-spacing: 0.5px;
  }

  .nav-link:hover {
    color: var(--white);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    gap: 6px;
    z-index: 1001;
  }

  .hamburger span {
    width: 28px;
    height: 2px;
    background: var(--white);
    transition: all 0.3s ease;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(9px, 9px);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(8px, -8px);
  }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--black);
    color: white;
    text-align: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, var(--darkgrey) 1px, transparent 1px),
      linear-gradient(var(--darkgrey) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.1;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: var(--white);
    border-radius: 50%;
    opacity: 0.3;
    animation: float 15s infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(100vh) scale(0);
      opacity: 0;
    }
    10% { opacity: 0.3; }
    90% { opacity: 0.3; }
    50% {
      transform: translateY(-10vh) scale(1);
      opacity: 0.5;
    }
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  .hero h1 {
    font-size: 5rem;
    margin-bottom: 1rem;
    font-weight: 800;
    letter-spacing: -3px;
    animation: fadeInUp 1s ease;
    position: relative;
    display: inline-block;
  }

  .hero h1::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--white);
    animation: lineExpand 1.5s ease 0.5s forwards;
  }

  @keyframes lineExpand {
    to { width: 100%; }
  }

  .hero .subtitle {
    font-size: 1.8rem;
    margin-bottom: 3rem;
    color: var(--lightgrey);
    font-weight: 300;
    letter-spacing: 1px;
    animation: fadeInUp 1s ease 0.2s backwards;
  }

  .cta {
    display: inline-flex;
    gap: 1.5rem;
    animation: fadeInUp 1s ease 0.4s backwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .btn {
    padding: 1rem 2.5rem;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;
    border: 2px solid var(--white);
    letter-spacing: 1px;
    font-size: 0.95rem;
    position: relative;
    overflow: hidden;
    background: transparent;
    color: var(--white);
    cursor: pointer;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn-primary {
    background: var(--white);
    color: var(--black);
  }

  .btn-primary:hover {
    background: var(--black);
    color: var(--white);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }

  .btn-outline:hover {
    background: var(--white);
    color: var(--black);
  }

  section {
    padding: 6rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-title {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 4rem;
    position: relative;
    font-weight: 700;
    letter-spacing: -1px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: var(--white);
    margin: 1.5rem auto;
    transform: scaleX(0);
    transition: transform 0.8s ease 0.3s;
  }

  .section-title.visible::after {
    transform: scaleX(1);
  }

  #about {
    background: var(--darkgrey);
  }

  .about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    font-size: 1.15rem;
    color: var(--lightgrey);
    line-height: 1.9;
  }

  .contact-info {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: var(--white);
    font-weight: 400;
    padding: 0.8rem 1.5rem;
    border: 1px solid var(--grey);
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .contact-item::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
  }

  .contact-item:hover::before {
    width: 300px;
    height: 300px;
  }

  .contact-item:hover {
    border-color: var(--white);
    background: var(--black);
    transform: scale(1.05);
  }

  #skills {
    background: var(--black);
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .skill-card {
    background: var(--darkgrey);
    padding: 2.5rem;
    border: 1px solid var(--grey);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    opacity: 0;
    transform: translateY(30px);
  }

  .skill-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .skill-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s;
  }

  .skill-card:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: var(--white);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
  }

  .skill-card:hover::before {
    opacity: 1;
  }

  .skill-card h3 {
    color: var(--white);
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  .skill-card ul {
    list-style: none;
  }

  .skill-card li {
    padding: 0.6rem 0;
    color: var(--lightgrey);
    position: relative;
    padding-left: 1.5rem;
    font-size: 0.95rem;
  }

  .skill-card li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--white);
    font-weight: bold;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  #experience {
    background: var(--darkgrey);
  }

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--grey);
  }

  .timeline-item {
    position: relative;
    padding-bottom: 4rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  .timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -2.5rem;
    top: 0;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--white);
    border: 3px solid var(--darkgrey);
    box-shadow: 0 0 0 3px var(--grey);
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% {
      box-shadow: 0 0 0 3px var(--grey);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.3);
    }
  }

  .timeline-content {
    background: var(--black);
    padding: 2rem;
    margin-left: 2rem;
    border-left: 2px solid var(--grey);
    transition: all 0.3s;
  }

  .timeline-content:hover {
    border-left-color: var(--white);
    transform: translateX(10px);
  }

  .timeline-content h3 {
    color: var(--white);
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .timeline-content .date {
    color: var(--midgrey);
    font-weight: 500;
    margin-bottom: 1.5rem;
    display: block;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  .timeline-content ul {
    margin-left: 1.5rem;
    color: var(--lightgrey);
  }

  .timeline-content li {
    margin: 0.8rem 0;
    font-size: 0.95rem;
    line-height: 1.7;
  }

  #projects {
    background: var(--black);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: var(--darkgrey);
    border: 1px solid var(--grey);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    opacity: 0;
    transform: translateY(30px);
  }

  .project-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent);
    transform: rotate(45deg);
    transition: all 0.6s;
  }

  .project-card:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: var(--white);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
  }

  .project-card:hover::after {
    animation: shine 1.5s;
  }

  @keyframes shine {
    0% { top: -50%; right: -50%; }
    100% { top: 150%; right: 150%; }
  }

  .project-header {
    background: var(--black);
    color: white;
    padding: 2.5rem;
    border-bottom: 2px solid var(--grey);
  }

  .project-header h3 {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
  }

  .project-tech {
    font-size: 0.9rem;
    color: var(--midgrey);
    letter-spacing: 0.5px;
  }

  .project-body {
    padding: 2rem;
  }

  .project-body ul {
    margin-left: 1.5rem;
    color: var(--lightgrey);
  }

  .project-body li {
    margin: 0.9rem 0;
    font-size: 0.95rem;
    line-height: 1.7;
  }

  #education {
    background: var(--darkgrey);
  }

  .education-content {
    max-width: 900px;
    margin: 0 auto;
  }

  .edu-card, .cert-card {
    background: var(--black);
    padding: 2.5rem;
    margin-bottom: 2rem;
    border-left: 3px solid var(--white);
    transition: all 0.3s;
    opacity: 0;
    transform: translateY(30px);
  }

  .edu-card.visible, .cert-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .edu-card:hover, .cert-card:hover {
    transform: translateX(10px);
  }

  .edu-card h3, .cert-card h3 {
    color: var(--white);
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
  }

  .edu-card .date, .cert-card .issuer {
    color: var(--midgrey);
    font-weight: 500;
    margin-bottom: 0.8rem;
    letter-spacing: 0.5px;
  }

  .edu-card p, .cert-card p {
    color: var(--lightgrey);
    line-height: 1.7;
  }

  .cert-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  footer {
    background: var(--black);
    color: var(--lightgrey);
    text-align: center;
    padding: 4rem 0;
    border-top: 1px solid var(--grey);
  }

  footer p {
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .social-links a {
    color: var(--lightgrey);
    text-decoration: none;
    font-size: 1.5rem;
    transition: all 0.3s;
    border: 2px solid var(--grey);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .social-links a:hover {
    color: var(--white);
    border-color: var(--white);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 3rem;
    }

    .hero .subtitle {
      font-size: 1.2rem;
    }

    .hamburger {
      display: flex;
    }

    .nav-menu {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: 70%;
      max-width: 300px;
      background: var(--darkgrey);
      border-left: 1px solid var(--grey);
      flex-direction: column;
      padding: 5rem 2rem 2rem;
      transition: right 0.3s ease;
      gap: 1rem;
    }

    .nav-menu.active {
      right: 0;
    }

    .nav-link {
      font-size: 1.2rem;
      padding: 1rem 0;
      display: block;
    }

    .skills-grid, .projects-grid {
      grid-template-columns: 1fr;
    }

    section {
      padding: 4rem 0;
    }

    .section-title {
      font-size: 2.5rem;
    }

    .particle {
      display: none;
    }

    .cta {
      flex-direction: column;
      width: 100%;
    }

    .btn {
      width: 100%;
      text-align: center;
    }
  }
`;

// Navigation Component
const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="nav" style={{
            background: scrolled ? 'rgba(0, 0, 0, 0.98)' : 'rgba(0, 0, 0, 0.95)',
            boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none'
        }}>
            <div className="nav-container">
                <div className="logo">THOUSIF<span>.DEV</span></div>
                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li><a className="nav-link" onClick={() => scrollToSection('about')}>ABOUT</a></li>
                    <li><a className="nav-link" onClick={() => scrollToSection('skills')}>SKILLS</a></li>
                    <li><a className="nav-link" onClick={() => scrollToSection('experience')}>EXPERIENCE</a></li>
                    <li><a className="nav-link" onClick={() => scrollToSection('projects')}>PROJECTS</a></li>
                    <li><a className="nav-link" onClick={() => scrollToSection('education')}>EDUCATION</a></li>
                </ul>
            </div>
        </nav>
    );
};

// Hero Component
const Hero = () => {
    const particles = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${(i + 1) * 10}%`,
        animationDelay: `${i * 2}s`,
        animationDuration: `${12 + i * 2}s`
    }));

    return (
        <section className="hero">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: particle.left,
                        animationDelay: particle.animationDelay,
                        animationDuration: particle.animationDuration
                    }}
                />
            ))}
            <div className="hero-content">
                <h1>MOHAMMAD THOUSIF</h1>
                <p className="subtitle">Turning Data into Actionable Insights</p>
                <div className="cta">
                    <a href="#about" className="btn btn-primary">EXPLORE WORK</a>
                    <a href="mailto:thousif.udayagiri@okstate.edu" className="btn btn-outline">GET IN TOUCH</a>
                </div>
            </div>
        </section>
    );
};

// About Component
const About = () => {
    const titleRef = useRef(null);
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsTitleVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => {
            if (titleRef.current) {
                observer.unobserve(titleRef.current);
            }
        };
    }, []);

    return (
        <section id="about">
            <div className="container">
                <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>ABOUT</h2>
                <div className="about-content">
                    <p>Data Analyst with nearly 3 years of experience in advanced SQL (complex joins, subqueries, window functions), Python (pandas, NumPy), ETL/ELT pipelines, and relational/dimensional data modeling. Expertise in Tableau/Power BI dashboards, translating business problems into KPIs, data profiling and validation, and cloud-based analytics (AWS Redshift, Snowflake).</p>

                    <div className="contact-info">
                        <div className="contact-item">
                            <span>📧</span>
                            <span>thousif.udayagiri@okstate.edu</span>
                        </div>
                        <div className="contact-item">
                            <span>📱</span>
                            <span>(405) 269-2515</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Intersection Observer Hook
const useIntersectionObserver = (ref, options = {}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15, ...options }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return isVisible;
};

// Skills Component
const Skills = () => {
    const titleRef = useRef(null);
    const isTitleVisible = useIntersectionObserver(titleRef);

    const skillsData = [
        {
            title: "SQL & Data Modeling",
            items: [
                "Advanced SQL (Joins, Subqueries, Window Functions, CTEs)",
                "dbt (Data Build Tool) Models",
                "Data Warehouse Design (Star/Snowflake Schema)",
                "Dimensional Modeling"
            ]
        },
        {
            title: "Programming & Analysis",
            items: [
                "Python (pandas, NumPy)",
                "Data Profiling & Statistical Analysis",
                "Data Validation & Cleaning",
                "ETL/ELT Pipeline Development"
            ]
        },
        {
            title: "Data Visualization",
            items: [
                "Tableau (Dashboard Development)",
                "Power BI (DAX, Custom Visuals)",
                "Data Storytelling",
                "Best Practices Implementation"
            ]
        },
        {
            title: "Cloud & Tools",
            items: [
                "AWS (S3, Glue, Redshift)",
                "Snowflake",
                "SQL Server",
                "Git/GitHub, Jira"
            ]
        },
        {
            title: "Business Skills",
            items: [
                "Stakeholder Communication",
                "Cross-Functional Collaboration",
                "KPI Development",
                "Agile Methodologies"
            ]
        }
    ];

    return (
        <section id="skills">
            <div className="container">
                <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>SKILLS</h2>
                <div className="skills-grid">
                    {skillsData.map((skill, index) => (
                        <SkillCard key={index} skill={skill} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const SkillCard = ({ skill, delay }) => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div
            ref={ref}
            className={`skill-card ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            <h3>{skill.title}</h3>
            <ul>
                {skill.items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

// Experience Component
const Experience = () => {
    const titleRef = useRef(null);
    const isTitleVisible = useIntersectionObserver(titleRef);

    const experiences = [
        {
            title: "Data Analyst",
            company: "OKLAHOMA STATE UNIVERSITY IT",
            date: "AUG 2024 – MAY 2025",
            achievements: [
                "Analyzed 10K+ HR and academic contract records using advanced SQL to identify compliance risks and workforce trends, enabling leadership to avoid $30K/year in potential fines",
                "Created data models in SQL Server, improving Tableau dashboard refresh rates by 40% and reducing decision-making time by 25%",
                "Collaborated with 5+ departments using Python data profiling, improving data accuracy to 99% and cutting workforce planning errors by 35%",
                "Designed Tableau dashboards tracking KPIs, reducing projected turnover costs by $50K/year"
            ]
        },
        {
            title: "Business Intelligence Intern",
            company: "INTERWORKS",
            date: "MAY 2024 – AUG 2024",
            achievements: [
                "Collaborated with BI consultants to enhance NHS England's population analytics dashboards in Tableau Cloud, improving accessibility and performance for over 5 billion health records",
                "Designed interactive, parameter-driven dashboards that allowed end users to analyze regional and demographic trends efficiently",
                "Authored end-user documentation and data reference guides to improve usability and adoption of analytics tools among non-technical audiences",
                "Supported data validation and quality assurance for published dashboards, ensuring consistency across data sources and visual layers"
            ]
        },
        {
            title: "Data Analyst",
            company: "COGNIZANT TECHNOLOGY SOLUTIONS",
            date: "OCT 2021 – JUN 2022",
            achievements: [
                "Analyzed 1TB+ weekly Salesforce IoT device data using complex SQL in AWS Redshift, driving 15% increase in device monetization",
                "Improved data quality by 25% using Python and AWS Glue, reducing dashboard query latency by 40%",
                "Delivered interactive Tableau dashboards capturing $200K in new revenue opportunities",
                "Monitored data accuracy in CloudWatch, preventing $100K in potential penalties"
            ]
        }
    ];

    return (
        <section id="experience">
            <div className="container">
                <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>EXPERIENCE</h2>
                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <TimelineItem key={index} experience={exp} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ experience, delay }) => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div
            ref={ref}
            className={`timeline-item ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            <div className="timeline-content">
                <h3>{experience.title}</h3>
                <span className="date">{experience.date} | {experience.company}</span>
                <ul>
                    {experience.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Projects Component
const Projects = () => {
    const titleRef = useRef(null);
    const isTitleVisible = useIntersectionObserver(titleRef);

    const projects = [
        {
            title: "Sales & Customer Performance Dashboard",
            tech: "POWER BI • TABLEAU • SQL SERVER",
            achievements: [
                "Designed interactive Tableau dashboards with sales trends and customer segmentation",
                "Built dimensional data model with star schema, improving dashboard performance by 40%",
                "Created calculated fields enabling users to explore KPIs like year-over-year growth"
            ]
        },
        {
            title: "Enterprise Data Warehouse",
            tech: "DBT • SQL • PYTHON • MEDALLION ARCHITECTURE",
            achievements: [
                "Built data warehouse following Medallion Architecture with dbt models",
                "Designed dimensional data models with star schema using advanced SQL",
                "Created data architecture diagrams and documented ETL flow using Git"
            ]
        }
    ];

    return (
        <section id="projects">
            <div className="container">
                <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>PROJECTS</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, delay }) => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div
            ref={ref}
            className={`project-card ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            <div className="project-header">
                <h3>{project.title}</h3>
                <p className="project-tech">{project.tech}</p>
            </div>
            <div className="project-body">
                <ul>
                    {project.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Education Component
const Education = () => {
    const titleRef = useRef(null);
    const isTitleVisible = useIntersectionObserver(titleRef);

    return (
        <section id="education">
            <div className="container">
                <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>EDUCATION</h2>
                <div className="education-content">
                    <EducationCard />
                    <h2 className="section-title visible" style={{ marginTop: '3rem' }}>CERTIFICATIONS</h2>
                    <div className="cert-list">
                        <CertCard title="Tableau Desktop Specialist" issuer="TABLEAU" />
                        <CertCard title="SQL (Advanced)" issuer="HACKERRANK" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const EducationCard = () => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div ref={ref} className={`edu-card ${isVisible ? 'visible' : ''}`}>
            <h3>Master of Science in Management Information Systems</h3>
            <p className="date">AUG 2023 – MAY 2025</p>
            <p>Oklahoma State University, Stillwater, Oklahoma</p>
            <p><strong>CGPA: 3.96</strong></p>
        </div>
    );
};

const CertCard = ({ title, issuer }) => {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div ref={ref} className={`cert-card ${isVisible ? 'visible' : ''}`}>
            <h3>{title}</h3>
            <p className="issuer">{issuer}</p>
        </div>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer>
            <div className="container">
                <p>&copy; 2025 Mohammad Thousif Udayagiri. All Rights Reserved.</p>
                <p>Crafted with precision. Built with passion.</p>
                <div className="social-links">
                    <a href="mailto:thousif.udayagiri@okstate.edu" title="Email">✉</a>
                    <a href="tel:+14052692515" title="Phone">☎</a>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
export default function App() {
    useEffect(() => {
        // Inject styles
        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);

        // Custom cursor (desktop only)
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            const cursorDot = document.createElement('div');
            cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.5;
        transition: transform 0.15s ease-out;
      `;
            document.body.appendChild(cursorDot);

            const cursorOutline = document.createElement('div');
            cursorOutline.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 1px solid white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.3;
        transition: all 0.2s ease-out;
      `;
            document.body.appendChild(cursorOutline);

            const handleMouseMove = (e) => {
                cursorDot.style.left = e.clientX - 4 + 'px';
                cursorDot.style.top = e.clientY - 4 + 'px';
                cursorOutline.style.left = e.clientX - 15 + 'px';
                cursorOutline.style.top = e.clientY - 15 + 'px';
            };

            document.addEventListener('mousemove', handleMouseMove);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.body.removeChild(cursorDot);
                document.body.removeChild(cursorOutline);
                document.head.removeChild(styleTag);
            };
        }

        return () => {
            document.head.removeChild(styleTag);
        };
    }, []);

    return (
        <div>
            <Navigation />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Footer />
        </div>
    );
}

