const { ipcRenderer, remote } = require('electron')
var window = remote.getCurrentWindow()
const titlebar = require('custom-electron-titlebar')

function ipc(){
    var data = document.getElementById("textInput").value;
    if (!data) data = 'Nothing in input'
    ipcRenderer.send('log-ipc', data);
    alert('"' + data + '" has been sent in the node console!')
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