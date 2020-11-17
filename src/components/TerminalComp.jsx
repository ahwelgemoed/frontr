import React from "react";
import Terminal from "terminal-in-react";

const TerminalComp = () => {
  return (
    <Terminal
      watchConsoleLogging
      hideTopBar={true}
      allowTabs={false}
      color="#DCDEE3"
      backgroundColor="#3B3C41"
      barColor="black"
    />
  );
};

export default TerminalComp;
