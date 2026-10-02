import os
import json
import re

BASE_DIR = r"c:\Users\33783\Documents\Informatique\WebExpress\Technique\Phase 2 _ Template et master prompt\bibliotheque_modulaire"

print("=================================================================")
print("   VÉRIFICATION QUALITÉ DE LA BIBLIOTHÈQUE MODULAIRE WEBEXPRESSO   ")
print("=================================================================")

expected_modules = [
    os.path.join("famille_1_offres_tarifs", "1.1_catalogue_lineaire"),
    os.path.join("famille_1_offres_tarifs", "1.2_cartes_forfaitaires"),
    os.path.join("famille_2_preuve_visuelle", "2.1_comparateur_avant_apres"),
    os.path.join("famille_2_preuve_visuelle", "2.2_fiche_realisation_showcase"),
    os.path.join("famille_3_conversion_disponibilite", "3.1_action_bar_mobile"),
    os.path.join("famille_3_conversion_disponibilite", "3.2_planning_horaires"),
    os.path.join("famille_3_conversion_disponibilite", "3.3_zone_intervention"),
    os.path.join("famille_4_qualification_leads", "4.1_formulaire_guide"),
    os.path.join("famille_4_qualification_leads", "4.2_capture_brochure"),
    os.path.join("famille_5_reassurance_locale", "5.1_preuves_legales"),
    os.path.join("famille_5_reassurance_locale", "5.2_preuve_sociale"),
]

total_checks = 0
passed_checks = 0

for mod in expected_modules:
    mod_path = os.path.join(BASE_DIR, mod)
    assert os.path.exists(mod_path), f"Module manquant : {mod}"
    
    # Check template.html
    tpl_file = os.path.join(mod_path, "template.html")
    assert os.path.exists(tpl_file) and os.path.getsize(tpl_file) > 100, f"Template invalide dans {mod}"
    total_checks += 1
    passed_checks += 1

    # Check data-contract.json
    contract_file = os.path.join(mod_path, "data-contract.json")
    assert os.path.exists(contract_file), f"Contrat JSON manquant dans {mod}"
    with open(contract_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        assert "title" in data, f"Contrat JSON incomplet dans {mod}"
    total_checks += 1
    passed_checks += 1

    # Check README.md
    readme_file = os.path.join(mod_path, "README.md")
    assert os.path.exists(readme_file) and os.path.getsize(readme_file) > 50, f"README manquant dans {mod}"
    total_checks += 1
    passed_checks += 1

    print(f"  [OK] Module vérifié : {mod}")

# Check showcase index.html
showcase_file = os.path.join(BASE_DIR, "index.html")
assert os.path.exists(showcase_file), "Showcase index.html manquant"
with open(showcase_file, "r", encoding="utf-8") as f:
    html_content = f.read()
    assert "Bibliothèque Modulaire WebExpresso" in html_content
    assert "btn-res" in html_content
total_checks += 1
passed_checks += 1

print(f"\nTotal contrôles réussis : {passed_checks}/{total_checks}")
print("=================================================================")
print("   TOUTES LES BRIQUES MODULAIRES SONT CONFORMES ET VALIDÉES !   ")
print("=================================================================")
