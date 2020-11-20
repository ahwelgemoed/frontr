import React from "react";
import { VscChromeClose, VscChromeMinimize } from "react-icons/vsc";

import { TitleContainer } from "./styles";

const { electronWindow }: any = window;

const Titlebar = () => {
  return (
    <TitleContainer>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 70px",
        }}
      >
        <div id="drag-region"></div>
        <div
          style={{
            width: 200,
          }}
        >
          <VscChromeMinimize
            style={{
              marginTop: 4,
              marginLeft: 10,
              marginRight: 10,
            }}
            onClick={() =>
              setTimeout(() => {
                electronWindow.minimize();
              }, 100)
            }
          />
          <VscChromeClose
            style={{
              marginTop: 4,
              marginLeft: 10,
              marginRight: 10,
            }}
            onClick={() => {
              setTimeout(() => {
                electronWindow.close();
              }, 100);
            }}
          />
        </div>
      </div>
    </TitleContainer>
  );
};

export default Titlebar;
