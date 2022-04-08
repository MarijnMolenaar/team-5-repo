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

document.getElementById("discoverpage").classList.add("active");