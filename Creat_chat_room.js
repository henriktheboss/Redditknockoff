function cancelForm()
{
    window.location.href = "inxed.html";
}

function blockSpecialChar(e) {
    var k = e.key;
    return !(k === ' ' || k === '-');
}

function LagNyChatRoom() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const username = localStorage.getItem('loggedinBruker')

    // Send data to server
    fetch('http://localhost:3000/addChatRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name :name, description :description, username: username })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the response as needed
        //window.location.href = "inxed.html"
        alert("New chat room created")
        window.location.href = "/chatRoom/" + name + ".html" ;
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the error as needed
    });
   
}

