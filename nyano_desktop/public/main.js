const { app, BrowserWindow, screen } = require("electron");

require("@electron/remote/main").initialize();

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const maxiSize = display.workAreaSize;

  const win = new BrowserWindow({
    resizable: false,
    height: maxiSize.height,
    width: maxiSize.width,
    webPreferences: {
      enableRemoteModule: true,
    },
    autoHideMenuBar: true,
  });
  win.loadURL("http://localhost:3000");
  win.setMenu(null);
}

app.on("ready", createWindow);
app.setMe;
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
