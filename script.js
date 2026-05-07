// 🔐 Connexion à Supabase
const SUPABASE_URL = "https://TON-PROJET.supabase.co";
const SUPABASE_KEY = "TA_CLE_ANON_PUBLIQUE";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🎯 Éléments HTML
const form = document.getElementById("signup-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 1️⃣ Création de l'utilisateur dans Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    message.textContent = error.message;
    message.style.color = "red";
    return;
  }

  // 2️⃣ Récupération de l'UUID généré par Auth
  const userId = data.user.id;

  // 3️⃣ Insertion du profil lié dans la table profiles
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      email: email
    });

  if (profileError) {
    message.textContent =
      "Compte créé ✅ mais erreur lors de la création du profil";
    message.style.color = "orange";
  } else {
    message.textContent = "Compte et profil créés avec succès ✅";
    message.style.color = "green";
  }
});
