import React from "react";
import Terminal from "terminal-in-react";

const TerminalComp = () => {
  return (
    <Terminal
      watchConsoleLogging
      hideTopBar={true}
      allowTabs={false}
      color="green"
      backgroundColor="black"
      barColor="black"
    />
  );
};

export default TerminalComp;
