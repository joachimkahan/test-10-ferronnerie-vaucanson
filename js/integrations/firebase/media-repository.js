/**
 * MEDIA-REPOSITORY.JS — Gestionnaire Centralisé des Médias (Storage & Local)
 * ============================================================
 * [PROTECTED / AUTONOME_ONLY] Couche de traitement et d'upload des médias.
 *
 * Rôle :
 * - Valider les formats et tailles d'images avant envoi (max 5 Mo, JPEG/PNG/WebP)
 * - Compresser et optimiser les visuels côté client (Canvas haute performance)
 * - Assurer une persistance cohérente sans médias orphelins
 * - Isoler l'accès à Firebase Storage avec repli transparent en local (DataURL)
 *
 * ⚠️ Supprimé physiquement dans l'offre Essentiel.
 * ============================================================
 */

(function () {
    'use strict';

    const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo max
    const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    const MediaRepository = {

        /**
         * Vérifie la validité d'un fichier image
         * @param {File} file
         * @returns {{ isValid: boolean, error?: string }}
         */
        validateFile: function (file) {
            if (!file) return { isValid: false, error: 'Aucun fichier sélectionné.' };
            if (!ALLOWED_MIME_TYPES.includes(file.type)) {
                return {
                    isValid: false,
                    error: `Format non supporté (${file.type}). Formats acceptés : JPEG, PNG, WebP.`
                };
            }
            if (file.size > MAX_FILE_SIZE_BYTES) {
                return {
                    isValid: false,
                    error: `Le fichier est trop volumineux (${(file.size / (1024 * 1024)).toFixed(1)} Mo). Taille maximale : 5 Mo.`
                };
            }
            return { isValid: true };
        },

        /**
         * Compresse et redimensionne une image côté client
         * @param {File} file
         * @param {number} maxWidth
         * @param {number} maxHeight
         * @param {number} quality
         * @returns {Promise<string>} DataURL WebP/JPEG optimisée
         */
        compressImage: function (file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
            return new Promise((resolve, reject) => {
                const validation = this.validateFile(file);
                if (!validation.isValid) {
                    return reject(new Error(validation.error));
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = event => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > maxWidth) {
                                height = Math.round((height * maxWidth) / width);
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width = Math.round((width * maxHeight) / height);
                                height = maxHeight;
                            }
                        }

                        const canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        // Utilise WebP si supporté, sinon repli sur JPEG
                        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                        resolve(canvas.toDataURL(outputType, quality));
                    };
                    img.onerror = error => reject(new Error('Impossible de charger l\'image pour optimisation.'));
                };
                reader.onerror = error => reject(new Error('Erreur lors de la lecture du fichier image.'));
            });
        },

        /**
         * Traite l'entrée média d'un formulaire (fichier ou URL textuelle)
         * @param {HTMLInputElement} fileInput
         * @param {HTMLInputElement} urlInput
         * @returns {Promise<string>}
         */
        processMediaInput: async function (fileInput, urlInput) {
            if (fileInput && fileInput.files && fileInput.files[0]) {
                return await this.compressImage(fileInput.files[0]);
            }
            if (urlInput && urlInput.value && urlInput.value.trim()) {
                return urlInput.value.trim();
            }
            return '';
        }

    };

    window.MediaRepository = MediaRepository;
    console.log('[MediaRepository] Gestionnaire de médias initialisé.');
})();
