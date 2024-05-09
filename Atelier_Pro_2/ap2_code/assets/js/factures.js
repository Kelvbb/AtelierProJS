
/** Initialise le Local Storage
  * avec des factures prédéfinies dans factures_data.js
  **/
function populateStorageFactures(){
  var myfactures = JSON.parse(factures); //clients comes from clients.json
  var myStorage = window.localStorage;
  myStorage.setItem("nbFactures", 0);
  for(let i=0; i<myfactures.length; i++){
    myStorage.setItem("facture"+i, JSON.stringify(myfactures[i]));
    myStorage.setItem("nbFactures", JSON.parse(myStorage.getItem("nbFactures"))+1);
  }
}

/** Ecrit dans le document HTML la liste des factures récupérées dans le LS **/

function displayFacturesHTML(){
  let myStorage = window.localStorage;
  if(!myStorage.getItem("facture0")) {
    populateStorageFactures();
  }
  for(let i=0; myStorage.getItem("facture"+i); i++){
    let myfacture = JSON.parse(myStorage.getItem("facture"+i));

    document.write("<tr>");
    document.write("<th scope='row'>");
    document.write(myfacture.numFact);
    document.write("</th>");
    document.write("<td>");
    document.write(myfacture.client);
    document.write("</td>");
    document.write("<td>");
    document.write(myfacture.dateFacturation);
    document.write("</td>");
    document.write("<td>");
    document.write(myfacture.coutHT + "€");
    document.write("</td>");
    document.write("<td><a href='javascript:downloadPDF("+myfacture.numFact+")'>télécharger</a></td>");
    document.write("</tr>");
  }
}
/** Remet à zéro les inputs du formulaire d'ajout d'un client
  **/
function resetAddFactureForm(){
  document.getElementById("inputFactureClient").value = "";
  document.getElementById("inputFacturePrice").value = "";
  document.getElementById("inputFacturePresta").value = "";
}

/** Ajoute une facture dans le local storage, suite à la validation du formulaire
  **/
function addFacture(){
  
    var newFactureClient = document.getElementById("inputFactureClient").value;
    var newFacturePrice = document.getElementById("inputFacturePrice").value;
    var newFacturePresta = document.getElementById("inputFacturePresta").value;
    if(newFactureClient && newFacturePrice && newFacturePresta){
    document.getElementById("erreurFormFacture").style.display = "none";
    resetAddClientForm();
    var newFacture = {};
    newFacture.client = newFactureClient;
    newFacture.coutHT = newFacturePrice;
    newFacture.prestation = newFacturePresta;
    newFacture.dateFacturation = new Date().toLocaleDateString();
    
    let myStorage = window.localStorage;
    let nbFactures = JSON.parse(myStorage.getItem("nbFactures"));
    newFacture.numFact = nbFactures.toString();
    myStorage.setItem("facture"+nbFactures, JSON.stringify(newFacture));
    myStorage.setItem("nbFactures", nbFactures+1);
    location.reload();
  } else {
    document.getElementById("erreurFormFacture").innerText = "Veuillez remplir tous les champs.";
  }
}
