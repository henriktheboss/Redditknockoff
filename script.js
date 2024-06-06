function blockSpecialChar(e) {
    var k = e.key;
    return !(k === ' ');
}

async function login(){
    const brukernavn = document.getElementById("brukernavn").value
    const passord = document.getElementById("passord").value

    const respons = await fetch("/login",{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({brukernavn,passord})
    })

    if(respons.ok){
        //(const data = respons.json()
        window.location.href = "inxed.html"
    }
    else{
        const data = await respons.json()
        document.getElementById("feilmelding").textContent = data.feilmelding;
    }
}