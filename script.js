const selectLanguageElement = document.getElementById('select-language');
const monthAndYearElement = document.getElementById('month-and-year');
const weekDaysElement = document.getElementById('week-days');
const daysInMonthElement = document.getElementById('days-in-month');
const btnLastMonth = document.getElementById('btn-last-month');
const btnNextMonth = document.getElementById('btn-next-month');

let currentLanguage = 'pt';
let currentDate = new Date();

const loadLanguages = (language) => {
    const languages = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'pt', 'ru', 'ar'];
    const languageDisplayNames = new Intl.DisplayNames([language], { type: 'language' });
    const currentSelectedValue = language;

    selectLanguageElement.innerHTML = '';
    languages.forEach((languageCode) => {
        const option = document.createElement('option');
        option.value = languageCode;
        option.innerText = languageDisplayNames.of(languageCode);
        selectLanguageElement.appendChild(option);
    });
    selectLanguageElement.value = currentSelectedValue;
};

const formatMonth = (language) => {
    return new Intl.DateTimeFormat(language, { month: 'long' });
};

const formatYear = (language) => {
    return new Intl.DateTimeFormat(language, { year: 'numeric' });
};

const loadWeekDays = (language, date) => {
    const monthName = formatMonth(language).format(date);
    const yearNumber = formatYear(language).format(date);
    monthAndYearElement.innerHTML = `${monthName} <span>${yearNumber}</span>`;

    const weekDaysFormatter = new Intl.DateTimeFormat(language, { weekday: 'short' });
    weekDaysElement.innerHTML = '';
    for (let index = 0; index < 7; index++) {
        const tempDate = new Date(2021, 0, index + 3);
        const weekDayElement = document.createElement('li');
        weekDayElement.innerText = weekDaysFormatter.format(tempDate);
        weekDaysElement.appendChild(weekDayElement);
    }
};

const loadDaysInMonth = (date) => {
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    daysInMonthElement.innerHTML = '';
    const today = new Date();

    for (let dayIndex = 1; dayIndex <= totalDays; dayIndex++) {
        const dayDate = new Date(date.getFullYear(), date.getMonth(), dayIndex);

        if (dayIndex === 1) {
            for (let blankIndex = 0; blankIndex < dayDate.getDay(); blankIndex++) {
                const blankDayElement = document.createElement('li');
                daysInMonthElement.appendChild(blankDayElement);
            }
        }

        const dayElement = document.createElement('li');
        dayElement.innerText = dayIndex;
        if (dayIndex === today.getDate() && formatMonth(currentLanguage).format(today) === formatMonth(currentLanguage).format(date)) {
            dayElement.classList.add('selected');
        }
        daysInMonthElement.appendChild(dayElement);
    }
};

const loadCalendar = (language, date) => {
    loadWeekDays(language, date);
    loadDaysInMonth(date);
};

selectLanguageElement.addEventListener('change', () => {
    currentLanguage = selectLanguageElement.value;
    loadLanguages(currentLanguage);
    loadCalendar(currentLanguage, currentDate);
});

const goToNextMonth = (date) => {
    const nextDate = date.setMonth(date.getMonth() + 1);
    currentDate = new Date(nextDate);
    loadCalendar(currentLanguage, currentDate);
};

const goToLastMonth = (date) => {
    const lastDate = date.setMonth(date.getMonth() - 1);
    currentDate = new Date(lastDate);
    loadCalendar(currentLanguage, currentDate);
};

btnLastMonth.addEventListener('click', () => {
    goToLastMonth(currentDate);
});
btnNextMonth.addEventListener('click', () => {
    goToNextMonth(currentDate);
});

window.onload = () => {
    loadLanguages(currentLanguage);
    loadCalendar(currentLanguage, currentDate);
};
