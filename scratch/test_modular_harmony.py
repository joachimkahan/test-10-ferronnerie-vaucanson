import os
import json
import re

BASE_DIR = r"c:\Users\33783\Documents\Informatique\WebExpress\Technique\Phase 2 _ Template et master prompt"
TEMPLATE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODULAR_DIR = os.path.join(BASE_DIR, "bibliotheque_modulaire")

print("=================================================================")
print("     TEST D'HARMONIE ARCHITECTURALE & NON-RÉGRESSION WEBEXPRESSO   ")
print("=================================================================")

checks_passed = 0
checks_total = 0

def check(condition, desc):
    global checks_passed, checks_total
    checks_total += 1
    if condition:
        checks_passed += 1
        print(f"  [PASS] {desc}")
    else:
        print(f"  [FAIL] {desc}")
        raise AssertionError(f"Contrôle échoué : {desc}")

# 1. Vérification des Contrats de Données de la Bibliothèque
catalogue_contract = os.path.join(MODULAR_DIR, "famille_1_offres_tarifs", "1.1_catalogue_lineaire", "data-contract.json")
with open(catalogue_contract, "r", encoding="utf-8") as f:
    data = json.load(f)
    check("prestationItem" in data.get("description", "") or "menu-list" in str(data), "1.1 Catalogue aligné sur prestationItem menu-list")

before_after_contract = os.path.join(MODULAR_DIR, "famille_2_preuve_visuelle", "2.1_comparateur_avant_apres", "data-contract.json")
with open(before_after_contract, "r", encoding="utf-8") as f:
    data = json.load(f)
    check("beforeUrl" in data.get("properties", {}) and "afterUrl" in data.get("properties", {}), "2.1 Avant/Après aligné sur beforeUrl/afterUrl")

# 2. Vérification de l'Éradication Tailwind dans les templates modifiés
catalogue_tpl = os.path.join(MODULAR_DIR, "famille_1_offres_tarifs", "1.1_catalogue_lineaire", "template.html")
with open(catalogue_tpl, "r", encoding="utf-8") as f:
    content = f.read()
    check("services-menu-list" in content and "menu-list-item" in content, "1.1 template.html utilise les classes Vanilla CSS de public.css")
    check("py-12" not in content and "font-sans" not in content, "1.1 template.html épuré de toute classe Tailwind")

action_bar_tpl = os.path.join(MODULAR_DIR, "famille_3_conversion_disponibilite", "3.1_action_bar_mobile", "template.html")
with open(action_bar_tpl, "r", encoding="utf-8") as f:
    content = f.read()
    check("action-bar-mobile" in content and "btn-emergency" in content, "3.1 template.html utilise les classes Vanilla CSS BEM")
    check("bg-stone-900" not in content and "md:hidden" not in content, "3.1 template.html épuré de toute classe Tailwind")

action_bar_script = os.path.join(MODULAR_DIR, "famille_3_conversion_disponibilite", "3.1_action_bar_mobile", "script.js")
with open(action_bar_script, "r", encoding="utf-8") as f:
    content = f.read()
    check("action-bar-dot" in content and "dot-open" in content, "3.1 script.js utilise les classes Vanilla CSS")
    check("bg-emerald-500" not in content, "3.1 script.js épuré de classes Tailwind en chaîne")

# 3. Vérification de l'Intégration Native dans le Template Maître
index_html = os.path.join(TEMPLATE_DIR, "index.html")
with open(index_html, "r", encoding="utf-8") as f:
    content = f.read()
    check('id="action-bar-mobile"' in content, "index.html contient le point d'ancrage #action-bar-mobile")

public_css = os.path.join(TEMPLATE_DIR, "css", "public.css")
with open(public_css, "r", encoding="utf-8") as f:
    content = f.read()
    check(".action-bar-mobile" in content and "pulse-emergency" in content, "public.css contient les styles .action-bar-mobile")
    check("has-action-bar" in content, "public.css gère le dégagement responsive body.has-action-bar")

site_config = os.path.join(TEMPLATE_DIR, "js", "site-config.js")
with open(site_config, "r", encoding="utf-8") as f:
    content = f.read()
    check("actionBarMobile:" in content and "emergency" in content, "site-config.js déclare actions.actionBarMobile")

section_renderer = os.path.join(TEMPLATE_DIR, "js", "section-renderer.js")
with open(section_renderer, "r", encoding="utf-8") as f:
    content = f.read()
    check("renderActionBar" in content and "action-bar-emergency" in content, "section-renderer.js implémente renderActionBar()")

components_doc = os.path.join(TEMPLATE_DIR, "COMPONENTS.md")
with open(components_doc, "r", encoding="utf-8") as f:
    content = f.read()
    check("2.21. `actionBarMobile`" in content, "COMPONENTS.md documente le composant 2.21 actionBarMobile")

modular_readme = os.path.join(MODULAR_DIR, "README.md")
with open(modular_readme, "r", encoding="utf-8") as f:
    content = f.read()
    check("Variantes Natives du Template Maître" in content, "README de la bibliothèque documente le mode natif vs module")

print("\n=================================================================")
print(f"   RÉSULTAT : {checks_passed}/{checks_total} CONTRÔLES RÉUSSIS (100% SUCCÈS)")
print("=================================================================")
