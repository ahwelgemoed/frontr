import React, { useEffect, useState } from "react";
import {
  PageLayout,
  CardHeading,
  CardSubHeading,
  CardTwoHeading,
} from "../../styles";
import { Divider, Button } from "antd";
import { Loading } from "../../components/Loading";
import { useParams } from "react-router-dom";

import { runDevinProject, openMendixCommand } from "../../utils/commands";

const ProjectPage = () => {
  const params = useParams<any>();
  const [foundProject, setFoundProject] = useState();
  const [runningProject, setRunningProject] = useState();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  console.log("error", error);
  useEffect(() => {
    const getSaveProjects = localStorage.getItem("SAVED_PROJECTS");
    if (getSaveProjects) {
      const getSaveProjectsParse = JSON.parse(getSaveProjects);
      const foundProject = getSaveProjectsParse.find(
        (project: any) => project.id === params?.id
      );
      setFoundProject(foundProject);
    }
  }, [params]);

  const killFiles = () => {
    if (runningProject) {
      //@ts-ignore
      runningProject?.kill("SIGINT");
      setLoading(false);
      //@ts-ignore
      setRunningProject("");
    }
  };
  const openMendix = async () => {
    if (foundProject) {
      //@ts-ignore
      const pathToMPR = `"${foundProject?.projectPath}/${foundProject?.name}.mpr"`;
      await openMendixCommand(pathToMPR);
    }
  };

  const installFiles = async () => {
    setLoading(true);
    let rawReadOut: any = [];
    if (foundProject) {
      //@ts-ignore
      const npm = await runDevinProject(foundProject?.projectPath);
      setRunningProject(npm);
      npm.stdout.on("data", async function (data: any) {
        console.log("NPM RUNNING:", data.toString());
      });
      npm.stderr.on("data", async function (data: any) {
        console.log("NPM RUNNING:", data.toString());
      });
      npm.on("error", async function (data: any) {
        console.log("ERROR: PNM RUNNING", data.toString());
        rawReadOut = [...rawReadOut, data.toString()];
      });
      npm.on("close", (code: any) => {
        setLoading(false);
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          // _saveProject();
        }
        if (code) {
          setError(true);
        }
      });
    }
  };
  if (!foundProject) {
    return <Loading />;
  }
  if (foundProject) {
    return (
      <PageLayout>
        {/* @ts-ignore */}
        <CardHeading>Project: {foundProject?.name}</CardHeading>
        {/* @ts-ignore */}
        <CardSubHeading>Path: {foundProject?.projectPath}</CardSubHeading>
        {loading && <Loading />}
        <Divider />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",

            gridGap: 20,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              alignItems: "center",
              gridGap: 20,
            }}
          >
            <div>
              <CardTwoHeading>Open Mendix Project</CardTwoHeading>
              <CardSubHeading>Here we will Run 'npm run dev'</CardSubHeading>
            </div>
            <div>
              <Button type="primary" onClick={openMendix}>
                Start
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              alignItems: "center",
              gridGap: 20,
            }}
          >
            <div>
              <CardTwoHeading>Start Project</CardTwoHeading>
              <CardSubHeading>Here we will Run 'npm run dev'</CardSubHeading>
            </div>
            <div>
              <Button
                type="primary"
                onClick={killFiles}
                disabled={!runningProject}
              >
                Stop
              </Button>
              <Button
                type="primary"
                onClick={installFiles}
                disabled={runningProject}
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
};

export default ProjectPage;
