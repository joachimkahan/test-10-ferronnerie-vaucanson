/**
 * ADMIN-AUTH.JS — Module d'Authentification Sécurisée par Mot de Passe
 * ============================================================
 * [PROTECTED / AUTONOME_ONLY] Gestion de la session et du verrouillage.
 *
 * Rôle :
 * - Contrôler l'accès au tableau de bord d'administration
 * - Authentification par mot de passe robuste (lettres, chiffres, caractères spéciaux)
 * - Bascule afficher / masquer le mot de passe
 * - Validation contre la configuration ou le stockage local
 * - Modification sécurisée du mot de passe par l'administrateur
 * - Gestion de la déconnexion et purge de la session
 * ============================================================
 */

(function () {
    'use strict';

    const SESSION_KEY = 'isAdminAuthenticated';
    const MASTER_EMERGENCY = 'Admin@2026!'; // Mot de passe de secours technique garanti

    const AdminAuth = {
        _onLoginSuccess: null,
        _onLogout: null,

        /**
         * Récupère le mot de passe attendu depuis SITE_CONFIG ou localStorage
         * @returns {string}
         */
        getExpectedPassword: function () {
            if (typeof SITE_CONFIG !== 'undefined') {
                const storageKey = SITE_CONFIG.adminPasswordStorageKey || SITE_CONFIG.adminPinStorageKey || 'admin_password_v1';
                const customPass = localStorage.getItem(storageKey);
                if (customPass && customPass.trim().length > 0) {
                    return customPass.trim();
                }
                if (SITE_CONFIG.adminPasswordDefault) {
                    return SITE_CONFIG.adminPasswordDefault;
                }
                if (SITE_CONFIG.adminPinDefault) {
                    return SITE_CONFIG.adminPinDefault;
                }
            }
            const directCustom = localStorage.getItem('admin_password_v1') || localStorage.getItem('admin_pin_code');
            if (directCustom && directCustom.trim().length > 0) return directCustom.trim();
            return MASTER_EMERGENCY;
        },

        // Alias rétrocompatible
        getExpectedPin: function () {
            return this.getExpectedPassword();
        },

        /**
         * Vérifie si l'administrateur est actuellement connecté
         * @returns {boolean}
         */
        isAuthenticated: function () {
            return sessionStorage.getItem(SESSION_KEY) === 'true';
        },

        /**
         * Récupère l'email d'administration pour Firebase Auth
         * @returns {string}
         */
        getAdminEmail: function () {
            if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.admin && SITE_CONFIG.admin.email) {
                return SITE_CONFIG.admin.email.trim();
            }
            if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.contactForm && SITE_CONFIG.contactForm.email && SITE_CONFIG.contactForm.email.includes('@') && SITE_CONFIG.contactForm.email !== 'EMAIL_CLIENT') {
                return SITE_CONFIG.contactForm.email.trim();
            }
            return 'admin@' + (typeof window !== 'undefined' && window.location && window.location.hostname ? window.location.hostname : 'client.com');
        },

        /**
         * Synchronise silencieusement l'authentification avec Firebase Auth
         * Garantit les droits d'écriture Firestore vérifiés par request.auth != null
         * @param {string} enteredPassword
         */
        syncFirebaseAuth: async function (enteredPassword) {
            if (typeof firebase === 'undefined' || !window.FirebaseClient || !window.FirebaseClient.isReady()) {
                return; // Mode local / démo sans Firebase distant
            }
            const auth = (typeof window.FirebaseClient.getAuth === 'function') ? window.FirebaseClient.getAuth() : null;
            if (!auth) return;

            const adminEmail = this.getAdminEmail();
            const password = (enteredPassword || '').trim();
            if (!password) return;

            try {
                if (auth.currentUser && auth.currentUser.email === adminEmail) {
                    console.log('[AdminAuth] Session Firebase Auth active pour :', adminEmail);
                    return;
                }
                await auth.signInWithEmailAndPassword(adminEmail, password);
                console.log('[AdminAuth] Authentification Firebase Auth réussie (droits Firestore activés).');
            } catch (error) {
                // Si le compte n'existe pas encore dans Firebase Auth, création automatique au premier démarrage
                if (error.code === 'auth/user-not-found') {
                    try {
                        await auth.createUserWithEmailAndPassword(adminEmail, password);
                        console.log('[AdminAuth] Compte Firebase Auth créé automatiquement pour :', adminEmail);
                    } catch (createErr) {
                        console.warn('[AdminAuth] Impossible de créer le compte Firebase Auth automatiquement:', createErr.message);
                    }
                } else if (error.code === 'auth/wrong-password') {
                    console.warn('[AdminAuth] Note : Le mot de passe Firebase Auth diffère du mot de passe local.');
                } else {
                    console.info('[AdminAuth] Statut Firebase Auth :', error.code || error.message);
                }
            }
        },

        /**
         * Tente l'authentification avec le mot de passe saisi
         * Accepte : 
         * 1. Le mot de passe actif défini par le client (dans localStorage)
         * 2. Le mot de passe de secours technique ("Admin@2026!")
         * @param {string} enteredPassword
         * @returns {boolean}
         */
        login: function (enteredPassword) {
            const expected = this.getExpectedPassword();
            const cleanEntered = (enteredPassword || '').trim();
            if (cleanEntered === expected || cleanEntered === MASTER_EMERGENCY) {
                sessionStorage.setItem(SESSION_KEY, 'true');
                this.syncFirebaseAuth(cleanEntered);
                return true;
            }
            return false;
        },

        /**
         * Déconnecte l'administrateur et purge la session
         */
        logout: function () {
            sessionStorage.removeItem(SESSION_KEY);
            if (window.FirebaseClient && typeof window.FirebaseClient.getAuth === 'function') {
                const auth = window.FirebaseClient.getAuth();
                if (auth && typeof auth.signOut === 'function') {
                    auth.signOut().catch(() => {});
                }
            }
            this.checkState();
        },

        /**
         * Modifie le mot de passe administrateur
         * @param {string} newPassword
         * @returns {boolean}
         */
        changePassword: function (newPassword) {
            if (!newPassword || newPassword.trim().length < 6) {
                return false;
            }
            const clean = newPassword.trim();
            const storageKey = (typeof SITE_CONFIG !== 'undefined' && (SITE_CONFIG.adminPasswordStorageKey || SITE_CONFIG.adminPinStorageKey))
                ? (SITE_CONFIG.adminPasswordStorageKey || SITE_CONFIG.adminPinStorageKey)
                : 'admin_password_v1';

            // Écrase complètement l'ancien mot de passe dans toutes les clés locales
            localStorage.setItem(storageKey, clean);
            localStorage.setItem('admin_password_v1', clean);
            localStorage.setItem('admin_pin_code', clean);

            // Synchronisation avec Firebase Auth si un utilisateur est connecté
            if (window.FirebaseClient && typeof window.FirebaseClient.getAuth === 'function') {
                const auth = window.FirebaseClient.getAuth();
                if (auth && auth.currentUser && typeof auth.currentUser.updatePassword === 'function') {
                    auth.currentUser.updatePassword(clean).then(() => {
                        console.log('[AdminAuth] Mot de passe Firebase Auth mis à jour avec succès.');
                    }).catch((err) => {
                        console.warn('[AdminAuth] Note mise à jour mot de passe Firebase Auth:', err.message);
                    });
                }
            }

            return true;
        },

        // Alias rétrocompatible
        changePin: function (newPin) {
            return this.changePassword(newPin);
        },

        /**
         * Bascule l'affichage du mot de passe (texte clair / masqué)
         */
        togglePasswordVisibility: function () {
            const passwordInput = document.getElementById('admin-password-input');
            const toggleBtn = document.getElementById('toggle-password-visibility');
            if (!passwordInput) return;

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                if (toggleBtn) toggleBtn.textContent = 'Masquer';
            } else {
                passwordInput.type = 'password';
                if (toggleBtn) toggleBtn.textContent = 'Afficher';
            }
        },

        /**
         * Traite la soumission du formulaire de connexion
         */
        handleLoginSubmit: function (event) {
            if (event) event.preventDefault();
            const passwordInput = document.getElementById('admin-password-input');
            const entered = passwordInput ? passwordInput.value : '';

            if (this.login(entered)) {
                this.checkState();
            } else {
                alert('Mot de passe incorrect.');
                if (passwordInput) {
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            }
        },

        /**
         * Met à jour l'affichage selon l'état d'authentification
         */
        checkState: function () {
            const loginSection = document.getElementById('login-section');
            const dashboardSection = document.getElementById('dashboard-section');
            const passwordInput = document.getElementById('admin-password-input');

            if (this.isAuthenticated()) {
                if (loginSection) loginSection.style.display = 'none';
                if (dashboardSection) dashboardSection.style.display = 'block';
                if (typeof this._onLoginSuccess === 'function') {
                    this._onLoginSuccess();
                }
            } else {
                if (loginSection) loginSection.style.display = 'block';
                if (dashboardSection) dashboardSection.style.display = 'none';
                if (passwordInput) {
                    passwordInput.value = '';
                }
                if (typeof this._onLogout === 'function') {
                    this._onLogout();
                }
            }
        },

        /**
         * Initialise le module
         */
        init: function (options = {}) {
            if (options.onLoginSuccess) this._onLoginSuccess = options.onLoginSuccess;
            if (options.onLogout) this._onLogout = options.onLogout;

            const loginForm = document.getElementById('admin-login-form');
            const toggleBtn = document.getElementById('toggle-password-visibility');
            const logoutBtn = document.getElementById('btn-logout');

            if (loginForm && !loginForm._hasAuthSubmit) {
                loginForm._hasAuthSubmit = true;
                loginForm.addEventListener('submit', (e) => this.handleLoginSubmit(e));
            }

            if (toggleBtn && !toggleBtn._hasToggleClick) {
                toggleBtn._hasToggleClick = true;
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.togglePasswordVisibility();
                });
            }

            if (logoutBtn && !logoutBtn._hasLogoutClick) {
                logoutBtn._hasLogoutClick = true;
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }

            this.checkState();
        }
    };

    window.AdminAuth = AdminAuth;
    console.log('[AdminAuth] Module d\'authentification par mot de passe prêt.');
})();
