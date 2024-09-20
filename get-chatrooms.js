function displayChatrooms() {
    fetch('http://192.168.1.243:3000/chatrooms')
    .then(response => response.json())
    .then(data => {
        const chatroomContainer = document.getElementById('chatroomContainer');
        chatroomContainer.innerHTML = ''; // Clear previous content

        if (data.chatrooms && Array.isArray(data.chatrooms)) {
            data.chatrooms.forEach(chatroom => {
                const pElement = document.createElement('p');
                pElement.className = "chatroomBox"
                pElement.textContent = `Name: ${chatroom.name} Creator ${chatroom.username}`;
                chatroomContainer.appendChild(pElement);
            });
        } else {
            const pElement = document.createElement('p');
            pElement.textContent = 'No chatrooms found.';
            chatroomContainer.appendChild(pElement);
        }
    })
    .catch(error => {
        console.error('Error fetching chatrooms:', error);
        const chatroomContainer = document.getElementById('chatroomContainer');
        chatroomContainer.innerHTML = '<p>Error fetching chatrooms.</p>';
    });
}


setInterval(displayChatrooms, 5);