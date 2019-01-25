const express = require('express');
const app = express();
var fs = require("fs");
var content = fs.readFileSync("festivals.json");
var json = JSON.parse(content);
var json2html = require('node-json2html'); // npm install node-json2html
app.use(express.json());


app.get('/',(req,res) => {
    var html = fs.readFileSync('./start.html', 'utf8');
    res.send(html);
});

app.get('/festivals', (req,res) => {
    var transform = {'<>':'div','text':'${name} | ${info} | ${ort} | ${genre} '};
    var html = json2html.transform(json.response.festivals,transform);
    res.send(html);

});
    
app.get('/festivals/:festivalid',(req,res) => {
    //const festival = jsonFestivals.id.find(f => f.id === parseInt(req.params.festivalid));
    //if (!festival) res.status(404).send('Ein Festival mit dieser ID konnte nicht gefunden werden.')

    res.send(
        '<h3>Willkommen auf der Seite des Festivals:</h3>'
        + '<h2>' + json.response.festivals[req.params.festivalid-1].name + '</h2>' 
        + '<p>Genre:'
        + json.response.festivals[req.params.festivalid-1].genre + '<p>'
        + '<p>Ort:'
        + json.response.festivals[req.params.festivalid-1].ort + '<p>'
        + '<br>Beschreibung:<br>'
        + '<p>' + json.response.festivals[req.params.festivalid-1].info + '<p>'  
        +'<br><form action="http://localhost:3000" method="GET"><button>Home</button>');
});

app.post('festivals/:festivalid/bewertungen',(req,res) => {
    
});
app.get('/festivals/genre/:genreid', (req,res) => {
    var ergebnis = [];
          var result = json.response.festivals.filter(function(item) {
            return item.genre === cap1(req.params.genreid)
          });
          
          //for(i = 0; i < result.length; i++){
          //    ergebnis.push(result[i].name);
          //}
         var transform = {'<>':'div','text':'${name} | ${info} | ${ort}'};
         var html = json2html.transform(result,transform);
         res.send('<h2>Genre: '+ cap1(req.params.genreid)+'</h2>'+html);
    });

app.get('festivals/ort/:ortid',(req,res) => {

});

app.listen(3000, () => console.log('Programm gestartet auf Port 3000'))

function cap1(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}