/** Initialise le Local Storage
  * avec des clients prédéfinis dans clients_data.js
  **/
function populateStorageClients(){
  var myclients = JSON.parse(clients); //clients comes from clients.json
  var myStorage = window.localStorage;
  myStorage.setItem("nbClients", 0);
  for(let i=0; i<myclients.length; i++){
    myStorage.setItem("client"+i, JSON.stringify(myclients[i]));
    myStorage.setItem("nbClients", JSON.parse(myStorage.getItem("nbClients"))+1);
  }
}

/** Ecrit dans le document HTML la liste des clients récupérés dans le LS
  **/
function displayClientsHTML(){
  let myStorage = window.localStorage;
  if(!myStorage.getItem("client0")) {
    populateStorageClients();
  }
  for(let i=0; myStorage.getItem("client"+i); i++){
    let myclient = JSON.parse(myStorage.getItem("client"+i));
    document.write("<div class='card'>");
    document.write("<div class='card-header' id='heading"+i+"'>");
    document.write("<h5 class='mb-0'>");
    document.write("<button class='btn btn-link collapsed' data-toggle='collapse' data-target='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>");
    document.write(myclient.name);
    document.write("</button></h5></div>");
    document.write("<div id='collapse"+i+"' class='collapse' aria-labelledby='heading"+i+"' data-parent=''#accordion'>");
    document.write("<div class='card-body text-left'>");
    document.write("<dl class='list-group list-group-flush'>");
    document.write("<dt class='list-group-item'>Nom</dt> <dd>"+myclient.name+"</dd>");
    document.write("<dt class='list-group-item'>Numéro SIREN</dt> <dd>"+myclient.siren+"</dd>");
    document.write("<dt class='list-group-item'>Adresse</dt> <dd>"+myclient.address1+", "+myclient.address2+"</dd>");
    document.write("</dl></div></div></div>")
  }
}
/** Ecrit dans le document HTML la liste des noms des clients
  * récupérés dans le LS pour la liste déroulante dans le formulaire
  * d'édition d'une nouvelle facture
  **/
function displayClientsNamesOptionHTML(){
  let myStorage = window.localStorage;
  if(!myStorage.getItem("client0")) {
    populateStorageClients();
  }
  for(let i=0; myStorage.getItem("client"+i); i++){
    let myclient = JSON.parse(myStorage.getItem("client"+i));
    document.write("<option value='"+myclient.name +"'>"+myclient.name+"</option>");
  }

}
/** Remet à zéro les inputs du formulaire d'ajout d'un client
  **/
function resetAddClientForm(){
  document.getElementById("inputClientName").value = "";
  document.getElementById("inputClientAddress1").value = "";
  document.getElementById("inputClientAddress2").value = "";
  document.getElementById("inputClientSiren").value = "";
}

/** Ajoute un client dans le local storage, suite à la validation du formulaire
  **/
function addClient(){
    var newClientName = document.getElementById("inputClientName").value;
    var newClientAddress1 = document.getElementById("inputClientAddress1").value;
    var newClientAddress2 = document.getElementById("inputClientAddress2").value;
    var newClientSIREN = document.getElementById("inputClientSiren").value;
    if(newClientName && newClientAddress1 && newClientAddress2 && newClientSIREN){
    document.getElementById("erreurFormClient").style.display = "none";
    resetAddClientForm();
    var newClient = {};
    newClient.name = newClientName;
    newClient.siren = newClientSIREN;
    newClient.address1 = newClientAddress1;
    newClient.address2 = newClientAddress2;

    let myStorage = window.localStorage;
    let nbClients = JSON.parse(myStorage.getItem("nbClients"));
    myStorage.setItem("client"+nbClients, JSON.stringify(newClient));
    myStorage.setItem("nbClients", nbClients+1);
    location.reload();
  } else {
    document.getElementById("erreurFormClient").innerText = "Veuillez remplir tous les champs.";
  }
}
