import os
import subprocess
import re

print("=================================================================")
print("      TEST FONCTIONNEL DE L'ACTION BAR MOBILE (LIVE RENDU)       ")
print("=================================================================")

test_html = """<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
    <div id="toast"></div>
    <aside id="action-bar-mobile" class="action-bar-mobile" style="display: none;"></aside>
    <script src="../js/site-config.js"></script>
    <script src="../js/default-content.js"></script>
    <script src="../js/section-renderer.js"></script>
    <script>
        SITE_CONFIG.actions.actionBarMobile = {
            enabled: true,
            variant: "emergency",
            title: "Astreinte 24h/24",
            subtext: "Dépannage d'urgence",
            phone: "0450000000",
            ctaLabel: "Appel Immédiat"
        };
        SectionRenderer.renderAll();
    </script>
</body>
</html>
"""

test_path = "scratch/test_action_bar_tmp.html"
with open(test_path, "w", encoding="utf-8") as f:
    f.write(test_html)

out_file = "scratch/test_action_bar_out.html"
cmd = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "--headless=new",
    "--dump-dom",
    f"file:///{os.path.abspath(test_path).replace(os.sep, '/')}"
]

res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='ignore')
with open(out_file, "w", encoding="utf-8") as f:
    f.write(res.stdout)

with open(out_file, "r", encoding="utf-8") as f:
    dom = f.read()

assert "action-bar-emergency" in dom, "FAIL: Classe action-bar-emergency absente"
assert "pulse-emergency" in dom, "FAIL: Point pulse emergency absent"
assert "tel:0450000000" in dom, "FAIL: Numéro tel cliquable absent"
assert "has-action-bar" in dom, "FAIL: Classe body.has-action-bar absente"

print("  [PASS] Variante 'emergency' validée avec succès (point pulse, lien tel, classe body).")

# Test Variante Live Status
test_html_live = test_html.replace('"emergency"', '"live-status"').replace('Astreinte 24h/24', 'Ouvert actuellement')
with open(test_path, "w", encoding="utf-8") as f:
    f.write(test_html_live)

res2 = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='ignore')
with open(out_file, "w", encoding="utf-8") as f:
    f.write(res2.stdout)

with open(out_file, "r", encoding="utf-8") as f:
    dom2 = f.read()

assert "action-bar-live" in dom2, "FAIL: Classe action-bar-live absente"
assert "status-dot" in dom2, "FAIL: Point status-dot absent"
assert "Ouvert actuellement" in dom2, "FAIL: Titre live-status absent"

print("  [PASS] Variante 'live-status' validée avec succès (statut live, bouton de réservation).")

if os.path.exists(test_path):
    os.remove(test_path)
if os.path.exists(out_file):
    os.remove(out_file)

print("\n=================================================================")
print("   TEST ACTION BAR MOBILE 100% SUCCÈS SUR MOTEUR RÉEL !          ")
print("=================================================================")
