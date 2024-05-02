"use strict";

//Als er op 'codeer tekst' geklikt wordt.
const button = document.getElementById("codeerButton");
button.addEventListener('click', buttonClick);

function buttonClick () { 
    const leesTekst = document.getElementById("tekst");
    const ingevuldeTekst = leesTekst.value;
    const codeVeld = document.getElementById("enigmaCodeVeld")
    //Als er tekst in het tekstveld staat 
    //En er is eerder gecodeerd.
    if (leesTekst.value !== "" && codeVeld !== null) {
        //Geeft class aan laatst gecodeerde tekst
        //En verwijderd id's.
        let tekstResultaat = document.getElementById("codeerDit");
        tekstResultaat.classList.add("vorigeTekst");
        tekstResultaat.id = "";
        codeVeld.id = "";
        codeVeld.classList.add("vorigeCodeVeld");
        //Roept functie aan met de ingevulde tekst.
        nieuwCodeVeld (ingevuldeTekst); 
    }
    //Als er tekst in het tekstveld staat.
    //En er nog niet eerder is gecodeerd.
    else if (leesTekst.value !== "") {        
        //Roept functie aan met de ingevulde tekst.
        nieuwCodeVeld (ingevuldeTekst); 
    //Als er geen tekst in het tekstveld staat.
    } else {
        alert("Vul eerst tekst in om te coderen.");
    }
};

//Maakt nieuw codeveld aan met gecodeerde tekst.
function nieuwCodeVeld (ingevuldeTekst){
    //Maakt nieuwe div waar tekst in komt te staan.
    const divTekstElement = document.createElement("div");
    divTekstElement.textContent = ingevuldeTekst;
    divTekstElement.id = "codeerDit";
    const parentTekstElement = document.getElementById("resultaat");
    parentTekstElement.appendChild(divTekstElement);
     //Maakt nieuwe div waar code in komt te staan.
    const divCodeElement = document.createElement("div");
    divCodeElement.id = "enigmaCodeVeld";
    const parentCodeElement = document.getElementById("resultaat");
    parentCodeElement.appendChild(divCodeElement);
//@@    //Maakt nieuwe div in div.
    // const buttonDiv = document.createElement("div");
    // buttonDiv.id("buttons")
    // const parentDivDiv = document.getElementById("enigmaCodeVeld");
    // parentDivDiv.appendChild(buttonDiv);
//@@    //Maakt nieuwe button in div.
    const buttonElement = document.createElement("button");
    let geselecteerdeKleur = sleutelKleur.value;
    let geselecteerdVak = sleutelPlek.value;
    let plaats = Number(geselecteerdeKleur) + Number(geselecteerdVak);
    buttonElement.classList.add(plaats);
    const parentButton = document.getElementById("buttons")
    parentButton.appendChild(buttonElement);
    
    //Roept functie aan met de ingevulde tekst.
    enigmaCode (ingevuldeTekst); 
};

//Vult het divElement 'enigmaCodeVeld' met de enigma code.
function enigmaCode (ingevuldeTekst) {
    const enigmaElement = document.getElementsByTagName("td");
    //Slaat ingevulde tekst als losse arrays op.
    const storeText = ingevuldeTekst.toUpperCase().split("");
    //Gaat alle bovenstaande arrays af
    //zoekt het juiste vak op om de bijbehorende css stijl 
    //te kopieren in het 'enigmaCodeVeld'.
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
