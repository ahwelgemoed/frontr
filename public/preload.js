const { ipcRenderer } = require("electron");
const path = require("path");
const child_process = require("child_process");
const fs = require("fs");

function getAppDataPath() {
  switch (process.platform) {
    case "darwin": {
      return path.join(
        process.env.HOME,
        "Library",
        "Application Support",
        "frontr-app"
      );
    }
    case "win32": {
      return path.join(process.resourcesPath, "data");
      // return path.join(process.env.APPDATA, "frontr-app");
    }
    case "linux": {
      return path.join(process.env.HOME, ".frontr-app");
    }
    default: {
      console.log("Unsupported platform!");
      process.exit(1);
    }
  }
}

window.ipcRenderer = ipcRenderer;
window.child_process = child_process;
window.fs = fs;
window.getAppDataPath = getAppDataPath;
// window.saveAppData = saveAppData;
