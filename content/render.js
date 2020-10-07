const { ipcRenderer, remote } = require('electron')
var window = remote.getCurrentWindow()
const titlebar = require('@treverix/custom-electron-titlebar')

function ipc_sendConsole(){
    var data = document.getElementById("textInput").value;
    if (!data) data = 'Nothing in input'
    ipcRenderer.send('log-ipc', data);
    alert('"' + data + '" has been sent in the node console!')
}
function ok(){
    var title = document.getElementById("titleInput").value;
    if (!title) title = 'New Title'
    ipcRenderer.send('update-title', title);
}