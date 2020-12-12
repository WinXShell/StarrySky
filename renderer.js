const ipcRenderer = require('electron').ipcRenderer; // electron 通信模块
const remote = require('electron').remote; // electron 主进程与渲染进程通信模块
const HeaderWinID = require('electron').remote.getCurrentWindow();
const BrowserWindow = require('electron').remote.BrowserWindow;

// 初始化基本参数
let skinWindow;
let isSkinOpen = false;
let isHeadOpen = false;
let isLogin = false;


// 右上角窗体操作按钮
function winCtrlBtn(id) {
  switch(id) {
      case 'win-theme': // 主题
          if(isSkinOpen == false){
            createSkin();
            isSkinOpen = true;
          }else{
            skinWindow.moveTop();;
          }
          break;
      case 'win-min': // 最小化
          HeaderWinID.minimize();
          break;
      case 'win-max': // 最大化
      if(HeaderWinID.isMaximized()) {
          HeaderWinID.unmaximize();
        } else {
          HeaderWinID.maximize();
        }
          break;
      case 'win-close': // 退出
          HeaderWinID.hide();
          break;
  }
}

//监听窗口变化改变放大缩小按钮的图标
window.onresize = function () {
  if(remote.getCurrentWindow().isMaximized()) {
      document.getElementById('win-max').setAttribute("class","buttonRestore");
  }else {
      document.getElementById('win-max').setAttribute("class","buttonMax");
  }
}


function winHeadBtn() {
  if((isHeadOpen == false)&&(isLogin == false)){
    createLogin();
    isHeadOpen = true;
  }else if((isHeadOpen == false)&&(isLogin == true)){
    createPerson();
    isHeadOpen = true;
  }else if((isHeadOpen == true)&&(isLogin == false)){
    loginWindow.moveTop();
  }else{
    personWindow.moveTop();
  }
}

// 主题窗体初始化
function createSkin() {
    skinWindow = new BrowserWindow({
      width: 500,
      height: 300,
      frame: false,
      parent:HeaderWinID,
      backgroundColor: '#FFFFFF',
      webPreferences: {
        nodeIntegration: true
      }
    });
  
    skinWindow.once('ready-to-show', function() {
      skinWindow.show();
    });
  
    // 加载页面内容
    skinWindow.loadURL(`file://${__dirname}/skin/index.html`);
  
    // 开发者工具
    //mainWindow.webContents.openDevTools();
  
    // 窗体生命周期 blur 操作
    skinWindow.on('blur', function() {
      skinWindow.moveTop();
    });

    // 窗体生命周期 close 操作
    skinWindow.on('close', function() {
      isSkinOpen = false;
    });

    // 窗体生命周期 closed 操作
    skinWindow.on('closed', function() {
      skinWindow = null;
    });
  }
  

// 登录窗体初始化
function createLogin() {
  loginWindow = new BrowserWindow({
    width: 500,
    height: 300,
    frame: false,
    parent:HeaderWinID,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: true
    }
  });

  loginWindow.once('ready-to-show', function() {
    loginWindow.show();
  });

  // 加载页面内容
  loginWindow.loadURL(`file://${__dirname}/personal/login.html`);

  // 开发者工具
  //mainWindow.webContents.openDevTools();

  // 窗体生命周期 close 操作
  loginWindow.on('close', function() {
    isHeadOpen = false;
  });

  // 窗体生命周期 closed 操作
  loginWindow.on('closed', function() {
    loginWindow = null;
  });
}

// 个人中心窗体初始化
function createPerson() {
  personWindow = new BrowserWindow({
    width: 500,
    height: 300,
    frame: false,
    parent:HeaderWinID,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: true
    }
  });

  personWindow.once('ready-to-show', function() {
    personWindow.show();
  });

  // 加载页面内容
  personWindow.loadURL(`file://${__dirname}/personal/index.html`);

  // 开发者工具
  //mainWindow.webContents.openDevTools();

  // 窗体生命周期 close 操作
  personWindow.on('close', function() {
    isHeadOpen = false;
  });

  // 窗体生命周期 closed 操作
  personWindow.on('closed', function() {
    personWindow = null;
  });
}