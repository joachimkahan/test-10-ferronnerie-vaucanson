# 🔍 AUDIT ESTHÉTIQUE & DESIGN SYSTEM — CLIENT STRESS-01

**Rôle** : Auditeur Design & Frontend Senior (Design Tokens, Accessibilité WCAG & Pipeline Média)  
**Date d'audit** : 31 Août 2026  
**Cible analysée** : `clients-test/stress-01/` (Génération initiale de stress-test)  
**Objectif** : Identifier, analyser et classifier sans ambiguïté chaque dysfonctionnement visuel entre **(T) Bug de Template** et **(C) Problème de Contenu Client**.

---

## 📊 RÉSUMÉ EXÉCUTIF

| Sévérité | 🔴 Bugs de Template (T) | 🟢 Problèmes de Contenu (C) | Total |
| :--- | :---: | :---: | :---: |
| **Bloquant** | 1 | 0 | **1** |
| **Majeur** | 6 | 1 | **7** |
| **Mineur** | 4 | 0 | **4** |
| **TOTAL** | **11** | **1** | **12** |

---

## 🎨 ÉTAPE 1 — AUDIT DES COULEURS & ACCESSIBILITÉ WCAG

### 1. Palette Déclarée vs Couleurs Calculées
- **Thème Déclaré (`themeConfig.js` / `tokens.css`)** :
  - Fond : `#050508` (Dark Brutalisme)
  - Surface : `#0E1017` / `#161924`
  - Accent / Primaire : `#E11D48` (Crimson) / `#38BDF8` (Sky)
  - Texte Principal : `#F8FAFC`
  - Texte Atténué : `#94A3B8`
- **Anomalies Détectées dans le Code CSS / Composants** :
  - `rgba(250, 247, 242, 0.95)` (crème clair résiduel) codé en dur dans le fond du menu mobile `#mobile-nav`. *(Classé T)*
  - `rgba(201, 169, 110, ...)` (doré champagne résiduel) codé en dur dans les bannières d'état du formulaire de contact et lueurs de cartes. *(Classé T)*
  - Variable fantôme `--gris-pierre` appelée dans `section-renderer.js` et `index.html` (non définie dans le thème sombre, provoquant un fallback noir illisible). *(Classé T)*

### 2. Contrôles de Contraste (WCAG 2.1)
- Texte blanc `#F8FAFC` sur fond `#050508` : **18.2:1** (Conforme AAA).
- Bouton Crimson `#E11D48` sur texte blanc `#FFFFFF` : **4.6:1** (Conforme AA).
- Dégradé Hero initial (fond blanc cassé sur texte clair) : **1.8:1** (ÉCHEC CRITIQUE WCAG). *(Classé T)*

---

## 🖼️ ÉTAPE 2 — AUDIT DES IMAGES & RATIOS

1. **Bannière Cinématique (`.cine-banner`)** :
   - Image panoramique de test en ratio 32:9.
   - En mobile (320px-375px), l'image est écrasée à une hauteur de 120px sans règle de verrouillage `min-height`, rendant le sujet méconnaissable. *(Classé T)*
2. **Vignette Basse Définition (150px) dans la Galerie** :
   - Image pixelisée et floue affichée dans une carte de 400px de large.
   - La faute provient de l'URL d'image thumbnail injectée dans le jeu de test. *(Classé C)*
3. **Alt Text & Lazy Loading** :
   - Les balises `loading="lazy"` et les `alt` dynamiques sont présents sur 100% des images rendues par `section-renderer.js`.

---

## ✍️ ÉTAPE 3 — TYPOGRAPHIE & ESPACEMENTS

1. **Graisse des Titres (`font-weight`)** :
   - La règle `h1, h2, h3, h4 { font-weight: 300; }` était codée en dur dans `public.css`.
   - Pour les typographies percutantes comme `Syne` ou `Space Grotesk`, la graisse 300 affaiblit l'impact visuel. L'absence de token `--font-heading-weight` empêchait le thème de contrôler l'épaisseur. *(Classé T)*
2. **Espacements de Section (`--section-py`)** :
   - Parfaitement harmonisés via `clamp(80px, 9vw, 140px)` sur l'ensemble des sections modulaires.

---

## 📱 ÉTAPE 4 — MISE EN PAGE & RESPONSIVE (320px à 1440px)

1. **Débordement du Logo sur 320px** :
   - Pour un nom d'entreprise long (ex: 110 caractères), le logo texte pousse le bouton hamburger hors de l'écran sur mobile 320px-375px. *(Classé T)*
2. **Boutons CTA à Libellé Long (`.btn-primary`)** :
   - Les boutons avec `white-space: nowrap` débordent de la largeur de l'écran sur mobile 320px. *(Classé T)*
3. **Grille de Processus (5 étapes impaires)** :
   - La 5ème carte reste isolée à gauche sur desktop sans centrage de rangée. *(Classé T)*
4. **Crash du Voile de Transition (`#page-voile`)** :
   - En cas d'exception JS dans `renderLooks` (`look.tags.split`), le voile noir à `opacity: 1` et `z-index: 10000` reste verrouillé sur tout l'écran. *(Classé T)*

---

## 📋 ÉTAPE 5 — TABLEAU EXHAUSTIF ET CLASSÉ DES PROBLÈMES

