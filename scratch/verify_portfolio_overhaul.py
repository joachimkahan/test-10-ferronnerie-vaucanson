# -*- coding: utf-8 -*-
"""
Contrôle Terminal & Audit Qualité du Portfolio Joachim Kahan Refondu.
"""

import os
import re
import sys

PORTFOLIO_DIR = r"c:\Users\33783\Documents\Informatique\portfolio"
HTML_PATH = os.path.join(PORTFOLIO_DIR, "index.html")

def test_portfolio():
    print("=" * 70)
    print("      AUDIT TERMINAL DU PORTFOLIO JOACHIM KAHAN (HAUTE FACTURE)     ")
    print("=" * 70)

    assert os.path.exists(HTML_PATH), f"Fichier non trouvé : {HTML_PATH}"

    with open(HTML_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    errors = []

    # 1. Contrôle des IDs critiques hérités
    expected_ids = [
        'about', 'contact', 'experience', 'langToggle', 'main-nav',
        'modal-ia', 'modal-meca', 'modal-micro', 'modal-ohmetre', 'modal-thermique',
        'projects', 'skills', 'themeIcon', 'themeToggle', 'thermalCurvePath',
        'thermalGlow', 'thermalGrad', 'toast'
    ]
    present_ids = set(re.findall(r'id=["\']([^"\']+)["\']', html))
    for eid in expected_ids:
        if eid in present_ids:
            print(f"  [PASS] ID critique présent : #{eid}")
        else:
            errors.append(f"ID critique manquant : #{eid}")

    # 2. Contrôle de validité des ancres
    anchors = re.findall(r'href=["\'](#[a-zA-Z0-9_-]+)["\']', html)
    for a in set(anchors):
        target_id = a[1:]
        if target_id in present_ids:
            print(f"  [PASS] Ancre valide {a} -> #{target_id}")
        else:
            errors.append(f"Ancre brisée {a}")

    # 3. Contrôle des liens de fichiers locaux (PDFs & Images)
    file_refs = [
        'CV.pdf', 'CV_english.pdf', 'CV_test.pdf',
        'BE_smart_cities_session_3__fin.pdf', 'Projet_36_1.pdf',
        'Livrable_APP_Groupe_18_finale.pdf', 'BE_microgrid_2.pdf',
        'Projet Ohmètre  (2).pdf',
        'equans_screen1.png', 'equans_screen2.png', 'equans_screen3.png'
    ]
    for fname in file_refs:
        fpath = os.path.join(PORTFOLIO_DIR, fname)
        if os.path.exists(fpath):
            print(f"  [PASS] Fichier ressource présent sur disque : {fname}")
        else:
            errors.append(f"Ressource manquante sur disque : {fname}")

    # 4. Tolérance ZÉRO Émojis
    emoji_pattern = re.compile(r'[\U00010000-\U0010ffff]', flags=re.UNICODE)
    found_emojis = emoji_pattern.findall(html)
    if not found_emojis:
        print("  [PASS] Tolérance ZÉRO Émojis respectée (0 trouvé)")
    else:
        errors.append(f"Émojis détectés : {found_emojis}")

    # 5. Éradication des Clichés Synthétiques (AI Slop)
    banned_tokens = ['#818cf8', '#a78bfa', '0 0 28px', 'filter: drop-shadow(0 0 8px']
    for token in banned_tokens:
        if token.lower() in html.lower():
            errors.append(f"Token AI Slop banni encore présent : {token}")
        else:
            print(f"  [PASS] Token AI banni absent : {token}")

    # 6. Présence des Tokens de Haute Facture
    noble_tokens = ['--primary: #E08244', '--shadow-hover', '--ease-spring', '--tracking-tighter', '--prose-max']
    for nt in noble_tokens:
        if nt in html:
            print(f"  [PASS] Token Haute Facture présent : {nt}")
        else:
            errors.append(f"Token Haute Facture manquant : {nt}")

    # 7. Contrôle des Modales
    modals_called = re.findall(r'openModal\(["\']([^"\']+)["\']\)', html)
    for m in set(modals_called):
        if f'id="{m}"' in html or f"id='{m}'" in html:
            print(f"  [PASS] Modale fonctionnelle connectée : {m}")
        else:
            errors.append(f"Modale non trouvée pour l'appel : {m}")

    print("=" * 70)
    if errors:
        print(f"  ÉCHEC : {len(errors)} erreur(s) détectée(s)")
        for e in errors:
            print(f"   - {e}")
        sys.exit(1)
    else:
        print("  SUCCÈS : 100% DES CONTRÔLES DU PORTFOLIO SONT VALIDES (ZÉRO BUG) !")
        print("=" * 70)

if __name__ == '__main__':
    test_portfolio()
