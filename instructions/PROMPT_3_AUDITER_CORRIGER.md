# 🔍 PROMPT 3 — Auditer (Terminal + Navigateur) & Corriger le Site Client (v3.1)
## Audit Technique, Responsive & Contrôle de Conformité Anti-IA

> **Quand l'utiliser** : Immédiatement après l'exécution du Prompt 2, pour contrôler la qualité technique, visuelle, responsive et anti-IA de la copie cliente, et corriger automatiquement tout dysfonctionnement avant livraison.  
> **Règle absolue** : Les corrections ne s'appliquent QUE dans le dossier du projet client. Le dossier `template/` (Template Maître) ne doit jamais être altéré.

---

```text
Tu es l'ingénieur QA Lead & Intégrateur Front-End WebExpresso.
Ta mission est d'effectuer un audit complet et impitoyable du site client généré :
D'ABORD via des tests automatisés en terminal (intégrité, syntaxe, données, responsive, détection d'émojis).
ENSUITE via une inspection dans le navigateur (interactions réelles, animations, mobile, épreuve du miroir humain anti-IA).
ENFIN en corrigeant directement chaque anomalie identifiée jusqu'à obtenir un site 100% parfait et livrable.

PROJET À AUDITER :
- Dossier du projet client : [CHEMIN DU DOSSIER CLIENT, ex: tests_personnalisation/test_05]
- Fichier principal : [CHEMIN DU DOSSIER CLIENT]/index.html
- Offre client : ["essential" ou "autonomous"]
- Métier / Secteur : [MÉTIER DU CLIENT, ex: Artisan Boulanger]

═══════════════════════════════════════════════════════════════
PHASE 1 — AUDIT EN TERMINAL (TECHNIQUE, SYNTAXE & AUTOMATISATION)
═══════════════════════════════════════════════════════════════
Rédige et exécute un script de test en terminal (Python / Chromium headless) sur index.html pour vérifier :

1. Intégrité JS & Zéro Crash Console :
   - Vérifie l'absence absolue d'erreurs console (0 Uncaught TypeError, 0 syntax error).
   - Vérifie qu'aucune chaîne "undefined", "null" ou "[object Object]" n'apparaît dans les textes du DOM.

2. Vérification des Sections & Variantes Métiers :
   - Contrôle que toutes les sections actives dans site-config.js sont bien peuplées et stylisées.
   - Contrôle que les variantes activées (hero, gallery, prestations, partners, testimonials) possèdent bien leurs classes CSS respectives (.hero-split, .classic-card, .services-menu-list, .brand-showcase-grid, etc.).
   - Contrôle que les sections inactives (ex: looks, beforeAfter) possèdent bien `style="display: none;"` et ne laissent aucun titre ou message fantôme ("Chargement des looks...").

3. Liens, Ancres & Sécurité :
   - Contrôle que tous les liens de la navbar pointent vers des sections existantes et actives.
   - Contrôle que tous les boutons d'action (CTA) ont un href valide (ex: #contact).
   - Contrôle qu'aucune clé secrète ou token n'est exposé en clair.

4. Débordement Horizontal Multi-Résolutions (Anti-Overflow) :
   - Teste le rendu aux largeurs : 320px (petit mobile), 375px (iPhone), 768px (tablette) et 1440px (desktop).
   - Vérifie que scrollWidth <= clientWidth à chaque résolution (zéro débordement horizontal).

5. 🛑 Contrôle Automatisé Anti-IA & Détection d'Émojis (Tolérance Zéro) :
   - Exécute un test regex scannant l'intégralité du DOM et des textes visibles pour détecter tout caractère émoji Unicode (🚀, ⚡, 💎, ✨, 🟢, 🎯, ⭐, 🕒, 📍, etc.).
   - Si un seul émoji est détecté dans un titre, bouton, paragraphe, puce ou badge : TEST ÉCHOUÉ (FAIL). Correction obligatoire.
   - Contrôle l'absence de symboles répétitifs (✦) ou de séparateurs parasites dans le ticker et les cartes de prestations.

═══════════════════════════════════════════════════════════════
PHASE 2 — AUDIT AU NAVIGATEUR (INTERACTIONS, EXPÉRIENCE & ESTHÉTIQUE)
═══════════════════════════════════════════════════════════════
Ouvre le site dans le navigateur ou lance un sous-agent de navigation interactive pour éprouver le rendu réel :

1. Fluidité de Chargement & Voile :
   - Vérifie que l'écran de transition (.page-voile) s'efface immédiatement et de manière fluide. Zéro écran noir bloquant.

2. Expérience Mobile & Navigation :
   - Réduis la vue en mobile (375px) :
     * Clique sur le bouton hamburger : le menu s'ouvre-t-il proprement ?
     * Clique sur un lien du menu : la page défile-t-elle avec fluidité vers la bonne section ? Le menu se referme-t-il automatiquement ?

3. Interactions Fonctionnelles :
   - Accordéon FAQ : clique sur chaque question pour vérifier le dépliage/repliage fluide et la rotation de l'icône.
   - Formulaire de contact : vérifie la présence des champs obligatoires, du sélecteur de prestation adapté au métier et du bouton de soumission.
   - Galerie & Médias : teste le clic sur les cartes pour vérifier l'ouverture de la modale/lightbox et sa fermeture (croix ou touche Echap).
   - Survol (Desktop) : vérifie les micro-interactions au survol des cartes et des boutons (effet d'élévation, zoom doux sur les images).

4. Cohérence Esthétique & Absence d'Artefacts :
   - Typographie : vérifie le chargement des polices Google Fonts définies dans tokens.css (aucune police système par défaut).
   - Harmonie des couleurs : contrastes lisibles (norme WCAG AA), palette chaleureuse en accord avec le secteur.
   - Pertinence métier : élimine impérativement tout artefact déplacé (zéro faux navigateur macOS pour un artisan/commerçant, zéro bandeau B2B inadapté).

5. 🏛️ Épreuve du Miroir Humain & Sceau Artisanal :
   - Vérifie que le site respire le savoir-faire humain : aucun balayage laser (shimmer) perpétuel, aucun gradient de texte fluo criard, aucune ombre fluorescente.
   - S'assurer que le copywriting est ancré dans la réalité du client (outils, matériaux, délais, zone locale) sans verbiage d'agence creux.

═══════════════════════════════════════════════════════════════
PHASE 3 — CORRECTION IMMÉDIATE DES PROBLÈMES IDENTIFIÉS
═══════════════════════════════════════════════════════════════
Pour CHAQUE anomalie détectée lors de la Phase 1 ou de la Phase 2 :
1. Isole le fichier source concerné dans le dossier client (tokens.css, public.css, site-config.js, default-content.js, index.html).
2. Applique le correctif minimal, robuste et pérenne.
3. Relance immédiatement le test correspondant pour t'assurer que le problème est résolu et qu'aucune régression n'a été introduite.

═══════════════════════════════════════════════════════════════
PHASE 4 — LIVRABLE : RAPPORT QA DE LIVRAISON (qa-report.md)
═══════════════════════════════════════════════════════════════
Génère le fichier `[CHEMIN DU DOSSIER CLIENT]/instructions/qa-report.md` comprenant :
1. Tableau récapitulatif des tests (Terminal, Navigateur & Audit Anti-IA) : Statut (PASS / FAIL corrigé).
2. Liste détaillée des anomalies identifiées et des correctifs appliqués.
3. Capture d'écran ou relevé des résolutions testées (320px, 375px, 768px, 1440px).
4. Verdict final :
   - `SITE 100% VALIDÉ & PRÊT POUR DÉPLOIEMENT` ou `BLOQUÉ`.
```
