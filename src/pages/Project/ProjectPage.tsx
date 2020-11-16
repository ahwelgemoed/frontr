import React from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const t = useParams();
  console.log("t", t);
  return <div>ProjectPage</div>;
};

export default ProjectPage;
