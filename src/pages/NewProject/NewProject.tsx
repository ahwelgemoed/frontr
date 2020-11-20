import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  PageLayout,
  CardHeading,
  CardSubHeading,
  CardTwoHeading,
} from "../../styles";
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
  const [loading, setLoading] = useState<any>(false);

  const GULP_PATH = `${projectPath}/Gulpfile.js`;
  const PACKAGE_PATH = `${projectPath}/package.json`;
  console.log("error", error);
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
    setLoading(true);
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
        setLoading(false);
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          _saveProject();
        }
        if (code) {
          setError(true);
        }
      });
    }
  };

  const _saveProject = async () => {
    await setLoading(true);
    const SAVED_PROJECTS = "SAVED_PROJECTS";
    try {
      let getSaveProjectsParse = [];
      const getSaveProjects = await localStorage.getItem(SAVED_PROJECTS);
      if (getSaveProjects) {
        getSaveProjectsParse = await JSON.parse(getSaveProjects);
      }
      const itemToSave = {
        id: uuidv4(),
        name: appName,
        projectPath,
        date: new Date(),
      };
      const itemStringify = await JSON.stringify([
        ...getSaveProjectsParse,
        itemToSave,
      ]);

      await localStorage.setItem(SAVED_PROJECTS, itemStringify);
      await setLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const copyFiles = async () => {
    // https://stackoverflow.com/questions/50193870/include-a-folder-and-the-files-inside-it-to-electron-build-using-electron-builde
    if (projectPath) {
      await fs.copyFile(
        `${getAppDataPath()}/package.json`,
        PACKAGE_PATH,
        function (err: any) {
          if (err) console.log(err);
          else console.log("Write operation complete.");
        }
      );
      await fs.copyFile(`${getAppDataPath()}/Gulpfile.js`, GULP_PATH, function (
        err: any,
        a: any
      ) {
        if (err) console.log(err);
        else console.log("Write operation complete.");
      });
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
  return (
    <PageLayout>
      <CardHeading>Add Styling to a Project</CardHeading>
      <Divider />
      <div style={{ display: "grid" }}>
        <CardTwoHeading>
          Select The Path to the Projects .MPR File (Root Folder)
        </CardTwoHeading>
        <CardSubHeading>
          This must be located somewhere on your Windows machine
        </CardSubHeading>
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
        <CardTwoHeading>Copy Over Files</CardTwoHeading>
        <CardSubHeading>
          Here we copy and the gulp and package.json over
        </CardSubHeading>
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
        <CardTwoHeading>Install The Dependencies</CardTwoHeading>
        <CardSubHeading>This will take some Time #coffebreak</CardSubHeading>
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
