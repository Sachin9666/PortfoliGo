document.addEventListener('DOMContentLoaded', () => {
    const templateSelector = document.getElementById('template-selector');

    // Set initial selector value based on saved data
    const data = Storage.load();
    if (data && data.template) {
        templateSelector.value = data.template;
    }

    templateSelector.addEventListener('change', (e) => {
        const newTemplate = e.target.value;

        // Update storage
        if (window.currentData) {
            window.currentData.template = newTemplate;
            Storage.save(window.currentData);
        }

        // Re-render
        if (window.renderPortfolio) {
            window.renderPortfolio(newTemplate);
        }
    });
});

