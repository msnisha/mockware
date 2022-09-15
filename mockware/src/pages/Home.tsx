import React from "react";
import { ConnectorIcon, MappingIcon, RequestIcon } from "../component/Icons";
import Overview from "../component/Overview";
import { IConnector, IMapping, IRequest } from "../interface";

const Home = ({
  connectors,
  mappings,
  setCurrentView,
  HasError,
}: {
  connectors: Array<IConnector>;
  mappings: Array<IMapping>;
  setCurrentView: Function;
  HasError: boolean;
}) => {
  return (
    <div className="overview">
      <Overview
        icon={ConnectorIcon}
        title="Connectors"
        value={connectors.length + ""}
        onClick={() => {
          setCurrentView("Simulations");
        }}
        HasError={HasError}
      />

      <Overview
        icon={MappingIcon}
        title="Mappings"
        value={mappings.length + ""}
        onClick={() => {
          setCurrentView("Mappings");
        }}
        HasError={HasError}
      />
      {/* <Overview
        icon={RequestIcon}
        title="Recent Requests"
        value={requests.length + ""}
        onClick={() => {
          setCurrentView("Requests");
        }}
      /> */}
    </div>
  );
};

export default Home;
