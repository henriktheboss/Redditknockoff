const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('brukere.db');

async function lagnybruker() {
    const brukernavn = document.getElementById("nybrukernavn").value;
    const passord = document.getElementById("nypassord").value;

    if (brukernavn && passord) {
        // Insert data into the SQLite database
        db.run('INSERT INTO brukere (brukernavn, passord) VALUES (?, ?)', [brukernavn, passord], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`A new user with ID ${this.lastID} has been added to the database.`);
        });
    } else {
        console.log("Please fill in both username and password.");
    }
}

// Close the database connection when the script is terminated
process.on('exit', () => {
    db.close();
});
