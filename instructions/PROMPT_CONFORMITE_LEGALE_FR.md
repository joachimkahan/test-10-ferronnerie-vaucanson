# ⚖️ PROMPT MASTER — Intégration de la Conformité Légale & RGPD France (Template 1.1)

> **Cadre Juridique** : Loi LCEN (2004), Règlement Général sur la Protection des Données (RGPD 2016/679), Lignes directrices et recommandations CNIL (2020), Code de la consommation (L.612-1 pour la médiation B2C) et Décret Accessibilité numérique (RGAA).  
> **Rôle de l'IA / Opérateur** : Ce prompt guide l'intégration complète, modulaire et sans régression de l'ensemble des éléments juridiques et techniques obligatoires sur le Template Maître 1.1 et sur tout site client dérivé.

---

```text
Tu es l'ingénieur système, lead tech et juriste numérique de WebExpresso.
Ta mission est d'intégrer dans le Template Maître (template 1.1) l'intégralité du dispositif de conformité légale, technique et RGPD obligatoire en France pour les sites ouverts au public.

PHILOSOPHIE ARCHITECTURALE WEBEXPRESSO :
1. Expérience Utilisateur d'Élite : Les exigences légales ne doivent PAS enlaidir le site. Le bandeau cookie doit être discret, élégant, sans dark pattern, et les documents légaux doivent s'afficher instantanément via une modale plein écran soignée (ou drawer latéral) sans rupture de session ni rechargement lourd.
2. Zéro Donnée en Dur : Toutes les informations légales (SIRET, Directeur de publication, Hébergeur, DPO, Médiateur) doivent être configurables dans `js/site-config.js` (bloc `legal`) et normalisées par `js/content-adapter.js`.
3. Conformité CNIL Stricte : Aucun traceur ou cookie non essentiel ne doit être déposé avant l'action explicite d'acceptation de l'utilisateur. Le refus doit être aussi simple que l'acceptation (bouton « Tout refuser » de même niveau visuel).

═════════════════════════════════════════════════════════════════════
PILIER 1 — CONTRAT DE DONNÉES CENTRALISÉ (`js/site-config.js`)
═════════════════════════════════════════════════════════════════════
Ajoute un bloc complet `legal` dans `SITE_CONFIG` regroupant les informations requises par la loi française :

legal: {
    // 1. Identité de l'Éditeur (LCEN art. 6-III)
    companyName: "NOM_ENTREPRISE",                 // Raison sociale ou Nom Commercial
    legalForm: "FORME_JURIDIQUE",                   // Ex: "SARL", "SAS", "SASU", "Entreprise Individuelle (EI)"
    capital: "MONTANT_CAPITAL",                     // Ex: "10 000 €" (ou null pour micro-entreprise/EI)
    headquarters: "ADRESSE_COMPLETE_SIEGE",         // Ex: "28 rue de l'Ébénisterie, 44000 Nantes"
    rcsOrRm: "RCS_OU_RM",                           // Ex: "RCS Nantes 812 459 320" ou "RM 44"
    siret: "NUMERO_SIRET",                          // 14 chiffres
    vatNumber: "NUMERO_TVA",                        // Ex: "FR 12 812459320" ou "TVA non applicable, art. 293 B du CGI"
    publishingDirector: "NOM_PRENOM_RESPONSABLE",   // Directeur / Directrice de la publication

    // 2. Coordonnées Officielles & Contact RGPD
    contactEmail: "contact@domaine.fr",
    contactPhone: "+33 2 40 00 00 00",
    dpoEmail: "privacy@domaine.fr",                 // Ou contactEmail si DPO non désigné

    // 3. Hébergeur du Site Web (LCEN obligatoire)
    host: {
        name: "INFRASTRUCTURE_HEBERGEMENT",         // Ex: "Netlify Inc." / "Vercel Inc." / "OVH SAS"
        address: "ADRESSE_HEBERGEUR",               // Ex: "510 20th Street, San Francisco, CA 94107, USA" ou "2 rue Kellermann, 59100 Roubaix, France"
        phone: "TEL_HEBERGEUR",                     // Téléphone officiel de l'hébergeur
        website: "https://www.hebergeur.com"
    },

    // 4. Médiation de la Consommation (Code de la conso L.612-1 obligatoire si vente/prestation B2C)
    mediator: {
        name: "NOM_DU_MEDIATEUR",                   // Ex: "CNPM MÉDIATION CONSOMMATION"
        website: "https://www.cnpm-mediation-consommation.eu",
        address: "27 avenue de la Libération, 42400 Saint-Chamond"
    },

    // 5. Paramètres RGPD & Bandeau Cookies (CNIL 2020)
    cookies: {
        enabled: true,                              // false si le site n'utilise strictement AUCUN traceur
        bannerVersion: "2026.1",                    // Bump si mise à jour majeure pour redemander le consentement
        cookieConsentDurationDays: 180,             // 6 mois recommandés par la CNIL
        categories: {
            necessary: { id: "necessary", label: "Cookies strictement nécessaires", required: true, default: true },
            analytics: { id: "analytics", label: "Mesure d'audience anonyme", required: false, default: false },
            multimedia: { id: "multimedia", label: "Contenus multimédias enrichis (Vimeo, YouTube)", required: false, default: false }
        }
    },

    // 6. Accessibilité Numérique (RGAA)
    accessibility: {
        status: "partiellement_conforme",           // "totalement_conforme" | "partiellement_conforme" | "non_conforme"
        contactUrl: "#contact"
    }
}

═════════════════════════════════════════════════════════════════════
PILIER 2 — LES MENTIONS LÉGALES & POLITIQUE DE CONFIDENTIALITÉ
═════════════════════════════════════════════════════════════════════
Crée un système d'affichage juridique ultra-accessible, léger et responsive :

1. Modale Juridique Multifonction (`#legal-modal` dans `index.html`) :
   - Structure à onglets élégante :
     * Onglet 1 : « Mentions Légales » (Identification éditeur, hébergeur, propriété intellectuelle, crédits, médiateur).
     * Onglet 2 : « Protection des Données (RGPD) » (Finalité de collecte, bases légales, durée de conservation 3 ans prospects / 10 ans facturation, destinataires, droits d'accès/rectification/suppression via email dédié, droit de recours CNIL).
     * Onglet 3 : « Conditions d'Utilisation (CGU) » (Propriété intellectuelle des réalisations, limitation de responsabilité, liens externes).
     * Onglet 4 : « Conditions de Vente (CGV) » (Prestations régies par devis préalable, exceptions légales au droit de rétractation pour les commandes personnalisées/sur mesure art. L.221-28 du Code de la consommation, garanties légales).
   - Fermeture intuitive : touche Échap, bouton croix et clic sur l'arrière-plan avec piège de focus accessible (A11y).

2. Contenu Dynamique Pré-rédigé & Paramétré :
   - Le texte juridique s'alimente automatiquement via les champs de `SITE_CONFIG.legal`.
   - Si un champ est vide, un texte de secours professionnel prend le relais sans casser l'affichage.

═════════════════════════════════════════════════════════════════════
PILIER 3 — LE BANDEAU DE GESTION DES COOKIES (CONFORME CNIL)
═════════════════════════════════════════════════════════════════════
Implémente le gestionnaire de cookies natif en Vanilla JS sans dépendance tierce :

1. Le Bandeau Flottant (`#cookie-consent-banner`) :
   - Position : Ancré en bas d'écran, discret mais parfaitement lisible, fond flouté en accord avec le thème (`--color-surface`).
   - Texte explicite : Explication concise des cookies indispensables et optionnels.
   - Les 3 Boutons d'Action (Égalité visuelle stricte selon doctrine CNIL) :
     * Bouton A : `[Tout accepter]` (sauvegarde consentement complet).
     * Bouton B : `[Tout refuser]` (aucun cookie optionnel déposé, aussi facile d'accès qu'accepter).
     * Bouton C : `[Personnaliser]` (ouvre le panneau de choix par catégorie).

2. Le Panneau de Personnalisation :
   - Catégorie « Nécessaires » : cochée et non modifiable (fonctionnement du site, choix de langue, sauvegarde du consentement).
   - Catégorie « Mesure d'audience » : switch/checkbox décochée par défaut (*opt-in préalable obligatoire*).
   - Catégorie « Multimédia externe » : switch/checkbox décochée par défaut.

3. Blocage Préalable des Scripts (*Prior Consent*) :
   - Aucun script tiers ne doit se charger tant que `localStorage.getItem('cookie_consent')` ne contient pas l'accord explicite pour la catégorie concernée.

4. Lien Permanent de Modification :
   - Ajout obligatoire dans le pied de page (`footer`) du bouton/lien `« Gestion des cookies »` qui permet à tout visiteur de réouvrir le bandeau et changer d'avis à tout moment.

═════════════════════════════════════════════════════════════════════
PILIER 4 — CASE DE CONSENTEMENT RGPD SUR LE FORMULAIRE DE CONTACT
═════════════════════════════════════════════════════════════════════
Dans la section `#contact` (`index.html` ou `section-renderer.js`) :
1. Insère une case à cocher obligatoire NON pré-cochée avant le bouton de soumission :
   ```html
   <div class="form-rgpd-consent">
       <input type="checkbox" id="rgpd-consent" name="rgpd-consent" required>
       <label for="rgpd-consent">
           J'accepte que mes données soient transmises à [Nom Entreprise] pour traiter ma demande de contact et d'étude, conformément à la <a href="#" data-legal-tab="privacy">Politique de confidentialité</a>.
       </label>
   </div>
   ```
2. Validation JavaScript : La soumission du formulaire doit être formellement bloquée si la case n'est pas cochée, avec message d'alerte explicite.

═════════════════════════════════════════════════════════════════════
PILIER 5 — PIED DE PAGE & MENTIONS D'ACCESSIBILITÉ (RGAA)
═════════════════════════════════════════════════════════════════════
Dans `footer` :
1. Barre de liens légaux (`.footer-legal-links`) :
   - `Mentions Légales` (ouvre l'onglet mentions).
   - `Politique de Confidentialité` (ouvre l'onglet confidentialité).
   - `Gestion des Cookies` (réouvre le panneau de cookies).
   - `Accessibilité : Partiellement conforme` (ouvre la déclaration d'accessibilité RGAA).
2. Clarté des contrastes et taille de police minimale de 12px (0.75rem) pour une lisibilité parfaite sur mobile.

═════════════════════════════════════════════════════════════════════
PILIER 6 — VÉRIFICATION TECHNIQUE & SÉCURITÉ
═════════════════════════════════════════════════════════════════════
1. HTTPS : Vérifier que toutes les URLs de ressources externes (Google Fonts, Unsplash, scripts CDN) sont appelées en `https://`.
2. Formulaires sécurisés : Les champs de saisie possèdent les attributs `autocomplete` appropriés (`name`, `email`, `tel`).
3. Attributs Accessibilité (ARIA) :
   - Toutes les modales légales possèdent `role="dialog"`, `aria-modal="true"`, et un label d'en-tête accessible.
   - Les boutons de fermeture possèdent `aria-label="Fermer la fenêtre légale"`.

═════════════════════════════════════════════════════════════════════
PLAN D'EXÉCUTION TECHNIQUE (ÉTAPES CHIRURGICALES)
═════════════════════════════════════════════════════════════════════
Étape 1 : Mettre à jour `site-config.js` avec le bloc `legal` complet et les valeurs de repli par défaut.
Étape 2 : Mettre à jour `content-adapter.js` pour normaliser les informations légales et les exposer à l'application.
Étape 3 : Créer le module JavaScript `js/legal-manager.js` (ou intégrer dans `app.js` / `section-renderer.js`) gérant :
          - L'ouverture/fermeture de la modale légale multi-onglets.
          - Le consentement aux cookies (bannière, personnalisation, stockage 180 jours, réouverture).
          - L'interception et le déblocage conditionnel des traceurs.
Étape 4 : Intégrer les balises HTML dans `index.html` (modale légale, bandeau cookie et liens de pied de page).
Étape 5 : Styliser l'ensemble dans `css/public.css` avec le Design System officiel (`tokens.css`), en thèmes clair et sombre.
Étape 6 : Documenter les contrats dans `COMPONENTS.md` et `EDITABLE_FILES.md`.
Étape 7 : Valider avec `python scripts/validate-instructions.py` et contrôle navigateur réel.
```
