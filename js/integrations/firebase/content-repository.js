/**
 * CONTENT-REPOSITORY.JS — Dépôt de Données Métier (Firestore & LocalStorage)
 * ============================================================
 * [PROTECTED / AUTONOME_ONLY] Couche d'accès aux données du Template.
 *
 * Rôle :
 * - Encapsuler toutes les opérations CRUD sur Firestore et LocalStorage
 * - Valider et versionner les données avec ContentSchema
 * - Déléguer le traitement des médias à MediaRepository
 * - Persistance bidirectionnelle robuste (Suppression et Ajout synchrones)
 *
 * ⚠️ Supprimé physiquement dans l'offre Essentiel.
 * ============================================================
 */

(function () {
    'use strict';

    // ── Noms des collections Firestore et clés LocalStorage ────────
    const COLLECTIONS = {
        GALLERY: 'portfolio',
        LOOKS: 'looks_signature',
        BEFORE_AFTER: 'before_after',
        PRESTATIONS: 'prestations',
        TIMELINE: 'timeline',
        PARTNERS: 'partners',
        PROCESS: 'process',
        TESTIMONIALS: 'testimonials',
        FAQ: 'faq',
        PRACTICAL_INFO: 'practical_info'
    };

    const STORAGE_KEYS = {
        GALLERY: 'portfolio_items',
        LOOKS: 'looks_items',
        BEFORE_AFTER: 'before_after_items',
        PRESTATIONS: 'prestations_items',
        TIMELINE: 'timeline_items',
        PARTNERS: 'partners_items',
        PROCESS: 'process_items',
        TESTIMONIALS: 'testimonials_items',
        FAQ: 'faq_items',
        PRACTICAL_INFO: 'practical_info_data'
    };

    /**
     * Récupère l'instance Firestore active si disponible
     * @returns {Object|null}
     */
    function getDb() {
        if (window.FirebaseClient && typeof window.FirebaseClient.getDb === 'function') {
            return window.FirebaseClient.getDb();
        }
        return window.firebaseDb || null;
    }

    /**
     * Helpers LocalStorage sécurisés
     */
    function getLocal(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            if (data !== null) {
                return JSON.parse(data);
            }
            return fallback;
        } catch (e) {
            console.warn(`[ContentRepository] Erreur lecture LocalStorage (${key}):`, e);
            return fallback;
        }
    }

    function setLocal(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`[ContentRepository] Erreur écriture LocalStorage (${key}):`, e);
        }
    }

    // ── Objet Principal ContentRepository ──────────────────────────
    const ContentRepository = {

        // ── 1. GALERIE PORTFOLIO ───────────────────────────────────
        getGallery: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.gallery))
                ? DEFAULT_CONTENT.gallery
                : [];

            if (db) {
                try {
                    const snapshot = await db.collection(COLLECTIONS.GALLERY).orderBy('createdAt', 'desc').get();
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setLocal(STORAGE_KEYS.GALLERY, items);
                        return items;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getGallery, repli local:', error);
                }
            }

            const list = getLocal(STORAGE_KEYS.GALLERY, fallback);
            if (window.ContentSchema && typeof window.ContentSchema.migrate === 'function') {
                return list.map(item => window.ContentSchema.migrate('galleryItem', item));
            }
            return list;
        },

        addGalleryItem: async function (rawItem) {
            if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                const validation = window.ContentSchema.validate('galleryItem', rawItem);
                if (!validation.isValid) {
                    throw new Error(Object.values(validation.errors).join(' '));
                }
                rawItem = validation.sanitizedData;
            }

            rawItem.id = rawItem.id || ('gal_' + Date.now());
            rawItem.createdAt = rawItem.createdAt || new Date().toISOString();

            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.GALLERY).doc(rawItem.id).set(rawItem);
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore addGalleryItem:', err);
                }
            }

            const items = await this.getGallery();
            // Anti-doublon : n'ajouter que si pas déjà présent (évite duplication Firestore re-fetch)
            if (!items.some(item => String(item.id) === String(rawItem.id))) {
                items.unshift(rawItem);
            }
            setLocal(STORAGE_KEYS.GALLERY, items);
        },

        deleteGalleryItem: async function (id) {
            const db = getDb();
            if (db) {
                try {
                    await db.collection(COLLECTIONS.GALLERY).doc(id).delete();
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore deleteGalleryItem:', err);
                }
            }

            let items = await this.getGallery();
            items = items.filter(item => String(item.id) !== String(id));
            setLocal(STORAGE_KEYS.GALLERY, items);
        },

        // ── 2. LOOKS SIGNATURE ─────────────────────────────────────
        getLooks: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.looks))
                ? DEFAULT_CONTENT.looks
                : [];

            if (db) {
                try {
                    const snapshot = await db.collection(COLLECTIONS.LOOKS).orderBy('createdAt', 'asc').get();
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setLocal(STORAGE_KEYS.LOOKS, items);
                        return items;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getLooks, repli local:', error);
                }
            }

            const list = getLocal(STORAGE_KEYS.LOOKS, fallback);
            if (window.ContentSchema && typeof window.ContentSchema.migrate === 'function') {
                return list.map(item => window.ContentSchema.migrate('lookItem', item));
            }
            return list;
        },

        addLook: async function (rawLook) {
            if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                const validation = window.ContentSchema.validate('lookItem', rawLook);
                if (!validation.isValid) {
                    throw new Error(Object.values(validation.errors).join(' '));
                }
                rawLook = validation.sanitizedData;
            }

            rawLook.id = rawLook.id || ('look_' + Date.now());
            rawLook.createdAt = rawLook.createdAt || new Date().toISOString();

            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.LOOKS).doc(rawLook.id).set(rawLook);
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore addLook:', err);
                }
            }

            const items = await this.getLooks();
            if (!items.some(item => String(item.id) === String(rawLook.id))) {
                items.push(rawLook);
            }
            setLocal(STORAGE_KEYS.LOOKS, items);
        },

        deleteLook: async function (id) {
            const db = getDb();
            if (db) {
                try {
                    await db.collection(COLLECTIONS.LOOKS).doc(id).delete();
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore deleteLook:', err);
                }
            }

            let items = await this.getLooks();
            items = items.filter(item => String(item.id) !== String(id));
            setLocal(STORAGE_KEYS.LOOKS, items);
        },

        // ── 3. AVANT / APRÈS (GLOW SLIDER) ─────────────────────────
        getBeforeAfter: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.beforeAfter))
                ? DEFAULT_CONTENT.beforeAfter
                : [];

            if (db) {
                try {
                    const snapshot = await db.collection(COLLECTIONS.BEFORE_AFTER).orderBy('createdAt', 'asc').get();
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setLocal(STORAGE_KEYS.BEFORE_AFTER, items);
                        return items;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getBeforeAfter, repli local:', error);
                }
            }

            const list = getLocal(STORAGE_KEYS.BEFORE_AFTER, fallback);
            if (window.ContentSchema && typeof window.ContentSchema.migrate === 'function') {
                return list.map(item => window.ContentSchema.migrate('beforeAfterItem', item));
            }
            return list;
        },

        addBeforeAfterItem: async function (rawItem) {
            if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                const validation = window.ContentSchema.validate('beforeAfterItem', rawItem);
                if (!validation.isValid) {
                    throw new Error(Object.values(validation.errors).join(' '));
                }
                rawItem = validation.sanitizedData;
            }

            rawItem.id = rawItem.id || ('ba_' + Date.now());
            rawItem.createdAt = rawItem.createdAt || new Date().toISOString();

            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.BEFORE_AFTER).doc(rawItem.id).set(rawItem);
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore addBeforeAfterItem:', err);
                }
            }

            const items = await this.getBeforeAfter();
            if (!items.some(item => String(item.id) === String(rawItem.id))) {
                items.push(rawItem);
            }
            setLocal(STORAGE_KEYS.BEFORE_AFTER, items);
        },

        deleteBeforeAfterItem: async function (id) {
            const db = getDb();
            if (db) {
                try {
                    await db.collection(COLLECTIONS.BEFORE_AFTER).doc(id).delete();
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore deleteBeforeAfterItem:', err);
                }
            }

            let items = await this.getBeforeAfter();
            items = items.filter(item => String(item.id) !== String(id));
            setLocal(STORAGE_KEYS.BEFORE_AFTER, items);
        },

        // ── 4. PRESTATIONS & TARIFS ────────────────────────────────
        getPrestations: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.prestations))
                ? DEFAULT_CONTENT.prestations
                : [];

            if (db) {
                try {
                    const snapshot = await db.collection(COLLECTIONS.PRESTATIONS).orderBy('createdAt', 'asc').get();
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setLocal(STORAGE_KEYS.PRESTATIONS, items);
                        return items;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getPrestations, repli local:', error);
                }
            }

            const list = getLocal(STORAGE_KEYS.PRESTATIONS, fallback);
            if (window.ContentSchema && typeof window.ContentSchema.migrate === 'function') {
                return list.map(item => window.ContentSchema.migrate('prestationItem', item));
            }
            return list;
        },

        addPrestation: async function (rawItem) {
            if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                const validation = window.ContentSchema.validate('prestationItem', rawItem);
                if (!validation.isValid) {
                    throw new Error(Object.values(validation.errors).join(' '));
                }
                rawItem = validation.sanitizedData;
            }

            rawItem.id = rawItem.id || ('presta_' + Date.now());
            rawItem.createdAt = rawItem.createdAt || new Date().toISOString();

            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.PRESTATIONS).doc(rawItem.id).set(rawItem);
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore addPrestation:', err);
                }
            }

            const items = await this.getPrestations();
            if (!items.some(item => String(item.id) === String(rawItem.id))) {
                items.push(rawItem);
            }
            setLocal(STORAGE_KEYS.PRESTATIONS, items);
        },

        deletePrestation: async function (id) {
            const db = getDb();
            if (db) {
                try {
                    await db.collection(COLLECTIONS.PRESTATIONS).doc(id).delete();
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore deletePrestation:', err);
                }
            }

            let items = await this.getPrestations();
            items = items.filter(item => String(item.id) !== String(id));
            setLocal(STORAGE_KEYS.PRESTATIONS, items);
        },

        // ── 4bis. TIMELINE / PARCOURS (CAND-04) ────────────────────
        getTimeline: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.timeline))
                ? DEFAULT_CONTENT.timeline
                : [];

            if (db) {
                try {
                    const snapshot = await db.collection(COLLECTIONS.TIMELINE).get();
                    if (!snapshot.empty) {
                        const items = [];
                        snapshot.forEach(doc => {
                            const d = doc.data();
                            d.id = doc.id;
                            items.push(d);
                        });
                        setLocal(STORAGE_KEYS.TIMELINE, items);
                        return items;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getTimeline, repli local:', error);
                }
            }

            const list = getLocal(STORAGE_KEYS.TIMELINE, fallback);
            if (window.ContentSchema && typeof window.ContentSchema.migrate === 'function') {
                return list.map(item => window.ContentSchema.migrate('timelineItem', item));
            }
            return list;
        },

        addTimelineItem: async function (rawItem) {
            if (window.ContentSchema && typeof window.ContentSchema.validate === 'function') {
                const validation = window.ContentSchema.validate('timelineItem', rawItem);
                if (!validation.isValid) {
                    throw new Error(Object.values(validation.errors).join(' '));
                }
                rawItem = validation.sanitizedData;
            }

            rawItem.id = rawItem.id || ('time_' + Date.now());
            rawItem.createdAt = rawItem.createdAt || new Date().toISOString();

            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.TIMELINE).doc(rawItem.id).set(rawItem);
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore addTimelineItem:', err);
                }
            }

            const items = await this.getTimeline();
            if (!items.some(item => String(item.id) === String(rawItem.id))) {
                items.push(rawItem);
            }
            setLocal(STORAGE_KEYS.TIMELINE, items);
        },

        deleteTimelineItem: async function (id) {
            const db = getDb();
            if (db) {
                try {
                    await db.collection(COLLECTIONS.TIMELINE).doc(id).delete();
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore deleteTimelineItem:', err);
                }
            }

            let items = await this.getTimeline();
            items = items.filter(item => String(item.id) !== String(id));
            setLocal(STORAGE_KEYS.TIMELINE, items);
        },

        // ── 5. PARTENAIRES & RÉFÉRENCES ────────────────────────────
        getPartners: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.partners))
                ? DEFAULT_CONTENT.partners
                : [];

            if (db) {
                try {
                    const snapshot = await db.collection(COLLECTIONS.PARTNERS).orderBy('createdAt', 'asc').get();
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setLocal(STORAGE_KEYS.PARTNERS, items);
                        return items;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getPartners, repli local:', error);
                }
            }

            return getLocal(STORAGE_KEYS.PARTNERS, fallback);
        },

        addPartner: async function (rawItem) {
            rawItem.id = rawItem.id || ('part_' + Date.now());
            rawItem.createdAt = rawItem.createdAt || new Date().toISOString();

            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.PARTNERS).doc(rawItem.id).set(rawItem);
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore addPartner:', err);
                }
            }

            const items = await this.getPartners();
            if (!items.some(item => String(item.id) === String(rawItem.id))) {
                items.push(rawItem);
            }
            setLocal(STORAGE_KEYS.PARTNERS, items);
        },

        deletePartner: async function (id) {
            const db = getDb();
            if (db) {
                try {
                    await db.collection(COLLECTIONS.PARTNERS).doc(id).delete();
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore deletePartner:', err);
                }
            }

            let items = await this.getPartners();
            items = items.filter(item => String(item.id) !== String(id));
            setLocal(STORAGE_KEYS.PARTNERS, items);
        },

        // ── 6. MÉTHODE & PROCESSUS ─────────────────────────────────
        getProcess: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && DEFAULT_CONTENT.process)
                ? DEFAULT_CONTENT.process
                : { eyebrow: "Comment nous travaillons", title: "Une prise en charge simple et sereine", steps: [] };

            if (db) {
                try {
                    const doc = await db.collection(COLLECTIONS.PROCESS).doc('current').get();
                    if (doc.exists) {
                        const data = doc.data();
                        setLocal(STORAGE_KEYS.PROCESS, data);
                        return data;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getProcess, repli local:', error);
                }
            }

            return getLocal(STORAGE_KEYS.PROCESS, fallback);
        },

        saveProcess: async function (processData) {
            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.PROCESS).doc('current').set({
                        ...processData,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore saveProcess, repli local:', err);
                }
            }

            setLocal(STORAGE_KEYS.PROCESS, processData);
        },

        addProcessStep: async function (stepItem) {
            const processData = await this.getProcess();
            if (!Array.isArray(processData.steps)) processData.steps = [];
            processData.steps.push(stepItem);
            await this.saveProcess(processData);
        },

        deleteProcessStep: async function (index) {
            const processData = await this.getProcess();
            if (processData && Array.isArray(processData.steps)) {
                processData.steps.splice(index, 1);
                await this.saveProcess(processData);
            }
        },

        // ── 7. TÉMOIGNAGES & AVIS ──────────────────────────────────
        getTestimonials: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.testimonials))
                ? DEFAULT_CONTENT.testimonials
                : [];

            if (db) {
                try {
                    const snapshot = await db.collection(COLLECTIONS.TESTIMONIALS).orderBy('createdAt', 'desc').get();
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setLocal(STORAGE_KEYS.TESTIMONIALS, items);
                        return items;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getTestimonials, repli local:', error);
                }
            }

            return getLocal(STORAGE_KEYS.TESTIMONIALS, fallback);
        },

        addTestimonial: async function (rawItem) {
            rawItem.id = rawItem.id || ('testi_' + Date.now());
            rawItem.createdAt = rawItem.createdAt || new Date().toISOString();

            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.TESTIMONIALS).doc(rawItem.id).set(rawItem);
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore addTestimonial:', err);
                }
            }

            const items = await this.getTestimonials();
            if (!items.some(item => String(item.id) === String(rawItem.id))) {
                items.unshift(rawItem);
            }
            setLocal(STORAGE_KEYS.TESTIMONIALS, items);
        },

        deleteTestimonial: async function (id) {
            const db = getDb();
            if (db) {
                try {
                    await db.collection(COLLECTIONS.TESTIMONIALS).doc(id).delete();
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore deleteTestimonial:', err);
                }
            }

            let items = await this.getTestimonials();
            items = items.filter(item => String(item.id) !== String(id));
            setLocal(STORAGE_KEYS.TESTIMONIALS, items);
        },

        // ── 8. FAQ ACCORDÉON ───────────────────────────────────────
        getFaq: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && Array.isArray(DEFAULT_CONTENT.faq))
                ? DEFAULT_CONTENT.faq
                : [];

            if (db) {
                try {
                    const snapshot = await db.collection(COLLECTIONS.FAQ).orderBy('createdAt', 'asc').get();
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setLocal(STORAGE_KEYS.FAQ, items);
                        return items;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getFaq, repli local:', error);
                }
            }

            return getLocal(STORAGE_KEYS.FAQ, fallback);
        },

        addFaqItem: async function (rawItem) {
            rawItem.id = rawItem.id || ('faq_' + Date.now());
            rawItem.createdAt = rawItem.createdAt || new Date().toISOString();

            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.FAQ).doc(rawItem.id).set(rawItem);
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore addFaqItem:', err);
                }
            }

            const items = await this.getFaq();
            if (!items.some(item => String(item.id) === String(rawItem.id))) {
                items.push(rawItem);
            }
            setLocal(STORAGE_KEYS.FAQ, items);
        },

        deleteFaqItem: async function (id) {
            const db = getDb();
            if (db) {
                try {
                    await db.collection(COLLECTIONS.FAQ).doc(id).delete();
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore deleteFaqItem:', err);
                }
            }

            let items = await this.getFaq();
            items = items.filter(item => String(item.id) !== String(id));
            setLocal(STORAGE_KEYS.FAQ, items);
        },

        // ── 9. INFOS PRATIQUES & HORAIRES ──────────────────────────
        getPracticalInfo: async function () {
            const db = getDb();
            const fallback = (typeof DEFAULT_CONTENT !== 'undefined' && DEFAULT_CONTENT.practicalInfo)
                ? DEFAULT_CONTENT.practicalInfo
                : {
                    eyebrow: "Informations",
                    title: "Disponibilités & Zone d'Action",
                    statusText: "Disponible pour prise de rendez-vous",
                    isAvailable: true,
                    hours: [],
                    serviceAreas: [],
                    address: "",
                    phone: ""
                };

            if (db) {
                try {
                    const doc = await db.collection(COLLECTIONS.PRACTICAL_INFO).doc('current').get();
                    if (doc.exists) {
                        const data = doc.data();
                        setLocal(STORAGE_KEYS.PRACTICAL_INFO, data);
                        return data;
                    }
                } catch (error) {
                    console.warn('[ContentRepository] Erreur Firestore getPracticalInfo, repli local:', error);
                }
            }

            return getLocal(STORAGE_KEYS.PRACTICAL_INFO, fallback);
        },

        savePracticalInfo: async function (infoData) {
            const db = getDb();
            if (db && typeof firebase !== 'undefined') {
                try {
                    await db.collection(COLLECTIONS.PRACTICAL_INFO).doc('current').set({
                        ...infoData,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                } catch (err) {
                    console.warn('[ContentRepository] Erreur Firestore savePracticalInfo, repli local:', err);
                }
            }

            setLocal(STORAGE_KEYS.PRACTICAL_INFO, infoData);
        },

        // ── 10. UTILITAIRE MÉDIA (Délégation MediaRepository) ───────
        compressImage: function (file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
            if (window.MediaRepository && typeof window.MediaRepository.compressImage === 'function') {
                return window.MediaRepository.compressImage(file, maxWidth, maxHeight, quality);
            }
            return Promise.reject(new Error('MediaRepository non chargé.'));
        }

    };

    // Exposition globale
    window.ContentRepository = ContentRepository;
    // Alias rétrocompatible pour DataStore
    window.DataStore = ContentRepository;

    console.log('[ContentRepository] Dépôt de contenus versionné et validé initialisé.');
})();
