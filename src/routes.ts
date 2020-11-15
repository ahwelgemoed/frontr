import Home from "./pages/Home";
import FirstTimeSetup from "./pages/FirstTimeSetup/FirstTimeSetup";
import InstallNode from "./pages/Helper/InstallNode";
import NewProject from "./pages/NewProject/NewProject";

export default [
  {
    path: "/NewProject",
    name: "NewProject",
    Component: NewProject,
  },
  {
    path: "/InstallNode",
    name: "InstallNode",
    Component: InstallNode,
  },
  {
    path: "/firsttimesetup",
    name: "FirstTimeSetup",
    Component: FirstTimeSetup,
  },
  { path: "/", name: "Home", Component: Home },
];
