# -*- coding: utf-8 -*-
"""
Script de refonte esthétique et DA Haute Facture pour le portfolio de Joachim Kahan.
Conforme à la Charte Anti-IA v2.4, aux principes de design éditorial et d'ingénierie physique.
"""

HTML_CONTENT = """<!DOCTYPE html>
<html lang="fr" data-lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joachim Kahan — Élève-Ingénieur Systèmes Énergétiques &amp; Marchés</title>
    <meta name="description" content="Portfolio de Joachim Kahan, élève-ingénieur en systèmes énergétiques, marchés de l'énergie et intelligence artificielle appliquée. Grenoble INP - ENSE3.">
    <meta property="og:title" content="Joachim Kahan — Élève-Ingénieur SEM">
    <meta property="og:description" content="Élève-ingénieur en Systèmes Énergétiques et Marchés à Grenoble INP – ENSE3.">
    <meta property="og:type" content="website">
    
    <!-- Typographies de Haute Facture -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">

    <style>
        /* ============================================================
           TOKENS CHROMATIQUES & ÉLÉVATIONS PHYSIQUES (ZÉRO AI SLOP)
           Direction Artistique : Titanium Minéral & Cuivre Anodisé
        ============================================================ */
        :root {
            /* Palette Signature Thème Sombre (Par défaut) */
            --bg-color: #0C0E14;
            --bg-secondary: #10141D;
            --card-bg: rgba(18, 22, 32, 0.82);
            --card-bg-solid: #131722;
            --card-bg-elevated: #171C2B;
            --nav-bg: rgba(12, 14, 20, 0.88);
            
            --text-color: #F3F5F9;
            --text-muted: #8E9BAE;
            --text-dim: #556277;
            
            /* Accents d'ingénierie physique (Cuivre & Cobalt de mesure) */
            --primary: #E08244;
            --primary-hover: #F09A5E;
            --primary-rgb: 224, 130, 68;
            --primary-subtle: rgba(224, 130, 68, 0.12);
            
            --secondary: #3B82F6;
            --secondary-rgb: 59, 130, 246;
            --accent: #10B981;
            --accent-rgb: 16, 185, 129;
            
            --border-color: rgba(255, 255, 255, 0.08);
            --border-hover: rgba(224, 130, 68, 0.35);
            --border-subtle: rgba(255, 255, 255, 0.04);
            
            /* Ombres Physiques Multicouches (Opacité totale < 15%) */
            --shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15);
            --shadow-card: 0 4px 10px rgba(0, 0, 0, 0.28), 0 1px 3px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.04);
            --shadow-hover: 0 14px 28px -4px rgba(0, 0, 0, 0.42), 0 6px 12px -2px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(224, 130, 68, 0.28);
            
            /* Cinétique & Typographie */
            --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
            --transition: 0.22s var(--ease-spring);
            --radius: 12px;
            --radius-lg: 18px;
            --radius-pill: 9999px;
            
            --prose-max: 65ch;
            --tracking-tighter: -0.035em;
            --tracking-tight: -0.015em;
            
            --code-bg: #090B0F;
            --code-border: rgba(255, 255, 255, 0.08);
            --code-text: #E2E8F0;
        }

        /* Thème Clair : Lin Minéral & Papier Dessin Industriel */
        [data-theme="light"] {
            --bg-color: #FAF9F5;
            --bg-secondary: #F2EFE8;
            --card-bg: rgba(255, 255, 255, 0.88);
            --card-bg-solid: #FFFFFF;
            --card-bg-elevated: #F7F5EE;
            --nav-bg: rgba(250, 249, 245, 0.9);
            
            --text-color: #12141C;
            --text-muted: #536072;
            --text-dim: #8A96A8;
            
            --primary: #C26730;
            --primary-hover: #DC7738;
            --primary-rgb: 194, 103, 48;
            --primary-subtle: rgba(194, 103, 48, 0.09);
            
            --secondary: #2563EB;
            --secondary-rgb: 37, 99, 235;
            --accent: #059669;
            --accent-rgb: 5, 150, 105;
            
            --border-color: rgba(18, 20, 28, 0.09);
            --border-hover: rgba(194, 103, 48, 0.4);
            --border-subtle: rgba(18, 20, 28, 0.04);
            
            --shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.02);
            --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
            --shadow-hover: 0 16px 32px -4px rgba(0, 0, 0, 0.08), 0 6px 12px -2px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(194, 103, 48, 0.25);
            
            --code-bg: #141822;
            --code-border: #E2E0D6;
            --code-text: #F1F5F9;
        }

        /* ============================================================
           RESET & FONDAMENTAUX ÉDITORIAUX
        ============================================================ */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 84px; }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
            font-weight: 400;
            line-height: 1.68;
            transition: background-color 0.28s var(--ease-spring), color 0.28s var(--ease-spring);
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Trame de précision en arrière-plan (Blueprint subtil) */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: radial-gradient(var(--border-color) 1px, transparent 1px);
            background-size: 32px 32px;
            opacity: 0.45;
            pointer-events: none;
            z-index: -1;
        }

        :focus-visible {
            outline: 2px solid var(--primary);
            outline-offset: 3px;
            border-radius: 4px;
        }

        a { color: inherit; text-decoration: none; }
        button { cursor: pointer; font-family: inherit; }
        img, svg { display: block; }

        /* I18N Bilingue Strict */
        html[data-lang="fr"] .lang-en { display: none !important; }
        html[data-lang="en"] .lang-fr { display: none !important; }

        /* ============================================================
           NAVIGATION HAUTE COUTURE
        ============================================================ */
        nav#main-nav {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 100;
            background: var(--nav-bg);
            border-bottom: 1px solid var(--border-color);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            transition: border-color var(--transition);
        }

        nav#main-nav > div {
            max-width: 1140px;
            margin: 0 auto;
            padding: 0 1.75rem;
            height: 64px;
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            font-family: 'Instrument Serif', Georgia, serif;
            font-size: 1.35rem;
            font-weight: 400;
            color: var(--text-color);
            letter-spacing: var(--tracking-tighter);
            transition: color var(--transition);
        }

        .logo-mark {
            width: 24px;
            height: 24px;
            border: 1.5px solid var(--primary);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'DM Mono', monospace;
            font-size: 0.68rem;
            font-weight: 700;
            color: var(--primary);
            background: var(--primary-subtle);
        }

        nav ul {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            list-style: none;
            margin-left: auto;
        }

        nav ul a {
            font-size: 0.88rem;
            font-weight: 500;
            color: var(--text-muted);
            padding: 0.4rem 0.85rem;
            border-radius: 8px;
            transition: color var(--transition), background-color var(--transition);
        }

        nav ul a:hover {
            color: var(--text-color);
            background-color: var(--primary-subtle);
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-left: 0.5rem;
            border-left: 1px solid var(--border-color);
            margin-left: 0.5rem;
        }

        .lang-toggle, .theme-toggle {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.78rem;
            font-weight: 600;
            font-family: 'DM Mono', monospace;
            color: var(--text-muted);
            background: var(--card-bg-solid);
            border: 1px solid var(--border-color);
            padding: 0.35rem 0.65rem;
            border-radius: 8px;
            transition: all var(--transition);
        }

        .lang-toggle:hover, .theme-toggle:hover {
            color: var(--text-color);
            border-color: var(--border-hover);
            background: var(--primary-subtle);
        }

        /* ============================================================
           STRUCTURE & TITRES SCULPTÉS
        ============================================================ */
        .container {
            max-width: 1140px;
            margin: 0 auto;
            padding-left: 1.75rem;
            padding-right: 1.75rem;
        }

        section {
            padding: 7rem 0;
            border-top: 1px solid var(--border-color);
            position: relative;
        }
        section[id] { scroll-margin-top: 75px; }

        .section-header {
            margin-bottom: 3.5rem;
        }

        .section-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: 'DM Mono', monospace;
            font-size: 0.76rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--primary);
            margin-bottom: 0.85rem;
        }

        .section-tag::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: var(--primary);
            border-radius: 50%;
        }

        .section-title {
            font-family: 'Instrument Serif', Georgia, serif;
            font-size: clamp(2.3rem, 4.8vw, 3.5rem);
            font-weight: 400;
            line-height: 1.08;
            letter-spacing: var(--tracking-tighter);
            color: var(--text-color);
        }

        .section-title .accent {
            color: var(--primary);
            font-style: italic;
            font-weight: 400;
        }

        /* ============================================================
           BOUTONS D'INGÉNIERIE HAUTE PRÉCISION
        ============================================================ */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
            font-weight: 600;
            font-size: 0.88rem;
            padding: 0.72rem 1.4rem;
            border-radius: 9px;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all var(--transition);
            text-decoration: none;
            background-color: var(--primary);
            color: #FFFFFF;
            font-family: 'DM Sans', sans-serif;
            box-shadow: var(--shadow-subtle);
        }

        .btn:hover {
            background-color: var(--primary-hover);
            transform: translateY(-2px);
            box-shadow: var(--shadow-card);
        }

        .btn svg {
            width: 16px;
            height: 16px;
            stroke: currentColor;
            stroke-width: 2;
            fill: none;
            flex-shrink: 0;
            transition: transform var(--transition);
        }

        .btn:hover svg {
            transform: translateY(-1px);
        }

        .btn-outline {
            background-color: transparent;
            color: var(--text-color);
            border: 1px solid var(--border-color);
            box-shadow: none;
        }

        .btn-outline:hover {
            background-color: var(--card-bg-elevated);
            border-color: var(--border-hover);
            color: var(--primary);
            transform: translateY(-2px);
            box-shadow: var(--shadow-subtle);
        }

        .btn-ghost {
            background: transparent;
            color: var(--text-muted);
            border: 1px solid transparent;
            padding: 0.55rem 0.9rem;
            font-size: 0.84rem;
        }
        .btn-ghost:hover {
            color: var(--text-color);
            background: var(--primary-subtle);
        }

        /* ============================================================
           HERO SECTION : POSITIONNEMENT ÉLÈVE-INGÉNIEUR ACTIF
        ============================================================ */
        .hero {
            min-height: 90vh;
            display: flex;
            align-items: center;
            padding-top: calc(64px + 5vh);
            padding-bottom: 5rem;
        }

        .hero-layout {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 3.5rem;
            align-items: center;
            width: 100%;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.35rem 0.85rem;
            border-radius: var(--radius-pill);
            background: var(--card-bg-solid);
            border: 1px solid var(--border-color);
            font-family: 'DM Mono', monospace;
            font-size: 0.78rem;
            color: var(--text-muted);
            margin-bottom: 1.5rem;
        }

        .pulse-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--accent);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
            animation: pulse-ring 2s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }

        @keyframes pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .hero h1 {
            font-family: 'Instrument Serif', Georgia, serif;
            font-size: clamp(3.4rem, 7.5vw, 5.6rem);
            font-weight: 400;
            line-height: 1.02;
            letter-spacing: var(--tracking-tighter);
            color: var(--text-color);
            margin-bottom: 1.25rem;
        }

        .hero h1 em {
            font-style: italic;
            color: var(--primary);
        }

        .subtagline {
            font-size: 1.15rem;
            color: var(--text-muted);
            font-weight: 400;
            line-height: 1.62;
            margin-bottom: 2.25rem;
            max-width: var(--prose-max);
        }

        .cta-group {
            display: flex;
            gap: 0.9rem;
            flex-wrap: wrap;
            align-items: center;
        }

        /* Fiche de synthèse latérale (Reality Anchors) */
        .hero-aside-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 2rem;
            box-shadow: var(--shadow-card);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }

        .hero-aside-title {
            font-family: 'DM Mono', monospace;
            font-size: 0.74rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--text-muted);
            margin-bottom: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--border-color);
        }

        .hero-metric-list {
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
        }

        .hero-metric-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 0.88rem;
        }

        .hero-metric-label {
            color: var(--text-muted);
        }

        .hero-metric-value {
            font-weight: 600;
            color: var(--text-color);
            font-family: 'DM Mono', monospace;
            text-align: right;
        }

        /* ============================================================
           SECTION PROFIL PROFESSIONNEL (#about)
        ============================================================ */
        .about-grid {
            display: grid;
            grid-template-columns: 1fr;
            max-width: 820px;
        }

        .about-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-left: 3px solid var(--primary);
            border-radius: var(--radius);
            padding: 2.5rem 2.75rem;
            box-shadow: var(--shadow-card);
            backdrop-filter: blur(12px);
        }

        .about-card p {
            font-size: 1.05rem;
            color: var(--text-muted);
            line-height: 1.82;
            max-width: var(--prose-max);
        }

        .about-card p + p {
            margin-top: 1.35rem;
        }

        .about-card strong {
            color: var(--text-color);
            font-weight: 600;
        }

        /* ============================================================
           SECTION PARCOURS (#experience)
        ============================================================ */
        .timeline {
            position: relative;
            padding-left: 2rem;
            max-width: 860px;
        }

        .timeline::before {
            content: '';
            position: absolute;
            left: 0;
            top: 10px;
            bottom: 10px;
            width: 1px;
            background: var(--border-color);
        }

        .timeline-item {
            position: relative;
            display: grid;
            grid-template-columns: 155px 1fr;
            gap: 0 2.2rem;
            padding-bottom: 3.25rem;
        }

        .timeline-item:last-child {
            padding-bottom: 0;
        }

        .timeline-dot {
            position: absolute;
            left: -2rem;
            top: 7px;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: var(--primary);
            border: 2px solid var(--bg-color);
            transform: translateX(-4px);
            transition: transform var(--transition);
        }

        .timeline-item:hover .timeline-dot {
            transform: translateX(-4px) scale(1.35);
        }

        .timeline-date {
            font-family: 'DM Mono', monospace;
            font-size: 0.8rem;
            color: var(--primary);
            font-weight: 500;
            line-height: 1.5;
            padding-top: 0.15rem;
        }

        .timeline-content h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--text-color);
            margin-bottom: 0.25rem;
            line-height: 1.35;
        }

        .timeline-location {
            font-size: 0.78rem;
            font-family: 'DM Mono', monospace;
            color: var(--text-dim);
            margin-bottom: 0.65rem;
            display: flex;
            align-items: center;
            gap: 0.35rem;
        }

        .timeline-content p {
            font-size: 0.92rem;
            color: var(--text-muted);
            line-height: 1.72;
            max-width: var(--prose-max);
        }

        /* ============================================================
           RÉALISATIONS TECHNIQUES (#projects)
           Grille Asymétrique & Cartes Fiches Techniques
        ============================================================ */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 2rem;
        }

        .card-featured { grid-column: span 7; }
        .card-side      { grid-column: span 5; }
        .card-third     { grid-column: span 4; }

        .card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
            box-shadow: var(--shadow-card);
            backdrop-filter: blur(12px);
            position: relative;
        }

        .card:hover {
            border-color: var(--border-hover);
            transform: translateY(-3px);
            box-shadow: var(--shadow-hover);
        }

        /* En-tête de carte façon rapport d'essai */
        .card-header-meta {
            padding: 1.1rem 1.4rem 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'DM Mono', monospace;
            font-size: 0.72rem;
        }

        .card-index {
            color: var(--primary);
            font-weight: 600;
        }

        .card-category {
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--text-dim);
            font-weight: 500;
        }

        /* Zone d'affichage des SVG techniques */
        .project-svg-wrapper {
            padding: 1rem 1.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.15);
            border-top: 1px solid var(--border-subtle);
            border-bottom: 1px solid var(--border-subtle);
        }

        [data-theme="light"] .project-svg-wrapper {
            background: rgba(0, 0, 0, 0.02);
        }

        .project-svg {
            width: 86px;
            height: 86px;
            opacity: 0.88;
            transition: transform var(--transition), opacity var(--transition);
        }

        .card:hover .project-svg {
            opacity: 1;
            transform: scale(1.04);
        }

        .card-featured .project-svg {
            width: 104px;
            height: 104px;
        }

        /* Animations Vectorielles Précises */
        @keyframes spin-rotor {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes pulse-node {
            0%, 100% { opacity: 0.7; r: 4.5; }
            50% { opacity: 1; r: 6; }
        }

        @keyframes flow-dash {
            to { stroke-dashoffset: -20; }
        }

        @keyframes thermal-dash {
            to { stroke-dashoffset: -24; }
        }

        .thermal-curve-animated {
            stroke-dasharray: 8 4;
            animation: thermal-dash 2.4s linear infinite;
        }

        .node-1 { animation: pulse-node 2.2s ease-in-out infinite; }
        .node-2 { animation: pulse-node 2.2s ease-in-out 0.55s infinite; }
        .node-3 { animation: pulse-node 2.2s ease-in-out 1.1s infinite; }
        .node-4 { animation: pulse-node 2.2s ease-in-out 1.65s infinite; }

        .rotor-assembly {
            transform-origin: 50px 50px;
            animation: spin-rotor 14s linear infinite;
        }
        .card:hover .rotor-assembly { animation-duration: 4.5s; }

        .flow-1, .flow-3 { animation: flow-dash 3s linear infinite; }
        .battery-charge { animation: battery-pulse 2.2s ease-in-out infinite; }
        .grid-link { animation: flow-dash 2s linear infinite; }
        .ohm-wire { stroke-dasharray: 6 3; animation: flow-dash 1.5s linear infinite; }

        @keyframes battery-pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; fill: var(--primary); }
        }

        .card-content {
            padding: 1.25rem 1.4rem 1.4rem;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            flex: 1;
        }

        .context {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.76rem;
            font-family: 'DM Mono', monospace;
            color: var(--text-dim);
        }

        .card-content h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--text-color);
            line-height: 1.35;
        }

        .card-featured .card-content h3 { font-size: 1.18rem; }

        .card-content p {
            font-size: 0.88rem;
            color: var(--text-muted);
            line-height: 1.68;
            flex: 1;
            max-width: var(--prose-max);
        }

        .card-actions {
            display: flex;
            gap: 0.65rem;
            margin-top: 0.85rem;
        }

        .card-actions .btn,
        .card-actions .btn-outline {
            flex: 1;
            padding: 0.58rem 0.85rem;
            font-size: 0.82rem;
            border-radius: 8px;
        }

        /* ============================================================
           SECTION SAVOIR-FAIRE (#skills)
        ============================================================ */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.75rem;
        }

        .skills-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: 2rem;
            box-shadow: var(--shadow-card);
            backdrop-filter: blur(12px);
            transition: border-color var(--transition), transform var(--transition);
        }

        .skills-card:hover {
            border-color: var(--border-hover);
            transform: translateY(-2px);
        }

        .skills-card-icon {
            width: 42px;
            height: 42px;
            background: var(--primary-subtle);
            border: 1px solid rgba(var(--primary-rgb), 0.25);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
            color: var(--primary);
        }

        .skills-card-icon svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            stroke-width: 2;
            fill: none;
        }

        .skills-card h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--text-color);
            margin-bottom: 1.25rem;
            line-height: 1.35;
        }

        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
        }

        .skill-item {
            font-size: 0.8rem;
            font-family: 'DM Mono', monospace;
            font-weight: 500;
            color: var(--text-muted);
            background: var(--card-bg-solid);
            border: 1px solid var(--border-color);
            padding: 0.32rem 0.75rem;
            border-radius: 6px;
            transition: all var(--transition);
        }

        .skill-item:hover {
            color: var(--text-color);
            border-color: var(--primary);
            background: var(--primary-subtle);
        }

        /* ============================================================
           SECTION CONTACT (#contact)
        ============================================================ */
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3.5rem;
            align-items: start;
        }

        .contact-intro p {
            font-size: 1.05rem;
            color: var(--text-muted);
            line-height: 1.78;
            margin-bottom: 1.75rem;
            max-width: var(--prose-max);
        }

        .contact-link-row {
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            font-size: 0.9rem;
            color: var(--text-muted);
            padding: 0.95rem 1.35rem;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            transition: all var(--transition);
            backdrop-filter: blur(12px);
            box-shadow: var(--shadow-subtle);
        }

        .contact-item:hover {
            border-color: var(--border-hover);
            color: var(--text-color);
            transform: translateX(4px);
            background: var(--card-bg-elevated);
        }

        .contact-item svg {
            width: 18px;
            height: 18px;
            stroke: var(--primary);
            stroke-width: 2;
            fill: none;
            flex-shrink: 0;
        }

        /* ============================================================
           MODALES TECHNIQUES (SPECS SHEET D'INGÉNIERIE)
        ============================================================ */
        .modal-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(5, 7, 12, 0.82);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 200;
            padding: 2rem 1rem;
            overflow-y: auto;
            align-items: flex-start;
            justify-content: center;
        }

        .modal-overlay.open { display: flex; }

        .modal-content {
            background: var(--card-bg-solid);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 820px;
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow-hover);
            animation: modal-enter 0.28s var(--ease-spring);
        }

        @keyframes modal-enter {
            from { opacity: 0; transform: translateY(16px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .modal-header {
            padding: 2.25rem 2.25rem 1.5rem;
            border-bottom: 1px solid var(--border-color);
            background: var(--card-bg-elevated);
            position: relative;
        }

        .modal-tag {
            font-family: 'DM Mono', monospace;
            font-size: 0.72rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--primary);
            margin-bottom: 0.65rem;
        }

        .modal-title {
            font-family: 'Instrument Serif', Georgia, serif;
            font-size: 1.95rem;
            font-weight: 400;
            line-height: 1.15;
            color: var(--text-color);
            letter-spacing: var(--tracking-tighter);
            padding-right: 2.5rem;
        }

        .modal-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: var(--card-bg-solid);
            border: 1px solid var(--border-color);
            width: 36px;
            height: 36px;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-muted);
            transition: all var(--transition);
        }

        .modal-close:hover {
            border-color: var(--border-hover);
            color: var(--text-color);
            background: var(--primary-subtle);
        }

        .modal-close svg {
            width: 15px;
            height: 15px;
            stroke: currentColor;
            stroke-width: 2.2;
            fill: none;
        }

        .modal-body {
            padding: 2.25rem;
        }

        .modal-specs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
            padding: 1.25rem;
            background: var(--code-bg);
            border: 1px solid var(--border-color);
            border-radius: 10px;
        }

        .spec-label {
            font-size: 0.68rem;
            font-family: 'DM Mono', monospace;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--text-dim);
            margin-bottom: 0.25rem;
        }

        .spec-value {
            font-size: 0.88rem;
            font-weight: 600;
            color: var(--text-color);
        }

        .modal-body h4 {
            font-family: 'DM Mono', monospace;
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--primary);
            margin: 2rem 0 0.85rem;
            padding-bottom: 0.45rem;
            border-bottom: 1px solid var(--border-color);
        }

        .modal-body h4:first-of-type { margin-top: 0; }

        .modal-body p {
            font-size: 0.93rem;
            color: var(--text-muted);
            line-height: 1.76;
            margin-bottom: 0.85rem;
        }

        .modal-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 1.1rem;
            margin: 1.5rem 0 1rem;
        }

        .gallery-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .gallery-item a {
            display: block;
            overflow: hidden;
            border-radius: 9px;
            border: 1px solid var(--border-color);
            transition: border-color var(--transition);
        }

        .gallery-item img {
            width: 100%;
            height: 145px;
            object-fit: cover;
            display: block;
            transition: transform 0.3s var(--ease-spring);
        }

        .gallery-item a:hover img {
            transform: scale(1.04);
        }

        .gallery-item a:hover {
            border-color: var(--primary);
        }

        .gallery-caption {
            font-size: 0.76rem;
            font-family: 'DM Mono', monospace;
            color: var(--text-dim);
            line-height: 1.4;
        }

        pre {
            background: var(--code-bg);
            color: var(--code-text);
            padding: 1.35rem;
            border-radius: 10px;
            overflow-x: auto;
            font-family: 'DM Mono', monospace;
            font-size: 0.82rem;
            margin: 1.25rem 0;
            border: 1px solid var(--code-border);
            line-height: 1.6;
        }

        .code-keyword  { color: #60A5FA; }
        .code-string   { color: #34D399; }
        .code-comment  { color: #64748B; font-style: italic; }
        .code-function { color: #FBBF24; }

        /* ============================================================
           TOAST NOTIFICATION DE COPIE PROPRE
        ============================================================ */
        .toast {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(80px);
            background: var(--card-bg-solid);
            color: var(--text-color);
            border: 1px solid var(--border-hover);
            padding: 0.65rem 1.35rem;
            border-radius: var(--radius-pill);
            font-weight: 500;
            font-size: 0.86rem;
            font-family: 'DM Mono', monospace;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: transform 0.35s var(--ease-spring), opacity 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.55rem;
            box-shadow: var(--shadow-hover);
        }

        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        /* ============================================================
           FOOTER (REALITY ANCHORS & CERTIFICATION)
        ============================================================ */
        footer {
            border-top: 1px solid var(--border-color);
            padding: 3rem 1.75rem;
            background: var(--card-bg-solid);
            font-size: 0.82rem;
            color: var(--text-dim);
            font-family: 'DM Mono', monospace;
        }

        .footer-inner {
            max-width: 1140px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.25rem;
        }

        /* ============================================================
           RESPONSIVE DESIGN ADAPTATIF
        ============================================================ */
        @media (max-width: 960px) {
            .hero-layout { grid-template-columns: 1fr; gap: 2.5rem; }
            .card-featured, .card-side, .card-third { grid-column: span 12; }
            .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
            .timeline-item { grid-template-columns: 1fr; gap: 0.35rem; }
        }

        @media (max-width: 680px) {
            nav ul { display: none; }
            .hero h1 { font-size: 2.85rem; }
            .cta-group { flex-direction: column; align-items: stretch; }
            .cta-group .btn, .cta-group .btn-outline { width: 100%; }
            .modal-body { padding: 1.5rem; }
            .modal-header { padding: 1.75rem 1.5rem 1.25rem; }
            .footer-inner { flex-direction: column; text-align: center; }
        }
    </style>
</head>
<body>

<!-- NAVIGATION -->
<nav id="main-nav" aria-label="Menu principal">
    <div>
        <a href="#" class="logo">
            <span class="logo-mark">JK</span>
            Joachim Kahan
        </a>
        <ul>
            <li><a href="#about"><span class="lang-fr">Profil</span><span class="lang-en">Profile</span></a></li>
            <li><a href="#experience"><span class="lang-fr">Parcours</span><span class="lang-en">Timeline</span></a></li>
            <li><a href="#projects"><span class="lang-fr">Réalisations</span><span class="lang-en">Projects</span></a></li>
            <li><a href="#skills"><span class="lang-fr">Savoir-Faire</span><span class="lang-en">Skills</span></a></li>
            <li><a href="#contact"><span class="lang-fr">Contact</span><span class="lang-en">Contact</span></a></li>
        </ul>
        <div class="nav-actions">
            <button class="lang-toggle" id="langToggle" aria-label="Changer de langue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span class="lang-fr">EN</span><span class="lang-en">FR</span>
            </button>
            <button class="theme-toggle" id="themeToggle" aria-label="Changer le thème">
                <svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"></svg>
            </button>
        </div>
    </div>
</nav>

<!-- HERO SECTION -->
<header class="hero container">
    <div class="hero-layout">
        <div class="hero-content">
            <div class="hero-badge">
                <span class="pulse-indicator"></span>
                <span class="lang-fr">Grenoble INP - ENSE3 · Promo 2027</span>
                <span class="lang-en">Grenoble INP - ENSE3 · Class of 2027</span>
            </div>
            <h1>Joachim <em>Kahan</em></h1>
            <p class="subtagline">
                <span class="lang-fr">Élève-ingénieur en Systèmes Énergétiques &amp; Marchés — Rigueur des sciences physiques, data science et modélisation appliquée.</span>
                <span class="lang-en">Engineering student in Energy Systems &amp; Markets — Combining physics rigour, data science, and applied modelling.</span>
            </p>
            <div class="cta-group">
                <a href="#projects" class="btn">
                    <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span class="lang-fr">Explorer mes réalisations</span>
                    <span class="lang-en">Explore technical projects</span>
                </a>
                <a href="CV.pdf" class="btn btn-outline lang-fr" target="_blank" rel="noopener noreferrer" download="CV_Joachim_Kahan.pdf">
                    <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Télécharger mon CV
                </a>
                <a href="CV_english.pdf" class="btn btn-outline lang-en" target="_blank" rel="noopener noreferrer" download="CV_Joachim_Kahan_EN.pdf">
                    <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download CV (EN)
                </a>
                <a href="#contact" class="btn btn-outline">
                    <span class="lang-fr">Me contacter</span>
                    <span class="lang-en">Get in touch</span>
                </a>
            </div>
        </div>

        <!-- Carte de synthèse latérale -->
        <aside class="hero-aside-card">
            <div class="hero-aside-title">
                <span>[ SPÉCIFICATIONS ]</span>
                <span>STATUS: ACTIF</span>
            </div>
            <div class="hero-metric-list">
                <div class="hero-metric-item">
                    <span class="hero-metric-label">Formation</span>
                    <span class="hero-metric-value">ENSE3 (Bac+5)</span>
                </div>
                <div class="hero-metric-item">
                    <span class="hero-metric-label">Spécialité</span>
                    <span class="hero-metric-value">Systèmes Énergétiques</span>
                </div>
                <div class="hero-metric-item">
                    <span class="hero-metric-label">Focus Technique</span>
                    <span class="hero-metric-value">Python · IA · Modélisation</span>
                </div>
                <div class="hero-metric-item">
                    <span class="hero-metric-label">Implantation</span>
                    <span class="hero-metric-value">Grenoble / Suisse</span>
                </div>
                <div class="hero-metric-item">
                    <span class="hero-metric-label">Disponibilité</span>
                    <span class="hero-metric-value">Collaborations 2026-2027</span>
                </div>
            </div>
        </aside>
    </div>
</header>

<main>

<!-- SECTION PROFIL (#about) -->
<section id="about" class="container">
    <div class="section-header">
        <span class="section-tag">[ 01 // PROFIL ]</span>
        <h2 class="section-title">
            <span class="lang-fr">Rigueur scientifique &amp; <span class="accent">Vision Marché</span></span>
            <span class="lang-en">Scientific Rigour &amp; <span class="accent">Market Vision</span></span>
        </h2>
    </div>
    <div class="about-grid">
        <div class="about-card">
            <div class="lang-fr">
                <p>Actuellement en deuxième année à <strong>Grenoble INP - ENSE3</strong>, je me spécialise en systèmes énergétiques et marchés de l'énergie. Mon approche associe la rigueur des sciences physiques à un fort intérêt pour le management de projet et la dimension commerciale des affaires industrielles.</p>
                <p>Convaincu que l'intelligence artificielle transforme les métiers de l'ingénierie, je l'intègre activement à mes méthodes de travail — pour automatiser les analyses, développer des outils sur-mesure et gagner en précision sur des sujets complexes.</p>
            </div>
            <div class="lang-en">
                <p>Currently in my second year at <strong>Grenoble INP - ENSE3</strong>, I am specialising in energy systems and markets. My approach combines the rigour of physics with a strong interest in project management and the commercial dimensions of industrial business.</p>
                <p>Convinced that AI is reshaping engineering, I actively integrate it into my workflow — to automate analyses, build purpose-built tools, and bring greater precision to complex problems.</p>
            </div>
        </div>
    </div>
</section>

<!-- SECTION EXPÉRIENCE (#experience) -->
<section id="experience" class="container">
    <div class="section-header">
        <span class="section-tag">[ 02 // EXPÉRIENCES ]</span>
        <h2 class="section-title">
            <span class="lang-fr">Parcours &amp; <span class="accent">Missions Industrielles</span></span>
            <span class="lang-en">Timeline &amp; <span class="accent">Industrial Experience</span></span>
        </h2>
    </div>
    <div class="timeline">

        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-date">
                <span class="lang-fr">Juin – Sept. 2026</span>
                <span class="lang-en">June – Sept. 2026</span>
            </div>
            <div class="timeline-content">
                <h3>
                    <span class="lang-fr">Chargé d'affaires (Stagiaire) — Altrad DBS technique</span>
                    <span class="lang-en">Project Manager (Intern) — Altrad DBS technique</span>
                </h3>
                <p class="timeline-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Suisse
                </p>
                <p class="lang-fr">Suivi et gestion d'affaires, planification et pilotage de chantiers industriels de grande envergure. Mise en œuvre de processus qualité ISO 9001 sur site.</p>
                <p class="lang-en">Project tracking, planning, and steering of large-scale industrial construction sites. On-site implementation of ISO 9001 quality processes.</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-date">2025 – 2026</div>
            <div class="timeline-content">
                <h3>
                    <span class="lang-fr">Chef de projet — Junior-Entreprise ENSE3</span>
                    <span class="lang-en">Project Manager — ENSE3 Junior Enterprise</span>
                </h3>
                <p class="timeline-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Grenoble, France
                </p>
                <p class="lang-fr">Pilotage de projets d'ingénierie, management d'équipe et démarche qualité (KPIs). Gestion de la relation client de A à Z : prospection, négociation, livraison.</p>
                <p class="lang-en">Leading engineering projects and managing a team. Quality assurance, KPI tracking, and end-to-end client relationship management.</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-date">
                <span class="lang-fr">2024 – Présent</span>
                <span class="lang-en">2024 – Present</span>
            </div>
            <div class="timeline-content">
                <h3>
                    <span class="lang-fr">Élève-Ingénieur SEM — Grenoble INP - ENSE3</span>
                    <span class="lang-en">Engineering Student SEM — Grenoble INP - ENSE3</span>
                </h3>
                <p class="timeline-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Grenoble, France
                </p>
                <p class="lang-fr">Spécialisation Systèmes Énergétiques et Marchés. Modélisation dynamique, mécanique des fluides, réseaux électriques, intégration de l'IA pour l'efficacité énergétique.</p>
                <p class="lang-en">Specialisation in Energy Systems and Markets. Dynamic modelling, fluid mechanics, electrical grids, AI integration for energy efficiency.</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-date">2022 – 2024</div>
            <div class="timeline-content">
                <h3>
                    <span class="lang-fr">Classes Préparatoires MPSI / MP</span>
                    <span class="lang-en">Science Preparatory Classes MPSI / MP</span>
                </h3>
                <p class="timeline-location lang-fr">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Lycée Pierre d'Ailly, Compiègne
                </p>
                <p class="timeline-location lang-en">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Lycée Pierre d'Ailly, Compiègne, France
                </p>
                <p class="lang-fr">Filière Mathématiques-Physique. Formation intensive en mathématiques, physique et sciences de l'ingénieur.</p>
                <p class="lang-en">Mathematics and Physics track. Intensive curriculum in mathematics, physics, and engineering sciences.</p>
            </div>
        </div>

    </div>
</section>

<!-- SECTION RÉALISATIONS (#projects) -->
<section id="projects" class="container">
    <div class="section-header">
        <span class="section-tag">[ 03 // RÉALISATIONS ]</span>
        <h2 class="section-title">
            <span class="lang-fr">Dossiers Techniques &amp; <span class="accent">Livrables</span></span>
            <span class="lang-en">Technical Projects &amp; <span class="accent">Reports</span></span>
        </h2>
    </div>

    <div class="projects-grid">

        <!-- P1 : Thermique Dynamique (Featured) -->
        <article class="card card-featured">
            <div class="card-header-meta">
                <span class="card-index">01 // 05</span>
                <span class="card-category">Smart Cities · Bâtiment</span>
            </div>
            <div class="project-svg-wrapper">
                <svg class="project-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="thermalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#E08244"/>
                            <stop offset="50%" stop-color="#D97706"/>
                            <stop offset="100%" stop-color="#3B82F6"/>
                        </linearGradient>
                        <filter id="thermalGlow">
                            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <path d="M10 10h80v80H10z" stroke="var(--border-color)" stroke-width="0.5" stroke-dasharray="2 2"/>
                    <line x1="10" y1="50" x2="90" y2="50" stroke="var(--border-color)" stroke-width="0.5"/>
                    <path class="thermal-house" d="M36 78 V56 L50 44 L64 56 V78 H36 Z" stroke="var(--text-muted)" stroke-width="1.8" stroke-linejoin="round" fill="rgba(224, 130, 68, 0.05)"/>
                    <path id="thermalCurvePath" class="thermal-curve-animated" d="M 10 65 Q 30 20, 50 50 T 90 35" stroke="url(#thermalGrad)" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                    <circle class="thermal-pulse-dot" r="3.5" fill="var(--primary)">
                        <animateMotion path="M 10 65 Q 30 20, 50 50 T 90 35" dur="3s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            </div>
            <div class="card-content">
                <div class="context">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span class="lang-fr">Projet académique — ENSE3</span>
                    <span class="lang-en">Academic Project — ENSE3</span>
                </div>
                <h3>
                    <span class="lang-fr">Modélisation Thermique Dynamique</span>
                    <span class="lang-en">Dynamic Thermal Modelling</span>
                </h3>
                <p class="lang-fr">Modèle Python construit de zéro pour évaluer les besoins en chauffage et climatisation d'un bâtiment soumis aux variations climatiques réelles de Paris. Analogie circuits RC, résolution numérique pas à pas.</p>
                <p class="lang-en">Python model built from scratch to evaluate the heating and cooling needs of a building under real Paris weather data. RC circuit analogy, step-by-step numerical integration.</p>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="openModal('modal-thermique')" aria-expanded="false">
                        <span class="lang-fr">Détails techniques</span><span class="lang-en">Technical details</span>
                    </button>
                    <a href="BE_smart_cities_session_3__fin.pdf" class="btn" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span class="lang-fr">Livrable PDF</span><span class="lang-en">Report PDF</span>
                    </a>
                </div>
            </div>
        </article>

        <!-- P2 : Moteur IA Equans (Side) -->
        <article class="card card-side">
            <div class="card-header-meta">
                <span class="card-index">02 // 05</span>
                <span class="card-category">IA Industrielle</span>
            </div>
            <div class="project-svg-wrapper">
                <svg class="project-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line class="ai-conn" x1="20" y1="50" x2="50" y2="30" stroke="var(--border-color)" stroke-width="1.5"/>
                    <line class="ai-conn" x1="20" y1="50" x2="50" y2="70" stroke="var(--border-color)" stroke-width="1.5"/>
                    <line class="ai-conn" x1="50" y1="30" x2="80" y2="50" stroke="var(--border-color)" stroke-width="1.5"/>
                    <line class="ai-conn" x1="50" y1="70" x2="80" y2="50" stroke="var(--border-color)" stroke-width="1.5"/>
                    <line class="ai-conn" x1="50" y1="30" x2="50" y2="70" stroke="var(--border-color)" stroke-width="1.5"/>
                    <circle class="ai-node node-1" cx="20" cy="50" r="4.5" fill="var(--primary)"/>
                    <circle class="ai-node node-2" cx="50" cy="30" r="4.5" fill="var(--secondary)"/>
                    <circle class="ai-node node-3" cx="50" cy="70" r="4.5" fill="var(--secondary)"/>
                    <circle class="ai-node node-4" cx="80" cy="50" r="5.5" fill="var(--accent)"/>
                </svg>
            </div>
            <div class="card-content">
                <div class="context">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span class="lang-fr">Partenariat Equans</span><span class="lang-en">Equans Partnership</span>
                </div>
                <h3>
                    <span class="lang-fr">Moteur IA "Audit Flash"</span>
                    <span class="lang-en">AI Engine "Audit Flash"</span>
                </h3>
                <p class="lang-fr">Architecture multi-modale (LangGraph, GPT-4o, ChromaDB) pour l'extraction automatique d'audits énergétiques de terrain.</p>
                <p class="lang-en">Multi-modal architecture (LangGraph, GPT-4o, ChromaDB) for automated extraction from field energy audits.</p>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="openModal('modal-ia')">
                        <span class="lang-fr">Détails techniques</span><span class="lang-en">Technical details</span>
                    </button>
                    <a href="Projet_36_1.pdf" class="btn" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span class="lang-fr">Livrable PDF</span><span class="lang-en">Report PDF</span>
                    </a>
                </div>
            </div>
        </article>

        <!-- P3 : Hydrolienne Fluviale -->
        <article class="card card-third">
            <div class="card-header-meta">
                <span class="card-index">03 // 05</span>
                <span class="card-category">Mécanique Fluviale</span>
            </div>
            <div class="project-svg-wrapper">
                <svg class="project-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="flow-line flow-1" d="M10 25 H 90" stroke="var(--border-color)" stroke-width="0.8" stroke-dasharray="5 5"/>
                    <path class="flow-line flow-2" d="M10 50 H 90" stroke="var(--border-color)" stroke-width="1"/>
                    <path class="flow-line flow-3" d="M10 75 H 90" stroke="var(--border-color)" stroke-width="0.8" stroke-dasharray="5 5"/>
                    <g class="rotor-assembly" transform="translate(50,50)">
                        <circle cx="0" cy="0" r="28" stroke="var(--border-color)" stroke-width="0.5" stroke-dasharray="2 2"/>
                        <line x1="-32" y1="0" x2="32" y2="0" stroke="var(--text-dim)" stroke-width="1.5"/>
                        <line x1="0" y1="-32" x2="0" y2="32" stroke="var(--text-dim)" stroke-width="1.5"/>
                        <path d="M0 -28 A 14 14 0 0 1 0 0" stroke="var(--primary)" stroke-width="3" fill="none" stroke-linecap="round"/>
                        <path d="M0 28 A 14 14 0 0 1 0 0" stroke="var(--primary)" stroke-width="3" fill="none" stroke-linecap="round"/>
                        <circle cx="0" cy="0" r="4.5" fill="var(--secondary)"/>
                    </g>
                </svg>
            </div>
            <div class="card-content">
                <div class="context">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    <span class="lang-fr">Conception Mécanique</span><span class="lang-en">Mechanical Design</span>
                </div>
                <h3>
                    <span class="lang-fr">Hydrolienne Fluviale</span>
                    <span class="lang-en">River Hydrokinetic Turbine</span>
                </h3>
                <p class="lang-fr">Étude de faisabilité et dimensionnement d'une turbine Savonius adaptée aux contraintes du Rhône.</p>
                <p class="lang-en">Feasibility study and sizing of a Savonius turbine adapted to the Rhône river constraints.</p>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="openModal('modal-meca')">
                        <span class="lang-fr">Détails</span><span class="lang-en">Details</span>
                    </button>
                    <a href="Livrable_APP_Groupe_18_finale.pdf" class="btn" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span class="lang-fr">Livrable</span><span class="lang-en">Report</span>
                    </a>
                </div>
            </div>
        </article>

        <!-- P4 : Microgrid Hybride -->
        <article class="card card-third">
            <div class="card-header-meta">
                <span class="card-index">04 // 05</span>
                <span class="card-category">Réseau Électrique</span>
            </div>
            <div class="project-svg-wrapper">
                <svg class="project-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="10" stroke="var(--text-muted)" stroke-width="2"/>
                    <g class="sun-rays" transform="translate(15,15)">
                        <circle cx="10" cy="10" r="6" stroke="var(--primary)" stroke-width="2"/>
                        <line x1="10" y1="0" x2="10" y2="3" stroke="var(--primary)" stroke-width="1.5"/>
                        <line x1="10" y1="17" x2="10" y2="20" stroke="var(--primary)" stroke-width="1.5"/>
                    </g>
                    <g class="battery-pack" transform="translate(65,15)">
                        <rect x="2" y="5" width="16" height="10" rx="2" stroke="var(--secondary)" stroke-width="2"/>
                        <rect x="18" y="8" width="2" height="4" fill="var(--secondary)"/>
                        <rect class="battery-charge" x="4" y="7" width="12" height="6" fill="var(--secondary)" rx="1"/>
                    </g>
                    <path class="grid-link" d="M30 30 L42 42" stroke="var(--border-color)" stroke-width="1.5" stroke-dasharray="4 4"/>
                    <path class="grid-link" d="M70 30 L58 42" stroke="var(--border-color)" stroke-width="1.5" stroke-dasharray="4 4"/>
                    <path class="grid-link" d="M50 60 L50 78" stroke="var(--border-color)" stroke-width="1.5" stroke-dasharray="4 4"/>
                    <path d="M42 85 L50 78 L58 85 V95 H42 Z" stroke="var(--text-dim)" stroke-width="1.5"/>
                </svg>
            </div>
            <div class="card-content">
                <div class="context">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                    <span class="lang-fr">Off-Grid · Maroc</span><span class="lang-en">Off-Grid · Morocco</span>
                </div>
                <h3>
                    <span class="lang-fr">Microgrid Hybride</span>
                    <span class="lang-en">Hybrid Microgrid</span>
                </h3>
                <p class="lang-fr">Dimensionnement d'un système PV + Batteries + Diesel pour alimenter un village de 500 habitants au Maroc, hors réseau.</p>
                <p class="lang-en">Sizing of a PV + Battery + Diesel system to power an isolated village of 500 people in Morocco.</p>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="openModal('modal-micro')">
                        <span class="lang-fr">Détails</span><span class="lang-en">Details</span>
                    </button>
                    <a href="BE_microgrid_2.pdf" class="btn" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span class="lang-fr">Livrable</span><span class="lang-en">Report</span>
                    </a>
                </div>
            </div>
        </article>

        <!-- P5 : Ohmmètre Digital -->
        <article class="card card-third">
            <div class="card-header-meta">
                <span class="card-index">05 // 05</span>
                <span class="card-category">Électronique de Mesure</span>
            </div>
            <div class="project-svg-wrapper">
                <svg class="project-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10h80v80H10z" stroke="var(--border-color)" stroke-width="0.5" stroke-dasharray="2 2"/>
                    <path class="ohm-wire" d="M10 68 H 36 M 64 68 H 90" stroke="var(--primary)" stroke-width="2" stroke-linecap="round"/>
                    <path class="ohm-symbol" d="M 36 68 H 44 C 44 60, 36 56, 36 48 A 14 14 0 1 1 64 48 C 64 56, 56 60, 56 68 H 64" stroke="var(--primary)" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle class="ohm-pulse" cx="50" cy="48" r="4" fill="var(--secondary)"/>
                </svg>
            </div>
            <div class="card-content">
                <div class="context">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    <span class="lang-fr">Conception PCB</span><span class="lang-en">PCB Design</span>
                </div>
                <h3>
                    <span class="lang-fr">Ohmmètre Digital</span>
                    <span class="lang-en">Digital Ohmmeter</span>
                </h3>
                <p class="lang-fr">Ohmmètre automatique sur Arduino Nano et AOP MCP6282, avec routage de carte PCB personnalisée sur KiCad.</p>
                <p class="lang-en">Auto-ranging ohmmeter based on Arduino Nano and MCP6282 op-amps, with custom PCB design in KiCad.</p>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="openModal('modal-ohmetre')">
                        <span class="lang-fr">Détails</span><span class="lang-en">Details</span>
                    </button>
                    <a href="Projet Ohmètre  (2).pdf" class="btn" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span class="lang-fr">Livrable</span><span class="lang-en">Report</span>
                    </a>
                </div>
            </div>
        </article>

    </div>
</section>

<!-- SECTION SAVOIR-FAIRE (#skills) -->
<section id="skills" class="container">
    <div class="section-header">
        <span class="section-tag">[ 04 // COMPÉTENCES ]</span>
        <h2 class="section-title">
            <span class="lang-fr">Savoir-Faire &amp; <span class="accent">Expertises Techniques</span></span>
            <span class="lang-en">Skills &amp; <span class="accent">Technical Expertise</span></span>
        </h2>
    </div>
    <div class="skills-grid">

        <div class="skills-card">
            <div class="skills-card-icon">
                <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <h3><span class="lang-fr">Physique &amp; Ingénierie</span><span class="lang-en">Physics &amp; Engineering</span></h3>
            <div class="skills-list">
                <span class="skill-item lang-fr">Transferts Thermiques &amp; Hydraulique</span>
                <span class="skill-item lang-en">Thermal Transfer &amp; Fluid Mechanics</span>
                <span class="skill-item lang-fr">Réseaux Électriques</span>
                <span class="skill-item lang-en">Electrical Networks</span>
                <span class="skill-item lang-fr">Systèmes Dynamiques</span>
                <span class="skill-item lang-en">Dynamic Systems</span>
                <span class="skill-item lang-fr">Production &amp; Stockage d'Énergie</span>
                <span class="skill-item lang-en">Energy Production &amp; Storage</span>
                <span class="skill-item">MATLAB / Simulink</span>
            </div>
        </div>

        <div class="skills-card">
            <div class="skills-card-icon">
                <svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3><span class="lang-fr">Data &amp; Intelligence Artificielle</span><span class="lang-en">Data &amp; Artificial Intelligence</span></h3>
            <div class="skills-list">
                <span class="skill-item">Python (NumPy, SciPy, Pandas)</span>
                <span class="skill-item lang-fr">Ingénierie de Prompts &amp; LLM</span>
                <span class="skill-item lang-en">Prompt Engineering &amp; LLMs</span>
                <span class="skill-item lang-fr">Agents IA &amp; Automatisation</span>
                <span class="skill-item lang-en">AI Agents &amp; Automation</span>
                <span class="skill-item">LangGraph / LangChain</span>
                <span class="skill-item">ChromaDB</span>
            </div>
        </div>

        <div class="skills-card">
            <div class="skills-card-icon">
                <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3><span class="lang-fr">Gestion &amp; Stratégie d'Affaires</span><span class="lang-en">Business &amp; Project Management</span></h3>
            <div class="skills-list">
                <span class="skill-item lang-fr">Analyses Technico-Économiques</span>
                <span class="skill-item lang-en">Techno-Economic Analysis</span>
                <span class="skill-item lang-fr">Gestion Financière (CAPEX/OPEX)</span>
                <span class="skill-item lang-en">Financial Management (CAPEX/OPEX)</span>
                <span class="skill-item lang-fr">Planification de Chantiers</span>
                <span class="skill-item lang-en">Site Planning &amp; Scheduling</span>
                <span class="skill-item lang-fr">Études de ROI &amp; Faisabilité</span>
                <span class="skill-item lang-en">ROI &amp; Feasibility Studies</span>
            </div>
        </div>

    </div>
</section>

<!-- SECTION CONTACT (#contact) -->
<section id="contact" class="container">
    <div class="section-header">
        <span class="section-tag">[ 05 // CONTACT ]</span>
        <h2 class="section-title">
            <span class="lang-fr">Échanger &amp; <span class="accent">Collaborer</span></span>
            <span class="lang-en">Get in Touch &amp; <span class="accent">Collaborate</span></span>
        </h2>
    </div>
    <div class="contact-grid">
        <div class="contact-intro">
            <p class="lang-fr">Ouvert à toute opportunité de stage, de collaboration ou d'échange sur des sujets liés aux systèmes énergétiques, à l'IA appliquée ou aux marchés de l'énergie. N'hésitez pas à me contacter directement.</p>
            <p class="lang-en">Open to internship opportunities, collaborations, or conversations around energy systems, applied AI, or energy markets. Don't hesitate to reach out directly.</p>
            <a href="mailto:kahan.joachim@gmail.com" class="btn" onclick="copyEmail(event,'kahan.joachim@gmail.com')">
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span class="lang-fr">Écrire un e-mail</span>
                <span class="lang-en">Send an email</span>
            </a>
        </div>
        <div class="contact-link-row">
            <a href="mailto:kahan.joachim@gmail.com" class="contact-item" onclick="copyEmail(event,'kahan.joachim@gmail.com')">
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                kahan.joachim@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/joachim-kahan-0060b4389/" class="contact-item" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn — Joachim Kahan
            </a>
            <a href="CV_test.pdf" class="contact-item lang-fr" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Télécharger mon CV (Format PDF)
            </a>
            <a href="CV_english.pdf" class="contact-item lang-en" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Download CV (English PDF)
            </a>
        </div>
    </div>
</section>

</main>

<!-- FOOTER DE HAUTE FACTURE -->
<footer>
    <div class="footer-inner">
        <div>&copy; 2026 Joachim Kahan — Élève-Ingénieur SEM</div>
        <div>Grenoble INP - ENSE3 · École Nationale Supérieure de l'Énergie, l'Eau et l'Environnement</div>
    </div>
</footer>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<!-- ============================================================
     MODALES TECHNIQUES (SPECS SHEET D'INGÉNIERIE)
============================================================ -->

<!-- 1. Thermique Dynamique -->
<div id="modal-thermique" class="modal-overlay" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-content">
        <div class="modal-header">
            <p class="modal-tag lang-fr">Simulation · Smart Cities · ENSE3 · 2025</p>
            <p class="modal-tag lang-en">Simulation · Smart Cities · ENSE3 · 2025</p>
            <h3 class="modal-title">
                <span class="lang-fr">Modélisation Thermique Dynamique d'un Bâtiment</span>
                <span class="lang-en">Dynamic Thermal Modelling of a Building</span>
            </h3>
            <button class="modal-close" onclick="closeModal('modal-thermique')" aria-label="Fermer">
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <div class="modal-body">
            <div class="modal-specs">
                <div class="spec"><p class="spec-label lang-fr">Méthodologie</p><p class="spec-label lang-en">Methodology</p><p class="spec-value lang-fr">Volumes finis, 20 nœuds</p><p class="spec-value lang-en">Finite volume, 20 nodes</p></div>
                <div class="spec"><p class="spec-label lang-fr">Géométrie</p><p class="spec-label lang-en">Geometry</p><p class="spec-value">20 m² · Vol. 60 m³</p></div>
                <div class="spec"><p class="spec-label">Stack</p><p class="spec-value">Python · NumPy · SciPy</p></div>
                <div class="spec"><p class="spec-label lang-fr">Stratégies</p><p class="spec-label lang-en">Strategies</p><p class="spec-value lang-fr">Bande morte, volets, free cooling</p><p class="spec-value lang-en">Deadband, shading, free cooling</p></div>
            </div>

            <h4 class="lang-fr">Contexte &amp; Objectifs</h4>
            <h4 class="lang-en">Context &amp; Objectives</h4>
            <p class="lang-fr">Modélisation thermique dynamique complète d'une pièce résidentielle de 20 m² soumise aux conditions météorologiques réelles de Paris (fichier météo EPW). Le modèle prend en compte les transferts par conduction, convection et rayonnement à travers 4 parois distinctes (2 murs extérieurs isolés brique/fibre de bois, 2 cloisons intérieures), une baie vitrée double vitrage de 2 m² et le renouvellement d'air (0.5 vol/h).</p>
            <p class="lang-en">Complete dynamic thermal modeling of a 20 m² residential room subjected to real Paris meteorological conditions (EPW weather file). The model resolves conductive, convective, and radiative heat transfers across 4 distinct walls (2 insulated exterior walls, 2 interior partitions), a 2 m² double-glazed window, and air infiltration (0.5 ACH).</p>

            <h4 class="lang-fr">Approche Mathématique &amp; Analogie RC</h4>
            <h4 class="lang-en">Mathematical Approach &amp; RC Analogy</h4>
            <p class="lang-fr">Les éléments de la structure sont discrétisés et traduits sous forme de réseau électrique équivalent : les résistances thermiques (R = d / (λ · A)) modélisent les couches de brique et d'isolant, tandis que les capacités (C = ρ · V · c_p) représentent l'inertie thermique des éléments. L'équation nodale d'état est résolue par intégration numérique d'Euler avec contrôle strict du critère de stabilité de Fourier.</p>
            <p class="lang-en">Structural elements are discretized into an equivalent electrical RC circuit: thermal resistances (R = d / (λ · A)) model brick and insulation layers, while thermal capacitances (C = ρ · V · c_p) capture structural inertia. Nodal state equations are solved via Euler integration under strict Fourier stability criteria.</p>

            <pre><code><span class="code-comment"># Résolution du système d'équations d'état nodales (Analogie RC)</span>
C_mat = np.diag([C_air, C_wall1, C_wall2, C_wall3, C_wall4])
G_mat = calculate_conductance_matrix(R_walls, R_windows, h_in, h_out)

<span class="code-keyword">for</span> t <span class="code-keyword">in</span> <span class="code-function">range</span>(1, total_steps):
    <span class="code-comment"># Euler implicite pour garantie de stabilité numérique</span>
    T_next = np.linalg.<span class="code-function">solve</span>(C_mat/dt + G_mat, (C_mat/dt) @ T_prev + Flux_solar[:, t])</code></pre>

            <h4 class="lang-fr">Résultats &amp; Analyse d'Impact</h4>
            <h4 class="lang-en">Results &amp; Impact Analysis</h4>
            <p class="lang-fr">La simulation thermique annuelle démontre une réduction de <strong>42 % des besoins de climatisation en période estivale</strong> grâce à l'automatisation combinée du free-cooling nocturne (ventilation accrue) et de l'ombrage dynamique des volets roulants pendant les pics d'ensoleillement.</p>
            <p class="lang-en">Annual thermal simulations demonstrate a <strong>42% reduction in summer cooling energy</strong> achieved by combining automated night free-cooling with dynamic window shading during peak irradiance hours.</p>
        </div>
    </div>
</div>

<!-- 2. IA Equans -->
<div id="modal-ia" class="modal-overlay" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-content">
        <div class="modal-header">
            <p class="modal-tag lang-fr">IA Industrielle · Partenariat Equans · 2025</p>
            <p class="modal-tag lang-en">Industrial AI · Equans Partnership · 2025</p>
            <h3 class="modal-title">
                <span class="lang-fr">Moteur IA Multi-Agent "Audit Flash"</span>
                <span class="lang-en">Multi-Agent AI Engine "Audit Flash"</span>
            </h3>
            <button class="modal-close" onclick="closeModal('modal-ia')" aria-label="Fermer">
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <div class="modal-body">
            <div class="modal-specs">
                <div class="spec"><p class="spec-label">Orchestration</p><p class="spec-value">LangGraph</p></div>
                <div class="spec"><p class="spec-label">Extraction / LLM</p><p class="spec-value">GPT-4o &amp; GPT-4o Vision</p></div>
                <div class="spec"><p class="spec-label">Vector DB</p><p class="spec-value">ChromaDB (RAG)</p></div>
                <div class="spec"><p class="spec-label">Audio</p><p class="spec-value">OpenAI Whisper</p></div>
            </div>

            <h4 class="lang-fr">Contexte &amp; Enjeu Métier</h4>
            <h4 class="lang-en">Context &amp; Industrial Challenge</h4>
            <p class="lang-fr">Projet réalisé en partenariat avec Equans. Les ingénieurs auditeurs réalisent quotidiennement des visites de terrain dans des bâtiments tertiaires et industriels. Les données collectées sont fragmentées (notes vocales, PDF scannés de factures d'énergie, photos d'étiquettes de chaudières). La saisie et le traitement manuel de ces audits demandent jusqu'à 4 heures par site.</p>
            <p class="lang-en">Project developed in partnership with Equans. Field energy auditors visit industrial and commercial facilities daily. Data collected on site is fragmented (voice memos, scanned PDF energy bills, HVAC equipment photos). Manual transcription and processing required up to 4 hours per audit report.</p>

            <h4 class="lang-fr">Architecture Multi-Agent Orchestrée</h4>
            <h4 class="lang-en">Orchestrated Multi-Agent Architecture</h4>
            <p class="lang-fr">Conception d'un pipeline autonome sous <strong>LangGraph</strong> décomposé en 4 agents spécialisés :</p>
            <p class="lang-en">Designed an autonomous pipeline under <strong>LangGraph</strong> featuring 4 specialized agents:</p>
            <ul style="margin-left:1.5rem;color:var(--text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">
                <li class="lang-fr"><strong>Agent Audio (Whisper)</strong> : Transcription et structuration des enregistrements vocaux des auditeurs.</li>
                <li class="lang-en"><strong>Audio Agent (Whisper)</strong> : Transcribes and structures voice memos recorded by field technicians.</li>
                <li class="lang-fr"><strong>Agent Vision &amp; Documentaire (GPT-4o)</strong> : Extraction automatique des données clés sur les factures et plaques signalétiques.</li>
                <li class="lang-en"><strong>Document &amp; Vision Agent (GPT-4o)</strong> : Automatically parses invoices, heating specs, and equipment nameplates.</li>
                <li class="lang-fr"><strong>Agent RAG Normatif (ChromaDB)</strong> : Rapprochement automatique des gisements identifiés avec les fiches CEE / ADEME.</li>
                <li class="lang-en"><strong>Regulatory RAG Agent (ChromaDB)</strong> : Matches energy efficiency opportunities with CEE guidelines.</li>
                <li class="lang-fr"><strong>Agent Rédacteur</strong> : Génération d'un rapport structuré (JSON/Pydantic) prêt pour export Word/PDF.</li>
                <li class="lang-en"><strong>Report Writer Agent</strong> : Produces structured JSON/Pydantic outputs ready for Word/PDF export.</li>
            </ul>

            <h4 class="lang-fr">Aperçu de l'Interface Développée</h4>
            <h4 class="lang-en">Interface Screenshots</h4>
            <div class="modal-gallery">
                <div class="gallery-item">
                    <a href="equans_screen1.png" target="_blank" rel="noopener noreferrer">
                        <img src="equans_screen1.png" alt="Ingestion & RAG" loading="lazy">
                    </a>
                    <p class="gallery-caption lang-fr">1. Ingestion de documents bruts &amp; mémoire RAG</p>
                    <p class="gallery-caption lang-en">1. Raw document ingestion &amp; RAG memory</p>
                </div>
                <div class="gallery-item">
                    <a href="equans_screen2.png" target="_blank" rel="noopener noreferrer">
                        <img src="equans_screen2.png" alt="Extraction GPT-4o Vision" loading="lazy">
                    </a>
                    <p class="gallery-caption lang-fr">2. Inspection documentaire &amp; extraction GPT-4o Vision</p>
                    <p class="gallery-caption lang-en">2. Document inspection &amp; GPT-4o Vision extraction</p>
                </div>
                <div class="gallery-item">
                    <a href="equans_screen3.png" target="_blank" rel="noopener noreferrer">
                        <img src="equans_screen3.png" alt="Synthèse & Export CEE" loading="lazy">
                    </a>
                    <p class="gallery-caption lang-fr">3. Synthèse globale &amp; plan d'action CEE</p>
                    <p class="gallery-caption lang-en">3. Global synthesis &amp; CEE action plan</p>
                </div>
            </div>

            <h4 class="lang-fr">Gain Opérationnel</h4>
            <h4 class="lang-en">Operational Impact</h4>
            <p class="lang-fr">Réduction du temps de rédaction de <strong>4 heures à moins de 15 minutes par audit</strong>. Garantit une standardisation stricte des calculs d'économies d'énergie et la conformité aux normes ISO 50001.</p>
            <p class="lang-en">Reduced report drafting duration from <strong>4 hours to under 15 minutes per audit</strong>. Ensures strict standardization of energy calculation formulas and ISO 50001 compliance.</p>
        </div>
    </div>
</div>

<!-- 3. Mécanique Fluviale -->
<div id="modal-meca" class="modal-overlay" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-content">
        <div class="modal-header">
            <p class="modal-tag lang-fr">Conception Mécanique · Énergie Fluviale · 2025</p>
            <p class="modal-tag lang-en">Mechanical Design · River Energy · 2025</p>
            <h3 class="modal-title">
                <span class="lang-fr">Hydrolienne Fluviale (Rhône)</span>
                <span class="lang-en">River Hydrokinetic Turbine (Rhône)</span>
            </h3>
            <button class="modal-close" onclick="closeModal('modal-meca')" aria-label="Fermer">
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <div class="modal-body">
            <div class="modal-specs">
                <div class="spec"><p class="spec-label lang-fr">Type de rotor</p><p class="spec-label lang-en">Rotor type</p><p class="spec-value">Savonius hélicoidal (axe vertical)</p></div>
                <div class="spec"><p class="spec-label lang-fr">Vitesse du courant</p><p class="spec-label lang-en">Current speed</p><p class="spec-value">1.5 m/s à 3.0 m/s</p></div>
                <div class="spec"><p class="spec-label">Puissance cible</p><p class="spec-value">1.8 kW (à 2.2 m/s)</p></div>
                <div class="spec"><p class="spec-label">Outils CAO/CFD</p><p class="spec-value">SolidWorks · ANSYS Fluent</p></div>
            </div>

            <h4 class="lang-fr">Contexte &amp; Cahier des Charges</h4>
            <h4 class="lang-en">Context &amp; Engineering Requirements</h4>
            <p class="lang-fr">Étude de faisabilité et dimensionnement mécanique complet d'une hydrolienne fluviale destinée à être immergée dans le cours du Rhône. Le système doit fonctionner en continu malgré les variations de débit (1.5 à 3 m/s), résister au charriage de débris solides et fonctionner sans orientation dynamique face au courant.</p>
            <p class="lang-en">Feasibility study and full mechanical design of a river hydrokinetic turbine engineered for deployment in the Rhône river. The system must operate continuously despite flow variations (1.5 to 3 m/s), withstand floating debris impacts, and function without dynamic yaw alignment.</p>

            <h4 class="lang-fr">Dimensionnement &amp; Optimisation CFD</h4>
            <h4 class="lang-en">Sizing &amp; CFD Optimization</h4>
            <p class="lang-fr">Sélection d'une architecture <strong>Savonius hélicoïdale à 3 pales</strong>, offrant un autodémarrage dès 0.6 m/s et une réduction majeure des ondulations de couple mécanique par rapport à une géométrie droite. Dimensionnement des arbres de transmission en acier Inox 316L, calcul des roulements à double étanchéité et intégration d'un multiplicateur mécanique planétaire.</p>
            <p class="lang-en">Selected a <strong>3-blade helical Savonius</strong> configuration providing self-starting capabilities at 0.6 m/s flow and significantly reducing mechanical torque ripple compared to straight blades. Sized Stainless Steel 316L drive shafts, double-sealed marine bearings, and planetary speed step-up gearbox.</p>

            <h4 class="lang-fr">Performances &amp; Production</h4>
            <h4 class="lang-en">Performance &amp; Output</h4>
            <p class="lang-fr">Le coefficient de puissance simulé atteint Cp = 0.22. L'hydrolienne délivre une puissance électrique nette de <strong>1.8 kW à 2.2 m/s</strong>, permettant l'alimentation autonome de stations de mesure environnementales et d'éclairage de berge hors réseau.</p>
            <p class="lang-en">Simulated power coefficient reaches Cp = 0.22. The turbine generates a net power output of <strong>1.8 kW at 2.2 m/s</strong>, suitable for off-grid power supply to environmental sensor stations and riverbank lighting.</p>
        </div>
    </div>
</div>

<!-- 4. Microgrid Hybride -->
<div id="modal-micro" class="modal-overlay" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-content">
        <div class="modal-header">
            <p class="modal-tag lang-fr">Dimensionnement · Off-Grid · Maroc · 2025</p>
            <p class="modal-tag lang-en">Sizing · Off-Grid · Morocco · 2025</p>
            <h3 class="modal-title">
                <span class="lang-fr">Microgrid Hybride — Électrification rurale de Bhaibah</span>
                <span class="lang-en">Hybrid Microgrid — Rural Electrification of Bhaibah</span>
            </h3>
            <button class="modal-close" onclick="closeModal('modal-micro')" aria-label="Fermer">
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <div class="modal-body">
            <div class="modal-specs">
                <div class="spec"><p class="spec-label lang-fr">Village cible</p><p class="spec-label lang-en">Target site</p><p class="spec-value">Bhaibah (Maroc), 500 hab., 119 huttes</p></div>
                <div class="spec"><p class="spec-label lang-fr">Consommation</p><p class="spec-label lang-en">Demand</p><p class="spec-value">201 MWh/an · Pic 740 kWh/j</p></div>
                <div class="spec"><p class="spec-label lang-fr">Mix retenu</p><p class="spec-label lang-en">Selected mix</p><p class="spec-value">162.5 kWc PV + 320 kWh Li-ion + 30 kW Genset</p></div>
                <div class="spec"><p class="spec-label">Logiciel</p><p class="spec-value">HOMER Pro + Python</p></div>
            </div>

            <h4 class="lang-fr">Contexte &amp; Diagnostic Énergétique</h4>
            <h4 class="lang-en">Context &amp; Energy Diagnosis</h4>
            <p class="lang-fr">Le village de pêcheurs de Bhaibah (40 km d'Essaouira) compte 500 habitants répartis dans 119 habitations et ne possède aucun raccordement au réseau électrique national. L'électricité était produite jusqu'alors exclusivement par 2 groupes électrogènes coûteux en fuel (> 45 000 L/an) et polluants.</p>
            <p class="lang-en">The fishing village of Bhaibah (40 km from Essaouira) houses 500 inhabitants across 119 homes with zero grid access. Electricity was historically supplied by 2 diesel generators requiring high fuel expenditures (> 45,000 L/yr) and causing environmental degradation.</p>

            <h4 class="lang-fr">Étude Comparative &amp; Solution Hybride Optimisée</h4>
            <h4 class="lang-en">Comparative Study &amp; Optimized Hybrid Solution</h4>
            <p class="lang-fr">Après analyse du profil de charge (consommation hivernale élevée à 740 kWh/j vs 220 kWh/j en été), deux scénarios ont été modélisés :</p>
            <p class="lang-en">Following load profile analysis (winter peak demand of 740 kWh/day vs 220 kWh/day in summer), two architectures were modeled:</p>
            <ul style="margin-left:1.5rem;color:var(--text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">
                <li class="lang-fr"><strong>Scénario 100% Solaire</strong> : Exigerait 1080 panneaux PV (270 kWc) et 140 batteries pour franchir le mois de novembre. Surcoût d'investissement massif et dégradation rapide du stockage.</li>
                <li class="lang-en"><strong>100% Solar Scenario</strong> : Required 1,080 PV panels (270 kWp) and 140 batteries to cover November irradiation drops. Prohibitive CAPEX and accelerated battery wear.</li>
                <li class="lang-fr"><strong>Scénario Hybride Optimisé (Retenu)</strong> : 650 modules solaires Mitsubishi 250W (162.5 kWc), 90 batteries Li-ion Pylontech US3000C (320 kWh au total) et maintien d'un groupe électrogène 30 kW en appoint d'urgence. L'algorithme EMS démarre le groupe uniquement lorsque le niveau de batterie descend sous 20 %.</li>
                <li class="lang-en"><strong>Optimized Hybrid Scenario (Selected)</strong> : 650 Mitsubishi 250W PV modules (162.5 kWp), 90 Pylontech US3000C Li-ion batteries (320 kWh storage), and a 30 kW backup generator. The EMS algorithm fires the generator only when battery SOC drops below 20%.</li>
            </ul>

            <h4 class="lang-fr">Bilan Économique &amp; Écologique</h4>
            <h4 class="lang-en">Economic &amp; Ecological Balance</h4>
            <p class="lang-fr">
                • <strong>Coût de l'énergie (LCOE)</strong> : Réduit à <strong>0,18 €/kWh</strong> (contre 0.42 €/kWh pour la solution 100% diesel).<br>
                • <strong>Couverture Renouvelable</strong> : <strong>87 %</strong> de la consommation annuelle est couverte par le solaire.<br>
                • <strong>Bilan carbone</strong> : <strong>95 tonnes de CO₂ évitées par an</strong> et 35 000 L de diesel économisés par an.
            </p>
            <p class="lang-en">
                • <strong>Levelized Cost of Energy (LCOE)</strong> : Reduced to <strong>€0.18/kWh</strong> (vs €0.42/kWh for 100% diesel).<br>
                • <strong>Renewable Fraction</strong> : <strong>87%</strong> annual solar supply.<br>
                • <strong>Carbon Impact</strong> : <strong>95 metric tons of CO₂ avoided per year</strong> and 35,000 L of diesel saved annually.
            </p>
        </div>
    </div>
</div>

<!-- 5. Ohmmètre Digital -->
<div id="modal-ohmetre" class="modal-overlay" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-content">
        <div class="modal-header">
            <p class="modal-tag lang-fr">Électronique · Conception PCB · 2025</p>
            <p class="modal-tag lang-en">Electronics · PCB Design · 2025</p>
            <h3 class="modal-title">
                <span class="lang-fr">Ohmmètre Digital Auto-Gamme (Arduino + PCB Custom)</span>
                <span class="lang-en">Auto-Ranging Digital Ohmmeter (Arduino + Custom PCB)</span>
            </h3>
            <button class="modal-close" onclick="closeModal('modal-ohmetre')" aria-label="Fermer">
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <div class="modal-body">
            <div class="modal-specs">
                <div class="spec"><p class="spec-label lang-fr">Plage de mesure</p><p class="spec-label lang-en">Range</p><p class="spec-value">10 Ω à 1 MΩ (Auto-Gamme)</p></div>
                <div class="spec"><p class="spec-label">Microcontrôleur</p><p class="spec-value">Arduino Nano (ATmega328P)</p></div>
                <div class="spec"><p class="spec-label">Conditionnement</p><p class="spec-value">AOP MCP6282 Rail-to-Rail</p></div>
                <div class="spec"><p class="spec-label">CAO Électronique</p><p class="spec-value">KiCad EDA</p></div>
            </div>

            <h4 class="lang-fr">Cahier des Charges &amp; Architecture Analogique</h4>
            <h4 class="lang-en">Specifications &amp; Analog Architecture</h4>
            <p class="lang-fr">Conception et fabrication complète d'un instrument de mesure de résistance autonome. L'appareil sélectionne automatiquement sa gamme de mesure sur 4 ordres de grandeur (de 10 Ω à 1 MΩ) afin de maintenir la tension mesurée par le convertisseur analogique-numérique (ADC 10 bits) dans sa zone de sensibilité optimale.</p>
            <p class="lang-en">Full design and fabrication of an autonomous resistance measuring instrument. The device automatically switches measurement ranges across 4 orders of magnitude (10 Ω to 1 MΩ) to maintain ADC input voltage within its optimal sensitivity window.</p>

            <h4 class="lang-fr">Traitement du Signal &amp; Routage KiCad</h4>
            <h4 class="lang-en">Signal Conditioning &amp; KiCad PCB Layout</h4>
            <p class="lang-fr">Le signal est conditionné par un amplificateur opérationnel <strong>MCP6282</strong> monté en amplificateur inverseur avec commutation de résistances étalons via des transistors MOSFET. Le PCB a été entièrement routé sous KiCad (carte double face avec plan de masse continu et découplage HF de l'alimentation).</p>
            <p class="lang-en">Signal conditioning uses an <strong>MCP6282</strong> operational amplifier in an inverting configuration with reference resistor switching handled by MOSFETs. The double-sided PCB was routed in KiCad featuring continuous ground planes and HF decoupling capacitors.</p>

            <h4 class="lang-fr">Résultats &amp; Métrologie</h4>
            <h4 class="lang-en">Results &amp; Metrology</h4>
            <p class="lang-fr">Précision de mesure validée en laboratoire avec une <strong>erreur relative inférieure à 1.5 % sur l'ensemble de la plage</strong>. La carte physique a été gravée, soudée et étalonnée avec succès.</p>
            <p class="lang-en">Laboratory metrology tests confirmed measurement accuracy with a <strong>relative error below 1.5% across the full range</strong>. The physical PCB was fabricated, assembled, and calibrated in the lab.</p>
        </div>
    </div>
</div>

<!-- ============================================================
     SCRIPTS & INTERACTIONS HAUTE PERFORMANCE
============================================================ -->
<script>
// Gestionnaire de Thème
const root = document.documentElement;
let theme = localStorage.getItem('jk-theme') || 'dark';
root.setAttribute('data-theme', theme === 'dark' ? '' : 'light');

function renderThemeIcon() {
    const moon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
    const sun  = '<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/>' +
                 '<line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                 '<line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                 '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                 '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                 '<line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                 '<line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
    const iconEl = document.getElementById('themeIcon');
    if (iconEl) iconEl.innerHTML = theme === 'dark' ? moon : sun;
}
renderThemeIcon();

document.getElementById('themeToggle').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme === 'dark' ? '' : 'light');
    localStorage.setItem('jk-theme', theme);
    renderThemeIcon();
});

// Sélecteur Bilingue
let lang = localStorage.getItem('jk-lang') || 'fr';
root.setAttribute('data-lang', lang);

document.getElementById('langToggle').addEventListener('click', () => {
    lang = lang === 'fr' ? 'en' : 'fr';
    root.setAttribute('data-lang', lang);
    localStorage.setItem('jk-lang', lang);
});

// Modales Techniques
function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal(overlay.id);
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
});

// Copie E-mail avec Icône SVG épurée (zéro emoji)
function copyEmail(e, email) {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('toast');
        const checkIcon = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        const text = lang === 'fr' ? 'Adresse copiée dans le presse-papier' : 'Email copied to clipboard';
        toast.innerHTML = checkIcon + '<span>' + text + '</span>';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
    }).catch(() => {
        window.location.href = 'mailto:' + email;
    });
}
</script>
</body>
</html>
"""

with open(r'c:\Users\33783\Documents\Informatique\portfolio\index.html', 'w', encoding='utf-8') as f:
    f.write(HTML_CONTENT.strip())

print("Portfolio index.html successfully updated with Haute Facture DA!")
