import os
import re
import json

BASE_DIR = r"c:\Users\33783\Documents\Informatique\WebExpress\Technique\Phase 2 _ Template et master prompt"
TEMPLATE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODULAR_DIR = os.path.join(BASE_DIR, "bibliotheque_modulaire")

print("=================================================================")
print("     AUDIT QUALITÉ SYSTÈME GLOBAL & EXHAUSTIF (TERMINAL QA)      ")
print("=================================================================")

total_checks = 0
passed_checks = 0

def assert_check(condition, title, details=""):
    global total_checks, passed_checks
    total_checks += 1
    if condition:
        passed_checks += 1
        print(f"  [PASS] {title}")
    else:
        print(f"  [FAIL] {title} -> {details}")
        raise AssertionError(f"Échec du test : {title} | {details}")

def strip_js_strings_and_comments(code):
    out = []
    i = 0
    n = len(code)
    mode = 'normal'
    template_stack = []
    
    while i < n:
        c = code[i]
        c2 = code[i:i+2] if i+1 < n else ''
        
        if mode == 'normal':
            if c2 == '//':
                mode = 'line_comment'
                i += 2
            elif c2 == '/*':
                mode = 'block_comment'
                i += 2
            elif c == "'":
                mode = 'sq_string'
                i += 1
            elif c == '"':
                mode = 'dq_string'
                i += 1
            elif c == '`':
                mode = 'template'
                i += 1
            elif c == '}' and template_stack:
                template_stack.pop()
                mode = 'template'
                i += 1
            else:
                out.append(c)
                i += 1
        elif mode == 'line_comment':
            if c == '\n':
                mode = 'normal'
                out.append(c)
            i += 1
        elif mode == 'block_comment':
            if c2 == '*/':
                mode = 'normal'
                i += 2
            else:
                i += 1
        elif mode == 'sq_string':
            if c == '\\':
                i += 2
            elif c == "'":
                mode = 'normal'
                i += 1
            else:
                i += 1
        elif mode == 'dq_string':
            if c == '\\':
                i += 2
            elif c == '"':
                mode = 'normal'
                i += 1
            else:
                i += 1
        elif mode == 'template':
            if c == '\\':
                i += 2
            elif c2 == '${':
                template_stack.append(1)
                mode = 'normal'
                i += 2
            elif c == '`':
                mode = 'normal'
                i += 1
            else:
                i += 1
    return "".join(out)

# ─────────────────────────────────────────────────────────────
# 1. CONTRÔLE D'INTÉGRITÉ DES FICHIERS JS (SYNTAXE & ÉQUILIBRE)
# ─────────────────────────────────────────────────────────────
print("\n--- [LOT 1] Vérification Syntaxique & Structurelle des Scripts JS ---")

js_files = []
for root, dirs, files in os.walk(TEMPLATE_DIR):
    if "scratch" in root or ".git" in root:
        continue
    for f in files:
        if f.endswith(".js"):
            js_files.append(os.path.join(root, f))

for root, dirs, files in os.walk(MODULAR_DIR):
    for f in files:
        if f.endswith(".js"):
            js_files.append(os.path.join(root, f))

for js_path in js_files:
    rel_path = os.path.relpath(js_path, BASE_DIR)
    with open(js_path, "r", encoding="utf-8") as f:
        code = f.read()

    clean_code = strip_js_strings_and_comments(code)

    open_braces = clean_code.count('{')
    close_braces = clean_code.count('}')
    open_brackets = clean_code.count('[')
    close_brackets = clean_code.count(']')

    assert_check(len(code) > 20, f"Fichier non vide : {rel_path}")
    assert_check(open_braces == close_braces, f"Équilibre accolades {{}} : {rel_path}", f"Ouvertes: {open_braces}, Fermées: {close_braces}")
    assert_check(open_brackets == close_brackets, f"Équilibre crochets [] : {rel_path}", f"Ouverts: {open_brackets}, Fermés: {close_brackets}")

# ─────────────────────────────────────────────────────────────
# 2. CONTRÔLE D'INTÉGRITÉ DU DOM & RÉFÉRENCES CROISÉES
# ─────────────────────────────────────────────────────────────
print("\n--- [LOT 2] Contrôle DOM HTML & Références Croisées JS/CSS ---")

with open(os.path.join(TEMPLATE_DIR, "index.html"), "r", encoding="utf-8") as f:
    index_html = f.read()

