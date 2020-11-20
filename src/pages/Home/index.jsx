import React, { useContext, useEffect, useState } from "react";
import * as R from "ramda";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { Divider, Button } from "antd";

import {
  PageLayout,
  CardHeading,
  CardSubHeading,
  CardTwoHeading,
} from "../../styles";

import GeneralContext from "../../context/GeneralContext";

const propName = R.prop("date");
const sortOne = R.sortWith([R.descend(propName)]);
const Home = () => {
  const { push } = useHistory();
  const [foundProjects, setFoundProjects] = useState([]);
  const { loading, firstTime, getLocalSettings } = useContext(GeneralContext);
  getLocalSettings();
  useEffect(() => {
    const getSaveProjects = localStorage.getItem("SAVED_PROJECTS");
    if (getSaveProjects) {
      const parseProjects = JSON.parse(getSaveProjects);
      setFoundProjects(sortOne(parseProjects));
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (firstTime && !loading) {
    setTimeout(() => {
      return push("/firsttimesetup");
    }, 0);
  }
  return (
    <PageLayout>
      <CardHeading>List of All Projects</CardHeading>
      <CardSubHeading style={{}}>
        Here you can setup a new Project
      </CardSubHeading>
      <Divider />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",

          gridGap: 20,
        }}
      >
        {foundProjects &&
          foundProjects.map((project) => {
            return (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr",
                    alignItems: "center",
                    gridGap: 20,
                  }}
                >
                  <div>
                    <CardTwoHeading>{project.name}</CardTwoHeading>
                    <CardSubHeading>
                      Path:{" "}
                      <span style={{ color: "#dcdee3" }}>
                        {project.projectPath}
                      </span>
                    </CardSubHeading>
                    <CardSubHeading>
                      Date:{" "}
                      <span style={{ color: "#dcdee3" }}>
                        {format(new Date(project.date), "dd/MM/yyyy")}
                      </span>
                    </CardSubHeading>
                  </div>
                  <Button
                    type="primary"
                    onClick={() => push(`/ProjectPage/${project.id}`)}
                  >
                    Open
                  </Button>
                </div>
                <Divider />
              </>
            );
          })}
        {/* <Cards>
          <Button
            type="primary"
            style={{ width: "100%", fontSize: 14 }}
            onClick={() => push("/NewProject")}
          >
            Select
          </Button>
        </Cards>
        <Cards>
          <h2>Style existing Project</h2>
          <Button type="primary" style={{ width: "100%", fontSize: 14 }}>
            Select
          </Button>
        </Cards> */}
      </div>
    </PageLayout>
  );
};

export default Home;
