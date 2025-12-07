(() => {
    // helpers
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
    // Global state for separate modals
    let projectItems = [];
    let certItems = [];
    let currentProjectIndex = -1;
    let currentCertIndex = -1;
    // sanitize text - remove raw markdown-like bold/strike/underscore markers
    function sanitizeText(str) {
        if (!str) return '';
        return String(str)
            .replace(/\*\*/g, '')    // remove double-star bold markers
            .replace(/__+/g, '')     // remove double-underscore
            .replace(/~~+/g, '')     // remove strikethrough markers
            .replace(/`+/g, '');     // remove backticks
    }
    // 1. Collect all modal content items on load into separate arrays
    function collectModalItems() {
        projectItems = [];
        certItems = [];
        // Collect project items (from both main grid and hidden 'extra' container)
        $$('#projectsGrid .card-project, #projects .extra .card-project').forEach((card) => {
            const title = sanitizeText(card.querySelector('h4').textContent);
            const meta = sanitizeText(card.querySelector('.meta div').textContent);
            const description = sanitizeText(card.querySelector('p').textContent);
            let detailDesc = '';
            switch (title) {
                case "IBM Cybersecurity Analyst":
                    detailDesc = "I am currently progressing through the **IBM Cybersecurity Analyst** program, developing skills in **threat detection**, **security operations (SOC)**, **incident response**, and foundational **cyber defense strategies**.";
                    break;

                case "PyTorch":
                    detailDesc = "I am currently mastering **PyTorch**, focusing on the development and training of **neural networks**, effective manipulation of **tensors**, and establishing streamlined **deep learning workflows**.";
                    break;

                case 'CompTIA A+ 220-1201':
                    detailDesc = "I am undertaking the **CompTIA A+ 220-1201** certification preparation, which involves comprehensive study of **PC hardware**, **operating systems**, **IT troubleshooting**, foundational **networking**, and core **IT support principles**.";
                    break;

                case "Data Visualization in Python":
                    detailDesc = "I successfully completed training in **Python data visualization** using **Matplotlib**, **Seaborn**, and **Plotly Express**. This skill enables me to create powerful **statistical**, **analytical**, and **interactive plots** for data interpretation.";
                    break;

                case 'Excel Macros & VBA – Simplilearn':
                    detailDesc = "I finished the Simplilearn course on **Excel Macros & VBA**, gaining proficiency in **macro automation**, **VBA scripting**, developing custom functions, and optimizing operational workflows within Excel.";
                    break;

                case 'Physics Olympiad 2026':
                    detailDesc = "My preparation for the **Physics Olympiad 2026** centered on advanced topics, including **electromagnetism**, **classical mechanics**, **relativity**, **quantum mechanics**, **thermodynamics**, and the physics of waves and oscillations.";
                    break;

                case 'Chemistry Olympiad 2026 Preparation':
                    detailDesc = "Preparation for the **Chemistry Olympiad 2026** involved intensive study across **organic chemistry** (stereochemistry), **inorganic chemistry** (salts), and core **physical chemistry** principles (gas laws).";
                    break;

                case 'IBM AI Fundamentals':
                    detailDesc = "I completed the **IBM Artificial Intelligence Fundamentals** course, establishing a strong understanding of **AI concepts**, **machine learning basics**, **neural networks**, and practical **AI application development**.";
                    break;

                case "CS50 R – Introduction to Programming with R":
                    detailDesc = "I completed **CS50's Introduction to Programming with R**, building fundamental **programming skills**, mastering **R syntax**, and focusing on **data manipulation** and impactful **data visualization** techniques.";
                    break;

                case "CS50SQL – Introduction to Databases":
                    detailDesc = "I successfully completed **CS50SQL**, gaining practical expertise in **SQL** and the management of **relational databases**, with a focus on implementing efficient and complex queries.";
                    break;

                case "Yale Financial Markets":
                    detailDesc = "I completed Yale's esteemed **Financial Markets** course, acquiring a foundational understanding of finance, various **investment instruments**, and the operational mechanics of global **financial markets**.";
                    break;

                case "Data Fundamentals – IBM SkillsBuild":
                    detailDesc = "I completed the **IBM SkillsBuild Data Fundamentals** training, learning essential techniques for **data analysis**, effective **data management**, and professional **data handling** practices.";
                    break;

                case "Google Developer ML Foundations":
                    detailDesc = "I finished the **Google Developer ML Foundations** training, establishing proficiency in core **machine learning concepts**, various **algorithms**, and basic **model implementation**.";
                    break;

                case "Prompt Engineering – Learn Prompting":
                    detailDesc = "I completed the **Learn Prompting** course, specializing in designing effective strategies for **AI prompts** to optimize interactions and outputs from large language models.";
                    break;

                case "OSINT – Basel Institute on Governance":
                    detailDesc = "I developed skills in **advanced OSINT (Open-Source Intelligence)** strategies, including deep investigative research, precise data tracing, and professional intelligence workflows.";
                    break;

                case "Introduction to OSINT – Security Blue Team":
                    detailDesc = "I explored the foundational aspects of **OSINT**, covering essential tools, digital **footprinting**, proper reporting, **data gathering**, and **anonymization techniques** for secure investigations.";
                    break;

                case "Machine Learning Crash Course":
                    detailDesc = "I completed the **Google MLCC**, gaining practical ML knowledge using **TensorFlow**, reinforced by hands-on exercises and a clear grasp of core machine learning concepts.";
                    break;

                case "AI Sketch Predictor":
                    detailDesc = "I engineered the **AI Sketch Predictor**, a neural-network powered application capable of accurately identifying and predicting user-drawn sketches in real-time.";
                    break;

                case "Gestura – Concept & Plan Phase":
                    detailDesc = "I led the initial concept and planning phase for **Gestura**, a smart ring designed to translate specific hand **gestures into speech** using integrated sensors and machine learning.";
                    break;

                case "Bundeswettbewerb Mathematik":
                    detailDesc = "I participated in the **German National Mathematics Competition**, solving complex mathematical problems that required rigorous proofs, advanced logic, and creative application of theory.";
                    break;

                case "CS50p – Introduction to Python":
                    detailDesc = "I completed **CS50p**, which provided a strong foundation in **Python programming**, focusing on project-based learning, problem-solving, and structured software development concepts.";
                    break;

                case "Bundeswettbewerb Informatik":
                    detailDesc = "I participated in the **German National Informatics Competition**, successfully tackling advanced **algorithmic challenges** and optimizing solutions for efficiency.";
                    break;

                case "CS50x – Introduction to Computer Science":
                    detailDesc = "I completed the highly foundational **CS50x** course, establishing core knowledge in **C programming**, **algorithms**, **data structures**, and overall computer science principles.";
                    break;

                case "Physics & Chemistry Olympiad 2025":
                    detailDesc = "I prepared for both Olympiads simultaneously, studying advanced topics across **mechanics**, **electromagnetism**, **organic chemistry** (stereochemistry), **gas laws**, and **thermodynamics**.";
                    break;

                case "Physics Olympiad 2025 – 1st Round":
                    detailDesc = "I completed preparation for the first round of the **Physics Olympiad**, successfully solving problems in **mechanics**, **electromagnetism**, **thermodynamics**, **relativity**, and **quantum physics**.";
                    break;

                case "Chemistry Olympiad 2025 – 1st & 2nd Round":
                    detailDesc = "I prepared for the first and second rounds of the **Chemistry Olympiad**, focusing on **organic chemistry** (stereochemistry), **inorganic chemistry** (salts & reactions), and **physical chemistry** (gas laws & thermodynamics).";
                    break;

                case "Statsmodels Models":
                    detailDesc = "I gained competence in building and interpreting **regression models** using Python's **statsmodels** library, mastering **model fitting**, **statistical tests**, and evaluating detailed regression outputs.";
                    break;

                case 'Linux Fundamentals':
                    detailDesc = "I am currently acquiring expertise in **Linux fundamentals**, including **shell navigation**, managing **file permissions**, utilizing **package managers**, handling **processes**, and essential **system administration tools**.";
                    break;

                case 'Data Visualizer App':
                    detailDesc = "I developed an **interactive data visualization app** using **Kivy**. It offers users the ability to plot and customize graphs—similar to those from matplotlib, seaborn, and Plotly—with dynamic control over charts and datasets.";
                    break;

                case 'Arduino Laser Engraver':
                    detailDesc = "I successfully completed an **Arduino-based laser engraving project**. This system allows users to upload designs via a companion app and execute precise engravings on wooden surfaces.";
                    break;

                case 'Harvard PH125.x':
                    detailDesc = "I completed the rigorous **Harvard PH125.x** course, which covered statistical analysis, **machine learning**, **R programming**, and data visualization, culminating in a capstone project. This experience provided practical proficiency in end-to-end data analysis workflows.";
                    break;

                case 'Gestura – Concept & Plan Phase':
                    detailDesc = 'This was the initial concept and planning phase for the smart rings project, focusing on identifying core technologies and a feasibility roadmap.';
                    break;

                case 'Portfolio Website':
                    detailDesc = 'The goal for this project is a fast, responsive, and accessible single-page application built with minimal frameworks to ensure high performance.';
                    break;

                case 'ML Tutor':
                    detailDesc = 'This is a concept for an interactive web application designed to use simple visualizations to demystify complex ML concepts like backpropagation and gradient descent for educational purposes.';
                    break;

                case 'Reading: A First Course in General Relativity by Bernard F. Schutz':
                    detailDesc = 'I am engaged in a detailed study of the fundamental mathematics of **General Relativity** from this seminal text, concentrating on **tensors**, the concept of **curved spacetime**, and the **Einstein field equations**.';
                    break;

                case 'Personal Retro Arcade Website':
                    detailDesc = 'I am currently developing a web-based platform that features classic arcade-style games, utilizing **HTML5 Canvas** and **JavaScript** for a fully functional, browser-based experience.';
                    break;

                default:
                    detailDesc = 'Detailed description, goals and links can go here.';
            }
            projectItems.push({
                type: 'project',
                title: sanitizeText(title),
                org: sanitizeText(meta),
                desc: sanitizeText(description),
                details: sanitizeText(detailDesc)
            });
        });
        // Collect certificate items (from Achievements grid)
        $$('#achievements .blog-grid .card').forEach((card) => {
            const title = sanitizeText(card.querySelector('h4').textContent);
            const org = sanitizeText(card.querySelector('div').textContent);
            const desc = sanitizeText(card.querySelector('p').textContent);
            const certImgUrl = card.querySelector('.openCert').getAttribute('data-cert-img');
            certItems.push({
                type: 'cert',
                title: title,
                org: org,
                desc: desc,
                certImgUrl: certImgUrl
            });
        });
    }
    // render helpers for each modal
    const modalProject = document.getElementById('modalProject');
    const modalContentProject = document.getElementById('modalContentProject');
    const modalNavProject = document.getElementById('modalNavProject');
    const modalCert = document.getElementById('modalCert');
    const modalContentCert = document.getElementById('modalContentCert');
    const modalNavCert = document.getElementById('modalNavCert');
    function closeAllModals() {
        [modalProject, modalCert].forEach(m => {
            if (!m) return;
            m.classList.remove('open');
            m.style.display = 'none';
        });
        // reset indices
        currentProjectIndex = -1;
        currentCertIndex = -1;
    }
    function showProjectContent(index) {
        if (index < 0 || index >= projectItems.length) return;
        currentProjectIndex = index;
        const item = projectItems[index];
        let content = `
<h3 style="margin:0 0 12px; font-size:24px;">${sanitizeText(item.title)}</h3>
<p style="color:var(--muted); margin:0 0 12px; font-size:14px;">${sanitizeText(item.org)}</p>
<p style="color:var(--muted); margin:0 0 12px; font-size:14px;"><span style="font-weight:700;">Summary:</span> ${sanitizeText(item.desc)}</p>
<p style="color:var(--muted); margin:0 0 12px;"><span style="font-weight:700;">Details:</span> ${sanitizeText(item.details)}</p>
`;
        modalContentProject.innerHTML = content;
        modalNavProject.style.display = projectItems.length > 1 ? 'flex' : 'none';
        modalContentProject.parentElement.scrollTo(0, 0);
    }
    function showCertContent(index) {
        if (index < 0 || index >= certItems.length) return;
        currentCertIndex = index;
        const item = certItems[index];
        let content = `
<h3 style="margin:0 0 12px; font-size:24px;">${sanitizeText(item.title)}</h3>
<p style="color:var(--muted); margin:0 0 8px; font-size:14px;">${sanitizeText(item.org)}</p>
<p style="color:var(--muted); margin:0;">${sanitizeText(item.desc)}</p>
`;
        if (item.certImgUrl) {
            content += `
<div class="certificate-viewer" style="clear:both; margin-top:12px;">
	<img src="${item.certImgUrl}" alt="${sanitizeText(item.title)} Certificate" loading="lazy">
</div>
`;
        }
        modalContentCert.innerHTML = content;
        modalNavCert.style.display = certItems.length > 1 ? 'flex' : 'none';
        modalContentCert.parentElement.scrollTo(0, 0);
    }
    function navigateProject(direction) {
        let ni = currentProjectIndex + direction;
        if (ni < 0) ni = projectItems.length - 1;
        if (ni >= projectItems.length) ni = 0;
        showProjectContent(ni);
    }
    function navigateCert(direction) {
        let ni = currentCertIndex + direction;
        if (ni < 0) ni = certItems.length - 1;
        if (ni >= certItems.length) ni = 0;
        showCertContent(ni);
    }
    // open/close handlers
    document.getElementById('prevBtnProject').addEventListener('click', () => navigateProject(-1));
    document.getElementById('nextBtnProject').addEventListener('click', () => navigateProject(1));
    document.getElementById('prevBtnCert').addEventListener('click', () => navigateCert(-1));
    document.getElementById('nextBtnCert').addEventListener('click', () => navigateCert(1));
    document.getElementById('closeModalProject').addEventListener('click', () => {
        modalProject.classList.remove('open');
        setTimeout(() => modalProject.style.display = 'none', 300);
    });
    document.getElementById('closeModalCert').addEventListener('click', () => {
        modalCert.classList.remove('open');
        setTimeout(() => modalCert.style.display = 'none', 300);
    });
    // Modal open handler for projects (updated)
    $$('.openProj').forEach((b) => b.addEventListener('click', ev => {
        const card = b.closest('.card-project');
        if (!card) return;
        const title = sanitizeText(card.querySelector('h4').textContent);
        const globalIndex = projectItems.findIndex(item => sanitizeText(item.title) === title && item.type === 'project');
        if (globalIndex === -1) return;
        // ensure only one modal is visible
        closeAllModals();
        showProjectContent(globalIndex);
        modalProject.style.display = 'flex';
        setTimeout(() => modalProject.classList.add('open'), 10);
    }));
    // Modal open handler for certs (updated)
    $$('.openCert').forEach((b) => b.addEventListener('click', ev => {
        const card = b.closest('.card');
        if (!card) return;
        const title = sanitizeText(card.querySelector('h4').textContent);
        const globalIndex = certItems.findIndex(item => sanitizeText(item.title) === title && item.type === 'cert');
        if (globalIndex === -1) return;
        // ensure only one modal is visible
        closeAllModals();
        showCertContent(globalIndex);
        modalCert.style.display = 'flex';
        setTimeout(() => modalCert.classList.add('open'), 10);
    }));
    // INITIALIZATION: Collect items after DOM ready
    collectModalItems();
    // --- rest of your existing script remains unchanged ---
    // Navbar background on scroll
    const nav = document.getElementById('topNav');
    const scroller = () => {
        if (window.scrollY > 40) nav.classList.remove('transparent'), nav.classList.add('solid');
        else nav.classList.remove('solid'), nav.classList.add('transparent');
    };
    scroller(); window.addEventListener('scroll', scroller);
    // Hamburger toggle
    const hamburger = $('#hamburger');
    const navLinks = $('#navLinks');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    // Dynamic typing effect (simple)
    const taglineEl = document.getElementById('dynamicTagline');
    const phrases = ["I explore,", "I code,", "I innovate."];
    let pi = 0, ci = 0, dir = 1;
    function tick() {
        const p = phrases[pi];
        taglineEl.textContent = p.slice(0, ci);
        ci += dir;
        if (ci > p.length) { dir = -1; setTimeout(tick, 1200); return }
        if (ci < 0) { dir = 1; pi = (pi + 1) % phrases.length; ci = 0 }
        setTimeout(tick, 40);
    }
    tick();
    // Parallax simple movement based on mouse
    const par = document.getElementById('parallaxLayer');
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        if (par) par.style.transform = `translate(${x}px,${y}px)`;
    });
    $$('.shape').forEach(s => {
        s.addEventListener('mouseover', () => {
            s.style.transform = `scale(1.05) rotate(${Math.random() * 10 - 5}deg)`;
        });
        s.addEventListener('mouseout', () => {
            s.style.transform = '';
        });
    });
    // Timeline reveal
    const tlItems = $$('#timeline .tl-item');
    const io = new IntersectionObserver(entries => {
        for (const en of entries) {
            if (en.isIntersecting) en.target.classList.add('visible');
        }
    }, { threshold: 0.2 });
    tlItems.forEach(i => io.observe(i));
    // close original modal button references removed - old modal not used anymore
    // counters (Changed threshold for snappier animation)
    const counters = $$('.counter');
    const cIO = new IntersectionObserver(entries => {
        for (const e of entries) if (e.isIntersecting) {
            const el = e.target; const tgt = parseInt(el.getAttribute('data-target') || '0', 10);
            let v = 0; const step = Math.max(1, Math.floor(tgt / 60));
            const id = setInterval(() => { v += step; if (v >= tgt) { el.textContent = String(tgt); clearInterval(id) } else el.textContent = String(v) }, 20);
            cIO.unobserve(el);
        }
    }, { threshold: 0.2 }); // Adjusted threshold to make the counter start earlier
    counters.forEach(c => cIO.observe(c));
    // progress visuals (Added subtle growth animation)
    $$('.prog [data-progress]').forEach(el => {
        const p = parseInt(el.getAttribute('data-progress') || '0', 10);
        el.style.fontVariantNumeric = 'tabular-nums';
        el.textContent = '0%'; let cur = 0; const int = setInterval(() => { cur += 1; if (cur >= p) { el.textContent = p + "%"; clearInterval(int) } else el.textContent = cur + "%" }, 20); // Faster increment
    });
    // contact handler (functional mailto)
    document.getElementById('contactForm').addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;
        // Construct the mailto link
        const subject = encodeURIComponent(`Contact from portfolio by ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:nagpal@gmail.com?subject=${subject}&body=${body}`;
        // Open the email client
        window.location.href = mailtoLink;
        // Provide user feedback
        showToast('Your default email client should now open with the message drafted.');
        form.reset();
    });
    // footer year
    document.getElementById('year').textContent = new Date().getFullYear();
    // ENHANCEMENT: Enhanced Entrance Animations for visual appeal
    document.querySelectorAll('.card, .card-project, section h2').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.98)'; // Start slightly lower and smaller
        setTimeout(() => {
            // Use a better cubic-bezier for a snappier feel
            el.style.transition = 'opacity 650ms cubic-bezier(.2,.9,.3,1), transform 650ms cubic-bezier(.2,.9,.3,1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
        }, i * 70); // Slightly faster staggering
    });
    // section reveal
    const sections = $$('section');
    const secIO = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) en.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    sections.forEach(s => secIO.observe(s));
    // Initial collection of all content for navigation
    // (already called above)
})();
// --- Enhanced dynamic Projects filter + Read More ---
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const projectsGrid = document.querySelector("#projectsGrid");
    const allCards = Array.from(document.querySelectorAll(".card-project"));
    let readMoreBtn = document.createElement("button");
    let showingExtra = false;
    function renderProjects(filter = "all") {
        const filtered =
            filter === "all"
                ? allCards
                : allCards.filter((c) => c.dataset.type === filter);
        filtered.forEach((card, i) => {
            projectsGrid.appendChild(card);
        });
    }
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            showingExtra = false;
            renderProjects(tab.dataset.filter);
        });
    });
    renderProjects();
});

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll("#projectTabs .tab");
    const cards = document.querySelectorAll(".blog-grid .card");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const filter = tab.getAttribute("data-filter");

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            cards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filter === "all" || filter === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});


// --- Enhanced Read More with exact count for Projects, Achievements, Blog ---
document.addEventListener("DOMContentLoaded", () => {
    const CARD_PER_ROW = 3; // Assuming a 3-column grid layout
    const INITIAL_LIMIT = 2 * CARD_PER_ROW; // 2 rows * 3 cards = 6 items
    // =======================================================
    // 1. Projects Section (Filtering + Read More with Count)
    // =======================================================
    const tabs = document.querySelectorAll("#projectTabs .tab");
    const projectsGrid = document.querySelector("#projectsGrid");
    if (projectsGrid) {
        // Find all cards initially
        const allCards = Array.from(projectsGrid.querySelectorAll(".card-project"));
        let readMoreBtn = document.createElement("button");
        readMoreBtn.className = "read-more";
        // Append button only once
        projectsGrid.after(readMoreBtn);
        let showingExtra = false;
        let currentFilter = "all";
        function renderProjects() {
            let filteredCards = [];
            // 1. Apply filter
            allCards.forEach(card => {
                const matchesFilter = (currentFilter === "all" || card.dataset.type === currentFilter);
                card.style.display = "none"; // Hide all first
                if (matchesFilter) {
                    filteredCards.push(card);
                }
            });
            // 2. Apply "Read More" logic & visibility
            const totalFiltered = filteredCards.length;
            const hiddenCount = totalFiltered - INITIAL_LIMIT;
            filteredCards.forEach((card, i) => {
                // Show up to the limit OR show all if 'showingExtra' is true
                card.style.display = i < INITIAL_LIMIT || showingExtra ? "block" : "none";
            });
            // 3. Update button visibility and text
            if (totalFiltered > INITIAL_LIMIT) {
                readMoreBtn.style.display = "block";
                if (showingExtra) {
                    readMoreBtn.textContent = "View Less";
                } else {
                    // Display the exact count of hidden items
                    readMoreBtn.textContent = `Show ${hiddenCount} More`;
                }
            } else {
                readMoreBtn.style.display = "none";
            }
        }
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                tabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");
                showingExtra = false;
                currentFilter = tab.dataset.filter;
                renderProjects();
            });
        });
        readMoreBtn.addEventListener("click", () => {
            const isCollapsing = showingExtra;
            showingExtra = !showingExtra;
            renderProjects();
            if (isCollapsing) {
                readMoreBtn.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
        renderProjects(); // Initial render
    }
    // =======================================================
    // 2. Generic Read More for Achievements and Blog (with Count)
    // =======================================================
    const setupReadMore = (sectionId, gridSelector, itemSelector) => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const grid = section.querySelector(gridSelector);
        if (!grid) return;
        const allCards = Array.from(grid.querySelectorAll(itemSelector));
        const totalItems = allCards.length;
        const hiddenCount = totalItems - 8;
        if (totalItems <= INITIAL_LIMIT) {
            return; // No button needed
        }
        let readMoreBtn = document.createElement("button");
        readMoreBtn.className = "read-more";
        grid.after(readMoreBtn); // Insert button after the grid
        let showingExtra = false;
        function renderItems() {
            // Toggle visibility for items beyond the initial limit
            allCards.forEach((card, i) => {
                card.style.display = i < 8 || showingExtra ? "block" : "none";
            });
            if (showingExtra) {
                readMoreBtn.textContent = "View Less";
            } else {
                // Display the exact count of hidden items
                readMoreBtn.textContent = `Show ${hiddenCount} More`;
            }
        }
        readMoreBtn.addEventListener("click", () => {
            const isCollapsing = showingExtra;
            showingExtra = !showingExtra;
            renderItems();
            if (isCollapsing) {
                readMoreBtn.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
        renderItems(); // Initial render
    };
    // Setup for Achievements (ID: achievements)
    setupReadMore("achievements", ".blog-grid", ".card");
    // Setup for Blog/Personal Updates (ID: blog)
    setupReadMore("blog", ".blog-grid", ".card");
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
    var frm = this;
    setTimeout(function () {
        frm.style.display = "none";
        document.getElementById("formResponse").style.display = "block";
    }, 500);
});

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        // update nav background or other scroll triggered logic
    });
});
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Your scroll-related logic here (e.g., navbar background)
            ticking = false;
        });
        ticking = true;
    }
});


// Inside your setupReadMore or equivalent logic, after toggling "showingExtra"
allCards.forEach((card, i) => {
    if (i >= 8) {
        card.classList.toggle('expanded', showingExtra);
        card.style.display = (i < 8 || showingExtra) ? "block" : "none";
    }
});
card.style.opacity = 0;
setTimeout(() => {
    card.style.display = showingExtra ? "block" : "none";
    card.style.opacity = 1;
}, 180); // 180ms matches the CSS transition duration


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log('Service worker registered.', reg);
            })
            .catch(err => {
                console.error('Service worker registration failed:', err);
            });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".openCert");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const imgSrc = btn.getAttribute("data-cert-img");

            // Check if the image is already loaded
            if (!btn.dataset.loaded) {
                const img = new Image();
                img.src = imgSrc;
                img.onload = () => {
                    btn.dataset.loaded = "true";
                    // Open image in new tab or modal
                    window.open(imgSrc, "_blank");
                };
            } else {
                // If already loaded, open immediately
                window.open(imgSrc, "_blank");
            }
        });
    });

    // Optional: Preload images in the background for faster access
    buttons.forEach(btn => {
        const img = new Image();
        img.src = btn.getAttribute("data-cert-img");
    });
});