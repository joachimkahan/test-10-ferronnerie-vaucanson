/**
 * SECTION-RENDERER.JS — Registre & Moteur de rendu dynamique des Sections
 * ============================================================
 * [PROTECTED] Moteur d'affichage des sections publiques.
 *
 * Rôle :
 * - Piloter l'activation et l'ordre d'affichage des sections publiques
 * - Synchroniser automatiquement les liens de navigation (Navbar)
 * - Rendre chaque composant via les données de SiteContent
 * - Gérer les sections inconnues, désactivées ou sans données sans planter
 * ============================================================
 */

(function () {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // 1. REGISTRE DES FONCTIONS DE RENDU DE SECTION
    // ─────────────────────────────────────────────────────────────

    /**
     * Rendu de la section Hero
     */
    async function renderHero(isActive) {
        const heroEl = document.getElementById('accueil');
        if (!heroEl) return;

        if (!isActive) {
            heroEl.style.display = 'none';
            return;
        }
        const globalSiteConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : (typeof window !== 'undefined' ? window.SITE_CONFIG : null);
        const heroVariant = globalSiteConfig?.variants?.hero || 'cinematic-full';
        if (heroVariant === 'editorial-split') {
            heroEl.classList.add('hero-split');
        } else {
            heroEl.classList.remove('hero-split');
        }

        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                if (content && content.hero) {
                    const eyebrowEl = heroEl.querySelector('.hero-eyebrow');
                    if (eyebrowEl && content.hero.eyebrow) eyebrowEl.textContent = content.hero.eyebrow;

                    const titleEl = heroEl.querySelector('h1');
                    if (titleEl && content.hero.titleHtml) {
                        titleEl.innerHTML = content.hero.titleHtml;
                    }

                    const descEl = heroEl.querySelector('.hero-description');
                    if (descEl && content.hero.description) descEl.textContent = content.hero.description;

                    const imgEl = heroEl.querySelector('.hero-media img');
                    if (imgEl && content.hero.imageUrl) {
                        imgEl.src = content.hero.imageUrl;
                        imgEl.alt = content.hero.eyebrow || 'Visuel principal';
                    }

                    const ctaEl = heroEl.querySelector('#hero-cta');
                    if (ctaEl) {
                        const globalSiteConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : (typeof window !== 'undefined' ? window.SITE_CONFIG : null);
                        if (content.hero.ctaText) ctaEl.textContent = content.hero.ctaText;
                        else if (globalSiteConfig?.actions?.primaryCta?.label) ctaEl.textContent = globalSiteConfig.actions.primaryCta.label;
                        if (globalSiteConfig?.actions?.primaryCta?.href) ctaEl.setAttribute('href', globalSiteConfig.actions.primaryCta.href);
                    }

                    // ── [CAND-03] Multi-CTA Hero avec Téléchargement Direct ──
                    const secCta = content.hero.secondaryCta;
                    let secCtaEl = heroEl.querySelector('#hero-secondary-cta');
                    if (secCta && secCta.enabled !== false && secCta.url) {
                        if (!secCtaEl) {
                            secCtaEl = document.createElement('a');
                            secCtaEl.id = 'hero-secondary-cta';
                            secCtaEl.className = 'btn-secondary btn-download';
                            if (ctaEl && ctaEl.parentNode) {
                                if (!ctaEl.parentNode.classList.contains('hero-cta-group')) {
                                    const group = document.createElement('div');
                                    group.className = 'hero-cta-group';
                                    ctaEl.parentNode.insertBefore(group, ctaEl);
                                    group.appendChild(ctaEl);
                                }
                                ctaEl.parentNode.appendChild(secCtaEl);
                            }
                        }
                        secCtaEl.style.display = 'inline-flex';
                        secCtaEl.setAttribute('href', secCta.url);
                        secCtaEl.innerHTML = `
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            <span>${secCta.text || 'Télécharger le document'}</span>
                        `;
                        if (secCta.isDownload) {
                            secCtaEl.setAttribute('download', secCta.filename || '');
                        } else {
                            secCtaEl.removeAttribute('download');
                        }
                        if (secCta.url.startsWith('http') || secCta.url.endsWith('.pdf')) {
                            secCtaEl.setAttribute('target', '_blank');
                            secCtaEl.setAttribute('rel', 'noopener noreferrer');
                        }
                    } else if (secCtaEl) {
                        secCtaEl.style.display = 'none';
                    }
                }
            } catch (err) {
                console.warn('[SectionRenderer] Erreur rendu dynamique Hero:', err);
            }
        }
    }

    /**
     * Rendu de la section À Propos
     */
    async function renderAbout(isActive) {
        const aboutEl = document.getElementById('apropos');
        if (!aboutEl) return;

        if (!isActive) {
            aboutEl.style.display = 'none';
            return;
        }
        aboutEl.style.display = '';

        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                if (content && content.about) {
                    const eyebrowEl = aboutEl.querySelector('.eyebrow');
                    if (eyebrowEl && content.about.eyebrow) eyebrowEl.textContent = content.about.eyebrow;

                    const h2El = aboutEl.querySelector('h2');
                    if (h2El && content.about.titleHtml) h2El.innerHTML = content.about.titleHtml;

                    const quoteEl = aboutEl.querySelector('.pull-quote');
                    if (quoteEl && content.about.quote) quoteEl.textContent = content.about.quote;

                    const sigEl = aboutEl.querySelector('.about-signature');
                    if (sigEl && content.about.signature) sigEl.textContent = content.about.signature;

                    const imgEl = aboutEl.querySelector('.about-image img');
                    if (imgEl && content.about.imageUrl) {
                        imgEl.src = content.about.imageUrl;
                        imgEl.alt = content.about.title || 'À propos';
                    }

                    if (Array.isArray(content.about.paragraphs) && content.about.paragraphs.length > 0) {
                        const standardPs = aboutEl.querySelectorAll('.about-text p:not(.pull-quote)');
                        content.about.paragraphs.forEach((pText, idx) => {
                            if (standardPs[idx]) standardPs[idx].textContent = pText;
                        });
                    }
                }
            } catch (err) {
                console.warn('[SectionRenderer] Erreur rendu dynamique About:', err);
            }
        }
    }

    /**
     * Rendu des Looks Signature (Onglets)
     */
    async function renderLooks(isActive) {
        const looksSection = document.getElementById('looks');
        const tabsContainer = document.getElementById('looks-tabs');
        const panelsContainer = document.getElementById('looks-panels');
        if (!looksSection) return;

        if (!isActive) {
            looksSection.style.display = 'none';
            if (tabsContainer) tabsContainer.style.display = 'none';
            if (panelsContainer) panelsContainer.style.display = 'none';
            return;
        }
        looksSection.style.display = '';

        let looks = [];
        if (window.SiteContent && typeof window.SiteContent.getLooks === 'function') {
            try {
                looks = await window.SiteContent.getLooks();
            } catch (err) {
                console.error('[SectionRenderer] Erreur looks:', err);
            }
        }

        // Personnalisation dynamique du titre, surtitre et sous-titre selon le métier
        let looksSectionData = null;
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const fullContent = await window.SiteContent.getFullContent();
                looksSectionData = fullContent?.looksSection || null;
            } catch (err) {
                console.warn('[SectionRenderer] Erreur content looksSection:', err);
            }
        }
        if (!looksSectionData && typeof DEFAULT_CONTENT !== 'undefined' && DEFAULT_CONTENT.looksSection) {
            looksSectionData = DEFAULT_CONTENT.looksSection;
        }

        if (looksSectionData) {
            const eyebrowEl = looksSection.querySelector('.eyebrow');
            if (eyebrowEl && looksSectionData.eyebrow) eyebrowEl.textContent = looksSectionData.eyebrow;
            const titleEl = looksSection.querySelector('.section-title');
            if (titleEl && looksSectionData.title) titleEl.innerHTML = looksSectionData.title;
            const subtitleEl = looksSection.querySelector('.section-subtitle');
            if (subtitleEl && looksSectionData.subtitle) subtitleEl.textContent = looksSectionData.subtitle;
        }

        if (!Array.isArray(looks) || looks.length === 0) {
            const emptyLabel = looksSectionData?.title ? `Aucun élément disponible dans ${looksSectionData.title.toLowerCase()}.` : 'Aucun contenu disponible actuellement.';
            if (panelsContainer) panelsContainer.innerHTML = `<p style="text-align:center; color:var(--color-text-muted, var(--texte-secondaire));">${emptyLabel}</p>`;
            if (tabsContainer) tabsContainer.innerHTML = '';
            return;
        }

        if (tabsContainer) {
            tabsContainer.innerHTML = looks.map((look, i) => {
                const label = (look.subtitle && look.subtitle.includes('—')) ? (look.subtitle.split('—')[1] ? look.subtitle.split('—')[1].trim() : look.subtitle) : (look.subtitle || look.title || 'Look');
                return `<button class="looks-tab ${i === 0 ? 'active' : ''}" data-tab="${look.id}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}">${label}</button>`;
            }).join('');
        }

        if (panelsContainer) {
            panelsContainer.innerHTML = looks.map((look, i) => {
                const tagsHtml = (function() {
                    let tl = [];
                    if (Array.isArray(look.tags)) tl = look.tags;
                    else if (typeof look.tags === 'string' && look.tags.trim()) tl = look.tags.split(',').map(t => t.trim()).filter(Boolean);
                    return tl.map(tag => `<span class="look-tag">${tag}</span>`).join('');
                })();

                const detail1 = look.detailImage1Url ? `<img src="${look.detailImage1Url}" alt="Détail 1" loading="lazy">` : '';
                const detail2 = look.detailImage2Url ? `<img src="${look.detailImage2Url}" alt="Détail 2" loading="lazy">` : '';
                const detailGrid = (detail1 || detail2) ? `<div class="look-detail-grid">${detail1}${detail2}</div>` : '';

                return `
                <div class="look-panel ${i === 0 ? 'active' : ''}" data-panel="${look.id}" role="tabpanel">
                    <div class="look-card">
                        <img class="look-hero-image"
                             src="${look.heroImageUrl}"
                             alt="${look.title || 'Look'}"
                             loading="lazy">
                        <span class="look-card-eyebrow">${look.subtitle || ''}</span>
                        <h2>${look.title || ''}</h2>
                        <p class="look-card-description">${look.description || ''}</p>
                        ${detailGrid}
                        <div class="look-tags">${tagsHtml}</div>
                    </div>
                </div>`;
            }).join('');

            // Événements onglets
            const tabs = tabsContainer?.querySelectorAll('.looks-tab') || [];
            const panels = panelsContainer.querySelectorAll('.look-panel');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const targetPanel = tab.dataset.tab;
                    tabs.forEach(t => {
                        t.classList.remove('active');
                        t.setAttribute('aria-selected', 'false');
                    });
                    tab.classList.add('active');
                    tab.setAttribute('aria-selected', 'true');

                    panels.forEach(p => p.classList.remove('active'));
                    const panel = panelsContainer.querySelector(`.look-panel[data-panel="${targetPanel}"]`);
                    if (panel) panel.classList.add('active');
                });
            });
        }
    }

    /**
     * Rendu du Comparateur Avant / Après
     */
    async function renderBeforeAfter(isActive) {
        const section = document.getElementById('glow-slider-section');
        const container = document.getElementById('ba-sliders-container');
        const nav = document.getElementById('ba-nav');
        if (!section) return;

        if (!isActive) {
            section.style.display = 'none';
            return;
        }
        section.style.display = '';

        if (!container) return;

        let items = [];
        if (window.SiteContent && typeof window.SiteContent.getBeforeAfter === 'function') {
            try {
                items = await window.SiteContent.getBeforeAfter();
            } catch (err) {
                console.error('[SectionRenderer] Erreur avant/après:', err);
            }
        }

        if (!Array.isArray(items) || items.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:var(--color-text-muted, var(--texte-secondaire));">Aucune transformation disponible actuellement.</p>';
            if (nav) nav.style.display = 'none';
            return;
        }

        container.innerHTML = items.map((item, i) => `
            <div class="ba-slide ${i === 0 ? 'active' : ''}" data-ba-index="${i}">
                <div class="ba-slide-title">${item.title || 'Transformation'}</div>
                <div class="glow-slider-wrapper" data-slider-id="${i}">
                    <div class="glow-slider-before">
                        <img src="${item.beforeUrl}" alt="Avant — ${item.title || ''}" loading="lazy">
                    </div>
                    <div class="glow-slider-after" data-after-id="${i}">
                        <img src="${item.afterUrl}" alt="Après — ${item.title || ''}" loading="lazy">
                    </div>
                    <div class="glow-slider-handle" data-handle-id="${i}">
                        <div class="glow-slider-handle-knob"></div>
                    </div>
                    <span class="glow-slider-label left">Avant</span>
                    <span class="glow-slider-label right">Après</span>
                </div>
            </div>
        `).join('');

        if (items.length > 1 && nav) {
            nav.style.display = 'flex';
            nav.innerHTML = items.map((item, i) => `
                <button class="ba-dot ${i === 0 ? 'active' : ''}" data-ba-dot="${i}" aria-label="Transformation ${i + 1}">${item.title || `Option ${i + 1}`}</button>
            `).join('');

            const dots = nav.querySelectorAll('.ba-dot');
            const slides = container.querySelectorAll('.ba-slide');

            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const idx = parseInt(dot.dataset.baDot, 10);
                    slides.forEach(s => s.classList.remove('active'));
                    dots.forEach(d => d.classList.remove('active'));
                    slides[idx]?.classList.add('active');
                    dots[idx]?.classList.add('active');

                    const afterEl = slides[idx]?.querySelector('[data-after-id]');
                    const handleEl = slides[idx]?.querySelector('[data-handle-id]');
                    if (afterEl && handleEl) {
                        afterEl.style.clipPath = 'inset(0 50% 0 0)';
                        handleEl.style.left = '50%';
                    }
                });
            });
        }

        // Configuration interactive du slider
        const allSliders = container.querySelectorAll('.glow-slider-wrapper');
        allSliders.forEach(slider => {
            const afterEl = slider.querySelector('[data-after-id]');
            const handleEl = slider.querySelector('[data-handle-id]');
            const labelLeft = slider.querySelector('.glow-slider-label.left');
            const labelRight = slider.querySelector('.glow-slider-label.right');

            if (!afterEl || !handleEl) return;

            let isDragging = false;
            let labelTimeout = null;

            function updateSlider(percentage) {
                percentage = Math.max(5, Math.min(95, percentage));
                afterEl.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
                handleEl.style.left = percentage + '%';
            }

            function getPercentage(clientX) {
                const rect = slider.getBoundingClientRect();
                return ((clientX - rect.left) / rect.width) * 100;
            }

            function fadeLabels() {
                if (labelTimeout) clearTimeout(labelTimeout);
                labelLeft?.classList.remove('faded');
                labelRight?.classList.remove('faded');
                labelTimeout = setTimeout(() => {
                    labelLeft?.classList.add('faded');
                    labelRight?.classList.add('faded');
                }, 2000);
            }

            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                updateSlider(getPercentage(e.clientX));
                fadeLabels();
                e.preventDefault();
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                updateSlider(getPercentage(e.clientX));
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });

            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
                updateSlider(getPercentage(e.touches[0].clientX));
                fadeLabels();
            }, { passive: true });

            slider.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                updateSlider(getPercentage(e.touches[0].clientX));
                e.preventDefault();
            }, { passive: false });

            slider.addEventListener('touchend', () => {
                isDragging = false;
            });

            updateSlider(50);
        });
    }

    /**
     * Rendu de la Galerie Portfolio
     */
    async function renderGallery(isActive) {
        const gallerySection = document.getElementById('gallery') || document.querySelector('.portfolio-dynamic');
        const grid = document.getElementById('gallery-grid');
        if (!gallerySection && !grid) return;

        if (!isActive) {
            if (gallerySection) gallerySection.style.display = 'none';
            return;
        }
        if (gallerySection) gallerySection.style.display = '';

        if (!grid) return;

        let items = [];
        if (window.SiteContent && typeof window.SiteContent.getGallery === 'function') {
            try {
                items = await window.SiteContent.getGallery();
            } catch (err) {
                console.error('[SectionRenderer] Erreur galerie:', err);
            }
        }

        if (!Array.isArray(items) || items.length === 0) {
            grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-muted, var(--texte-secondaire));">Le portfolio est en cours de mise à jour.</p>';
            return;
        }

        // ── [CAND-05] Support de la variante Bento Grid ──
        const globalSiteConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : (typeof window !== 'undefined' ? window.SITE_CONFIG : null);
        const galleryVariant = globalSiteConfig?.variants?.gallery || 'grid';
        if (galleryVariant === 'bento') {
            grid.classList.add('bento-grid');
        } else {
            grid.classList.remove('bento-grid');
        }

        window._lastGalleryItems = items;

        grid.innerHTML = items.map((item, i) => {
            const isVideo = item.type === 'video';
            const hasTargetUrl = Boolean(item.targetUrl);
            const hasCaseStudy = Boolean(item.caseStudy && item.caseStudy.enabled !== false);
            const hasDocument = Boolean(item.documentUrl);
            let thumbUrl = item.url;

            if (isVideo) {
                if (item.url.includes('youtube.com/watch?v=')) {
                    const vid = item.url.includes('v=') ? item.url.split('v=')[1].split('&')[0] : (item.url.includes('youtu.be/') ? item.url.split('youtu.be/')[1].split('?')[0] : (item.url.includes('embed/') ? item.url.split('embed/')[1].split('?')[0] : ''));
                    thumbUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
                } else if (item.url.includes('youtu.be/')) {
                    const vid = item.url.split('youtu.be/')[1].split('?')[0];
                    thumbUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
                } else {
                    thumbUrl = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80';
                }
            }

            const badgeHtml = item.badge ? `<span class="portfolio-badge">${item.badge}</span>` : (isVideo ? '<span class="video-badge">Vidéo</span>' : '');
            const tagsHtml = Array.isArray(item.tags) ? `<div class="portfolio-tags">${item.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}</div>` : '';
            
            // ── [CAND-06 & CAND-07] Boutons d'Action enrichis ──
            const ctaBtn = hasTargetUrl
                ? `<a href="${item.targetUrl}" target="_blank" rel="noopener" class="btn-view-live" onclick="event.stopPropagation();">Tester le site en direct ↗</a>`
                : '';
            const caseStudyBtn = hasCaseStudy
                ? `<button type="button" class="btn-case-study" onclick="event.stopPropagation(); window.App?.openCaseStudyModal('${item.id || i}');"><span>Étude de cas</span></button>`
                : '';
            const docBtn = hasDocument
                ? `<a href="${item.documentUrl}" target="_blank" rel="noopener noreferrer" download="${item.documentLabel || 'Document.pdf'}" class="btn-doc-download" onclick="event.stopPropagation();"><span>${item.documentLabel || 'Livrable PDF'}</span></a>`
                : '';

            const actionsHtml = (ctaBtn || caseStudyBtn || docBtn)
                ? `<div class="gallery-card-actions">${ctaBtn}${caseStudyBtn}${docBtn}</div>`
                : '';

            let clickAction = '';
            if (hasCaseStudy) {
                clickAction = `window.App?.openCaseStudyModal('${item.id || i}')`;
            } else if (hasTargetUrl) {
                clickAction = `window.open('${item.targetUrl}', '_blank', 'noopener')`;
            } else {
                clickAction = `openLightbox('${item.url}', '${item.type}')`;
            }

            // N'afficher la barre de navigateur mockup QUE pour la variante tech explicite 'browser-mockup'
            const showBrowserBar = galleryVariant === 'browser-mockup';

            const mockupBarHtml = showBrowserBar ? `
                <div class="browser-mockup-bar">
                    <div class="browser-dots">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                    <span class="browser-url-bar">${item.displayUrl || (hasTargetUrl ? item.targetUrl.replace('https://', '').replace('/', '') : '')}</span>
                    ${badgeHtml}
                </div>` : '';

            const floatingBadgeHtml = (!showBrowserBar && badgeHtml) ? `
                <div class="gallery-badge-floating">${badgeHtml}</div>` : '';

            const delay = Math.min(i * 0.1, 0.6);

            return `
            <div class="gallery-item-card ${showBrowserBar ? 'browser-card' : 'classic-card'}"
                 style="opacity:1; transform:translateY(0); transition: opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s var(--ease-smooth)"
                 onclick="${clickAction}">
                ${mockupBarHtml}
                <div class="gallery-img-container">
                    <img src="${thumbUrl}" alt="${item.title || 'Réalisation'}" loading="lazy">
                    ${floatingBadgeHtml}
                </div>
                <div class="gallery-card-content">
                    <h3 class="gallery-card-title">${item.title || 'Projet'}</h3>
                    ${item.description ? `<p class="gallery-card-desc">${item.description}</p>` : ''}
                    ${tagsHtml}
                    ${actionsHtml}
                </div>
            </div>`;
        }).join('');
    }

    /**
     * Rendu des Prestations & Tarifs
     */
    async function renderPrestations(isActive) {
        const section = document.getElementById('prestations');
        const grid = document.getElementById('services-grid');
        if (!section) return;

        if (!isActive) {
            section.style.display = 'none';
            return;
        }
        section.style.display = '';

        if (!grid) return;

        let items = [];
        if (window.SiteContent && typeof window.SiteContent.getPrestations === 'function') {
            try {
                items = await window.SiteContent.getPrestations();
            } catch (err) {
                console.error('[SectionRenderer] Erreur prestations:', err);
            }
        }

        if (!Array.isArray(items) || items.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted, var(--texte-secondaire));">Les prestations sont en cours de mise à jour.</p>';
            return;
        }

        const globalSiteConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : (typeof window !== 'undefined' ? window.SITE_CONFIG : null);
        const prestaVariant = globalSiteConfig?.variants?.prestations || 'pricing-cards';
        const isGlobalExpertise = prestaVariant === 'cards-expertise';

        if (prestaVariant === 'menu-list') {
            grid.className = 'services-menu-list';
            grid.innerHTML = items.map((item, i) => {
                const delay = Math.min(i * 0.1, 0.5);
                let featuresHtml = '';
                if (Array.isArray(item.features) && item.features.length > 0) {
                    const pills = item.features.map(f => {
                        const cleanFeature = f.replace(/^[✦•·\-—]\s*/, '').trim();
                        return `<span class="menu-feature-pill">${cleanFeature}</span>`;
                    }).join('');
                    featuresHtml = `<div class="menu-list-features">${pills}</div>`;
                }
                return `
                <div class="menu-list-item reveal" style="animation-delay:${delay}s">
                    <div class="menu-list-header">
                        <span class="menu-list-title">${item.icon ? `${item.icon} ` : ''}${item.title || ''}</span>
                        <span class="menu-list-leader"></span>
                        <span class="menu-list-price">${item.price || ''}</span>
                    </div>
                    ${item.description ? `<p class="menu-list-desc">${item.description}</p>` : ''}
                    ${featuresHtml}
                </div>`;
            }).join('');
            return;
        }

        grid.className = 'services-grid reveal-stagger';

        grid.innerHTML = items.map((item, i) => {
            const delay = Math.min(i * 0.1, 0.5);
            const isCardExpertise = isGlobalExpertise || item.variant === 'cards-expertise' || Boolean(item.skills && !item.price);
            const badgeHtml = item.badge ? `<div class="pricing-badge">${item.badge}</div>` : '';
            const isFeatured = item.badge ? 'featured-pricing' : '';

            // Features ou Skills list avec icônes vectorielles SVG fines (1.5px)
            const checkSvg = '<svg class="check-icon-svg" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5L6.5 11.5L12.5 4.5"/></svg>';
            let featuresHtml = '';
            if (Array.isArray(item.skills) && item.skills.length > 0) {
                featuresHtml = `<ul class="pricing-features expertise-skills-list">${item.skills.map(s => `<li>${checkSvg}<span>${s}</span></li>`).join('')}</ul>`;
            } else if (Array.isArray(item.features) && item.features.length > 0) {
                featuresHtml = `<ul class="pricing-features">${item.features.map(f => `<li>${checkSvg}<span>${f}</span></li>`).join('')}</ul>`;
            }

            // Price splitting (masqué si variante expertise)
            let pricingBoxHtml = '';
            if (!isCardExpertise && item.price) {
                let rawPrice = item.price;
                let mainPrice = rawPrice;
                let subPrice = '';
                if (rawPrice.includes('(')) {
                    const parts = rawPrice.split('(');
                    mainPrice = parts[0].trim();
                    subPrice = parts[1].replace(')', '').trim();
                }
                pricingBoxHtml = `
                    <div class="pricing-box">
                        <div class="price-main">${mainPrice}</div>
                        ${subPrice ? `<div class="price-sub">${subPrice}</div>` : ''}
                    </div>
                `;
            }

            const ctaHref = item.ctaUrl || (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.actions && SITE_CONFIG.actions.primaryCta ? SITE_CONFIG.actions.primaryCta.url : '') || '#contact';
            const defaultCtaLabel = isCardExpertise ? 'Demander une étude' : (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.actions && SITE_CONFIG.actions.primaryCta ? SITE_CONFIG.actions.primaryCta.label : 'Nous contacter');
            const cleanIcon = (item.icon && !['✨', '⭐', '💎', '⚡', '🚀'].includes(item.icon.trim())) ? `<div class="service-icon">${item.icon}</div>` : '';

            return `
            <div class="service-card ${isFeatured} ${isCardExpertise ? 'expertise-card' : ''}" style="opacity:1; transform:translateY(0); transition: opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s var(--ease-smooth)">
                ${badgeHtml}
                ${cleanIcon}
                <h3 class="service-name">${item.title || ''}</h3>
                <p class="service-desc">${item.description || ''}</p>
                ${pricingBoxHtml}
                ${featuresHtml}
                <a href="${ctaHref}" ${ctaHref.startsWith('#') ? '' : 'target="_blank" rel="noopener"'} class="btn-primary btn-pricing">
                    ${item.ctaText || defaultCtaLabel}
                </a>
            </div>`;
        }).join('');
    }

    /**
     * Rendu des Logos Partenaires
     */
    async function renderPartners(isActive) {
        const section = document.getElementById('partenaires');
        const grid = document.getElementById('partners-grid');
        if (!section) return;
        if (!isActive) {
            section.style.display = 'none';
            return;
        }

        let content = null;
        let partners = [];
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                content = await window.SiteContent.getFullContent();
                partners = content?.partners || [];
            } catch (err) {
                console.warn('[SectionRenderer] Erreur partners:', err);
            }
        }
        if ((!Array.isArray(partners) || partners.length === 0) && typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.partners)) {
            partners = DEFAULT_CONTENT.partners;
        }

        if (!Array.isArray(partners) || partners.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = '';

        const globalSiteConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : (typeof window !== 'undefined' ? window.SITE_CONFIG : null);
        const partnerVariant = globalSiteConfig?.variants?.partners || (partners.some(p => p.imageUrl || p.category) ? 'brand-showcase' : 'logo-cloud');

        // Mise à jour dynamique du titre et surtitre si configurés
        const partnersSectionData = content?.partnersSection || (typeof DEFAULT_CONTENT !== 'undefined' ? DEFAULT_CONTENT.partnersSection : null);
        if (partnersSectionData) {
            const eyebrowEl = section.querySelector('.eyebrow');
            if (eyebrowEl && partnersSectionData.eyebrow) eyebrowEl.textContent = partnersSectionData.eyebrow;
            const titleEl = section.querySelector('.partners-title');
            if (titleEl && partnersSectionData.title) titleEl.textContent = partnersSectionData.title;
        }

        if (grid) {
            grid.className = `partners-grid ${partnerVariant === 'logo-cloud' ? 'logo-cloud-grid' : 'brand-showcase-grid'} reveal-stagger`;
            grid.innerHTML = partners.map(p => {
                if (partnerVariant === 'logo-cloud') {
                    return `
                    <div class="partner-item partner-logo">
                        <img src="${p.logoUrl || p.imageUrl}" alt="${p.name || 'Partenaire'}" loading="lazy">
                    </div>`;
                }
                const subtitle = p.description || p.category || p.subtitle || '';
                const visualUrl = p.imageUrl || p.logoUrl;
                const imgHtml = visualUrl ? `
                    <div class="partner-card-img">
                        <img src="${visualUrl}" alt="${p.name || 'Partenaire'}" loading="lazy">
                    </div>` : '';

                return `
                <div class="partner-item partner-card ${visualUrl ? 'has-image' : ''}">
                    ${imgHtml}
                    <div class="partner-card-body">
                        <span class="partner-brand-name">${p.name || ''}</span>
                        ${subtitle ? `<span class="partner-brand-sub">${subtitle}</span>` : ''}
                    </div>
                </div>`;
            }).join('');
        }
    }

    /**
     * Rendu du Processus & Méthode en étapes
     */
    async function renderProcess(isActive) {
        const section = document.getElementById('methode');
        const grid = document.getElementById('process-grid');
        if (!section) return;

        if (!isActive) {
            section.style.display = 'none';
            return;
        }

        let processData = null;
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                processData = content.process;
            } catch (err) {
                console.warn('[SectionRenderer] Erreur process:', err);
            }
        }

        if (!processData && typeof DEFAULT_CONTENT !== 'undefined') {
            processData = DEFAULT_CONTENT.process;
        }

        if (!processData || !Array.isArray(processData.steps) || processData.steps.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = '';

        const eyebrowEl = section.querySelector('.section-eyebrow');
        if (eyebrowEl && processData.eyebrow) eyebrowEl.textContent = processData.eyebrow;

        const titleEl = section.querySelector('h2');
        if (titleEl && processData.titleHtml) titleEl.innerHTML = processData.titleHtml;

        if (grid) {
            grid.innerHTML = processData.steps.map((step, i) => `
                <div class="process-card">
                    <div class="process-number">${step.number || '0' + (i + 1)}</div>
                    <h3 class="process-title">${step.title || ''}</h3>
                    <p class="process-desc">${step.description || ''}</p>
                </div>
            `).join('');
        }
    }

    /**
     * Rendu des Témoignages Clients
     */
    async function renderTestimonials(isActive) {
        const section = document.getElementById('temoignages');
        const grid = document.getElementById('testimonials-grid');
        if (!section) return;
        if (!isActive) {
            section.style.display = 'none';
            return;
        }

        let items = [];
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                items = content.testimonials || [];
            } catch (err) {
                console.warn('[SectionRenderer] Erreur testimonials:', err);
            }
        }
        if ((!Array.isArray(items) || items.length === 0) && typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.testimonials)) {
            items = DEFAULT_CONTENT.testimonials;
        }

        if (!Array.isArray(items) || items.length === 0) {
            section.style.display = 'none';
            return;
        }

        const globalSiteConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : (typeof window !== 'undefined' ? window.SITE_CONFIG : null);
        const testiVariant = globalSiteConfig?.variants?.testimonials || 'cards-grid';

        if (testiVariant === 'quote-editorial' && items.length > 0) {
            const first = items[0];
            const rating = Math.max(1, Math.min(5, parseInt(first.rating, 10) || 5));
            const stars = '★'.repeat(rating);
            grid.className = 'testimonials-quote-editorial';
            grid.innerHTML = `
                <div class="quote-editorial-box reveal">
                    <div class="stars-rating" style="justify-content:center; margin-bottom:var(--space-md);">${stars}</div>
                    <blockquote class="quote-editorial-text">“${first.text || ''}”</blockquote>
                    <div class="quote-editorial-author">
                        <span class="author-name">${first.author || ''}</span>
                        ${first.role ? `<span class="author-role"> — ${first.role}</span>` : ''}
                    </div>
                </div>
            `;
            return;
        }

        grid.className = 'testimonials-grid reveal-stagger';

        if (grid) {
            grid.innerHTML = items.map((item, i) => {
                const rating = Math.max(1, Math.min(5, parseInt(item.rating, 10) || 5));
                const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
                const initials = (item.author || 'C').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                return `
                <div class="testimonial-card reveal" style="animation-delay:${i * 0.1}s">
                    <div class="testimonial-header">
                        <div class="stars-rating">${stars}</div>
                    </div>
                    <div class="testimonial-quote">“${item.text || ''}”</div>
                    <div class="testimonial-author-box">
                        <div class="author-avatar">${initials}</div>
                        <div class="author-info">
                            <div class="author-name" style="font-weight:600; color:var(--texte-principal, var(--color-text-main));">${item.author || 'Client'}</div>
                            <div class="author-role" style="font-size:0.85rem; color:var(--color-text-muted, var(--texte-secondaire));">${item.role || ''}${item.date ? ` · ${item.date}` : ''}</div>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }
    }

    /**
     * Rendu de la FAQ Accordéon
     */
    async function renderFaq(isActive) {
        const section = document.getElementById('faq');
        const container = document.getElementById('faq-accordion');
        if (!section) return;

        if (!isActive) {
            section.style.display = 'none';
            return;
        }

        let faqList = [];
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                faqList = content.faq || [];
            } catch (err) {
                console.warn('[SectionRenderer] Erreur FAQ:', err);
            }
        }

        if ((!Array.isArray(faqList) || faqList.length === 0) && typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.faq)) {
            faqList = DEFAULT_CONTENT.faq;
        }

        if (!Array.isArray(faqList) || faqList.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = '';
        if (container) {
            container.innerHTML = faqList.map((item, i) => `
                <details class="faq-item" ${i === 0 ? 'open' : ''}>
                    <summary class="faq-question">
                        <span>${item.question || ''}</span>
                        <span class="faq-icon" aria-hidden="true">+</span>
                    </summary>
                    <div class="faq-answer">
                        <p>${item.answer || ''}</p>
                    </div>
                </details>
            `).join('');
        }
    }

    /**
     * Rendu des Informations Pratiques
     */
    async function renderPracticalInfo(isActive) {
        const section = document.getElementById('infos-pratiques');
        if (!section) return;
        if (!isActive) {
            section.style.display = 'none';
            return;
        }

        let info = null;
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                info = content.practicalInfo || null;
            } catch (err) {
                console.warn('[SectionRenderer] Erreur practicalInfo:', err);
            }
        }
        if (!info && typeof DEFAULT_CONTENT !== 'undefined') {
            info = DEFAULT_CONTENT.practicalInfo || null;
        }

        if (!info) {
            section.style.display = 'none';
            return;
        }

        section.style.display = '';

        // Surtitre et Titre dynamiques de la section
        const eyebrowEl = section.querySelector('.eyebrow');
        if (eyebrowEl && info.eyebrow) eyebrowEl.textContent = info.eyebrow;

        const titleEl = section.querySelector('.section-title');
        if (titleEl && info.title) titleEl.innerHTML = info.title;

        // Pastille de statut en direct
        const statusContainer = section.querySelector('.status-pill-container');
        const statusTextEl = section.querySelector('.status-text');
        const statusDotEl = section.querySelector('.status-pulse-dot');
        if (info.statusText && statusTextEl) {
            statusTextEl.textContent = info.statusText;
            if (statusContainer) statusContainer.style.display = 'flex';
            if (statusDotEl) {
                statusDotEl.style.backgroundColor = (info.isAvailable === false) ? '#f59e0b' : '#22c55e';
            }
        } else if (statusContainer && !info.statusText) {
            statusContainer.style.display = 'none';
        }

        // Titres des cartes avec icônes vectorielles SVG fines
        const hoursCardTitle = section.querySelector('.hours-card .practical-card-title, .hours-card h3');
        if (hoursCardTitle) {
            hoursCardTitle.className = 'practical-card-title';
            hoursCardTitle.innerHTML = `<svg class="practical-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> <span>${info.hoursTitle || "Horaires d'Ouverture"}</span>`;
        }

        const areaCardTitle = section.querySelector('.area-card .practical-card-title, .area-card h3');
        if (areaCardTitle) {
            areaCardTitle.className = 'practical-card-title';
            areaCardTitle.innerHTML = `<svg class="practical-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> <span>${info.areaTitle || "Zone d'Intervention"}</span>`;
        }

        // Horaires formatés avec gestion des annotations (ex: sur rendez-vous)
        const hoursContainer = document.getElementById('hours-list');
        if (hoursContainer && Array.isArray(info.hours)) {
            hoursContainer.innerHTML = info.hours.map(h => {
                let rawTime = h.time || h.times || '';
                let mainTime = rawTime;
                let note = '';
                if (rawTime.includes('(') && rawTime.includes(')')) {
                    const match = rawTime.match(/^(.*?)\s*\((.*?)\)$/);
                    if (match) {
                        mainTime = match[1].trim();
                        note = match[2].trim();
                    }
                }
                const isClosed = mainTime.toLowerCase().includes('fermé') || mainTime.toLowerCase().includes('ferme');
                return `
                <div class="hours-row">
                    <span class="hours-days">${h.days || ''}</span>
                    <div class="hours-times-box">
                        <span class="hours-time ${isClosed ? 'hours-closed' : ''}">${mainTime}</span>
                        ${note ? `<span class="hours-note">${note}</span>` : ''}
                    </div>
                </div>`;
            }).join('');

            // Note de bas de carte Horaires pour équilibrer les deux cartes
            const hoursCard = section.querySelector('.hours-card');
            if (hoursCard) {
                let bottomNoteEl = hoursCard.querySelector('.practical-bottom-note');
                if (!bottomNoteEl) {
                    bottomNoteEl = document.createElement('div');
                    bottomNoteEl.className = 'practical-bottom-note';
                    hoursCard.appendChild(bottomNoteEl);
                }
                const noteText = info.hoursNote || "Rendez-vous personnalisés et études de projets possibles en dehors de ces plages sur demande.";
                bottomNoteEl.innerHTML = `
                    <svg class="practical-bottom-note-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <span>${noteText}</span>
                `;
            }
        }

        // Zones / Communes avec pastilles élégantes
        const areasContainer = document.getElementById('areas-badges');
        const areasList = Array.isArray(info.areas) ? info.areas : (Array.isArray(info.serviceAreas) ? info.serviceAreas : []);
        if (areasContainer && areasList.length > 0) {
            areasContainer.innerHTML = areasList.map(area => `
                <span class="area-badge">
                    <span class="area-badge-dot"></span>
                    <span class="area-badge-text">${area}</span>
                </span>
            `).join('');
        }

        // Bloc Coordonnées Directes (Adresse Google Maps & Téléphone direct)
        const directContactBox = section.querySelector('.direct-contact-box');
        if (directContactBox && (info.address || info.phone)) {
            let contactHtml = '';
            if (info.address) {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`;
                contactHtml += `
                    <div class="contact-info-item">
                        <svg class="contact-info-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <div class="contact-info-content">
                            <span class="contact-info-label">Atelier :</span>
                            <a id="info-address" class="contact-info-value" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">${info.address}</a>
                        </div>
                    </div>`;
            }
            if (info.phone) {
                const cleanPhone = info.phone.replace(/\s+/g, '');
                contactHtml += `
                    <div class="contact-info-item">
                        <svg class="contact-info-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <div class="contact-info-content">
                            <span class="contact-info-label">Ligne directe :</span>
                            <a id="info-phone" class="contact-info-value" href="tel:${cleanPhone}">${info.phone}</a>
                        </div>
                    </div>`;
            }
            directContactBox.innerHTML = contactHtml;
        }
    }

    /**
     * Rendu du Ticker Défilant Dynamique (Marquee Peps)
     */
    async function renderTicker(isActive) {
        const tickerEl = document.querySelector('.ticker-banner');
        if (!tickerEl) return;

        if (!isActive) {
            tickerEl.style.display = 'none';
            return;
        }
        tickerEl.style.display = '';

        let tickerData = null;
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                if (content && content.ticker) {
                    tickerData = content.ticker;
                }
            } catch (err) {
                console.warn('[SectionRenderer] Erreur lecture ticker:', err);
            }
        }
        if (!tickerData && typeof DEFAULT_CONTENT !== 'undefined' && DEFAULT_CONTENT.ticker) {
            tickerData = DEFAULT_CONTENT.ticker;
        }

        if (tickerData && Array.isArray(tickerData.items) && tickerData.items.length > 0) {
            const trackEl = tickerEl.querySelector('.ticker-track');
            if (trackEl) {
                const itemsHtml = tickerData.items.map(it => {
                    const cleanText = it.replace(/^[✦•·\-—]\s*/, '').trim();
                    return `<span>${cleanText}</span><span class="bullet">·</span>`;
                }).join('');

                trackEl.innerHTML = `
                    <div class="ticker-content" id="ticker-content-primary">${itemsHtml}</div>
                    <div class="ticker-content" id="ticker-content-secondary" aria-hidden="true">${itemsHtml}</div>
                `;
            }
        }
    }

    /**
     * Rendu des Bannières Cinémagraphes de Transition
     */
    async function renderBanner(isActive) {
        const banners = document.querySelectorAll('.cine-banner');
        if (!banners.length) return;

        if (!isActive) {
            banners.forEach(b => b.style.display = 'none');
            return;
        }
        banners.forEach(b => b.style.display = '');

        let bannerData = null;
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                if (content && content.banner) {
                    bannerData = content.banner;
                }
            } catch (err) {
                console.warn('[SectionRenderer] Erreur rendu dynamique Banner:', err);
            }
        }
        if (!bannerData && typeof DEFAULT_CONTENT !== 'undefined' && DEFAULT_CONTENT.banner) {
            bannerData = DEFAULT_CONTENT.banner;
        }

        if (bannerData) {
            // Bannière 1 (Primaire)
            const banner1 = banners[0];
            if (banner1 && bannerData.imageUrl) {
                const img1 = banner1.querySelector('img');
                if (img1) {
                    img1.src = bannerData.imageUrl;
                    if (bannerData.alt) img1.alt = bannerData.alt;
                }
                const eyebrow1 = banner1.querySelector('.cine-banner-eyebrow');
                if (eyebrow1 && bannerData.eyebrow) eyebrow1.textContent = bannerData.eyebrow;
                const quote1 = banner1.querySelector('.cine-banner-quote');
                if (quote1 && bannerData.quote) quote1.textContent = bannerData.quote;
                const author1 = banner1.querySelector('.cine-banner-author');
                if (author1 && bannerData.author) author1.textContent = bannerData.author;
            }

            // Bannière 2 (Secondaire / Réassurance) si présente
            const banner2 = banners[1];
            const secondaryData = bannerData.secondary || null;
            if (banner2 && secondaryData && secondaryData.imageUrl) {
                const img2 = banner2.querySelector('img');
                if (img2) {
                    img2.src = secondaryData.imageUrl;
                    if (secondaryData.alt) img2.alt = secondaryData.alt;
                }
                const eyebrow2 = banner2.querySelector('.cine-banner-eyebrow');
                if (eyebrow2 && secondaryData.eyebrow) eyebrow2.textContent = secondaryData.eyebrow;
                const quote2 = banner2.querySelector('.cine-banner-quote');
                if (quote2 && secondaryData.quote) quote2.textContent = secondaryData.quote;
                const author2 = banner2.querySelector('.cine-banner-author');
                if (author2 && secondaryData.author) author2.textContent = secondaryData.author;
            }
        }
    }

    /**
     * Rendu de la section Contact & Formulaire
     */
    async function renderContact(isActive) {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        if (!isActive) {
            contactSection.style.display = 'none';
            return;
        }
        contactSection.style.display = '';

        let contactData = null;
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                if (content && content.contact) contactData = content.contact;
            } catch (err) {
                console.warn('[SectionRenderer] Erreur contact:', err);
            }
        }
        if (!contactData && typeof DEFAULT_CONTENT !== 'undefined' && DEFAULT_CONTENT.contact) {
            contactData = DEFAULT_CONTENT.contact;
        }

        if (contactData) {
            const h3El = contactSection.querySelector('.contact-card-info h3');
            if (h3El && contactData.workshopName) h3El.textContent = contactData.workshopName;

            const descEl = contactSection.querySelector('.contact-card-desc');
            if (descEl && contactData.workshopDesc) descEl.textContent = contactData.workshopDesc;

            const detailValues = contactSection.querySelectorAll('.contact-detail-value');
            if (detailValues.length >= 3) {
                if (contactData.address) detailValues[0].textContent = contactData.address;
                if (contactData.phone) {
                    detailValues[1].textContent = contactData.phone;
                    if (detailValues[1].tagName === 'A') detailValues[1].setAttribute('href', 'tel:' + contactData.phone.replace(/\s+/g, ''));
                }
                if (contactData.reactivity) detailValues[2].textContent = contactData.reactivity;
            }

            const guaranteeSpan = contactSection.querySelector('.contact-guarantee-pill span');
            if (guaranteeSpan && contactData.guarantee) guaranteeSpan.textContent = contactData.guarantee;
        }
    }

    /**
     * Rendu de la Timeline / Parcours Chronologique (CAND-04)
     */
    async function renderTimeline(isActive) {
        const section = document.getElementById('parcours');
        const container = document.getElementById('timeline-container');
        if (!section) return;

        if (!isActive) {
            section.style.display = 'none';
            return;
        }
        section.style.display = '';

        if (!container) return;

        let items = [];
        if (window.SiteContent && typeof window.SiteContent.getTimeline === 'function') {
            try {
                items = await window.SiteContent.getTimeline();
            } catch (err) {
                console.error('[SectionRenderer] Erreur timeline:', err);
            }
        } else if (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.timeline)) {
            items = DEFAULT_CONTENT.timeline;
        }

        if (!Array.isArray(items) || items.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:var(--color-text-muted, var(--texte-secondaire));">Aucun jalon chronologique renseigné.</p>';
            return;
        }

        container.innerHTML = `
            <div class="timeline">
                ${items.map((item, i) => `
                    <div class="timeline-item reveal" style="animation-delay:${i * 0.1}s">
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${item.date || ''}</div>
                        <div class="timeline-content">
                            <h3>${item.title || ''}</h3>
                            ${item.location ? `<p class="timeline-location">${item.location}</p>` : ''}
                            <p class="timeline-desc">${item.description || ''}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ─────────────────────────────────────────────────────────────
    // 2. REGISTRE EXPLICITE
    // ─────────────────────────────────────────────────────────────
    const SECTION_REGISTRY = {
        'hero': renderHero,
        'ticker': renderTicker,
        'banner': renderBanner,
        'about': renderAbout,
        'partners': renderPartners,
        'process': renderProcess,
        'looks': renderLooks,
        'gallery': renderGallery,
        'beforeAfter': renderBeforeAfter,
        'prestations': renderPrestations,
        'timeline': renderTimeline,
        'testimonials': renderTestimonials,
        'faq': renderFaq,
        'practicalInfo': renderPracticalInfo,
        'contact': renderContact
    };

    const SECTION_NAV_MAP = {
        'hero': '#accueil',
        'about': '#apropos',
        'process': '#methode',
        'looks': '#looks',
        'gallery': '#gallery',
        'beforeAfter': '#glow-slider-section',
        'prestations': '#prestations',
        'timeline': '#parcours',
        'testimonials': '#temoignages',
        'faq': '#faq',
        'practicalInfo': '#infos-pratiques',
        'contact': '#contact'
    };

    /**
     * Rendu dynamique des métadonnées (<title> et <meta description>)
     */
    async function renderMeta() {
        if (window.SiteContent && typeof window.SiteContent.getFullContent === 'function') {
            try {
                const content = await window.SiteContent.getFullContent();
                if (content && content.meta) {
                    if (content.meta.title) {
                        document.title = content.meta.title;
                    }
                    if (content.meta.description) {
                        const descEl = document.querySelector('meta[name="description"]');
                        if (descEl) {
                            descEl.setAttribute('content', content.meta.description);
                        }
                    }
                }
            } catch (e) {
                console.warn('[SectionRenderer] Erreur renderMeta:', e);
            }
        }
    }

    /**
     * Rendu dynamique de la Barre d'Action Mobile Flottante (Panic Bar 24/7 ou Statut Live)
     */
    async function renderActionBar() {
        const el = document.getElementById('action-bar-mobile');
        if (!el) return;

        const globalSiteConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : (typeof window !== 'undefined' ? window.SITE_CONFIG : null);
        const actionConfig = globalSiteConfig && globalSiteConfig.actions && globalSiteConfig.actions.actionBarMobile;

        if (!actionConfig || !actionConfig.enabled) {
            el.style.display = 'none';
            document.body.classList.remove('has-action-bar');
            return;
        }

        document.body.classList.add('has-action-bar');
        el.style.display = '';

        const variant = actionConfig.variant || 'emergency';
        const title = actionConfig.title || (variant === 'emergency' ? 'Astreinte 24h/24' : 'Ouvert actuellement');
        const subtext = actionConfig.subtext || (variant === 'emergency' ? 'Dépannage d\'urgence' : 'Prise de contact rapide');
        const ctaLabel = actionConfig.ctaLabel || (variant === 'emergency' ? 'Appel Immédiat' : 'Réserver');
        const ctaLink = actionConfig.ctaLink || (actionConfig.phone ? `tel:${actionConfig.phone}` : '#contact');

        if (variant === 'emergency') {
            el.className = 'action-bar-mobile action-bar-emergency';
            el.innerHTML = `
                <div class="action-bar-status">
                    <span class="action-bar-dot pulse-emergency" aria-hidden="true"></span>
                    <div class="action-bar-text">
                        <span class="action-bar-title">${title}</span>
                        <span class="action-bar-subtext">${subtext}</span>
                    </div>
                </div>
                <a href="${ctaLink}" class="action-bar-btn btn-emergency">
                    <svg class="action-bar-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z"/>
                    </svg>
                    ${ctaLabel}
                </a>
            `;
        } else {
            el.className = 'action-bar-mobile action-bar-live';
            el.innerHTML = `
                <div class="action-bar-status">
                    <span class="action-bar-dot status-dot dot-open" aria-hidden="true"></span>
                    <div class="action-bar-text">
                        <span class="action-bar-title status-text">${title}</span>
                        <span class="action-bar-subtext status-subtext">${subtext}</span>
                    </div>
                </div>
                <a href="${ctaLink}" class="action-bar-btn btn-primary">
                    ${ctaLabel}
                </a>
            `;
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. MOTEUR PRINCIPAL DU SECTIONRENDERER
    // ─────────────────────────────────────────────────────────────
    window.SectionRenderer = {
        registry: SECTION_REGISTRY,

        async renderAll(customSectionsConfig) {
            await renderMeta();
            await renderActionBar();

            const globalSiteConfig = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : (typeof window !== 'undefined' ? window.SITE_CONFIG : null);
            const sectionsConfig = customSectionsConfig ||
                (globalSiteConfig && globalSiteConfig.sections) ||
                null;

            if (!sectionsConfig || !Array.isArray(sectionsConfig.order)) {
                return;
            }

            const { order, active = {} } = sectionsConfig;

            // 1. Masquer systématiquement toutes les sections de SECTION_REGISTRY inactives ou omises d'order
            for (const sectionKey of Object.keys(SECTION_REGISTRY)) {
                const isOrdered = order.includes(sectionKey);
                const isActive = isOrdered && (active[sectionKey] !== false);
                if (!isActive) {
                    const renderFn = SECTION_REGISTRY[sectionKey];
                    if (typeof renderFn === 'function') {
                        try { await renderFn(false); } catch (e) {}
                    }
                }
            }

            // 2. Rendre les sections ordonnées et actives
            for (const sectionKey of order) {
                const isActive = active[sectionKey] !== false;
                if (isActive) {
                    const renderFn = SECTION_REGISTRY[sectionKey];
                    if (typeof renderFn === 'function') {
                        try {
                            await renderFn(true);
                        } catch (err) {
                            console.error(`[SectionRenderer] Erreur lors du rendu de '${sectionKey}':`, err);
                        }
                    }
                }
            }

            this.syncNavbar(order, active);
        },

        syncNavbar(order, active) {
            const navLinksContainer = document.querySelector('.nav-links');
            if (!navLinksContainer) return;

            const links = navLinksContainer.querySelectorAll('a[href^="#"]');
            const activeAnchors = new Set();

            order.forEach(sectionKey => {
                if (active[sectionKey] !== false && SECTION_NAV_MAP[sectionKey]) {
                    activeAnchors.add(SECTION_NAV_MAP[sectionKey]);
                }
            });

            links.forEach(link => {
                const anchor = link.getAttribute('href');
                const parentLi = link.closest('li');
                const target = parentLi || link;

                if (anchor === '#accueil' || activeAnchors.has(anchor)) {
                    target.style.display = '';
                } else {
                    target.style.display = 'none';
                }
            });
        }
    };

    // Auto-initialisation au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.SectionRenderer && typeof window.SectionRenderer.renderAll === 'function') {
                window.SectionRenderer.renderAll();
            }
        });
    } else {
        if (window.SectionRenderer && typeof window.SectionRenderer.renderAll === 'function') {
            window.SectionRenderer.renderAll();
        }
    }
})();
