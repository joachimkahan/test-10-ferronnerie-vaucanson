import os
import json
import filecmp

BASE_TEMPLATE = r"c:\Users\33783\Documents\Informatique\WebExpress\Technique\Phase 2 _ Template et master prompt\template"
TARGET_DIR = r"c:\Users\33783\Documents\Informatique\WebExpress\Technique\Phase 2 _ Template et master prompt\tests_personnalisation\test_04"

print("=================================================================")
print("  VÉRIFICATION DE LA PERSONNALISATION TEST_04 (L'ATELIER D'ÉLODIE) ")
print("=================================================================")

# 1. Vérification que template/ est 100% INTACT
protected_in_template = ["js/section-renderer.js", "js/content-adapter.js", "js/content-schema.js", "css/public.css", "TEMPLATE_VERSION"]
for p in protected_in_template:
    f1 = os.path.join(BASE_TEMPLATE, p)
    f2 = os.path.join(TARGET_DIR, p)
    assert os.path.exists(f1), f"Fichier manquant dans template: {f1}"
    assert os.path.exists(f2), f"Fichier manquant dans test_04: {f2}"
    assert filecmp.cmp(f1, f2, shallow=False), f"Le fichier protégé {p} a été altéré !"
    print(f"  [OK] Fichier protégé intact : {p}")

# 2. Vérification des fichiers EDITABLE modifiés
site_config_path = os.path.join(TARGET_DIR, "js", "site-config.js")
with open(site_config_path, "r", encoding="utf-8") as f:
    site_cfg = f.read()
    assert "latelier-delodie-annecy" in site_cfg, "Slug projet absent de site-config.js"
    assert "L'Atelier d'Élodie" in site_cfg, "Nom de marque absent"
    assert "looks: false" in site_cfg or "'looks': false" in site_cfg or "looks:false" in site_cfg, "Section looks devrait être désactivée"
    assert "timeline: false" in site_cfg or "'timeline': false" in site_cfg, "Section timeline devrait être désactivée"
    assert "planity.com/latelier-delodie-74000-annecy" in site_cfg, "Lien Planity absent de site-config.js"
print("  [OK] site-config.js personnalisé avec succès")

theme_config_path = os.path.join(TARGET_DIR, "js", "theme-config.js")
with open(theme_config_path, "r", encoding="utf-8") as f:
    theme_cfg = f.read()
    assert "#C07D58" in theme_cfg, "Couleur primaire #C07D58 absente"
    assert "#4A5D4E" in theme_cfg, "Couleur secondaire #4A5D4E absente"
    assert "#FAF8F5" in theme_cfg, "Couleur de fond #FAF8F5 absente"
    assert "Playfair Display" in theme_cfg, "Police Playfair Display absente"
print("  [OK] theme-config.js personnalisé avec succès")

default_content_path = os.path.join(TARGET_DIR, "js", "default-content.js")
with open(default_content_path, "r", encoding="utf-8") as f:
    def_content = f.read()
    assert "Balayage Signature & Gloss Subliminateur" in def_content, "Prestation phare absente"
    assert "Tokio Inkarami" in def_content, "Soin Tokio absent"
    assert "18 Rue Vaugelas" in def_content, "Adresse absente"
    assert "+33 4 50 23 45 67" in def_content, "Téléphone absent"
print("  [OK] default-content.js personnalisé avec succès")

# 3. Vérification de l'offre autonome (admin & firebase préservés)
assert os.path.exists(os.path.join(TARGET_DIR, "admin.html")), "admin.html devrait exister en offre autonome"
assert os.path.exists(os.path.join(TARGET_DIR, "js", "admin", "admin-dashboard.js")), "admin-dashboard.js devrait exister"
assert os.path.exists(os.path.join(TARGET_DIR, "js", "integrations", "firebase", "content-repository.js")), "firebase devrait exister"
print("  [OK] Offre Autonome : Fichiers d'administration et d'intégration parfaitement conservés")

# 4. Vérification README.md
readme_path = os.path.join(TARGET_DIR, "README.md")
with open(readme_path, "r", encoding="utf-8") as f:
    readme_content = f.read()
    assert "L'Atelier d'Élodie" in readme_content, "Nom client absent de README.md"
    assert "Planity" in readme_content, "Planity absent de README.md"
print("  [OK] README.md client personnalisé avec succès")

print("=================================================================")
print("  TOUS LES CONTRÔLES DE PERSONNALISATION SONT VALIDÉS À 100% !   ")
print("=================================================================")
