const { ipcRenderer, remote } = require('electron')
const titlebar = require('@treverix/custom-electron-titlebar')
var window = remote.getCurrentWindow()

function ipc_sendConsole(){
    var data = document.getElementById("textInput").value;
    if (!data) data = 'Nothing in input'
    ipcRenderer.send('log-ipc', data);
    alert('"' + data + '" has been sent in the node console!')
}
function changeMenubarColor(){
    var data = document.getElementById("colorInput").value;
    if (!data) data = '#2f3241'
    console.log(data)
    titlebar.updateBackground(titlebar.Color.fromHex(data));
}
