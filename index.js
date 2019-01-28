const express = require('express'); // npm install express
const app = express();
var fs = require("fs"); // npm install fs
var content = fs.readFileSync("festivals.json");
var json = JSON.parse(content);
var json2html = require('node-json2html'); // npm install node-json2html
app.use(express.json());
const geolib = require("geolib"); // npm install geolib
const request = require('request'); // npm install request


app.get('/',(req,res) => {
    var html = fs.readFileSync('./start.html', 'utf8');
    res.send(html);
});

app.get('/festivals', (req,res) => {
    var transform = {'<>':'li','html':'<b>${name}</b><br>'
                +'<div style="margin-left: 25px;">${ort}<br>'
                +'${genre}<br><br>'
                +'${info}<br><br></div>'};
    var html = json2html.transform(json.response.festivals,transform);
    res.send(html);

});
    
app.get('/festivals/:festivalid',(req,res) => {

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


app.get('/festivals/genre/:genreid', (req,res) => {
    var ergebnis = [];
          var result = json.response.festivals.filter(function(item) {
            return genreCheck(item.genre,cap1(req.params.genreid)) === cap1(req.params.genreid)
          });
          
       
         var transform = {'<>':'li','html':'<b>${name}</b><br>'
                +'<div style="margin-left: 25px;">${ort}<br>'
                +'${genre}<br><br>'
                +'${info}<br><br></div>'};
         var html = json2html.transform(result,transform);
         res.send('<h2>Genre: '+ cap1(req.params.genreid)+'</h2>'+html);
});

app.get('/festivals/ort/:ortid',(req,res) => {
    
    var apiKey = "4ea0c2dcb6e0eea4b9bfaaf34d693a36";
    var city = "Miltenberg";
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    var array = json.response.festivals;
   

    request(url, function (err, response, body) {
        if(err) console.log('error:', error);
        
        else {
            var cordinate = JSON.parse(body)
            let message = `Longitude: ${cordinate.coord.lon}  Latitude: ${cordinate.coord.lat}`;
            console.log(message);
            const sortedarrays = array.sort((o1, o2) =>{
                o1.distanz = geolib.convertUnit('km', geolib.getDistance({latitude: cordinate.coord.lat, longitude: cordinate.coord.lon}, {latitude: o1.lat, longitude: o1.lon}), 2);
                o2.distanz = geolib.convertUnit('km', geolib.getDistance({latitude: cordinate.coord.lat, longitude: cordinate.coord.lon}, {latitude: o2.lat, longitude: o2.lon}), 2); 
                if(o1.distanz < o2.distanz) return -1;
                else return 1;
            });
                var distanz = geolib.getDistance({latitude: cordinate.coord.lat, longitude: cordinate.coord.lon}, {latitude: cordinate.coord.lat, longitude: cordinate.coord.lon});
                console.log(array);
                var transform = {'<>':'li','html':'<b>${name}</b><br>'
                                +'<div style="margin-left: 25px;">${ort}<br>'
                                +'${genre}<br><br>'+'Distanz von ihrem Standpunkt: ${distanz}km<br><br> '
                                +'${info}<br><br></div>'};
                var html = json2html.transform(array,transform);
                res.send('<h2>Standort: '+ cap1(req.params.ortid)+'</h2>'+html);
            
        }
    });
    
  
});

            

function cap1(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function genreCheck(genstr,reqstr) {
    var count = genstr.split("/").length;
    if(!count == 0){
        for(i = 0; i < count; i++){
            if(genstr.split("/")[i] == reqstr){
            return genstr.split("/")[i];
            i=count;  
            }
        }   
    }else{
     return genstr;   
    }
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Programm gestartet auf Port ${port}...`));
