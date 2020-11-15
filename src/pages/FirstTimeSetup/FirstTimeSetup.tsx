import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Steps, Button, Upload } from "antd";

import NodeCheck from "../../components/StylingSetup/Windows/NodeCheck";
import GulpSelect from "../../components/StylingSetup/Windows/GulpSelect";

// import { isMacOs } from "react-device-detect";
import { cli } from "../../cli";

const { fs, getAppDataPath }: any = window;

const FirstTimeSetup = (): React.ReactElement => {
  const { push } = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const ref = useRef();

  const props = {
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file.originFileObj);
      }
    },
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  const doneWithSetup = async () => {
    try {
      const nodeAndGulpCheck = { nodeAndGulpCheck: true };
      const stringify = await JSON.stringify(nodeAndGulpCheck);
      await localStorage.setItem("USER_SETTINGS", stringify);
      return await push("/");
    } catch (error) {}
  };

  const steps = [
    { title: "Node?", Component: NodeCheck },
    { title: "Gulp?", Component: GulpSelect },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 0,
        height: "100%",
      }}
    >
      <Steps current={currentStep}>
        {steps?.map((step: any, i: number) => {
          return <Steps.Step key={i} title={step.title} />;
        })}
      </Steps>
      {steps?.map(({ Component }: any, index: number) => {
        if (currentStep === index) {
          return <Component />;
        }
      })}
      <div
        className="steps-action"
        style={{
          marginTop: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr ",
        }}
      >
        <Button
          ghost
          style={{ margin: "0 8px", color: "white" }}
          onClick={() => prev()}
          disabled={currentStep <= 0}
        >
          Previous
        </Button>
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={doneWithSetup}>
            Done
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
      </div>

      {/* <h2>Lets Setup some stuff</h2>
      <Upload {...props} ref={ref}>
        <Button>Select</Button>
      </Upload>

      <input type="file" id="ctrl" multiple />

      <input type="file" id="ctrl" multiple />
      <button
        onClick={() => {
          console.log("getAppDataPath()", `${getAppDataPath()}/FUCK.txt`);
          if (!fs.existsSync(getAppDataPath())) {
            fs.mkdirSync(getAppDataPath());
          }
          fs.writeFile(
            `${getAppDataPath()}/FUCK.txt`,
            "Hello World!",
            function (err: any) {
              if (err) console.log(err);
              else console.log("Write operation complete.");
            }
          );
          // fs.writeFile("./FUCKYOU.txt", "Hello World!", function (err: any) {
          //   if (err) console.log(err);
          //   else console.log("Write operation complete.");
          // });
          // @ts-ignore
          // console.log("object", ref.current?.files);
          // fs.writeFile(".env", "asdasdasdasdasd");
        }}
      >
        FUCKFUCKFUCK
      </button>
      <button
        onClick={() => {
          // @ts-ignore
          console.log("child_process", cli());
        }}
      >
        LinkLink
      </button> */}
    </div>
  );
};

export default FirstTimeSetup;
