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
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            // Обновляем текст для всех элементов с id, соответствующим ключам в JSON
            Object.keys(data).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = data[key];
                }
            });
        })
        .catch(error => console.error('Ошибка загрузки переводов:', error));
}

function getSavedLanguage() {
    return localStorage.getItem('selectedLanguage');
}

window.onload = function() {
    const savedLanguage = getSavedLanguage();
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        setLanguage('en'); // По умолчанию английский язык
    }
};
