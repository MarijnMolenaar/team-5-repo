const h2check = document.getElementById("h2check");
const homebutton = document.getElementById("homemessage");

// Wanneer op de button wordt geklikt wordt de profile-pagina geladen
homebutton.addEventListener("click", () => {
    window.location.href = 'profile';
})

document.getElementById("homepage").classList.add("active");