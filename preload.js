// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const path = require('path');
const url = require('url');
const {isMacintosh} = require('custom-electron-titlebar')
const {Menu, MenuItem} = require('@treverix/remote')

window.addEventListener('DOMContentLoaded', () => {

  // It does not make sense to use the custom titlebar on macOS where
  // it only tries to simulate what we get with the normal behavior anyway.
  if (!isMacintosh) {
    const customTitlebar = require('custom-electron-titlebar');

    // add a menu
    const menu = new Menu();
    menu.append(new MenuItem({
      label: 'Item 1',
      click: () => console.log('Click on submenu'),
      submenu: [
        {
          label: 'Subitem 1',
          click: () => console.log('Click on subitem 1')
        },
        {
          type: 'separator'
        }
      ]
    }));

    menu.append(new MenuItem({
      label: 'Item 2',
      submenu: [
        {
          label: 'Subitem checkbox',
          type: 'checkbox',
          checked: true
        },
        {
          type: 'separator'
        },
        {
          label: 'Subitem with submenu',
          submenu: [
            {
              label: 'Submenu item 2',
              accelerator: 'Ctrl+T',
              click: () => console.log('Submenu item 2 clicked')
            }
          ]
        }
      ]
    }));

    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#ff0000'),
        icon: url.format(path.join(__dirname, '/build', '/icon.png')),
        menu
    });
    
  }
})