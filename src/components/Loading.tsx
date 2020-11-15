import React from "react";
import Loader from "react-loader-spinner";

export const Loading = () => {
  return (
    <div
      style={{
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  );
};
