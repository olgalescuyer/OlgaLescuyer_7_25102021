const regex = () => {
  return {
    firstName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    lastName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    email: /^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+groupomania.fr$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };
};

const messages = () => {
  return {
    firstName: "Vérifiez le prénom. Ce champ accepte uniquement les lettres.",
    lastName: "Vérifiez le prénom. Ce champ accepte uniquement les lettres.",
    email: "Saisissez une adresse électronique correcte ",
    password:
      "Le mot de passe Doit Contenir au Moins 8 Caractères et une minute de 1 Minuscule, 1 Majuscule, 1 chiffre, 1 symbole.",
  };
};


export default {regex, messages};
