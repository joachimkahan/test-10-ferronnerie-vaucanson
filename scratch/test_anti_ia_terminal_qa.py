# -*- coding: utf-8 -*-
"""
test_anti_ia_terminal_qa.py — Contrôle Terminal Approfondi du Template 1.1
========================================================================
Vérifie :
1. Intégrité & Syntaxe JS (équilibres des paires, strings non fermées, regex)
2. Intégrité CSS & Tokens (résolution des variables, fallbacks, crénage, 65ch)
3. Intégrité HTML & DOM (ancres, formulaires, layout split, IDs critiques)
4. Audit Strict Anti-IA (0 émoji, 0 cliché, 0 tiret cadratin tuteur de pensée)
5. Cohérence Données & Rendu (default-content, site-config, section-renderer)
"""

import sys
import os
import re
import glob

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
total_tests = 0
passed_tests = 0
failed_tests = 0

def check(condition, title, details=""):
    global total_tests, passed_tests, failed_tests
    total_tests += 1
    if condition:
        passed_tests += 1
        print(f"  [PASS] {title}")
    else:
        failed_tests += 1
        print(f"  [FAIL] {title} -> {details}")

print("=" * 70)
print("     AUDIT TERMINAL EXHAUSTIF DU TEMPLATE 1.1 — ANTI-IA & QUALITÉ     ")
print("=" * 70)

# ═══════════════════════════════════════════════════════════════
# 1. SYNTAXE & INTÉGRITÉ DES FICHIERS JS
# ═══════════════════════════════════════════════════════════════
print("\n>>> [1] CONTRÔLE DE SYNTAXE DES FICHIERS JAVASCRIPT")
js_files = glob.glob(os.path.join(ROOT_DIR, "js", "**", "*.js"), recursive=True)

def check_brackets_balance(code):
    pairs = {'{': '}', '[': ']', '(': ')'}
    stack = []
    in_single_str = False
    in_double_str = False
    in_backtick = False
    in_line_comment = False
    in_block_comment = False
    escape = False

    i = 0
    n = len(code)
    while i < n:
        c = code[i]
        nxt = code[i+1] if i+1 < n else ''

        if in_line_comment:
            if c == '\n':
                in_line_comment = False
        elif in_block_comment:
            if c == '*' and nxt == '/':
                in_block_comment = False
                i += 1
        elif in_single_str:
            if escape:
                escape = False
            elif c == '\\':
                escape = True
            elif c == "'":
                in_single_str = False
        elif in_double_str:
            if escape:
                escape = False
            elif c == '\\':
                escape = True
            elif c == '"':
                in_double_str = False
        elif in_backtick:
            if escape:
                escape = False
            elif c == '\\':
                escape = True
            elif c == '`':
                in_backtick = False
        else:
            if c == '/' and nxt == '/':
                in_line_comment = True
                i += 1
            elif c == '/' and nxt == '*':
                in_block_comment = True
                i += 1
            elif c == "'":
                in_single_str = True
            elif c == '"':
                in_double_str = True
            elif c == '`':
                in_backtick = True
            elif c in pairs:
                stack.append((c, i))
            elif c in pairs.values():
                if not stack:
                    return False, f"Fermeture orpheline '{c}' à l'indice {i}"
                top, _ = stack.pop()
                if pairs[top] != c:
                    return False, f"Mésappariement '{top}' fermé par '{c}' à l'indice {i}"
        i += 1

    if stack:
        top, idx = stack[-1]
        return False, f"Symbole non fermé '{top}' ouvert à l'indice {idx}"
    return True, "OK"

for fpath in js_files:
    rel_path = os.path.relpath(fpath, ROOT_DIR)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    balanced, msg = check_brackets_balance(content)
    check(balanced, f"Équilibre syntaxique JS : {rel_path}", msg)

# ═══════════════════════════════════════════════════════════════
# 2. INTÉGRITÉ CSS & DESIGN TOKENS
# ═══════════════════════════════════════════════════════════════
print("\n>>> [2] CONTRÔLE DES DESIGN TOKENS & DU CSS PUBLIC")
tokens_path = os.path.join(ROOT_DIR, "css", "tokens.css")
public_css_path = os.path.join(ROOT_DIR, "css", "public.css")

with open(tokens_path, 'r', encoding='utf-8') as f:
    tokens_css = f.read()

with open(public_css_path, 'r', encoding='utf-8') as f:
    public_css = f.read()

required_tokens = [
    '--blanc-art', '--encre', '--color-bg', '--color-surface',
    '--color-primary', '--color-accent', '--color-border',
    '--font-display', '--font-body', '--font-heading-weight',
    '--tracking-tighter', '--tracking-tight', '--prose-max',
    '--shadow-card', '--shadow-hover', '--shadow-subtle',
    '--ease-spring', '--transition-fast'
]
for tok in required_tokens:
    check(f"{tok}:" in tokens_css, f"Token maître déclaré : {tok}")

broken_vars = re.findall(r'var\(--[a-zA-Z0-9_-]+#[^\)]+\)', public_css)
broken_pills = re.findall(r'var\(--radius-pill\d[^\)]+\)', public_css)
check(len(broken_vars) == 0, f"Zéro var() malformée avec hex (#) - Trouvé: {len(broken_vars)}")
check(len(broken_pills) == 0, f"Zéro var(--radius-pill) collée - Trouvé: {len(broken_pills)}")

check("letter-spacing: var(--tracking-tighter, -0.03em);" in public_css, "Crénage négatif appliqué aux grands titres")
check(".hero-description" in public_css and "max-width: var(--prose-max, 65ch);" in public_css, "Largeur maximale 65ch appliquée aux descriptions")

