/**
 * FIREBASE-CLIENT.JS — Initialisation Centralisée du SDK Firebase
 * ============================================================
 * [EDITABLE / AUTONOME_ONLY] Configuration du projet Firebase client.
 *
 * Rôle :
 * - Initialiser le SDK Firebase Firestore de manière unique
 * - Fournir une référence sécurisée à la base de données Firestore
 * - Basculer automatiquement en mode local si Firebase n'est pas encore configuré
 *
 * ⚠️ Supprimé physiquement dans l'offre Essentiel.
 * ============================================================
 */

(function () {
    'use strict';

    // Configuration Firebase du projet (Compte Agence WebExpresso)
    const FIREBASE_CONFIG = {
        apiKey: "AIzaSyB7AqJu4qfpzn73yVseSTPGem2EA6wDA9g",
        authDomain: "test-10-53ebe.firebaseapp.com",
        projectId: "test-10-53ebe",
        storageBucket: "test-10-53ebe.firebasestorage.app",
        messagingSenderId: "932240164047",
        appId: "1:932240164047:web:5f787051b7272bd272e3ba",
        measurementId: "G-V83YGVBYB2"
    };

    let dbInstance = null;
    let authInstance = null;
    let isInitialized = false;

    if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey !== "VOTRE_API_KEY") {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(FIREBASE_CONFIG);
            }
            dbInstance = firebase.firestore();
            if (typeof firebase.auth === 'function') {
                authInstance = firebase.auth();
            }
            isInitialized = true;
            console.log('[FirebaseClient] Firebase Firestore & Auth initialisés et connectés avec succès.');
        } catch (error) {
            console.error('[FirebaseClient] Erreur lors de l\'initialisation de Firebase:', error);
        }
    } else {
        console.info('[FirebaseClient] Mode local actif (clé API template par défaut). Utilisation du stockage localStorage.');
    }

    // Objet global FirebaseClient
    window.FirebaseClient = {
        config: FIREBASE_CONFIG,
        isReady: function () {
            return isInitialized && dbInstance !== null;
        },
        getDb: function () {
            return dbInstance;
        },
        getAuth: function () {
            return authInstance;
        }
    };

    // Alias rétrocompatible
    window.firebaseDb = dbInstance;

})();
