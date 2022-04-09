const divhumanedit = document.getElementById("humanprofileedit");
const divanimaledit = document.getElementById("animalprofileedit");

// De functie van het menselijke profiel wordt uitgevoerd bij het opstarten van de pagina, aangezien deze laten zien moet worden
HumanProfileEdit();

// Binnen deze functie wordt het menselijke profiel weergegeven en wordt het dieren profiel verborgen door de display-style naar none te veranderen
document.querySelector(".hprofe").addEventListener("click", (e) => {
    HumanProfile();
    e.preventDefault();
}, false);

// Bij het klikken van de 'human' knop wordt de bijbehorende functie uitgevoerd
document.querySelector(".aprofe").addEventListener("click", (e) => {
    AnimalProfile();
    e.preventDefault();
}, false);

// Binnen deze functie wordt het menselijke profiel weergegeven en wordt het dieren profiel verborgen door de display-style naar none te veranderen
function HumanProfile() {
    divhumanedit.style.display = "block";
    divanimaledit.style.display = "none";
    document.querySelector(".humanbutton > img").classList.add("activebutton");
    document.querySelector(".animalbutton > img").classList.remove("activebutton");
}

// Hier gebeurt dit ook, maar dan vice versa
function AnimalProfile() {
    divhumanedit.style.display = "none";
    divanimaledit.style.display = "block";
    document.querySelector(".animalbutton > img").classList.add("activebutton");
    document.querySelector(".humanbutton > img").classList.remove("activebutton");
}

// Bij het uploaden van een foto wordt deze functie uitgevoerd, waarmee de geüploade foto gelijk eronder weergegeven wordt
const loadFile = function(event) {
	const image = document.getElementById('previewphoto');
	image.src = URL.createObjectURL(event.target.files[0]);
};
// Bron gebruikt: https://www.webtrickshome.com/forum/how-to-display-uploaded-image-in-html-using-javascript


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