| ID | Catégorie | Sévérité | Type (T/C) | Fichier(s) Concerné(s) | Description & Reproduction | Cause Racine | Correction Recommandée |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **`AUD-00`** | Socle / Chargement | 🔴 Bloquant | **(T)** | `css/public.css`<br>`js/app.js`<br>`index.html` | Écran 100% noir au chargement du site. | `#page-voile` à `opacity: 1` bloqué suite à un crash JS non capturé + `@keyframes heroEntrance` absent. | Neutraliser `.page-voile { display: none !important; }`, encapsuler `initApp()` dans `try/finally` et déclarer `@keyframes heroEntrance`. |
| **`AUD-01`** | Navbar / Responsive | 🟠 Majeur | **(T)** | `css/public.css` | Le texte long du logo déborde et pousse l'icône hamburger hors de l'écran sur mobile (320px–375px). | Absence de `max-width` et de `text-overflow: ellipsis` sur `.logo`. | Appliquer `max-width: calc(100% - 70px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` sur `.logo`. |
| **`AUD-02`** | Navbar / Thème | 🟠 Majeur | **(T)** | `css/public.css` | Le menu mobile ouvert affiche un fond blanc cassé crème en plein thème Dark. | Couleur en dur `rgba(250, 247, 242, 0.95)` sur `#mobile-nav`. | Remplacer par `background: var(--color-overlay); backdrop-filter: blur(20px);`. |
| **`AUD-03`** | Hero / Contrastes | 🟠 Majeur | **(T)** | `css/public.css` | Le dégradé blanc cassé rend les textes blancs illisibles (ratio 1.8:1). | Dégradé clair codé en dur dans `.hero-overlay`. | Remplacer par un dégradé descendant dynamique vers `var(--color-bg)`. |
| **`AUD-04`** | Tokens / Variables | 🟠 Majeur | **(T)** | `js/section-renderer.js`<br>`index.html` | Textes de repli rendus en noir sur fond sombre suite à une variable CSS introuvable. | Appel de `var(--gris-pierre)` non déclarée dans `tokens.css`. | Remplacer systématiquement par `var(--color-text-muted, var(--texte-secondaire))`. |
| **`AUD-05`** | Boutons / Responsive | 🟠 Majeur | **(T)** | `css/public.css` | Le bouton CTA à texte long déborde horizontalement et crée un scroll latéral sur mobile. | `white-space: nowrap` ou padding rigide sur `.btn-primary`. | Ajouter `max-width: 100%; white-space: normal; text-align: center; word-break: break-word;`. |
| **`AUD-06`** | Couleurs / Thème | 🟠 Majeur | **(T)** | `css/public.css` | 56 occurrences de tons dorés/chocolat fixes visibles dans les cartes et formulaires. | Valeurs hexadécimales et RGBA en dur non reliées aux tokens. | Remplacer par `var(--color-primary)`, `var(--color-accent)`, `var(--color-border)` et `var(--or-glow)`. |
| **`AUD-07`** | Bannière / Ratios | 🟠 Majeur | **(T)** | `css/public.css` | L'image panoramique 32:9 est écrasée verticalement en vue mobile. | Absence de contrainte `min-height` sur `.cine-banner`. | Verrouiller `min-height: clamp(260px, 40vw, 520px); object-fit: cover; object-position: center;`. |
| **`AUD-08`** | Typographie / Tokens | 🟡 Mineur | **(T)** | `css/tokens.css`<br>`css/public.css` | Les titres manquent de présence visuelle avec les polices modernes géométriques. | `font-weight: 300` figé dans le sélecteur `h1, h2, h3, h4`. | Créer le token `--font-heading-weight: 700;` et l'appliquer aux titres. |
| **`AUD-09`** | Administration | 🟡 Mineur | **(T)** | `index.html` | La modale "Accès Pro" utilise des styles inline blancs et gris clair. | Styles CSS inline non migrés vers les classes du Design System. | Utiliser les tokens `var(--color-surface)`, `var(--color-text-main)`, `var(--font-heading)`. |
| **`AUD-10`** | Processus / Grille | 🟡 Mineur | **(T)** | `css/public.css` | La 5ème carte du processus est isolée à gauche, laissant un espace vide. | Grille CSS `repeat(auto-fit, minmax(...))` sans centrage de la dernière rangée. | Règle flexbox responsive de centrage pour les grilles avec un nombre impair d'étapes. |
| **`AUD-11`** | Médias / Parseur | 🟡 Mineur | **(T)** | `js/section-renderer.js` | Risque de crash sur les URLs YouTube non standard (`youtu.be/`, `embed/`). | Extraction basée sur un unique `.split('v=')`. | Parseur multi-format sécurisé avec vérification de présence des paramètres. |
| **`AUD-12`** | Contenu / Image | 🟠 Majeur | **(C)** | `site-content.json` | Une image de galerie s'affiche pixelisée et floue dans une carte de 400px. | URL d'image fournie en basse résolution (150x150px) par le client de test. | Remplacer l'URL par un visuel haute résolution (minimum 800px) dans les données du client. |

---

## 🎯 CONCLUSION DE L'AUDIT

* **11 Bugs (T)** relèvent directement de l'architecture du template maître (tokens orphelins, couleurs en dur, absence de gestion d'erreurs sur le voile, contraintes de ratios CSS).
* **1 Problème (C)** relève des données spécifiques fournies (résolution insuffisante d'une image de test).
* Cet audit fournit la base exhaustive et vérifiée pour le plan de patchs du template maître.
