const divhuman = document.getElementById("humanprofile");
const divanimal = document.getElementById("animalprofile");

// De functie van het menselijke profiel wordt uitgevoerd bij het opstarten van de pagina, aangezien deze laten zien moet worden
HumanProfile();

// Binnen deze functie wordt het menselijke profiel weergegeven en wordt het dieren profiel verborgen door de display-style naar none te veranderen
function HumanProfile() {
    divhuman.style.display = "block";
    divanimal.style.display = "none";
}

// Hier gebeurt dit ook, maar dan vice versa
function AnimalProfile() {
    divhuman.style.display = "none";
    divanimal.style.display = "block";
}

document.getElementById("discoverpage").classList.add("active");
