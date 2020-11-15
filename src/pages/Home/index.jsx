import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { Divider, Button, Upload } from "antd";

import { Cards, PageLayout } from "../../styles";

import GeneralContext from "../../context/GeneralContext";

const Home = () => {
  const { push } = useHistory();
  const { loading, firstTime, userSettings } = useContext(GeneralContext);

  // console.log("loading", loading, firstTime, userSettings);
  if (loading) {
    return <Loading />;
  }
  if (firstTime && !userSettings && !loading) {
    setTimeout(() => {
      return push("/firsttimesetup");
    }, 0);
    // NewProject
    // return <Loading />;
  }
  return (
    <PageLayout>
      {/* <Divider /> */}
      <h1>Welcome</h1>
      <Divider />
      <h3>Choose an Option:</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr ",
          gridGap: 20,
        }}
      >
        <Cards>
          <h2>Style a New Project</h2>
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
        </Cards>
      </div>
    </PageLayout>
  );
};

export default Home;
