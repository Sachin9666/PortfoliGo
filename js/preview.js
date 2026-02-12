document.addEventListener('DOMContentLoaded', () => {
    const renderArea = document.getElementById('portfolio-render-area');
    const data = Storage.load();

    if (!data) {
        renderArea.innerHTML = '<div class="error">No data found. Please <a href="index.html">fill out the form</a> first.</div>';
        return;
    }

    window.currentData = data;
    window.renderPortfolio = renderPortfolio;
    renderPortfolio(data.template || 'glass');
});

function renderPortfolio(templateName) {
    const data = window.currentData;
    const renderArea = document.getElementById('portfolio-render-area');
    if (!renderArea) return;

    renderArea.className = `portfolio-container tpl-${templateName}`;

    const templates = {
        'glass': renderGlassTemplate,
        'executive': renderExecutiveTemplate,
        'motion': renderMotionTemplate
    };

    const renderFunc = templates[templateName] || renderGlassTemplate;
    renderArea.innerHTML = renderFunc(data);

    // Trigger any template-specific scripts
    if (templateName === 'motion') {
        initMotionScripts();
    }
}

// --- TEMPLATE 1: GLASSMORPHISM ---
function renderGlassTemplate(data) {
    return `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
            
            .glass-theme {
                --accent: #00f2ff;
                --primary: #7000ff;
                --bg: #030014;
                --text: #ffffff;
                --glass-border: rgba(255, 255, 255, 0.1);
                --glass-bg: rgba(255, 255, 255, 0.03);
                font-family: 'Plus Jakarta Sans', sans-serif;
                background-color: var(--bg);
                color: var(--text);
                min-height: 100vh;
                position: relative;
                overflow-x: hidden;
                scroll-behavior: smooth;
            }

            .glass-bg-mesh {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: 
                    radial-gradient(circle at 15% 50%, rgba(112, 0, 255, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 85% 30%, rgba(0, 242, 255, 0.15) 0%, transparent 40%);
                z-index: 0;
            }

            .glass-orb {
                position: fixed;
                border-radius: 50%;
                filter: blur(80px);
                z-index: 0;
                animation: orbFloat 20s infinite alternate;
            }

            @keyframes orbFloat {
                0% { transform: translate(0, 0); }
                100% { transform: translate(30px, 50px); }
            }

            .glass-container {
                position: relative;
                z-index: 1;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            .glass-card {
                background: var(--glass-bg);
                backdrop-filter: blur(16px); /* Increased blur */
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid var(--glass-border);
                border-radius: 24px;
                padding: 2.5rem;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
            }

            .glass-card::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                opacity: 0;
                transition: opacity 0.4s;
            }

            .glass-card:hover {
                background: rgba(255, 255, 255, 0.07);
                border-color: rgba(255, 255, 255, 0.25);
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 242, 255, 0.1);
            }

            .glass-card:hover::before { opacity: 1; }

            .neon-btn {
                background: transparent;
                border: 1px solid var(--accent);
                color: var(--accent);
                padding: 0.8rem 2rem;
                border-radius: 50px;
                font-weight: 700;
                text-decoration: none;
                transition: 0.3s;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }

            .neon-btn::after {
                content: '';
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: var(--accent);
                opacity: 0;
                z-index: -1;
                transition: opacity 0.3s;
            }

            .neon-btn:hover {
                color: var(--bg);
                box-shadow: 0 0 20px var(--accent);
            }
            .neon-btn:hover::after { opacity: 1; }

            .neon-btn.primary {
                background: var(--primary);
                border-color: var(--primary);
                color: #fff;
            }
            .neon-btn.primary::after { background: #fff; }
            .neon-btn.primary:hover { color: var(--primary); box-shadow: 0 0 30px var(--primary); }

            .hero-glass {
                min-height: 90vh;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 4rem;
                padding: 4rem 0;
            }

            .hero-text h1 {
                font-size: clamp(3rem, 7vw, 5rem);
                font-weight: 800;
                line-height: 1.1;
                margin-bottom: 1.5rem;
                background: linear-gradient(135deg, #fff 0%, var(--accent) 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0 0 20px rgba(0, 242, 255, 0.3));
            }

            .glass-3d-img-container {
                perspective: 1000px;
                width: 400px;
                height: 400px;
            }

            .glass-3d-img {
                width: 100%;
                height: 100%;
                border-radius: 40px;
                position: relative;
                transform-style: preserve-3d;
                transition: transform 0.1s;
                animation: heroFloat 6s ease-in-out infinite;
            }
            
            @keyframes heroFloat {
                0%, 100% { transform: translateY(0) rotateX(0deg); }
                50% { transform: translateY(-20px) rotateX(2deg); }
            }

            .glass-3d-img img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 40px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                border: 1px solid rgba(255,255,255,0.1);
            }

            .glass-3d-img::before {
                content: '';
                position: absolute;
                inset: -20px;
                border: 2px solid var(--primary);
                border-radius: 50px;
                transform: translateZ(-50px);
                opacity: 0.5;
            }

            .badge {
                padding: 0.5rem 1.2rem;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                color: var(--accent);
                box-shadow: 0 0 10px rgba(0, 242, 255, 0.1);
            }

            .timeline {
                position: relative;
                padding-left: 2rem;
            }
            
            .timeline::before {
                content: '';
                position: absolute;
                left: 0; top: 0; bottom: 0;
                width: 2px;
                background: linear-gradient(to bottom, var(--primary), var(--accent), transparent);
            }

            .timeline-item {
                position: relative;
                padding-bottom: 3rem;
                padding-left: 2rem;
            }

            .timeline-node {
                position: absolute;
                left: -2.6rem;
                top: 0;
                width: 1.2rem;
                height: 1.2rem;
                background: var(--bg);
                border: 2px solid var(--accent);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--accent);
            }

            .skill-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 1.5rem;
            }

            .skill-card {
                text-align: center;
                padding: 2rem 1.5rem;
            }

            .skill-card i {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                background: linear-gradient(to bottom, #fff, var(--accent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .project-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2.5rem;
            }
            
            .cert-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
            }

            .cert-card {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .cert-icon {
                font-size: 2rem;
                color: var(--primary);
                padding: 0.8rem;
                background: rgba(112, 0, 255, 0.1);
                border-radius: 12px;
            }

            .glass-nav {
                position: sticky;
                top: 1rem;
                width: 90%;
                max-width: 1200px;
                margin: 0 auto;
                z-index: 1000;
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(3, 0, 20, 0.6);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 100px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }

            .glass-nav .nav-logo {
                font-size: 1.5rem;
                font-weight: 800;
                letter-spacing: 1px;
                color: #fff;
                text-shadow: 0 0 10px rgba(255,255,255,0.5);
            }

            .glass-nav .nav-links {
                display: flex;
                gap: 2rem;
            }

            .glass-nav .nav-links a {
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: 0.3s;
                position: relative;
            }

            .glass-nav .nav-links a::after {
                content: '';
                position: absolute;
                bottom: -5px; left: 0; width: 0; height: 2px;
                background: var(--accent);
                transition:width 0.3s;
                box-shadow: 0 0 10px var(--accent);
            }

            .glass-nav .nav-links a:hover { color: #fff; }
            .glass-nav .nav-links a:hover::after { width: 100%; }

            .glass-footer {
                margin-top: 6rem;
                padding: 4rem 0;
                border-top: 1px solid rgba(255,255,255,0.05);
                text-align: center;
                background: linear-gradient(to top, rgba(112,0,255,0.1), transparent);
            }

            @media (max-width: 992px) {
                .hero-glass { flex-direction: column; text-align: center; justify-content: center; padding-top: 8rem; }
                .hero-img-container { order: -1; margin-bottom: 2rem; }
                .glass-nav { width: 95%; padding: 1rem; top: 0.5rem; }
                .glass-nav .nav-links { display: none; }
            }
        </style>

        <div class="glass-theme">
            <div class="glass-bg-mesh"></div>
            <div class="glass-orb" style="top: 20%; left: 20%; width: 300px; height: 300px; background: rgba(112,0,255,0.15);"></div>
            <div class="glass-orb" style="bottom: 20%; right: 20%; width: 400px; height: 400px; background: rgba(0,242,255,0.1); animation-delay: -5s;"></div>

            <!-- Navbar -->
            <nav class="glass-nav">
                <div class="nav-logo">
                    <i class="fas fa-cube" style="color: var(--accent); margin-right: 0.5rem;"></i>${data.personal.name}
                </div>
                <div class="nav-links">
                    <a href="#about">About</a>
                    <a href="#experience">Experience</a>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Work</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
            
            <div class="glass-container">
                <section class="hero-glass" id="about">
                    <div class="hero-text">
                        <div class="badge" style="margin-bottom: 2rem; display: inline-block;">
                            <i class="fas fa-circle" style="font-size: 0.6rem; margin-right: 0.5rem; color: #0f0;"></i> 
                            Available for hire
                        </div>
                        <h1>Hello, I'm <br>${data.personal.name}</h1>
                        <p style="font-size: 1.5rem; opacity: 0.8; margin-bottom: 3rem; max-width: 600px; line-height: 1.6;">
                            <span style="color: var(--accent); font-weight: 700;">${data.personal.title}</span> — specializing in high-performance web applications and immersive digital experiences.
                        </p>
                        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
                            <a href="#contact" class="neon-btn primary">Hire Me Now <i class="fas fa-arrow-right"></i></a>
                            <a href="#projects" class="neon-btn">View Projects <i class="fas fa-code"></i></a>
                        </div>
                        <div style="margin-top: 3rem; display: flex; gap: 1.5rem; font-size: 1.5rem; opacity: 0.7;">
                            ${data.social.github ? `<a href="${data.social.github}" target="_blank" style="color: inherit; transition: 0.3s; hover: color: var(--accent);"><i class="fab fa-github"></i></a>` : ''}
                            ${data.social.linkedin ? `<a href="${data.social.linkedin}" target="_blank" style="color: inherit; transition: 0.3s; hover: color: var(--primary);"><i class="fab fa-linkedin"></i></a>` : ''}
                            ${data.social.twitter ? `<a href="${data.social.twitter}" target="_blank" style="color: inherit; transition: 0.3s; hover: color: var(--accent);"><i class="fab fa-twitter"></i></a>` : ''}
                        </div>
                    </div>
                    <div class="glass-3d-img-container">
                        <div class="glass-3d-img">
                            <img src="${data.personal.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.personal.name}`}" alt="Profile">
                        </div>
                    </div>
                </section>

                <section id="about-details" style="padding: 6rem 0;">
                    <div class="glass-card" style="display: flex; gap: 4rem; align-items: center; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 300px;">
                            <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: 800;">Crafting Digital <span style="color: var(--primary);">Perfection</span></h2>
                            <p style="font-size: 1.1rem; line-height: 1.8; opacity: 0.8; margin-bottom: 2rem;">
                                ${data.personal.about}
                            </p>
                            <div style="display: flex; gap: 3rem;">
                                <div>
                                    <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent);">5+</div>
                                    <div style="font-size: 0.8rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">Years Exp.</div>
                                </div>
                                <div>
                                    <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">${data.projects.length}</div>
                                    <div style="font-size: 0.8rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">Projects</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="experience" style="padding: 6rem 0;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 4rem; text-align: center; font-weight: 800;">Career Journey</h2>
                    <div class="glass-card" style="border-left: 4px solid var(--primary);">
                        <div class="timeline">
                             ${data.experience && data.experience.length > 0 ? data.experience.map(exp => `
                                <div class="timeline-item">
                                    <div class="timeline-node"></div>
                                    <span style="font-size: 0.9rem; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; display: block;">${exp.duration}</span>
                                    <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${exp.role}</h3>
                                    <h4 style="font-size: 1.1rem; color: rgba(255,255,255,0.7); margin-bottom: 1rem;">@ ${exp.company}</h4>
                                    <p style="opacity: 0.8; line-height: 1.6;">${exp.desc}</p>
                                </div>
                            `).join('') : '<p>No experience listed yet.</p>'}
                        </div>
                    </div>
                </section>

                <section id="skills" style="padding: 6rem 0;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 4rem; text-align: center; font-weight: 800;">Technical Arsenal</h2>
                    <div class="skill-grid">
                        ${data.skills.map(skill => `
                            <div class="glass-card skill-card">
                                <i class="fas fa-code"></i>
                                <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">${skill}</h3>
                                <div class="badge" style="font-size: 0.6rem; color: var(--accent); border-color: var(--accent); display: inline-block;">Mastery</div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section id="projects" style="padding: 6rem 0;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 4rem; font-weight: 800;">Selected <span style="color: var(--accent);">Works</span></h2>
                    <div class="project-grid">
                        ${data.projects.map(proj => `
                            <div class="glass-card">
                                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem;">
                                    <i class="fas fa-folder-open" style="font-size: 2rem; color: var(--primary);"></i>
                                    <div style="display: flex; gap: 1rem;">
                                        ${proj.link ? `<a href="${proj.link}" target="_blank" style="color: #fff; font-size: 1.2rem; transition: 0.3s; hover: color: var(--accent);"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                    </div>
                                </div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #fff;">${proj.title}</h3>
                                <p style="font-size: 1rem; opacity: 0.7; line-height: 1.6; margin-bottom: 1.5rem; min-height: 3rem;">${proj.desc}</p>
                                <div class="tag-list">
                                    <span class="badge" style="font-size: 0.7rem; border-color: rgba(255,255,255,0.2);">Development</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                ${data.certifications && data.certifications.length > 0 ? `
                <section id="certifications" style="padding: 6rem 0;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 4rem; font-weight: 800;">Certifications & <span style="color: var(--primary);">Awards</span></h2>
                    <div class="cert-grid">
                        ${data.certifications.map(cert => `
                            <div class="glass-card cert-card">
                                <div class="cert-icon"><i class="fas fa-certificate"></i></div>
                                <div>
                                    <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">${cert.name}</h3>
                                    <p style="color: var(--accent); font-size: 0.9rem; margin-bottom: 0.2rem;">${cert.issuer}</p>
                                    <p style="font-size: 0.8rem; opacity: 0.6;">${cert.year || ''}</p>
                                    ${cert.link ? `<a href="${cert.link}" target="_blank" style="display: inline-block; margin-top: 0.5rem; color: #fff; font-size: 0.8rem; text-decoration: underline;">View Credential</a>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>` : ''}

                <section id="contact" style="padding: 6rem 0 4rem;">
                    <div class="glass-card" style="text-align: center; max-width: 800px; margin: 0 auto; background: linear-gradient(135deg, rgba(112,0,255,0.1), rgba(0,242,255,0.1)); border: 1px solid var(--accent);">
                        <h2 style="font-size: 2.5rem; margin-bottom: 1rem; font-weight: 800;">Ready to Collaborate?</h2>
                        <p style="font-size: 1.2rem; opacity: 0.8; margin-bottom: 3rem;">Let's turn your vision into a digital reality. Reach out today.</p>
                        <form style="display: grid; gap: 1.5rem; text-align: left;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                                <input type="text" placeholder="Name" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.2rem; border-radius: 12px; color: #fff; outline: none;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
                                <input type="email" placeholder="Email" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.2rem; border-radius: 12px; color: #fff; outline: none;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
                            </div>
                            <textarea placeholder="Message" rows="5" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.2rem; border-radius: 12px; color: #fff; outline: none; width: 100%;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"></textarea>
                            <button type="button" class="neon-btn primary" style="justify-content: center; font-size: 1.1rem; padding: 1rem;">Send Message <i class="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                </section>

                <footer class="glass-footer">
                    <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem;">${data.personal.name}</h2>
                    <p style="opacity: 0.6; font-size: 0.9rem;">Designed with <i class="fas fa-heart" style="color: var(--secondary);"></i> using PortfoliGo.</p>
                    <p style="opacity: 0.4; font-size: 0.8rem; margin-top: 2rem;">&copy; ${new Date().getFullYear()} All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    `;
}

// --- TEMPLATE 2: EXECUTIVE (B&W) ---
function renderExecutiveTemplate(data) {
    return `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap');
            
            .exec-theme {
                --primary: #000000;
                --bg: #ffffff;
                --text: #000000;
                --gray: #f5f5f5;
                --border: #e0e0e0;
                font-family: 'Space Grotesk', sans-serif;
                background-color: var(--bg);
                color: var(--text);
                margin: 0;
                padding: 0;
                scroll-behavior: smooth;
            }

            .exec-container {
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 4rem;
                border-left: 1px solid var(--border);
                border-right: 1px solid var(--border);
                min-height: 100vh;
                background: #fff;
            }

            h1, h2, h3 { font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: -1px; }

            .hero-exec {
                padding: 12rem 0 8rem;
                border-bottom: 2px solid var(--primary);
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
                position: relative;
                overflow: hidden;
            }
            
            .hero-bg-text {
                position: absolute;
                top: 0;
                right: -10%;
                font-size: 20rem;
                opacity: 0.03;
                font-weight: 900;
                white-space: nowrap;
                pointer-events: none;
                z-index: 0;
            }

            .massive-text {
                font-size: clamp(3.5rem, 8vw, 6rem);
                line-height: 0.9;
                letter-spacing: -0.04em;
                margin-bottom: 2rem;
                position: relative;
                z-index: 1;
            }

            .exec-btn {
                background: #000;
                color: #fff;
                padding: 1.2rem 3rem;
                text-decoration: none;
                font-weight: 700;
                display: inline-block;
                border: 1px solid #000;
                transition: 0.3s;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-size: 0.9rem;
            }

            .exec-btn:hover { background: #fff; color: #000; }

            .exec-btn.ghost { background: transparent; color: #000; margin-left: 2rem; }
            .exec-btn.ghost:hover { background: #000; color: #fff; }

            .section-label {
                font-size: 0.8rem;
                font-weight: 700;
                letter-spacing: 0.3em;
                text-transform: uppercase;
                opacity: 0.4;
                margin-bottom: 4rem;
                display: block;
                border-bottom: 1px solid #000;
                padding-bottom: 1rem;
                width: 100px;
            }

            .exec-section {
                padding: 8rem 0;
                border-bottom: 1px solid var(--border);
            }

            .item-row {
                padding: 3rem 0;
                border-bottom: 1px solid var(--border);
                display: flex;
                gap: 4rem;
                transition: 0.3s;
            }
            
            .item-row:last-child { border-bottom: none; }
            .item-row:hover { background: #fafafa; padding-left: 1rem; }

            .item-row .year { width: 180px; font-weight: 700; font-size: 1.2rem; opacity: 0.5; }
            .item-row .content { flex: 1; }
            .item-row h3 { font-size: 1.8rem; margin-bottom: 0.5rem; }
            .item-row h4 { font-size: 1.1rem; text-transform: none; opacity: 0.6; margin-bottom: 1.5rem; font-weight: 400; }
            .item-row p { font-size: 1.1rem; opacity: 0.8; line-height: 1.7; max-width: 800px; }

            .skill-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 2rem;
                margin-top: 2rem;
            }

            .skill-item {
                font-size: 1.1rem;
                font-weight: 600;
                border: 1px solid var(--border);
                padding: 1.5rem;
                text-align: center;
                text-transform: uppercase;
                transition: 0.3s;
                letter-spacing: 1px;
            }

            .skill-item:hover { background: #000; color: #fff; border-color: #000; }

            .case-study {
                margin-bottom: 6rem;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
                align-items: start;
            }

            .case-study-info { padding-top: 2rem; }
            .case-study h3 { font-size: 2.5rem; margin-bottom: 2rem; line-height: 1; }
            .case-study p { font-size: 1.1rem; line-height: 1.7; opacity: 0.8; margin-bottom: 2rem; }
            
            .case-study-links { display: flex; gap: 2rem; border-top: 1px solid var(--border); padding-top: 2rem; }
            .case-study-links a { color: #000; text-decoration: none; font-weight: 700; border-bottom: 2px solid transparent; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px; }
            .case-study-links a:hover { border-bottom-color: #000; }

            .cert-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.5rem 0;
                border-bottom: 1px solid var(--border);
            }
            .cert-row:first-of-type { border-top: 1px solid var(--border); }
            
            .exec-nav {
                position: sticky;
                top: 0;
                left: 0;
                width: 100%;
                background: rgba(255,255,255,0.95);
                backdrop-filter: blur(5px);
                z-index: 1000;
                padding: 0 4rem;
                height: 80px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid #000;
            }

            .exec-nav .nav-logo {
                font-weight: 900;
                font-size: 1.5rem;
                letter-spacing: -1px;
                text-transform: uppercase;
            }

            .exec-nav .nav-links {
                display: flex;
                gap: 0;
                height: 100%;
            }

            .exec-nav .nav-links a {
                color: #000;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.85rem;
                letter-spacing: 1px;
                text-transform: uppercase;
                transition: 0.2s;
                height: 100%;
                display: flex;
                align-items: center;
                padding: 0 2rem;
                border-left: 1px solid transparent;
                border-right: 1px solid transparent;
            }

            .exec-nav .nav-links a:hover {
                background: #000;
                color: #fff;
            }

            .exec-footer {
                padding: 6rem 4rem;
                background: #000;
                color: #fff;
                margin: 0 -4rem -4rem -4rem; 
                /* Counteract container padding */
            }

            @media (max-width: 992px) {
                .exec-container { padding: 0 1.5rem; border: none; }
                .hero-exec { padding-top: 8rem; }
                .item-row { flex-direction: column; gap: 0.5rem; }
                .item-row .year { margin-bottom: 0.5rem; }
                .case-study { grid-template-columns: 1fr; gap: 2rem; }
                .exec-nav { padding: 0 1.5rem; }
                .exec-nav .nav-links { display: none; }
                .exec-footer { margin: 0 -1.5rem -1.5rem -1.5rem; padding: 4rem 1.5rem; }
            }
        </style>

        <div class="exec-theme">
            <!-- Navbar -->
            <nav class="exec-nav">
                <div class="nav-logo">${data.personal.name}</div>
                <div class="nav-links">
                    <a href="#about">Profile</a>
                    <a href="#experience">History</a>
                    <a href="#skills">Capability</a>
                    <a href="#projects">Work</a>
                    <a href="#certifications">Credentials</a>
                    <a href="#contact">Inquiry</a>
                </div>
            </nav>
            
            <div class="exec-container">
                <header class="hero-exec" id="about">
                    <div class="hero-bg-text">PORTFOLIO ${new Date().getFullYear()}</div>
                    <span class="section-label" style="width: auto; margin-bottom: 2rem;">Introduction</span>
                    <h1 class="massive-text">${data.personal.name.split(' ')[0]}<br><span style="opacity: 0.4;">${data.personal.name.split(' ').slice(1).join(' ')}</span></h1>
                    <p style="font-size: 1.8rem; margin-bottom: 4rem; max-width: 900px; font-weight: 300; line-height: 1.4;">
                        <span style="border-bottom: 3px solid #000; padding-bottom: 5px;">${data.personal.title}</span>. ${data.personal.about.substring(0, 150)}...
                    </p>
                    <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 1rem;">
                        <a href="mailto:${data.personal.email}" class="exec-btn">Start Conversation</a>
                        <a href="#projects" class="exec-btn ghost">View Case Studies</a>
                    </div>
                </header>

                <section id="about-full" class="exec-section">
                    <span class="section-label">01 / Biography</span>
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 4rem;">
                        <div>
                            <img src="${data.personal.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.personal.name}`}" 
                                 style="width: 100%; aspect-ratio: 1; object-fit: cover; filter: grayscale(1); border: 1px solid #000;">
                        </div>
                        <div>
                            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; line-height: 1.1;">Developing digital systems that endure through precision.</h2>
                            <p style="font-size: 1.2rem; line-height: 1.8; opacity: 0.8; margin-bottom: 3rem;">${data.personal.about}</p>
                            
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; border-top: 1px solid #000; padding-top: 2rem;">
                                <div>
                                    <h4 style="font-size: 0.9rem; opacity: 0.5; margin-bottom: 0.5rem; text-transform: uppercase;">Location</h4>
                                    <p style="font-size: 1.1rem; font-weight: 700;">${data.personal.location || 'Remote'}</p>
                                </div>
                                <div>
                                    <h4 style="font-size: 0.9rem; opacity: 0.5; margin-bottom: 0.5rem; text-transform: uppercase;">Experience</h4>
                                    <p style="font-size: 1.1rem; font-weight: 700;">5+ Years</p>
                                </div>
                                <div>
                                    <h4 style="font-size: 0.9rem; opacity: 0.5; margin-bottom: 0.5rem; text-transform: uppercase;">Status</h4>
                                    <p style="font-size: 1.1rem; font-weight: 700; color: green;">Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="experience" class="exec-section" style="background: #fafafa; margin: 0 -4rem; padding: 8rem 4rem;">
                    <div style="max-width: 1400px; margin: 0 auto;">
                        <span class="section-label">02 / Trajectory</span>
                        ${data.experience && data.experience.length > 0 ? data.experience.map(exp => `
                            <div class="item-row">
                                <div class="year">${exp.duration || 'PRESENT'}</div>
                                <div class="content">
                                    <h3>${exp.role}</h3>
                                    <h4>${exp.company}</h4>
                                    <p>${exp.desc || ''}</p>
                                </div>
                            </div>
                        `).join('') : '<p style="opacity: 0.5;">No experience records found.</p>'}
                    </div>
                </section>

                <section id="skills" class="exec-section">
                    <span class="section-label">03 / Capability</span>
                    <h2 style="font-size: 3rem; margin-bottom: 3rem;">Technical Core</h2>
                    <div class="skill-list">
                        ${data.skills.map(s => `<div class="skill-item">${s}</div>`).join('')}
                    </div>
                </section>

                <section id="projects" class="exec-section">
                    <span class="section-label">04 / Selected Works</span>
                    ${data.projects.map((p, i) => `
                        <div class="case-study" style="grid-template-columns: 1fr;">
                            <div class="case-study-info">
                                <span style="font-size: 5rem; font-weight: 900; opacity: 0.1; display: block; line-height: 0.8; margin-bottom: 1rem;">0${i + 1}</span>
                                <h3>${p.title}</h3>
                                <p>${p.desc}</p>
                                <div class="case-study-links">
                                    <a href="${p.link || '#'}" target="_blank">Live Deployment <i class="fas fa-arrow-right" style="font-size: 0.8em; transform: rotate(-45deg);"></i></a>
                                    <a href="#">Source Code</a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </section>

                ${data.certifications && data.certifications.length > 0 ? `
                <section id="certifications" class="exec-section">
                    <span class="section-label">05 / Credentials</span>
                    <div style="margin-top: 3rem;">
                        ${data.certifications.map(cert => `
                            <div class="cert-row">
                                <div>
                                    <h3 style="font-size: 1.4rem; margin-bottom: 0.2rem;">${cert.name}</h3>
                                    <p style="opacity: 0.6; font-size: 1rem;">${cert.issuer} &bull; ${cert.year || ''}</p>
                                </div>
                                ${cert.link ? `<a href="${cert.link}" target="_blank" style="font-size: 1.5rem; color: #000; opacity: 0.4; transition: 0.3s; hover: opacity: 1;"><i class="fas fa-arrow-right"></i></a>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </section>` : ''}

                <section id="contact" class="exec-section" style="border-bottom: none;">
                    <span class="section-label">06 / Inquiry</span>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
                        <div>
                            <h2 style="font-size: 3.5rem; line-height: 1;">Let's Talk Business.</h2>
                            <p style="font-size: 1.25rem; margin-top: 2rem; opacity: 0.7;">Open for strategic partnerships and technical consultation.</p>
                            <div style="margin-top: 3rem;">
                                <p style="font-weight: 700;">CONTACT</p>
                                <a href="mailto:${data.personal.email}" style="font-size: 1.5rem; color: #000; text-decoration: none; border-bottom: 2px solid #000;">${data.personal.email}</a>
                            </div>
                        </div>
                        <form style="display: grid; gap: 2rem;">
                            <input type="text" placeholder="Full Name" style="width: 100%; padding: 1rem 0; border: none; border-bottom: 2px solid #000; font-family: inherit; font-size: 1.25rem; outline: none; background: transparent;">
                            <input type="email" placeholder="Corporate Email" style="width: 100%; padding: 1rem 0; border: none; border-bottom: 2px solid #000; font-family: inherit; font-size: 1.25rem; outline: none; background: transparent;">
                            <textarea placeholder="Project Details" rows="3" style="width: 100%; padding: 1rem 0; border: none; border-bottom: 2px solid #000; font-family: inherit; font-size: 1.25rem; outline: none; background: transparent;"></textarea>
                            <button class="exec-btn" style="width: fit-content; cursor: pointer;">Submit Request</button>
                        </form>
                    </div>
                </section>

                <footer class="exec-footer">
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                            <h2 style="font-size: 2rem; margin-bottom: 1rem;">${data.personal.name}</h2>
                            <p style="opacity: 0.6; max-width: 300px;">Executed with precision and minimalist design principles.</p>
                        </div>
                        <div style="text-align: right;">
                            <p style="opacity: 0.6; margin-bottom: 0.5rem;">SOCIALS</p>
                            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                                ${data.social.github ? `<a href="${data.social.github}" style="color: #fff;"><i class="fab fa-github"></i></a>` : ''}
                                ${data.social.linkedin ? `<a href="${data.social.linkedin}" style="color: #fff;"><i class="fab fa-linkedin"></i></a>` : ''}
                            </div>
                        </div>
                    </div>
                    <div style="border-top: 1px solid rgba(255,255,255,0.2); margin-top: 4rem; padding-top: 2rem; display: flex; justify-content: space-between; opacity: 0.4; font-size: 0.8rem;">
                        <p>&copy; ${new Date().getFullYear()} EXEC EDITION</p>
                        <p>PORTFOLIGENERATOR</p>
                    </div>
                </footer>
            </div>
        </div>
    `;
}

// --- TEMPLATE 3: INTERACTIVE MOTION ---
function renderMotionTemplate(data) {
    return `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');
            
            .motion-theme {
                --primary: #6366f1;
                --secondary: #ec4899;
                --tertiary: #8b5cf6;
                --bg: #06060c;
                --text: #ffffff;
                font-family: 'Outfit', sans-serif;
                background-color: var(--bg);
                color: var(--text);
                min-height: 100vh;
                overflow-x: hidden;
                perspective: 1000px;
            }

            .parallax-bg {
                position: fixed;
                inset: 0;
                z-index: 0;
                pointer-events: none;
            }

            .floating-shape {
                position: absolute;
                background: linear-gradient(45deg, var(--primary), var(--secondary));
                filter: blur(80px);
                opacity: 0.15;
                border-radius: 50%;
                z-index: 0;
                animation: flow 10s infinite alternate;
            }
            
            @keyframes flow {
                0% { box-shadow: 0 0 20px var(--primary); transform: scale(1); }
                100% { box-shadow: 0 0 50px var(--secondary); transform: scale(1.2); }
            }

            .motion-container {
                position: relative;
                z-index: 1;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            .revealer {
                opacity: 0;
                transform: translateY(80px) scale(0.9);
                transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
            }

            .revealer.visible {
                opacity: 1;
                transform: translateY(0) scale(1);
            }

            .hero-motion {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                position: relative;
            }

            .hero-title {
                font-size: clamp(3rem, 10vw, 7rem);
                font-weight: 900;
                line-height: 0.9;
                margin-bottom: 2rem;
                display: block;
                background: linear-gradient(to right, #fff, var(--primary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                transform-style: preserve-3d;
            }
            
            .hero-subtitle {
                font-size: 1.5rem;
                opacity: 0.8;
                letter-spacing: 2px;
                text-transform: uppercase;
                margin-bottom: 4rem;
            }

            .motion-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 30px;
                padding: 2.5rem;
                transition: 0.5s cubic-bezier(0.33, 1, 0.68, 1);
                position: relative;
                overflow: hidden;
            }

            .motion-card:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateY(-10px) scale(1.02);
                border-color: var(--primary);
                box-shadow: 0 20px 50px rgba(99, 102, 241, 0.15);
            }
            
            .motion-card::after {
                content: '';
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%);
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
            }
            .motion-card:hover::after { opacity: 1; }

            .skill-bar-wrap {
                width: 100%;
                height: 8px;
                background: rgba(255,255,255,0.05);
                border-radius: 10px;
                margin-top: 1rem;
                overflow: hidden;
                position: relative;
            }

            .skill-bar-fill {
                height: 100%;
                background: linear-gradient(to right, var(--primary), var(--secondary));
                width: 0;
                transition: 1.5s cubic-bezier(0.65, 0, 0.35, 1);
                position: absolute;
                left: 0; top: 0;
                border-radius: 10px;
            }

            .motion-container.visible .skill-bar-fill { width: var(--p); }

            .timeline-item {
                position: relative;
                padding-left: 3rem;
                padding-bottom: 4rem;
                border-left: 2px solid rgba(255,255,255,0.1);
            }

            .timeline-item::after {
                content: '';
                position: absolute;
                left: -9px;
                top: 0;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--bg);
                border: 3px solid var(--primary);
                box-shadow: 0 0 20px var(--primary);
                transition: 0.3s;
            }
            
            .timeline-item:hover::after {
                background: var(--primary);
                transform: scale(1.5);
            }

            .motion-nav {
                position: fixed;
                top: 2rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 1000;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(20px);
                padding: 0.8rem 2rem;
                border-radius: 100px; 
                border: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                gap: 2rem;
                align-items: center;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                transition: 0.3s;
            }

            .motion-nav a {
                color: #fff;
                text-decoration: none;
                font-weight: 700;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: 0.3s;
                opacity: 0.6;
                position: relative;
            }

            .motion-nav a:hover {
                opacity: 1;
                color: var(--primary);
            }
            
            .motion-nav a.active {
                opacity: 1;
                color: #fff;
            }
            
            .motion-nav a.active::after {
                content: '';
                position: absolute;
                bottom: -5px; left: 50%; transform: translateX(-50%);
                width: 5px; height: 5px; background: var(--primary);
                border-radius: 50%;
            }
            
            .project-gallery {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 3rem;
            }
            
            .btn-glow {
                display: inline-block;
                padding: 1rem 3rem;
                background: linear-gradient(45deg, var(--primary), var(--secondary));
                color: #fff;
                font-weight: 700;
                border-radius: 50px;
                text-decoration: none;
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
                transition: 0.3s;
                border: none;
                cursor: pointer;
            }
            
            .btn-glow:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 20px 50px rgba(99, 102, 241, 0.6);
            }

            @media (max-width: 768px) {
                .hero-title { font-size: 3.5rem; }
                .motion-nav { width: 90%; justify-content: space-around; gap: 0; padding: 1rem; top: 1rem; }
                .motion-nav a { font-size: 0.6rem; letter-spacing: 1px; }
            }
        </style>

        <div class="motion-theme" onmousemove="document.documentElement.style.setProperty('--mouse-x', (event.clientX / window.innerWidth * 100) + '%'); document.documentElement.style.setProperty('--mouse-y', (event.clientY / window.innerHeight * 100) + '%');">
            <div class="parallax-bg">
                <div class="floating-shape" style="width: 500px; height: 500px; top: -10%; left: -10%;"></div>
                <div class="floating-shape" style="width: 400px; height: 400px; bottom: 10%; right: -5%; animation-delay: -5s; background: linear-gradient(45deg, #00f2ff, var(--tertiary)); opacity: 0.1;"></div>
            </div>

            <nav class="motion-nav">
                <a href="#about" class="active">Home</a>
                <a href="#journey">Journey</a>
                <a href="#work">Work</a>
                <a href="#certifications">Awards</a>
                <a href="#contact">Contact</a>
            </nav>

            <div class="motion-container">
                <header class="hero-motion" id="about">
                    <h1 class="hero-title revealer">DIGITAL<br><span style="color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.5);">REALITY</span></h1>
                    <p class="hero-subtitle revealer">${data.personal.name} — ${data.personal.title}</p>
                    <div class="revealer" style="transition-delay: 0.2s;">
                        <a href="#work" class="btn-glow">Explore Universe</a>
                    </div>
                </header>

                <section id="journey" style="padding: 8rem 0;">
                    <div style="max-width: 800px; margin: 0 auto;">
                        <h2 class="revealer" style="font-size: 3rem; margin-bottom: 4rem; text-align: center; font-weight: 800;">My Evolution</h2>
                        ${data.experience && data.experience.length > 0 ? data.experience.map((exp, i) => `
                            <div class="timeline-item revealer">
                                <span style="color: ${i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}; font-weight: 900; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">${exp.duration || ''}</span>
                                <h3 style="font-size: 2rem; margin: 0 0 0.5rem 0;">${exp.role}</h3>
                                <h4 style="font-size: 1.2rem; opacity: 0.8; margin-bottom: 1rem; font-weight: 400;">${exp.company}</h4>
                                <p style="opacity: 0.7; line-height: 1.6;">${exp.desc || ''}</p>
                            </div>
                        `).join('') : '<p class="revealer">No experience loaded.</p>'}
                    </div>
                </section>

                <section id="skills" style="padding: 6rem 0;">
                    <h2 class="revealer" style="font-size: 3rem; margin-bottom: 4rem; text-align: center; font-weight: 800;">Core Competencies</h2>
                    <div class="project-gallery">
                        ${data.skills.map((s, i) => `
                            <div class="motion-card revealer" style="text-align: center;">
                                <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">${s}</h3>
                                <div class="skill-bar-wrap">
                                    <div class="skill-bar-fill" style="--p: ${Math.floor(Math.random() * (100 - 70) + 70)}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section id="work" style="padding: 8rem 0;">
                    <h2 class="revealer" style="font-size: 3rem; margin-bottom: 4rem; text-align: left; border-left: 5px solid var(--primary); padding-left: 2rem;">Selected Projects</h2>
                    <div class="project-gallery">
                        ${data.projects.map(p => `
                            <div class="motion-card revealer">
                                <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; margin-top: 0;">${p.title}</h3>
                                <p style="opacity: 0.7; line-height: 1.6; margin-bottom: 1.5rem;">${p.desc}</p>
                                <a href="${p.link || '#'}" target="_blank" style="color: var(--primary); text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">View Project <i class="fas fa-arrow-right"></i></a>
                            </div>
                        `).join('')}
                    </div>
                </section>

                ${data.certifications && data.certifications.length > 0 ? `
                <section id="certifications" style="padding: 6rem 0;">
                    <h2 class="revealer" style="font-size: 3rem; margin-bottom: 4rem; text-align: right; border-right: 5px solid var(--secondary); padding-right: 2rem;">Acclaimed Certifications</h2>
                    <div class="project-gallery">
                        ${data.certifications.map(cert => `
                            <div class="motion-card revealer" style="border-top: 5px solid var(--secondary);">
                                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${cert.name}</h3>
                                <p style="color: var(--secondary); margin-bottom: 0.5rem;">${cert.issuer}</p>
                                <p style="opacity: 0.5; font-size: 0.9rem;">${cert.year || ''}</p>
                                ${cert.link ? `<a href="${cert.link}" target="_blank" style="margin-top: 1rem; display: inline-block; color: #fff; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 20px; text-decoration: none; transition: 0.3s; hover: background: #fff; hover: color: #000;">Verify</a>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </section>` : ''}

                <section id="contact" style="padding: 8rem 0; text-align: center;">
                    <div class="revealer">
                        <h2 style="font-size: 4rem; font-weight: 900; margin-bottom: 2rem; background: linear-gradient(to right, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Make It Happen.</h2>
                        <a href="mailto:${data.personal.email}" class="btn-glow" style="font-size: 1.5rem; padding: 1.5rem 4rem;">Start A Project</a>
                    </div>
                </section>

                <footer style="padding: 4rem 0; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.4);">
                    <p>&copy; ${new Date().getFullYear()} ${data.personal.name} | Interactive Experience</p>
                </footer>
            </div>
        </div>
    `;
}

// --- SHARED UTILS ---
function initMotionScripts() {
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // If it's the container, also trigger skill bars
                    if (entry.target.classList.contains('motion-container')) {
                        // bars will fill due to CSS transition
                    }
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.revealer, .motion-container').forEach(el => observer.observe(el));
    }, 100);
}

function renderNavbar(data, type) {
    if (type === 'glass') {
        return `
            <nav class="glass-nav">
                <div class="nav-logo">PORTFOLIGO</div>
                <div class="nav-links">
                    <a href="#about">About</a>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
        `;
    }
    if (type === 'executive') {
        return `
            <nav class="exec-nav">
                <div class="nav-logo">EXEC. ARCHIVE</div>
                <div class="nav-links">
                    <a href="#about">ARCHIVE</a>
                    <a href="#experience">HISTORY</a>
                    <a href="#projects">WORKS</a>
                    <a href="#contact">INQUIRY</a>
                </div>
            </nav>
        `;
    }
    if (type === 'motion') {
        return `
            <nav class="motion-nav">
                <a href="#about">ENTRY</a>
                <a href="#journey">WAY</a>
                <a href="#projects">WORKS</a>
                <a href="#contact">TALK</a>
            </nav>
        `;
    }
    return '';
}

function renderFooter(data) {
    return `
        <footer style="padding: 6rem 0; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
            <div style="display: flex; gap: 2rem; justify-content: center; margin-bottom: 3rem; font-size: 1.2rem;">
                ${data.social.github ? `<a href="${data.social.github}" target="_blank" style="color: inherit; text-decoration: none;">GitHub</a>` : ''}
                ${data.social.linkedin ? `<a href="${data.social.linkedin}" target="_blank" style="color: inherit; text-decoration: none;">LinkedIn</a>` : ''}
                ${data.social.twitter ? `<a href="${data.social.twitter}" target="_blank" style="color: inherit; text-decoration: none;">Twitter</a>` : ''}
            </div>
            <p style="opacity: 0.4; font-size: 0.8rem;">&copy; ${new Date().getFullYear()} ${data.personal.name} — ${data.personal.title}</p>
        </footer>
    `;
}
