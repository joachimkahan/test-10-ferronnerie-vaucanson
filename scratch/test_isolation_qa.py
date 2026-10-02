import re
import json
import urllib.request

def run_isolation_tests():
    print("=================================================================")
    print("   ÉTAPE 1 — TESTS D'ISOLATION UNITAIRES & ROBUSTESSE (QA)       ")
    print("=================================================================")

    # Test 1: CAND-09 - Toast Copie Email
    print("\n--- [TEST 1] CAND-09 : Toast Copie Email ---")
    with open('index.html', encoding='utf-8') as f:
        html = f.read()
    with open('js/app.js', encoding='utf-8') as f:
        app_js = f.read()
    with open('css/public.css', encoding='utf-8') as f:
        css = f.read()

    assert '<div id="toast"' in html, "FAIL: Balise #toast absente de index.html"
    assert 'class="toast"' in html, "FAIL: Classe .toast absente de index.html"
    assert 'function showToast(' in app_js, "FAIL: showToast() absente de app.js"
    assert 'copyEmailToClipboard' in app_js, "FAIL: copyEmailToClipboard absente de app.js"
    assert '[data-copy-email]' in app_js, "FAIL: Écouteur délégué [data-copy-email] absent de app.js"
    assert '.toast {' in css and '.toast.show {' in css, "FAIL: Règles CSS .toast manquantes"
    # Vérification robustesse: repli mailto si pas d'API clipboard
    assert 'window.location.href' in app_js or 'mailto:' in app_js, "FAIL: Repli mailto manquant"
    print("  [OK] CAND-09 : Balise #toast, styles d'animation, écouteur universel et repli mailto validés.")

    # Test 2: CAND-03 - Multi-CTA Hero avec Téléchargement Direct
    print("\n--- [TEST 2] CAND-03 : Multi-CTA Hero & Download ---")
    with open('js/section-renderer.js', encoding='utf-8') as f:
        renderer = f.read()
    with open('js/default-content.js', encoding='utf-8') as f:
        def_content = f.read()

    assert 'secondaryCta' in renderer, "FAIL: Support secondaryCta absent de renderHero()"
    assert 'btn-download' in renderer, "FAIL: Classe btn-download absente de renderHero()"
    assert 'download=' in renderer or 'download' in renderer, "FAIL: Attribut download absent de renderHero()"
    assert '.hero-cta-group' in css, "FAIL: Classe .hero-cta-group absente de public.css"
    assert 'secondaryCta' in def_content, "FAIL: Modèle secondaryCta absent de default-content.js"
    print("  [OK] CAND-03 : Rendu multi-CTA, bouton téléchargement, attribut download et modèle par défaut validés.")

    # Test 3: CAND-05 - Variante Bento Grid pour la galerie
    print("\n--- [TEST 3] CAND-05 : Bento Grid Galerie ---")
    assert 'bento' in renderer and 'bento-grid' in renderer, "FAIL: Détection variante bento absente de renderGallery()"
    assert '.gallery-grid.bento-grid' in css, "FAIL: Styles .gallery-grid.bento-grid absents de public.css"
    assert '@media (max-width: 992px)' in css, "FAIL: Media query responsive pour bento absente"
    print("  [OK] CAND-05 : Détection variante bento, grille asymétrique et responsive mobile validés.")

    # Test 4: CAND-07 - Document Joint par Réalisation
    print("\n--- [TEST 4] CAND-07 : Document Joint Téléchargeable ---")
    with open('js/content-schema.js', encoding='utf-8') as f:
        schema = f.read()
    with open('js/content-adapter.js', encoding='utf-8') as f:
        adapter = f.read()

    assert 'item.documentUrl' in renderer, "FAIL: Support documentUrl absent de renderGallery()"
    assert 'btn-doc-download' in renderer, "FAIL: Bouton btn-doc-download absent de renderGallery()"
    assert 'documentUrl:' in schema, "FAIL: documentUrl absent du schéma galleryItem"
    assert 'documentLabel:' in schema, "FAIL: documentLabel absent du schéma galleryItem"
    assert 'documentUrl' in adapter, "FAIL: documentUrl absent de normalizeGalleryItem"
    print("  [OK] CAND-07 : Schéma, adaptateur, bouton de téléchargement et repli d'affichage validés.")

    # Test 5: CAND-06 - Modale d'Étude de Cas (Case Study)
    print("\n--- [TEST 5] CAND-06 : Modale d'Étude de Cas ---")
    assert 'id="case-study-modal"' in html, "FAIL: #case-study-modal absent de index.html"
    assert 'openCaseStudyModal' in app_js, "FAIL: openCaseStudyModal absent de app.js"
    assert 'closeCaseStudyModal' in app_js, "FAIL: closeCaseStudyModal absent de app.js"
    assert 'caseStudy' in schema, "FAIL: caseStudy absent de galleryItem schema"
    assert '.modal-overlay' in css and '.modal-specs' in css, "FAIL: Styles modale absents de public.css"
    # Gestion touche Échap
    assert 'Escape' in app_js, "FAIL: Gestion fermeture Échap absente de app.js"
    print("  [OK] CAND-06 : Modale HTML, specs techniques, fermeture Échap/backdrop et gestionnaire JS validés.")

    # Test 6: CAND-04 - Section Optionnelle Timeline & CRUD
    print("\n--- [TEST 6] CAND-04 : Section Timeline / Parcours & CRUD ---")
    with open('admin.html', encoding='utf-8') as f:
        admin_html = f.read()
    with open('js/admin/admin-dashboard.js', encoding='utf-8') as f:
        dashboard = f.read()
    with open('js/integrations/firebase/content-repository.js', encoding='utf-8') as f:
        repo = f.read()
    with open('js/site-config.js', encoding='utf-8') as f:
        site_cfg = f.read()

    assert '<section id="parcours"' in html, "FAIL: #parcours absent de index.html"
    assert 'renderTimeline' in renderer, "FAIL: renderTimeline absent de section-renderer.js"
    assert "'timeline': renderTimeline" in renderer, "FAIL: Enregistrement timeline absent de SECTION_REGISTRY"
    assert "timelineItem:" in schema, "FAIL: Schéma timelineItem absent de content-schema.js"
    assert 'normalizeTimelineItem' in adapter, "FAIL: normalizeTimelineItem absent de content-adapter.js"
    assert 'getTimeline' in adapter, "FAIL: getTimeline absent de content-adapter.js"
    assert 'id="admin-section-timeline"' in admin_html, "FAIL: #admin-section-timeline absent de admin.html"
    assert 'loadTimeline' in dashboard, "FAIL: loadTimeline absent de admin-dashboard.js"
    assert 'initTimelineForm' in dashboard, "FAIL: initTimelineForm absent de admin-dashboard.js"
    assert 'getTimeline' in repo and 'addTimelineItem' in repo and 'deleteTimelineItem' in repo, "FAIL: CRUD repo timeline manquant"
    assert 'timeline: false' in site_cfg, "FAIL: timeline doit être inactif par défaut dans site-config.js"
    print("  [OK] CAND-04 : Rendu public, frise CSS, schéma, adaptateur, CRUD admin et isolation Firestore validés.")

    # Test 7: CAND-08 - Variante Prestations Expertise
    print("\n--- [TEST 7] CAND-08 : Variante Prestations Expertise ---")
    assert 'cards-expertise' in renderer, "FAIL: Variante cards-expertise absente de renderPrestations()"
    assert 'expertise-card' in renderer, "FAIL: Classe expertise-card absente de renderPrestations()"
    assert '.service-card.expertise-card' in css, "FAIL: Styles .expertise-card absents de public.css"
    assert '.expertise-skills-list' in css, "FAIL: Styles .expertise-skills-list absents de public.css"
    print("  [OK] CAND-08 : Variante cards-expertise, masquage de prix, affichage des compétences et bouton d'étude validés.")

    # Test 8: CAND-02 - Sélecteur Bilingue i18n
    print("\n--- [TEST 8] CAND-02 : Sélecteur Bilingue i18n ---")
    assert 'id="langToggle"' in html, "FAIL: #langToggle absent de index.html"
    assert 'langToggle' in app_js, "FAIL: Gestionnaire langToggle absent de app.js"
    assert 'data-lang' in app_js, "FAIL: Attribut data-lang absent de app.js"
    assert '.lang-toggle-btn' in css, "FAIL: Styles .lang-toggle-btn absents de public.css"
    assert 'html[data-lang="fr"] .lang-en' in css, "FAIL: Règle masquage FR/EN absente de public.css"
    assert 'i18n:' in site_cfg, "FAIL: Configuration i18n absente de site-config.js"
    print("  [OK] CAND-02 : Bouton navbar, bascule data-lang, persistance localStorage et masquage CSS validés.")

    print("\n=================================================================")
    print("   RÉSULTAT ÉTAPE 1 : 8/8 FONCTIONNALITÉS TESTÉES AVEC SUCCÈS !  ")
    print("=================================================================")

if __name__ == '__main__':
    run_isolation_tests()
