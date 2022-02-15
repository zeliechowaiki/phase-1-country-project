const flagNav = document.getElementById('flag-nav');
const displayedFlag = document.getElementById('displayed-flag');
let countryData;

fetch('https://restcountries.com/v3.1/all')
.then(resp => resp.json())
.then(countries => {
    countryData = countries;

    countries.map(country => {
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
    console.log(country);
    displayedFlag.src=country.flags.svg;
}