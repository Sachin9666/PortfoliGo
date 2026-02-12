document.addEventListener('DOMContentLoaded', () => {

    const downloadHtmlBtn = document.getElementById('download-html');

    // CSS Content Inlined for robust local export (All 10 Templates)
    const ALL_CSS = `
:root {
    --primary: #6366f1;
    --primary-hover: #4f46e5;
    --secondary: #10b981;
    --bg-dark: #0f172a;
    --text-main: #f8fafc;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a; background: #f8fafc; }

/* Base Layout */
.portfolio-container {
    background: white;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    position: relative;
    padding: 0;
}

@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate { opacity: 0; animation: fadeInUp 0.7s ease-out forwards; }
.profile-img { width: 140px; height: 140px; object-fit: cover; border-radius: 50%; }
.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag { background: #f1f5f9; padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; }
.social-links { display: flex; gap: 1rem; margin-top: 1rem; font-size: 1.2rem; }
.social-links a { color: inherit; text-decoration: none; }

/* 1. Modern Minimal */
.tpl-modern { padding: 8rem 4rem; font-family: 'Inter', sans-serif; max-width: 1000px; margin: 0 auto; }
.tpl-modern .header { display: flex; justify-content: space-between; margin-bottom: 4rem; }
.tpl-modern h2 { color: #6366f1; border-bottom: 2px solid #f1f5f9; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }

/* 2. Bold Professional */
.tpl-bold { display: flex; font-family: 'Outfit', sans-serif; }
.tpl-bold .sidebar { width: 350px; background: #1e293b; color: white; padding: 8rem 2rem; }
.tpl-bold .main-content { flex: 1; padding: 8rem 4rem; }

/* 3. Creative Layout */
.tpl-creative { padding: 8rem 4rem; font-family: 'Playfair Display', serif; max-width: 1200px; margin: 0 auto; }
.tpl-creative .profile-img { clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%); border-radius: 0; }

/* 4. Sleek Slate */
.tpl-slate { background: #f8fafc; font-family: 'Inter', sans-serif; }
.tpl-slate .slate-hero { background: #1e293b; color: white; padding: 8rem 4rem; text-align: center; }
.tpl-slate .slate-body { padding: 4rem; max-width: 900px; margin: 0 auto; }

/* 5. Midnight Pro */
.tpl-midnight { background: #0b0f19; color: #f1f5f9; padding: 8rem 4rem; font-family: 'Outfit', sans-serif; min-height: 100vh; }
.tpl-midnight .profile-img { border: 3px solid #818cf8; border-radius: 20px; }

/* 6. Zen Essence */
.tpl-zen { padding: 8rem 4rem; background: #fafaf9; color: #44403c; font-family: 'Inter', sans-serif; max-width: 1000px; margin: 0 auto; text-align: center; }
.tpl-zen .profile-img { filter: grayscale(1); border-radius: 0; }

/* 7. Cyber Future */
.tpl-futuristic { background: #000; color: #0f0; font-family: 'Space Mono', monospace; padding: 8rem 4rem; min-height: 100vh; }
.tpl-futuristic .profile-img { border-radius: 0; border: 2px solid #0f0; width: 120px; height: 120px; }

/* 8. Classic Slate */
.tpl-classic { padding: 8rem 4rem; font-family: 'Playfair Display', serif; max-width: 1100px; margin: 0 auto; text-align: center; }
.tpl-classic .profile-img { border: 1px solid #ccc; padding: 8px; border-radius: 0; }

/* 9. Neon Pulse */
.tpl-neon { background: #050505; color: #fff; padding: 8rem 4rem; font-family: 'Inter', sans-serif; min-height: 100vh; }
.tpl-neon .profile-img { box-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff; border: 3px solid #fff; }

/* 10. Data Stream */
.tpl-datastream { background: #000; color: #00ff41; font-family: 'Space Mono', monospace; padding: 8rem 4rem; min-height: 100vh; }
.tpl-datastream .profile-img { border: 1px solid #00ff41; border-radius: 0; width: 110px; height: 110px; }

/* 11. Architect Pro */
.tpl-architect { background: #000; color: #fff; font-family: 'Inter', sans-serif; padding: 0; width: 100%; }
.arch-header { display: flex; justify-content: space-between; padding: 1.5rem 4rem; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 100; }
.arch-logo { font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; }
.arch-logo span { color: #10b981; }
.arch-nav { display: flex; gap: 2rem; font-size: 0.8rem; color: #a1a1aa; text-transform: uppercase; }
.arch-hero { height: 80vh; display: flex; align-items: center; padding: 0 4rem; }
.arch-title { font-size: 5rem; font-weight: 800; font-family: 'Outfit', sans-serif; margin-bottom: 2rem; line-height: 1; }
.arch-subtitle { color: #a1a1aa; font-size: 1.5rem; max-width: 600px; }
.arch-section { padding: 8rem 4rem; }
.arch-num { color: #10b981; font-family: 'Space Mono', monospace; font-size: 1.2rem; margin-bottom: 1rem; display: block; }

/* Delays */
.animate:nth-child(1) { animation-delay: 0.1s; }
.animate:nth-child(2) { animation-delay: 0.2s; }
.animate:nth-child(3) { animation-delay: 0.3s; }
`;


    downloadHtmlBtn.addEventListener('click', exportToHtml);



    function exportToHtml() {
        const data = window.currentData;
        const element = document.getElementById('portfolio-render-area');
        const content = element.innerHTML;
        const themeClass = element.className;

        const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.name} - Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Space+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>${ALL_CSS}</style>
</head>
<body>
    <div class="portfolio-container ${themeClass}">${content}</div>
</body>
</html>`;

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.personal.name.replace(/\s+/g, '_')}_Portfolio.html`;
        a.click();
        URL.revokeObjectURL(url);
    }
});
