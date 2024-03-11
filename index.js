const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const application = express(); // Express module instance
const portNumber = 3000;

application.use(express.json()); // Parse requests as JSON
application.use(express.static(__dirname)); // Host static files

// Function to create the database and tables
function createDatabase() {
    let database = new sqlite3.Database("brukere.db", function(error){
        if(error){
            console.error(error.message); // Display error if something goes wrong
        }
    });

    // Create the 'bruker' table if it doesn't exist
    database.run(`CREATE TABLE IF NOT EXISTS bruker (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brukernavn TEXT,
        passord TEXT
    )`, function(err) {
        if (err) {
            console.error("Error creating table 'bruker':", err.message);
        } else {
            console.log("Table 'bruker' created successfully");
        }
    });

    // Create the 'chatRoom' table if it doesn't exist
    database.run(`CREATE TABLE IF NOT EXISTS chatRoom (
        RoomID INTEGER PRIMARY KEY AUTOINCREMENT,
        RoomName TEXT,
        Description TEXT,
        CreatorUserID INTEGER,
        FOREIGN KEY(CreatorUserID) REFERENCES bruker(id)
    )`, function(err) {
        if (err) {
            console.error("Error creating table 'chatRoom':", err.message);
        } else {
            console.log("Table 'chatRoom' created successfully");
        }
    });

    database.close();
}

// Call the function to create the database and tables
createDatabase();

application.get("/", function(request, response){
    response.sendFile(path.join(__dirname,"login.html"));
});

application.listen(portNumber,function(){
    console.log(`Server is running on http://localhost:${portNumber}`);
});

application.post("/", function(request,response){
    let sqlQuery = "SELECT * FROM bruker WHERE brukernavn = ? AND passord = ?"; // Using ? placeholders for parameters
    let parameters = [request.body.brukernavn, request.body.passord];
    
    database.get(sqlQuery, parameters, function(error, row){
        if(error){
            response.status(400).json({"error":error.message});
            return;
        }
        if(row){
            response.json({
                "message":"success",
                "data": row
            });
        }
        else{
            response.status(400).json({
                "error":"Incorrect username or password"
            });
        }
    });
});

application.post("/addUser", function(request, response){
    let sqlQuery = "INSERT INTO bruker (brukernavn, passord) VALUES (?, ?)";
    let parameters = [request.body.brukernavn, request.body.passord];
    
    database.run(sqlQuery, parameters, function(error){
        if(error){
            response.status(400).json({"error":error.message});
            return;
        }
        
        response.json({
            "message":"User added",
            "brukernavn": request.body.brukernavn,
            "passord": request.body.passord
        });
    });
});
