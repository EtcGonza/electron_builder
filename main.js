const { app, BrowserWindow, BrowserView, Menu, ipcMain } = require("electron");
const path = require("path");
const electronIpcMain = require("electron").ipcMain;

let mainWindow;
let coderView;

function createCoderWindow() {
    /// Seteo la ventana.
    mainWindow = new BrowserWindow({
        focusable: true,
        width: 800,
        height: 600,
        title: "Coderhouse",
        center: true,
        minWidth: 900,
        minHeight: 800,
        icon: __dirname + "assets/icons/win/icon.ico",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            javascript: true,
            contextIsolation: true, // must be set to true when contextBridge is enabled
            nodeIntegrationInWorker: true, // must be set to true when contextBridge is enabled
            // preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, // preload script enable contextBridge
        },
    });

    coderView = new BrowserView();
    mainWindow.setBrowserView(coderView);


    // let contentHeight = mainWindow.getContentSize()[1];

    // view.setBounds({ x: 0, y: 0, width: 800, height: contentHeight });
    // view.setAutoResize({ width: true, height: true });

    mainWindow.loadFile(path.join(__dirname, "src", "index.html"));
    view.webContents.setUserAgent("chrome");

    // // Escuchar eventos IPC para avanzar y retroceder
    // ipcMain.on("go-back", () => {
    //     console("main js go back");
    // if (coderView.webContents.canGoBack()) {
    //     coderView.webContents.goBack();
    // }
    // });

    // ipcMain.on("go-forward", () => {
    //     console("main js go forward");
    //     if (coderView.webContents.canGoForward()) {
    //         coderView.webContents.goForward();
    //     }
    // });

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createCoderWindow();

    app.on("activate", function() {
        if (mainWindow === null) createCoderWindow();
    });
});

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") app.quit();
});

// Listen for a message on the 'buttonClick' channel
electronIpcMain.on("buttonClick", (event, data) => {
    console.log("Recupero browserView"); // Testing

    if (coderView.webContents.canGoBack()) {
        console.log('Puedo ir atras');
        browserView.webContents.goBack();
    } else {
        console.log('NO Puedo ir atras');

    }
});