# 🧪 PROCÉDURE « TEST » : CRÉATION & SIMULATION CLIENT AUTOMATISÉE (TEMPLATE 1.1)
## Mode Continu Intégral : Enchaînement Direct Prompt 1 ➔ Prompt 2 ➔ Prompt 3

> **Déclencheur** : Dès que l'utilisateur formule l'instruction :  
> 👉 *« Fais-moi un nouveau test sur le template 1.1 »* (ou *« Fais un nouveau test template 1.1 »*, *« Lance un test 1.1 »*, ou application de la procédure au Template 1.1).

---

## 🎯 OBJECTIF DE LA PROCÉDURE
Simuler de bout en bout l'intégration d'un client réel chez WebExpresso sur le socle **Template 1.1**, en incarnant un profil d'artisan ou de professionnel indépendant d'excellence, en remplissant son questionnaire complet issu de la **Phase 1 (`Phase 1 _ Formulaire`)**, en exécutant immédiatement le **Prompt 1 (`PROMPT_1_PREPARER.md`)**, puis en **enchaînant directement et sans interruption avec le Prompt 2 (`PROMPT_2_PERSONNALISER.md`)** et le **Prompt 3 (`PROMPT_3_AUDITER_CORRIGER.md`)** pour livrer un site démo personnalisé, rigoureusement audité et corrigé avec son rapport `qa-report.md` en une seule séquence continue.

---

## ⚡ SPÉCIFICITÉ MAJEURE DU TEMPLATE 1.1 : ENCHAÎNEMENT DIRECT PROMPT 1 ➔ PROMPT 2 ➔ PROMPT 3

> **Règle d'or Template 1.1 (Mode Continu Intégral)** :  
> Contrairement au Template 1.2 (qui s'arrête obligatoirement après le Prompt 1 pour attendre la validation manuelle de l'opérateur), **le Template 1.1 applique le mode continu intégral sur la chaîne des 3 prompts** :
> 1. **Prompt 1** : L'agent réalise le benchmark sectoriel réel et génère les 4 fichiers d'instructions (`client-brief.json`, `site-spec.json`, `site-content.json`, `missing-information.md`).
> 2. **Synthèse** : L'agent consigne la Synthèse Décisionnelle Simple dans le fil d'exécution pour archivage.
> 3. **Prompt 2** : L'agent enchaîne immédiatement avec la personnalisation intégrale du site (tokens CSS, `site-config.js`, `default-content.js`, `index.html`, purge Essentiel ou activation Autonome, et rapport `generation-report.md`).
> 4. **Prompt 3** : L'agent enchaîne directement avec l'audit double (Terminal + Navigateur), applique immédiatement les correctifs nécessaires et produit le rapport officiel `qa-report.md`.
> 5. Le site livré est 100% opérationnel, conforme aux règles anti-IA, responsive à 320px et sans aucun bug résiduel.

---

## ⚡ IMPÉRATIF MAJEUR : DIVERSITÉ MAXIMALE (ESTHÉTIQUE & FONCTIONNELLE)

> **Règle absolue** : Chaque nouveau site de test **DOIT ÊTRE RADICALEMENT DIFFÉRENT** des précédents.  
> Il est strictement interdit de concevoir des sites qui se ressemblent visuellement ou qui reproduisent les mêmes mécaniques fonctionnelles. L'objectif est d'explorer et d'éprouver méthodiquement **100% de la richesse modulaire** du Template 1.1.

### 🎨 1. Différenciation Esthétique Radicale (Zéro clone visuel)
- **Alternance stricte du fond & ambiance chromatique** :
  - Alterner rigoureusement entre **thèmes sombres profonds** (Midnight, Anthracite, Obsidian, Bleu Nuit minéral, Vert Forêt d'ombre, Ébène/Café) et **thèmes clairs lumineux** (Lin naturel, Albâtre minéral, Sable chaud, Craie, Terracotta douce, Ivoire chaud).
  - Ne **JAMAIS** faire deux tests consécutifs partageant la même tonalité dominante (ex: deux sites sombres bleutés ou deux sites clairs crème).
  - Varier les couleurs d'accentuation et de contraste (Or patiné, Cuivre martelé, Émeraude profonde, Laiton brossé, Brique toscane, Bronze d'art, etc.).
