const flagNav = document.getElementById('flag-nav');
const displayedFlag = document.getElementById('displayed-flag');
const countryName = document.getElementById('country-name');
const capital = document.getElementById('capital');
const languages = document.getElementById('languages');
const visitedBtn = document.getElementById('visited-button');
const languageForm = document.getElementById('language-form');
const resetBtn = document.getElementById('reset-button');
const randomBtn = document.getElementById('random-button');
const newCountryForm = document.getElementById('new-country-form');
const newCountryBtn = document.getElementById('new-country-button');
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
        // console.log(country);
    })

    displayCountryFacts(countries[0]);
})

function renderFlags (country) {
    const flagImg = document.createElement('img');
    flagImg.setAttribute('id', 'flag-image');
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

resetBtn.addEventListener('click', () => {
    flagNav.innerHTML = '';
    countryData.map(country => renderFlags(country));
})

randomBtn.addEventListener('click', () => {
    let counter = 1;
    const firstInterval = setInterval(function() { 
        if (counter <= 12) { 
            displayRandomFlag();
            counter++;
    }
        else { 
            clearInterval(firstInterval);
    }
    }, 160)
})

function displayRandomFlag() {
    displayCountryFacts(countryData[Math.floor(Math.random() * 250)]);
}

newCountryBtn.addEventListener('click', () => {
    newCountryForm.classList.remove('hidden');
})

newCountryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newCountry = {};
    newCountry.name = {
        common: e.target['new-name'].value
    }
    newCountry.capital = e.target['new-capital'].value
    newCountry.languages = {
        language: e.target['new-language'].value
    }
    
    const newFlagImage = document.getElementById('flag-image');
    const file = document.getElementById('new-flag').files[0];
        let reader  = new FileReader();
        reader.onload = function(e)  {
            newCountry.flags = {
                png: e.target.result,
                svg: e.target.result
            }
            countryData.unshift(newCountry);
            flagNav.innerHTML = '';
            countryData.map(country => renderFlags(country));
            displayCountryFacts(newCountry);
         }
         reader.readAsDataURL(file);
    newCountryForm.reset();
    newCountryForm.classList.add('hidden');
})