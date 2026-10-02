/**
 * SITE-CONFIG.JS — Réglages Structurels & Généraux du Site
 * ============================================================
 * [EDITABLE] Ce fichier centralise les réglages fonctionnels et structurels.
 *
 * OFFRE ESSENTIEL  : Tous les blocs sauf "admin"
 * OFFRE AUTONOME   : Tous les blocs
 * ============================================================
 */

const SITE_CONFIG = {

    // ── Métadonnées du Projet ───────────────────────────────────────
    projectId:          "ferronnerie-art-vaucanson-lyon",
    offer:              "autonome",              // "autonome" | "essentiel"
    templateVersion:    "2.6.0",
    language:           "fr",
    locale:             "fr-FR",

    // ── Identité Visuelle & Logo (Optionnel) ──────────────────────
    branding: {
        logoUrl: "",                             // Ex: "assets/logo.svg"
        logoWhiteUrl: "",
        faviconUrl: "",
        displayMode: "text-only"
    },

    // ── Support Bilingue i18n (CAND-02) ─────────────────────────────
    i18n: {
        enabled: true,
        defaultLang: "fr",
        languages: ["fr", "en"]
    },

    // ── Pilotage Dynamique des Sections ────────────────────────────
    sections: {
        order: [
            'hero',
            'ticker',
            'about',
            'partners',
            'banner',
            'looks',
            'beforeAfter',
            'gallery',
            'prestations',
            'timeline',
            'testimonials',
            'faq',
            'practicalInfo',
            'contact'
        ],
        active: {
            hero: true,
            ticker: true,
            about: true,
            partners: true,
            process: false,
            banner: true,
            looks: true,
            gallery: true,
            beforeAfter: true,
            prestations: true,
            timeline: true,
            testimonials: true,
            faq: true,
            practicalInfo: true,
            contact: true
        }
    },

    // ── Variantes Métiers des Composants (v3.0) ────────────────────
    variants: {
        hero: "editorial-split",
        gallery: "curated-grid",
        partners: "brand-showcase",
        prestations: "menu-list",
        testimonials: "cards-grid"
    },

    // ── Actions & Boutons Principaux ────────────────────────────────
    actions: {
        primaryCta: {
            label: "Étudier votre projet d'ouvrage",
            href: "#contact"
        },
        phoneButton: {
            enabled: true,
            number: "0478832419"
        },
        whatsappButton: {
            enabled: false,
            number: "",
            message: "Bonjour, je souhaite des renseignements."
        },
        externalBooking: {
            enabled: false,
            url: ""
        },
        actionBarMobile: {
            enabled: false,
            variant: "emergency",
            title: "Atelier Vaucanson",
            subtext: "Forge d'art & serrurerie",
            phone: "0478832419",
            ctaLabel: "Contacter l'Atelier",
            ctaLink: "tel:0478832419"
        }
    },

    // ── Formulaire de Contact (FormSubmit.co) ──────────────────────
    contactForm: {
        email: "contact@ferronnerie-vaucanson.fr",
        redirectUrl: "https://ferronnerie-vaucanson.fr/#contact",
        fields: ["name", "email", "service", "message"],
        services: [
            { value: "portail", label: "Portail ou clôture monumentale forgée" },
            { value: "garde_corps", label: "Garde-corps ou rampe d'escalier débillardée" },
            { value: "marquise", label: "Marquise, verrière d'art ou serrurerie" },
            { value: "restauration", label: "Restauration Monuments Historiques & patrimoine" },
            { value: "autre", label: "Autre étude d'ouvrage sur-mesure" }
        ]
    },

    // ── Effets Visuels & Expérience Utilisateur ─────────────────────
    effects: {
        pageVoile: false,
        customCursor: false,
        scrollReveal: true
    },

    // ── Conformité Légale & RGPD (LCEN, RGPD, CNIL, RGAA) ────────
    legal: {
        companyName: "Ferronnerie d'Art Vaucanson & Fils SAS",
        legalForm: "Société par Actions Simplifiée (SAS)",
        capital: "40 000 €",
        headquarters: "18 Quai Paul Sédillat, 69009 Lyon",
        rcsOrRm: "RCS Lyon B 412 893 104",
        siret: "412 893 104 00028",
        vatNumber: "FR 62 412893104",
        publishingDirector: "Édouard Vaucanson",
        contactEmail: "contact@ferronnerie-vaucanson.fr",
        contactPhone: "04 78 83 24 19",
        dpoEmail: "privacy@ferronnerie-vaucanson.fr",
        host: {
            name: "Netlify Inc. / Datacenter sécurisé en Europe",
            address: "510 20th Street, Suite 500, San Francisco, CA 94107, USA",
            phone: "+1 844-463-8543",
            website: "https://www.netlify.com"
        },
        mediator: {
            name: "CNPM MÉDIATION CONSOMMATION",
            website: "https://www.cnpm-mediation-consommation.eu",
            address: "27 avenue de la Libération, 42400 Saint-Chamond"
        },
        cookies: {
            enabled: true,
            bannerVersion: "2026.1"
        },
        accessibility: {
            status: "partiellement_conforme"
        }
    },

    // ── Administration [AUTONOME_ONLY] ─────────────────────────────
    admin: {
        email: "admin@ferronnerie-vaucanson.fr",
        passwordDefault: "VaucansonForge@2026!",
        passwordStorageKey: "admin_password_v1",
        pinDefault: "VaucansonForge@2026!",
        pinStorageKey: "admin_password_v1"
    },

    // ── Alias de Rétrocompatibilité (Accès direct sécurisé) ────────
    get contactEmail() { return this.contactForm.email; },
    set contactEmail(val) { this.contactForm.email = val; },

    get contactRedirectUrl() { return this.contactForm.redirectUrl; },
    set contactRedirectUrl(val) { this.contactForm.redirectUrl = val; },

    get contactServices() { return this.contactForm.services; },
    set contactServices(val) { this.contactForm.services = val; },

    get adminPasswordDefault() { return this.admin.passwordDefault; },
    get adminPasswordStorageKey() { return this.admin.passwordStorageKey; },

    get adminPinDefault() { return this.admin.passwordDefault; },
    set adminPinDefault(val) { this.admin.passwordDefault = val; },

    get adminPinStorageKey() { return this.admin.passwordStorageKey; },
    set adminPinStorageKey(val) { this.admin.passwordStorageKey = val; },

    // Légal & Copyright
    copyrightYear: "2026",
    copyrightName: "Ferronnerie d'Art Vaucanson & Fils SAS"

};

// Export global pour le navigateur
if (typeof window !== 'undefined') {
    window.SITE_CONFIG = SITE_CONFIG;
}