- **Renouvellement des Binômes Typographiques** :
  - Changer systématiquement le couple de polices de caractères pour donner une âme unique à chaque marque :
    - *Titres Serif d'orfèvrerie & haute facture* : Cormorant Garamond, Cinzel, DM Serif Display, Fraunces, Playfair Display...
    - *Titres Sans-Serif architecturaux ou audacieux* : Syne, Outfit, Plus Jakarta Sans, Montserrat, Space Grotesk...
    - *Corps de texte* : Toujours lisible et équilibré (Inter, Plus Jakarta Sans, Outfit, DM Sans...).
- **Traitement Visuel, Matières & Photographies** :
  - Alterner entre univers visuels très contrastés : matières brutes (acier de forge, pierre taillée, bois massif), univers de précision macro (haute horlogerie, microscopie d'atelier, joaillerie), ambiances lumineuses studio épuré, clair-obscur dramatique d'atelier.
  - Varier la géométrie perçue : arrondis généreux (`radiusCard: 14px-16px`) vs géométrie anguleuse et architecturale sobre (`radiusCard: 4px-6px`).

### ⚙️ 2. Différenciation Fonctionnelle & Variantes (Catalogue Template 1.1 COMPONENTS.md)
- **Alternance des Formules Commerciales** :
  - Alterner entre **Site Vitrine Simple (Essentiel)** (léger, épuré, zéro code admin, performances pures, suppression physique d'`admin.html` et Firebase) et **Site Modifiable par le Client (Autonome)** (avec CMS Firestore, Espace Pro sécurisé et gestion en direct des contenus).
- **Rotation Systématique des Variantes de Composants Disponibles dans Template 1.1** :
  - **Hero** : Alterner entre `cinematic-full` (plein écran immersif avec dégradé d'ambiance) et `editorial-split` (asymétrique 50/50 moderne avec texte à gauche et carte photo encadrée à droite).
  - **Looks / Réalisations Signatures** : Onglets éditoriaux interactifs `editorial-tabs` avec visuel grand format, détails de matière et tags.
  - **Avant / Après** : Comparateur interactif `beforeAfter` (Glow Slider avec poignée tactile) activé pour les métiers de transformation visuelle/rénovation, ou désactivé si non pertinent.
  - **Galerie** : Faire tourner `photo-editorial` (cartes photos satinées avec lightbox), `browser-mockup` (cadre logiciel réservé à la tech/design) et `bento` (grille asymétrique mettant en valeur le projet phare), avec activation de la modale d'étude de cas (`caseStudy`) ou du téléchargement direct de document (`documentUrl`).
  - **Prestations & Tarifs** : Alterner entre `pricing-cards` (cartes avec prix chiffrés et inclusions), `cards-expertise` (conseil/savoir-faire sur-mesure sans étiquette de prix discount) et `menu-list` (liste épurée en ligne avec pointillés et prix alignés).
  - **Témoignages** : Alterner entre `cards-grid` (grille 3 colonnes de cartes avec étoiles dorées) et `quote-editorial` (grande citation magistrale en typographie serif).
  - **Timeline / Histoire** : Frise chronologique verticale (`vertical-line`) pour valoriser l'histoire de la maison, ses distinctions et son parcours d'artisan.
  - **Partenaires & Labels** : Alterner entre `brand-showcase` (grandes cartes photographiques de matières et marques prestigieuses) et `logo-cloud` (nuage sobre de logos vectoriels en niveaux de gris).
  - **FAQ** : Accordéon pliable dynamique fluide (`faq`).
  - **Processus / Méthode** : Étapes numérotées chronologiques (`process`).
  - **Informations Pratiques** : Carte structurée horaires, statut live de disponibilité et zone d'intervention (`practicalInfo`).
- **Activation Dynamique des Options Métiers** :
  - `actionBarMobile` : Activer selon le besoin en mode `emergency` (dépannage urgent 24/7), en mode `live-status` (disponibilité live), ou désactiver pour les métiers posés.
  - `i18n` (Bilingue FR/EN) : Activer pour les métiers ciblant une clientèle internationale, touristique ou expatriée.
  - `secondaryCta` : Proposer selon le métier un téléchargement direct de brochure/catalogue PDF (`isDownload: true`).
  - `ticker` : Conserver pour les métiers dynamiques ou désactiver pour une ambiance feutrée et solennelle.

---

## 🧭 DÉROULEMENT AUTOMATIQUE EN 6 ÉTAPES (CHAÎNE CONTINUE 1 ➔ 2 ➔ 3)

### Étape 1 : Incrémentation & Préparation du Dossier de Test
1. **Identifier le numéro du prochain test** :
   - Scanner le dossier `tests_personnalisation/` pour repérer le dernier test existant (ex: `test_09`).
   - Incrémenter le numéro pour créer le nouveau dossier : `tests_personnalisation/test_10` (ou `test_XX`).
2. **Identifier la source Template 1.1** :
   - Prendre la version cible : `Template/template 1.1`.
3. **Dupliquer le Template 1.1** :
   - Copier l'intégralité du dossier `Template/template 1.1` vers `tests_personnalisation/test_XX`.

---

### Étape 2 : Choix d'un Nouveau Métier Type (Inédit & Haute Authenticité)
1. **Vérifier l'historique des métiers déjà testés** (pour garantir 0 doublon) :
   - Vérifier la liste des tests existants (`test_01` à `test_XX`) pour s'assurer que le domaine d'activité choisi n'a jamais été traité.
2. **Sélectionner un métier d'excellence non encore exploré**, par exemple :
   - Ferronnerie d'Art & Métallerie d'Exception
   - Botanique & Scénographie Florale Sur-Mesure
   - Maroquinerie & Sellerie d'Art
   - Torréfaction Artisanale & Cafés de Terroir
   - Reliure & Restauration de Livres Rares
   - Luthiers / Facteurs d'Instruments de Musique
   - Joaillerie Contemporaine & Taille de Pierres Fines
3. **Respecter la Charte Anti-IA** :
   - Identité géographique réelle et cohérente (adresse, région, zone d'intervention).
   - Matières nobles, gestes techniques précis, outillage d'artisan.
   - Zéro cliché creux, zéro adjectif interchangeable (*« l'excellence et la passion »*).
4. **Appliquer la Matrice de Démarcation (Esthétique & Fonctionnelle)** :
   - Vérifier que le thème (clair ou sombre) tranche nettement avec le test précédent (alternance systématique clair ➔ sombre ➔ clair).
   - Sélectionner une combinaison inédite de variantes (`COMPONENTS.md` Template 1.1).
   - Alterner la formule commerciale (Essentiel vs Autonome).

---

### Étape 3 : Remplissage du Questionnaire Client (Phase 1 _ Formulaire)
L'agent se place dans la peau du client et remplit l'intégralité des **7 étapes du questionnaire officiel WebExpresso** (`Phase 1 _ Formulaire/WebExpress_Final_Client_Questionnaire_EN_Tally.md`) :
1. **Étape 1 — Votre Entreprise** : Nom commercial, activité, résumé métier authentique (max 450 car.), ville, zone, langues.
2. **Étape 2 — Vos Clients & Objectif** : Cible, projet déclencheur, objectif prioritaire, CTA principal.
3. **Étape 3 — Votre Offre & Prestations** : Offre vedette, catalogue secondaire, tarifs réels chiffrés, délais, 4 piliers concrets de réassurance.
4. **Étape 4 — Identité Visuelle & Ambiance** : Direction artistique, palette organique, style photo atelier, URLs photographiques réelles Unsplash haute résolution.
5. **Étape 5 — Preuves & Réassurance** : 3-4 vrais avis clients contextualisés avec notes et dates, labels/certifications officiels, marques et outillages partenaires.
6. **Étape 6 — Informations Pratiques & Coordonnées** : Adresse physique réelle, horaires d'ouverture, téléphone direct, email, SIRET et statut juridique.
7. **Étape 7 — Choix de la Formule** : *Essentiel* ou *Autonome* avec justification métier.

👉 **Sauvegarde obligatoire** :  
`tests_personnalisation/test_XX/instructions/reponses-questionnaire-tally.md`.

---

### Étape 4 : Exécution du Prompt 1 (`PROMPT_1_PREPARER.md`)
Sans intervention humaine :
1. L'agent exécute les directives du **Prompt 1** en s'appuyant sur les réponses au questionnaire générées.
2. Il effectue le benchmark sectoriel réel sur 3 acteurs nationaux/internationaux de référence.
3. Il génère rigoureusement les **4 fichiers d'instructions** dans `tests_personnalisation/test_XX/instructions/` :
   - `client-brief.json`
   - `site-spec.json`
   - `site-content.json`
   - `missing-information.md`
4. Il formule la **Synthèse Décisionnelle Simple** dans sa sortie de réponse pour traçabilité :

```markdown
### 📋 SYNTHÈSE DU PROJET : [NOM DU CLIENT & MÉTIER] (TEST XX - TEMPLATE 1.1)

#### 1. 📦 La Formule Retenue
- **Choix** : Site Vitrine Simple (Essentiel) OU Site Modifiable par le Client (Autonome)
- **Pourquoi ce choix ?** : [Explication simple].

#### 2. 🎨 L'Ambiance Visuelle & le Style (Direction Artistique)
- **Les Couleurs** : [Explication concrète de la palette].
- **Les Écritures (Typographies)** : [Explication du choix police titre et corps].
- **Le Style des Photos & Éléments** : [Explication de l'ambiance visuelle].

#### 3. ⚙️ Ce qu'on Affiche sur le Site (Sections & Présentation)
- **Ce qu'on met en avant en premier** : [Accroche du Hero et type de visuel].
- **La présentation des tarifs & prestations** : [Choix de variante : menu-list, cards-expertise, etc.].
- **Les options spéciales activées pour son métier** :
  - [Option 1, ex: Comparateur avant/après pour restauration].
  - [Option 2, ex: Badges de labels officiels].
- **Ce qu'on a retiré car inutile pour lui** : [Ex. Masqué la frise ou le bandeau urgent].

#### 4. 🔀 Démarcation par Rapport aux Tests Précédents (Diversité Garantie)
- **Rupture esthétique** : [Explication concrète de rupture visuelle].
- **Rupture fonctionnelle** : [Explication concrète de rupture modulaire].
```

---

### Étape 5 : ⚡ ENCHAÎNEMENT DIRECT AVEC LE PROMPT 2 (`PROMPT_2_PERSONNALISER.md`)

> L'agent **ne marque aucun temps d'arrêt** après l'Étape 4. Il **enchaîne immédiatement et automatiquement** avec l'exécution intégrale du **Prompt 2** :

1. **Application Stricte de l'Offre (`OFFER_RULES.md`)** :
   - Si offre **Essentiel** :
     - Suppression physique irréversible du fichier `admin.html`.
     - Suppression physique des dossiers `js/admin/` et `js/integrations/firebase/`.
     - Nettoyage dans `index.html` de tous les blocs balisés `[AUTONOME_ONLY]`.
   - Si offre **Autonome** :
     - Conservation de l'ensemble des modules d'administration et de synchronisation Firestore.
2. **Injection des Design Tokens (`css/tokens.css`)** :
   - Injection des variables CSS sur-mesure déduites du benchmark : `--color-bg`, `--color-bg-card`, `--color-text`, `--color-accent`, `--font-heading`, `--font-body`, `--radius-card`, etc.
3. **Configuration du Site (`js/site-config.js`)** :
   - Mise à jour de l'objet global `siteConfig` : identité, coordonnées, options d'action bar, sélecteur i18n, variantes de rendu.
4. **Injection des Données Métiers (`js/default-content.js`)** :
   - Remplacement complet des données de repli (`DEFAULT_CONTENT`) par les contenus sectoriels authentiques rédigés lors du Prompt 1.
5. **Personnalisation d'`index.html`** :
   - Importation des Google Fonts sélectionnées dans `<head>`.
   - Balises `<title>` et `<meta name="description">`.
   - Liens de navigation ancrés (`#accueil`, `#apropos`, `#looks`, `#prestations`, `#contact`).
   - Copyright et mentions du footer.
6. **Contrôle & Validation QA Automatisée** :
   - Exécution du script de validation des instructions :
     ```powershell
     python scripts/validate-instructions.py
     ```
7. **Rapport de Fin de Personnalisation** :
   - Rédaction du rapport officiel dans `tests_personnalisation/test_XX/instructions/generation-report.md`.

---

### Étape 6 : 🔍 ENCHAÎNEMENT DIRECT AVEC LE PROMPT 3 (`PROMPT_3_AUDITER_CORRIGER.md`)

> **RÈGLE SPÉCIFIQUE TEMPLATE 1.1** :  
> L'agent **enchaîne directement et automatiquement avec le Prompt 3** dès la fin du Prompt 2 :

1. **Audit Technique en Terminal** :
   - Intégrité JS, absence de crash console et zéro valeur `undefined` ou `[object Object]` dans le DOM.
   - Validation de l'ensemble des sections actives et masquage strict des sections désactivées (`style="display: none;"`).
   - Validité des liens, des ancres et absence de clés secrètes.
   - Test automatisé anti-débordement horizontal à 320px, 375px, 768px et 1440px (`scrollWidth <= clientWidth`).
   - 🛑 **Audit Anti-IA & Détection d'Émojis (Tolérance Zéro)** : scan regex de l'ensemble du DOM pour certifier l'absence d'émojis dans les titres, boutons, puces et badges.
2. **Audit Navigateur & Expérience Utilisateur (Règle Matérielle GPU)** :
   - Basculer Chrome sur la **RTX 3060** (`GpuPreference=2;`) avant l'audit navigateur.
   - Vérification de l'expérience mobile (menu hamburger, défilement fluide, repliage).
   - Test des composants interactifs : accordéon FAQ, comparateur Avant/Après, Lightbox, modale d'étude de cas, sélecteur de langue bilingue i18n.
   - Contrôle du miroir humain : élégance typographique, lisibilité WCAG AA, authenticité artisanale.
   - Rétablir immédiatement Chrome sur la carte intégrée **Intel UHD** (`GpuPreference=1;`) dès la fermeture du navigateur.
3. **Correction Immédiate de toute Anomalie Détectée** :
   - Application directe des correctifs dans les fichiers sources de `tests_personnalisation/test_XX/`.
   - Re-test immédiat pour garantir 100% de succès.
4. **Livrable Final : Rapport QA de Livraison (`qa-report.md`)** :
   - Rédaction de `tests_personnalisation/test_XX/instructions/qa-report.md` avec tableau récapitulatif des tests, relevé des résolutions et verdict final :  
     `SITE 100% VALIDÉ & PRÊT POUR DÉPLOIEMENT`.

---

## ⚡ GESTION DU GPU LORS DES TESTS NAVIGATEURS (RÈGLE MATÉRIELLE)
Pour tout test ultérieur avec navigateur réel (via `browser_subagent` ou Chrome direct) :
1. **Avant le test** : Basculer Chrome sur la **RTX 3060** :
   ```powershell
   Set-ItemProperty -Path 'HKCU:\Software\Microsoft\DirectX\UserGpuPreferences' -Name 'C:\Program Files\Google\Chrome\Application\chrome.exe' -Value 'GpuPreference=2;'
   ```
2. **Après le test** : Rétablir immédiatement Chrome sur la carte intégrée **Intel UHD** :
   ```powershell
   Set-ItemProperty -Path 'HKCU:\Software\Microsoft\DirectX\UserGpuPreferences' -Name 'C:\Program Files\Google\Chrome\Application\chrome.exe' -Value 'GpuPreference=1;'
   ```
