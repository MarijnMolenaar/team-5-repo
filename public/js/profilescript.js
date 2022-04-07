const humansection = document.querySelector(".profile-human");
const animalsection = document.querySelector(".profile-animal");

// De functie van het menselijke profiel wordt uitgevoerd bij het opstarten van de pagina, aangezien deze laten zien moet worden
window.addEventListener("load", (e) => {
    HumanProfile();
    e.preventDefault();
}, false);

// Bij het klikken van de 'human' knop wordt de bijbehorende functie uitgevoerd
document.querySelector(".humanbutton").addEventListener("click", (e) => {
    HumanProfile();
    e.preventDefault();
}, false);

// Bij het klikken van de 'human' knop wordt de bijbehorende functie uitgevoerd
document.querySelector(".animalbutton").addEventListener("click", (e) => {
    AnimalProfile();
    e.preventDefault();
}, false);

// Binnen deze functie wordt het menselijke profiel weergegeven en wordt het dieren profiel verborgen door de display-style naar none te veranderen
function HumanProfile() {
    humansection.style.display = "block";
    animalsection.style.display = "none";
    document.querySelector(".humanbutton > img").classList.add("activebutton");
    document.querySelector(".animalbutton > img").classList.remove("activebutton");
}

// Hier gebeurt dit ook, maar dan vice versa
function AnimalProfile() {
    humansection.style.display = "none";
    animalsection.style.display = "block";
    document.querySelector(".animalbutton > img").classList.add("activebutton");
    document.querySelector(".humanbutton > img").classList.remove("activebutton");
}

// Er wordt gecheckt welk land door de gebruiker geselecteerd is bij het maken van het profiel, en deze wordt opgeslagen in de localStorage
const selectedCountry = document.querySelector(".profile-human p:first-of-type").innerText;
localStorage.setItem("selectedCountry", selectedCountry);


// De ul wordt in een variabele opgeslagen, vervolgens worden de children binnen deze ul in een andere variabele opgeslagen (dus de list items)
const ul = document.querySelector(".profile-human ul");
const children = ul.children;
let interestarray = [];

// Alle list items worden ten eerste in een array geplaatst, en vervolgens wordt door elk item heengeloopt, en deze worden een voor één naar
// de eerder gedefinieerde array gepusht
Array.from(children).forEach(li => {
    interestarray.push(li.innerText);
});
// Bron gebruikt: https://attacomsian.com/blog/javascript-dom-get-all-child-nodes-of-an-element#:~:text=To%20get%20all%20child%20nodes,0)%20to%20access%20individual%20nodes.

// Vervolgens wordt deze array met alle geselecteerde list items in de localStorage opgeslagen, zodat deze in een ander JavaScript bestand opgehaald kan worden
localStorage.setItem("myArray", JSON.stringify(interestarray));
// Bron gebruikt: https://gist.github.com/nrojas13/68b79e21d0c81aa22ad762c9a4db38d0

document.getElementById("profilepage").classList.add("active");