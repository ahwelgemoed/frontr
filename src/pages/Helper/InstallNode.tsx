import React, { useState } from "react";
import { Divider, Button, message } from "antd";
import { VscThumbsup } from "react-icons/vsc";
import {
  runNodeInstall,
  checkIfNVM,
  installNode,
} from "../../utils/installNodeMac";
import { Loading } from "../../components/Loading";

const InstallNode = () => {
  const [loading, seLoading] = useState<any>(false);
  const [nvmInstalled, setNvmInstalled] = useState<any>(false);
  const [checkNVMInstalled, setCheckNVMInstalled] = useState<any>(false);
  const tryAndInstallNVM = async () => {
    seLoading(true);
    const node = await runNodeInstall();

    node.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });

    node.stderr.on("data", (data: any) => {
      console.error(`stderr: ${data}`);
    });

    node.on("close", (code: any) => {
      console.log(`child process exited with code ${code}`);
      seLoading(false);
      if (!code) {
        setNvmInstalled(true);
        message.success("NVM INSTALLED!");
      }
    });
  };
  const checkNVM = async () => {
    seLoading(true);
    const node = await checkIfNVM();

    node.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });

    node.stderr.on("data", (data: any) => {
      seLoading(false);
      console.error(`stderr: ${data}`);
    });

    node.on("close", (code: any) => {
      console.log(`child process exited with code ${code}`);
      seLoading(false);
      if (!code) {
        setCheckNVMInstalled(true);
        message.success("NVM INSTALLED!");
      }
    });
  };
  const checkInstallNode = async () => {
    seLoading(true);
    const node = await installNode();

    // node.stdout.on("data", (data: any) => {
    //   console.log(`stdout: ${data}`);
    // });

    // node.stderr.on("data", (data: any) => {
    //   seLoading(false);
    //   console.error(`stderr: ${data}`);
    // });

    // node.on("close", (code: any) => {
    //   console.log(`child process exited with code ${code}`);
    //   seLoading(false);
    //   if (!code) {
    //     setCheckNVMInstalled(true);
    //     message.success("NVM INSTALLED!");
    //   }
    // });
  };
  return (
    <div
      style={{
        height: "100%",
        paddingTop: 20,
        display: "grid",
      }}
    >
      <div>
        <h1>How To Install Node JS/NPM</h1>
        <Divider />
      </div>
      <div>
        <h2>
          Step 1{" "}
          {nvmInstalled && (
            <VscThumbsup
              style={{ marginLeft: 20, fontSize: 16, color: "green" }}
            />
          )}
        </h2>
        <h3>This will install NVM</h3>
        {loading ? (
          <Loading />
        ) : (
          <Button
            ghost
            disabled={checkNVMInstalled || nvmInstalled}
            onClick={() => {
              tryAndInstallNVM();
            }}
          >
            Install Node
          </Button>
        )}
        <Divider />
      </div>
      <div>
        <h2>
          Step 2
          {checkNVMInstalled && (
            <VscThumbsup
              style={{ marginLeft: 20, fontSize: 16, color: "green" }}
            />
          )}
        </h2>
        <h3>Check that NVM is Working</h3>
        {loading ? (
          <Loading />
        ) : (
          <Button
            ghost
            disabled={checkNVMInstalled}
            onClick={() => {
              checkNVM();
            }}
          >
            Check NVM
          </Button>
        )}
        <Divider />
      </div>
      <div>
        <h2>
          Step 3
          {nvmInstalled && (
            <VscThumbsup
              style={{ marginLeft: 20, fontSize: 16, color: "green" }}
            />
          )}
        </h2>
        <h3>Install Node</h3>
        {loading ? (
          <Loading />
        ) : (
          <Button
            ghost
            onClick={() => {
              checkInstallNode();
            }}
          >
            Install Node/Npm
          </Button>
        )}
        <Divider />
      </div>
    </div>
  );
};

export default InstallNode;
