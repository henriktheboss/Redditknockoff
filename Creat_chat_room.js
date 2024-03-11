const exp = require("constants")
const expressModul = require("express")
const path = require("path")
const sqliteModul = require("sqlite3").verbose()

const applikasjon = expressModul() //express modul instans
const portNummer = 3000

applikasjon.use(expressModul.json())    //tolk forespørsler som json
applikasjon.use(expressModul.static(__dirname)) //hoste static filer

//hente database
let database = new sqliteModul.Database("brukere.db", function(feilmelding){
    if(feilmelding){
        console.error(feilmelding.message) //viser error om noe er galt
    }
    console.log("Database funnet :)")
})

applikasjon.get("/", function(foresporsel, respons){
    respons.sendFile(path.join(__dirname,"login.html"))
})

function createDatabase() {
    let database = new sqliteModul.Database("brukere.db", function(feilmelding){
        if(feilmelding){
            console.error(feilmelding.message) //viser error om noe er galt
        }
    })

    // Create table if not exists
    database.run(`CREATE TABLE IF NOT EXISTS bruker (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brukernavn TEXT,
        passord TEXT
    )`, function(err) {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table 'bruker' created successfully");
        }
    });

    database.close();
}

// Call the function to create the database
createDatabase();

applikasjon.post("/", function(foresporsel,respons){
    let sqlSporring = "SELECT * FROM bruker WHERE brukernavn = ? AND passord = ?" // ? placeholders for parameter
    let parameter = [foresporsel.body.brukernavn, foresporsel.body.passord]
    
    database.get(sqlSporring,parameter, function(feilmelding, rad){
        if(feilmelding){
            respons.status(400).json({"Feilmelding":feilmelding.message})
            return
        }
        if(rad){
            respons.json({
                "melding":"suksess",
                "data": rad
            })
        }
        else{
            respons.status(400).json({
                "feilmelding":"Feil brukernavn eller passord"
            })
        }
    })
})



applikasjon.listen(portNummer,function(){
    console.log(`Server åpen på http://localhost:${portNummer}`)
})

// Your existing server-side script

applikasjon.post("/addUser", function(foresporsel, respons){
    let sqlSporring = "INSERT INTO bruker (brukernavn, passord) VALUES (?, ?)";
    let parameter = [foresporsel.body.brukernavn, foresporsel.body.passord];
    
    database.run(sqlSporring, parameter, function(feilmelding){
        if(feilmelding){
            respons.status(400).json({"Feilmelding":feilmelding.message});
            return;
        }
        
        respons.json({
            "melding":"Bruker lagt til",
            "brukernavn": foresporsel.body.brukernavn,
            "passord": foresporsel.body.passord
        });
    });
});
