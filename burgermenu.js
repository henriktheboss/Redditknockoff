document.getElementById('hamburgerIcon').addEventListener('click', function() {
    toggleSidePanel();
});

document.getElementById('profil').addEventListener('click', function() {
    toggleProfilSidepannel();
});

function toggleSidePanel() {
    var sidepanel = document.getElementById('sidepanel');
    if (sidepanel.style.width === '250px') {
        sidepanel.style.width = '0';
    } else {
        sidepanel.style.width = '250px';
    }
}


function toggleProfilSidepannel() {
    var sidepanel = document.getElementById('profil-sidepannel');
    if (sidepanel.style.width === '250px') {
        //sidepanel.style.width = '0';
    } else {
        sidepanel.style.transition = 'all 0.5s ease-in-out'
        sidepanel.style.transform = "translateX(0px)"
    }
}
