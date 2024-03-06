let currentUser = ""

let profil = document.getElementById("profil");

function setCurrentUser() {   
    const usernameInput = document.getElementById("brukernavn");
    console.log('Here is the input', usernameInput)

    currentUser = usernameInput.value;
    localStorage.setItem('loggedinBruker', currentUser)
    console.log(currentUser)
}

profil.textContent = currentUser;
profil.textContent = localStorage.getItem('loggedinBruker')
//profilloggedIn = localStorage.getItem(currentUser)