/**
 * THEME-CONFIG.JS — Système de Design & Tokens Visuels
 * ============================================================
 * [EDITABLE] Ce fichier centralise l'identité visuelle du site.
 *
 * Rôle :
 * - Définir la palette de couleurs, la typographie, les espacements et les ombres
 * - Permettre une personnalisation graphique rapide sans toucher au CSS
 * - Exposer la méthode `applyTheme()` pour injecter les variables CSS dans `:root`
 * ============================================================
 */

const THEME_CONFIG = {

    // ── Palette de Couleurs (Design Tokens) ─────────────────────────
    colors: {
        blancArt:        "#FAF7F2",   // Fond principal clair éditorial
        champagne:       "#E8D5C0",   // Teinte douce secondaire
        terracottaPale:  "#D4A898",   // Accent subtil
        orDiscret:       "#C9A96E",   // Or signature / Accent premium
        encre:           "#1C1916",   // Texte principal haute lisibilité
        grisPierre:      "#8C7B72",   // Texte secondaire atténué
        orGlow:          "rgba(201, 169, 110, 0.12)",
        encreLight:      "rgba(28, 25, 22, 0.06)"
    },

    // ── Typographie ────────────────────────────────────────────────
    typography: {
        fontDisplay:     "'Cormorant Garamond', serif",
        fontBody:        "'Lato', sans-serif"
    },

    // ── Mise en page & Dimensions ──────────────────────────────────
    layout: {
        containerMax:    "1200px",
        sectionPaddingY: "160px"
    },

    // ── Ombres & Élévation ─────────────────────────────────────────
    shadows: {
        card:   "0 2px 24px rgba(0, 0, 0, 0.06)",
        hover:  "0 8px 40px rgba(0, 0, 0, 0.10)",
        subtle: "0 1px 8px rgba(0, 0, 0, 0.04)"
    },

    // ── Motion & Transitions ───────────────────────────────────────
    motion: {
        transitionSpeed:  "0.35s",
        transitionSlow:   "0.6s",
        customCursor:     false,
        pageVoile:        true,
        parallax:         true
    },

    /**
     * Applique dynamiquement les tokens de thème au document (CSS Custom Properties)
     */
    applyTheme: function () {
        const root = document.documentElement;
        if (!root) return;

        // Application des couleurs (tokens sémantiques universels & alias)
        if (this.colors) {
            if (this.colors.blancArt) {
                root.style.setProperty('--color-bg', this.colors.blancArt);
                root.style.setProperty('--blanc-art', this.colors.blancArt);
            }
            if (this.colors.champagne) {
                root.style.setProperty('--color-surface-warm', this.colors.champagne);
                root.style.setProperty('--champagne', this.colors.champagne);
            }
            if (this.colors.terracottaPale) {
                root.style.setProperty('--color-accent', this.colors.terracottaPale);
                root.style.setProperty('--terracotta-pale', this.colors.terracottaPale);
            }
            if (this.colors.orDiscret) {
                root.style.setProperty('--color-primary', this.colors.orDiscret);
                root.style.setProperty('--or-discret', this.colors.orDiscret);
            }
            if (this.colors.encre) {
                root.style.setProperty('--color-text-main', this.colors.encre);
                root.style.setProperty('--encre', this.colors.encre);
            }
            if (this.colors.grisPierre) {
                root.style.setProperty('--color-text-muted', this.colors.grisPierre);
                root.style.setProperty('--gris-pierre', this.colors.grisPierre);
            }
            if (this.colors.orGlow) root.style.setProperty('--or-glow', this.colors.orGlow);
            if (this.colors.encreLight) root.style.setProperty('--encre-light', this.colors.encreLight);
        }

        // Application de la typographie
        if (this.typography) {
            if (this.typography.fontDisplay) {
                root.style.setProperty('--font-display', this.typography.fontDisplay);
                root.style.setProperty('--font-heading', this.typography.fontDisplay);
            }
            if (this.typography.fontBody) root.style.setProperty('--font-body', this.typography.fontBody);
        }

        // Application du layout
        if (this.layout) {
            if (this.layout.containerMax) root.style.setProperty('--container-max', this.layout.containerMax);
        }

        console.log('[ThemeConfig] Tokens de design appliqués avec succès.');
    }

};

// Export global pour le navigateur
if (typeof window !== 'undefined') {
    window.THEME_CONFIG = THEME_CONFIG;
}

