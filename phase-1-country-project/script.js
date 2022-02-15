const flagNav = document.getElementById('flag-nav');
const displayedFlag = document.getElementById('displayed-flag');
const countryName = document.getElementById('country-name');
const capital = document.getElementById('capital');
const languages = document.getElementById('languages');
const visitedBtn = document.getElementById('visited-button');
const languageForm = document.getElementById('language-form');
let currentCountry;
let countryData;

fetch('https://restcountries.com/v3.1/all')
.then(resp => resp.json())
.then(countries => {
    countryData = countries;

    countries.map(country => {
        country.visited = false;

        if (country.name.common === "Antarctica") {
            country.languages = {NOF: 'No official language'}
            country.capital = 'No official capital'
        }

        renderFlags(country);
    })

    displayCountryFacts(countries[0]);
})

function renderFlags (country) {
    const flagImg = document.createElement('img');
    flagImg.src=country.flags.png;
    flagImg.classList.add('flag-guide-img');
    flagNav.appendChild(flagImg);

    flagImg.addEventListener('click', () => {
        displayCountryFacts(country);
    })
}

function displayCountryFacts(country) {
    displayedFlag.src=country.flags.svg;
    countryName.textContent = country.name.common;
    currentCountry = country;
    
    capital.textContent = country.capital;
    const countryLanguages = Object.values(country.languages);
    if (countryLanguages.length > 1) {
        languages.textContent = `s: ${countryLanguages.join(', ')}`;
    }
    else {
        languages.textContent = `: ${countryLanguages}`;
    }
    country.visited ? visitedBtn.textContent = 'Visited' : visitedBtn.textContent = "Not yet visited";

    visitedBtn.addEventListener('click', handleVisitedBtn)
}

function handleVisitedBtn () {
    currentCountry.visited = !currentCountry.visited;
    currentCountry.visited ? visitedBtn.textContent = 'Visited' : visitedBtn.textContent = "Not yet visited";
}

languageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const languageInput = languageForm.language.value;
    const filteredCountries = countryData.filter(country => {
        const lowerCaseLanguages = Object.values(country.languages);
        return lowerCaseLanguages.includes(languageInput);
    });
    flagNav.innerHTML = '';
    filteredCountries.map(country => renderFlags(country));
    displayCountryFacts(filteredCountries[0]);
    languageForm.reset();
})