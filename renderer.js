const ipcRenderer = require('electron').ipcRenderer; // electron 通信模块
const remote = require('electron').remote; // electron 主进程与渲染进程通信模块

// 初始化基本参数
let isSave = true; // 初始状态无需保存
let txtEditor = document.getElementById('txtEditor'); // 获取文本框对象
let currentFile = null; // 初始状态无文件路径
let isQuit = true; // 初始状态可正常退出

// 右上角窗体操作按钮
function winCtrlBtn(id) {
    switch(id) {
        case 'win-min': // 最小化
            ipcRenderer.send('reqaction', 'win-min');
            break;
        case 'win-max': // 最大化
            ipcRenderer.send('reqaction', 'win-max');
            break;
        case 'win-close': // 退出
                ipcRenderer.sendSync('reqaction', 'exit');
            break;
    }
}
// 监听窗口变化改变放大缩小按钮的图标
window.onresize = function () {
    if(remote.getCurrentWindow().isMaximized()) {
        document.getElementById('win-max').style.background = "url(images/media/win-default.svg) no-repeat center center";
    }else {
        document.getElementById('win-max').style.background = "url(images/media/win-max.svg) no-repeat center center";
    }
}