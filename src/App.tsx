import React from "react";
import "./app.scss";
import "rc-menu/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import GeneralProvider from "./context/GeneralProvider";
import { BrowserRouter as Router } from "react-router-dom";

import { MainLayout } from "./styles";

import { LeftLayout, RightLayout, Titlebar } from "./pages";

function App() {
  return (
    <Router>
      <GeneralProvider>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "10vh, 2fr",
          }}
        >
          <div>
            <Titlebar />
          </div>
          <MainLayout>
            <LeftLayout />
            <RightLayout />
          </MainLayout>
        </div>
      </GeneralProvider>
    </Router>
  );
}

export default App;
