const { app, BrowserWindow, ipcMain } = require('electron')
const contextMenu = require('electron-context-menu');
const path = require('path')
require('@treverix/remote/main').initialize()

const dispose = contextMenu();
dispose();

contextMenu({
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: '🌈 Rainbow',
			// Only show it when right-clicking images
			visible: params.mediaType === 'image'
		},
  ],
  labels: {
    copy: '📝 Copy',
    paste: `📝 Paste`,
    inspect: '👓 Inspect',
    saveImageAs: '💾 Save img',
    searchWithGoogle : '🔎 Search Google for “{selection}”'
	}
});

function createWindow () {
  // Create the browser window.
    const window = new BrowserWindow({
      icon: 'build/icon.png',
      title: 'Greep',
      frame: process.platform == 'darwin',  // the custom titlebar is useless on mac os
      webPreferences: {
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
      },
    })
    

    window.setMenu(null);
    
    window.flashFrame(true)
    window.once('focus', () => window.flashFrame(false))

    // and load the index.html of the app.
    window.loadFile('content/index.html')
    //window.loadURL('https://music.youtube.com')
  
    if (!window.isMaximized()) window.maximize()

  // Open the DevTools.
  //window.webContents.openDevTools()

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)
//app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('log-ipc', (event, arg) => {
  console.log(arg);
  // event.sender.send('ipc-return', arg);
});