# RÈGLES DE CONDUITE & PROTOCOLE DES PROMPTS WEBEXPRESSO (TEMPLATE 1.1)

## 🛡️ Règle Fondamentale : Synthèse Décisionnelle Simple & Enchaînement Direct (Spécificité Template 1.1)

À chaque exécution du **Prompt 1 (Préparation & Benchmark)** :
- L'agent IA produit obligatoirement la synthèse décisionnelle en langage simple, clair et sans jargon technique pour tracer l'ensemble des arbitrages (Formule, Direction Artistique, Sections & Variantes).
- **Spécificité Procédure de Test Template 1.1** : Lors de la simulation automatisée de test sur le Template 1.1, **l'agent enchaîne directement et automatiquement avec le Prompt 2 (Personnalisation)** sans marquer de temps d'arrêt ni attendre de validation manuelle intermédiaire. La synthèse est consignée dans le journal d'exécution et le Prompt 2 est exécuté de bout en bout.

### Format de la Synthèse Décisionnelle Simple :

```markdown
### 📋 SYNTHÈSE DU PROJET (TEMPLATE 1.1)

#### 1. 📦 La Formule Retenue
- **Choix** : Site Vitrine Simple (Essentiel) OU Site Modifiable par le Client (Autonome)
- **Pourquoi ce choix ?** : [Explication simple : ex. Le client veut juste présenter ses services sans se soucier de la technique / OU le client a besoin d'ajouter régulièrement de nouvelles réalisations et de changer ses prix lui-même].

#### 2. 🎨 L'Ambiance Visuelle & le Style (Direction Artistique)
- **Les Couleurs** : [Explication concrète : ex. Fond couleur lin naturel, touches de terracotta chaud et d'or patiné pour rappeler les matières de l'artisanat d'art].
- **Les Écritures (Typographies)** : [Explication simple : ex. Titres élégants et raffinés style maison de luxe, textes très faciles à lire sur mobile].
- **Le Style des Photos & Éléments** : [Explication : ex. Grandes photos lumineuses, cartes légèrement arrondies, zéro émoji pour garder un rendu très haut de gamme].

#### 3. ⚙️ Ce qu'on Affiche sur le Site (Sections & Présentation)
- **Ce qu'on met en avant en premier** : [Explication du haut de page : ex. Grande photo du chef en action avec texte d'accroche à côté].
- **La présentation des tarifs & prestations** : [Explication : ex. Présentation sous forme de carte de restaurant avec petits pointillés, idéale pour son salon de thé].
- **Les options spéciales activées pour son métier** :
  - [Ex. Un bouton d'appel d'urgence 24h/24 fixé en bas de l'écran sur smartphone, indispensable pour un serrurier].
  - [Ex. Un comparateur avant/après avec curseur pour montrer la rénovation des meubles].
  - [Ex. Les avis clients avec étoiles et date pour rassurer immédiatement].
- **Ce qu'on a retiré car inutile pour lui** : [Ex. On a masqué la frise historique car son entreprise est toute récente].

---
⚡ *Mode Continu Template 1.1 : Enchaînement direct avec le Prompt 2 (Personnalisation).*
```

---

## 🛑 Règle Absolue : Déclenchement Exclusif des Prompts 4 et 5 par l'Opérateur

L'agent IA ne doit **JAMAIS** enclencher automatiquement le **Prompt 4** ni le **Prompt 5** de sa propre initiative :
- **Prompt 4 (Phase de Correction & Retouches Client)** : Déclenché **UNIQUEMENT** par l'opérateur (après encaissement du paiement Stripe).
  - **À l'injection du Prompt 4** : L'agent confirme l'entrée en Phase de Correction sans modifier aucun fichier ni rien inventer, et se place en mode écoute/enregistrement.
  - **Dès transmission des demandes par l'opérateur** : L'agent enregistre, classe (C / P / A) et applique les modifications demandées.
