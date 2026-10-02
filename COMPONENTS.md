# COMPONENTS.MD — Catalogue des Composants et Sections du Template Maître

> **Version du Template** : 2.3.0  
> **Usage** : Document de référence pour l'IA (Antigravity) et les développeurs lors de l'exécution du **Prompt 2** (Personnalisation Client).  
> Il spécifie chaque composant disponible, ses contrats de données, ses variantes, ses dépendances et sa compatibilité par offre (**Essentiel** vs **Autonome**).

---

## 1. Vue d'Ensemble des Sections

| Identifiant Section | Rôle Principal | Source de Données | Essentiel | Autonome | Administrable CMS |
|---|---|---|---|---|---|
| `meta` | Métadonnées SEO et `<head>` | `DEFAULT_CONTENT.meta` / `site-config.js` | ✅ Inclus | ✅ Inclus | ❌ Non |
| `navbar` | Barre de navigation et menu mobile | `DEFAULT_CONTENT.identity` / `site-config.js` | ✅ Inclus | ✅ Inclus | ❌ Non |
| `hero` | Accroche visuelle plein écran ou asymétrique | `DEFAULT_CONTENT.hero` | ✅ Inclus | ✅ Inclus | ❌ Non |
| `ticker` | Bandeau défilant dynamique (Marquee Peps) | `DEFAULT_CONTENT.ticker` | ✅ Inclus | ✅ Inclus | ❌ Non |
| `about` | Présentation éditoriale & signature | `DEFAULT_CONTENT.about` | ✅ Inclus | ✅ Inclus | ❌ Non |
| `banner` | Bannières cinématiques de transition enrichies | `DEFAULT_CONTENT.banner` | ✅ Inclus | ✅ Inclus | ❌ Non |
| `looks` | Onglets éditoriaux "Looks Signature" | `SiteContent.getLooks()` | ✅ Inclus | ✅ Inclus | ✅ **Oui** |
| `beforeAfter` | Comparateur interactif Glow Slider | `SiteContent.getBeforeAfter()` | ✅ Inclus | ✅ Inclus | ✅ **Oui** |
| `gallery` | Grille portfolio & Lightbox | `SiteContent.getGallery()` | ✅ Inclus | ✅ Inclus | ✅ **Oui** |
| `prestations` | Grille des services et tarifs | `SiteContent.getPrestations()` | ✅ Inclus | ✅ Inclus | ✅ **Oui** |
| `timeline` | Frise chronologique parcours & savoir-faire | `SiteContent.getTimeline()` | ✅ Inclus | ✅ Inclus | ✅ **Oui** |
| `contact` | Formulaire sécurisé FormSubmit | `js/integrations/contact/` | ✅ Inclus | ✅ Inclus | ❌ Non |
| `footer` | Pied de page & copyright | `DEFAULT_CONTENT.footer` | ✅ Inclus | ✅ Inclus | ❌ Non |
| `admin` | Tableau de bord CRUD & Sécurité | `js/admin/`, `admin.html` | ❌ **Supprimé** | ✅ Inclus | N/A (Espace Pro) |

---

## 2. Spécification Détaillée des Sections

### 2.1. `meta` — Métadonnées SEO & En-tête
- **Fichier de rendu** : `js/section-renderer.js` (`renderMeta()`)
- **Rôle** : Injection dynamique des balises `<title>`, `<meta name="description">` et attributs de langue.
- **Contrat de données** :
  - `title` (`string`, requis, défaut: `"Beauté Éditoriale & Sur-Mesure"`) : 10 à 70 caractères.
  - `description` (`string`, requis, défaut: `""`) : 50 à 160 caractères.
  - `lang` (`string`, requis, défaut: `"fr"`) : Code langue ISO 639-1.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)
- **Dépendances** : `js/default-content.js`, `js/site-config.js`.

---

