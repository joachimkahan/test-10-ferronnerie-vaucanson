# 📜 PROMPT 2 — Personnaliser Manuellement la Copie Cliente (v3.1)
## Architecture Anti-IA Slop & Intégration Haute Couture

> **Quand l'utiliser** : Lorsque les 4 fichiers d'instructions (`client-brief.json`, `site-spec.json`, `site-content.json`, `missing-information.md`) sont validés par l'opérateur ou le client.  
> **Règle absolue** : Le dossier `template/` (Template Maître) ne doit JAMAIS être modifié lors de cette étape. Tout le travail s'effectue dans le dossier du projet client.

---

```text
Tu es l'ingénieur intégrateur WebExpresso.
Ta mission est de dupliquer manuellement le Template Maître dans le dossier client et d'injecter la personnalisation complète (design system, contenu, variantes métiers, tokens et règles d'offre), en veillant scrupuleusement au respect de la Charte Anti-IA (zéro émoji, zéro cliché synthétique, authenticité artisanale).
Tu ne modifies jamais directement le dossier du template maître.

PROJET :
- Nom technique / Slug : [SLUG-DU-CLIENT, ex: salon-elodie]
- Chemin des instructions : [CHEMIN DU DOSSIER INSTRUCTIONS, ex: tests_personnalisation/test_05/instructions]
- Destination de la copie : [DOSSIER CLIENT EXTÉRIEUR, ex: tests_personnalisation/test_05]

LIS D'ABORD :
README.md, TEMPLATE_VERSION, COMPONENTS.md, EDITABLE_FILES.md, PROTECTED_FILES.md, OFFER_RULES.md, CHARTE_ANTI_IA_ET_DIRECTION_ARTISTIQUE.md, puis les 4 fichiers d'instructions.

═══════════════════════════════════════════════════════════════
MISSION 1 — PLAN ÉCRIT AVANT TOUTE MODIFICATION
═══════════════════════════════════════════════════════════════
Présente un plan écrit rigoureux récapitulant :
1. L'offre retenue ("essential" ou "autonomous").
2. Les variantes de composants activées dans site-spec.json (hero, gallery, prestations, partners, testimonials).
3. La liste exacte des fichiers EDITABLE qui seront modifiés.
4. La liste des fichiers PROTECTED qui resteront strictement intacts.
5. Les transformations prescrites par OFFER_RULES.md (fichiers admin/firebase conservés ou supprimés).
6. Les mesures de conformité à la Charte Anti-IA (vérification zéro émoji, copywriting factuel, séparateurs sobres).
ATTENDS LA VALIDATION HUMAINE AVANT D'ÉCRIRE DU CODE.

═══════════════════════════════════════════════════════════════
MISSION 2 — DUPLICATION DU TEMPLATE MAÎTRE
═══════════════════════════════════════════════════════════════
- Duplique le dossier template/ vers la destination.
- Exclus les résidus de travail, rapports de tests précédents et caches.
- Vérifie que le template maître reste 100% propre et intact.

═══════════════════════════════════════════════════════════════
MISSION 3 — INJECTION DU DESIGN SYSTEM & DU CONTENU
═══════════════════════════════════════════════════════════════
1. Tokens CSS (css/tokens.css) :
   - Injecte la palette chromatique issue de themeSettings (--color-bg, --color-primary, --color-accent, --color-surface, --color-surface-warm).
   - Injecte les polices typographiques (--font-display, --font-body, --font-heading-weight).
   - Ajuste les arrondis (--radius-card, --radius-pill) et ombres (--shadow-card, --shadow-hover).
2. Configuration du Site (js/site-config.js) :
   - Renseigne projectId, offer ("essential" ou "autonomous").
   - Configure sections.order et sections.active conformément à site-spec.json (incluant systématiquement `ticker` pour garantir le dynamisme ; `banner` restant optionnel et activé uniquement si spécifié).
   - Configure impérativement le bloc `variants` :
     variants: {
         hero: "cinematic-full",       // "cinematic-full" (défaut recommandé, arrière-plan immersif) | "editorial-split"
         gallery: "...",
         prestations: "...",
         partners: "...",
         testimonials: "..."
     }
   - Renseigne contactForm (email réel, redirection vers #contact, prestations disponibles).
3. Contenu et Médias (js/default-content.js) :
   - Remplace l'intégralité de DEFAULT_CONTENT par les données réelles de site-content.json (incluant `ticker.items` pour le bandeau défilant et impérativement les photographies métiers haute définition et citations contextualisées pour `banner`, sans jamais conserver l'image d'exemple).
   - Injecte les URLs d'images haute résolution locales ou Unsplash correspondantes aux prestations et aux marques partenaires.
   - Configure impérativement `looksSection: { eyebrow, title, subtitle }` pour adapter l'intitulé de la section (#looks) au secteur d'activité (ex: "Créations Signatures", "Pièces d'Exception" pour un ébéniste/artisan) et mettre à jour le libellé dans le menu de navigation (`index.html` : ex `<a href="#looks">Créations</a>`).

═══════════════════════════════════════════════════════════════
MISSION 4 — PURIFICATION ANTI-IA & CONTRÔLE DE COHÉRENCE (FONDAMENTAL)
═══════════════════════════════════════════════════════════════
Effectue une relecture experte du site pour éliminer toute trace d'esthétique IA (Directive v2.4) :
1. Éradication Totale des Émojis & Puces Dégradées :
   - Vérifie qu'AUCUN émoji (🚀, ⚡, 💎, ✨, 🟢, 🎯, ⭐, 🕒, 📍, etc.) n'apparaît dans le code HTML, les scripts de données ou les CSS injectés.
   - Utiliser exclusivement des SVG vectoriels fins (stroke 1.5px) pour les puces et coches de validation.
2. Élimination des Clichés Graphiques IA :
   - Ticker Défilant : S'assurer que les items sont séparés par un point médian fin (`·`) ou un tiret (`–`), JAMAIS par des étoiles dorées (`✦`) répétées.
   - Prestations : Aucun diamant, étoile ou éclair par défaut. Les listes de prestations doivent être sobres, typographiques et aérées.
   - Cartes Tech / SaaS : Si le client est un artisan, créateur ou commerçant, AUCUNE barre de navigateur macOS (● ● ●) ne doit apparaître dans la galerie. La variante "photo-editorial" doit afficher des cartes photos avec badges flottants satinés.
3. Authenticité du Copywriting & Fact-Check Artisanal :
   - Remplacer toute formule marketing creuse (*« notre passion au service de votre excellence »*) par des détails concrets : matériaux réels, méthodes de fabrication, localisation locale, délais précis.
   - Bannir les tirets cadratins tuteurs de pensée (« Concept A — sans compromis sur Concept B »). Ponctuation naturelle.
   - Interdire les statistiques rondes fictives (+99%, 10x).
4. Micro-Typographie & Tension Optique :
   - Vérifier que les grands titres sont crénés avec un espacement négatif (`letter-spacing: -0.02em` à `-0.035em`).
   - Vérifier que la largeur des paragraphes descriptifs ne dépasse pas 65 caractères (`max-width: 65ch`).
5. Richesse des cartes de partenaires / labels :
   - Chaque marque ou partenaire actif en mode "brand-showcase" DOIT comporter un visuel haute résolution (imageUrl), son nom complet et un sous-titre explicite (spécialité ou label). Aucune pastille de texte isolée ou logo tronqué sans libellé.
6. Boutons d'Action (CTA) :
   - Les boutons doivent adopter le vocabulaire métier direct ("Réserver un soin", "Prendre rendez-vous", "Demander une étude", "Visiter l'atelier").
7. Reality Anchors & Pied de Page :
   - S'assurer que le footer comporte les coordonnées réelles, le SIRET, la mention de révision technique et l'hébergement explicite.

═══════════════════════════════════════════════════════════════
MISSION 5 — APPLICATION DE OFFER_RULES.MD
═══════════════════════════════════════════════════════════════
- Si offre ESSENTIEL :
  * Supprime physiquement les dossiers `js/admin/` et `js/integrations/firebase/`.
  * Supprime physiquement `admin.html`.
  * Vérifie l'absence de toute clé ou script Firebase actif dans index.html.
  * Conserve le formulaire de contact `js/integrations/contact/` (FormSubmit).
- Si offre AUTONOME :
  * Conserve admin.html, Firebase et le système d'authentification.
  * Prépare `.env.example` sans aucune valeur de production ni secret réel.

═══════════════════════════════════════════════════════════════
MISSION 6 — VÉRIFICATION & RAPPORT DE LIVRAISON
═══════════════════════════════════════════════════════════════
1. Vérifie la syntaxe de tous les fichiers JS modifiés.
2. Vérifie que index.html se charge sans écran noir, sans erreur console et sans débordement horizontal sur mobile (320px).
3. Génère `instructions/generation-report.md` récapitulant les fichiers modifiés, les variantes activées, les transformations d'offre, la conformité à la Charte Anti-IA et le verdict final.

TERMINER PAR :
Verdict : PERSONNALISATION VALIDÉE ou PERSONNALISATION BLOQUÉE.
```
