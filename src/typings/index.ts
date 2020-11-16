import { ReactNode } from "react";

type ReactChildNodeType = {
  children?: ReactNode;
};
export type QueryContextProps = {
  loading: boolean;
  firstTime: boolean;
  userSettings: any;
  nodeAndGulpCheck: any;
  getLocalSettings: any;
};

export interface QueryProviderProps extends ReactChildNodeType {}
