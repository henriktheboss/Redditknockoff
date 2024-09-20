// function displayMessages() {
//     const chatroom = document.getElementById('chatroomName').textContent;

//     fetch('http://192.168.1.243:3000/getChatMessages', 
//     {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify({
//             chatroom: chatroom
//         })
//     })
        

//         .then(response => response.json())
//         .then(currentchatroom => {
//             const messageContainer = document.getElementById('messageContainer');
//             messageContainer.innerHTML = ''; // Clear previous content

//             currentchatroom.forEach(currentchatroom => {
//                 const pElement = document.createElement('p');
//                 pElement.textContent = `${currentchatroom.message}: ${currentchatroom.timestamp}: ${currentchatroom.profile}`;
//                 messageContainer.appendChild(pElement);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching messages:', error);
//         });
// }

// function displayMessages() {
//     fetch('http://localhost:3000/getChatMessages')
//         .then(response => response.json())
//         .then(messages => {
//             const messageContainer = document.getElementById('messageContainer');
//             messageContainer.innerHTML = ''; // Clear previous content

//             messages.forEach(message => {
//                 const pElement = document.createElement('p');
//                 pElement.textContent = `${message.date}: ${message.message}: ${message.bruker}`;
//                 messageContainer.appendChild(pElement);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching messages:', error);
//         });
// }



function displayMessages() {
    const chatroom = document.getElementById('chatroomName').textContent;

    fetch('http://192.168.1.243:3000/getMessages', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            chatroom: chatroom
        })
    })
    .then(response => response.json())
    .then(data => {
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.innerHTML = ''; // Clear previous content

        if (data.messages && Array.isArray(data.messages)) {
            data.messages.forEach(message => {
                const pElement = document.createElement('p');
                pElement.textContent = `${message.message}: ${message.timestamp}: ${message.profile}`;
                messageContainer.appendChild(pElement);
            });
        } else {
            const pElement = document.createElement('p');
            pElement.textContent = 'No messages found.';
            messageContainer.appendChild(pElement);
        }
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.innerHTML = '<p>Error fetching messages.</p>';
    });
}


setInterval(displayMessages, 5);
