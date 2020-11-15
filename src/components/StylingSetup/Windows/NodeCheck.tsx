import React, { useState, useEffect } from "react";
import ModalComp from "../../Modal";

import { Divider, Button, Upload } from "antd";
import { RightCardBody } from "../../../styles";

import { Loading } from "../../Loading";
import { cli, checkNPMCommand } from "../../../utils/commands";

const NodeCheck = () => {
  const [nodeVersions, setNodeVersions] = useState<any>();
  const [npmVersions, setNpmVersions] = useState<any>();
  const [rawReadout, setRawReadout] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [loading, seLoading] = useState<any>(false);

  useEffect(() => {
    if (error) {
      seLoading(false);
    }
    if (nodeVersions && npmVersions) {
      seLoading(false);
    }
  }, [nodeVersions, npmVersions, error]);

  const checkNodeAndNpm = async () => {
    await seLoading(true);
    await checkNode();
    await checkNPM();
  };
  const checkNode = async () => {
    seLoading(true);
    let rawReadOut: any = [];
    const node = await cli();
    node.stdout.on("data", async function (data: any) {
      console.log("NODE V:", data.toString());
      setNodeVersions(data.toString());
    });

    node.on("error", async function (data: any) {
      console.log("ERROR: NODE", data.toString());
      rawReadOut = [...rawReadOut, data.toString()];
      //   setNodeVersions(rawReadOut);
    });
    node.on("close", (code: any) => {
      // console.log(`child process exited with code ${code}`);
      if (code) {
        setError(true);
      }
    });
  };

  const checkNPM = async () => {
    let rawReadOut: any = [];
    const npm = await checkNPMCommand();
    npm.stdout.on("data", async function (data: any) {
      console.log("NPM V:", data.toString());
      setNpmVersions(data.toString());
    });
    npm.on("error", async function (data: any) {
      console.log("ERROR: NPM", data.toString());
      rawReadOut = [...rawReadOut, data.toString()];
    });
    npm.on("close", (code: any) => {
      // console.log(`child process exited with code ${code}`);
      if (code) {
        setError(true);
      }
    });
  };
  return (
    <RightCardBody>
      <ModalComp
        openTheModal={error}
        link="/InstallNode"
        text="You don't seem to have Node/NPM installed - We can help with that"
      />
      <div>
        <Divider />
        <h1>Do You have Node Installed?</h1>
        <h3>
          The first step is to check if you have NodeJS installed. Click Check
          to see if you have it
        </h3>
        <Divider />
        {loading && <Loading />}
      </div>
      <Button ghost onClick={() => checkNodeAndNpm()}>
        Run Check
      </Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div>
          <h3>You have the following Installed (Windows)</h3>
          <h2>Node: {nodeVersions}</h2>
          <h2>NPM: {npmVersions}</h2>
        </div>
        <div>{/* <h3>You have the following Installed (Windows)</h3> */}</div>
      </div>
    </RightCardBody>
  );
};

export default NodeCheck;
