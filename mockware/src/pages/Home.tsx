import React from "react";
import { getSimulatedConnectorsEndPoint, mappingEndPoint, requestsEndPoint, unmatchedReqEndPoint } from "../api";
import { ConnectorIcon, MappingIcon, RequestIcon } from "../component/Icons";
import Overview from "../component/Overview";


const getConnectorCount = (data: any) => {
  return data.pxResultCount;
};

const getMetaTotal = (data: any) => {
  return data.meta.total;
};

const getUnmatchedRequestCount = (data: any) => {
  return data.requests.length;
};

const Home = ({
  setCurrentView,
}: {
  setCurrentView: Function;
}) => {
  return (
    <div className="overview">
      <Overview
        dataSource={getSimulatedConnectorsEndPoint}
        icon={ConnectorIcon}
        title="Simulated Connectors"
        isAuthenticated={true}
        getValueFromData={getConnectorCount}
        onClick={() => {
          setCurrentView("Connectors")
        }} />

      <Overview dataSource={mappingEndPoint} icon={MappingIcon} styleClass="warning" title="Stub mappings" isAuthenticated={false}
        getValueFromData={getMetaTotal}
        onClick={() => {
          setCurrentView("Mappings")
        }} />


      <Overview dataSource={requestsEndPoint} icon={RequestIcon} title="Recent Request" isAuthenticated={false}
        getValueFromData={getMetaTotal}
        onClick={() => {
          setCurrentView("Requests")
        }} />

      <Overview dataSource={unmatchedReqEndPoint} styleClass="danger" icon={ConnectorIcon} title="Unmatched Requests"
        isAuthenticated={true}
        getValueFromData={getUnmatchedRequestCount}
        onClick={() => {
          setCurrentView("Requests")
        }} />


    </div>
  );
};

export default Home;
