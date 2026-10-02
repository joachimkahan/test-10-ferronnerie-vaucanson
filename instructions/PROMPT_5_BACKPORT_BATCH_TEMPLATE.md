# 🏛️ PROMPT 5 — Maintenance & Backport Batch du Template Maître (v1.0)
## Report Périodique des Améliorations Terrain (Tous les 3 Clients) & Validation Non-Régression

> **Quand l'utiliser** : Tous les 3 clients traités et livrés en Phase 4 (compteur à 3, 6, 9...), pour intégrer les améliorations accumulées dans le Template Maître.  
> **Déclenchement** : Initié **STRICTEMENT par l'opérateur humain**. L'agent IA ne doit jamais démarrer cette maintenance de lui-même.  
> **Source de travail** : Les entrées de catégorie [A] consignées dans [`TEMPLATE-PATCH-PLAN.md`](file:///c:/Users/33783/Documents/Informatique/WebExpress/Technique/Phase%202%20_%20Template%20et%20master%20prompt/template/instructions/TEMPLATE-PATCH-PLAN.md).  
> **Règle d'or** : **Zéro régression prouvée avant bump de version**. Aucune mise à jour de version du template sans l'exécution avec 100% de succès de la batterie de tests complète.

---

```text
Tu es l'ingénieur système & architecte logiciel de WebExpresso.
Ta mission est d'intégrer dans le Template Maître (`template/`) les améliorations génériques de catégorie [A] accumulées pendant les phases de correction des 3 derniers clients, en garantissant l'absence totale de régression avant de valider la nouvelle version.

PÉRIMÈTRE & CONTEXTE :
- Template cible : `template/` (Master Template unifié générant Essentiel et Autonome)
- Journal des améliorations : `template/instructions/TEMPLATE-PATCH-PLAN.md`
- Tableau de bord des clients : `Technique/Phase 4 _ Modification et Débugage/SUIVI_CLIENTS_ET_BATCH.md`
- Version actuelle du template : [Consulter TEMPLATE_VERSION ou README.md, ex: v2.1.0]

═══════════════════════════════════════════════════════════════
ÉTAPES DE TRAITEMENT DU BATCH
═══════════════════════════════════════════════════════════════

1. AUDIT DU JOURNAL DE PATCHS :
   - Ouvre et lis l'intégralité de `template/instructions/TEMPLATE-PATCH-PLAN.md`.
   - Isole toutes les entrées dont le statut n'est pas encore "Intégré".
   - Évalue la pertinence de chaque entrée au vu du code actuel du template. Signale toute entrée qui serait devenue obsolète ou redondante.

2. CONSOLIDATION & REGROUPEMENT :
   - Regroupe les patches ciblant le même fichier (ex: plusieurs règles dans `public.css` ou `section-renderer.js`) pour éviter les retouches dispersées ou les écrasements accidentels.
   - Ordonne les patches par criticité (P1 Bloquant ➔ P2 Responsive/Ergonomie ➔ P3 Esthétique/Finitions).

3. 🛑 VALIDATION HUMAINE DU PLAN (STOP OBLIGATOIRE) :
   - Présente à l'opérateur le plan d'application synthétique (liste des patches retenus, fichiers impactés, ordre d'exécution).
   - ATTENDS la validation explicite de l'opérateur AVANT d'altérer le moindre fichier dans `template/`.

4. APPLICATION CHIRURGICALE DANS `template/` :
   - Applique les patches validés un par un sur les fichiers maîtres (`css/public.css`, `css/tokens.css`, `js/section-renderer.js`, `js/content-adapter.js`, `index.html`, etc.).
   - Conserve scrupuleusement la structure universelle, la compatibilité multi-offres (OFFER_RULES.md) et la pureté Vanilla CSS.

5. 🛡️ CONTRÔLE DE NON-RÉGRESSION PAR BATTERIE DE TESTS TERMINAL & LIVE :
   Exécute impérativement la suite complète de vérification dans `template/` :
   a. `py -3 scratch/test_modular_harmony.py` (Harmonie architecturale & Vanilla CSS)
   b. `py -3 scratch/test_modular_library.py` (Conformité des briques modulaires)
   c. `py -3 scratch/test_isolation_qa.py` (Isolation des 8 fonctionnalités clés)
   d. `py -3 scratch/test_full_qa.py` (Validation multi-offres Essentiel / Autonome)
   e. `py -3 scripts/validate-instructions.py` (Zéro erreur documentaire)
   f. `py -3 scratch/test_complete_system_qa.py` (130 contrôles syntaxe, tokens, 320px safe)
   g. Re-génération du DOM live Chromium/Edge et `py -3 scratch/test_live_dom_inspection.py`

6. TRACABILITÉ & MISE À JOUR DU JOURNAL :
   - Ne supprime AUCUNE entrée de `TEMPLATE-PATCH-PLAN.md`.
   - Mets à jour chaque patch traité avec le statut `✅ Intégré vX.X.X` et la date du jour.
   - Propose et acte le nouveau numéro de version du template selon la convention SemVer :
     * `v2.1.0` ➔ `v2.1.1` (Correctifs de bugs purs, robustesse)
     * `v2.1.0` ➔ `v2.2.0` (Ajout de composant générique ou nouvelle variante)
   - Mets à jour `TEMPLATE_VERSION` et le `CHANGELOG.md`.
   - Réinitialise le compteur du cycle dans `SUIVI_CLIENTS_ET_BATCH.md`.

═══════════════════════════════════════════════════════════════
INTERDICTIONS
═══════════════════════════════════════════════════════════════
- Ne jamais modifier le Template Maître sans validation préalable du plan d'application à l'étape 3.
- Ne jamais bumper la version du template si un seul test de l'étape 5 échoue.
- Ne jamais supprimer de patch du journal (la conservation de l'historique est obligatoire).
- Ne pas introduire de frameworks tiers (Tailwind, React, etc.) : 100% Vanilla CSS & JS pur.

═══════════════════════════════════════════════════════════════
FORMAT DE SORTIE ATTENDU
═══════════════════════════════════════════════════════════════
Présente un rapport de backport clair et professionnel :

### 🏛️ RAPPORT DE MAINTENANCE TEMPLATE (BATCH TOUS LES 3 CLIENTS)

#### 1. Synthèse des Patches Intégrés
| ID Patch | Fichier(s) Cible(s) | Description | Statut |
| :--- | :--- | :--- | :---: |
| **PAT-XX** | `css/public.css` | [Description concise du correctif] | ✅ Intégré |
| **PAT-XY** | `js/section-renderer.js` | [Description concise de la fonction] | ✅ Intégré |

#### 2. Patches Écartés ou Reportés (avec justification)
- [Ex: Aucun / ou PAT-XZ écarté car trop spécifique à un client de niche]

#### 3. Résultats du Filet Anti-Régression
- `test_complete_system_qa.py` : [PASS (130/130)]
- `test_full_qa.py` (Multi-offres) : [PASS]
- `test_modular_harmony.py` : [PASS]
- `test_live_dom_inspection.py` : [PASS]

#### 4. Bilan de Version
- **Ancienne version** : `v2.1.0`
- **Nouvelle version validée** : `v2.1.1` (ou `v2.2.0`)
- **Prochain batch prévu** : Après le traitement des 3 prochains clients
```
