// Variables des besoins du Tamagotchi
let faim = 100;
let soif = 100;
let sommeil = 100;
let bonheur = 100;
let hygiene = 100;
let sante = 100;
let estMort = false; // État du Tamagotchi (vivant ou mort)

// Références aux éléments HTML
const barreFaim = document.getElementById("barre_faim");
const barreSoif = document.getElementById("barre_soif");
const barreSommeil = document.getElementById("barre_sommeil");
const barreBonheur = document.getElementById("barre_bonheur");
const barreHygiene = document.getElementById("barre_hygiene");
const barreSante = document.getElementById("barre_sante");


const texteFaim = document.getElementById("texte_faim");
const texteSoif = document.getElementById("texte_soif");
const texteSommeil = document.getElementById("texte_sommeil");
const texteBonheur = document.getElementById("texte_bonheur");
const texteHygiene = document.getElementById("texte_hygiene");
const texteSante = document.getElementById("texte_sante");

const message = document.getElementById("message");
const imageTamagotchi = document.getElementById("image_tamagotchi");

// Actions des boutons
document.getElementById("bouton_nourrir").addEventListener("click", () => nourrir());
document.getElementById("bouton_boire").addEventListener("click", () => donnerBoire());
document.getElementById("bouton_dormir").addEventListener("click", () => dormir());
document.getElementById("bouton_jouer").addEventListener("click", () => jouer());
document.getElementById("bouton_laver").addEventListener("click", () => laver());
document.getElementById("bouton_soigner").addEventListener("click", () => soigner());
document.getElementById("bouton_redemarrer").addEventListener("click", () => redemarrer());

// Diminution automatique des besoins
setInterval(() => {
    if (!estMort) {  // Les besoins ne diminuent que si le Tamagotchi est vivant
        faim -= 5;
        soif -= 4;
        sommeil -= 3;
        bonheur -= 5;
        hygiene -= 4;
        sante -= 3;
        mettreAJourStats();
    }
}, 10000); //répéter toute les 1sec = 1000ms

// Fonction de mise à jour des stats
function mettreAJourStats() {
    if (estMort) return;  // Arrête la fonction si le Tamagotchi est mort

     // Empêcher les valeurs négatives
    faim = Math.max(faim, 0);
    soif = Math.max(soif, 0);
    sommeil = Math.max(sommeil, 0);
    bonheur = Math.max(bonheur, 0);
    hygiene = Math.max(hygiene, 0);
    sante = Math.max(sante, 0);


    // Mettre à jour les barres
    mettreAJourBarre(faim, barreFaim, texteFaim, "Faim");
    mettreAJourBarre(soif, barreSoif, texteSoif, "Soif");
    mettreAJourBarre(sommeil, barreSommeil, texteSommeil, "Sommeil");
    mettreAJourBarre(bonheur, barreBonheur, texteBonheur, "Bonheur");
    mettreAJourBarre(hygiene, barreHygiene, texteHygiene, "Hygiène");
    mettreAJourBarre(sante, barreSante, texteSante, "Santé");

  // Vérifier si le Tamagotchi est malheureux
    if (faim <= 20 || soif <= 20 || sommeil <= 20 || bonheur <= 20 || hygiene <= 20 || sante <= 20) {
        message.textContent = "Votre Tamagotchi est triste !";
        imageTamagotchi.src = "images/Gif/Triste.gif";
    } else {
        message.textContent = "";
        imageTamagotchi.src = "images/Gif/Happy.gif";
    }

    if (faim <= 0 || soif <= 0 || sommeil <= 0 || bonheur <= 0 || hygiene <= 0 || sante <= 0) {
        mourir();
    }
}

// Fonction pour mettre à jour une barre de progression
function mettreAJourBarre(valeur, barre, texte, label) {
    barre.style.width = valeur + "%";
    texte.textContent = label + " (" + valeur + "%)";

    if (valeur >= 80) {
        barre.style.backgroundColor = "green";
    } else if (valeur >= 50) {
        barre.style.backgroundColor = "yellow";
        texte.style.color = "black";
    } else if (valeur >= 30) {
        barre.style.backgroundColor = "orange";
        texte.style.color = "white";
    } else {
        barre.style.backgroundColor = "red";
        texte.style.color = "white";
    }
}