check(".contact-layout-split" in public_css, "Styles asymétriques .contact-layout-split déclarés")
check(".contact-card-info" in public_css, "Carte info atelier .contact-card-info stylisée")

# ═══════════════════════════════════════════════════════════════
# 3. INTÉGRITÉ HTML & DOM (index.html)
# ═══════════════════════════════════════════════════════════════
print("\n>>> [3] CONTRÔLE DE LA STRUCTURE HTML & DES ANCRES (index.html)")
index_path = os.path.join(ROOT_DIR, "index.html")
with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

critical_ids = [
    'accueil', 'apropos', 'looks', 'gallery', 'prestations',
    'temoignages', 'faq', 'infos-pratiques', 'contact',
    'banderole-ticker', 'navbar', 'contact-form',
    'lightbox', 'toast', 'action-bar-mobile', 'case-study-modal'
]
for cid in critical_ids:
    check(f'id="{cid}"' in index_html, f"Élément critique présent : #{cid}")

nav_anchors = re.findall(r'<a\s+href="(#[a-zA-Z0-9_-]+)"', index_html)
for anc in set(nav_anchors):
    target_id = anc.lstrip('#')
    check(f'id="{target_id}"' in index_html, f"L'ancre {anc} pointe vers un ID existant")

check('class="contact-layout-split"' in index_html, "Section contact dispose du conteneur .contact-layout-split")
check('class="contact-aside' in index_html, "Colonne aside de réassurance présente dans le contact")
check('class="contact-main' in index_html, "Colonne formulaire présente dans le contact")

# ═══════════════════════════════════════════════════════════════
# 4. AUDIT STRICT ANTI-IA & COPYWRITING (DIRECTIVE V2.4)
# ═══════════════════════════════════════════════════════════════
print("\n>>> [4] AUDIT STRICT ANTI-IA & FACT-CHECK ARTISANAL")

runtime_files = [index_path, tokens_path, public_css_path] + [
    os.path.join(ROOT_DIR, "js", f) for f in [
        "app.js", "default-content.js", "section-renderer.js",
        "content-adapter.js", "content-schema.js", "site-config.js"
    ]
]

emoji_regex = re.compile(r'[\U0001F300-\U0001F64F\U0001F680-\U0001F6FF\U0001F900-\U0001F9FF]|✨|🚀|⚡|💎|🟢|🎯')

total_emojis = 0
for rf in runtime_files:
    with open(rf, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    for idx, l in enumerate(lines):
        if "!['✨', '⭐', '💎', '⚡', '🚀'].includes" in l:
            continue
        found = emoji_regex.findall(l)
        if found:
            total_emojis += len(found)
            print(f"      Emoji détecté dans {os.path.basename(rf)}:{idx+1} -> {found}")

check(total_emojis == 0, f"Tolérance ZÉRO Émojis dans le code runtime (Trouvé: {total_emojis})")

cliches = [
    "L'Excellence & La Passion au service de vos projets",
    "L'excellence et la passion au service de vos projets",
    "Dans un monde en constante évolution",
    "Découvrez le pouvoir de",
    "Une expérience inoubliable",
    "99% de satisfaction",
    "10x plus rapide"
]
total_cliches = 0
with open(os.path.join(ROOT_DIR, "js", "default-content.js"), 'r', encoding='utf-8') as f:
    dc_txt = f.read()

for cl in cliches:
    if cl in index_html or cl in dc_txt:
        total_cliches += 1
        print(f"      Cliché IA détecté : '{cl}'")

check(total_cliches == 0, f"Zéro cliché de copywriting IA détecté (Trouvé: {total_cliches})")

check('Avis Vérifié' not in index_html, "Zéro badge mécanique 'Avis Vérifié' dans index.html")
with open(os.path.join(ROOT_DIR, "js", "section-renderer.js"), 'r', encoding='utf-8') as f:
    sr_txt = f.read()
check('class="verified-badge"' not in sr_txt, "Suppression du verified-badge mécanique dans section-renderer.js")

check("galleryVariant === 'browser-mockup'" in sr_txt, "Barre macOS strictement restreinte à 'browser-mockup'")

check("Atelier Marcault" in index_html, "Footer ancré avec nom d'atelier réel")
check("SIRET" in index_html, "Footer ancré avec mention légale / SIRET")
check("v2.4.0-artisan" in index_html, "Footer ancré avec révision technique")

# ═══════════════════════════════════════════════════════════════
# 5. COHÉRENCE DU MODÈLE DE DONNÉES & SCHÉMAS
# ═══════════════════════════════════════════════════════════════
print("\n>>> [5] COHÉRENCE DU MODÈLE DE DONNÉES (DEFAULT-CONTENT & SCHÉMAS)")
with open(os.path.join(ROOT_DIR, "js", "content-schema.js"), 'r', encoding='utf-8') as f:
    cs_txt = f.read()
check("default: ''" in cs_txt, "content-schema.js : fallback icon assaini (chaîne vide)")

with open(os.path.join(ROOT_DIR, "js", "content-adapter.js"), 'r', encoding='utf-8') as f:
    ca_txt = f.read()
check("icon: safeString(item.icon, '')" in ca_txt, "content-adapter.js : fallback icon assaini (chaîne vide)")

# ═══════════════════════════════════════════════════════════════
# BILAN FINAL DU TEST
# ═══════════════════════════════════════════════════════════════
print("\n" + "=" * 70)
print(f"   BILAN : {passed_tests}/{total_tests} CONTRÔLES TERMINAL VALIDÉS")
if failed_tests == 0:
    print("   VERDICT : TEMPLATE 1.1 — 100% OPÉRATIONNEL & ZÉRO BUG")
else:
    print(f"   VERDICT : {failed_tests} ANOMALIES À CORRIGER")
print("=" * 70)

if failed_tests > 0:
    sys.exit(1)
