const divhumanedit = document.getElementById("humanprofileedit");
const divanimaledit = document.getElementById("animalprofileedit");

// De functie van het menselijke profiel wordt uitgevoerd bij het opstarten van de pagina, aangezien deze laten zien moet worden
HumanProfileEdit();

// Binnen deze functie wordt het menselijke profiel weergegeven en wordt het dieren profiel verborgen door de display-style naar none te veranderen
function HumanProfileEdit() {
    divhumanedit.style.display = "block";
    divanimaledit.style.display = "none";
}

// Hier gebeurt dit ook, maar dan vice versa
function AnimalProfileEdit() {
    divhumanedit.style.display = "none";
    divanimaledit.style.display = "block";
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