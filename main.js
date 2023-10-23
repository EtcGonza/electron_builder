const { app, BrowserWindow, BrowserView, Menu } = require("electron");

let mainWindow;

function createWindow() {
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
            nodeIntegration: true,
        },
    });

    const view = new BrowserView();
    mainWindow.setBrowserView(view);

    let contentHeight = mainWindow.getContentSize()[1];

    view.setBounds({ x: 0, y: 0, width: 800, height: contentHeight });
    view.setAutoResize({ width: true, height: true });

    view.webContents.loadURL("https://plataforma.coderhouse.com/");

    /// Cargo el menu.
    const menu = Menu.buildFromTemplate([{
        label: "View",
        submenu: [{
                label: "Reload",
                accelerator: "CmdOrCtrl+R",
                click: () => {
                    try {
                        view.webContents.session.clearStorageData().then(() => {
                            view.webContents.reload();
                        });
                    } catch (error) {
                        console.log(error);
                    }
                },
            },
            {
                label: "Navigation",
                submenu: [{
                        label: "Back",
                        accelerator: "CmdOrCtrl+Left",
                        click: () => {
                            if (view.webContents.canGoBack()) {
                                view.webContents.goBack();
                            }
                        },
                    },
                    {
                        label: "Forward",
                        accelerator: "CmdOrCtrl+Right",
                        click: () => {
                            if (view.webContents.canGoForward()) {
                                view.webContents.goForward();
                            }
                        },
                    },
                ],
            },
        ],
    }, ]);

    Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function() {
        if (mainWindow === null) createWindow();
    });
});

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") app.quit();
});