# 📜 CHANGELOG — Historique des Versions du Template Maître

---

## [2.6.0] — 2026-09-14
### 🎨 Direction Artistique Artisanale & Éradication de l'Esthétique IA (Anti-AI Slop)

#### 🚫 Bannissement des Émojis et Clichés Graphiques IA
- **Zéro Émoji UI** : Suppression complète des émojis dans les titres (`🕒 Horaires`, `📍 Zone`), boutons de bascule de mot de passe (`🙈`/`👁️`), cartes de prestations (`✨`, `⭐`, `💎`), et bannières.
- **Remplacement Typographique Sobre** : Les titres utilisent désormais une typographie pure, et les boutons adoptent des libellés textuels élégants et intemporels.
- **Suppression du `.hero-shimmer`** : Élimination du balayage lumineux perpétuel artificiel et de son animation `@keyframes shimmer` qui trahissait une génération synthétique.

#### 🖋️ Épuration Éditoriale & Séparateurs Typographiques
- **Bandeau Défilant Calme & Luxueux** : Remplacement des étoiles répétitives (`✦`) par un point médian discret (`·`), vitesse ralentie à 38s pour une lecture sereine et valorisante façon magazine d'artisanat d'art.
- **Puces de Menu & Prestations Dé-clichéisées** : Nettoyage automatique des caractères spéciaux résiduels dans les listes d'inclusions (`menu-feature-pill`).
- **Suppression des Fallbacks IA** : `section-renderer.js` n'injecte plus d'éclair `⚡` par défaut lorsqu'aucune icône n'est spécifiée. Si aucune icône n'est définie, l'espace est laissé épuré.
- **Témoignages Dé-mécanisés** : Le badge "✓ Avis Vérifié" n'est plus forcé mécaniquement sur tous les avis, mais devient strictement conditionnel (`item.verified === true`).

#### 📐 Charte Anti-IA & Mise à Niveau des Prompts de Production
- **Création de la Charte Anti-IA** (`instructions/CHARTE_ANTI_IA_ET_DIRECTION_ARTISTIQUE.md`) : Document de référence codifiant les 8 péchés capitaux du "site IA" et les standards d'une direction artistique artisanale, humaine et haut de gamme.
- **Prompts 1, 2 et 3 Renforcés** : Intégration d'exigences anti-slop dès le brief, d'une phase de purification lors de l'intégration et d'une règle de blocage QA impitoyable rejetant tout émoji ou artefact IA.

---

## [2.5.1] — 2026-09-09
### 🎨 Lisibilité & Contraste WCAG : Hero Cinématique & Navbar Dynamique

#### 🌟 Typographie & Contraste du Hero Cinématique (`public.css`)
- **Titre H1 Immersif & Lumineux** : Remplacement de la couleur sombre (`--texte-principal`) par `#FFFFFF` pur avec ombre portée douce (`text-shadow: 0 2px 24px rgba(0, 0, 0, 0.75), 0 1px 4px rgba(0, 0, 0, 0.5)`) garantissant une netteté et une lisibilité parfaites sur n'importe quel visuel d'arrière-plan.
- **Surtitre & Description Rehaussés** : Surtitre (`.hero-eyebrow`) en or champagne (`var(--color-primary, #E2C792)`) et description (`.hero-description`) en blanc adouci (`rgba(255, 255, 255, 0.94)`), éliminant tout ton terne ou délavé.
- **Dégradé de Contraste Profond (`.hero-overlay`)** : Optimisation des paliers d'opacité (`0.65` à `0.80`) pour sublimer la photographie tout en verrouillant la lisibilité des textes.
- **Rétrocompatibilité `editorial-split`** : Préservation intégrale des styles foncés pour les héros asymétriques sur fond clair via les sélecteurs `.hero.hero-split`.

#### 🧭 Navbar Biface Contextuelle (`public.css`)
- **Avant le scroll (sur Hero cinématique)** : Liens et logo en blanc pur (`#FFFFFF`) et micro-ombres pour survoler la photo en toute élégance.
- **Après le scroll (sur contenu du site)** : Transition vers un bandeau flouté crème (`color-mix`) avec typographie foncée (`--texte-principal`) s'intégrant au reste du site.

---

## [2.5.0] — 2026-09-03
### 🚀 Système Multi-Banderoles : Ticker Défilant Continu (Marquee Peps) & Bannières Cinématiques Enrichies

