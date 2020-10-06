const { ipcRenderer, remote } = require('electron')
var window = remote.getCurrentWindow()

function ipc(){
ipcRenderer.send('log-error', 'ça marche yes :)');
}

ipcRenderer.on('error-logged', (event, arg) => {
alert('Une erreur a été rencontrée. Consultez le terminal pour plus de détails.\n' + arg);
});

function closeWindow () {
ipcRenderer.send('closeWindow');
}

function minimizeWindow () {  
ipcRenderer.send('minimizeWindow');
}

function maximizeWindow () {
ipcRenderer.send('maximizeWindow');
}