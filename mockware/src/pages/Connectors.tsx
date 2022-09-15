import React, { useEffect, useState } from "react";
import { GoBackIcon, LoadingIconSimple, RefreshIcon } from "../component/Icons";
import NotFound from "../component/NotFound";
import Pagination from "../component/Pagination";
import { IConnector, IMapping } from "../interface";
import Connector from "./Connector";
import ConnectorItem from "./ConnectorItem";

const Connectors = ({
  connectors,
  mappings,
  loadMappings,
  loadConnectors,
}: {
  connectors: Array<IConnector>;
  mappings: Array<IMapping>;
  loadMappings: Function;
  loadConnectors: Function;
}) => {
  const [CurrentConnector, setCurrentConnector] = useState<IConnector>();
  const [IsSaving, setIsSaving] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const PageSize = 10;

  useEffect(() => {}, [connectors]);

  return (
    <div className="page">
      {!CurrentConnector && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1>Pega Connectors</h1>
            {IsSaving && (
              <i className="svg-icon" style={{ fontSize: "40px" }}>
                <LoadingIconSimple />
              </i>
            )}
            {!IsSaving && (
              <a
                href="#"
                onClick={(e) => {
                  setIsSaving(true);
                  loadConnectors();
                  setTimeout(() => {
                    setIsSaving(false);
                  }, 500);
                }}
              >
                <i className="svg-icon" style={{ fontSize: "40px" }}>
                  <RefreshIcon />
                </i>
              </a>
            )}
          </div>
          <Pagination
            currentPage={CurrentPage}
            noOfItems={connectors.length}
            onPageChange={(page: number) => {
              setCurrentPage(page);
            }}
            pageSize={PageSize}
          />
        </div>
      )}
      {CurrentConnector && (
        <h1>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentConnector(undefined);
            }}
          >
            <GoBackIcon />
          </a>
          {" " + CurrentConnector.pyRuleName}
        </h1>
      )}
      {!CurrentConnector && (
        <React.Fragment>
          {connectors.length == 0 && (
            <NotFound
              title="No connectors found"
              message="The REST connectors accessible by the authenticated Pega user will appear here."
            />
          )}
          <div className="nav">
            <ul className="list">
              {connectors.map((connector, index) => {
                if (
                  index >= (CurrentPage - 1) * PageSize &&
                  index < CurrentPage * PageSize
                ) {
                  return (
                    <ConnectorItem
                      connector={connector}
                      key={index}
                      setCurrentConnector={setCurrentConnector}
                    />
                  );
                }
              })}
            </ul>
          </div>
        </React.Fragment>
      )}
      {CurrentConnector && (
        <React.Fragment>
          <Connector
            connector={CurrentConnector}
            mappings={mappings}
            loadMappings={loadMappings}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default Connectors;
