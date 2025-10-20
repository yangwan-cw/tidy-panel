import { app, shell, BrowserWindow, ipcMain } from 'electron'
// import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const path = require('path'); // 正确加载 path 模块

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 200,
    titleBarStyle:  'hidden',
    title: '',
    icon: undefined,
     // 无边框窗口
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,        // 启用 Node 集成
      contextIsolation: false,      // 禁用上下文隔离

    }
  })

  // 监听来自渲染进程的消息
  ipcMain.on('detach:service', (event, arg) => {
    switch (arg.type) {
      case 'minimize':
        console.log('最小化窗口');
        mainWindow.minimize(); // 最小化窗口
        break;
      case 'maximize':
        console.log('最大化窗口');
        mainWindow.maximize(); // 最大化窗口
        break;
      case 'close':
        console.log('关闭窗口');
        mainWindow.close(); // 关闭窗口
        break;
      default:
        console.log('未定义的操作');
    }
  });


  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
