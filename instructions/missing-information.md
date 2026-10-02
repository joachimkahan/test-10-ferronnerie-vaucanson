# 📋 Informations Manquantes & Hypothèses de Conception — Ferronnerie d'Art Vaucanson & Fils (test_10_firebase)

---

## 1. Données Fournies vs Hypothèses Réalistes

| Élément | Statut | Hypothèse Retenue (Charte Anti-IA) |
|---|---|---|
| **Raison sociale & Siret** | Fourni / Complété | Ferronnerie d'Art Vaucanson & Fils SAS, Siret 412 893 104 00028 (Lyon B 412 893 104). |
| **Gérant & Titre** | Fourni | Édouard Vaucanson, Maître Ferronnier d'Art & Compagnon du Devoir du Tour de France. |
| **Coordonnées** | Fourni | 18 Quai Paul Sédillat, 69009 Lyon / 04 78 83 24 19 / contact@ferronnerie-vaucanson.fr |
| **Labels & Distinctions** | Déterminé | Entreprise du Patrimoine Vivant (EPV), Agréé Monuments Historiques, Ateliers d'Art de France. |
| **Tarifs indicatifs** | Déterminé | Portails dès 6 500 €, rampes dès 1 200 €/ml, marquises dès 3 800 €, restauration sur devis. |
| **Fichier Téléchargeable** | Simulé | `media/carnet-ouvrages-vaucanson.pdf` (Carnet technique d'épures et détails d'assemblages). |

---

## 2. Décisions de Conception & Direction Artistique

1. **Palette Chromatique Forgeron & Acier** :
   - Fond atelier sombre & acier brut : `#0B0E14`
   - Blocs & cartes métalliques : `#121722`
   - Accent braise & laiton chaud : `#C67D43`
   - Textes lumière acier : `#E2E8F0`
2. **Typographies Nobles** :
   - Titres : `Syne` (Caractère forgé, anguleux, affirmé)
   - Corps : `Plus Jakarta Sans` (Clarté géométrique de lecture technique)
3. **Formule & Fonctionnalités** :
   - Formule : **Autonome** (Gestion de collections via `admin.html`, synchronisation Firestore cloud).
   - Options : Bilingue FR/EN, comparateur Avant/Après restauration, bouton de téléchargement de document technique.
