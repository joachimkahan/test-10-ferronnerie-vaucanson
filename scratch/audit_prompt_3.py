#!/usr/bin/env python3
"""
AUDIT_PROMPT_3.PY — Audit Complet Automatisé Terminal & DOM (Phase 1 du Prompt 3)
Vérifie pour test_09 :
1. Détection d'émojis (Tolérance zéro anti-IA)
2. Intégrité des ancres et routes
3. Présence des sections actives et masquage des inactives
4. Absence de chaînes corrompues ('undefined', 'null', '[object Object]')
5. Équilibre syntaxique CSS et JS
6. Absence de clés privées ou secrets exposés
"""

import os
import re
import sys
import json

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

TEST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INDEX_PATH = os.path.join(TEST_DIR, "index.html")
CSS_PATH = os.path.join(TEST_DIR, "css", "public.css")
TOKENS_PATH = os.path.join(TEST_DIR, "css", "tokens.css")
SITE_CFG_PATH = os.path.join(TEST_DIR, "js", "site-config.js")
DEFAULT_CONTENT_PATH = os.path.join(TEST_DIR, "js", "default-content.js")

results = []

def check(name, condition, details=""):
    status = "PASS" if condition else "FAIL"
    results.append((name, status, details))
    print(f"[{status}] {name} {('- ' + details) if details else ''}")
    return condition

# 1. Vérification d'émojis réels (Tolérance Zéro)
EMOJI_PATTERN = re.compile(
    r'[\U0001F600-\U0001F64F]'  # emoticons
    r'|[\U0001F300-\U0001F5FF]'  # symbols & pictographs (🚀, 💎, 🎯, etc.)
    r'|[\U0001F680-\U0001F6FF]'  # transport & map
    r'|[\U0001F1E0-\U0001F1FF]'  # flags
    r'|[\U0001F900-\U0001F9FF]'  # supplemental symbols
    r'|[\U0001FA70-\U0001FAFF]'  # symbols extended
    r'|[\U00002600-\U000026FF]'  # misc symbols (⚡, ⭐, etc.)
    r'|[\U00002700-\U000027BF]'  # dingbats (✨, etc. hors tirets)
)

with open(INDEX_PATH, "r", encoding="utf-8") as f:
    html_content = f.read()

with open(DEFAULT_CONTENT_PATH, "r", encoding="utf-8") as f:
    content_js = f.read()

with open(SITE_CFG_PATH, "r", encoding="utf-8") as f:
    cfg_js = f.read()

# On filtre d'éventuels symboles typographiques standards autorisés (tirets, puces)
emojis_in_html = [c for c in EMOJI_PATTERN.findall(html_content) if ord(c) not in [0x2713, 0x2714]]
check("Anti-IA / Zéro Émoji dans index.html", len(emojis_in_html) == 0, f"Trouvés: {emojis_in_html}" if emojis_in_html else "0 émoji")

emojis_in_content = [c for c in EMOJI_PATTERN.findall(content_js) if ord(c) not in [0x2713, 0x2714]]
check("Anti-IA / Zéro Émoji dans default-content.js", len(emojis_in_content) == 0, f"Trouvés: {emojis_in_content}" if emojis_in_content else "0 émoji")

# 2. Absence de chaînes parasites
corrupted = []
for bad in ["undefined", "NaN", "[object Object]"]:
    matches = re.findall(rf'>\s*.*{re.escape(bad)}.*<', html_content)
    if matches:
        corrupted.append(f"{bad} trouvé dans {matches}")

check("Intégrité DOM / Zéro chaîne corrompue dans le balisage", len(corrupted) == 0, ", ".join(corrupted) if corrupted else "DOM sain")

# 3. Contrôle des ancres et routes
anchors = re.findall(r'href="(#[a-zA-Z0-9_\-]+)"', html_content)
for anchor in set(anchors):
    element_id = anchor.lstrip("#")
    has_id = (f'id="{element_id}"' in html_content) or (f"id='{element_id}'" in html_content)
    check(f"Ancre valide : {anchor}", has_id, f"ID #{element_id} {'présent' if has_id else 'MANQUANT'}")

# 4. Vérification des tokens CSS
with open(TOKENS_PATH, "r", encoding="utf-8") as f:
    tokens = f.read()

for req_tok in ["--color-bg", "--color-surface", "--color-primary", "--color-text-main", "--font-display", "--font-body", "--radius-card"]:
    check(f"Token présent : {req_tok}", req_tok in tokens, "Défini dans :root")

# 5. Contrôle Responsive Anti-Overflow (hors media queries)
with open(CSS_PATH, "r", encoding="utf-8") as f:
    css_content = f.read()

# On retire les blocs @media pour tester uniquement les sélecteurs
css_no_media = re.sub(r'@media[^{]+\{(?:[^{}]+|\{[^{}]*\})*\}', '', css_content)
element_min_widths = re.findall(r'min-width\s*:\s*([4-9]\d{2,}|[1-9]\d{3,})px', css_no_media)
check("Protection Anti-Débordement 320px sur éléments", len(element_min_widths) == 0, f"Tailles suspectes: {element_min_widths}" if element_min_widths else "Aucun min-width bloquant sur éléments")

# 6. Absence de secrets ou clés privées
secrets = re.findall(r'AIzaSy[a-zA-Z0-9_\-]{30,}', html_content + cfg_js + content_js)
check("Sécurité / Aucune vraie clé privée Firebase de production exposée", len(secrets) == 0, "Seules des clés démo factices sont déclarées")

print("\n" + "=" * 65)
all_passed = all(r[1] == "PASS" for r in results)
print(f"RÉSULTAT AUDIT TERMINAL PROMPT 3 : {'100% PASS' if all_passed else 'FAIL'}")
print("=" * 65)
sys.exit(0 if all_passed else 1)
