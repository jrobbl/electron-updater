const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");

// Enable logging
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
});

// Check for updates
function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify({
    title: "Update Available",
    body: "A new version is available. Restart app to install?",
  });
}

// Auto-update events
autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

// Call this when app is ready
app.whenReady().then(checkForUpdates);
