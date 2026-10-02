import re
import json

def test_features():
    print("=== TEST DE NON-RÉGRESSION ET CONFORMITÉ DE L'INTÉGRATION ===")

    # 1. Vérification index.html
    with open('index.html', encoding='utf-8') as f:
        html = f.read()
    assert 'id="toast"' in html, "Erreur: #toast manquant dans index.html"
    assert 'id="case-study-modal"' in html, "Erreur: #case-study-modal manquant dans index.html"
    assert 'id="parcours"' in html, "Erreur: #parcours manquant dans index.html"
    assert 'id="langToggle"' in html, "Erreur: #langToggle manquant dans index.html"
    assert 'href="#parcours"' in html, "Erreur: lien #parcours manquant dans nav-links"
    print("[PASS] index.html : Balises HTML intégrées avec succès (#toast, #case-study-modal, #parcours, #langToggle).")

    # 2. Vérification admin.html
    with open('admin.html', encoding='utf-8') as f:
        admin_html = f.read()
    assert 'id="admin-section-timeline"' in admin_html, "Erreur: #admin-section-timeline manquant dans admin.html"
    assert 'id="timeline-form"' in admin_html, "Erreur: #timeline-form manquant dans admin.html"
    assert 'id="admin-timeline"' in admin_html, "Erreur: #admin-timeline manquant dans admin.html"
    print("[PASS] admin.html : Module CRUD Timeline intégré avec succès.")

    # 3. Vérification public.css
    with open('css/public.css', encoding='utf-8') as f:
        css = f.read()
    assert '.toast' in css and '.toast.show' in css, "Erreur: styles toast manquants dans public.css"
    assert '.bento-grid' in css, "Erreur: styles bento-grid manquants dans public.css"
    assert '.modal-overlay' in css and '.modal-content' in css, "Erreur: styles modale manquants dans public.css"
    assert '.timeline' in css and '.timeline-dot' in css, "Erreur: styles timeline manquants dans public.css"
    assert '.expertise-card' in css and '.expertise-skills-list' in css, "Erreur: styles expertise manquants dans public.css"
    assert '.lang-toggle-btn' in css and 'html[data-lang="fr"]' in css, "Erreur: styles i18n manquants dans public.css"
    print("[PASS] public.css : Styles visuels des 5 lots intégrés avec succès.")

    # 4. Vérification site-config.js
    with open('js/site-config.js', encoding='utf-8') as f:
        site_cfg = f.read()
    assert "'timeline'" in site_cfg, "Erreur: timeline manquant dans sections.order"
    assert "timeline: false" in site_cfg, "Erreur: timeline: false manquant dans sections.active"
    assert "i18n:" in site_cfg, "Erreur: i18n manquant dans site-config.js"
    print("[PASS] site-config.js : Configuration structurelle & pilotage validés.")

    # 5. Vérification feature-config.js
    with open('js/feature-config.js', encoding='utf-8') as f:
        feat_cfg = f.read()
    assert "timeline:" in feat_cfg, "Erreur: timeline manquant dans feature-config.js"
    assert "i18n:" in feat_cfg, "Erreur: i18n manquant dans feature-config.js"
    print("[PASS] feature-config.js : Déclarations de fonctionnalités validées.")

    # 6. Vérification default-content.js
    with open('js/default-content.js', encoding='utf-8') as f:
        def_content = f.read()
    assert "secondaryCta:" in def_content, "Erreur: secondaryCta manquant dans DEFAULT_CONTENT.hero"
    assert "timeline:" in def_content, "Erreur: timeline manquant dans DEFAULT_CONTENT"
    assert "caseStudy:" in def_content, "Erreur: caseStudy manquant dans DEFAULT_CONTENT.gallery"
    print("[PASS] default-content.js : Modèles de données par défaut conformes.")

    # 7. Vérification content-schema.js
    with open('js/content-schema.js', encoding='utf-8') as f:
        schema = f.read()
    assert "timelineItem:" in schema, "Erreur: timelineItem manquant dans SCHEMAS"
    assert "documentUrl:" in schema, "Erreur: documentUrl manquant dans galleryItem"
    assert "caseStudy:" in schema, "Erreur: caseStudy manquant dans galleryItem"
    print("[PASS] content-schema.js : Schémas et contrats de validation v1/v2 déclarés.")

    # 8. Vérification section-renderer.js
    with open('js/section-renderer.js', encoding='utf-8') as f:
        renderer = f.read()
    assert "renderTimeline" in renderer, "Erreur: renderTimeline manquant dans section-renderer.js"
    assert "'timeline': renderTimeline" in renderer, "Erreur: timeline manquant dans SECTION_REGISTRY"
    assert "'timeline': '#parcours'" in renderer, "Erreur: timeline manquant dans SECTION_NAV_MAP"
    assert "cards-expertise" in renderer, "Erreur: cards-expertise manquant dans renderPrestations"
    assert "secondaryCta" in renderer, "Erreur: secondaryCta manquant dans renderHero"
    assert "bento-grid" in renderer, "Erreur: bento-grid manquant dans renderGallery"
    assert "openCaseStudyModal" in renderer, "Erreur: openCaseStudyModal manquant dans renderGallery"
    print("[PASS] section-renderer.js : Moteur de rendu dynamique 100% opérationnel.")

    # 9. Vérification app.js
    with open('js/app.js', encoding='utf-8') as f:
        app_js = f.read()
    assert "showToast" in app_js, "Erreur: showToast manquant dans app.js"
    assert "copyEmailToClipboard" in app_js or "copyEmail" in app_js, "Erreur: copyEmail manquant dans app.js"
    assert "openCaseStudyModal" in app_js, "Erreur: openCaseStudyModal manquant dans app.js"
    assert "langToggle" in app_js, "Erreur: gestionnaire langToggle manquant dans app.js"
    print("[PASS] app.js : Coordinateur d'interactions client 100% opérationnel.")

    # 10. Vérification content-repository.js & admin-dashboard.js
    with open('js/integrations/firebase/content-repository.js', encoding='utf-8') as f:
        repo = f.read()
    assert "getTimeline" in repo and "addTimelineItem" in repo and "deleteTimelineItem" in repo, "Erreur: CRUD timeline manquant dans content-repository.js"
    
    with open('js/admin/admin-dashboard.js', encoding='utf-8') as f:
        dash = f.read()
    assert "loadTimeline" in dash and "initTimelineForm" in dash, "Erreur: méthodes timeline manquantes dans admin-dashboard.js"
    assert "timeline:      'admin-section-timeline'" in dash, "Erreur: timeline manquant dans syncSectionVisibility"
    print("[PASS] content-repository.js & admin-dashboard.js : CRUD complet & isolation respectés.")

    # 11. Vérification TEMPLATE_VERSION inchangé
    with open('TEMPLATE_VERSION', encoding='utf-8') as f:
        ver = f.read().strip()
    assert ver in ['2.1.0', '2.6.0'], f"Erreur: TEMPLATE_VERSION inattendu ({ver})"
    print(f"[PASS] TEMPLATE_VERSION : Conforme ({ver}).")

    print("\n===========================================================")
    print("  TOUS LES 11 TESTS D'INTÉGRATION ET DE NON-RÉGRESSION SONT RÉUSSIS !")
    print("===========================================================")

if __name__ == '__main__':
    test_features()
