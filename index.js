const exp = require("constants");
const expressModul = require("express");
const path = require("path");
const sqliteModul = require("sqlite3").verbose();
const fs = require('fs');

const applikasjon = expressModul(); //express modul instans
const portNummer = 3000;

applikasjon.use(expressModul.json());    //tolk forespørsler som json
applikasjon.use(expressModul.static(__dirname)); //hoste static filer

//hente database
let database = new sqliteModul.Database("brukere.db", function(feilmelding){
    if(feilmelding){
        console.error(feilmelding.message); //viser error om noe er galt
    }
    console.log("Database funnet :)");
});

applikasjon.get("/", function(foresporsel, respons){
    respons.sendFile(path.join(__dirname,"login.html"));
});

function createDatabase() {
    let database = new sqliteModul.Database("brukere.db", function(feilmelding){
        if(feilmelding){
            console.error(feilmelding.message); //viser error om noe er galt
        }
    });

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

function createChatroomTable() {
    let database = new sqliteModul.Database("brukere.db", function(feilmelding){
        if(feilmelding){
            console.error(feilmelding.message);
            return;
        }
    });

    // Create table if not exists
    database.run(`CREATE TABLE IF NOT EXISTS chatroom (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        username TEXT
    )`, function(err) {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table 'chatroom' created successfully");
        }
    });

    database.close();
}

// Call the function to create the chatroom table
createChatroomTable();

applikasjon.post("/", function(foresporsel,respons){
    let sqlSporring = "SELECT * FROM bruker WHERE brukernavn = ? AND passord = ?"; // ? placeholders for parameter
    let parameter = [foresporsel.body.brukernavn, foresporsel.body.passord];
    
    database.get(sqlSporring,parameter, function(feilmelding, rad){
        if(feilmelding){
            respons.status(400).json({"Feilmelding":feilmelding.message});
            return;
        }
        if(rad){
            respons.json({
                "melding":"suksess",
                "data": rad
            });
        }
        else{
            respons.status(400).json({
                "feilmelding":"Feil brukernavn eller passord"
            });
        }
    });
});

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


applikasjon.post("/addChatRoom", function(foresporsel, respons){
    let sqlSporring = "INSERT INTO chatroom (name, description, username) VALUES (?, ?, ?)";
    let parameter = [foresporsel.body.name, foresporsel.body.description, foresporsel.body.username];
    
    database.run(sqlSporring, parameter, function(feilmelding){
        if(feilmelding){
            respons.status(400).json({"Feilmelding":feilmelding.message});
            return;
        }
        
        respons.json({
            "melding":"chat room lagt til",
            "name": foresporsel.body.name,
            "description": foresporsel.body.description,
            "username": foresporsel.body.description
        });
    });
});

function generateHTMLFromDatabase(database) {
    // Fetch data from database
    database.all("SELECT name FROM chatroom", function(err, rows) {
        if (err) {
            console.error("Error fetching data from database:", err.message);
            return;
        }
        rows.forEach(row => {
            const chatroomName = row.name;
            const fileName = 'chatRoom/' + chatroomName.toLowerCase().replace(/\s+/g, '_') + '.html'; // Generate file name from chatroom name
            const htmlContent =` <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>NexusVibe</title>
                <link rel="stylesheet" href="../index.css">
                <link rel="stylesheet" href="../chatRoom.css">
            </head>
            <body>
                <div class="topnav">
                    <a><img src="../bilder/462145.webp" class="hamburgerMenu" id="hamburgerIcon"></a>
                    <a id="chatroomName" class="reddit">${chatroomName}</a>
                    <a class="profil" id="profil">Profil</a>
                </div>
            
                <div class="profil-sidepannel" id="profil-sidepannel">
                    <a href="javascript:void(0)" class="closebtn" onclick="toggleProfilSidepannel()">&times;</a>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="../login.html">log out</a>
                </div>
                
                <div class="sidepanel" id="sidepanel">
                    <a href="javascript:void(0)" class="closebtn" onclick="toggleSidePanel()">&times;</a>
                    <a href="../CreatChatRoom.html">Ny chat room</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            
                <div class="text-feild">
                    <a><input id="message" class="textarea" type="text"></a>
                    <a><img onclick="send_message()" class="send-knapp" src="../bilder/images.png"></a>
                </div>
                <script src="../burgermenu.js"></script>
                <script src="../current_user.js"></script>
                <script src="../send-melding.js"></script>
            </body>
            </html>
            
            `;

            let createTableSql = `CREATE TABLE IF NOT EXISTS ${chatroomName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                message TEXT,
                timestamp TEXT,
                profile TEXT
            )`;

            database.run(createTableSql, function(err) {
                if (err) {
                    console.error(`Error creating table for ${chatroomName}:`, err.message);
                    return;
                }
            });

            // Check if file already exists
            fs.access(fileName, fs.constants.F_OK, (err) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        // File does not exist, create it
                        fs.writeFile(fileName, htmlContent, function(err) {
                            if (err) {
                                console.error("Error writing HTML file:", err.message);
                            } else {
                                console.log(`HTML file ${fileName} created successfully`);
                            }
                        });
                    } else {
                        console.error("Error accessing file:", err.message);
                    }
                } else {
                    //hei
                }
            });
        });
    });
}

applikasjon.post("/chatRoom", function(foresporsel, respons) {
    let currentchatroom = foresporsel.body.chatroom;
    let sqlSporring = `INSERT INTO ${currentchatroom} (message, timestamp, profile) VALUES (?, ?, ?)`;
    let parameter = [foresporsel.body.message, foresporsel.body.timestamp, foresporsel.body.profile];

    database.run(sqlSporring, parameter, function(feilmelding) {
        if (feilmelding) {
            return respons.status(400).json({ "Feilmelding": feilmelding.message });
        }

        respons.json({
            "melding": "Melding lagt til",
            "message": foresporsel.body.message,
            "timestamp": foresporsel.body.timestamp,
            "profile": foresporsel.body.profile,
            "chatroom": currentchatroom
        });
    });
});
setInterval(() => generateHTMLFromDatabase(database),100);

applikasjon.listen(portNummer,function(){
    console.log(`Server åpen på http://localhost:${portNummer}`);
});
