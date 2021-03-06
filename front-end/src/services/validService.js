const regex = () => {
  return {
    firstName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    lastName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    email: /^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+groupomania\.fr$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    controlPassword:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };
};

const messages = () => {
  return {
    firstName: "Ce champ accepte uniquement les lettres.",
    lastName: "Ce champ accepte uniquement les lettres.",
    email:
      "Saisissez une adresse électronique correcte : nom.prenom@groupomania.fr ",
    password:
      "Le mot de passe doit contenir au moins 8 Caractères et  1 minuscule, 1 majuscule, 1 chiffre, 1 symbole.",
    controlPassword:
      "Le mot de passe doit contenir au moins 8 Caractères et  1 minuscule, 1 majuscule, 1 chiffre, 1 symbole.",
    title:
      "Veuillez remplir ce champ et l'un des optionnels ci en bas ou les deux",
    text: "Text est optionnel",
    imageUrl: "Image est optionnelle",
  };
};

export default { regex, messages };
