const { ipcRenderer, remote } = require("electron");
const path = require("path");
const child_process = require("child_process");
const fs = require("fs");

const electronWindow = remote.getCurrentWindow();
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

/* Note this is different to the
html global `window` variable */

// // When document has loaded, initialise
// document.onreadystatechange = (event) => {
//   if (document.readyState == "complete") {
//     handleWindowControls();
//   }
// };

// window.onbeforeunload = (event) => {
//   /* If window is reloaded, remove win event listeners
//     (DOM element listeners get auto garbage collected but not
//     Electron win listeners as the win is not dereferenced unless closed) */
//   win.removeAllListeners();
// };

// function handleWindowControls() {
//   // Make minimise/maximise/restore/close buttons work when they are clicked
//   document.getElementById("min-button").addEventListener("click", (event) => {
//     win.minimize();
//   });

//   document.getElementById("max-button").addEventListener("click", (event) => {
//     win.maximize();
//   });

//   document
//     .getElementById("restore-button")
//     .addEventListener("click", (event) => {
//       win.unmaximize();
//     });

//   document.getElementById("close-button").addEventListener("click", (event) => {
//     win.close();
//   });

//   // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
//   toggleMaxRestoreButtons();
//   win.on("maximize", toggleMaxRestoreButtons);
//   win.on("unmaximize", toggleMaxRestoreButtons);

//   function toggleMaxRestoreButtons() {
//     if (win.isMaximized()) {
//       document.body.classList.add("maximized");
//     } else {
//       document.body.classList.remove("maximized");
//     }
//   }
// }

window.ipcRenderer = ipcRenderer;
window.child_process = child_process;
window.fs = fs;
window.getAppDataPath = getAppDataPath;
window.electronWindow = electronWindow;
// window.saveAppData = saveAppData;
