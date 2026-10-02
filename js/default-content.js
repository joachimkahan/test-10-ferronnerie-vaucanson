/**
 * DEFAULT-CONTENT.JS — Modèle et Contenu par défaut du Template Universel
 * ============================================================
 * [EDITABLE] Ferronnerie d'Art Vaucanson & Fils — Lyon (Test 10 Firebase - Template 1.1)
 * Données Métiers Hautement Authentiques & Conformes Charte Anti-IA
 * ============================================================
 */

const DEFAULT_CONTENT = {

    // ── Métadonnées & Référencement (SEO) ──────────────────────────
    meta: {
        title: "Ferronnerie d'Art Vaucanson & Fils | Forge Traditionnelle & Patrimoine Lyon",
        description: "Atelier de Maîtres Ferronniers d'Art à Lyon : forge au feu, portails monumentaux rivetés, garde-corps débillardés, marquises d'exception et restauration Monuments Historiques.",
        lang: "fr"
    },

    // ── Identité & Marque ──────────────────────────────────────────
    identity: {
        name: "Ferronnerie d'Art Vaucanson & Fils",
        shortName: "Vaucanson & Fils",
        tagline: "Forge Artisanale, Métallerie Monumentale & Conservation du Patrimoine",
        activity: "Maîtres Artisans Ferronniers d'Art & Compagnons du Devoir",
        city: "Lyon",
        address: "18 Quai Paul Sédillat, 69009 Lyon",
        phone: "04 78 83 24 19",
        email: "contact@ferronnerie-vaucanson.fr",
        logoUrl: "",
        faviconUrl: ""
    },

    // ── Section Hero ───────────────────────────────────────────────
    hero: {
        eyebrow: "Atelier Fondé en 1982 · Lyon Val-de-Saône",
        titleHtml: "L'Acier Forgé au Feu & au Marteau,<br><em>du Patrimoine aux Lignes Contemporaines</em>",
        description: "Depuis plus de 40 ans, notre atelier façonne le fer à chaud selon les règles séculaires de la forge manuelle : portails monumentaux rivetés, garde-corps d'escalier débillardés et restauration d'édifices classés.",
        ctaText: "Étudier votre projet d'ouvrage",
        ctaLink: "#contact",
        secondaryCta: {
            enabled: true,
            text: "Télécharger le Carnet d'Ouvrages (PDF)",
            url: "media/carnet-ouvrages-vaucanson.pdf",
            isDownload: true
        },
        imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80"
    },

    // ── Ticker Défilant Éditorial ─────────────────────────────────
    ticker: {
        enabled: true,
        items: [
            "Forge manuelle au charbon de houille et enclume Refflinghaus de 250 kg",
            "Assemblages traditionnels sans soudure visible · Tenons, mortaises et rivets chauds",
            "Restauration de grilles et portails classés Monuments Historiques",
            "Tracé géométrique d'épure au sol à échelle 1 et relevé laser 3D sur site",
            "Protection anticorrosion par métallisation au zinc à 400°C et patine cire graphite"
        ]
    },

    // ── Section À Propos ───────────────────────────────────────────
    about: {
        eyebrow: "Transmission & Geste Métier",
        titleHtml: "Quarante ans de compagnonnage<br><em>au cœur du feu et de la matière</em>",
        paragraphs: [
            "Implantée sur les berges de la Saône à Lyon, la Ferronnerie Vaucanson & Fils perpétue l'art séculaire de la forge manuelle. Fondé en 1982 par François Vaucanson et dirigé par Édouard Vaucanson, Compagnon du Devoir du Tour de France, notre atelier refuse les profilés industriels standards du commerce.",
            "Chaque barre d'acier doux ou de fer puddlé ancien est portée au rouge cerise entre 900°C et 1100°C dans notre foyer de houille grasse, avant d'être étirée, refoulée et cintrée sur l'enclume. De l'épure au sol jusqu'à la pose sur gonds scellés au plomb, nous façonnons des ouvrages d'art pensés pour traverser plusieurs siècles sans faillir."
        ],
        quote: "Le fer ne ment jamais : sous la frappe du marteau, il exige une écoute absolue de sa chaleur pour se plier à la rigueur du trait d'épure sans jamais perdre son âme.",
        signature: "Édouard Vaucanson, Maître Ferronnier d'Art & Compagnon du Devoir.",
        imageUrl: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=1000&q=80"
    },

    // ── Bandeau Manifeste & Transition ────────────────────────────
    banner: {
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
        alt: "Gerbe d'étincelles lors du martelage à chaud d'une volute en fer forgé",
        eyebrow: "Précision millimétrique & feu ardent",
        quote: "L'exigence du trait d'épure au sol, la puissance de la forge et la délicatesse de la ciselure.",
        author: "Ferronnerie d'Art Vaucanson & Fils · Lyon",
        secondary: {
            imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80",
            alt: "Portail d'honneur en fer forgé patiné",
            eyebrow: "Engagement & Durabilité Séculaire",
            quote: "Des ouvrages forgés en acier plein massif, protégés par métallisation au zinc pur et garantis dix ans sans compromis.",
            author: "Atelier Vaucanson · Entreprise du Patrimoine Vivant"
        }
    },

    // ── Section Looks Signatures ───────────────────────────────────
    looksSection: {
        eyebrow: "Ouvrages Signatures",
        title: "Créations de Haute Ferronnerie",
        subtitle: "Une sélection d'ouvrages monumentaux conçus, forgés et patinés au sein de notre atelier lyonnais."
    },
    looks: [
        {
            id: "look_01",
            title: "Portail Monumental Château de Montmelas",
            category: "Portails Classés",
            image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
            description: "Portail d'honneur cintré à double vantail de 4,20 m de haut, couronnement à volutes contrariées et feuillages d'acanthe repoussés à la main.",
            details: [
                "Fer puddlé d'origine et acier doux massif",
                "Assemblage par rivets forgés à chaud",
                "Finition patine graphite et cire d'abeille noire"
            ]
        },
        {
            id: "look_02",
            title: "Garde-Corps d'Escalier Débillardé Hôtel Particulier",
            category: "Garde-Corps d'Art",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
            description: "Rampe d'escalier hélicoïdale sur plan circulaire, main courante forgée sans raccord visible, balustres à nœuds torsadés.",
            details: [
                "Tracé d'épure au sol grandeur nature échelle 1",
                "Cintrage et débillardage à la flamme sur gabarit en pierre",
                "Départ d'escalier sculpté avec pommeau ciselé"
            ]
        },
        {
            id: "look_03",
            title: "Marquise d'Entrée Époque Napoléon III",
            category: "Marquises & Verrières",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
            description: "Marquise en demi-lune avec consoles forgées en col-de-cygne, profilés en T cintrés à chaud et vitrage feuilleté armé 8 mm.",
            details: [
                "Portée en porte-à-faux de 1,80 m sans tirant intermédiaire",
                "Gouttière en zinc intégrée invisible à écoulement discret",
                "Traitement métallisation anti-corrosion marine"
            ]
        }
    ],

    // ── Comparateur Avant / Après ──────────────────────────────────
    beforeAfter: [
        {
            id: "transfo-1",
            title: "Restauration d'une Grille du XVIIIe Siècle : Oxydation Profonde vers Restitution Forgée",
            beforeUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
            afterUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        }
    ],

    // ── Galerie Portfolio ──────────────────────────────────────────
    gallerySection: {
        eyebrow: "Portfolio Métier",
        title: "Atelier & Réalisations d'Exception",
        subtitle: "Aperçu de nos réalisations récentes, entre conservation du patrimoine et métallerie architecturale d'exception."
    },
    gallery: [
        {
            id: "gal_01",
            title: "Portail Monumental Forgé",
            category: "Portails",
            url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
            description: "Double vantail avec médaillon central et imposte festonnée.",
            badge: "Ouvrage d'Art"
        },
        {
            id: "gal_02",
            title: "Rampe Débillardée Val-de-Saône",
            category: "Escaliers",
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            description: "Garde-corps intérieur sur limon hélicoïdal en pierre de taille.",
            badge: "Compagnonnage"
        },
        {
            id: "gal_03",
            title: "Marquise d'Entrée Cintrée",
            category: "Marquises",
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
            description: "Structure profilée avec palmettes ciselées en tôle repoussée.",
            badge: "Patrimoine"
        },
        {
            id: "gal_04",
            title: "Façonnage au Marteau-Pilon",
            category: "Atelier",
            url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
            description: "Étirage et refoulement d'un lopin d'acier chauffé à 1050°C.",
            badge: "Savoir-Faire"
        },
        {
            id: "gal_05",
            title: "Frappe sur Enclume Refflinghaus",
            category: "Forge",
            url: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=800&q=80",
            description: "Ciselure manuelle des départs de volutes à noyau plein.",
            badge: "Geste d'Artisan"
        },
        {
            id: "gal_06",
            title: "Table d'Apparat Acier & Pierre Dorée",
            category: "Mobilier",
            url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
            description: "Piètement forgé en acier brut patiné et plateau en pierre des Monts d'Or.",
            badge: "Création Unique"
        }
    ],

    // ── Prestations d'Atelier ───────────────────────────────────────
    prestationsSection: {
        eyebrow: "Savoir-Faire & Compétences",
        title: "Prestations d'Atelier & Chantiers",
        subtitle: "Chaque ouvrage est une création sur-mesure répondant aux plus hautes exigences des Bâtiments de France et des architectes."
    },
    prestations: [
        {
            id: "prest_01",
            title: "Portails & Clôtures Monumentales",
            price: "Dès 6 500 €",
            description: "Conception, forgeage intégral, assemblage par tenons-mortaises et pose millimétrique sur piliers existants ou créés.",
            features: [
                "Étude d'épure et modélisation dimensionnelle",
                "Ferronnerie massive pleine, 0 tube creux",
                "Motorisation invisible intégrée dans le sol",
                "Garantie décennale et certification anti-corrosion"
            ]
        },
        {
            id: "prest_02",
            title: "Rampes d'Escalier & Garde-Corps Débillardés",
            price: "Dès 1 200 € / ml",
            description: "Mains courantes forgées sur gabarit d'escalier hélicoïdal, droit ou balancé. Conforme aux normes NF P 01-012.",
            features: [
                "Prise de cotes 3D au scanner laser sur chantier",
                "Volutes à noyaux matricées et ciselées main",
                "Départs sculptés et barreaux à bague forgée",
                "Finition canon de fusil, cire chaude ou laiton poli"
            ]
        },
        {
            id: "prest_03",
            title: "Marquises, Verrières & Serrurerie d'Art",
            price: "Dès 3 800 €",
            description: "Ouvrages architecturaux alliant la finesse de l'acier et la transparence du verre de sécurité armé.",
            features: [
                "Cintrage à chaud des fers T et cornières",
                "Consoles forgées d'un seul tenant",
                "Joints d'étanchéité EPDM haute durabilité",
                "Pose soignée sur façades en pierre ou moellons"
            ]
        },
        {
            id: "prest_04",
            title: "Restauration du Patrimoine & Monuments Historiques",
            price: "Sur étude d'expertise",
            description: "Intervention sur ouvrages métalliques classés ou inscrits : châteaux, églises, édifices civils et hôtels particuliers.",
            features: [
                "Recherches historiques et dossier documentaire",
                "Démontage chirurgical et numérotation des fers",
                "Greffe à la forge et préservation maximale du métal ancien",
                "Respect scrupuleux du cahier des charges DRAC"
            ]
        }
    ],

    // ── Témoignages & Avis ──────────────────────────────────────────
    testimonialsSection: {
        eyebrow: "Témoignages & Références",
        title: "La Confiance de nos Commanditaires",
        subtitle: "Retours d'architectes, conservateurs et propriétaires d'ouvrages d'art."
    },
    testimonials: [
        {
            id: "testi_01",
            author: "Henri de Saint-Alban",
            role: "Propriétaire du Domaine des Tourelles",
            quote: "La restauration de notre portail d'honneur du XVIIIe siècle par l'Atelier Vaucanson est un chef-d'œuvre. La précision des greffes à la forge et la patine graphite redonnent à l'entrée de la propriété sa noblesse historique.",
            rating: 5
        },
        {
            id: "testi_02",
            author: "Camille Reynaud",
            role: "Architecte du Patrimoine (Cabinet Reynaud & Associés, Lyon)",
            quote: "Collaborer avec Édouard Vaucanson est une garantie absolue d'exigence technique. Le respect scrupuleux du tracé d'épure au sol et la maîtrise du débillardage ont permis de livrer une rampe d'escalier d'une fluidité parfaite.",
            rating: 5
        },
        {
            id: "testi_03",
            author: "Marc & Hélène Vignal",
            role: "Maison d'architecte à Saint-Didier-au-Mont-d'Or",
            quote: "Nous souhaitions une marquise contemporaine mais forgée dans les règles de l'art. Le résultat dépasse nos attentes : un équilibre remarquable entre robustesse de l'acier forgé et légèreté visuelle.",
            rating: 5
        }
    ],

    // ── Partenaires & Labels ────────────────────────────────────────
    partnersSection: {
        eyebrow: "Agréments & Labels",
        title: "Reconnaissance Institutionnelle & Filiations",
        subtitle: "Des distinctions d'excellence attestant de la rigueur de nos pratiques d'atelier."
    },
    partners: [
        {
            name: "Entreprise du Patrimoine Vivant",
            logo: "EPV",
            description: "Label d'État récompensant l'excellence des savoir-faire artisanaux français."
        },
        {
            name: "Compagnons du Devoir",
            logo: "Compagnonnage",
            description: "Filiation avec l'Union Compagnonnique des Devoirs Unis."
        },
        {
            name: "Ateliers d'Art de France",
            logo: "AAF",
            description: "Syndicat professionnel national des métiers d'art."
        },
        {
            name: "Fondation du Patrimoine",
            logo: "Patrimoine",
            description: "Partenaire agréé pour la réhabilitation du patrimoine bâti ancien."
        }
    ],

    // ── Chronologie / Histoire ──────────────────────────────────────
    timelineSection: {
        eyebrow: "Grandes Étapes",
        title: "Histoire & Jalons de l'Atelier",
        subtitle: "Plus de quatre décennies d'enclume, d'engagements et de chantiers remarquables."
    },
    timeline: [
        {
            year: "1982",
            title: "Fondation de l'Atelier Vaucanson",
            description: "François Vaucanson installe sa première forge à charbon sur les quais de Saône à Lyon."
        },
        {
            year: "2004",
            title: "Agrément Restauration Monuments Historiques",
            description: "L'atelier est sélectionné pour la réfection des grilles d'honneur de la Préfecture du Rhône."
        },
        {
            year: "2014",
            title: "Reprise par Édouard Vaucanson",
            description: "Après son Tour de France de Compagnon, Édouard prend la direction et introduit le relevé 3D laser."
        },
        {
            year: "2021",
            title: "Attribution du Label Entreprise du Patrimoine Vivant",
            description: "Consécration nationale reconnaissant la maîtrise des techniques de forge manuelle séculaire."
        }
    ],

    // ── FAQ ────────────────────────────────────────────────────────
    faqSection: {
        eyebrow: "Questions Fréquentes",
        title: "Comprendre notre Démarche & nos Délais",
        subtitle: "Tout ce que vous devez savoir avant d'engager un projet d'ouvrage forgé."
    },
    faq: [
        {
            question: "Travaillez-vous avec des profilés métalliques industriels creux ?",
            answer: "Non, formellement. Tous nos ouvrages sont forgés exclusivement à partir d'aciers pleins, de fers marchands étirés ou de fers anciens puddlés pour les restaurations. Cela confère à nos réalisations un poids, une solidité et une résistance à la corrosion incomparables."
        },
        {
            question: "Quels sont les délais moyens de fabrication pour un portail ou une rampe ?",
            answer: "Compte tenu de la phase d'étude, du tracé de l'épure, du forgeage manuel et du traitement de surface, un projet complet demande généralement entre 6 et 12 semaines selon la complexité des volutes et des motifs ciselés."
        },
        {
            question: "Comment vos ouvrages résistent-ils aux intempéries et à la rouille ?",
            answer: "Chaque pièce extérieure subit une métallisation au pistolet thermique (projection de zinc pur en fusion à 400°C), créant une barrière anticorrosion définitive. Nous appliquons ensuite une patine graphite ou une mise en peinture polyuréthane cuite."
        },
        {
            question: "Intervenez-vous hors de la région lyonnaise ?",
            answer: "Oui. Si notre atelier est établi à Lyon, nous intervenons régulièrement sur des demeures de prestige en Bourgogne, en Savoie, en région parisienne et sur l'arc lémanique en Suisse."
        }
    ],

    // ── Infos Pratiques ────────────────────────────────────────────
    practicalInfo: {
        eyebrow: "Accès & Visite de Forge",
        title: "Informations Pratiques",
        address: "18 Quai Paul Sédillat, 69009 Lyon",
        phone: "04 78 83 24 19",
        email: "contact@ferronnerie-vaucanson.fr",
        hours: "Lundi au Vendredi : 07h30 - 12h00 / 13h30 - 18h30. Samedi sur RDV.",
        access: "Accès direct par le Quai de Saône, parking atelier pour enlèvement d'ouvrages monumentaux.",
        lat: 45.7828,
        lng: 4.8082
    },

    // ── Contact ────────────────────────────────────────────────────
    contact: {
        eyebrow: "Étude Sur-Mesure",
        title: "Confiez-nous votre Projet Forgé",
        subtitle: "Nous vous accueillons à l'atelier sur rendez-vous ou nous déplaçons sur votre chantier pour un premier relevé technique.",
        workshopName: "Ferronnerie d'Art Vaucanson & Fils",
        workshopDesc: "Nous vous accueillons à la forge sur les quais de Saône pour étudier vos plans d'architecte, examiner nos gabarits d'épure et définir les détails de ferronnerie d'art de votre projet.",
        address: "18 Quai Paul Sédillat, 69009 Lyon",
        phone: "04 78 83 24 19",
        email: "contact@ferronnerie-vaucanson.fr",
        reactivity: "Étude préliminaire et devis technique sous 48h ouvrées",
        guarantee: "Forge en acier plein sans sous-traitance · Garantie décennale",
        formAction: "https://formsubmit.co/contact@ferronnerie-vaucanson.fr",
        submitText: "Envoyer ma demande d'étude d'ouvrage"
    },

    // ── Footer ─────────────────────────────────────────────────────
    footer: {
        siteName: "Ferronnerie d'Art Vaucanson & Fils",
        tagline: "Maîtres Artisans forgerons d'art et Compagnons du Devoir à Lyon. Forge traditionnelle au feu, métallerie monumentale et conservation du patrimoine bâti.",
        address: "Atelier de forge : 18 Quai Paul Sédillat, 69009 Lyon (Val-de-Saône)",
        meta: "Bureau d'études & Enclume · SIRET 384 921 765 00031 · Label EPV",
        copyright: "© 2026 Ferronnerie d'Art Vaucanson & Fils SAS. Tous droits réservés. Réalisation Studio WebExpresso."
    }

};

// Export global pour le navigateur
if (typeof window !== 'undefined') {
    window.DEFAULT_CONTENT = DEFAULT_CONTENT;
}
