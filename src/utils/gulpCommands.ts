// import { exec } from 'shelljs';
const { child_process }: any = window;
export const installGulp = async () => {
  try {
    console.log("Gulp Download Started");
    const gulp = await child_process.exec("npm install gulp-cli -g");
    return gulp;
  } catch (error) {
    console.log(error);
  }
};
