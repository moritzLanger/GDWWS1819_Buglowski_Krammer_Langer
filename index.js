const express = require('express');
const app = express();
var fs = require("fs");
var content = fs.readFileSync("festivals.json");
const jsonFestivals = JSON.parse(content);

app.use(express.json());


app.get('/',(req,res) => {
    res.send('Festivalsapp:\n'+
    '<form action="http://localhost:3000/festivals" method="GET"><button>Festivals</button>'+
    '<br><form action="http://localhost:3000/festivals/festivalid=1" method="GET"><button>Festival nr 1</button>');
});

app.get('/festivals', (req,res) => {
    res.json(jsonFestivals);

});

app.get('/festivals/:festivalid',(req,res) => {
    //const festival = jsonFestivals.id.find(f => f.id === parseInt(req.params.festivalid));
    //if (!festival) res.status(404).send('Ein Festival mit dieser ID konnte nicht gefunden werden.')

    res.send(
        '<h3>Willkommen auf der Seite des Festivals:</h3>'
        + '<h2>' + jsonFestivals[req.params.festivalid-1].name + '</h2>' 
        + '<p>Genre:'
        + jsonFestivals[req.params.festivalid-1].genre + '<p>'
        + '<br>Beschreibung:<br>'
        + '<p>' + jsonFestivals[req.params.festivalid-1].info + '<p>'  
        +'<br><form action="http://localhost:3000" method="GET"><button>Home</button>'
        );
});

app.post('festivals/:festivalid/bewertungen',(req,res) => {

});

app.get('festivals/:genre',(req,res) => {

});

app.get('festivals/:ort',(req,res) => {

});

app.listen(3000, () => console.log('Programm gestartet auf Port 3000'))