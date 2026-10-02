/**
 * LEGAL-MANAGER.JS — Gestionnaire Juridique & Consentement Cookies RGPD (CNIL)
 * ==========================================================================
 * Conforme à la loi LCEN, RGPD (2016/679), Recommandations CNIL et RGAA.
 * Gère nativement sans dépendance externe :
 * 1. Le bandeau de consentement cookies (Prior consent, Tout accepter / Tout refuser / Personnaliser).
 * 2. La modale juridique multi-onglets (Mentions légales, RGPD, CGU/CGV, Accessibilité).
 * 3. L'injection dynamique des données légales (SIRET, Hébergeur, Médiateur, DPO).
 * ==========================================================================
 */

(function () {
    'use strict';

    const COOKIE_STORAGE_KEY = 'we_cookie_consent_v1';
    const CONSENT_DURATION_DAYS = 180; // 6 mois (recommandation CNIL)

    // Configuration par défaut si non spécifiée
    function getLegalConfig() {
        const cfg = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.legal) ? SITE_CONFIG.legal : {};
        const identity = (typeof DEFAULT_CONTENT !== 'undefined' && DEFAULT_CONTENT.identity) ? DEFAULT_CONTENT.identity : {};
        const siteName = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.siteName && SITE_CONFIG.siteName !== 'NOM_DU_CLIENT') 
            ? SITE_CONFIG.siteName 
            : (identity.name || 'Notre Entreprise');

        return {
            companyName: cfg.companyName || siteName,
            legalForm: cfg.legalForm || 'Entreprise Individuelle (EI)',
            capital: cfg.capital || null,
            headquarters: cfg.headquarters || (identity.city ? `Siège situé à ${identity.city}` : 'France'),
            rcsOrRm: cfg.rcsOrRm || 'Immatriculation en cours d\'enregistrement',
            siret: cfg.siret || 'SIRET en cours d\'attribution',
            vatNumber: cfg.vatNumber || 'TVA non applicable, art. 293 B du CGI',
            publishingDirector: cfg.publishingDirector || identity.author || siteName,
            contactEmail: cfg.contactEmail || (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.contactEmail) || 'contact@client.fr',
            contactPhone: cfg.contactPhone || (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.actions?.phoneButton?.number) || 'Non communiqué',
            dpoEmail: cfg.dpoEmail || cfg.contactEmail || 'privacy@client.fr',
            host: {
                name: cfg.host?.name || 'Netlify Inc. / Datacenter sécurisé en Europe',
                address: cfg.host?.address || '510 20th Street, Suite 500, San Francisco, CA 94107, USA (Certifié ISO 27001)',
                phone: cfg.host?.phone || '+1 844-463-8543',
                website: cfg.host?.website || 'https://www.netlify.com'
            },
            mediator: {
                name: cfg.mediator?.name || 'CNPM MÉDIATION CONSOMMATION',
                website: cfg.mediator?.website || 'https://www.cnpm-mediation-consommation.eu',
                address: cfg.mediator?.address || '27 avenue de la Libération, 42400 Saint-Chamond'
            },
            cookies: {
                enabled: cfg.cookies?.enabled !== false,
                version: cfg.cookies?.bannerVersion || '2026.1'
            },
            accessibility: {
                status: cfg.accessibility?.status || 'partiellement_conforme'
            }
        };
    }

    // ─────────────────────────────────────────────────────────────
    // 1. GESTION DES COOKIES (CNIL CONFORME)
    // ─────────────────────────────────────────────────────────────

    function getCookieConsent() {
        try {
            const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            const now = new Date().getTime();
            const ageDays = (now - parsed.timestamp) / (1000 * 60 * 60 * 24);
            if (ageDays > CONSENT_DURATION_DAYS) {
                localStorage.removeItem(COOKIE_STORAGE_KEY);
                return null;
            }
            return parsed;
        } catch (e) {
            return null;
        }
    }

    function saveCookieConsent(preferences) {
        const consentData = {
            necessary: true,
            analytics: Boolean(preferences.analytics),
            multimedia: Boolean(preferences.multimedia),
            timestamp: new Date().getTime(),
            version: '2026.1'
        };
        try {
            localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consentData));
        } catch (e) {
            console.warn('Impossible de sauvegarder le consentement cookie :', e);
        }

        // Événement personnalisé pour permettre le déblocage des traceurs si accepté
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consentData }));
        hideCookieBanner();
        closeCookieModal();
    }

    function hideCookieBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.setAttribute('aria-hidden', 'true');
            banner.classList.remove('active');
        }
    }

    function showCookieBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.setAttribute('aria-hidden', 'false');
            banner.classList.add('active');
        }
    }

    window.openCookieSettings = function () {
        const modal = document.getElementById('cookie-settings-modal');
        if (!modal) return;
        const current = getCookieConsent() || { necessary: true, analytics: false, multimedia: false };
        const analyticsInput = document.getElementById('cookie-opt-analytics');
        const multimediaInput = document.getElementById('cookie-opt-multimedia');
        if (analyticsInput) analyticsInput.checked = Boolean(current.analytics);
        if (multimediaInput) multimediaInput.checked = Boolean(current.multimedia);
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    function closeCookieModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            if (!document.querySelector('#legal-modal.active')) {
                document.body.style.overflow = '';
            }
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 2. GESTION DE LA MODALE JURIDIQUE
    // ─────────────────────────────────────────────────────────────

    window.openLegalModal = function (tabId = 'mentions') {
        const modal = document.getElementById('legal-modal');
        if (!modal) return;

        populateLegalTexts();
        switchLegalTab(tabId);

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus accessible
        const closeBtn = modal.querySelector('.legal-modal-close');
        if (closeBtn) closeBtn.focus();
    };

    window.closeLegalModal = function () {
        const modal = document.getElementById('legal-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            if (!document.querySelector('#cookie-settings-modal.active')) {
                document.body.style.overflow = '';
            }
        }
    };

    function switchLegalTab(tabId) {
        const modal = document.getElementById('legal-modal');
        if (!modal) return;

        // Mise à jour des boutons d'onglets
        const tabBtns = modal.querySelectorAll('.legal-tab-btn');
        tabBtns.forEach(btn => {
            const isActive = btn.getAttribute('data-tab') === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Mise à jour des panneaux
        const panels = modal.querySelectorAll('.legal-panel');
        panels.forEach(panel => {
            const isActive = panel.id === `legal-panel-${tabId}`;
            panel.classList.toggle('active', isActive);
            panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });
    }

    // ─────────────────────────────────────────────────────────────
    // 3. INJECTION DYNAMIQUE DES TEXTES LÉGAUX
    // ─────────────────────────────────────────────────────────────

    function populateLegalTexts() {
        const legal = getLegalConfig();

        // 1. Mentions Légales
        const elPublisher = document.getElementById('legal-info-publisher');
        if (elPublisher) {
            elPublisher.innerHTML = `
                <p><strong>Dénomination / Raison Sociale :</strong> ${legal.companyName}</p>
                <p><strong>Forme Juridique :</strong> ${legal.legalForm} ${legal.capital ? `au capital de ${legal.capital}` : ''}</p>
                <p><strong>Siège Social / Adresse :</strong> ${legal.headquarters}</p>
                <p><strong>Immatriculation :</strong> ${legal.rcsOrRm}</p>
                <p><strong>Numéro SIRET :</strong> ${legal.siret}</p>
                <p><strong>Numéro de TVA Intracommunautaire :</strong> ${legal.vatNumber}</p>
                <p><strong>Directeur de la Publication :</strong> ${legal.publishingDirector}</p>
                <p><strong>Contact Téléphonique :</strong> ${legal.contactPhone}</p>
                <p><strong>Adresse Électronique :</strong> <a href="mailto:${legal.contactEmail}">${legal.contactEmail}</a></p>
            `;
        }

        const elHost = document.getElementById('legal-info-host');
        if (elHost) {
            elHost.innerHTML = `
                <p><strong>Hébergeur :</strong> ${legal.host.name}</p>
                <p><strong>Adresse de l'Hébergeur :</strong> ${legal.host.address}</p>
                <p><strong>Téléphone :</strong> ${legal.host.phone}</p>
                <p><strong>Site Web :</strong> <a href="${legal.host.website}" target="_blank" rel="noopener noreferrer">${legal.host.website}</a></p>
            `;
        }

        const elMediator = document.getElementById('legal-info-mediator');
        if (elMediator) {
            elMediator.innerHTML = `
                <p>Conformément à l'article L.612-1 du Code de la consommation, en cas de litige non résolu, le client consommateur peut recourir gratuitement au médiateur de la consommation compétent :</p>
                <p><strong>Organisme :</strong> ${legal.mediator.name}</p>
                <p><strong>Adresse :</strong> ${legal.mediator.address}</p>
                <p><strong>Saisine en ligne :</strong> <a href="${legal.mediator.website}" target="_blank" rel="noopener noreferrer">${legal.mediator.website}</a></p>
            `;
        }

        // 2. Politique de Confidentialité (RGPD)
        const elPrivacy = document.getElementById('legal-info-privacy');
        if (elPrivacy) {
            elPrivacy.innerHTML = `
                <p><strong>Responsable du Traitement :</strong> ${legal.companyName} (représentée par ${legal.publishingDirector}).</p>
                <p><strong>Contact Délégué / Référent Données Personnelles :</strong> <a href="mailto:${legal.dpoEmail}">${legal.dpoEmail}</a>.</p>
                <p><strong>Données Collectées :</strong> Nom, prénom, adresse e-mail, numéro de téléphone, et détails du projet transmis volontairement via le formulaire de contact ou par messagerie.</p>
                <p><strong>Finalités du Traitement :</strong> Traitement des demandes d'information, élaboration de devis personnalisés, exécution des commandes et suivi de la relation client.</p>
                <p><strong>Bases Légales :</strong> Exécution de mesures précontractuelles ou contractuelles (art. 6.1.b du RGPD) et consentement explicite de l'utilisateur (art. 6.1.a du RGPD).</p>
                <p><strong>Durée de Conservation :</strong> Les données relatives aux prospects sont conservées pour une durée maximale de 3 ans à compter du dernier contact actif. Les données relatives aux clients et pièces comptables sont archivées pendant 10 ans conformément aux obligations légales du Code de commerce.</p>
                <p><strong>Destinataires des Données :</strong> Les données sont strictement réservées à l'usage interne de ${legal.companyName} et à ses prestataires techniques d'hébergement et de messagerie soumis au RGPD. Aucune donnée n'est cédée ni vendue à des tiers.</p>
                <p><strong>Vos Droits :</strong> Conformément aux articles 15 à 22 du RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données. Vous pouvez exercer ces droits à tout moment en écrivant à <a href="mailto:${legal.dpoEmail}">${legal.dpoEmail}</a>.</p>
                <p>En cas de réclamation, vous avez le droit d'introduire une plainte auprès de l'autorité de contrôle nationale : la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).</p>
            `;
        }

        // 3. Accessibilité RGAA
        const elA11y = document.getElementById('legal-info-accessibility');
        if (elA11y) {
            const statusLabel = legal.accessibility.status === 'totalement_conforme' 
                ? 'Totalement conforme au RGAA' 
                : (legal.accessibility.status === 'partiellement_conforme' ? 'Partiellement conforme au RGAA' : 'Non conforme au RGAA');
            elA11y.innerHTML = `
                <p><strong>État de Conformité :</strong> ${statusLabel}.</p>
                <p>${legal.companyName} s'engage à rendre ses services numériques accessibles à tous, y compris aux personnes en situation de handicap, conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.</p>
                <p>Ce site intègre des contrastes de couleurs rigoureux (WCAG AA), des alternatives textuelles sur les visuels, une hiérarchie stricte des titres et une navigation complète au clavier.</p>
                <p>Si vous rencontrez un défaut d'accessibilité vous empêchant d'accéder à un contenu ou à une fonctionnalité, vous pouvez nous contacter directement à <a href="mailto:${legal.contactEmail}">${legal.contactEmail}</a> afin d'obtenir une assistance personnalisée.</p>
            `;
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. INITIALISATION & ÉCOUTEURS D'ÉVÉNEMENTS
    // ─────────────────────────────────────────────────────────────

    function initLegalSystem() {
        const legal = getLegalConfig();

        // 1. Gestion des Cookies
        if (legal.cookies.enabled) {
            const consent = getCookieConsent();
            if (!consent) {
                // Première visite : affichage du bandeau après un bref délai fluide
                setTimeout(showCookieBanner, 800);
            }

            // Bouton "Tout accepter"
            const btnAccept = document.getElementById('cookie-btn-accept');
            if (btnAccept) {
                btnAccept.addEventListener('click', function () {
                    saveCookieConsent({ analytics: true, multimedia: true });
                });
            }

            // Bouton "Tout refuser" (CNIL : même facilité d'accès)
            const btnRefuse = document.getElementById('cookie-btn-refuse');
            if (btnRefuse) {
                btnRefuse.addEventListener('click', function () {
                    saveCookieConsent({ analytics: false, multimedia: false });
                });
            }

            // Bouton "Personnaliser" (ouvre les réglages détaillés)
            const btnCustomize = document.getElementById('cookie-btn-customize');
            if (btnCustomize) {
                btnCustomize.addEventListener('click', function () {
                    hideCookieBanner();
                    window.openCookieSettings();
                });
            }

            // Bouton "Enregistrer mes choix" dans la modale de réglages
            const btnSaveSettings = document.getElementById('cookie-save-settings');
            if (btnSaveSettings) {
                btnSaveSettings.addEventListener('click', function () {
                    const analytics = document.getElementById('cookie-opt-analytics')?.checked || false;
                    const multimedia = document.getElementById('cookie-opt-multimedia')?.checked || false;
                    saveCookieConsent({ analytics, multimedia });
                });
            }

            // Fermeture de la modale de réglages cookies
            const closeCookieBtn = document.getElementById('cookie-settings-close');
            if (closeCookieBtn) {
                closeCookieBtn.addEventListener('click', closeCookieModal);
            }
        }

        // 2. Gestion des Onglets de la Modale Légale
        const legalModal = document.getElementById('legal-modal');
        if (legalModal) {
            const tabBtns = legalModal.querySelectorAll('.legal-tab-btn');
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    const targetTab = this.getAttribute('data-tab');
                    switchLegalTab(targetTab);
                });
            });

            const closeLegalBtn = legalModal.querySelector('.legal-modal-close');
            if (closeLegalBtn) {
                closeLegalBtn.addEventListener('click', window.closeLegalModal);
            }

            // Fermeture sur clic arrière-plan
            legalModal.addEventListener('click', function (e) {
                if (e.target === legalModal) {
                    window.closeLegalModal();
                }
            });
        }

        // 3. Fermeture sur touche Échap (Accessibilité clavier)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (document.querySelector('#cookie-settings-modal.active')) {
                    closeCookieModal();
                } else if (document.querySelector('#legal-modal.active')) {
                    window.closeLegalModal();
                }
            }
        });

        // 4. Délégation d'événements pour les liens légaux du site (ex: footer ou formulaire)
        document.addEventListener('click', function (e) {
            const trigger = e.target.closest('[data-legal-tab]');
            if (trigger) {
                e.preventDefault();
                const tab = trigger.getAttribute('data-legal-tab');
                window.openLegalModal(tab);
            }
        });
    }

    // Lancement au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLegalSystem);
    } else {
        initLegalSystem();
    }

})();
