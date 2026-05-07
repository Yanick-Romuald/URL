// ✅ Supabase est déjà défini par le CDN
const SUPABASE_URL = "https://iicobacgstpbuvedqndo.supabase.co";
const SUPABASE_KEY = "sb_publishable_I0lDtnUBTnwQs_aei2Hg-A_m_KY19tQ";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("✅ script.js chargé");

// 🎯 Éléments HTML
const form = document.getElementById("signup-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("✅ formulaire soumis");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 1️⃣ Inscription Auth
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    message.textContent = error.message;
    message.style.color = "red";
    return; // ✅ STOP si Auth échoue
  }

  // 2️⃣ Insertion du profil (UNE SEULE FOIS)
  const { error: profileError } = await supabaseClient
    .from("profiles")
    .insert({
      id: data.user.id,
      email
    });

  if (profileError) {
    console.error(profileError);
    message.textContent =
      "✅ Compte créé, ❌ profil non créé";
    message.style.color = "orange";
  } else {
    message.textContent =
      "✅ Compte et profil créés avec succès";
    message.style.color = "green";
  }
});
``
