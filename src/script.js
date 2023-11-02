console.log('Script');

const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');

// Escuchar eventos de clic en los botones y enviarlos al proceso principal
backButton.addEventListener('click', () => {
    console.log('click go back');
    window.ipcRenderer.send('go-back');
});

forwardButton.addEventListener('click', () => {
    console.log('click go forward');
    window.ipcRenderer.send('go-forward');
});