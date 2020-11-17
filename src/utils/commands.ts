// import { exec } from 'shelljs';
const { child_process }: any = window;
export const cli = async () => {
  try {
    // console.log("spawn", child_process.spawn);
    const node = await child_process.spawn("node", ["-v"]);

    return node;
  } catch (error) {
    console.log(error);
  }
};
export const checkNPMCommand = async () => {
  try {
    // console.log("spawn", child_process.spawn);
    const npm = await child_process.exec("npm -v");
    return npm;
  } catch (error) {
    console.log(error);
  }
};
export const installFilesCommand = async (path: string) => {
  try {
    // console.log("spawn", child_process.spawn);
    const npm = await child_process.exec("npm install", {
      cwd: path,
    });
    return npm;
  } catch (error) {
    console.log(error);
  }
};
export const openMendixCommand = async (filePath: string) => {
  try {
    const npm = await child_process.exec(filePath);
    return npm;
  } catch (error) {
    console.log(error);
  }
};
export const runDevinProject = async (path: string) => {
  try {
    const npm = await child_process.exec("npm run dev", {
      cwd: path,
      stdio: "inherit",
    });
    return npm;
  } catch (error) {
    console.log(error);
  }
};
