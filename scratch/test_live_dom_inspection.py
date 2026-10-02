import os
import re

print("=================================================================")
print("      INSPECTION APPROFONDIE DU DOM RENDU PAR LE MOTEUR LIVE     ")
print("=================================================================")

dom_file = "scratch/index_dom.html"
assert os.path.exists(dom_file), "Fichier scratch/index_dom.html introuvable"

with open(dom_file, "r", encoding="utf-8") as f:
    dom = f.read()

checks = 0

def ok(condition, msg):
    global checks
    assert condition, f"ÉCHEC: {msg}"
    checks += 1
    print(f"  [PASS] {msg}")

# 1. Vérification Titre & Meta
ok("<title>Atelier" in dom or "<title>Beauté" in dom, "Titre injecté dynamiquement dans le DOM")
ok('meta name="description"' in dom, "Balise meta description présente")

# 2. Vérification des Sections Rendu Live
ok('id="accueil"' in dom, "Section Hero (#accueil) rendue")
ok('class="ticker' in dom or 'ticker-track' in dom, "Bandeau ticker défilant rendu")
ok('id="apropos"' in dom, "Section À Propos (#apropos) rendue")
ok('id="looks"' in dom, "Section Portfolio / Looks (#looks) rendue")
ok('id="prestations"' in dom, "Section Prestations (#prestations) rendue")
ok('id="temoignages"' in dom, "Section Avis (#temoignages) rendue")
ok('id="faq"' in dom, "Section FAQ (#faq) rendue")
ok('id="contact"' in dom, "Section Contact (#contact) rendue")
ok('id="action-bar-mobile"' in dom, "Composant #action-bar-mobile présent dans le DOM")

# 3. Vérification Zéro Résidu Parasite ("undefined", "null", "[object Object]")
# (Excluant les occurrences bénignes comme function names ou null dans JSON)
body_content = re.search(r'<body[\s\S]*?</body>', dom)
assert body_content, "Corps <body> introuvable dans le DOM"
body_text = body_content.group(0)

# Nettoyer les balises de script pour ne scanner que le rendu visible
clean_body = re.sub(r'<script[\s\S]*?</script>', '', body_text)

ok("undefined" not in clean_body, "Zéro chaîne 'undefined' dans le DOM visible")
ok("null" not in clean_body, "Zéro chaîne 'null' dans le DOM visible")
ok("[object Object]" not in clean_body, "Zéro chaîne '[object Object]' dans le DOM visible")
ok("NaN" not in clean_body, "Zéro chaîne 'NaN' dans le DOM visible")

# 4. Vérification Anti-IA & Emojis dans les Textes Visibles
# Vérifier qu'aucun emoji de mauvaise qualité n'est injecté dans les titres
headings = re.findall(r'<h[1-6][^>]*>([\s\S]*?)</h[1-6]>', clean_body)
emoji_pattern = re.compile(r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F900-\U0001F9FF]')

emoji_found = []
for h in headings:
    matches = emoji_pattern.findall(h)
    if matches:
        emoji_found.extend(matches)

ok(len(emoji_found) == 0, f"Zéro emoji dans les titres (Charte Anti-IA respectée) - Trouvé: {emoji_found}")

# 5. Vérification des Ancres de Navigation
nav_links = re.findall(r'<a\s+href="([^"]+)"', clean_body)
anchors = [l for l in nav_links if l.startswith('#') and l != '#']
for anc in anchors:
    anc_id = anc.lstrip('#')
    ok(f'id="{anc_id}"' in dom, f"Ancre valide et présente dans la page : {anc}")

print("\n=================================================================")
print(f"   RÉSULTAT : {checks} TESTS DU DOM LIVE RÉUSSIS (100% SUCCÈS)")
print("=================================================================")
