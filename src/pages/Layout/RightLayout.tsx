import React from "react";
import { Switch, Route } from "react-router-dom";

import routes from "../../routes";
import { RightContainer } from "./styles";

const RightLayout = () => {
  return (
    <RightContainer>
      <Switch>
        {routes.map(({ path, Component }: any, key) => (
          <Route
            path={path}
            key={key}
            render={(props) => {
              return <Component />;
            }}
          />
        ))}
      </Switch>
    </RightContainer>
  );
};

export default RightLayout;
