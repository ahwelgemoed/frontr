import React, { useRef, useState } from "react";
import { PageLayout } from "../../styles";
import { Divider, Button, Upload } from "antd";

import { Loading } from "../../components/Loading";

import { installFilesCommand } from "../../utils/commands";

const { fs, getAppDataPath }: any = window;

const NewProject = () => {
  const ref = useRef();
  const [projectPath, setProjectPath] = useState<string>();
  const [isGulp, setIsGulp] = useState<boolean | null>(null);
  const [isPackage, setIsPackage] = useState<boolean>();
  const [error, setError] = useState<any>();
  const [appName, setAppName] = useState<any>();
  const [loading, seLoading] = useState<any>(false);

  const GULP_PATH = `${projectPath}/Gulpfile.js`;
  const PACKAGE_PATH = `${projectPath}/package.json`;

  const props = {
    onChange(info: any) {
      setProjectPath("");
      if (info.file.status !== "uploading") {
        const path = info.file.originFileObj.path;
        const splitPath = path.split("\\");
        const appname = splitPath.splice(-1, 1);
        const slitAppName = appname[0] && appname[0].split(".");
        slitAppName && setAppName(slitAppName[0]);
        const joinedPath = splitPath.join("/");
        setProjectPath(joinedPath);
      }
    },
  };
  const installFiles = async () => {
    seLoading(true);
    let rawReadOut: any = [];
    if (projectPath) {
      const npm = await installFilesCommand(projectPath);
      npm.stdout.on("data", async function (data: any) {
        console.log("NPM V:", data.toString());
      });
      npm.on("error", async function (data: any) {
        console.log("ERROR: NPM", data.toString());
        rawReadOut = [...rawReadOut, data.toString()];
      });
      npm.on("close", (code: any) => {
        seLoading(false);
        console.log(`child process exited with code ${code}`);
        if (code) {
          setError(true);
        }
      });
    }
  };
  //   ./src/utils/package.json"
  const copyFiles = async () => {
    // console.log("getAppDataPath", getAppDataPath());
    if (projectPath) {
      await fs.copyFile(
        `./src/utils/filestoCopy/package.json`,
        PACKAGE_PATH,
        function (err: any) {
          if (err) console.log(err);
          else console.log("Write operation complete.");
        }
      );
      await fs.copyFile(
        `./src/utils/filestoCopy/Gulpfile.js`,
        GULP_PATH,
        function (err: any, a: any) {
          console.log("a", a);
          if (err) console.log(err);
          else console.log("Write operation complete.");
        }
      );
      await checkFilesDoneCorrectly();
    }
  };
  const checkFilesDoneCorrectly = async () => {
    try {
      if (await fs.existsSync(PACKAGE_PATH)) {
        setIsGulp(true);
      }
    } catch (err) {
      setIsGulp(false);
      console.error(err);
    }
    try {
      if (await fs.existsSync(PACKAGE_PATH)) {
        setIsPackage(true);
      }
    } catch (err) {
      setIsPackage(false);
      console.error(err);
    }
  };
  console.log("appName", appName);
  return (
    <PageLayout>
      <h1>Lets Setup and Style a New Project</h1>
      <Divider />
      <div style={{ display: "grid" }}>
        <h3>Select The Path to the Projects .MPR File (Root Folder)</h3>
        <h5>This must be located somewhere on your Windows machine</h5>
        <div
          style={{
            paddingTop: 10,
          }}
        >
          <Upload {...props} ref={ref}>
            <Button block type="primary">
              Select .mpk
            </Button>
          </Upload>
        </div>
      </div>
      <Divider />
      <div style={{ display: "grid" }}>
        <h3>Copy Over "HET" Files</h3>
        <h5>Here we copy and the gulp and package.json over</h5>
        <div>
          <div
            style={{
              paddingTop: 10,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <h3>
              {isGulp === true && "Gulp Copied Successfully"}
              {isGulp === false && "Gulp Copy FAILED"}
            </h3>
            <h3>
              {isPackage === true && "Package.json Copied Successfully"}
              {isPackage === false && "Package.json Copy FAILED"}
            </h3>
          </div>
          <Button type="primary" onClick={copyFiles} disabled={!projectPath}>
            Copy Files
          </Button>
        </div>
      </div>
      <Divider />
      <div style={{ display: "grid" }}>
        <h3>Install The Dependencies</h3>
        <h5>This will take some Time #coffebreak</h5>
        <div
          style={{
            paddingTop: 10,
          }}
        >
          {loading && <Loading />}
          <Button
            type="primary"
            onClick={installFiles}
            disabled={!isPackage || !isGulp}
          >
            Install
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NewProject;
