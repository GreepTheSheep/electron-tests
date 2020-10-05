const { app, BrowserWindow, Menu, ipcMain } = require('electron')


const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () {
      console.log('New Window')
    }
  },
  {
    label: 'New Window with Settings',
    submenu: [
      { 
        label: 'Basic'
      },
      { 
        label: 'Pro'
      }
    ]
  },
  { 
    label: 'New Command...'
  }
])

function createWindow () {
  // Create the browser window.
    const window = new BrowserWindow({
      icon: 'assets/zds.png',
      title: 'Greep',
      frame: false,
      transparent: true,
        webPreferences: {
            nodeIntegration: true
        },
        darkTheme: false
    })

    //window.setMenu(null);
    //app.dock.setMenu(dockMenu)
    window.setMenu(dockMenu)
    
    window.once('focus', () => window.flashFrame(false))
    window.flashFrame(true)

    // and load the index.html of the app.
    window.loadFile('content/index.html')

  
    //if (!window.isMaximized()) window.maximize()

  // Open the DevTools.
  //window.webContents.openDevTools()


  ipcMain.on('log-error', (event, arg) => {
    console.log('Erreur ! Veuillez rapporter ce bug au développeur de l\'application.\n' + arg);
    event.sender.send('error-logged', arg);
  });

  ipcMain.on('closeWindow', (event, arg) => {
    window.close();
  });
  ipcMain.on('minimizeWindow', (event, arg) => {
    window.minimize();
  });
  var maximize = false
  ipcMain.on('maximizeWindow', (event, arg) => {
    if (maximize){
      window.unmaximize()
      maximize = false
    } else{
      window.maximize();
      maximize = true
    } 
    //window.setFullScreen(!window.isFullScreen());
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.whenReady().then(createWindow)
app.on('ready', createWindow);

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



