// SCRIPT JS :
// Récupérer les informations et initialiser des variables :
const type_vehicule = document.getElementById("type_vehicule");
const type_energie = document.getElementById("type_energie");
const kilometre_value = document.getElementById("kilometre");
const annee_value = document.getElementById("annee");
const passagers_value = document.getElementById("passagers");
vehicule = "";
energie = "";
kilometre = "";
annee = "";
passagers = "";

// Je récupere les valeurs au change : 
type_vehicule.addEventListener("change", (event) => {
    vehicule = `${event.target.value}`;
});
type_energie.addEventListener("change", (event) => {
    energie = `${event.target.value}`;
});
kilometre_value.addEventListener("change", (event) => {
    kilometre = `${event.target.value}`;
});
annee_value.addEventListener("change", (event) => {
    annee = `${event.target.value}`;
});
passagers_value.addEventListener("change", (event) => {
    passagers = `${event.target.value}`;
});

// Calculer (Fonction appellé après le clic du bouton "calculer") :
function calculate() {
    // Je vérifie si tous les champs sont bien remplis :
    if (vehicule == "" || energie == "" || kilometre == "" || annee == "" || passagers == "") {
        alert("Vous devez remplir tous les champs disponibles sans exceptions !");
        // J'arrete l'execution de la fonction :
        return None
    }

    // Je calcule la note avec chaque variable (et ses fonctions associées) :
    note = avoir_note_pour_type_vehicule(vehicule) + avoir_note_pour_type_energie(energie) + avoir_note_pour_kilometrage(kilometre) + avoir_note_pour_annee(annee);
    // Je calcule le taux d'emprunt avec la fonction associé
    taux = avoir_taux_emprunt(note, passagers);
    console.log(taux);
    // Je fais mon animation pour montrer le taux :
    animation(taux)
}

// Fonction de l'animation et de la deuxieme page :
function animation(taux) {
    // Je mets dans une div un nouveau titre :
    document.getElementById("taux").innerHTML = "<h1> TAUX D'EMPRUNT DE VOTRE VOITURE </h1>";
    // Je replace l'image de la banque populaire avec le CSS :
    document.getElementById("image_banque_populaire").style = "position: absolute; top: 85%; left: 47%;";
    // Bouton pour refaire une nouvelle simulation :
    document.getElementById("revenir").innerHTML = "<h2 style='color: green;'>Faire une nouvelle simulation</h2>";

    valeur_afficher = 0
    // Animation :
    interval = setInterval(function() {
        valeur_afficher+=0.01
        if (valeur_afficher >= taux) {
            // Correction finale pour s'assurer qu'il n'y a pas eu de mauvais arrondis
            valeur_afficher = taux
            document.querySelector(".form").innerHTML = "<p style='font-size: "+valeur_afficher*200+"%; color: green;'>" + Math.round(valeur_afficher*100)/100 + "% </p>";
            // Quand la valeur est égale au taux, j'arrete la boucle
            clearInterval(interval);
        }
        // A chaque boucle, j'actualise mon formulaire en mettant la valeur et en changeant la taille du texte par rapport à la valeur :
        document.querySelector(".form").innerHTML = "<p style='font-size: "+valeur_afficher*200+"%; color: green;'>" + Math.round(valeur_afficher*100)/100 + "% </p>";
    }, 10);
}

// Fonction pour avoir la note à partir du véhicule correpondant
function avoir_note_pour_type_vehicule(type_vehicule) {
    // Voici ma base de donnée sous forme de liste de liste
    vehicule_notes_list = [["Citadine", 8], ["Cabriolet", 6], ["Berline", 6.5], ["SUV/4*4", 4]];
    // Je fais ensuite une recherche dans la base en vérifiant si le véhicule est égale à l'un de ceux de la liste
    for (let x = 0; x < vehicule_notes_list.length; x++) {
        if (vehicule_notes_list[x][0] == type_vehicule) {
            // Je renvoye la bonne valeur
            return vehicule_notes_list[x][1];
        }
    }
}

// Fonction pour avoir la note à partir de l'énergie correpondant
function avoir_note_pour_type_energie(type_energie) {
    // Meme principe que la fonction au dessus : recherche dans la liste
    energie_notes_list = [["Essence", 5], ["Electrique", 9], ["Gaz", 6], ["Diesel", 4], ["Hybride", 7]];
    for (let x = 0; x < energie_notes_list.length; x++) {
        if (energie_notes_list[x][0] == type_energie) {
            return energie_notes_list[x][1];
        }
    }
}

// Fonction permettant d'avoir la note avec le nombre de kilometres pour un an
function avoir_note_pour_kilometrage(nb_kilometre) {
    kilometrage_notes_list = [[5, 9], [10, 7], [15, 5], [20, 3], [25, 1]];
    for (let x = 0; x < kilometrage_notes_list.length; x++) {
        if (kilometrage_notes_list[x][0] == nb_kilometre) {
            return kilometrage_notes_list[x][1];
        }
    }
}

// Fonction permettant d'avoir la note avec l'année de création du véhicule 
function avoir_note_pour_annee(nb_annee) {
    annees_notes_list = [[1960, 1], [1970, 2], [1990, 4], [2000, 5], [2010, 7]];
    for (let x = 0; x < annees_notes_list.length; x++) {
        if (annees_notes_list[x][0] == nb_annee) {
            return annees_notes_list[x][1];
        }
    }
}

// Fonction permettant d'avoir le taux d'emprunt à partir de la note et du nombre de passagers dans le véhicule
function avoir_taux_emprunt(note, passagers) {
    // Calcul du taux avec la note :
    if (note < 10) {
        taux_actuel = 3;
    }
    else if (note < 15) {
        taux_actuel = 2.74;
    }
    else if (note < 25) {
        taux_actuel = 2.52;
    }
    else if (note < 33) {
        taux_actuel = 2.10;
    }
    else if (note < 40) {
        taux_actuel = 1.85;
    }
    else {
        taux_actuel = 0;
    }

    // Ajout du bonus/malus avec les passagers :
    // Principe de la recherche avec le nombre de passagers et le bonus :
    passagers_bonus_list = [[1, 0.11], [2, -0.17], [3, -0.29], [4, -0.53]];
    for (let x = 0; x < passagers_bonus_list.length; x++) {
        if (passagers_bonus_list[x][0] == passagers) {
            taux_actuel = taux_actuel + passagers_bonus_list[x][1];
        }
    }

    // Retourne le taux :
    return taux_actuel;
}