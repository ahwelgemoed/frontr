// import * as TEST from "./Test";
const { child_process }: any = window;
export const runNodeInstall = async () => {
  try {
    const spawnProcess = await child_process.spawn("/bin/bash", [
      "-c",
      "curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh",
    ]);
    return spawnProcess;
  } catch (error) {
    console.log(error);
  }
};
export const checkIfNVM = async () => {
  try {
    const spawnProcess = await child_process.spawn("/bin/sh", ["nvm"]);
    return spawnProcess;
  } catch (error) {
    console.log(error);
  }
};
export const installNode = async () => {
  try {
    //   child_process.exec("node ./src/utils/TEST", (error, data, getter) => {
    //       if (error) {
    //           console.log("error", error.message);
    //           return;
    //         }
    //         if (getter) {
    //             console.log("Getdata", data);
    //             return;
    //         }
    //         console.log("data", data);
    //     });

    //@ts-ignore
    child_process.exec("node ./src/utils/TEST", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    // const spawnProcess = await child_process.spawn("/bin/sh", [
    //   "-c",
    //   "nvm -v | bash",
    // ]);

    // return spawnProcess;
  } catch (error) {
    console.log(error);
  }
};
