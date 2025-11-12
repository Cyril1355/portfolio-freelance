document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const mailtoFallback = document.getElementById('mailtoFallback');

// Utilitaire pour encoder un objet en application/x-www-form-urlencoded
function encode(data) {
  return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  formMsg.textContent = "Envoi en cours...";
  const formData = new FormData(form);

  // Netlify expects application/x-www-form-urlencoded or a direct form POST.
  const data = {};
  formData.forEach((value, key) => { data[key] = value; });

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(Object.assign({"form-name": form.getAttribute('name')}, data))
    });
    if (res.ok) {
      formMsg.textContent = "Merci — ton message a bien été envoyé.";
      form.reset();
    } else {
      formMsg.textContent = "Erreur lors de l'envoi. Essaie plus tard.";
    }
  } catch (err) {
    console.error(err);
    formMsg.textContent = "Impossible d'envoyer le message. Essaie l'envoi par mail.";
  }
});

// Bouton fallback mailto (ouvre le client mail avec contenu prérempli)
mailtoFallback.addEventListener('click', function(){
  const name = (form.querySelector('[name="name"]').value || '');
  const email = (form.querySelector('[name="email"]').value || '');
  const subject = (form.querySelector('[name="subject"]').value || 'Demande depuis le site');
  const message = (form.querySelector('[name="message"]').value || '');
  const body = `Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
  window.location.href = `mailto:cyrilbimbi13@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});
