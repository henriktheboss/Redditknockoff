function displayMessages() {
    const chatroom = document.getElementById('chatroomName').textContent;

    fetch('http://localhost:3000/getChatMessages', 
    {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            chatroom: chatroom
        })
    })
        

        .then(response => response.json())
        .then(currentchatroom => {
            const messageContainer = document.getElementById('messageContainer');
            messageContainer.innerHTML = ''; // Clear previous content

            currentchatroom.forEach(currentchatroom => {
                const pElement = document.createElement('p');
                pElement.textContent = `${currentchatroom.message}: ${currentchatroom.timestamp}: ${currentchatroom.profile}`;
                messageContainer.appendChild(pElement);
            });
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
}

window.addEventListener('load', displayMessages);