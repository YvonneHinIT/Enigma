"use strict";

//Als er op 'codeer tekst' geklikt wordt.
const button = document.getElementById("codeerButton");
button.addEventListener('click', buttonClick);

function buttonClick () { 
    const leesTekst = document.getElementById("tekst");
    const ingevuldeTekst = leesTekst.value;
    const codeVeld = document.getElementById("enigmaCodeVeld")
 
    //En er is eerder gecodeerd.
    if (leesTekst.value !== "" && codeVeld !== null) {
        codeVeld.id = "";
        codeVeld.classList.add("vorigeCodeVeld");

        nieuwCodeVeld (ingevuldeTekst); 
    }
    //Eerste keer coderen.
    else if (leesTekst.value !== "") {        
        nieuwCodeVeld (ingevuldeTekst); 
    
    } else {
        alert("Vul eerst tekst in om te coderen.");
    }
};

//Maakt nieuw codeveld aan met gecodeerde tekst.
function nieuwCodeVeld (ingevuldeTekst){
    //sleutel
    let geselecteerdeKleur = sleutelKleur.value;
    let geselecteerdVak = sleutelPlek.value;
    let sleutel = Number(geselecteerdeKleur) + Number(geselecteerdVak);

    //container
    const container = document.createElement("div");
    container.classList.add("container");
    const resultaat = document.getElementById("resultaat");
    resultaat.appendChild(container);

    //codeveld
    const divCodeElement = document.createElement("div");
    divCodeElement.id = "enigmaCodeVeld";
    container.appendChild(divCodeElement);

    //decodeer button.
    const buttonDecodeer = document.createElement("button");
    buttonDecodeer.classList.add(sleutel, "decodeer")
    buttonDecodeer.innerText = "Decodeer";
    container.appendChild(buttonDecodeer);

    //verwijder button.
    const buttonVerwijder = document.createElement("button");
    buttonVerwijder.classList.add("verwijder");
    buttonVerwijder.innerText = "Verwijder";
    container.appendChild(buttonVerwijder);

    buttonDecodeer.addEventListener('click', decodeer);
    buttonVerwijder.addEventListener('click', verwijder);
    enigmaCode (ingevuldeTekst); 
};

//Vult het divElement 'enigmaCodeVeld' met de enigma code.
function enigmaCode (ingevuldeTekst) {
    const enigmaElement = document.getElementsByTagName("td");
    const storeText = ingevuldeTekst.toUpperCase().split("");
    
    for (let i = 0; i < storeText.length; i++) {
        let storeLetter = storeText[i];
            //Maakt van enter een spatie.
            if (storeLetter == "\n") {
                storeLetter = " ";
            }
        for (let j = 0; j < enigmaElement.length; j++) {
            const storeEnigmaLetter = enigmaElement[j].textContent
            if (storeLetter == storeEnigmaLetter) {
            //Maak nieuw td element aan waar css stijl naar wordt gekopieerd.
            const tdCodeElement = document.createElement("td");
            const enigmaStyle = window.getComputedStyle(enigmaElement[j]);
            tdCodeElement.style.borderBottom = enigmaStyle.borderBottom;
            tdCodeElement.style.borderTop = enigmaStyle.borderTop;
            tdCodeElement.style.borderRight = enigmaStyle.borderRight;
            tdCodeElement.style.borderLeft = enigmaStyle.borderLeft;
            const parentElement = document.getElementById("enigmaCodeVeld");
            parentElement.appendChild(tdCodeElement);
            }
        } 
    }
    //Maakt tekstveld leeg.
    const tekstveldLeeg = document.getElementById("tekst");
    tekstveldLeeg.value = "";
};

//Als sleutel kleur geselecteerd wordt.
const sleutelKleur = document.getElementById("kleur");
sleutelKleur.addEventListener('change', sleutelSom);

//Als sleutel vak geselecteerd wordt.
const sleutelPlek = document.getElementById("plek");
sleutelPlek.addEventListener('change', sleutelSom);

// 0=vak1 | 1=vak2 | 2=vak3
// -------|--------|--------
// 3=vak4 | 4=vak5 | 5=vak6
// -------|--------|--------
// 6=vak7 | 7=vak8 | 8=vak9
//
// blauw = + 0
// rood = + 9
// groen = + 18

//Rekend uit wat de plaats is waar A begint. 
function sleutelSom () {
    let geselecteerdeKleur = sleutelKleur.value;
    let geselecteerdVak = sleutelPlek.value;
    let plaats = Number(geselecteerdeKleur) + Number(geselecteerdVak);
    sleuterVeranderPlaats (plaats);
};

//Vult A tot en met Z in voor de nieuwe plaats.
function sleuterVeranderPlaats (plaats) {
    const alphabet = ["A", "B", "C", "D",
                      "E", "F", "G", "H",
                      "I", "J", "K", "L",
                      "M", "N", "O", "P",
                      "Q", "R", "S", "T",
                      "U", "V", "W", "X",
                      "Y", "Z", " "]
    let a = 0;
    //Vindt het enigma element waar A moet beginnen.
    const enigmaElement = document.querySelectorAll("#enigma td");
    for (let i = 0; i < enigmaElement.length; i++) {
        if (plaats == i){
            //Vult A tot en met [X] in.
            for (let j = i; j < enigmaElement.length; j++){
                enigmaElement[j].textContent = alphabet[a];
                a++;  
            }
        }
    }

    // Vult [X] tot en met spatie in vanaf het begin. 
    let b = a; 
    for (let l = 0 ; l < alphabet.length; l++){
        if (b !== alphabet.length){
            enigmaElement[l].textContent = alphabet[b];
            b++;
        }
    }
};

//Decodeer button click.
function decodeer () {
    console.log("decodeer")
};

//Verwijder button click
function verwijder () {
    this.parentNode.remove();
};