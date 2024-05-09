/** Retourne l'objet client trouvé dans le local storage (localStorage)
  * à l'aide de son nom (clientName)
  **/
function findClientInLS(localStorage, clientName){
  let client;
  for(let i=0; localStorage.getItem("client"+i); i++){
    client = JSON.parse(localStorage.getItem("client"+i));
    if(client!=null && client.name == clientName){
      return client;
    }
  }
  return null;
}

/** Edition et téléchargement du pdf d'une facture
  * à l'aide de son numéro de facture (numFact)
  **/
function downloadPDF(numFact){
  //Récupération de l'objet facture dans le LS avec le numéro
  //de facture en paramètre
  let myStorage = window.localStorage;
  let myFacture = JSON.parse(myStorage.getItem("facture"+numFact));

  //Retrouve les informations du client lié à la facture dans le LS
  let myClient = findClientInLS(localStorage, myFacture.client);
  if(myClient==null){
    console.log("pas de client du nom de " + myFacture.client);
    return;
  }

  //Formattage de la date du jour. ex : 2 avril 2021
  let dateFacturation = myFacture.dateFacturation;
  let factureTTC = myFacture.coutHT * 1.2;
  let factureHT = myFacture.coutHT;

  //Création du PDF et mise en page
  var doc = new jsPDF();
  doc.setFont("Corbel");
  doc.setFontType("normal");

  //PRESTATAIRE
  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text("Prestataire", 12, 24);

  doc.setFontSize(12);
  doc.text("Nom :", 20, 32);
  doc.setFontType("normal");
  doc.text("Flavie Tonon", 50, 32);
  doc.setFontType("bold");
  doc.text("N°SIREN :", 20, 39);
  doc.setFontType("normal");
  doc.text("123 456", 50, 39);
  doc.setFontType("bold");
  doc.text("Adresse :", 20, 46);
  doc.setFontType("normal");
  doc.text("3 rue de soleil", 50, 46);
  doc.text("97300 Cayenne", 50, 52);
  doc.setFontType("bold");
  doc.text("Téléphone :", 20, 59);
  doc.setFontType("normal");
  doc.text("0607080901", 50, 59);

  //CLIENT
  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text("Client", 120, 24);

  doc.setFontSize(12);
  doc.text("Nom :", 125, 32);
  doc.setFontType("normal");
  doc.text(myClient.name, 150, 32);
  doc.setFontType("bold");
  doc.text("N°SIREN :", 125, 39);
  doc.setFontType("normal");
  doc.text(myClient.siren, 150, 39);
  doc.setFontType("bold");
  doc.text("Adresse :", 125, 46);
  doc.setFontType("normal");
  doc.text(myClient.address1, 150, 46);
  doc.text(myClient.address2, 150, 52);
  doc.setFontType("bold");

  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text("Facture n°"+myFacture.numFact, 50, 100);

  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text("Objet : ", 20, 120);

  doc.setFontSize(12);
  doc.setFontType("normal");
  doc.text("Facture du " + myFacture.dateFacturation.toString() + " pour prestations " + myFacture.prestation + ".", 40, 120);
  
  doc.setFontSize(12);
  doc.setFontType("bold");
  doc.text("Intitulé", 20, 140);

  doc.setFontSize(12);
  doc.setFontType("bold");
  doc.text("Tarif HT (EUR)", 85, 140);

  doc.setFontSize(12);
  doc.setFontType("bold");
  doc.text("Tarif TTC (EUR)", 150, 140);

  doc.setLineWidth(0.3);
  doc.line(10, 145, 200, 145);

  doc.setFontSize(10);
  doc.setFontType("normal");
  doc.text(myFacture.prestation, 20, 155);

  doc.setFontSize(10);
  doc.setFontType("normal");
  doc.text(factureHT + "€", 85, 155);

  doc.setFontSize(10);
  doc.setFontType("normal");
  doc.text(factureTTC + "€", 150, 155);

  doc.setLineWidth(0.3);
  doc.line(10, 160, 200, 160);

  doc.save("facture"+numFact+".pdf");
  console.log("Téléchargement de la facture N°"+numFact + " du client "+ myFacture.client);
}
