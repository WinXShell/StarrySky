const ipcRenderer = require('electron').ipcRenderer;

let HeaderWinMax = false;

// 右上角窗体操作按钮
function winCtrlBtn(id) {
    const HeaderWinID = require('electron').remote.getCurrentWindow();
    switch(id) {
        case 'win-min': // 最小化
            HeaderWinID.minimize();
            break;
        case 'win-max': // 最大化
        if(HeaderWinMax == false) {
            HeaderWinID.maximize();
            document.getElementById('win-max').style.background = "url(images/media/win-default.svg) no-repeat center";
            HeaderWinMax = true;
          } else {
            HeaderWinID.unmaximize();
            document.getElementById('win-max').style.background = "url(images/media/win-max.svg) no-repeat center";
            HeaderWinMax = false;
          }
            break;
        case 'win-close': // 退出
            HeaderWinID.close();
            document.getElementById('win-close').style.background = "rgb(255,255,255) url(images/media/win-close.svg) no-repeat center";
            break;
    }
}