import React, { useEffect, useRef } from "react";
import "./app.scss";
import "rc-menu/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import GeneralProvider from "./context/GeneralProvider";
import { BrowserRouter as Router } from "react-router-dom";

import { MainLayout } from "./styles";

import { LeftLayout, RightLayout } from "./pages";

function App() {
  const ref = useRef(null);
  useEffect(() => {
    // console.log("ref", ref);
  }, [ref]);

  return (
    <Router>
      <GeneralProvider>
        <MainLayout>
          <LeftLayout />
          <RightLayout />
        </MainLayout>
      </GeneralProvider>
    </Router>
  );
}

export default App;