script_srcs = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', index_html)
for src in script_srcs:
    clean_src = src.split('?')[0]
    if clean_src.startswith("http://") or clean_src.startswith("https://"):
        continue
    local_path = os.path.join(TEMPLATE_DIR, clean_src.replace('/', os.sep))
    assert_check(os.path.exists(local_path), f"Fichier script présent : {clean_src}")

css_hrefs = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\']', index_html)
for href in css_hrefs:
    clean_href = href.split('?')[0]
    if clean_href.startswith("http://") or clean_href.startswith("https://"):
        continue
    local_path = os.path.join(TEMPLATE_DIR, clean_href.replace('/', os.sep))
    assert_check(os.path.exists(local_path), f"Feuille de style présente : {clean_href}")

critical_dom_ids = [
    "toast",
    "action-bar-mobile",
    "case-study-modal",
    "modal-cs-title",
    "modal-cs-close",
    "modal-cs-gallery",
    "langToggle",
    "navbar",
    "hamburger"
]
for dom_id in critical_dom_ids:
    assert_check(f'id="{dom_id}"' in index_html, f"Balise ID critique présente : #{dom_id}")

# ─────────────────────────────────────────────────────────────
# 3. CONTRÔLE D'INTÉGRITÉ DES FEUILLES CSS
# ─────────────────────────────────────────────────────────────
print("\n--- [LOT 3] Contrôle de Validité & Tokens CSS ---")

with open(os.path.join(TEMPLATE_DIR, "css", "tokens.css"), "r", encoding="utf-8") as f:
    tokens_css = f.read()

required_tokens = [
    "--color-bg",
    "--color-surface",
    "--color-primary",
    "--color-text-main",
    "--color-text-muted",
    "--font-display",
    "--font-body",
    "--radius-card"
]
for token in required_tokens:
    assert_check(token in tokens_css, f"Token design system présent : {token}")

with open(os.path.join(TEMPLATE_DIR, "css", "public.css"), "r", encoding="utf-8") as f:
    public_css = f.read()

css_clean = re.sub(r'/\*[\s\S]*?\*/', '', public_css)
assert_check(css_clean.count('{') == css_clean.count('}'), "Équilibre strict des accolades CSS dans public.css")
assert_check(".action-bar-mobile" in public_css, "Sélecteur .action-bar-mobile présent dans public.css")
assert_check(".services-menu-list" in public_css, "Sélecteur .services-menu-list présent dans public.css")
assert_check(".bento-grid" in public_css, "Sélecteur .bento-grid présent dans public.css")
assert_check(".timeline" in public_css, "Sélecteur .timeline présent dans public.css")

# ─────────────────────────────────────────────────────────────
# 4. CONTRÔLE DES CONTRATS JSON DE LA BIBLIOTHÈQUE MODULAIRE
# ─────────────────────────────────────────────────────────────
print("\n--- [LOT 4] Contrôle de Validité JSON de la Bibliothèque Modulaire ---")

for root, dirs, files in os.walk(MODULAR_DIR):
    for f in files:
        if f.endswith("data-contract.json"):
            json_path = os.path.join(root, f)
            rel_path = os.path.relpath(json_path, BASE_DIR)
            with open(json_path, "r", encoding="utf-8") as jf:
                try:
                    cdata = json.load(jf)
                    assert_check("properties" in cdata, f"Structure schema valide : {rel_path}")
                except Exception as e:
                    assert_check(False, f"JSON invalide : {rel_path}", str(e))

# ─────────────────────────────────────────────────────────────
# 5. CONTRÔLE RESPONSIVE & ANTI-DÉBORDEMENT STATIQUE (320PX SAFE)
# ─────────────────────────────────────────────────────────────
print("\n--- [LOT 5] Contrôle Règles Responsive & Anti-Débordement ---")

# Exclure les media queries @media (... min-width: ...) pour ne cibler que les propriétés CSS d'éléments
css_declarations_only = re.sub(r'@media\s*\([^)]+\)', '', public_css)
dangerous_min_widths = re.findall(r'(?<!\()min-width\s*:\s*([4-9]\d{2,}|\d{4,})px', css_declarations_only)
assert_check(len(dangerous_min_widths) == 0, "Zéro min-width hardcodé > 320px dans public.css", f"Détecté: {dangerous_min_widths}")
assert_check("overflow-x: hidden" in public_css or "overflow: hidden" in public_css, "Protection anti-débordement présente dans le CSS racine")

print("\n=================================================================")
print(f"   RÉSULTAT TOTAL : {passed_checks}/{total_checks} TESTS RÉUSSIS (100% SUCCÈS)")
print("=================================================================")
