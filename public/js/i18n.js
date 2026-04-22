const translations = {};

let currentLang = localStorage.getItem('language') || 'en';

async function loadTranslations(lang) {
    if (!translations[lang]) {
        try {
            const response = await fetch(`public/i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error(`No se pudo cargar ${lang}.json`);
            }
            translations[lang] = await response.json();
        } catch (error) {
            console.error(`Error cargando traducciones para ${lang}:`, error);
            if (lang !== 'es') {
                await loadTranslations('es');
                currentLang = 'es';
            }
        }
    }
    return translations[lang];
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadTranslations(currentLang);
    initLanguageSwitcher();
    setLanguage(currentLang);
});

function initLanguageSwitcher() {
    const enBtn = document.getElementById('lang-en');
    const esBtn = document.getElementById('lang-es');
    const enBtnMobile = document.getElementById('lang-en-mobile');
    const esBtnMobile = document.getElementById('lang-es-mobile');
    
    if (enBtn && esBtn) {
        enBtn.addEventListener('click', () => switchLanguage('en'));
        esBtn.addEventListener('click', () => switchLanguage('es'));
    }
    
    if (enBtnMobile && esBtnMobile) {
        enBtnMobile.addEventListener('click', () => switchLanguage('en'));
        esBtnMobile.addEventListener('click', () => switchLanguage('es'));
    }
    
    updateSwitcherUI();
}

async function switchLanguage(lang) {
    if (lang !== currentLang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        await loadTranslations(lang);
        setLanguage(lang);
        updateSwitcherUI();
    }
}

function updateSwitcherUI() {
    const enBtn = document.getElementById('lang-en');
    const esBtn = document.getElementById('lang-es');
    const enBtnMobile = document.getElementById('lang-en-mobile');
    const esBtnMobile = document.getElementById('lang-es-mobile');
    
    const buttons = [
        { en: enBtn, es: esBtn },
        { en: enBtnMobile, es: esBtnMobile }
    ];
    
    buttons.forEach(({ en, es }) => {
        if (en && es) {
            if (currentLang === 'en') {
                en.classList.add('active');
                es.classList.remove('active');
            } else {
                es.classList.add('active');
                en.classList.remove('active');
            }
        }
    });
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    const currentTranslations = translations[lang];
    
    if (!currentTranslations) {
        console.error(`No hay traducciones cargadas para ${lang}`);
        return;
    }
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = currentTranslations[key];
        
        if (translation) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
    
    document.documentElement.lang = lang;
}

window.i18n = {
    switchLanguage,
    getCurrentLang: () => currentLang,
    getTranslations: () => translations
};
