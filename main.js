const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const path = require('path');

// 主窗体
let mainWindow;
// 安全退出初始化
let safeExit = false;

// 主窗体初始化
function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 400,
    minHeight: 300,
    frame: false,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 加载页面内容
  mainWindow.loadFile('index.html');

  // 开发者工具
  //mainWindow.webContents.openDevTools();

  // 窗体生命周期 close 操作
  mainWindow.on('close', (e) => {
    if(!safeExit) {
      e.preventDefault();
    }
    mainWindow.webContents.send('action', 'exit');
  });
  // 窗体生命周期 closed 操作
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

// 程序生命周期 ready
app.on('ready', createWindow);
// 程序生命周期 window-all-closed
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});
// 程序生命周期 activate
app.on('activate', function() {
  if (mainWindow === null) createWindow();
});



// 窗体操作
ipcMain.on('reqaction', (event, arg) => {
  switch(arg) {
    case 'exit': // 接收退出命令
      safeExit = true;
      app.quit();
      break;
    case 'win-min': // 接收最小化命令
      mainWindow.minimize();
      break;
    case 'win-max': // 接收最大化命令
      if(mainWindow.isMaximized()) {
        mainWindow.restore();  
      } else {
        mainWindow.maximize(); 
      }
      break;
  }
});