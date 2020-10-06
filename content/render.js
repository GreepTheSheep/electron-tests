const { ipcRenderer, remote } = require('electron')
var window = remote.getCurrentWindow()

// ipcRenderer.on('ipc-return', (event, arg) => {
//     alert(arg);
// });

function ipc(){
    var data = document.getElementById("textInput").value;
    if (!data) return alert('Enter data!')
    ipcRenderer.send('log-ipc', data);
}

function closeWindow () {
    ipcRenderer.send('closeWindow');
}

function minimizeWindow () {  
    ipcRenderer.send('minimizeWindow');
}

function maximizeWindow () {
    ipcRenderer.send('maximizeWindow');
}