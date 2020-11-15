const { exec } = require("shelljs");
// Copy all the view templates
const WINDOWS_NAME = "Windows 10";
// exec("echo hello");
const t = `prlctl status ${WINDOWS_NAME}`;
return exec(t);
