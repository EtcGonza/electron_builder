const { app, BrowserWindow, BrowserView, session, Menu } = require("electron");

// Establece el menú en la aplicación
const menu = Menu.buildFromTemplate([{
        label: "Cuenta",
        submenu: [{
                label: "Limpiar sesión",
                click: () => clearSession(),
            },
            {
                type: "separator",
            },
            {
                label: "Salir",
                role: "quit",
            },
        ],
    },
    {
        label: "Editar",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "selectAll" },
        ],
    },
]);

let mainWindow;

function createWindow() {
    Menu.setApplicationMenu(menu);

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

    // Limpia la sesión (incluido el caché) antes de cargar la URL
    // Carga la URL en la BrowserView después de limpiar la sesión
    view.webContents.loadURL("https://plataforma.coderhouse.com/");

    // mainWindow.on("closed", () => {
    //   mainWindow = null;
    // });
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

const clearSession = () => {
    console.log("clearSession");

    // Obtiene la sesión actual
    const currentSession = session.fromPartition("");

    // Define qué datos de sesión deseas limpiar
    const options = {
        storages: [
            "cookies",
            "appcache",
            "filesystem",
            "indexdb",
            "localstorage",
            "shadercache",
            "websql",
            "serviceworkers",
        ],
    };

    // Limpia los datos de sesión
    currentSession.clearStorageData(options, () => {
        console.log("Sesión limpiada");

        const view = mainWindow.getBrowserView();
        view.webContents.reload();
    });
};