document.getElementById('hamburgerIcon').addEventListener('click', function() {
    toggleSidePanel();
});

function toggleSidePanel() {
    var sidepanel = document.getElementById('sidepanel');
    if (sidepanel.style.width === '250px') {
        sidepanel.style.width = '0';
    } else {
        sidepanel.style.width = '250px';
    }
}
