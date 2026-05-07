// 1. Connexion à Supabase
const SUPABASE_URL = "https://TON-PROJET.supabase.co";
const SUPABASE_KEY = "TA_CLE_ANON_PUBLIQUE";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Gestion du formulaire
const form = document.getElementById("signup-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 3. Création de l’utilisateur avec Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    message.textContent = error.message;
    message.style.color = "red";
  } else {
    message.textContent = "Compte créé avec succès ✅";
    message.style.color = "green";
  }
});