### 2.2. `navbar` — Navigation, Identité Visuelle & Menu Mobile
- **Fichier HTML / JS** : `index.html` (`<nav class="navbar">`) + `js/app.js` (`applySiteConfig()`)
- **Rôle** : Navigation fluide, ancres d'accès rapide, affichage automatique du logo client et menu hamburger responsive.
- **Contrat de données** :
  - `branding.logoUrl` (`string`, optionnel, défaut: `""`) : Chemin du logo vectoriel ou image (ex: `"assets/logo.svg"`, `"assets/logo.png"`). Si renseigné, injecté automatiquement dans `.logo` avec l'icône de marque (`.nav-logo-icon`).
  - `branding.displayMode` (`string`, optionnel, défaut: `"icon-and-text"`) : Mode d'affichage (`"icon-and-text"`, `"logo-only"`, `"text-only"`).
  - `branding.faviconUrl` (`string`, optionnel, défaut: `""`) : Chemin du favicon SVG/PNG (ex: `"assets/favicon.svg"`).
  - `logoText` (`string`, requis, défaut: `identity.name`) : Nom textuel de l'entreprise affiché à côté du logo ou seul en repli.
  - `navLinks` (`array`, requis) : Liens d'ancrage (`#accueil`, `#apropos`, `#looks`, `#galerie`, `#prestations`, `#contact`).
- **Compatibilité** : Essentiel (✅) | Autonome (✅)
- **Variantes** : Fixe transparente avec flou d'arrière-plan (*glassmorphism*).

---

