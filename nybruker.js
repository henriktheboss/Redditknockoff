// nybruker.js


function blockSpecialChar(e) {
    var k = e.key;
    return !(k === ' ');
}

function lagnybruker() {
    const brukernavn = document.getElementById('brukernavn').value;
    const passord = document.getElementById('passord').value;

    fetch('http://192.168.1.243:3000/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            brukernavn: brukernavn,
            passord: passord
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = "inxed.html"
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

