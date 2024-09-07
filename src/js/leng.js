function setLanguage(lang) {
    // Сохраняем выбранный язык в localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Загружаем переводы для выбранного языка
    loadTranslations(lang);
}

function loadTranslations(lang) {
    fetch(`js/lang/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('welcome-text').textContent = data.welcome;
            document.getElementById('sample-text').textContent = data.sample_text;
        })
        .catch(error => console.error('Error loading translations:', error));
}

function getSavedLanguage() {
    return localStorage.getItem('selectedLanguage');
}

window.onload = function() {
    const savedLanguage = getSavedLanguage();
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        setLanguage('en');
    }
};
