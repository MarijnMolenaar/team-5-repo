const divhumanedit = document.querySelector(".HumanProfileEdit");
const divanimaledit = document.querySelector(".AnimalProfileEdit");

// De functie van het menselijke profiel wordt uitgevoerd bij het opstarten van de pagina, aangezien deze laten zien moet worden
HumanProfileEdit();

// Binnen deze functie wordt het menselijke profiel weergegeven en wordt het dieren profiel verborgen door de display-style naar none te veranderen
document.querySelector(".hprofe").addEventListener("click", (e) => {
    HumanProfileEdit();
    e.preventDefault();
}, false);

// Bij het klikken van de 'human' knop wordt de bijbehorende functie uitgevoerd
document.querySelector(".aprofe").addEventListener("click", (e) => {
    AnimalProfileEdit();
    e.preventDefault();
}, false);

// Binnen deze functie wordt het menselijke profiel weergegeven en wordt het dieren profiel verborgen door de display-style naar none te veranderen
function HumanProfileEdit() {
    divhumanedit.style.display = "block";
    divanimaledit.style.display = "none";
    document.querySelector(".hprofe > img").classList.add("activebutton");
    document.querySelector(".aprofe > img").classList.remove("activebutton");
}
// Hier gebeurt dit ook, maar dan vice versa
function AnimalProfileEdit() {
    divhumanedit.style.display = "none";
    divanimaledit.style.display = "block";
    document.querySelector(".hprofe > img").classList.add("activebutton");
    document.querySelector(".aprofe > img").classList.remove("activebutton");
}



// De 'REST Countries' API wordt ingeladen in het document
document.addEventListener('DOMContentLoaded', () => {
    const CountryDropdown = document.getElementById('country');

    fetch('https://restcountries.com/v2/all').then(res => {
        return res.json();
    }).then(countries => {
        let output = "";

        // Er wordt door elk land in de API heen 'geloopt', waarmee elke naam van het land uit het object gehaald wordt en wordt toegevoegd aan een output variabele
        countries.forEach(country => {
            output += `<option>${country.name}</option>`;
        });

        // Vervolgens wordt deze output toegevoegd aan het select element, welke eerder uit de EJS pagina is opgehaald
        CountryDropdown.innerHTML = output;
    }).catch(err => {
        // Bij sprake van een error wordt deze error naar de console gelogd
        console.log(err);
    })
});
// Bron gebruikt: https://www.youtube.com/watch?v=iw4lvZGBuvA&ab_channel=OstonCodeCypher

// Het eerder geselecteerde en in de localStorage opgeslagen land wordt uit de localStorage gehaald, en vervolgens als value ingesteld binnen de dropdown
const selectedCountry = localStorage.getItem('selectedCountry');
document.getElementById('country').value = selectedCountry;


// De eerder opgeslagen array wordt uit de localStorage gehaald, en met een JSON functie herschreven naar een functionele array
const array = localStorage.getItem('myArray');
const interestarray = JSON.parse(array);

// Bron gebruikt: https://gist.github.com/nrojas13/68b79e21d0c81aa22ad762c9a4db38d0

// Een lijst met alle interests, zoals ook al gedefinieerd in de app.js file
const interests = ["Travel", "Dogs", "Cooking", "Surfing", "Politics", "Cats", "Fitness", "Reading", "Netflix", "Partying"];

// Deze arrowed functie loopt door alle interesses binnen de array heen, en checkt of deze eerder geslecteerd zijn door de kijken of deze aanwezig zijn in de uit de
// localStorage gehaalde array, wanneer dit het geval is wordt het checked element van de betreffende interesse op true gezet
interests.forEach((i) => {
    if (interestarray.includes(i) == true) {
    document.getElementById(i).checked = true;
    } else {
    document.getElementById(i).checked = false;
    }
});

// Bron gebruikt: https://www.w3schools.com/jsref/jsref_includes_array.asp

document.getElementById("profilepage").classList.add("active");




