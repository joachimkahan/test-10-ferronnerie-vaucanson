import urllib.request, json, sys, time

if sys.stdout.encoding != 'utf-8':
    try: sys.stdout.reconfigure(encoding='utf-8')
    except: pass

API_KEY = "AIzaSyB7AqJu4qfpzn73yVseSTPGem2EA6wDA9g"
PROJECT_ID = "test-10-53ebe"
url = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/portfolio?key={API_KEY}"

print("En attente de la publication des règles de test sur Firestore...")
for attempt in range(1, 10):
    try:
        with urllib.request.urlopen(url) as resp:
            print(f"SUCCESS: Connecté et autorisé ! Code: {resp.status}")
            print(resp.read().decode('utf-8'))
            sys.exit(0)
    except urllib.error.HTTPError as e:
        if e.code == 403:
            print(f"[{attempt}/10] Règles toujours en cours de verrouillage (403). En attente du bouton 'Publier'...")
            time.sleep(3)
        else:
            print(f"HTTP ERROR: {e.code}")
            sys.exit(1)
    except Exception as ex:
        print("Erreur:", ex)
        sys.exit(1)
