const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Lager array for å samle alle tasks som user legger til
let tasks = ["Buy Food", "Make Food", "Eat Food"];



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
  let today = new Date();
  // Lager dagen med full format
  var options = { weekday: 'long'};
  let day = new Intl.DateTimeFormat('en-US', options).format(today)
  // Printer ut day variabel på angit sted i ejs filen(template)
  res.render('list', {weekDay: day, newItems: tasks});
});

// Post req gir oss mulighet til å hente info fra nett siden til serveren. Det gjør vi under
// Vi henter info fra input feltet i ejs filen
app.post("/", (req,res)=>{
  let newTask = req.body.newTask;
  tasks.push(newTask);
  // Hvis vi skulle bruke res.render() hadde vi fått feil fordi res.render går gjennom alle templates på ejs filen og når res.render() fra
  // weekday blir kjørt har vi ikke klart newTask verdien. Derfor bruker vi res.redirect til home rout.
  res.redirect("/");
});

app.listen(3000, ()=>{
  console.log("server 3000");
});
