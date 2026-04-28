(() => {
    'use strict';

    const body = document.body;

    const ui = {
        menuToggle: document.querySelector('.menu-toggle'),
        siteNav: document.querySelector('.site-nav'),

        revealItems: Array.from(document.querySelectorAll('.reveal')),

        indexItems: Array.from(document.querySelectorAll('.project-index-item')),
        previewContainer: document.querySelector('.project-index-preview'),
        previewImage: document.getElementById('index-preview-image'),
        previewVideo: document.getElementById('index-preview-video'),
        previewVideoSource: document.querySelector('#index-preview-video source'),

        lightbox: document.getElementById('lightbox'),
        lightboxStage: document.getElementById('lightbox-stage'),
        lightboxCaption: document.getElementById('lightbox-caption'),
        lightboxClose: document.querySelector('.lightbox-close'),
        lightboxPrev: document.querySelector('.lightbox-nav--prev'),
        lightboxNext: document.querySelector('.lightbox-nav--next'),

        lightboxTriggers: Array.from(document.querySelectorAll('.js-open-lightbox')),
        langToggle: document.querySelector('.lang-toggle')
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const previewState = {
        type: '',
        src: ''
    };

    let lightboxItems = [];
    let lightboxIndex = -1;
    let currentLang = localStorage.getItem('site-language') || 'en';

    const translations = {
        en: {
            pageTitle: 'Ilario Placanica — Archviz Web Experiences',
            metaDescription:
                'Ilario Placanica — 3D web visualization, immersive real estate tools, landing pages, and interactive property experiences.',
            navWork: 'Select Work',
            navAbout: 'About',
            navContact: 'Contact',
            heroTitle:
                'Designing web experiences<br />that make architecture<br />easier to sell.',
            heroText:
                '3D visualizer focused on architectural storytelling, interactive real estate tools, web-based immersive experiences, and landing pages for property presentation.',
            heroFooter:
                'Available for premium archviz, real estate presentation systems, landing pages, and web-based immersive experiences for architecture and property marketing.',
            selectedWorkEyebrow: 'Selected Work',
            selectedWorkTitle: 'Few projects. Strong point of view.',
            indexWork1Title: 'Immersive Real Estate Experience',
            indexWork1Meta: 'Unreal Engine / real-time sales presentation / architectural storytelling',
            indexWork2Title: 'Immersive Property Cards',
            indexWork2Meta: 'Web presentation / virtual tours / digital property showcase',
            indexWork3Title: 'Landing Pages for Real Estate Presentation',
            indexWork3Meta: 'Web design / conversion-focused layout / immersive product storytelling',
            roleLabel: 'Role',
            toolsLabel: 'Tools',
            whyItMattersLabel: 'Why it matters',
            workflowLabel: 'Workflow',
            premiseLabel: 'Premise',
            focusLabel: 'Focus',
            partnersLabel: 'Partners',
            aboutLabel: 'About',
            contactLabel: 'Contact',
            lightboxClose: 'Close',
            visitApartmentPage: 'Visit the apartment page',
            visitLandingPage: 'Visit the landing page',
            urbanViewerTitle: 'Urban Viewer',
            openUrbanViewer: 'Open urban viewer',
            open360Tour: 'Open 360 tour',
            partnerVisit: 'Visit site',

            work1Title: 'Immersive Real Estate Experience for Primula Costruzioni',
            work1Text:
                'Real-time architectural visualization software developed in Unreal Engine 5 to support the sales and presentation of a new residential building within its surrounding context. The project enables interactive exploration of the architecture and interior spaces through real-time rendering, dynamic natural lighting, and a touchscreen-first interface.',
            work1Role:
                '3D visualization, environment assembly, interface design, Blueprint development, real-time presentation.',
            work1BodyTitle: 'A sales tool, not just a render.',
            work1BodyText:
                'The experience was designed to make the project legible and desirable in real time. Instead of static imagery only, the interface supports active navigation, daylight variation, and spatial understanding during client presentations.',
            work1Bullet1: 'Real-time visualization',
            work1Bullet2: 'Dynamic daylight system',
            work1Bullet3: 'Touchscreen-ready UX',
            work1Bullet4: 'Context-aware presentation',
            work1WorkflowTitle: 'From modeled context to packaged executable.',
            work1Step1Title: 'Building and context modeling',
            work1Step1Text:
                'The architectural intervention and surrounding district were modeled in Blender to create a clean, controllable base for real-time visualization.',
            work1Step2Title: 'Unreal assembly and geospatial integration',
            work1Step2Text:
                'The project was assembled in Unreal, enriched with Cesium context data, materials, lighting, furnishing, and atmosphere to improve readability and immersion.',
            work1Step3Title: 'Interactive systems and packaging',
            work1Step3Text:
                'Blueprint logic, widgets, GameMode behavior, and controller systems were developed for touchscreen interaction, then packaged into a standalone Windows application.',

            work2Title: 'Immersive Property Cards for Primula Costruzioni',
            work2Text:
                'A series of immersive apartment pages created to support the presentation and sale of renovated units within an existing building. Each property was translated into a dedicated digital experience centered on interiors, clarity, and atmosphere, then published on the web.',
            work2Role:
                '3D production, render direction, visual layout, virtual-tour integration, web presentation.',
            work2BodyTitle: 'Interior-first storytelling for real estate.',
            work2BodyText:
                'Because the building renovation was partial, the communication focused on interior quality, navigable panoramas, and digital property presentation rather than a fully spatialized exterior experience.',
            work2WorkflowTitle: 'From interior scenes to web deployment.',
            work2Step1Title: 'Modeling and scene setup',
            work2Step1Text:
                'The operation was modeled in Blender, imported into Unreal, and completed with materials, lighting, furniture, and generated urban context.',
            work2Step2Title: 'Render production and graphic design',
            work2Step2Text:
                'Panoramas and vertical stills were rendered in Unreal, then refined in Photoshop and Illustrator for hierarchy and presentation.',
            work2Step3Title: 'Marzipano tour development',
            work2Step3Text:
                'The 360 renders became a navigable web tour with hotspots and scene transitions designed for intuitive browsing.',
            work2Step4Title: 'Publishing apartment pages',
            work2Step4Text:
                'Each apartment received a dedicated web destination, combining imagery, motion, and immersive navigation inside a single online presentation.',

            work3Title: 'Landing Pages for Architectural and Real Estate Products',
            work3Text:
                'Conversion-oriented landing pages designed to present architectural products, residential developments, and immersive property experiences with the same premium visual language used in the 3D work. The goal is to turn renders, videos, 3D viewers, and sales information into a clear web destination that feels polished, credible, and easy to navigate.',
            work3Role:
                'Creative direction, visual hierarchy, layout design, web presentation, and integration of rendering and 3D showcase assets.',
            work3BodyTitle: 'A web layer that helps the visual work sell.',
            work3BodyText:
                'These pages are built to translate complex architectural or real estate material into a presentation that feels immediate and premium. Instead of showing isolated renders only, the landing page structures the message, supports trust, and gives the viewer a clear path through imagery, benefits, and interaction.',
            work3WorkflowTitle: 'Position, structure, design, publish.',
            work3Step1Title: 'Content positioning',
            work3Step1Text:
                'The offer, target audience, and strongest visuals are identified first so the page can communicate value quickly instead of feeling like a generic gallery.',
            work3Step2Title: 'Layout and storytelling',
            work3Step2Text:
                'The page is structured around hierarchy, rhythm, and clarity, combining renders, text, and product information into a premium presentation flow.',
            work3Step3Title: 'Integration and delivery',
            work3Step3Text:
                'Videos, galleries, and interactive material such as 3D viewers can be integrated into a final responsive landing page ready for showcasing or lead generation.',
            partnersTitle: 'Companies and studios I collaborate with.',
            partnersText:
                'Ongoing collaborations where visualization, web presentation, and project communication support work across real estate, architecture, and spatial communication.',
            partnerPrimulaMeta:
                'Immersive experiences, presentation tools, and digital communication for real estate.',
            partnerCubicoMeta:
                'Web presentation, visual storytelling, and digital support for projects, spaces, and communication.',

            aboutTitle: 'Architecture trained. Self-built across tools. Obsessed with visual clarity.',
            aboutText1:
                'I’m a 3D artist and designer from Bologna. My interest in digital media began in high school through Java, Scratch, and an independent exploration of Adobe tools, which first sparked my curiosity for design.',
            aboutText2:
                'During my first year of Architecture at Politecnico di Torino, a drawing course introduced me to 3ds Max with V-Ray and opened the door to 3D and digital visualization. Since then I have developed a largely self-taught practice focused on visual representation, interactive media, and a broad set of 3D tools.',
            aboutText3:
                'That path led to collaboration with Primula Costruzioni, first through an internship and then through professional work centered on immersive real estate experiences and presentation systems.',
            contactTitle: 'Let’s build work that feels premium, clear, and impossible to ignore.'
        },

       it: {
            pageTitle: 'Ilario Placanica — Esperienze Web per Architettura e Real Estate',
            metaDescription:
                'Ilario Placanica — visualizzazione 3D per il web, strumenti immersivi per il real estate, landing page ed esperienze interattive per la presentazione di immobili.',
            navWork: 'Progetti',
            navAbout: 'Chi sono',
            navContact: 'Contatti',
            heroTitle:
                'Progetto esperienze web<br />che rendono l’architettura<br />più facile da vendere.',
            heroText:
                '3D visualizer specializzato in storytelling architettonico, strumenti interattivi per il real estate, esperienze immersive sul web e landing page per la presentazione di immobili.',
            heroFooter:
                'Disponibile per progetti di archviz premium, sistemi di presentazione immobiliare, landing page ed esperienze web immersive per l’architettura e il marketing immobiliare.',
            selectedWorkEyebrow: 'Progetti selezionati',
            selectedWorkTitle: 'Pochi progetti. Un punto di vista forte.',
            indexWork1Title: 'Esperienza Immersiva per il Real Estate',
            indexWork1Meta: 'Unreal Engine / presentazione di vendita real-time / storytelling architettonico',
            indexWork2Title: 'Schede Immersive per Immobili',
            indexWork2Meta: 'Presentazione web / virtual tour / showcase immobiliare digitale',
            indexWork3Title: 'Landing Page per la Presentazione Immobiliare',
            indexWork3Meta: 'Web design / layout orientato alla conversione / storytelling immersivo del prodotto',
            roleLabel: 'Ruolo',
            toolsLabel: 'Strumenti',
            whyItMattersLabel: 'Perché è importante',
            workflowLabel: 'Workflow',
            premiseLabel: 'Premessa',
            focusLabel: 'Focus',
            partnersLabel: 'Partners',
            aboutLabel: 'Chi sono',
            contactLabel: 'Contatti',
            lightboxClose: 'Chiudi',
            visitApartmentPage: "Visita la pagina dell'appartamento",
            visitLandingPage: 'Visita la landing page',
            urbanViewerTitle: 'Urban Viewer',
            openUrbanViewer: 'Apri Urban Viewer',
            open360Tour: 'Apri il tour 360',
            partnerVisit: 'Visita il sito',

            work1Title: 'Esperienza Immersiva per il Real Estate di Primula Costruzioni',
            work1Text:
                "Software di visualizzazione architettonica in tempo reale sviluppato in Unreal Engine 5 per supportare la vendita e la presentazione di un nuovo edificio residenziale inserito nel suo contesto urbano. Il progetto consente un'esplorazione interattiva dell'architettura e degli spazi interni attraverso rendering real-time, luce naturale dinamica e un'interfaccia pensata per il touchscreen.",
            work1Role:
                'Visualizzazione 3D, assemblaggio dell’ambiente, design dell’interfaccia, sviluppo Blueprint e presentazione real-time.',
            work1BodyTitle: 'Uno strumento di vendita, non solo un render.',
            work1BodyText:
                'L’esperienza è stata progettata per rendere il progetto leggibile e desiderabile in tempo reale. Invece di affidarsi soltanto a immagini statiche, l’interfaccia favorisce una navigazione attiva, la variazione della luce naturale e una migliore comprensione dello spazio durante le presentazioni ai clienti.',
            work1Bullet1: 'Visualizzazione real-time',
            work1Bullet2: 'Sistema dinamico della luce diurna',
            work1Bullet3: 'UX pensata per il touchscreen',
            work1Bullet4: 'Presentazione attenta al contesto',
            work1WorkflowTitle: 'Dal contesto modellato all’eseguibile finale.',
            work1Step1Title: 'Modellazione dell’edificio e del contesto',
            work1Step1Text:
                'L’intervento architettonico e il quartiere circostante sono stati modellati in Blender per creare una base pulita e controllabile per la visualizzazione in tempo reale.',
            work1Step2Title: 'Assemblaggio in Unreal e integrazione geospaziale',
            work1Step2Text:
                'Il progetto è stato assemblato in Unreal e arricchito con dati di contesto di Cesium, materiali, illuminazione, arredi e atmosfera, così da migliorarne leggibilità e immersione.',
            work1Step3Title: 'Sistemi interattivi e packaging',
            work1Step3Text:
                'Sono stati sviluppati la logica Blueprint, i widget, il comportamento del GameMode e i sistemi di controllo per l’interazione touchscreen; successivamente, il progetto è stato pacchettizzato come applicazione standalone per Windows.',

            work2Title: 'Schede Immersive per Immobili di Primula Costruzioni',
            work2Text:
                'Una serie di pagine immersive dedicate agli appartamenti, create per supportare la presentazione e la vendita di unità ristrutturate all’interno di un edificio esistente. Ogni immobile è stato tradotto in un’esperienza digitale dedicata, incentrata sugli interni, sulla chiarezza e sull’atmosfera, per poi essere pubblicata sul web.',
            work2Role:
                'Produzione 3D, direzione dei render, layout visivo, integrazione del virtual tour e presentazione web.',
            work2BodyTitle: 'Storytelling immobiliare centrato sugli interni.',
            work2BodyText:
                'Poiché la ristrutturazione dell’edificio era parziale, la comunicazione si è concentrata sulla qualità degli interni, sulle panoramiche navigabili e sulla presentazione digitale dell’immobile, più che su un’esperienza esterna completamente spazializzata.',
            work2WorkflowTitle: 'Dalle scene d’interni alla pubblicazione sul web.',
            work2Step1Title: 'Modellazione e setup della scena',
            work2Step1Text:
                'L’intervento è stato modellato in Blender, importato in Unreal e completato con materiali, illuminazione, arredi e contesto urbano generato.',
            work2Step2Title: 'Produzione dei render e graphic design',
            work2Step2Text:
                'Panorami e still verticali sono stati renderizzati in Unreal, poi rifiniti in Photoshop e Illustrator per migliorarne gerarchia visiva e presentazione.',
            work2Step3Title: 'Sviluppo del tour in Marzipano',
            work2Step3Text:
                'I render a 360 gradi sono stati trasformati in un tour web navigabile, con hotspot e transizioni tra scene progettati per una navigazione intuitiva.',
            work2Step4Title: 'Pubblicazione delle pagine degli appartamenti',
            work2Step4Text:
                'Ogni appartamento ha ricevuto una pagina web dedicata, che combina immagini, motion e navigazione immersiva in un’unica presentazione online.',

            work3Title: 'Landing Page per Prodotti Architettonici e Immobiliari',
            work3Text:
                'Landing page orientate alla conversione, progettate per presentare prodotti architettonici, sviluppi residenziali ed esperienze immobiliari immersive con lo stesso linguaggio visivo premium utilizzato nel lavoro 3D. L’obiettivo è trasformare render, video, visualizzatori 3D e informazioni di vendita in una destinazione web chiara, curata, credibile e facile da navigare.',
            work3Role:
                'Direzione creativa, gerarchia visiva, design del layout, presentazione web e integrazione di asset render e showcase 3D.',
            work3BodyTitle: 'Una pagina web che aiuta a visualizzare e a vendere.',
            work3BodyText:
                'Queste pagine sono costruite per tradurre materiale architettonico o immobiliare complesso in una presentazione immediata e premium. Invece di mostrare soltanto render isolati, la landing page struttura il messaggio, rafforza la fiducia e accompagna il visitatore attraverso immagini, benefici e interazione.',
            work3WorkflowTitle: 'Posizionare, strutturare, progettare, pubblicare.',
            work3Step1Title: 'Posizionamento del contenuto',
            work3Step1Text:
                'Offerta, target e visual più forti vengono individuati per primi, così la pagina comunica valore rapidamente invece di sembrare una galleria generica.',
            work3Step2Title: 'Layout e storytelling',
            work3Step2Text:
                'La pagina viene strutturata intorno a gerarchia, ritmo e chiarezza, combinando render, testo e informazioni di prodotto in un flusso di presentazione premium.',
            work3Step3Title: 'Integrazione e consegna',
            work3Step3Text:
                'Video, gallery e materiali interattivi come i visualizzatori 3D possono essere integrati in una landing page responsive finale, pronta per la presentazione o la lead generation.',
            partnersTitle: 'Aziende e studi con cui collaboro.',
            partnersText:
                'Collaborazioni attive in cui visualizzazione, presentazione web e comunicazione del progetto supportano lavori tra real estate, architettura e comunicazione dello spazio.',
            partnerPrimulaMeta:
                'Esperienze immersive, strumenti di presentazione e comunicazione digitale per il real estate.',
            partnerCubicoMeta:
                'Presentazione web, racconto visivo e supporto digitale per progetti, spazi e comunicazione.',

            aboutTitle: 'Formazione in architettura. Un percorso costruito in autonomia.',
            aboutText1:
                'Sono un 3D artist e designer. Il mio interesse per il digitale è iniziato al liceo, tra Java, Scratch e un’esplorazione indipendente degli strumenti Adobe, che ha acceso la mia curiosità per il design.',
            aboutText2:
                'Durante il mio primo anno di Architettura al Politecnico di Torino, un corso di disegno mi ha introdotto a 3ds Max con V-Ray e ha aperto la strada al 3D e alla visualizzazione digitale. Da allora ho sviluppato un percorso in gran parte autodidatta, focalizzato sulla rappresentazione visiva, sui media interattivi e su un ampio insieme di strumenti 3D.',
            aboutText3:
                'Questo percorso mi ha portato a collaborare con Primula Costruzioni, prima attraverso un tirocinio e poi con un’attività professionale incentrata su esperienze immersive per il real estate e sistemi di presentazione.',
            contactTitle: 'Costruiamo lavori che risultino premium, chiari e impossibili da ignorare.'

        }
    };

    function safePlay(video) {
        if (!video || prefersReducedMotion) return;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
        }
    }

    function stopVideo(video) {
        if (!video) return;
        video.pause();
    }

    function setMenuState(isOpen) {
        if (!ui.menuToggle) return;
        body.classList.toggle('menu-open', isOpen);
        ui.menuToggle.setAttribute('aria-expanded', String(isOpen));
    }

    function initMenu() {
        if (!ui.menuToggle) return;

        ui.menuToggle.addEventListener('click', () => {
            const expanded = ui.menuToggle.getAttribute('aria-expanded') === 'true';
            setMenuState(!expanded);
        });

        if (ui.siteNav) {
            const navLinks = ui.siteNav.querySelectorAll('a');
            navLinks.forEach((link) => {
                link.addEventListener('click', () => setMenuState(false));
            });
        }
    }

    function initRevealObserver() {
        if (!ui.revealItems.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            ui.revealItems.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
                rootMargin: '0px 0px -6% 0px'
            }
        );

        ui.revealItems.forEach((item) => observer.observe(item));
    }

    function setProjectIndexPreview(type, src) {
        if (
            !ui.previewContainer ||
            !ui.previewImage ||
            !ui.previewVideo ||
            !ui.previewVideoSource ||
            !src
        ) {
            return;
        }

        if (previewState.type === type && previewState.src === src) {
            return;
        }

        const isVideo = type === 'video';

        ui.previewContainer.classList.toggle('is-image', !isVideo);

        if (isVideo) {
            stopVideo(ui.previewVideo);
            ui.previewVideo.style.opacity = '0';

            const revealAndPlay = () => {
                ui.previewVideo.currentTime = 0;
                ui.previewVideo.style.opacity = '1';
                safePlay(ui.previewVideo);
            };

            if (ui.previewVideoSource.getAttribute('src') !== src) {
                ui.previewVideoSource.setAttribute('src', src);
                ui.previewVideo.addEventListener('loadeddata', revealAndPlay, { once: true });
                ui.previewVideo.load();
            } else {
                revealAndPlay();
            }
        } else {
            if (ui.previewImage.getAttribute('src') !== src) {
                ui.previewImage.setAttribute('src', src);
            }
            ui.previewVideo.style.opacity = '1';
            stopVideo(ui.previewVideo);
        }

        previewState.type = type;
        previewState.src = src;
    }

    function activateIndexItem(item) {
        if (!item) return;

        ui.indexItems.forEach((entry) => entry.classList.remove('is-active'));
        item.classList.add('is-active');

        setProjectIndexPreview(
            item.dataset.previewType || 'image',
            item.dataset.previewSrc || ''
        );
    }

    function initProjectIndex() {
        if (!ui.indexItems.length) return;

        const initialItem =
            ui.indexItems.find((item) => item.classList.contains('is-active')) || ui.indexItems[0];

        activateIndexItem(initialItem);

        ui.indexItems.forEach((item) => {
            const activate = () => activateIndexItem(item);
            item.addEventListener('mouseenter', activate);
            item.addEventListener('focus', activate);
            item.addEventListener('touchstart', activate, { passive: true });
        });
    }

    function clearLightboxStage() {
        if (!ui.lightboxStage) return;

        const activeVideo = ui.lightboxStage.querySelector('video');
        const activeIframe = ui.lightboxStage.querySelector('iframe');

        if (activeVideo) {
            activeVideo.pause();
            activeVideo.removeAttribute('src');
            activeVideo.load();
        }

        if (activeIframe) {
            activeIframe.setAttribute('src', 'about:blank');
        }

        ui.lightboxStage.innerHTML = '';
    }

    function createLightboxMedia(type, src, caption) {
        let mediaNode;

        if (type === 'video') {
            mediaNode = document.createElement('video');
            mediaNode.controls = true;
            mediaNode.loop = true;
            mediaNode.playsInline = true;
            mediaNode.preload = 'metadata';
            mediaNode.src = src;

            if (!prefersReducedMotion) {
                mediaNode.autoplay = true;
            }
        } else if (type === 'tour' || type === 'viewer') {
            mediaNode = document.createElement('iframe');
            mediaNode.src = src;
            mediaNode.loading = 'lazy';
            mediaNode.allow = 'fullscreen';
            mediaNode.title = caption || (type === 'viewer' ? 'Interactive viewer' : 'Interactive tour');
        } else {
            mediaNode = document.createElement('img');
            mediaNode.src = src;
            mediaNode.alt = caption || 'Portfolio media';
            mediaNode.loading = 'eager';
        }

        return mediaNode;
    }

    function updateLightboxNav() {
        if (!ui.lightboxPrev || !ui.lightboxNext) return;

        const showNav = lightboxItems.length > 1;
        ui.lightboxPrev.classList.toggle('is-hidden', !showNav);
        ui.lightboxNext.classList.toggle('is-hidden', !showNav);
    }

    function renderLightboxItem(index) {
        if (!ui.lightboxStage || !ui.lightboxCaption) return;
        if (!lightboxItems.length) return;
        if (index < 0 || index >= lightboxItems.length) return;

        lightboxIndex = index;
        clearLightboxStage();

        const item = lightboxItems[lightboxIndex];
        const mediaNode = createLightboxMedia(item.type, item.src, item.caption);

        ui.lightboxStage.appendChild(mediaNode);
        ui.lightboxCaption.textContent = item.caption || '';

        if (mediaNode.tagName === 'VIDEO') {
            safePlay(mediaNode);
        }

        updateLightboxNav();
    }

    function openLightboxGroup(items, startIndex = 0) {
        if (!ui.lightbox || !items.length) return;

        lightboxItems = items.filter((item) => item.src);

        if (!lightboxItems.length) return;

        renderLightboxItem(startIndex);

        ui.lightbox.classList.add('is-open');
        ui.lightbox.setAttribute('aria-hidden', 'false');
        body.classList.add('lightbox-open');
    }

    function openLightbox(type, src, caption = '') {
        openLightboxGroup([{ type, src, caption }], 0);
    }

    function showPreviousLightboxItem() {
        if (lightboxItems.length <= 1) return;
        const nextIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        renderLightboxItem(nextIndex);
    }

    function showNextLightboxItem() {
        if (lightboxItems.length <= 1) return;
        const nextIndex = (lightboxIndex + 1) % lightboxItems.length;
        renderLightboxItem(nextIndex);
    }

    function closeLightbox() {
        if (!ui.lightbox) return;

        clearLightboxStage();
        ui.lightbox.classList.remove('is-open');
        ui.lightbox.setAttribute('aria-hidden', 'true');

        body.classList.remove('lightbox-open');

        lightboxItems = [];
        lightboxIndex = -1;
    }

    function buildGalleryItems(trigger) {
        const gallery = trigger.closest('.project-gallery');

        if (!gallery) {
            return [
                {
                    type: trigger.dataset.type || 'image',
                    src: trigger.dataset.src || '',
                    caption: trigger.dataset.caption || ''
                }
            ];
        }

        const galleryTriggers = Array.from(gallery.querySelectorAll('.js-open-lightbox'));

        return galleryTriggers.map((item) => ({
            type: item.dataset.type || 'image',
            src: item.dataset.src || '',
            caption: item.dataset.caption || ''
        }));
    }

    function initLightbox() {
        if (!ui.lightboxTriggers.length) return;

        ui.lightboxTriggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();

                const gallery = trigger.closest('.project-gallery');
                const items = buildGalleryItems(trigger);

                if (gallery) {
                    const galleryTriggers = Array.from(gallery.querySelectorAll('.js-open-lightbox'));
                    const startIndex = galleryTriggers.indexOf(trigger);
                    openLightboxGroup(items, startIndex >= 0 ? startIndex : 0);
                    return;
                }

                openLightbox(
                    trigger.dataset.type || 'image',
                    trigger.dataset.src || '',
                    trigger.dataset.caption || ''
                );
            });

            if (trigger.tagName !== 'BUTTON' && trigger.tagName !== 'A') {
                trigger.addEventListener('keydown', (event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    trigger.click();
                });
            }
        });

        if (ui.lightboxClose) {
            ui.lightboxClose.addEventListener('click', closeLightbox);
        }

        if (ui.lightboxPrev) {
            ui.lightboxPrev.addEventListener('click', (event) => {
                event.stopPropagation();
                showPreviousLightboxItem();
            });
        }

        if (ui.lightboxNext) {
            ui.lightboxNext.addEventListener('click', (event) => {
                event.stopPropagation();
                showNextLightboxItem();
            });
        }

        if (ui.lightbox) {
            ui.lightbox.addEventListener('click', (event) => {
                if (event.target === ui.lightbox) {
                    closeLightbox();
                }
            });
        }
    }

    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeLightbox();
                setMenuState(false);
                return;
            }

            if (!ui.lightbox || !ui.lightbox.classList.contains('is-open')) return;

            if (event.key === 'ArrowLeft') {
                showPreviousLightboxItem();
            }

            if (event.key === 'ArrowRight') {
                showNextLightboxItem();
            }
        });
    }

    function applyLanguage(lang) {
        const dict = translations[lang];
        if (!dict) return;

        document.documentElement.lang = lang;
        currentLang = lang;

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.dataset.i18n;
            if (!dict[key]) return;
            el.innerHTML = dict[key];
        });

        document.querySelectorAll('[data-caption-en][data-caption-it]').forEach((el) => {
            el.dataset.caption = lang === 'it' ? el.dataset.captionIt : el.dataset.captionEn;
        });

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && dict.metaDescription) {
            metaDescription.setAttribute('content', dict.metaDescription);
        }

        if (dict.pageTitle) {
            document.title = dict.pageTitle;
        }

        if (ui.langToggle) {
            ui.langToggle.textContent = lang === 'en' ? 'IT' : 'EN';
            ui.langToggle.setAttribute(
                'aria-label',
                lang === 'en' ? 'Switch language to Italian' : 'Passa alla lingua inglese'
            );
        }

        localStorage.setItem('site-language', lang);

        if (ui.lightbox && ui.lightbox.classList.contains('is-open') && lightboxItems.length) {
            const triggerElements = Array.from(document.querySelectorAll('.js-open-lightbox'));
            const openTrigger = triggerElements[lightboxIndex];
            if (openTrigger && openTrigger.dataset.caption) {
                ui.lightboxCaption.textContent = openTrigger.dataset.caption;
            }
        }
    }

    function initLanguageToggle() {
        if (!ui.langToggle) return;

        applyLanguage(currentLang);

        ui.langToggle.addEventListener('click', () => {
            const nextLang = currentLang === 'en' ? 'it' : 'en';
            applyLanguage(nextLang);
        });
    }

    function init() {
        initMenu();
        initRevealObserver();
        initProjectIndex();
        initLightbox();
        initKeyboardShortcuts();
        initLanguageToggle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
