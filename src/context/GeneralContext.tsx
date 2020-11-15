import React from "react";
import { QueryContextProps } from "../typings";

const GeneralContext = React.createContext<Partial<QueryContextProps>>({});

export default GeneralContext;
