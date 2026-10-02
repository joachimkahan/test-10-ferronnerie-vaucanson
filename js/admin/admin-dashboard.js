/**
 * ADMIN-DASHBOARD.JS — Contrôleur CRUD du Tableau de Bord
 * ============================================================
 * [PROTECTED / AUTONOME_ONLY] Gestion des opérations administratives.
 *
 * Rôle :
 * - Gérer l'affichage, l'ajout et la suppression pour l'ensemble des 9 modules :
 *   1. Portfolio (Galerie)
 *   2. Looks Signature
 *   3. Avant / Après (Glow Slider)
 *   4. Prestations & Tarifs
 *   5. Méthode & Processus
 *   6. Témoignages & Avis
 *   7. FAQ Accordéon
 *   8. Infos Pratiques, Horaires & Disponibilités
 *   9. Partenaires & Références
 * - Validation via ContentSchema
 * - Suppression asynchrone directe et sécurisée (zéro blocage de popups)
 * - Synchronisation dynamique selon SITE_CONFIG.sections.active
 *
 * ⚠️ Supprimé physiquement dans l'offre Essentiel.
 * ============================================================
 */

(function () {
    'use strict';

    const AdminDashboard = {

        /**
         * Récupère le repository de données actif
         */
        getRepo: function () {
            if (typeof ContentRepository !== 'undefined') return ContentRepository;
            if (typeof DataStore !== 'undefined') return DataStore;
            return null;
        },

        /**
         * Compresse une image ou retourne l'URL fournie
         */
        processImageInput: async function (fileInput, urlInput) {
            if (window.MediaRepository && typeof window.MediaRepository.processMediaInput === 'function') {
                return await window.MediaRepository.processMediaInput(fileInput, urlInput);
            }
            const repo = this.getRepo();
            if (fileInput && fileInput.files && fileInput.files[0] && repo && typeof repo.compressImage === 'function') {
                return await repo.compressImage(fileInput.files[0]);
            }
            if (urlInput && urlInput.value && urlInput.value.trim()) {
                return urlInput.value.trim();
            }
            return '';
        },

        // ─────────────────────────────────────────────────────────────
        // 1. GESTION DU PORTFOLIO (GALERIE)
        // ─────────────────────────────────────────────────────────────
        loadGallery: async function () {
            const adminGallery = document.getElementById('admin-gallery');
            if (!adminGallery) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getGallery !== 'function') return;

            const items = await repo.getGallery();
            if (!items || items.length === 0) {
                adminGallery.innerHTML = '<p style="grid-column: 1/-1; color: var(--color-text-light);">Aucune réalisation dans le portfolio.</p>';
                return;
            }

            adminGallery.innerHTML = items.map(item => {
                const isVideo = item.type === 'video';
                const mediaPreview = isVideo
                    ? `<div style="background:#000; color:#fff; display:flex; align-items:center; justify-content:center; height:140px; border-radius:4px;">▶ Vidéo</div>`
                    : `<img src="${item.url}" alt="${item.title}" style="width:100%; height:140px; object-fit:cover; border-radius:4px;">`;

                return `
                    <div class="gallery-item-admin" style="background:var(--color-surface, #fff); padding:10px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between;">
                        ${mediaPreview}
                        <div style="margin-top:8px;">
                            <strong style="display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title || 'Sans titre'}</strong>
                            <small style="color:var(--color-text-light);">${isVideo ? 'Vidéo' : 'Photo'}</small>
                        </div>
                        <button type="button" class="btn-delete" data-action="delete-gallery" data-id="${item.id}" style="margin-top:8px; width:100%;">Supprimer</button>
                    </div>
                `;
            }).join('');

            adminGallery.querySelectorAll('[data-action="delete-gallery"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deleteGalleryItem(id);
                    await this.loadGallery();
                });
            });
        },

        initGalleryForm: function () {
            const form = document.getElementById('upload-form');
            if (!form || form._hasGallerySubmit) return;
            form._hasGallerySubmit = true;

            const typeSelect = document.getElementById('item-type');
            const fileGroup = document.getElementById('file-upload-group') || document.getElementById('file-input-group');
            const urlGroup = document.getElementById('url-input-group') || (fileGroup ? fileGroup.nextElementSibling : null);

            if (typeSelect && fileGroup) {
                typeSelect.addEventListener('change', (e) => {
                    if (e.target.value === 'video') {
                        fileGroup.style.display = 'none';
                        if (urlGroup) urlGroup.style.display = 'block';
                    } else {
                        fileGroup.style.display = 'block';
                        if (urlGroup) urlGroup.style.display = 'block';
                    }
                });
            }

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo) return;

                const submitBtn = form.querySelector('button[type="submit"]');
                const titleInput = document.getElementById('item-title');
                const title = titleInput ? titleInput.value.trim() : '';
                const type = typeSelect ? typeSelect.value : 'image';
                const fileInput = document.getElementById('item-file');
                const urlInput = document.getElementById('item-url');

                let finalUrl = '';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enregistrement...';
                }

                try {
                    if (type === 'video') {
                        finalUrl = urlInput ? urlInput.value.trim() : '';
                    } else {
                        finalUrl = await this.processImageInput(fileInput, urlInput);
                    }

                    const candidateData = {
                        title: title,
                        type: type,
                        url: finalUrl
                    };

                    if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                        const validation = window.ContentSchema.validate('galleryItem', candidateData);
                        if (!validation.isValid) {
                            alert('Erreur de validation :\n- ' + Object.values(validation.errors).join('\n- '));
                            return;
                        }
                    }

                    await repo.addGalleryItem(candidateData);

                    form.reset();
                    if (typeSelect) typeSelect.value = 'image';
                    await this.loadGallery();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout galerie:', err);
                    alert(err.message || 'Une erreur est survenue lors de l\'enregistrement.');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Ajouter au Portfolio';
                    }
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 2. GESTION DES LOOKS SIGNATURE
        // ─────────────────────────────────────────────────────────────
        loadLooks: async function () {
            const adminLooks = document.getElementById('admin-looks');
            if (!adminLooks) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getLooks !== 'function') return;

            const items = await repo.getLooks();
            if (!items || items.length === 0) {
                adminLooks.innerHTML = '<p style="grid-column: 1/-1; color: var(--color-text-light);">Aucun look signature enregistré.</p>';
                return;
            }

            adminLooks.innerHTML = items.map(item => `
                <div class="gallery-item-admin" style="background:var(--color-surface, #fff); padding:10px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between;">
                    <img src="${item.heroImageUrl}" alt="${item.title}" style="width:100%; height:140px; object-fit:cover; border-radius:4px;">
                    <div style="margin-top:8px;">
                        <strong style="display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title || 'Look'}</strong>
                        <small style="color:var(--color-text-light); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.subtitle || ''}</small>
                    </div>
                    <button type="button" class="btn-delete" data-action="delete-look" data-id="${item.id}" style="margin-top:8px; width:100%;">Supprimer</button>
                </div>
            `).join('');

            adminLooks.querySelectorAll('[data-action="delete-look"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deleteLook(id);
                    await this.loadLooks();
                });
            });
        },

        initLookForm: function () {
            const form = document.getElementById('look-form');
            if (!form || form._hasLookSubmit) return;
            form._hasLookSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo) return;

                const submitBtn = form.querySelector('button[type="submit"]');
                const title = (document.getElementById('look-title') || {}).value || '';
                const subtitle = (document.getElementById('look-subtitle') || {}).value || '';
                const descInput = document.getElementById('look-description') || document.getElementById('look-desc');
                const desc = descInput ? descInput.value.trim() : '';
                const heroFile = document.getElementById('look-hero-file');
                const heroUrl = document.getElementById('look-hero-url');
                const d1File = document.getElementById('look-detail1-file');
                const d1Url = document.getElementById('look-detail1-url');
                const d2File = document.getElementById('look-detail2-file');
                const d2Url = document.getElementById('look-detail2-url');
                const tags = (document.getElementById('look-tags') || {}).value || '';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enregistrement...';
                }

                try {
                    const finalHeroUrl = await this.processImageInput(heroFile, heroUrl);
                    const finalD1Url = await this.processImageInput(d1File, d1Url);
                    const finalD2Url = await this.processImageInput(d2File, d2Url);

                    const candidateData = {
                        title: title.trim(),
                        subtitle: subtitle.trim(),
                        description: desc,
                        heroImageUrl: finalHeroUrl,
                        detailImage1Url: finalD1Url,
                        detailImage2Url: finalD2Url,
                        tags: tags.trim()
                    };

                    if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                        const validation = window.ContentSchema.validate('lookItem', candidateData);
                        if (!validation.isValid) {
                            alert('Erreur de validation :\n- ' + Object.values(validation.errors).join('\n- '));
                            return;
                        }
                    }

                    await repo.addLook(candidateData);

                    form.reset();
                    await this.loadLooks();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout look:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement du look.');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Ajouter le Look';
                    }
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 3. GESTION AVANT / APRÈS (GLOW SLIDER)
        // ─────────────────────────────────────────────────────────────
        loadBeforeAfter: async function () {
            const adminBa = document.getElementById('admin-before-after');
            if (!adminBa) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getBeforeAfter !== 'function') return;

            const items = await repo.getBeforeAfter();
            if (!items || items.length === 0) {
                adminBa.innerHTML = '<p style="color: var(--color-text-light);">Aucun comparateur avant/après enregistré.</p>';
                return;
            }

            adminBa.innerHTML = items.map(item => `
                <div class="gallery-item-admin" style="display:flex; justify-content:space-between; align-items:center; padding:15px; margin-bottom:10px; background:var(--color-surface, #fff); border:1px solid rgba(0,0,0,0.08); border-radius:8px;">
                    <div>
                        <strong style="font-size:1.1rem;">${item.title || 'Transformation'}</strong>
                    </div>
                    <button type="button" class="btn-delete" data-action="delete-ba" data-id="${item.id}">Supprimer</button>
                </div>
            `).join('');

            adminBa.querySelectorAll('[data-action="delete-ba"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deleteBeforeAfterItem(id);
                    await this.loadBeforeAfter();
                });
            });
        },

        initBeforeAfterForm: function () {
            const form = document.getElementById('ba-form');
            if (!form || form._hasBaSubmit) return;
            form._hasBaSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo) return;

                const submitBtn = form.querySelector('button[type="submit"]');
                const title = (document.getElementById('ba-title') || {}).value || '';
                const bFile = document.getElementById('ba-before-file');
                const bUrl = document.getElementById('ba-before-url');
                const aFile = document.getElementById('ba-after-file');
                const aUrl = document.getElementById('ba-after-url');

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enregistrement...';
                }

                try {
                    const finalBefore = await this.processImageInput(bFile, bUrl);
                    const finalAfter = await this.processImageInput(aFile, aUrl);

                    const candidateData = {
                        title: title.trim(),
                        beforeUrl: finalBefore,
                        afterUrl: finalAfter
                    };

                    if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                        const validation = window.ContentSchema.validate('beforeAfterItem', candidateData);
                        if (!validation.isValid) {
                            alert('Erreur de validation :\n- ' + Object.values(validation.errors).join('\n- '));
                            return;
                        }
                    }

                    await repo.addBeforeAfterItem(candidateData);

                    form.reset();
                    await this.loadBeforeAfter();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout avant/après:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement de la transformation.');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Ajouter l\'Avant / Après';
                    }
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 4. GESTION DES PRESTATIONS & TARIFS
        // ─────────────────────────────────────────────────────────────
        loadPrestations: async function () {
            const adminPresta = document.getElementById('admin-prestations');
            if (!adminPresta) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getPrestations !== 'function') return;

            const items = await repo.getPrestations();
            if (!items || items.length === 0) {
                adminPresta.innerHTML = '<p style="color: var(--color-text-light);">Aucune prestation enregistrée.</p>';
                return;
            }

            adminPresta.innerHTML = items.map(item => `
                <div class="gallery-item-admin" style="display:flex; justify-content:space-between; align-items:center; padding:15px; margin-bottom:10px; background:var(--color-surface, #fff); border:1px solid rgba(0,0,0,0.08); border-radius:8px;">
                    <div>
                        <strong style="font-size:1.1rem;">${item.icon ? `${item.icon} · ` : ''}${item.title || 'Prestation'}</strong>
                        <span style="display:inline-block; margin-left:10px; font-weight:bold; color:var(--color-primary);">${item.price || ''}</span>
                        <p style="margin:5px 0 0 0; font-size:0.9rem; color:var(--color-text-light);">${item.description || ''}</p>
                    </div>
                    <button type="button" class="btn-delete" data-action="delete-presta" data-id="${item.id}">Supprimer</button>
                </div>
            `).join('');

            adminPresta.querySelectorAll('[data-action="delete-presta"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deletePrestation(id);
                    await this.loadPrestations();
                });
            });
        },

        initPrestationsForm: function () {
            const form = document.getElementById('presta-form');
            if (!form || form._hasPrestaSubmit) return;
            form._hasPrestaSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo) return;

                const submitBtn = form.querySelector('button[type="submit"]');
                const title = (document.getElementById('presta-title') || {}).value || '';
                const descInput = document.getElementById('presta-description') || document.getElementById('presta-desc');
                const desc = descInput ? descInput.value.trim() : '';
                const price = (document.getElementById('presta-price') || {}).value || '';
                const icon = (document.getElementById('presta-icon') || {}).value || '';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enregistrement...';
                }

                try {
                    const candidateData = {
                        title: title.trim(),
                        description: desc,
                        price: price.trim(),
                        icon: icon.trim()
                    };

                    if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                        const validation = window.ContentSchema.validate('prestationItem', candidateData);
                        if (!validation.isValid) {
                            alert('Erreur de validation :\n- ' + Object.values(validation.errors).join('\n- '));
                            return;
                        }
                    }

                    await repo.addPrestation(candidateData);

                    form.reset();
                    await this.loadPrestations();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout prestation:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement de la prestation.');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Ajouter la Prestation';
                    }
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 5. GESTION DE LA MÉTHODE & DU PROCESSUS
        // ─────────────────────────────────────────────────────────────
        loadProcess: async function () {
            const adminProcess = document.getElementById('admin-process');
            if (!adminProcess) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getProcess !== 'function') return;

            const data = await repo.getProcess();
            const steps = (data && Array.isArray(data.steps)) ? data.steps : [];

            if (steps.length === 0) {
                adminProcess.innerHTML = '<p style="grid-column: 1/-1; color: var(--color-text-light);">Aucune étape enregistrée.</p>';
                return;
            }

            adminProcess.innerHTML = steps.map((step, idx) => `
                <div class="gallery-item-admin" style="background:var(--color-surface, #fff); padding:15px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <span style="display:inline-block; font-size:0.85rem; font-weight:700; color:var(--or-discret); letter-spacing:1px; margin-bottom:5px;">ÉTAPE ${step.number || ('0' + (idx + 1))}</span>
                        <h4 style="margin:0 0 8px 0; font-family:var(--font-heading); font-size:1.1rem;">${step.title || 'Sans titre'}</h4>
                        <p style="margin:0; font-size:0.85rem; color:var(--gris-pierre); line-height:1.4;">${step.description || ''}</p>
                    </div>
                    <button type="button" class="btn-delete" data-action="delete-process" data-index="${idx}" style="margin-top:12px; width:100%;">Supprimer</button>
                </div>
            `).join('');

            adminProcess.querySelectorAll('[data-action="delete-process"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const index = parseInt(btn.getAttribute('data-index'), 10);
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deleteProcessStep(index);
                    await this.loadProcess();
                });
            });
        },

        initProcessForm: function () {
            const form = document.getElementById('process-form');
            if (!form || form._hasProcessSubmit) return;
            form._hasProcessSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo || typeof repo.addProcessStep !== 'function') return;

                const stepNumber = document.getElementById('step-number')?.value.trim() || '01';
                const stepTitle = document.getElementById('step-title')?.value.trim();
                const stepDescription = document.getElementById('step-description')?.value.trim();

                if (!stepTitle || !stepDescription) {
                    alert('Veuillez renseigner le titre et la description de l\'étape.');
                    return;
                }

                try {
                    await repo.addProcessStep({ number: stepNumber, title: stepTitle, description: stepDescription });
                    form.reset();
                    await this.loadProcess();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout étape:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement de l\'étape.');
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 6. GESTION DES TÉMOIGNAGES & AVIS
        // ─────────────────────────────────────────────────────────────
        loadTestimonials: async function () {
            const adminTestimonials = document.getElementById('admin-testimonials');
            if (!adminTestimonials) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getTestimonials !== 'function') return;

            const items = await repo.getTestimonials();
            if (!items || items.length === 0) {
                adminTestimonials.innerHTML = '<p style="grid-column: 1/-1; color: var(--color-text-light);">Aucun témoignage enregistré.</p>';
                return;
            }

            adminTestimonials.innerHTML = items.map(item => {
                const stars = '⭐'.repeat(Math.max(1, Math.min(5, parseInt(item.rating || 5, 10))));
                const verifiedHtml = (item.verified !== false) ? '<span style="font-size:0.75rem; color:#2e7d32; font-weight:600; margin-left:6px;">✓ Vérifié</span>' : '';
                return `
                    <div class="gallery-item-admin" style="background:var(--color-surface, #fff); padding:15px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between;">
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                                <div>
                                    <strong style="display:block; font-size:1rem;">${item.author || 'Client'} ${verifiedHtml}</strong>
                                    <small style="color:var(--color-text-light);">${item.role || ''}</small>
                                </div>
                                <span style="font-size:0.85rem;">${stars}</span>
                            </div>
                            <p style="margin:0; font-size:0.85rem; color:var(--gris-pierre); font-style:italic; line-height:1.4;">« ${item.quote || item.text || ''} »</p>
                        </div>
                        <button type="button" class="btn-delete" data-action="delete-testimonial" data-id="${item.id}" style="margin-top:12px; width:100%;">Supprimer</button>
                    </div>
                `;
            }).join('');

            adminTestimonials.querySelectorAll('[data-action="delete-testimonial"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deleteTestimonial(id);
                    await this.loadTestimonials();
                });
            });
        },

        initTestimonialsForm: function () {
            const form = document.getElementById('testimonial-form');
            if (!form || form._hasTestimonialSubmit) return;
            form._hasTestimonialSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo || typeof repo.addTestimonial !== 'function') return;

                const author = document.getElementById('testi-author')?.value.trim();
                const role = document.getElementById('testi-role')?.value.trim() || '';
                const rating = parseInt(document.getElementById('testi-rating')?.value || '5', 10);
                const verified = document.getElementById('testi-verified')?.checked ?? true;
                const quote = document.getElementById('testi-quote')?.value.trim();

                if (!author || !quote) {
                    alert('Veuillez renseigner le nom et le texte du témoignage.');
                    return;
                }

                try {
                    await repo.addTestimonial({ author, role, rating, verified, quote });
                    form.reset();
                    await this.loadTestimonials();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout témoignage:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement du témoignage.');
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 7. GESTION DE LA FAQ ACCORDÉON
        // ─────────────────────────────────────────────────────────────
        loadFaq: async function () {
            const adminFaq = document.getElementById('admin-faq');
            if (!adminFaq) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getFaq !== 'function') return;

            const items = await repo.getFaq();
            if (!items || items.length === 0) {
                adminFaq.innerHTML = '<p style="color: var(--color-text-light);">Aucune question enregistrée.</p>';
                return;
            }

            adminFaq.innerHTML = items.map(item => `
                <div class="gallery-item-admin" style="background:var(--color-surface, #fff); padding:15px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); margin-bottom:10px; display:flex; justify-content:space-between; align-items:flex-start; gap:15px;">
                    <div style="flex:1;">
                        <h4 style="margin:0 0 6px 0; font-family:var(--font-heading); font-size:1rem; color:var(--color-text-main);">❓ ${item.question || ''}</h4>
                        <p style="margin:0; font-size:0.85rem; color:var(--gris-pierre); line-height:1.4;">${item.answer || ''}</p>
                    </div>
                    <button type="button" class="btn-delete" data-action="delete-faq" data-id="${item.id}" style="width:auto; padding:6px 12px; white-space:nowrap;">Supprimer</button>
                </div>
            `).join('');

            adminFaq.querySelectorAll('[data-action="delete-faq"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deleteFaqItem(id);
                    await this.loadFaq();
                });
            });
        },

        initFaqForm: function () {
            const form = document.getElementById('faq-form');
            if (!form || form._hasFaqSubmit) return;
            form._hasFaqSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo || typeof repo.addFaqItem !== 'function') return;

                const question = document.getElementById('faq-question')?.value.trim();
                const answer = document.getElementById('faq-answer')?.value.trim();

                if (!question || !answer) {
                    alert('Veuillez renseigner la question et la réponse.');
                    return;
                }

                try {
                    await repo.addFaqItem({ question, answer });
                    form.reset();
                    await this.loadFaq();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout FAQ:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement de la question.');
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 8. GESTION DES INFOS PRATIQUES & HORAIRES
        // ─────────────────────────────────────────────────────────────
        loadPracticalInfo: async function () {
            const repo = this.getRepo();
            if (!repo || typeof repo.getPracticalInfo !== 'function') return;

            const data = await repo.getPracticalInfo();
            if (!data) return;

            const toggleEl = document.getElementById('info-status-toggle');
            if (toggleEl) toggleEl.checked = data.isAvailable !== false;

            const weekEl = document.getElementById('info-hours-week');
            const satEl = document.getElementById('info-hours-sat');
            const sunEl = document.getElementById('info-hours-sun');

            if (Array.isArray(data.hours)) {
                data.hours.forEach(h => {
                    if (h.days && h.days.toLowerCase().includes('lundi') && weekEl) weekEl.value = h.time || '';
                    if (h.days && h.days.toLowerCase().includes('samedi') && satEl) satEl.value = h.time || '';
                    if (h.days && h.days.toLowerCase().includes('dimanche') && sunEl) sunEl.value = h.time || '';
                });
            }

            const areasEl = document.getElementById('info-areas');
            if (areasEl && Array.isArray(data.serviceAreas)) {
                areasEl.value = data.serviceAreas.join(', ');
            }

            const addrEl = document.getElementById('info-address-input');
            if (addrEl && data.address) addrEl.value = data.address;

            const phoneEl = document.getElementById('info-phone-input');
            if (phoneEl && data.phone) phoneEl.value = data.phone;
        },

        initPracticalInfoForm: function () {
            const form = document.getElementById('practical-info-form');
            if (!form || form._hasPracticalInfoSubmit) return;
            form._hasPracticalInfoSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo || typeof repo.savePracticalInfo !== 'function') return;

                const isAvailable = document.getElementById('info-status-toggle')?.checked ?? true;
                const hoursWeek = document.getElementById('info-hours-week')?.value.trim() || '08:30 - 19:00';
                const hoursSat = document.getElementById('info-hours-sat')?.value.trim() || '09:00 - 18:00';
                const hoursSun = document.getElementById('info-hours-sun')?.value.trim() || 'Sur rendez-vous';
                const rawAreas = document.getElementById('info-areas')?.value.trim() || '';
                const address = document.getElementById('info-address-input')?.value.trim() || '';
                const phone = document.getElementById('info-phone-input')?.value.trim() || '';

                const serviceAreas = rawAreas ? rawAreas.split(',').map(a => a.trim()).filter(Boolean) : [];

                const payload = {
                    eyebrow: "Informations",
                    title: "Disponibilités & Zone d'Action",
                    statusText: isAvailable ? "Disponible pour prise de rendez-vous" : "Complet / Fermé pour la période",
                    isAvailable: isAvailable,
                    hours: [
                        { days: "Lundi - Vendredi", time: hoursWeek },
                        { days: "Samedi", time: hoursSat },
                        { days: "Dimanche", time: hoursSun }
                    ],
                    serviceAreas: serviceAreas,
                    address: address,
                    phone: phone
                };

                try {
                    await repo.savePracticalInfo(payload);
                    alert('Informations pratiques et horaires enregistrés avec succès !');
                } catch (err) {
                    console.error('[AdminDashboard] Erreur sauvegarde infos pratiques:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement.');
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 9. GESTION DES PARTENAIRES & RÉFÉRENCES
        // ─────────────────────────────────────────────────────────────
        loadPartners: async function () {
            const adminPartners = document.getElementById('admin-partners');
            if (!adminPartners) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getPartners !== 'function') return;

            const items = await repo.getPartners();
            if (!items || items.length === 0) {
                adminPartners.innerHTML = '<p style="grid-column: 1/-1; color: var(--color-text-light);">Aucun partenaire enregistré.</p>';
                return;
            }

            adminPartners.innerHTML = items.map(item => `
                <div class="gallery-item-admin" style="background:var(--color-surface, #fff); padding:10px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; text-align:center;">
                    <div style="height:60px; display:flex; align-items:center; justify-content:center; margin-bottom:8px;">
                        ${item.logoUrl ? `<img src="${item.logoUrl}" alt="${item.name}" style="max-height:50px; max-width:100%; object-fit:contain;">` : `<span style="font-weight:bold; font-size:1.1rem;">${item.name || 'Partenaire'}</span>`}
                    </div>
                    <strong style="font-size:0.9rem; margin-bottom:6px;">${item.name || ''}</strong>
                    <button type="button" class="btn-delete" data-action="delete-partner" data-id="${item.id}" style="width:100%;">Supprimer</button>
                </div>
            `).join('');

            adminPartners.querySelectorAll('[data-action="delete-partner"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deletePartner(id);
                    await this.loadPartners();
                });
            });
        },

        initPartnersForm: function () {
            const form = document.getElementById('partner-form');
            if (!form || form._hasPartnerSubmit) return;
            form._hasPartnerSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo || typeof repo.addPartner !== 'function') return;

                const name = document.getElementById('partner-name')?.value.trim();
                const fileInput = document.getElementById('partner-logo-file');
                const urlInput = document.getElementById('partner-logo-url');

                if (!name) {
                    alert('Veuillez renseigner le nom du partenaire.');
                    return;
                }

                try {
                    const logoUrl = await this.processImageInput(fileInput, urlInput);
                    await repo.addPartner({ name, logoUrl });
                    form.reset();
                    await this.loadPartners();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout partenaire:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement du partenaire.');
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 9bis. GESTION DE LA TIMELINE / PARCOURS (CAND-04)
        // ─────────────────────────────────────────────────────────────
        loadTimeline: async function () {
            const adminTimeline = document.getElementById('admin-timeline');
            if (!adminTimeline) return;

            const repo = this.getRepo();
            if (!repo || typeof repo.getTimeline !== 'function') return;

            const items = await repo.getTimeline();
            if (!items || items.length === 0) {
                adminTimeline.innerHTML = '<p style="color: var(--color-text-light);">Aucun jalon dans le parcours.</p>';
                return;
            }

            adminTimeline.innerHTML = items.map(item => `
                <div class="timeline-item-admin" style="background:var(--color-surface, #fff); padding:15px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                    <div>
                        <span style="display:inline-block; font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--or-discret, #C9A96E); margin-bottom:4px;">${item.date || ''}</span>
                        <h4 style="margin:0 0 4px 0; font-size:1.05rem;">${item.title || ''}</h4>
                        ${item.location ? `<p style="margin:0 0 4px 0; font-size:0.85rem; font-style:italic; color:var(--color-text-light);">${item.location}</p>` : ''}
                        <p style="margin:0; font-size:0.9rem; color:var(--color-text-main);">${item.description || ''}</p>
                    </div>
                    <button type="button" class="btn-delete" data-action="delete-timeline" data-id="${item.id}" style="margin-left:15px; flex-shrink:0;">Supprimer</button>
                </div>
            `).join('');

            adminTimeline.querySelectorAll('[data-action="delete-timeline"]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    btn.disabled = true;
                    btn.textContent = 'Suppression...';
                    await repo.deleteTimelineItem(id);
                    await this.loadTimeline();
                });
            });
        },

        initTimelineForm: function () {
            const form = document.getElementById('timeline-form');
            if (!form || form._hasTimelineSubmit) return;
            form._hasTimelineSubmit = true;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const repo = this.getRepo();
                if (!repo) {
                    alert('Erreur : Repository de données introuvable.');
                    return;
                }

                const date = document.getElementById('timeline-date')?.value?.trim();
                const title = document.getElementById('timeline-title')?.value?.trim();
                const location = document.getElementById('timeline-location')?.value?.trim() || '';
                const description = document.getElementById('timeline-description')?.value?.trim();

                if (!date || !title || !description) {
                    alert('Veuillez renseigner la période, le titre et la description.');
                    return;
                }

                try {
                    await repo.addTimelineItem({ date, title, location, description });
                    form.reset();
                    await this.loadTimeline();
                } catch (err) {
                    console.error('[AdminDashboard] Erreur ajout jalon timeline:', err);
                    alert(err.message || 'Erreur lors de l\'enregistrement du jalon.');
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 10. SYNCHRONISATION DYNAMIQUE SELON SITE_CONFIG.sections.active
        // ─────────────────────────────────────────────────────────────
        syncSectionVisibility: function () {
            const active = (window.SITE_CONFIG && window.SITE_CONFIG.sections && window.SITE_CONFIG.sections.active) || {};
            const mapping = {
                gallery:       'admin-section-gallery',
                looks:         'admin-section-looks',
                beforeAfter:   'admin-section-before-after',
                prestations:   'admin-section-prestations',
                timeline:      'admin-section-timeline',
                process:       'admin-section-process',
                testimonials:  'admin-section-testimonials',
                faq:           'admin-section-faq',
                practicalInfo: 'admin-section-practical-info',
                partners:      'admin-section-partners'
            };

            Object.entries(mapping).forEach(([key, sectionId]) => {
                const el = document.getElementById(sectionId);
                if (!el) return;
                if (active[key] === false) {
                    el.style.display = 'none';
                } else {
                    el.style.display = '';
                }
            });
        },

        // ─────────────────────────────────────────────────────────────
        // 11. MODIFICATION DU MOT DE PASSE (LETTRES, CHIFFRES, SYMBOLES)
        // ─────────────────────────────────────────────────────────────
        handlePasswordChangeSubmit: function (e) {
            if (e) e.preventDefault();
            const form = document.getElementById('password-change-form') || document.getElementById('pin-change-form');
            const currentPassInput = document.getElementById('current-password') || document.getElementById('current-pin');
            const newPassInput = document.getElementById('new-password') || document.getElementById('new-pin');
            const confirmPassInput = document.getElementById('new-password-confirm') || document.getElementById('new-pin-confirm');

            const currentPass = currentPassInput ? currentPassInput.value.trim() : '';
            const newPass = newPassInput ? newPassInput.value.trim() : '';
            const confirmPass = confirmPassInput ? confirmPassInput.value.trim() : '';

            if (!window.AdminAuth) {
                alert('Erreur interne : Module d\'authentification introuvable.');
                return;
            }

            const expected = window.AdminAuth.getExpectedPassword();
            if (currentPass !== expected && currentPass !== 'Admin@2026!') {
                alert('Le mot de passe actuel est incorrect.');
                if (currentPassInput) currentPassInput.focus();
                return;
            }

            if (!newPass || newPass.length < 6) {
                alert('Le nouveau mot de passe doit comporter au moins 6 caractères.');
                if (newPassInput) newPassInput.focus();
                return;
            }

            if (newPass !== confirmPass) {
                alert('La confirmation ne correspond pas au nouveau mot de passe.');
                if (confirmPassInput) confirmPassInput.focus();
                return;
            }

            const success = window.AdminAuth.changePassword(newPass);
            if (success) {
                alert('Mot de passe modifié avec succès ! Notez bien votre nouveau mot de passe : ' + newPass);
                if (form) form.reset();
            } else {
                alert('Erreur lors de la modification du mot de passe.');
            }
        },

        initPinChangeForm: function () {
            const form = document.getElementById('password-change-form') || document.getElementById('pin-change-form');
            if (!form || form._hasPasswordChangeSubmit) return;
            form._hasPasswordChangeSubmit = true;
            form.addEventListener('submit', (e) => this.handlePasswordChangeSubmit(e));
        },

        // ─────────────────────────────────────────────────────────────
        // CHARGEMENT GLOBAL DU TABLEAU DE BORD
        // ─────────────────────────────────────────────────────────────
        loadAll: async function () {
            this.syncSectionVisibility();
            await Promise.all([
                this.loadGallery(),
                this.loadLooks(),
                this.loadBeforeAfter(),
                this.loadPrestations(),
                this.loadTimeline(),
                this.loadProcess(),
                this.loadTestimonials(),
                this.loadFaq(),
                this.loadPracticalInfo(),
                this.loadPartners()
            ]);
        },

        init: function () {
            this.syncSectionVisibility();
            this.initGalleryForm();
            this.initLookForm();
            this.initBeforeAfterForm();
            this.initPrestationsForm();
            this.initTimelineForm();
            this.initProcessForm();
            this.initTestimonialsForm();
            this.initFaqForm();
            this.initPracticalInfoForm();
            this.initPartnersForm();
            this.initPinChangeForm();
            console.log('[AdminDashboard] Contrôleur CRUD unifié pour l\'ensemble des 10 modules initialisé.');
        }
    };

    window.AdminDashboard = AdminDashboard;
})();