#### 🌟 Composant Ticker Défilant Dynamique (`.ticker-banner`)
- **Défilement infini fluide 60fps** : Animation continue matérielle pure CSS (`@keyframes tickerScroll`) sans aucune dépendance externe, avec mise en pause élégante au survol.
- **Rendu dynamique & Contrat de données** : Fonction `renderTicker()` dans `section-renderer.js` avec duplication automatique de la piste pour un défilement continu sans saut visuel. Clé `ticker: { enabled: true, items: [...] }` dans `default-content.js` et `content-adapter.js`.
- **Typographie & Peps visuel** : Séparateurs étincelles dorées (`✦`), espacement fluide, contrastes WCAG AA garantis et adaptabilité responsive totale.

#### 🎬 Bannières Cinématiques de Transition Enrichies (`.cine-banner`)
- **Support Multi-Bannières** : Intégration de 2 bannières cinématiques stratégiques dans `index.html` (après la méthode/processus et avant la FAQ/Contact) pour aérer et rythmer le parcours utilisateur.
- **Bloc Éditorial en Surimpression** : Support des classes `.cine-banner-content`, `.cine-banner-eyebrow` (surtitre en majuscules aérées), `.cine-banner-quote` (citation d'excellence en typographie serif/display), et `.cine-banner-author` (signature/réassurance).
- **Ratio Verrouillé & Zoom Doux** : Contrainte de hauteur adaptative (`min-height: clamp(280px, 36vh, 440px)`), dégradé protecteur de contraste et micro-interaction d'agrandissement doux (`scale(1.03)`) au survol.

#### ⚙️ Orchestration & Pilotage Automatique
- **SectionRenderer & Registre** : Enregistrement formel de `'ticker': renderTicker` et mise à niveau de `renderBanner()` dans `SECTION_REGISTRY`.
- **SiteConfig & Prompts 1 & 2** : Inclusion systématique de `'ticker'` et `'banner'` dans `sections.order` et `sections.active`, avec directives pour générer les expressions clés et citations adaptées à chaque secteur d'activité.

---

## [2.4.1] — 2026-09-03
### 🎯 Correctifs Majeurs d'Agencement de l'Accueil, Navbar & Variantes Hero

#### 🛠️ Structure & Grille Hero (`index.html` & `public.css`)
- **Conteneur `.hero-container` universel** : Ajout du conteneur structurel `<div class="hero-container">` dans `index.html` regroupant `.hero-content` (gauche) et `.hero-media` (droite).
- **Rétrocompatibilité totale** : Déclaration de `.hero-container { display: contents; }` par défaut, préservant à 100% le comportement centré plein écran de la variante `cinematic-full`.
- **Dégagement de la Navbar fixe** : Application de `padding-top: clamp(120px, 15vh, 160px);` sur `.hero.hero-split` pour éliminer tout chevauchement entre la barre de navigation transparente/floutée et le surtitre d'accueil.
- **Alignement & Respiration** : Grille CSS asymétrique 2 colonnes (`1.15fr 0.85fr`) avec alignement vertical centré et ombre portée chaude sur la carte visuelle.

#### 🛡️ Navbar & Sécurité Anti-Troncature du Logo (`public.css`)
- **Protection du nom de marque (`.logo`)** : Ajout formel de `flex-shrink: 0;` sur `.logo` pour interdire au conteneur flex de tronquer le logo (ex: *"MAISON GAUTH..."*) lorsque la navigation comporte de nombreux liens.
- **Espacement adaptatif (`.nav-links`)** : Transition vers `gap: clamp(10px, 1.4vw, 24px);` et `white-space: nowrap;` pour accueillir sans friction les 10 sections d'un site complet sur desktop.

#### 🎨 Bouton d'Action Principal (`.btn-primary`)
- **Finitions graphiques complètes** : Ajout de `display: inline-flex`, `padding: 14px 32px`, `border-radius: 8px`, typographie fluide en majuscules aérées, micro-interaction d'élévation au survol (`translateY(-2px)`) et respect du contraste WCAG AA.

---

## [2.4.0] — 2026-09-03
### 🏛️ Architecture Multi-Secteurs & Variantes Métiers Polymorphes (Audit Test_04 Suite)

#### 🎨 Variantes Métiers Avancées
- **Section Hero (`hero`)** : Ajout de la variante `editorial-split` (mise en page asymétrique 50/50 avec carte visuelle d'ambiance encadrée) en complément de `cinematic-full`.
- **Section Galerie (`gallery`)** : Prise en charge explicite de `photo-editorial` (cartes photos plein format avec badge flottant satiné et zoom fluide), `browser-mockup` (fenêtre macOS pour projets web/SaaS) et `bento`.
- **Section Prestations (`prestations`)** : Ajout de la variante `menu-list` (carte épurée avec pointillé et prix alignés, idéale coiffure, spas, restauration) en complément de `pricing-cards` et `cards-expertise`.
- **Section Témoignages (`testimonials`)** : Ajout de la variante `quote-editorial` (grande citation d'impact centrée avec attribution typographique) en complément de `cards-grid`.
- **Section Partenaires (`partners`)** : Prise en charge formelle de `brand-showcase` (cartes de marques avec photos de soins/produits) et `logo-cloud` (nuage minimaliste de logos B2B).
- **Configuration Universelle (`site-config.js`)** : Déclaration du bloc `variants` centralisant l'ensemble des choix de déclinaisons sectorielles.

---

## [2.3.0] — 2026-09-03
### 🛡️ Durcissement Visuel, Découplage Métier & Rendu Dynamique (Audit Test_04)

#### 🚀 Rendu & Stubs Dynamiques (P1)
- **Restitution de `banner` (`PAT-14`)** : Ajout de la clé `banner: base.banner || null` dans `getFullContent()` (`js/content-adapter.js`) et repli automatique de secours dans `renderBanner()` (`js/section-renderer.js`). Élimine la propagation de l'image de secours figée sur tous les sites générés.
- **Moteur de rendu des Témoignages & Avis (`PAT-15`)** : Remplacement du stub vide par `renderTestimonials()` dans `js/section-renderer.js` avec notation 5 étoiles, badge `✓ Avis Vérifié`, citations stylisées et avatars initiales.
- **Moteur de rendu Infos Pratiques & Horaires (`PAT-15`)** : Implémentation complète de `renderPracticalInfo()` avec tableau des horaires, badges des communes/zones, adresse et lien téléphonique direct `tel:`.
- **Injection dynamique des Métadonnées SEO (`PAT-15`)** : Ajout de `renderMeta()` pour synchroniser dynamiquement `<title>` et `<meta name="description">` avec les données du client.
- **Sécurisation du cache LocalStorage** : `getLocal()` dans `content-repository.js` bascule automatiquement sur `DEFAULT_CONTENT` si le cache local est un tableau vide `[]`.

#### 🎨 Découplage Architectural & Cartes Photos Métiers (P2)
- **Découplage Galerie / Looks (`PAT-16`)** : Séparation physique de `<section id="gallery">` et `<section id="looks">` en deux sections autonomes de premier niveau dans `index.html` et synchronisation de l'ancre `#gallery` dans `SECTION_NAV_MAP`. Permet d'activer/désactiver la galerie indépendamment des onglets éditoriaux sans message parasite *"Chargement des looks..."*.
- **Cartes Photos Classiques & Fin du Faux Navigateur Forcé (`PAT-17`)** : Conditionnement de la barre de navigateur macOS (`.browser-mockup-bar` avec points `● ● ●`) aux seuls projets web dotés d'une URL réelle. Activation automatique de la carte photo classique (`.classic-card`) avec badge flottant satiné pour tous les artisans, photographes et commerçants.
- **Refonte Design System Marques Partenaires (`PAT-18`)** : Transformation du bandeau de marques dans `index.html`, `section-renderer.js` et `public.css` : titre éditorial *Cormorant*, cartes de prestige avec support d'images de produits/soins (`imageUrl`), sous-titres de spécialités et élimination du vide de 120px.

---

## [2.2.0] — 2026-09-03
### 🌟 Enrichissements Fonctionnels & Nouveaux Patterns Modulaires (Audit Portfolio)

#### 🚀 Micro-interactions UI (Lot 1)
- **Toast flottant & Copie Email (`CAND-09`)** : Ajout du conteneur `#toast` et gestionnaire universel `[data-copy-email]` avec retour visuel immédiat et repli natif sur `mailto:`.
- **Multi-CTA Hero & Téléchargement Direct (`CAND-03`)** : Support de `content.hero.secondaryCta` permettant un bouton d'action secondaire avec attribut `download` natif.

#### 🎨 Enrichissements Galerie (Lot 2)
- **Variante Bento Grid (`CAND-05`)** : Support optionnel de `variant: "bento"` pour la galerie avec mise en valeur asymétrique du projet phare.
- **Documents Joints Téléchargeables (`CAND-07`)** : Bouton d'accès direct aux livrables et fiches techniques (`documentUrl`, `documentLabel`) par carte projet.
- **Modale Étude de Cas Complète (`CAND-06`)** : Modale détaillée (`#case-study-modal`) avec métriques clés, galeries d'images secondaires et description approfondie.

#### 🏛️ Nouvelle Section Publique & CRUD (Lot 3)
- **Section Timeline / Parcours (`CAND-04`)** : Nouvelle section `#parcours` (désactivée par défaut, 100% opt-in) avec frise chronologique élégante, moteur de rendu `renderTimeline()`, contrat de données `timelineItem`, adaptateur de contenu, persistance Firestore/LocalStorage et interface CRUD dédiée dans `admin.html`.

#### 💼 Variante Prestations Savoir-Faire (Lot 4)
- **Variante Expertise (`CAND-08`)** : Support de `variant: "cards-expertise"` pour les prestations (masquage optionnel des tarifs au profit de la liste de compétences et demande d'étude).

#### 🌐 Fonctionnalité Globale Transversale (Lot 5)
- **Sélecteur Bilingue i18n (`CAND-02`)** : Moteur multilingue ultra-léger (FR / EN) piloté par l'attribut `data-lang` sur `<html>`, persistance locale `localStorage` et bouton d'action dans la navbar.

---

## [2.1.0] — 2026-08-31
### 🛡️ Immunisation Architecturale & Durcissement Graphique (Phase E)

#### 🚀 Correctifs Bloquants (P1)
- **Suppression du voile bloquant `#page-voile`** : Neutralisation de `.page-voile { display: none !important; }` et sécurisation de `initApp()` dans `app.js` avec `try/finally` pour éliminer tout risque d'écran noir.
- **Support universel des tags dans `renderLooks()`** : Traitement polymorphe des tags acceptant indifféremment un tableau `tags: [...]` ou une chaîne `tags: "..."` sans jamais lever de `TypeError`.
- **Restauration de la visibilité et animation du Hero** : Déclaration de `@keyframes heroEntrance` et fixation de `opacity: 1` par défaut sur `.hero-content`.
- **Protection anti-débordement du logo Navbar** : Application de `max-width: calc(100% - 70px)` et troncature `text-overflow: ellipsis` pour empêcher tout nom long de pousser le bouton hamburger hors du viewport (320px–375px).

#### 🎨 Design System & Tokens (P2)
- **Nettoyage des 56 couleurs en dur dans `public.css`** : Remplacement de tous les dégradés or et lueurs fixes par `var(--color-primary)`, `var(--color-accent)`, `var(--color-border)` et `var(--or-glow)`.
- **Fond du menu mobile synchronisé** : `#mobile-nav` utilise désormais `var(--color-overlay)` avec `backdrop-filter: blur(20px)`.
- **Dégradé Hero adaptatif** : `.hero-overlay` dérive dynamiquement vers `var(--color-bg)` avec un contraste optimal.
- **Boutons CTA adaptatifs** : `.btn-primary` et `.btn` supportent les libellés de plus de 50 caractères avec `word-break: break-word` et `max-width: 100%`.
- **Bannière cinématique verrouillée** : `min-height: clamp(260px, 40vw, 520px)` et `object-fit: cover` sur `.cine-banner img`.
- **Sécurisation de la Galerie Vidéo** : Parseur d'URLs YouTube universel supportant `watch?v=`, `youtu.be/` et `embed/`.
- **Purge de la variable obsolète `--gris-pierre`** : Remplacement par `var(--color-text-muted)`.

#### 📐 Finition & Typographie (P3)
- **Token de graisse des titres `--font-heading-weight`** : Permet au Prompt 2 d'ajuster l'épaisseur des polices d'impact (ex: 700 pour `Syne`, 400 pour `Cormorant`).
- **Centrage responsive des grilles Processus impaires** : Alignement flexbox de la dernière rangée pour les listes de 5 étapes.
- **Harmonisation de la modale "Accès Pro"** : Nettoyage des styles inline et application des tokens de surface et typographie.
- **Liaison synchrone de `tokens.css`** : Ajout de `<link rel="stylesheet" href="css/tokens.css">` dans le `<head>` de `index.html`.

---

## [2.0.0] — 2026-08-25
- Architecture modulaire binaire (Offre Essentiel vs Offre Autonome).
- Séparation des contrôleurs de contact et d'administration.
- Intégration FormSubmit et Firebase v8.