- **Prompt 5 (Maintenance Batch)** : Déclenché **UNIQUEMENT** lorsque l'opérateur en donne l'ordre formel et explicite (après consultation du compteur dans `SUIVI_CLIENTS_ET_BATCH.md`).
- Entre la livraison de la démo (Prompt 3) et l'ordre de retouche (Prompt 4), l'agent reste en attente passive et ne touche à rien.

---

## 🛠️ Règle Fondamentale : Protocole de Phase 4 (Retouches Client Post-Validation)

Lors de la **Phase 4 (Corrections & Retouches Client)** (initiée exclusivement par l'opérateur) :
1. **Rôle d'activation initiale** : L'injection du Prompt 4 bascule l'agent en mode « Écoute & Traitement des retours ». L'agent ne modifie aucun fichier avant d'avoir reçu les instructions réelles de l'opérateur.
2. **Classification obligatoire C / P / A** pour chaque retour transmis :
   - **[C] Contenu** : Appliqué directement sur le site client.
   - **[P] Personnalisation** : Appliqué directement sur le site client.
   - **[A] Amélioration** : Appliqué sur le site client pour ne pas bloquer sa livraison, ET consigné dans `template/instructions/TEMPLATE-PATCH-PLAN.md`. L'opérateur doit être expressément alerté dans la réponse.
3. **Sanctuaire du Template Maître** : Il est **STRICTEMENT INTERDIT** de modifier les fichiers de code du dossier `template/` pendant le traitement d'un site client.
4. **Plafond de révision** : Limité à 1 ou 2 tours de révision maximum.
5. **Zéro invention** : Ne jamais inventer de données client absentes des échanges écrits.

---

## 🏛️ Règle Fondamentale : Protocole de Phase 5 (Backport Batch Template tous les 3 clients)

Lors de l'exécution du **Prompt 5 (Maintenance & Backport Batch)** :
1. **Duplication de Version Obligatoire** : À chaque exécution du Prompt 5, l'agent **DOIT OBLIGATOIREMENT** copier la dernière version du template dans un nouveau dossier incrémenté (ex: `template 1.1` ➔ `template 1.2`) et appliquer les modifications, patches et tests **exclusivement sur la nouvelle copie**. L'ancienne version reste intacte en tant qu'archive.
2. **Cadence** : Déclenché uniquement tous les 3 clients livrés (suivi dans `SUIVI_CLIENTS_ET_BATCH.md`).
3. **Validation Humaine Obligatoire** : L'agent doit présenter le plan d'application groupé et **ATTENDRE l'accord explicite de l'opérateur** avant de toucher au nouveau dossier template.
4. **Filet de Sécurité & Non-Régression** : Aucun bump de version (SemVer) n'est autorisé sans l'exécution avec 100% de succès de la batterie de tests :
   - `test_complete_system_qa.py`
   - `test_full_qa.py`
   - `test_modular_harmony.py`
   - `test_isolation_qa.py`
   - `test_live_dom_inspection.py`
5. **Conservation de l'Historique** : Ne jamais supprimer les entrées de `TEMPLATE-PATCH-PLAN.md` (les marquer `✅ Intégré vX.X.X` avec la date).

---

## ⚡ Règle Matérielle : Gestion Dynamique du GPU pour les Tests Navigateurs

Sur cette machine portable hôte (Dell Inspiron 16 Plus - Intel Core i7-11800H / NVIDIA RTX 3060) :
1. **Par défaut** : Google Chrome et toutes les tâches de bureau restent sur la carte intégrée **Intel UHD** (`GpuPreference=1;`) pour garantir le silence des ventilateurs.
2. **Avant tout test navigateur** (tests QA DOM/live, captures de démo, `browser_subagent`) :
   L'agent bascule obligatoirement Chrome sur la **RTX 3060** via :
   ```powershell
   Set-ItemProperty -Path 'HKCU:\Software\Microsoft\DirectX\UserGpuPreferences' -Name 'C:\Program Files\Google\Chrome\Application\chrome.exe' -Value 'GpuPreference=2;'
   ```
3. **À la fin des tests** : Dès que les tests sont terminés et le navigateur fermé, l'agent rétablit **immédiatement** Chrome sur la carte normale Intel UHD :
   ```powershell
   Set-ItemProperty -Path 'HKCU:\Software\Microsoft\DirectX\UserGpuPreferences' -Name 'C:\Program Files\Google\Chrome\Application\chrome.exe' -Value 'GpuPreference=1;'
   ```

---

## 🧪 Procédure Automatique : « Fais-moi un nouveau test sur le template 1.1 » (Simulation Client & Enchaînement Direct Prompt 1 ➔ Prompt 2)

Dès que l'opérateur formule l'instruction **« Fais-moi un nouveau test sur le template 1.1 »** (ou *« Teste le template 1.1 »*, *« Fais un test 1.1 »*) :
1. **Incrémentation & Préparation** :
   - L'agent identifie le dernier test dans `tests_personnalisation/` (ex: `test_08`), détermine le prochain numéro (`test_09` ou `test_XX`) et y duplique l'intégralité du socle `Template/template 1.1`.
2. **Invention d'un Client Type d'Excellence (Inédit & Anti-IA) & Diversité Maximale** :
   - Métier non encore exploré, ancrage réel, matières nobles, outillage d'artisan, gestes techniques, zéro cliché IA, zéro émoji.
   - **Diversité Esthétique & Fonctionnelle Obligatoire** :
     - *Esthétique* : Alternance stricte fonds clairs / fonds sombres, renouvellement complet de la palette chromatique, typographies variées : serif d'artisan vs sans-serif architectural, géométrie des cartes. Ne jamais cloner une ambiance visuelle existante.
     - *Fonctionnalités & Variantes* : Rotation des variantes du catalogue Template 1.1 (`COMPONENTS.md`) pour chaque composant (Hero, Looks, BeforeAfter, Galerie, Prestations, Témoignages, Partenaires, Timeline, FAQ, Process, PracticalInfo), alternance des formules (Essentiel vs Autonome), options métiers (bilingue i18n, barres d'action mobile, études de cas, téléchargement de documents PDF).
3. **Remplissage Intégral du Questionnaire Phase 1** :
   - Enregistrement des 7 étapes dans `tests_personnalisation/test_XX/instructions/reponses-questionnaire-tally.md`.
4. **Exécution du Prompt 1 (`PROMPT_1_PREPARER.md`)** :
   - Benchmark sectoriel réel (3 sites de référence).
   - Génération des 4 fichiers dans `tests_personnalisation/test_XX/instructions/` (`client-brief.json`, `site-spec.json`, `site-content.json`, `missing-information.md`).
   - Génération de la Synthèse Décisionnelle Simple.
5. **⚡ ENCHAÎNEMENT DIRECT AVEC LE PROMPT 2 (`PROMPT_2_PERSONNALISER.md`)** :
   - **Aucune interruption** : L'agent enchaîne immédiatement avec le Prompt 2.
   - Application de l'offre (suppression physique d'`admin.html` et Firebase si Essentiel, conservation si Autonome).
   - Injection des tokens dans `css/tokens.css`, configuration de `js/site-config.js`, `js/default-content.js`, et personnalisation d'`index.html`.
   - Exécution des validations QA automatisées (`python scripts/validate-instructions.py`).
   - Production du rapport `instructions/generation-report.md`.
6. **🔍 ENCHAÎNEMENT DIRECT AVEC LE PROMPT 3 (`PROMPT_3_AUDITER_CORRIGER.md`)** :
   - Audit technique en terminal (intégrité DOM, zéro valeur indéfinie, test anti-overflow à 320px, 375px, 768px, 1440px).
   - Audit anti-IA strict (tolérance zéro émoji).
   - Audit navigateur (basculement RTX 3060 avant test, rétablissement immédiat Intel UHD après).
   - Correction immédiate de toute anomalie identifiée.
   - Production du livrable final `instructions/qa-report.md` avec verdict `SITE 100% VALIDÉ & PRÊT POUR DÉPLOIEMENT`.

