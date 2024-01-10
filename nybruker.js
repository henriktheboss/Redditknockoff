// nybruker.js

function lagnybruker() {
    var username = document.getElementById('nybrukernavn').value;
    var password = document.getElementById('nypassord').value;

    // Make an HTTP request to the server-side endpoint for adding a new user
    fetch('http://localhost:3000/addUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ brukernavn: username, passord: password }),
})

    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the response as needed
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the error as needed
    });
}
