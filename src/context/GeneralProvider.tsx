import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GeneralContext from "./GeneralContext";

import { QueryProviderProps } from "../typings";

// const USER_SETTINGS = "user_settings";

const GeneralProvider = ({ children }: QueryProviderProps) => {
  const { push } = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [nodeAndGulpCheck, setNodeAndGulpCheck] = useState<boolean>(false);
  const [userSettings, setUserSettings] = useState<any>("");

  useEffect(() => {
    if (!firstTime) {
      return push("/");
    }
  }, [firstTime]);

  useEffect(() => {
    const start = async () => {
      try {
        getLocalSettings();
      } catch (error) {
        console.log(error);
      }
    };
    start();
  }, []);

  const getLocalSettings = async () => {
    try {
      const userSettings = await localStorage.getItem("USER_SETTINGS");
      if (!userSettings) {
        setFirstTime(true);
        setLoading(false);
        return;
      }
      const parseUserSettings = await JSON.parse(userSettings);
      if (parseUserSettings) {
        setUserSettings(parseUserSettings);
        setNodeAndGulpCheck(parseUserSettings.nodeAndGulpCheck);
        setFirstTime(false);
        setLoading(false);
        return;
      }
    } catch (error) {}
  };

  return (
    <GeneralContext.Provider
      value={{
        loading,
        firstTime,
        userSettings,
        nodeAndGulpCheck,
        getLocalSettings,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;

// import { useEffect, useState } from "react";

// export const useFetchRemoteJson = (url: string): any => {
//     const [response, setResponse] = useState(null);
//     if (url) {
//         useEffect(() => {
//             const fetchData = async () => {
//                 try {
//                     const res = await fetch(url);
//                     const json = await res.json();
//                     setResponse(json);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             };
//             fetchData();
//         }, []);
//     }
//     return { response };
// };
