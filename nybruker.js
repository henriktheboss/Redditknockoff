// nybruker.js

function lagnybruker() {
    var username = document.getElementById('brukernavn').value;
    var password = document.getElementById('passord').value;

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
        window.location.href = "inxed.html"
        alert("New account created")
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the error as needed
    });
}
