# 🛡️ Guide Opérateur : Sécurisation de la Base Firestore (Offre Autonome)

Ce guide explique comment verrouiller la base de données Firestore d'un client en **moins de 2 minutes** pour empêcher tout visiteur ou tiers d'écrire, modifier ou effacer du contenu depuis sa console de navigateur.

---

## 🛑 Pourquoi c'est obligatoire ?

Dans le code JavaScript du site (`firebase-client.js`), la clé `apiKey` et l'identifiant `projectId` sont visibles dans le navigateur des visiteurs (c'est le fonctionnement normal de Firebase).

- **Sans règles de sécurité** : N'importe qui ouvrant les DevTools (`F12`) peut envoyer des commandes pour supprimer des photos ou changer les tarifs.
- **Avec nos règles de sécurité (`firestore.rules`)** : Google rejette immédiatement toute tentative de modification non autorisée (`Missing or insufficient permissions`). Seul l'administrateur connecté dans l'**Espace Pro** (`admin.html`) possède le jeton d'authentification valide.

---

## ⚡ Procédure en 2 Étapes (60 secondes)

### Étape 1 : Activer l'Authentification Email / Mot de Passe

1. Ouvrez la [Console Google Firebase](https://console.firebase.google.com/).
2. Sélectionnez le projet du client.
3. Dans le menu de gauche, cliquez sur **Authentication** (ou **Authentification**).
   *(Si c'est la première fois, cliquez sur le bouton bleu **"Commencer"**)*.
4. Rendez-vous dans l'onglet **Mode de connexion** (Sign-in method).
5. Cliquez sur **Adresse e-mail/Mot de passe**.
6. Cochez **Activer** (la première case) et cliquez sur **Enregistrer**.

> 💡 **Création automatique du compte** : Le code WebExpresso (`admin-auth.js`) crée et initialise automatiquement le compte Firebase Auth lors de la toute première connexion sur `admin.html` avec l'email et le mot de passe configurés dans `site-config.js` ! Vous n'avez même pas besoin d'ajouter manuellement l'utilisateur dans la console.

---

### Étape 2 : Déployer les Règles de Sécurité (`firestore.rules`)

1. Dans la Console Firebase, dans le menu de gauche, cliquez sur **Firestore Database**.
2. Cliquez sur l'onglet **Règles** (Rules) en haut.
3. Supprimez les règles existantes et collez l'intégralité du contenu du fichier `firestore.rules` :

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    match /{collectionName}/{docId} {
      allow read: if true;
      allow create, update, delete: if isAuthenticated();
    }

    match /{document=**} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
  }
}
```

4. Cliquez sur le bouton bleu **Publier** (Publish).

---

## ✅ Comment vérifier que le site est bien protégé ?

1. **Test Public (Non connecté)** :
   - Ouvrez la page `index.html` dans le navigateur.
   - Ouvrez la console DevTools (`F12` > Onglet Console).
   - Tapez :
     ```javascript
     firebase.firestore().collection('portfolio').add({ title: 'Hack Test' });
     ```
   - **Résultat attendu** : Une erreur rouge immédiate s'affiche : `FirebaseError: [code=permission-denied]: Missing or insufficient permissions.`
   - La base refuse l'écriture !

2. **Test Espace Pro (Connecté)** :
   - Connectez-vous sur `admin.html` avec le mot de passe administrateur.
   - Ajoutez ou supprimez une réalisation du portfolio.
   - **Résultat attendu** : L'ajout/suppression fonctionne instantanément et se synchronise sur Firestore.
