import React, { useState, useEffect, useRef } from 'react';

// Styles - Updated for navigation visibility fix
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

  [data-theme="light"] {
    --black: #ffffff;
    --darkgrey: #f8f9fa;
    --grey: #dee2e6;
    --midgrey: #6c757d;
    --lightgrey: #343a40;
    --white: #000000;
  }

  [data-theme="light"] .nav {
    background: rgba(0, 0, 0, 0.95);
    border-bottom: 1px solid #404040;
  }

  [data-theme="light"] .nav-link {
    color: #ffffff !important;
  }

  [data-theme="light"] .nav-link:hover {
    color: #ffffff !important;
    background: rgba(255, 255, 255, 0.15);
  }

  [data-theme="light"] .logo {
    color: #ffffff !important;
  }

  [data-theme="light"] .logo span {
    color: #888888 !important;
    opacity: 1;
  }

  [data-theme="light"] .hero h1 {
    color: #000000;
  }

  [data-theme="light"] .hero .subtitle {
    color: #343a40;
  }

  [data-theme="light"] .section-title {
    color: #000000;
  }

  [data-theme="light"] .section-title::after {
    background: #000000;
  }

  [data-theme="light"] .about-content {
    color: #343a40;
  }

  [data-theme="light"] .project-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border: 1px solid #dee2e6;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  [data-theme="light"] .project-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-bottom: 2px solid #dee2e6;
  }

  [data-theme="light"] .project-header h3 {
    background: linear-gradient(135deg, #000000 0%, #343a40 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  [data-theme="light"] .project-tech {
    color: #6c757d;
  }

  [data-theme="light"] .project-body {
    background: rgba(248, 249, 250, 0.5);
  }

  [data-theme="light"] .project-body ul {
    color: #343a40;
  }

  [data-theme="light"] .project-body li::before {
    color: #000000;
  }

  [data-theme="light"] .skill-card {
    background: #ffffff;
    border: 1px solid #dee2e6;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  [data-theme="light"] .skill-card h3 {
    color: #000000;
  }

  [data-theme="light"] .skill-card li {
    color: #343a40;
  }

  [data-theme="light"] .skill-card li::before {
    color: #000000;
  }

  [data-theme="light"] .contact-item {
    background: rgba(248, 249, 250, 0.8);
    border: 1px solid #dee2e6;
    color: #000000;
  }

  [data-theme="light"] .contact-item:hover {
    border-color: #000000;
    background: rgba(0, 0, 0, 0.05);
  }

  [data-theme="light"] .timeline-content {
    background: #ffffff;
    border-left: 2px solid #dee2e6;
  }

  [data-theme="light"] .timeline-content h3 {
    color: #000000;
  }

  [data-theme="light"] .timeline-content .date {
    color: #6c757d;
  }

  [data-theme="light"] .timeline-content ul {
    color: #343a40;
  }

  [data-theme="light"] .edu-card, 
  [data-theme="light"] .cert-card {
    background: #ffffff;
    border-left: 3px solid #000000;
  }

  [data-theme="light"] .edu-card h3, 
  [data-theme="light"] .cert-card h3 {
    color: #000000;
  }

  [data-theme="light"] .edu-card .date, 
  [data-theme="light"] .cert-card .issuer {
    color: #6c757d;
  }

  [data-theme="light"] .edu-card p, 
  [data-theme="light"] .cert-card p {
    color: #343a40;
  }

  [data-theme="light"] footer {
    background: #ffffff;
    color: #343a40;
    border-top: 1px solid #dee2e6;
  }

  [data-theme="light"] .social-links a {
    color: #343a40;
    border: 2px solid #dee2e6;
  }

  [data-theme="light"] .social-links a:hover {
    color: #000000;
    border-color: #000000;
  }

  [data-theme="light"] .theme-toggle {
    border: 1px solid #dee2e6;
    background: rgba(0, 0, 0, 0.05);
  }

  [data-theme="light"] .theme-toggle:hover {
    border-color: #000000;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  [data-theme="light"] .theme-icon {
    color: #000000 !important;
  }

  [data-theme="light"] .theme-toggle:hover .theme-icon {
    color: #000000 !important;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: var(--white);
    background: var(--black);
    overflow-x: hidden;
    transition: all 0.3s ease;
  }



  /* FORCE WHITE TEXT - SIMPLE */
  .nav * {
    color: white !important;
  }

  /* KEEP WHITE TEXT IN LIGHT THEME TOO */
  [data-theme="light"] .nav * {
    color: white !important;
  }
  
  /* SPECIFICALLY FORCE LOGO SPAN TO BE GREY IN LIGHT THEME */
  [data-theme="light"] .logo span {
    color: #888888 !important;
    opacity: 1 !important;
    font-size: 1.2rem !important;
    font-style: italic !important;
  }

  /* Restore mouse pointer */
  body, a, button {
    cursor: auto !important;
  }

  /* Mobile touch optimizations */
  @media (hover: none) and (pointer: coarse) {
    .btn, .nav-link, .theme-toggle, .hamburger {
      min-height: 44px;
      min-width: 44px;
    }
    
    .project-card:hover {
      transform: none;
    }
    
    .skill-card:hover {
      transform: none;
    }
  }

  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #404040;
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
    letter-spacing: -1px;
    cursor: pointer;
  }

  .logo span {
    font-weight: 300;
    opacity: 1;
    color: #888888;
    font-size: 1.2rem;
    font-style: italic;
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
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
    color: white !important;
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

  .theme-toggle {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 1001;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--grey);
    border-radius: 50px;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    backdrop-filter: blur(10px);
  }

  .theme-toggle:hover {
    border-color: var(--white);
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .theme-icon {
    font-size: 1.3rem;
    transition: all 0.3s ease;
    color: #ffffff !important;
  }

  .theme-toggle:hover .theme-icon {
    color: #ffffff !important;
    transform: rotate(180deg);
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
    background: var(--dark-light);
    padding: 2rem;
    border: 1px solid rgba(100, 116, 139, 0.2);
    border-radius: 16px;
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
    transform: translateY(-10px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
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
    color: var(--gray-light);
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
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 0;
  }

  .project-card {
    background: linear-gradient(145deg, var(--darkgrey) 0%, #2a2a2a 100%);
    border: 1px solid var(--grey);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    opacity: 0;
    transform: translateY(30px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
  }

  .project-card:hover::after {
    animation: shine 1.5s;
  }

  @keyframes shine {
    0% { top: -50%; right: -50%; }
    100% { top: 150%; right: 150%; }
  }

  .project-header {
    background: linear-gradient(135deg, var(--black) 0%, #1a1a1a 100%);
    color: white;
    padding: 1.8rem;
    border-bottom: 2px solid var(--grey);
    position: relative;
  }

  .project-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    background-size: 300% 100%;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .project-header {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .project-icon {
    font-size: 2.2rem;
    opacity: 0.9;
    flex-shrink: 0;
  }

  .project-header h3 {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    flex: 1;
  }

  .project-tech {
    font-size: 0.9rem;
    color: var(--midgrey);
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .project-body {
    padding: 1.8rem;
    background: rgba(0, 0, 0, 0.2);
  }

  .project-body ul {
    margin-left: 1.2rem;
    color: var(--lightgrey);
    list-style: none;
    padding-left: 0;
  }

  .project-body li {
    margin: 1rem 0;
    font-size: 1rem;
    line-height: 1.6;
    position: relative;
    padding-left: 1.2rem;
    font-weight: 400;
  }

  .project-body li::before {
    content: '●';
    position: absolute;
    left: -1.2rem;
    color: var(--white);
    font-size: 1rem;
    opacity: 0.8;
    font-weight: bold;
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
    /* Mobile Navigation */
    .nav {
      padding: 1rem 0;
    }

    .nav-container {
      padding: 0 1rem;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      height: 100%;
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
      z-index: 1001;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .hamburger span {
      width: 25px;
      height: 3px;
      background: white;
      transition: all 0.3s ease;
    }

    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }

    .nav-menu {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: 80%;
      max-width: 320px;
      background: rgba(0, 0, 0, 0.98);
      backdrop-filter: blur(20px);
      border-left: 1px solid var(--grey);
      flex-direction: column;
      padding: 6rem 2rem 2rem;
      transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      gap: 0.5rem;
      z-index: 1000;
    }

    .nav-menu.active {
      right: 0;
    }

    .nav-link {
      font-size: 1.3rem;
      padding: 1.2rem 0;
      display: block;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      padding-left: 1rem;
    }

    .theme-toggle-menu-item {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      margin-top: 1rem;
      padding-top: 1rem;
    }

    .theme-toggle-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.2rem 0;
      color: white;
    }

    .theme-label {
      font-size: 1.3rem;
      font-weight: 600;
    }

    .sliding-toggle {
      width: 60px;
      height: 30px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 15px;
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .sliding-toggle:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .toggle-slider {
      width: 26px;
      height: 26px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .toggle-slider.light {
      transform: translateX(30px);
      background: #ffd700;
    }

    .toggle-slider.dark {
      transform: translateX(0);
      background: #2c3e50;
    }

    .toggle-icon {
      font-size: 0.8rem;
    }

    /* Mobile Hero Section */
    .hero {
      padding: 8rem 0 6rem;
      min-height: 100vh;
    }

    .hero h1 {
      font-size: 2.5rem;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .hero .subtitle {
      font-size: 1.1rem;
      margin-bottom: 3rem;
      padding: 0 1rem;
    }

    .cta {
      flex-direction: column;
      width: 100%;
      gap: 1rem;
      padding: 0 1rem;
    }

    .btn {
      width: 100%;
      text-align: center;
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    /* Mobile Sections */
    section {
      padding: 3rem 0;
    }

    .container {
      padding: 0 1rem;
    }

    .section-title {
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }

    /* Mobile About Section */
    .about-content p {
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    .contact-info {
      flex-direction: column;
      gap: 1rem;
    }

    .contact-item {
      font-size: 0.95rem;
    }

    /* Mobile Skills Section */
    .skills-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .skill-card {
      padding: 1.5rem;
    }

    .skill-card h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .skill-card ul {
      gap: 0.5rem;
    }

    .skill-card li {
      font-size: 0.9rem;
      padding: 0.4rem 0.8rem;
    }

    /* Mobile Experience Section */
    .timeline {
      padding-left: 1rem;
    }

    .timeline-item {
      margin-bottom: 2rem;
    }

    .timeline-content {
      padding: 1.5rem;
    }

    .timeline-content h3 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }

    .timeline-content .date {
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .timeline-content li {
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0.6rem 0;
    }

    /* Mobile Projects Section */
    .projects-grid {
      gap: 2rem;
    }

    .project-card {
      margin: 0 0.5rem;
    }

    .project-header {
      padding: 1.5rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .project-icon {
      font-size: 2.5rem;
      align-self: center;
    }

    .project-header h3 {
      font-size: 1.6rem;
      margin-bottom: 0.8rem;
      text-align: center;
      width: 100%;
    }

    .project-tech {
      font-size: 0.85rem;
      text-align: center;
      width: 100%;
    }

    .project-body {
      padding: 1.5rem;
    }

    .project-body li {
      font-size: 1rem;
      line-height: 1.6;
      margin: 1.2rem 0;
      padding-left: 1.2rem;
    }

    .project-body li::before {
      font-size: 1rem;
      left: 0;
    }

    /* Mobile Education Section */
    .education-item {
      padding: 1.5rem;
    }

    .education-item h3 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }

    .education-item .date {
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }

    .education-item p {
      font-size: 0.9rem;
      line-height: 1.6;
    }

    /* Mobile Footer */
    .footer {
      padding: 2rem 0;
    }

    .footer-content {
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
    }

    .social-links {
      justify-content: center;
    }

    .social-links a {
      width: 45px;
      height: 45px;
      font-size: 1.3rem;
    }

    /* Hide particles on mobile */
    .particle {
      display: none;
    }

    /* Hide desktop theme toggle on mobile */
    .theme-toggle {
      display: none;
    }

  }

  /* Extra small devices */
  @media (max-width: 480px) {
    .hero h1 {
      font-size: 2rem;
    }

    .hero .subtitle {
      font-size: 1rem;
    }

    .section-title {
      font-size: 1.8rem;
    }

    .project-header h3 {
      font-size: 1.4rem;
    }

    .nav-menu {
      width: 90%;
    }

    .container {
      padding: 0 0.8rem;
    }

  }

  /* Hide mobile theme toggle on desktop */
  @media (min-width: 769px) {
    .theme-toggle-menu-item {
      display: none;
    }
  }
`;

// Theme Toggle Component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="theme-icon">
        {isDark ? '☀️' : '🌙'}
      </span>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
        <div className="logo" style={{ color: 'white !important' }}>THOUSIF<span style={{ color: 'white !important' }}>.DEV</span></div>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a className="nav-link" style={{ color: 'white !important' }} onClick={() => scrollToSection('about')}>ABOUT</a></li>
          <li><a className="nav-link" style={{ color: 'white !important' }} onClick={() => scrollToSection('skills')}>SKILLS</a></li>
          <li><a className="nav-link" style={{ color: 'white !important' }} onClick={() => scrollToSection('experience')}>EXPERIENCE</a></li>
          <li><a className="nav-link" style={{ color: 'white !important' }} onClick={() => scrollToSection('projects')}>PROJECTS</a></li>
          <li><a className="nav-link" style={{ color: 'white !important' }} onClick={() => scrollToSection('education')}>EDUCATION</a></li>
          <li className="theme-toggle-menu-item">
            <div className="theme-toggle-container">
              <span className="theme-label">{isDark ? 'Dark' : 'Light'}</span>
              <div className="sliding-toggle" onClick={toggleTheme}>
                <div className={`toggle-slider ${isDark ? 'dark' : 'light'}`}>
                  <span className="toggle-icon">{isDark ? '🌙' : '☀️'}</span>
                </div>
              </div>
            </div>
          </li>
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
          <p>Data professional with 3+ years of experience in analytics, data quality, and integration across enterprise systems. Skilled in SQL, Python, Tableau, and Snowflake, with a strong track record of building scalable data workflows, defining KPIs, conducting A/B tests, and delivering insights that drive product decisions. Experienced in dbt, AWS, cohort analysis, and behavioral analytics tools, and passionate about turning complex data into actionable strategies.</p>

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
      title: "Data Analytics & Experimentation",
      items: [
        "Advanced SQL (CTEs, Window Functions)",
        "KPI Definition and Tracking",
        "Funnel and Cohort Analysis",
        "A/B Testing, Statistical Modelling (Python, R)"
      ]
    },
    {
      title: "Data Engineering & Warehousing",
      items: [
        "Snowflake, SQL Server, dbt",
        "ELT Pipelines, Dimensional Modelling",
        "Data Validation and Profiling",
        "AWS (S3, Lambda, Redshift, CloudWatch)"
      ]
    },
    {
      title: "Visualization & Tools",
      items: [
        "Tableau, Amplitude/Mixpanel",
        "Excel (Advanced Formulas)",
        "Data Storytelling",
        "Interactive Dashboard Development"
      ]
    },
    {
      title: "Programming & Cloud",
      items: [
        "Python (pandas, NumPy, API Integration)",
        "AWS CloudFront, PostgreSQL",
        "Git/GitHub, Jira, CI/CD",
        "Docker, Azure Data Studio"
      ]
    },
    {
      title: "Collaboration & Methodologies",
      items: [
        "Cross-Functional Teamwork",
        "Stakeholder Communication",
        "Agile/Scrum Practices",
        "Sprint Planning & Feature Development"
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
      company: "OKLAHOMA STATE UNIVERSITY - IT",
      date: "AUG 2024 – MAY 2025",
      achievements: [
        "Automated integration of HR, finance, and academic data using Python, SQL Server, and AWS S3, reducing manual updates by 40% and improving data reliability across reporting systems",
        "Built validation pipelines with CTEs and window functions to detect anomalies and ensure high-quality data for dashboards, enabling data-driven decision-making by leadership",
        "Defined and tracked KPIs, conducted cohort and funnel analysis, and supported A/B testing initiatives to align analytics outcomes with business and product objectives",
        "Designed interactive Tableau dashboards and Excel reports showing data quality trends and operational metrics, improving communication and reporting efficiency by 25%"
      ]
    },
    {
      title: "Business Intelligence Intern",
      company: "INTERWORKS",
      date: "MAY 2024 – AUG 2024",
      achievements: [
        "Enhanced NHS England's population analytics dashboards in Tableau Cloud, improving performance and usability for over 5 billion health records used in strategic planning",
        "Designed parameterized dashboards to visualize cohort behavior, retention, and demographic trends, enabling stakeholders to make faster, evidence-based decisions",
        "Developed and executed data validation workflows across multiple sources and authored documentation that increased adoption of analytics solutions by non-technical teams",
        "Collaborated using Git/GitHub, Jira, and agile practices, contributing to sprint planning and cross-functional feature development"
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
      title: "Apilens - LLM Analytics Platform",
      tech: "PYTHON • AWS • POSTGRESQL • DOCKER",
      icon: "⚡",
      achievements: [
        "Built global proxy network with 300+ edge locations for LLM API monitoring with sub-100ms latency",
        "Engineered real-time data pipeline processing 10M+ daily requests for comprehensive analytics and reporting",
        "Developed cost optimization engine reducing LLM spending by 30-50% through intelligent usage analysis"
      ]
    },
    {
      title: "Customer Analytics Dashboard",
      tech: "TABLEAU • SQL • DBT • COHORT ANALYSIS",
      icon: "📊",
      achievements: [
        "Built interactive dashboards with customer lifetime value analysis and behavioral segmentation, improving retention by 40%",
        "Implemented automated cohort analysis and churn prediction models, reducing customer churn by 25%",
        "Created self-service analytics platform reducing manual report requests by 70% and accelerating decision-making"
      ]
    },
    {
      title: "Enterprise Data Warehouse",
      tech: "SQL SERVER • DOCKER • ETL PIPELINES",
      icon: "🏗️",
      achievements: [
        "Implemented modern data warehouse using Medallion (Bronze, Silver, Gold) pattern for scalable analytics across business units",
        "Built robust ETL pipelines processing 10,000+ records from CRM/ERP systems, improving efficiency by 40%",
        "Transformed legacy systems into optimized star schema, achieving 40% faster query performance and real-time BI"
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
        <div className="project-icon">{project.icon}</div>
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
      <ThemeToggle />
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

