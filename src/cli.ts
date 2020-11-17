const { child_process }: any = window;
export const cli = () => {
  try {
    const ls = child_process.spawn("ls", ["-lh", "/usr"]);

    ls.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", (data: any) => {
      console.error(`stderr: ${data}`);
    });

    ls.on("close", (code: any) => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (error) {
    console.log(error);
  }
};
