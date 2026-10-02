/**
 * THEME-CONFIG.JS — Système de Design & Tokens Visuels
 * ============================================================
 * [EDITABLE] Ferronnerie d'Art Vaucanson & Fils — Lyon (Test 10 Firebase)
 * Thème Sombre Forge Traditionnelle & Haute Métallerie d'Art
 * ============================================================
 */

const THEME_CONFIG = {

    // ── Palette de Couleurs (Design Tokens Atelier Forge) ───────────
    colors: {
        blancArt:        "#0B0E14",   // Fond principal sombre forge (acier noirci)
        champagne:       "#121722",   // Surfaces des cartes & blocs (fonte d'atelier)
        terracottaPale:  "#D98E54",   // Éclat braise vive / accent
        orDiscret:       "#C67D43",   // Laiton chaud & braise de forge (primaire)
        encre:           "#E2E8F0",   // Texte principal acier poli (haute lisibilité sur fond sombre)
        grisPierre:      "#94A3B8",   // Texte secondaire cendre minérale
        orGlow:          "rgba(198, 125, 67, 0.22)",
        encreLight:      "rgba(226, 232, 240, 0.08)"
    },

    // ── Typographie Forgeron d'Art ─────────────────────────────────
    typography: {
        fontDisplay:     "'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontBody:        "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },

    // ── Mise en page & Dimensions ──────────────────────────────────
    layout: {
        containerMax:    "1200px",
        sectionPaddingY: "140px"
    },

    // ── Ombres & Élévation (Thème Sombre) ──────────────────────────
    shadows: {
        card:   "0 4px 20px rgba(0, 0, 0, 0.35)",
        hover:  "0 12px 36px rgba(0, 0, 0, 0.55)",
        subtle: "0 2px 10px rgba(0, 0, 0, 0.25)"
    },

    // ── Motion & Transitions ───────────────────────────────────────
    motion: {
        transitionSpeed:  "0.25s",
        transitionSlow:   "0.5s",
        customCursor:     false,
        pageVoile:        false,
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
                root.style.setProperty('--fond-page', this.colors.blancArt);
            }
            if (this.colors.champagne) {
                root.style.setProperty('--color-surface', this.colors.champagne);
                root.style.setProperty('--color-surface-warm', '#181E2C');
                root.style.setProperty('--champagne', this.colors.champagne);
                root.style.setProperty('--fond-carte', this.colors.champagne);
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
                root.style.setProperty('--texte-principal', this.colors.encre);
            }
            if (this.colors.grisPierre) {
                root.style.setProperty('--color-text-muted', this.colors.grisPierre);
                root.style.setProperty('--gris-pierre', this.colors.grisPierre);
                root.style.setProperty('--texte-secondaire', this.colors.grisPierre);
            }
            if (this.colors.orGlow) root.style.setProperty('--or-glow', this.colors.orGlow);
            if (this.colors.encreLight) root.style.setProperty('--encre-light', this.colors.encreLight);
            root.style.setProperty('--color-surface-hover', '#1B2232');
            root.style.setProperty('--color-border', 'rgba(198, 125, 67, 0.22)');
            root.style.setProperty('--color-border-hover', 'rgba(217, 142, 84, 0.55)');
        }

        // Application de la typographie
        if (this.typography) {
            if (this.typography.fontDisplay) {
                root.style.setProperty('--font-display', this.typography.fontDisplay);
                root.style.setProperty('--font-heading', this.typography.fontDisplay);
                root.style.setProperty('--police-titre', this.typography.fontDisplay);
            }
            if (this.typography.fontBody) {
                root.style.setProperty('--font-body', this.typography.fontBody);
                root.style.setProperty('--police-corps', this.typography.fontBody);
            }
        }

        // Application du layout
        if (this.layout) {
            if (this.layout.containerMax) root.style.setProperty('--container-max', this.layout.containerMax);
        }

        console.log('[ThemeConfig] Tokens de design Ferronnerie Vaucanson appliqués avec succès.');
    }

};

// Export global pour le navigateur
if (typeof window !== 'undefined') {
    window.THEME_CONFIG = THEME_CONFIG;
}