### 2.3. `hero` — Section d'Accroche Plein Écran
- **Fichier de rendu** : `js/section-renderer.js` (`renderHero()`) + `css/public.css`
- **Rôle** : Première impression visuelle, titre d'impact et call-to-action principal.
- **Variantes** :
  - `cinematic-full` (défaut & standard recommandé) : Arrière-plan photographique plein écran immersif avec filtre dégradé adaptatif vers `--color-bg`, centrage typographique et impact visuel immédiat (recommandé pour tous les métiers pour maximiser l'immersion).
  - `editorial-split` (`variant: "editorial-split"`) : Disposition asymétrique moderne 50/50 (accroche textuelle à gauche, visuel portrait ou photo d'ambiance encadré à droite).
- **Contrat de données** :
  - `eyebrow` (`string`, optionnel, défaut: `""`) : Surtitre élégant (ex: `"Makeup Artist · Paris"`).
  - `titleHtml` (`string`, requis, défaut: `""`) : Titre principal acceptant les balises d'emphase `<em>`.
  - `description` (`string`, requis, défaut: `""`) : Sous-titre descriptif (10 à 300 caractères).
  - `ctaText` (`string`, requis, défaut: `"Prendre rendez-vous"`) : Libellé du bouton d'action.
  - `ctaLink` (`string`, requis, défaut: `"#contact"`) : Ancre de redirection.
  - `secondaryCta` (`object`, optionnel) : Second bouton d'action / téléchargement direct :
    - `enabled` (`boolean`, défaut: `false`) : Activation du second bouton.
    - `text` (`string`, requis si actif) : Libellé (ex: `"Télécharger la brochure"`).
    - `url` (`string`, requis si actif) : Chemin du document ou lien direct.
    - `isDownload` (`boolean`, optionnel) : Déclenche le téléchargement du fichier via l'attribut `download`.
    - `filename` (`string`, optionnel) : Nom du fichier proposé lors du téléchargement.
  - `imageUrl` (`string`, requis, format URL https ou relative) : Visuel d'arrière-plan haute définition.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.4. `ticker` — Bandeau Défilant Dynamique (Marquee Peps)
- **Fichier de rendu** : `js/section-renderer.js` (`renderTicker()`) + `css/public.css`
- **Rôle** : Séparateur dynamique continu insufflant du mouvement et mettant en valeur les spécialités, garanties et mots-clés phares de l'entreprise.
- **Animation** : Défilement infini fluide 60fps en CSS pur (`@keyframes tickerScroll`), mise en pause automatique au survol du curseur.
- **Contrat de données** :
  - `enabled` (`boolean`, défaut: `true`) : Activation du composant.
  - `items` (`array[string]`, requis, 4 à 8 entrées) : Liste de mots-clés ou engagements séparés par un point médian sobre (`·`) ou un tiret fin (`–`), sans aucun émoji ni étincelle.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.5. `about` — Section À Propos & Signature
- **Fichier de rendu** : `js/section-renderer.js` (`renderAbout()`)
- **Rôle** : Présentation du professionnel, philosophie artistique, citation inspirante et signature.
- **Contrat de données** :
  - `eyebrow` (`string`, optionnel, défaut: `"À propos"`) : Surtitre.
  - `titleHtml` (`string`, requis) : Titre de la section avec emphase.
  - `paragraphs` (`array[string]`, requis, min 1, max 4) : Corps du texte de présentation.
  - `quote` (`string`, optionnel, défaut: `""`) : Citation mise en avant (*pull quote*).
  - `signature` (`string`, optionnel, défaut: `""`) : Nom ou signature stylisée.
  - `imageUrl` (`string`, requis) : Portrait professionnel ou photo d'ambiance.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.6. `banner` — Bannières Cinématiques de Transition
- **Fichier de rendu** : `js/section-renderer.js` (`renderBanner()`) + `css/public.css`
- **Rôle** : Séparateurs visuels immersifs créant une respiration et rythmant le défilement entre les grands blocs du site.
- **Effets** : Ratio verrouillé responsive (`clamp(280px, 36vh, 440px)`), zoom doux au survol (`scale(1.03)`), dégradé protecteur de contraste et typographie en surimpression.
- **Contrat de données** :
  - `imageUrl` (`string`, requis) : Image panoramique (16:9, 21:9 ou 32:9).
  - `alt` (`string`, requis) : Texte alternatif d'accessibilité.
  - `eyebrow` (`string`, optionnel) : Surtitre en majuscules aérées.
  - `quote` (`string`, optionnel) : Citation ou promesse d'excellence en italique.
  - `author` (`string`, optionnel) : Sous-titre ou signature de réassurance.
  - `secondary` (`object`, optionnel) : Configuration d'une 2ème bannière stratégique (mêmes propriétés `imageUrl`, `alt`, `eyebrow`, `quote`, `author`).
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.6. `looks` — Onglets Éditoriaux "Looks Signature"
- **Fichier de rendu** : `js/section-renderer.js` (`renderLooks()`) + `js/app.js` (gestion des onglets)
- **Rôle** : Présentation par onglets des styles créés avec photo principale, détails et tags de matières.
- **Contrat de données** (`lookItem` versionné v1) :
  - `id` (`string`, requis, stable) : Identifiant unique (ex: `"look-1"`).
  - `title` (`string`, requis, 3 à 120 car.) : Titre du look.
  - `subtitle` (`string`, requis, 3 à 120 car.) : Sous-titre de l'onglet.
  - `description` (`string`, requis, 10 à 600 car.) : Description technique et artistique.
  - `heroImageUrl` (`string`, requis) : Visuel grand format du look.
  - `detailImage1Url` (`string`, optionnel) : Zoom texture / détail 1.
  - `detailImage2Url` (`string`, optionnel) : Zoom texture / détail 2.
- **Personnalisation dynamique de l'en-tête** (`looksSection` dans `DEFAULT_CONTENT` / `site-content.json`) :
  - `eyebrow` (`string`, optionnel, ex: `"Collection"` ou `"Mobilier d'Art"`) : Surtitre au-dessus du titre principal.
  - `title` (`string`, optionnel, ex: `"Créations Signatures"`, `"Pièces d'Exception"` ou `"Looks Signature"`) : Titre principal de la section adapté au corps de métier du client.
  - `subtitle` (`string`, optionnel, ex: `"Découvrez nos réalisations phares façonnées à l'atelier."`) : Sous-titre descriptif.
- **Compatibilité** : Essentiel (✅ statique) | Autonome (✅ dynamique Firestore / CMS)

---

### 2.7. `beforeAfter` — Comparateur Interactif Glow Slider
- **Fichier de rendu** : `js/section-renderer.js` (`renderBeforeAfter()`) + `js/app.js`
- **Rôle** : Slider de comparaison interactif "Avant / Après" avec poignée tactile et souris.
- **Contrat de données** (`beforeAfterItem` versionné v1) :
  - `id` (`string`, requis, stable) : Identifiant unique (ex: `"ba-1"`).
  - `title` (`string`, requis, 2 à 100 car.) : Nom de la transformation.
  - `beforeUrl` (`string`, requis) : Image de l'état initial.
  - `afterUrl` (`string`, requis) : Image du résultat final.
- **Compatibilité** : Essentiel (✅ statique) | Autonome (✅ dynamique Firestore / CMS)

---

### 2.8. `gallery` — Galerie Portfolio, Bento & Études de Cas
- **Fichier de rendu** : `js/section-renderer.js` (`renderGallery()`) + `js/app.js` (Lightbox & Modale Étude de Cas)
- **Rôle** : Grille dynamique affichant photos, mockups de navigateurs ou intégrations vidéos (YouTube/Vimeo) avec liens cliquables externes, agrandissement plein écran, téléchargement de documents techniques ou modale d'étude de cas détaillée.
- **Variantes** :
  - `photo-editorial` (défaut artisans/beauté/créateurs) : Cartes photos généreuses avec badge flottant translucide satiné, micro-zoom fluide au survol et lightbox intégrée.
  - `browser-mockup` (`variant: "browser-mockup"`, recommandé tech/web/logiciel) : Cadre fenêtre avec points macOS (`● ● ●`) et barre d'URL cliquable.
  - `bento` (`variant: "bento"`) : Disposition asymétrique moderne mettant en valeur le projet phare.
- **Contrat de données** (`galleryItem` versionné v2) :
  - `id` (`string`, requis, stable) : Identifiant unique (ex: `"gal-1"`).
  - `title` (`string`, requis, 2 à 100 car.) : Titre de la réalisation.
  - `type` (`enum: 'image' | 'video'`, requis, défaut: `'image'`).
  - `url` (`string`, requis) : URL de l'image (https / DataURL / chemin local) ou du média vidéo.
  - `description` (`string`, optionnel) : Brève explication du projet.
  - `badge` (`string`, optionnel) : Badge d'état sobre (ex: `"Livraison 2026"`, `"Rénovation Clé en Main"`).
  - `displayUrl` (`string`, optionnel) : URL raccourcie affichée dans la barre de navigateur.
  - `targetUrl` (`string`, optionnel) : Lien hypertexte ouvrant le site réel dans un nouvel onglet.
  - `documentUrl` (`string`, optionnel) : URL du fichier joint (plaquette, rapport PDF, fiche technique).
  - `documentLabel` (`string`, optionnel) : Libellé du document affiché sur le bouton d'action.
  - `caseStudy` (`object`, optionnel) : Modale détaillée d'étude de cas :
    - `enabled` (`boolean`, défaut: `false`) : Activation de l'étude de cas.
    - `badge` (`string`, optionnel) : Surtitre ou tag dans la modale.
    - `subtitle` (`string`, optionnel) : Sous-titre explicatif.
    - `specs` (`array[{ label, value }]`, optionnel) : Métriques et indicateurs clés.
    - `fullDescription` (`string`, optionnel) : Texte complet du cas client.
    - `galleryImages` (`array[{ url, caption }]`, optionnel) : Galerie de visuels secondaires.
  - `tags` (`array[string]`, optionnel) : Mots-clés / technologies associées.
- **Compatibilité** : Essentiel (✅ statique) | Autonome (✅ dynamique Firestore / CMS)

---

### 2.9. `prestations` — Grille des Tarifs & Domaines d'Expertise
- **Fichier de rendu** : `js/section-renderer.js` (`renderPrestations()`)
- **Rôle** : Affichage clair des offres commerciales sous forme de cartes élégantes avec icône, détails, liste de fonctionnalités et prix, présentation axée savoir-faire, ou carte de soins / menu.
- **Variantes** :
  - `pricing-cards` (défaut) : Cartes tarifaires avec prix et inclusions.
  - `cards-expertise` (`variant: "cards-expertise"`) : Cartes orientées conseil/savoir-faire (prix masqué au profit des compétences clés et CTA sur-mesure).
  - `menu-list` (`variant: "menu-list"`, recommandé beauté, coiffure, spas, restaurants) : Liste épurée en ligne avec filet pointillé et prix alignés à droite.
- **Contrat de données** (`prestationItem` versionné v2) :
  - `id` (`string`, requis, stable) : Identifiant unique (ex: `"presta-1"`).
  - `icon` (`string`, optionnel, défaut: `""`) : Symbole typographique ou numérotation fine d'atelier. Zéro émoji.
  - `title` (`string`, requis, 2 à 100 car.) : Intitulé de la prestation ou de l'expertise.
  - `description` (`string`, requis, 10 à 400 car.) : Descriptif des prestations.
  - `price` (`string`, optionnel en mode expertise, requis sinon) : Tarif affiché.
  - `badge` (`string`, optionnel) : Badge de mise en avant.
  - `features` / `skills` (`array[string]`, optionnel) : Liste des bénéfices, compétences ou livrables.
- **Compatibilité** : Essentiel (✅ statique) | Autonome (✅ dynamique Firestore / CMS)

---

### 2.10. `testimonials` — Témoignages & Avis Clients Étoilés (Optionnel)
- **Fichier de rendu** : `js/section-renderer.js` (`renderTestimonials()`)
- **Rôle** : Réassurance commerciale forte par l'affichage d'avis clients avec note en étoiles, commentaire, auteur et date.
- **Variantes** :
  - `cards-grid` (défaut) : Grille 3 colonnes de cartes avec étoiles dorées, badge vérifié, citations et avatars initiales.
  - `quote-editorial` (`variant: "quote-editorial"`) : Grande citation d'impact éditoriale centrée en typographie serif avec signature.
- **Contrat de données** :
  - `id` (`string`, requis, stable) : Identifiant unique (ex: `"testi-1"`).
  - `author` (`string`, requis) : Nom ou pseudonyme du client.
  - `role` (`string`, optionnel) : Contexte de l'avis (ex: `"Mariée de Juillet"`, `"Client Google"`).
  - `rating` (`number`, requis, 1 à 5) : Note sur 5 étoiles.
  - `text` (`string`, requis) : Témoignage client.
  - `date` (`string`, optionnel) : Date indicative.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.11. `faq` — Foire Aux Questions (Accordéon Dynamique - Optionnel)
- **Fichier de rendu** : `js/section-renderer.js` (`renderFaq()`)
- **Rôle** : Répondre aux doutes et questions fréquentes sous forme d'accordéon repliable fluide.
- **Contrat de données** :
  - `id` (`string`, requis, stable) : Identifiant unique (ex: `"faq-1"`).
  - `question` (`string`, requis) : Intitulé de la question.
  - `answer` (`string`, requis) : Réponse claire et détaillée.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.12. `process` — Processus & Méthode en Étapes (Optionnel)
- **Fichier de rendu** : `js/section-renderer.js` (`renderProcess()`)
- **Rôle** : Explication chronologique claire du déroulement d'une intervention ou d'une prestation en 3 ou 4 étapes numérotées.
- **Contrat de données** :
  - `eyebrow` (`string`, optionnel) : Surtitre.
  - `titleHtml` (`string`, requis) : Titre de section.
  - `steps` (`array[{ number, title, description }]`, requis) : Liste ordonnée des étapes.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.13. `practicalInfo` — Informations Pratiques, Horaires & Zone (Optionnel)
- **Fichier de rendu** : `js/section-renderer.js` (`renderPracticalInfo()`) + `css/public.css`
- **Rôle** : Affichage structuré et symétrique des horaires d'ouverture, statut live de disponibilité, pastilles géographiques et coordonnées directes.
- **Contrat de données** :
  - `eyebrow` (`string`, optionnel, défaut: `"Informations"`) : Surtitre de section.
  - `title` (`string`, optionnel, défaut: `"Disponibilités & Zone d'Action"`) : Titre principal.
  - `statusText` (`string`, optionnel) : Texte de la pastille de statut en direct avec pastille pulsante.
  - `isAvailable` (`boolean`, optionnel, défaut: `true`) : Statut de disponibilité (pastille verte si `true`, ambre si `false`).
  - `hoursTitle` (`string`, optionnel, défaut: `"Horaires d'Ouverture"`) : Titre de la carte horaires avec icône horloge SVG.
  - `hours` (`array[{ days, time | times }]`, optionnel) : Plages horaires avec extraction propre des mentions secondaires entre parenthèses (ex: `(sur rendez-vous)`).
  - `hoursNote` (`string`, optionnel) : Note de bas de carte horaires assurant l'équilibre visuel avec la carte voisine.
  - `areaTitle` (`string`, optionnel, défaut: `"Zone d'Intervention"`) : Titre de la carte zone avec icône repère SVG.
  - `areas` ou `serviceAreas` (`array[string]`, optionnel) : Communes ou départements desservis avec pastilles et puce dorée.
  - `address` (`string`, optionnel) : Adresse physique avec lien automatique vers Google Maps.
  - `phone` (`string`, optionnel) : Numéro direct avec appel en 1 clic (`tel:`).
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.14. `partners` — Marques Partenaires & Produits d'Exception (Optionnel)
- **Fichier de rendu** : `js/section-renderer.js` (`renderPartners()`) + `css/public.css` (`.section-partners`)
- **Rôle** : Bandeau prestigieux de marques partenaires, produits de soin d'exception ou références institutionnelles avec cartes soignées et visuels produits.
- **Variantes** :
  - `brand-showcase` (défaut artisans/soins/créateurs) : Cartes élégantes avec photo de soin ou produit, nom en capitales et sous-titre de spécialité.
  - `logo-cloud` (`variant: "logo-cloud"`, recommandé B2B/Tech) : Nuage sobre de logos vectoriels en niveaux de gris avec réactivité au survol.
- **Contrat de données** :
  - `id` (`string`, requis) : Identifiant unique.
  - `name` (`string`, requis) : Nom de la marque ou de la maison partenaire.
  - `category` (`string`, optionnel) : Spécialité ou descriptif de la gamme (ex: `"Soins Haute Performance Sans Sulfates"`).
  - `imageUrl` (`string`, optionnel) : URL d'illustration photographique du produit ou rituel de soin.
  - `logoUrl` (`string`, optionnel) : URL du logo vectoriel ou transparent.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.15. `contact` — Formulaire de Contact Sécurisé
- **Fichier HTML / JS** : `index.html` + `js/integrations/contact/` (`contact-validation.js`, `contact-service.js`, `contact-controller.js`)
- **Rôle** : Réception des messages clients sans backend propriétaire via le service sécurisé FormSubmit.co.
- **Contrat de données** :
  - `email` (`string`, requis, format email valide) : Adresse de réception du client.
  - `redirectUrl` (`string`, requis, format URL https) : URL de retour avec ancre `#contact`.
  - `subject` (`string`, requis) : Objet automatique de l'email.
  - `services` (`array[{ value, label }]`, requis) : Menu déroulant des prestations sélectionnables.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)
- **Protection** : Validation anti-injection, anti-spam honeypot, animation de soumission sans rechargement de page.

---

### 2.16. `footer` — Pied de Page & Copyright
- **Fichier de rendu** : `js/section-renderer.js` (`renderFooter()`)
- **Rôle** : Mentions de copyright, rappel de marque et lien discret "Espace Pro" (uniquement en offre Autonome).
- **Contrat de données** :
  - `brand` (`string`, requis) : Nom de marque.
  - `tagline` (`string`, optionnel) : Slogan de bas de page.
  - `copyrightYear` (`string`, requis, défaut: `"2026"`) : Année courante.
  - `copyrightName` (`string`, requis) : Nom légal pour les droits réservés.
- **Compatibilité** : Essentiel (✅ sans Espace Pro) | Autonome (✅ avec modal Espace Pro)

---

### 2.17. `admin` — Tableau de Bord d'Administration (Espace Pro)
- **Fichiers** : `admin.html`, `js/admin/admin-auth.js`, `js/admin/admin-dashboard.js`, `js/admin.js`, `css/admin.css`
- **Rôle** : Authentification par mot de passe sécurisé (avec mot de passe de secours `Admin@2026!`), gestion CRUD en temps réel de l'ensemble des 10 modules (Galerie, Looks, Avant/Après, Prestations, Parcours Timeline, Méthode, Avis, FAQ, Horaires, Partenaires).
- **Compatibilité** : Essentiel (❌ **Suppression physique obligatoire**) | Autonome (✅ **Inclus et actif**)

---

### 2.18. `timeline` — Parcours Chronologique & Savoir-Faire (Optionnel)
- **Fichier de rendu** : `js/section-renderer.js` (`renderTimeline()`) + `index.html` (`#parcours`)
- **Rôle** : Frise chronologique verticale élégante avec puces lumineuses et dates en exergue pour valoriser l'histoire, les diplômes ou les étapes clés d'une maison/artisan.
- **Contrat de données** (`timelineItem` versionné v1) :
  - `id` (`string`, requis, stable) : Identifiant unique (ex: `"time-1"`).
  - `date` (`string`, requis, 1 à 60 car.) : Période affichée (ex: `"2021 – 2023"`).
  - `title` (`string`, requis, 2 à 120 car.) : Intitulé de l'étape ou de la distinction.
  - `location` (`string`, optionnel, max 80 car.) : Contexte géographique ou institutionnel.
  - `description` (`string`, requis, 10 à 600 car.) : Récit ou détails de l'accomplissement.
- **Compatibilité** : Essentiel (✅ statique) | Autonome (✅ dynamique Firestore / CMS)

---

### 2.19. `i18n` — Support Bilingue (FR / EN)
- **Fichier de configuration / JS** : `js/site-config.js` (`i18n`), `js/app.js`, `css/public.css`
- **Rôle** : Bascule instantanée de la langue du site avec persistance locale dans `localStorage`, sans rechargement de page, via des sélecteurs CSS ultra-performants (`html[data-lang="fr"] .lang-en { display: none !important; }`).
- **Contrat de configuration** :
  - `enabled` (`boolean`, défaut: `false`) : Activation du sélecteur dans la barre de navigation.
  - `defaultLang` (`string`, défaut: `"fr"`) : Langue initiale.
  - `languages` (`array[string]`, défaut: `["fr", "en"]`).
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.20. `toast` — Notification Flottante & Copie Email
- **Fichier HTML / JS** : `index.html` (`#toast`), `js/app.js` (`showToast()`, `copyEmail()`), `css/public.css`
- **Rôle** : Notification toast discrète et moderne lors de la copie d'une adresse email dans le presse-papier (`[data-copy-email]`) avec repli propre sur le protocole `mailto:`.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.21. `actionBarMobile` — Barre d'Action Flottante Mobile (Panic Bar & Statut Live)
- **Fichier de configuration / Rendu** : `js/site-config.js` (`actions.actionBarMobile`), `index.html` (`#action-bar-mobile`), `js/section-renderer.js` (`renderActionBar()`), `css/public.css` (`.action-bar-mobile`)
- **Rôle** : Barre d'action sticky en bas d'écran sur mobile (< 769px), masquée automatiquement sur desktop, permettant l'appel direct d'urgence (plomberie, serrurerie, dépannage 24/7) ou la réservation rapide avec statut d'ouverture en direct.
- **Variantes** :
  - `emergency` : Point lumineux pulsant rouge, surtitre d'astreinte, et bouton d'appel direct en 1-clic (`tel:`).
  - `live-status` : Point lumineux vert/orange selon l'état d'ouverture et bouton de réservation direct vers `#contact`.
- **Contrat de configuration** :
  - `enabled` (`boolean`, défaut: `false`) : Activation de la barre mobile.
  - `variant` (`enum: 'emergency' | 'live-status'`, défaut: `'emergency'`).
  - `title` (`string`, optionnel, défaut: `'Astreinte 24h/24'`).
  - `subtext` (`string`, optionnel, défaut: `'Dépannage d\'urgence'`).
  - `phone` (`string`, optionnel) : Numéro d'appel immédiat (ex: `"0450000000"`).
  - `ctaLabel` (`string`, optionnel, défaut: `'Appel Immédiat'`).
  - `ctaLink` (`string`, optionnel, défaut: `'#contact'`).
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

---

### 2.22. `legalHub` & `cookieConsent` — Conformité Légale & Gestionnaire Cookies (LCEN / RGPD / CNIL / RGAA)
- **Fichiers** : `js/legal-manager.js`, `js/site-config.js` (`legal`), `index.html` (`#cookie-consent-banner`, `#cookie-settings-modal`, `#legal-modal`), `css/public.css`
- **Rôle** : Système juridique natif complet, 100% conforme au cadre légal français sans abonnement ni dépendance externe :
  1. **Bandeau Cookies CNIL 2020** : Consentement préalable (*prior consent*), égalité visuelle stricte "Tout accepter" / "Tout refuser" / "Personnaliser", persistance locale 180 jours (`we_cookie_consent_v1`).
  2. **Modale des Préférences Cookies** : Toggles granulaires par catégorie (Essentiels, Statistiques, Multimédia).
  3. **Modale Juridique Multi-Onglets Plein Écran** :
     - **Mentions Légales (LCEN)** : Éditeur, SIRET, RCS/RM, TVA intracommunautaire, directeur de publication, hébergeur avec adresse physique, médiateur de la consommation (L.612-1 Code de la consommation).
     - **Politique de Confidentialité (RGPD)** : Finalités, durées de conservation (3 ans prospects / 10 ans comptabilité), base légale, droits d'accès/rectification, contact DPO, saisine CNIL.
     - **CGU & Conditions de Vente** : Encadrement des devis et mention expresse de l'exclusion du droit de rétractation sur les biens confectionnés sur-mesure (art. L.221-28 3° du Code de la consommation).
     - **Déclaration d'Accessibilité (RGAA)** : État de conformité et contact assistance.
  4. **Formulaire de Contact Conforme** : Case à cocher de consentement explicite non pré-cochée (`.form-rgpd-consent`) avec lien interactif direct vers la politique de confidentialité.
  5. **Pied de Page Juridique** : Boutons d'accès permanent à la modale et à la réouverture des réglages cookies.
- **Compatibilité** : Essentiel (✅) | Autonome (✅)

