# 🧹 PROMPT MASTER — Épuration & Allègement du Template Maître (Zéro Régression)

> **Objectif** : Supprimer le code superflu, les fichiers reliquats obsolètes, les doublons CSS et les scripts inutiles sans altérer d'un millimètre la qualité visuelle, les fonctionnalités ni la compatibilité des offres Essentiel / Autonome.

---

```text
Tu es l'ingénieur système et architecte logiciel de WebExpresso.
Ta mission est d'effectuer une épuration chirurgicale du Template Maître (`template/`) pour éliminer tout le code mort et superflu accumulé, tout en garantissant une parité visuelle et fonctionnelle absolue (100% sans régression).

RÈGLE D'OR :
Ne supprime AUCUNE fonctionnalité, AUCUN composant du catalogue COMPONENTS.md, et ne modifie PAS l'apparence visuelle finale. Tout ce qui fonctionne doit continuer de fonctionner à l'identique.

═══════════════════════════════════════════════════════════════
ZONE 1 — SUPPRESSION DES FICHIERS MORTS & RELIQUATS OBSOLÈTES
═══════════════════════════════════════════════════════════════
1. Supprime les fichiers stubs/reliquats inutilisés dans `js/` :
   - `js/dataStore.js` (reliquat historique de 3 lignes)
   - `js/firebase-config.js` (reliquat historique de 3 lignes)
2. Nettoie le dossier `scratch/` pour ne conserver que les scripts de test officiels réutilisables. Supprime tout fichier HTML temporaire ou dump résiduel.

═══════════════════════════════════════════════════════════════
ZONE 2 — HARMONISATION DES TOKENS & NETTOYAGE DES SCRIPTS DE CONFIG
═══════════════════════════════════════════════════════════════
1. `js/theme-config.js` vs `css/tokens.css` :
   - `tokens.css` est déjà la source de vérité universelle du Design System (`--color-bg`, `--color-primary`, `--color-surface`, `--font-display`, `--font-body`, etc.).
   - Épurer les doublons de variables francisées obsolètes (`--blanc-art`, `--champagne`, `--or-discret`, `--encre`, `--gris-pierre`) dans `theme-config.js` et `public.css` pour unifier l'ensemble du projet sur les tokens officiels de `tokens.css`.
2. `js/feature-config.js` :
   - Ce fichier sert uniquement de matrice documentaire pour les règles d'offre (déjà intégralement spécifiées dans `OFFER_RULES.md`). Vérifier s'il est réellement utilisé à l'exécution par `app.js` ou `routes.js`. Si oui, conserver uniquement les getters requis et purger les descriptions textuelles redondantes.

═══════════════════════════════════════════════════════════════
ZONE 3 — ÉPURATION CHIRURGICALE DE LA FEUILLE CSS (`css/public.css`)
═══════════════════════════════════════════════════════════════
1. Élimination des Sélecteurs Morts :
   - Détecte et supprime les règles CSS ciblant des classes ou identifiants qui n'existent plus dans `index.html` ni dans `section-renderer.js`.
2. Unification des Variables CSS :
   - Remplacer les anciens fallbacks en chaîne redondants (ex: `var(--color-text-main, var(--texte-principal, #1C1916))`) par la variable canonique `var(--color-text-main, #1C1916)`.
3. Compression des Media Queries et Règles Répétitives :
   - Fusionner les blocs `@media` identiques éparpillés dans le fichier.
   - Supprimer les déclarations `box-sizing: border-box;` répétées individuellement sur des classes isolées alors qu'elle est déjà définie globalement sur `*, *::before, *::after`.

═══════════════════════════════════════════════════════════════
ZONE 4 — ALLÈGEMENT & PURIFICATION DU DOM (`index.html`)
═══════════════════════════════════════════════════════════════
1. Supprime les lignes vides et commentaires orphelins (ex: `<!-- Page Transition Voile -->` sans balise en-dessous).
2. Vérifie la liste des `<script src="...">` : supprime tout import de script qui n'est plus requis à l'exécution.

═══════════════════════════════════════════════════════════════
ZONE 5 — VALIDATION PAR TEST DUO TERMINAL + NAVIGATEUR (FILET DE SÉCURITÉ)
═══════════════════════════════════════════════════════════════
AVANT d'achever la mission, exécute impérativement :
1. `python scratch/test_modular_harmony.py`
2. `python scratch/test_modular_library.py`
3. `python scratch/test_isolation_qa.py`
4. `python scratch/test_full_qa.py`
5. `python scripts/validate-instructions.py`
6. `python scratch/test_live_dom_inspection.py` (via Chromium headless)

CRITÈRE D'ACCEPTATION FINAL :
- 100% des tests réussis.
- Zéro crash console.
- Zéro décalage visuel par rapport au template d'origine.
- Présente un bilan récapitulant le nombre de lignes et de Ko économisés.
```
