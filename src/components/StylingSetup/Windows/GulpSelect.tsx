import React, { useState } from "react";

import { Divider, Button } from "antd";
import { RightCardBody } from "../../../styles";

import { Loading } from "../../Loading";
import { installGulp } from "../../../utils/gulpCommands";
const GulpSelect = () => {
  const [gulp, setGulp] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [wasGulpInstalled, setWasGulpInstalled] = useState<boolean>();
  const [loading, seLoading] = useState<any>(false);
  console.log("gulp", gulp, error);
  const checkAndInstallGulp = async () => {
    let rawReadOut: any = [];
    seLoading(true);
    const npm = await installGulp();
    npm.stdout.on("data", async function (data: any) {
      console.log("NPM V:", data.toString());
      setGulp(data.toString());
      seLoading(false);
      setWasGulpInstalled(true);
    });

    npm.stderr.on("data", (data: any) => {
      console.error(`stderr: ${data}`);
    });
    npm.on("error", async function (data: any) {
      console.log("ERROR: NPM", data.toString());
      rawReadOut = [...rawReadOut, data.toString()];
    });
    npm.on("close", (code: any) => {
      console.log(`child process exited with code ${code}`);
      seLoading(false);
      if (code) {
        seLoading(false);
        setError(true);
        setWasGulpInstalled(false);
      }
      if (!code) {
        setWasGulpInstalled(true);
      }
    });
  };
  return (
    <RightCardBody>
      <div>
        <Divider />
        <h1>Do You have GULP Installed?</h1>
        <h3>In this step we install the Gulp Client on your Windows Machine</h3>
        <Divider />
        {loading && <Loading />}
      </div>
      <Button ghost onClick={() => checkAndInstallGulp()}>
        Run Check and Install
      </Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {wasGulpInstalled && (
          <div>
            <h3>Gulp Client was Successfully installed</h3>
            {/* <h2>Gulp: {gulp}</h2> */}
          </div>
        )}
      </div>
    </RightCardBody>
  );
};

export default GulpSelect;