// Fonctions pour nourrir, donner à boire et dormir
function nourrir() {
    if (estMort) return;  // Empêche de nourrir si mort
    faim = Math.min(faim + 20, 100);
    mettreAJourStats();
    imageTamagotchi.src = "images/Gif/Manger poisson.gif"; //Gif manger
    message.textContent = "Votre Tamagotchi mange"; //message manger
}

function donnerBoire() {
    if (estMort) return;  // Empêche de donner à boire si mort
    soif = Math.min(soif + 20, 100);
    mettreAJourStats();
    imageTamagotchi.src = "images/Gif/Boire.gif"; //Gif boire
    message.textContent = "Votre Tamagotchi bois"; //message boire
}

function dormir() {
    if (estMort) return;  // Empêche de dormir si mort
    sommeil = Math.min(sommeil + 30, 100);
    mettreAJourStats();
    imageTamagotchi.src = "images/Gif/Dormir.gif"; //Gif dormir
    message.textContent = "Votre Tamagotchi dors"; //message dormir
}

function jouer() {
    if (estMort) return;
    bonheur = Math.min(bonheur + 20, 100);
    mettreAJourStats();
    imageTamagotchi.src = "images/Gif/Jouer.gif"; //Gif jouer
    message.textContent = "Votre Tamagotchi joue"; //message jouer
}

function laver() {
    if (estMort) return;
    hygiene = Math.min(hygiene + 20, 100);
    mettreAJourStats();
    imageTamagotchi.src = "images/Gif/Douche.gif"; //Gif douche
    message.textContent = "Votre Tamagotchi se douche"; //message douche
    
}

function soigner() {
    if (estMort) return;
    sante = Math.min(sante + 20, 100);
    mettreAJourStats();
    imageTamagotchi.src = "images/Gif/Santé.gif"; //Gif santé
    message.textContent = "Votre Tamagotchi se soigne"; //message se soigne
}

// Fonction en cas de mort
function mourir() {
    if (estMort) return;  // Empêche de mourir plusieurs fois
    estMort = true;  // Bloque toutes les actions

    // Si Mort masquer tous les boutons sauf le bouton de redémarrer
   const boutons = document.querySelectorAll(".actions button");
   boutons.forEach(bouton => {
       if (bouton.id !== "bouton_redemarrer") {
           bouton.style.display = "none";  // Masque tous les boutons sauf le redémarrer
       }
   });

    // Mettre les barres à zéro
    faim = 0;
    soif = 0;
    sommeil = 0;
    bonheur = 0;
    hygiene = 0;
    sante= 0;

    // Mettre à jour les barres immédiatement
    mettreAJourStats();  // Met à jour les barres de progression à zéro

    // Mettre un message de mort et changer l'image immédiatement
    message.textContent = "Votre Tamagotchi est mort... 😢";
    imageTamagotchi.src = "images/Gif/Mort.gif";

    // Réinitialiser les barres à zéro immédiatement sans délai
    barreFaim.style.width = "0%";
    barreSoif.style.width = "0%";
    barreSommeil.style.width = "0%";
    barreBonheur.style.width = "0%";
    barreHygiene.style.width = "0%";
    barreSante.style.width = "0%";
  
    texteFaim.textContent = "Faim (0%)";
    texteSoif.textContent = "Soif (0%)";
    texteSommeil.textContent = "Sommeil (0%)";
    texteBonheur.textContent = "Bonheur (0%)";
    texteHygiene.textContent = "Hygiène (0%)";
    texteSante.textContent = "Santé (0%)";
  
     // Afficher le bouton de redémarrage
     document.getElementById("bouton_redemarrer").style.display = "block";

   
}

// Fonction pour redémarrer le jeu
function redemarrer() {
    if (!estMort) return; // Ne permet pas de redémarrer si le Tamagotchi est encore vivant

    // Réinitialiser les valeurs
    faim = 100;
    soif = 100;
    sommeil = 100;
    bonheur = 100;
    hygiene = 100;
    sante = 100;
    estMort = false;

    // Réinitialiser l'image et les messages
    imageTamagotchi.src = "images/Happy.png";
    message.textContent = "";

    // Réinitialiser les barres de progression
    mettreAJourStats();

    // Réafficher tous les boutons sauf le bouton de redémarrer
    const boutons = document.querySelectorAll(".actions button");
    boutons.forEach(bouton => {
        bouton.style.display = "inline-block";  // Réaffiche tous les boutons
    });

     // Cacher le bouton de redémarrage une fois que le jeu est redémarré
     document.getElementById("bouton_redemarrer").style.display = "none";

}
