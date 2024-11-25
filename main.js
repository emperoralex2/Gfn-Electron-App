const { app, BrowserWindow, session} = require ('electron');
const path = require ('path')
const gfnpage = "https://play.geforcenow.com/";
const useragentforgfn = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-zero-copy');

function createWindow () {
    const window = new BrowserWindow ({
        fullscreenable: true,
        width: 1500,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false,
            contextIsolation: false,
            userAgent: useragentforgfn,
        },
        nodeintergration: true,
    });


    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    console.log(useragentforgfn);
    
    setTimeout (() => {
    }, 1000);
    window.loadURL(gfnpage);
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});