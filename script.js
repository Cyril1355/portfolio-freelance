document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    formMsg.textContent = "Envoi en cours...";
    formMsg.style.color = "white";

    const formData = new FormData(contactForm);
    
    // Envoi vers Netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    .then((response) => {
      if (response.ok) {
        formMsg.textContent = "Merci Cyril a bien reçu ton message !";
        formMsg.style.color = "#4ade80"; // Vert
        contactForm.reset();
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      formMsg.textContent = "Oups ! Erreur. Utilise mon mail direct en attendant.";
      formMsg.style.color = "#f87171"; // Rouge
    });
  });
}
