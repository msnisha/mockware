import React, { useState } from "react";
import {
  AddIcon,
  LoadingIconSimple,
  MappingIcon,
  ToggleOffIcon,
  ToggleOnIcon,
  TrashIcon,
} from "../component/Icons";
import { cryb53, updateMockSetting } from "../api";
import { IMapping } from "../interface";

const ConnectorItem = ({
  connector,
  setCurrentConnector,
}: {
  connector: any;
  setCurrentConnector: Function;
}) => {
  const [ConnectorState, setConnectorState] = useState(
    connector.pxPages.Simulation.pyRuleAvailable
      ? connector.pxPages.Simulation.pyRuleAvailable
      : "off"
  );
  const [IsSaving, setIsSaving] = useState(false);

  const updateMockSettings = (
    action: string,
    scope: string,
    className: string,
    rulename: string,
    uuid?: string
  ) => {
    setIsSaving(true);
    updateMockSetting(
      (result: IMapping) => {
        if (action === "delete") {
          setConnectorState("off");
        } else if (action === "enable") {
          setConnectorState("Yes");
        } else if (action === "disable") {
          setConnectorState("No");
        } else if (action === "add") {
          setConnectorState("Yes");
        }
        setIsSaving(false);
      },
      (error: Error) => {
        setIsSaving(false);
        console.log(error);
      },
      className,
      rulename,
      action,
      scope,
      uuid
    );
  };

  return (
    <li
      className={"item" + (ConnectorState ? " cursor" : "")}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (connector.pxPages.Simulation.pyRuleAvailable) {
          setCurrentConnector({ ...connector });
        }
      }}
    >
      <div className="heading">
        <h3>{connector.pyRuleName}</h3>
        <p>{connector.pyClassName}</p>
      </div>
      <div className="actions">
        {IsSaving && (
          <i className="svg-icon" style={{ fontSize: "40px" }}>
            <LoadingIconSimple />
          </i>
        )}
        {!IsSaving && (
          <React.Fragment>
            {ConnectorState === "off" && (
              <a
                href="#"
                className="button button-big bg-default"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateMockSettings(
                    "add",
                    "",
                    connector.pyClassName,
                    connector.pyRuleName,
                    cryb53(connector.pxInsName)
                  );
                }}
                title="Add to simulation"
              >
                <AddIcon />
              </a>
            )}
            {ConnectorState === "Yes" && (
              <React.Fragment>
                <a
                  href="#"
                  className="button button-big bg-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateMockSettings(
                      "delete",
                      "",
                      connector.pyClassName,
                      connector.pyRuleName
                    );
                  }}
                  title="Remove from simulation"
                >
                  <TrashIcon />
                </a>
                <a
                  href="#"
                  className="button button-big bg-success"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateMockSettings(
                      "disable",
                      "",
                      connector.pyClassName,
                      connector.pyRuleName
                    );
                  }}
                  title="Disable simulation"
                >
                  <ToggleOnIcon />
                </a>
                <a
                  href="#"
                  className="button button-big bg-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentConnector({ ...connector });
                  }}
                  title="View Mappings"
                >
                  <MappingIcon />
                </a>
              </React.Fragment>
            )}
            {ConnectorState === "No" && (
              <React.Fragment>
                <a
                  href="#"
                  className="button button-big bg-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateMockSettings(
                      "delete",
                      "",
                      connector.pyClassName,
                      connector.pyRuleName
                    );
                  }}
                  title="Remove all simulations"
                >
                  <TrashIcon />
                </a>
                <a
                  href="#"
                  className="button button-big bg-default"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateMockSettings(
                      "enable",
                      "",
                      connector.pyClassName,
                      connector.pyRuleName
                    );
                  }}
                  title="Click to enable"
                >
                  <ToggleOffIcon />
                </a>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </li>
  );
};

export default ConnectorItem;
