const STORAGE_KEY = 'portfolio_data';

const Storage = {
    save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to LocalStorage:', e);
            return false;
        }
    },

    load() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    },

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    }
};
