#!/usr/bin/env python3
"""
TEST_FIRESTORE_LIVE.PY
Teste la connexion directe en lecture et écriture sur la base de données
Google Cloud Firestore du projet test-10-53ebe.
"""
import urllib.request
import json
import sys

API_KEY = "AIzaSyB7AqJu4qfpzn73yVseSTPGem2EA6wDA9g"
PROJECT_ID = "test-10-53ebe"
BASE_URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents"

def check_connection():
    url = f"{BASE_URL}?key={API_KEY}"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            data = resp.read().decode('utf-8')
            print("🟢 CONNECTÉ AVEC SUCCÈS À GOOGLE FIRESTORE !")
            print("Réponse brute :", data)
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        if e.code == 404:
            print("🔴 BASE FIRESTORE NON ENCORE CRÉÉE (Erreur 404).")
            print("👉 Rendez-vous sur : https://console.firebase.google.com/project/test-10-53ebe/firestore")
            print("👉 Cliquez sur 'Créer une base de données' > 'Démarrer en mode test' > 'Activer'.")
        elif e.code == 403:
            print("🟡 BASE CRÉÉE MAIS RÈGLES DE SÉCURITÉ EN ATTENTE (Erreur 403).")
            print("👉 En mode test, la base sera immédiatement accessible.")
        else:
            print(f"Code HTTP {e.code} : {body}")
        return False
    except Exception as ex:
        print("Erreur inattendue :", ex)
        return False

def write_test_piece():
    url = f"{BASE_URL}/portfolio?key={API_KEY}"
    payload = {
        "fields": {
            "title": {"stringValue": "Grille d'Honneur Château de Montmelas (Live Firestore)"},
            "category": {"stringValue": "Portails Classés"},
            "description": {"stringValue": "Ouvrage forgé en acier massif riveté à chaud et patine canon de fusil."},
            "badge": {"stringValue": "Vrai Cloud Google"},
            "createdAt": {"stringValue": "2026-10-02T11:50:00Z"}
        }
    }
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        with urllib.request.urlopen(req) as resp:
            doc = json.loads(resp.read().decode('utf-8'))
            print("🟢 DOCUMENT CRÉÉ AVEC SUCCÈS DANS LE CLOUD GOOGLE FIRESTORE !")
            print("ID du document :", doc.get("name"))
            return True
    except Exception as e:
        print("Erreur écriture :", e)
        return False

if __name__ == "__main__":
    print(f"=== TEST CONNEXION FIRESTORE : {PROJECT_ID} ===")
    if check_connection():
        print("\n=== TEST ÉCRITURE D'UNE PIÈCE FORGÉE DANS LE CLOUD ===")
        write_test_piece()
