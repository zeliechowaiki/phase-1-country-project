fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countryData => {
        console.log (countryData)
        countryData.forEach(country => {
            createCountryNav(country)
        })
    })

let flags = document.getElementById('flags')
// console.log(flags)
function createCountryNav(country){
    let pic = document.createElement('img')
    pic.src = country.flags.png
    flags.appendChild(pic)
}