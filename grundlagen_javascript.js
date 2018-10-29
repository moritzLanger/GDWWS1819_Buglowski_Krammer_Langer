/* Grundlagen des Web, Uebungsblatt 1, Aufgabe 1*/
//console.clear();
//console.log("Moritz/Dave/Pete"); // Ausgabe mit meinem Namen

/* Grundlagen des Web, Uebungsblatt 1, Aufgabe 2*/
// const maxBewertung = 5; // Maximale Bewertung, hier 5
// let anzahlBewertung = 560; // Anzahl der Bewertungen
// let aktuelleBewertung = 4.3;  // Aktuelle Bewertung
//
// const ausgabe = function (maxBewertung, anzahlBewertung, aktuelleBewertung) // Erstellen einer Methode  mit dem Namen Ausgabe, die alle 3 werte ausgibt
// {console.log("\n Bestmögliche Bewertung in Nummern: " + maxBewertung); //Ausgabe der Maximalen Bewertungen
// console.log("\n Anzahl der Bewertungen: " + anzahlBewertung ); // Ausgabe der Anzahl der Bewertungen
// console.log("\n Aktuelle Bewertung: " + aktuelleBewertung); // Ausgaber der Aktuellen Bewertung
// }

//anderer Typ für die Variable
//let aktAnzBew = 0;
//SyntaxError: Identifier 'aktAnzBew' has already been declared

//Konstante neuer Wert
//maxH = 3;
//TypeError: Assignment to constant variable.

/* Grundlagen des Web, Uebungsblatt 1, Aufgabe 3*/
// readline modul

// const bewerten = function(){
//     const readline = require("readline");
//     const rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout
//           })
// rl.question("Bitte Bewertung eingeben: ", function(eingabe){ // Frage und eingabe
// if (eingabe <= 5 && eingabe >= 0){ //UEberprüfung der Richtigkeit der Eingabe
//       anzahlBewertung++;
//       aktuelleBewertung = eingabe;
//       ausgabe(maxBewertung, anzahlBewertung, aktuelleBewertung);
//     }
//       else {
//         console.log("Bitte geben sie eine Zahl zwischen 0 & 5 ein.");}  // Fehlermeldung falls die Eingabe falsch war
//         rl.close();
//     })
// }
//
//
// /* Grundlagen des Web, Uebungsblatt 1, Aufgabe 4*/
// const berechnen = function(){
//     var n = Math.floor(Math.random() * 10); // Random Zahl bis 10
//     console.log(n);
//     for(i=0; i <= n; i++){
//         var bew = Math.floor(Math.random() * 5); //Random Zahl bis 5
//         anzahlBewertung++;
//         aktuelleBewertung = bew;
//         ausgabe(maxBewertung, anzahlBewertung, aktuelleBewertung)
//     }
// }
// bewerten();
//berechnen();


/************************************************************************************************************************************************
*************************************************************************************************************************************************/


//Aufgabenblatt2
// Aufgaben 1-3

function ratings (name,bewanzahl,letztebew){
this.name = name;
this.bewanzahl = bewanzahl;
this.letztebew = letztebew;


var bewArray= [];
this.bewArray= bewArray;


var that = this;


this.hinzufuegen = function(i,callback1){
  readline = require('readline'); // realine2 für mehrfache Einhgabe
   rl2 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
  });
  console.log(that.bewArrayinstanceof Array);
  rl2.question("Bitte Bewertung eingeben: ",function(answer){

  if(answer >=1 && answer <=5){ // nur Zahlen zwischen 1 & 5

        that.ratingsarray.push(answerbew); //Bewertung wird dem Array hinzugefügt
        i++
          if(i==that.bewanzahl){
            that.bewerten();
            console.log(that.ratingsarray[0]);
            return rl2.close();

            }//rl.close();
        rl2.close();
        callback1(i,that.hinzufuegen);

  }else {
        console.log("Bitte geben sie eine Zahl zwischen 0 & 5 ein.");
        rl2.close();
        callback1(i,that.hinzufuegen);
        }
  });

};
this.bewerten = function(){
  let gesammtrating =0;
  console.log(that.ratingsarray[1]);
  for(let i = 0;i<that.bewanzahl;i++){ // array durchlauf
  gesammtrating = parseInt(gesammtrating)+parseInt(that.ratingsarray[i]); // alle ratings addieren
}
console.log( gesammtrating);
};
};

var test1 = new ratings("Bewertung 1 ",7,4);
test1.hinzufuegen(0,test1.hinzufuegen);


const ausgabe2 = function(){
  console.log(test1.name)
  console.log(test1.bewerten())
}

//ausgabe2();

//Aufgabe 4
// const hello = "hello";
// const connect1=()=>{const world = "world"
// console.log( (hello+world));
// return connect2(world);
// };
// const connect2=(world)=>{
// console.log((world+hello));
// };
//connect1();
