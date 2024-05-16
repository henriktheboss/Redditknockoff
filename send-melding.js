function send_message() {
    const profile = localStorage.getItem('loggedinBruker');
    const message = document.getElementById("message").value;
    const chatroom = document.getElementById('chatroomName').textContent;
    const timestamp = new Date().toLocaleString();
    console.log(chatroom);

    fetch(`http://localhost:3000/chatRoom`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            profile: profile,
            message: message,
            timestamp: timestamp,
            chatroom: chatroom
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log("Message sent successfully");
        return response.json();
    })
    .then(data => {
        // Handle the response data here if needed
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
}
