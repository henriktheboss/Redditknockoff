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
    respons.sendFile(path.join(__dirname,"index.html"))
})

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








