const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const path = require('path');

// 主窗体
let mainWindow;
let appTray = null;
let isHide = false;
// 系统托盘右键菜单
let trayMenuTemplate = ([
  {
    label: '显示主界面',
    click: function () {
      if (mainWindow.isVisible() == false) {
        mainWindow.show();
      }
    }
  },
  {
    label: '退出',
    click: function () {
      mainWindow.destroy();
      appTray = null;
    }
  }
]);

// 主窗体初始化
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    show: false,
    skipTaskbar:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule:true
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 加载页面内容
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // 开发者工具
  //mainWindow.webContents.openDevTools();
  
  // 窗体生命周期 close 操作
  mainWindow.on('close', function() {
    app.quit();
  });

  appTray = new Tray(path.join(__dirname, './Images/Icon.ico'));
  // 设置托盘悬浮提示
  appTray.setToolTip('星空');
  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  // 设置托盘菜单
  appTray.setContextMenu(contextMenu);
  appTray.on('click', ()=>{
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
   //   win.isVisible() ?win.setSkipTaskbar(false):win.setSkipTaskbar(true);
  })

  // 窗体生命周期 closed 操作
  mainWindow.on('closed', function() {
    mainWindow = null;
    if (appTray !== null) {
      appTray = null;
    }
  });
}

/*
function createSplashWindow() {
  splashScreen = new BrowserWindow({
    Width: 800,
    Height: 600,
    frame: false,
    parent:mainWindow,
    resizable: false,
    transparent: true,
  });

  // 加载页面内容
  splashScreen.loadURL(`file://${__dirname}/splash.html`);

  splashScreen.once('ready-to-show', function() {
    let i = 0;
    splashScreen.show();
    if(i <= num){
      i++;
    }else{
      splashScreen.close();
    }
});

  // 窗体生命周期 closed 操作
  splashScreen.on('close', function() {
    num = 0;
  });

  // 窗体生命周期 closed 操作
  splashScreen.on('closed', function() {
    splashScreen = null;
  });

}*/


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

