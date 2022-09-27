import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import HandleBodyMatching from "../component/HandleBodyMatching";
import HandleParam from "../component/HandleParam";
import {
  AddIcon,
  LoadingIconSimple,
  SaveIcon,
  SelectedIcon,
  TrashIcon,
  MappingIcon
} from "../component/Icons";
import Loading from "../component/Loading";
import Priority from "../component/Priority";
import {
  cryb53,
  deleteMappings,
  fetchConnectorDetails,
  persistMappings,
  saveMappings,
  updateMockSetting,
} from "../api";
import {
  IConnector,
  IConnectorDetails,
  IMapping,
  IRequestParamType,
} from "../interface";

const Connector = ({
  connector,
  mappings,
  loadMappings,
}: {
  connector: IConnector;
  mappings: Array<IMapping>;
  loadMappings: Function;
}) => {
  const uniqueCode = cryb53(connector.pxInsName);
  const [currentMappings, setMappings] = useState<Array<IMapping>>([]);
  const [selectedMapping, setSelectedMapping] = useState<IMapping>();
  const [ConnectorDetail, setConnectorDetail] = useState<IConnectorDetails>();
  const [IsConnectorLoaded, setIsConnectorLoaded] = useState(false);
  const [IsSaving, setIsSaving] = useState(false);

  const setStubsForSelectedConnector = () => {
    setMappings(
      mappings.filter((mapping) => {
        return mapping.metadata && mapping.metadata.uniqueCode === uniqueCode;
      })
    );
  };

  const addMatchingParams = (type: string) => {
    if (!selectedMapping) {
      return;
    }
    let mapping = { ...selectedMapping };

    if (type === "bodyParams") {
      mapping.metadata.bodyParams.push({
        matchField: "",
        matchValue: "",
      });
    } else if (type === "queryParams") {
      mapping.metadata.queryParams.push({
        pyMapFrom: "",
        pyMapFromKey: "",
        pyParameterName: "",
        matchType: "any",
      });
    } else if (type === "headerParams") {
      mapping.metadata.headerParams.push({
        pyMapFrom: "",
        pyMapFromKey: "",
        pyParameterName: "Accept",
        matchType: "equals",
        matchValue: "application/json",
      });
    } else if (type === "pathParams") {
      mapping.metadata.pathParams.push({
        pyMapFrom: "",
        pyMapFromKey: "",
        pyParameterName: "",
        matchType: "any",
      });
    } else if ((type = "respHeaderParams")) {
      mapping.metadata.respHeaderParams.push({
        pyMapFrom: "",
        pyMapFromKey: "",
        pyParameterName: "Content-Type",
        matchType: "equals",
        matchValue: "application/json",
      });
    }
    setSelectedMapping(mapping);
  };

  const handleFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!selectedMapping) {
      return;
    }
    let mapping = { ...selectedMapping };
    if (e.target.name === "method") {
      mapping.request.method = e.target.value;
      mapping.metadata.queryParams = [];
      mapping.metadata.headerParams = [];
      mapping.metadata.respHeaderParams = [];

      if (e.target.value === "GET") {
        ConnectorDetail?.pyGETRequestHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.headerParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyGETRequestParameters.forEach((element) => {
          console.log(element);

          if (element.pyParameterName) {
            mapping.metadata.queryParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyGETResponseHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.respHeaderParams.push(getQueryParam(element));
          }
        });
      } else if (e.target.value === "POST") {
        ConnectorDetail?.pyPOSTRequestHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.headerParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyPOSTRequestParameters.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.queryParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyPOSTResponseHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.respHeaderParams.push(getQueryParam(element));
          }
        });
      } else if (e.target.value === "PUT") {
        ConnectorDetail?.pyPUTRequestHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.headerParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyPUTRequestParameters.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.queryParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyPUTResponseHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.respHeaderParams.push(getQueryParam(element));
          }
        });
      } else if (e.target.value === "DELETE") {
        ConnectorDetail?.pyDELETERequestHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.headerParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyDELETERequestParameters.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.queryParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyDELETEResponseHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.respHeaderParams.push(getQueryParam(element));
          }
        });
      } else if (e.target.value === "PATCH") {
        ConnectorDetail?.pyPATCHRequestHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.headerParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyPATCHRequestParameters.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.queryParams.push(getQueryParam(element));
          }
        });
        ConnectorDetail?.pyPATCHResponseHeaders.forEach((element) => {
          if (element.pyParameterName) {
            mapping.metadata.respHeaderParams.push(getQueryParam(element));
          }
        });
      }
    }

    if (e.target.name === "name") {
      mapping.metadata.name = e.target.value;
    }
    if (e.target.name === "priority") {
      mapping.priority = parseInt(e.target.value);
    }
    if (e.target.name === "delay") {
      mapping.response.fixedDelayMilliseconds = parseInt(e.target.value);
    }
    if (e.target.name === "statusCode") {
      mapping.response.status = parseInt(e.target.value);
    }
    if (e.target.name === "responseBody") {
      mapping.response.body = e.target.value;
    }
    setSelectedMapping(mapping);
  };

  const handleMappingChange = (
    item: IRequestParamType,
    type: string,
    index: number
  ) => {
    if (!selectedMapping) {
      return;
    }
    let mapping = { ...selectedMapping };
    if (type == "queryParams") {
      mapping.metadata.queryParams[index] = item;
    }
    if (type == "pathParams") {
      mapping.metadata.pathParams[index] = item;
    }
    if (type == "headerParams") {
      mapping.metadata.headerParams[index] = item;
    }
    if (type == "bodyParams") {
      mapping.metadata.bodyParams[index] = item;
    }
    if (type == "respHeaderParams") {
      mapping.metadata.respHeaderParams[index] = item;
    }
    mapping.metadata.url = getBaseUrl(mapping);
    setSelectedMapping(mapping);
  };

  const handleMappingRemove = (type: string, index: number) => {
    if (!selectedMapping) {
      return;
    }
    let mapping = { ...selectedMapping };
    if (type == "bodyParams") {
      mapping.metadata.bodyParams.splice(index, 1);
    } else if (type == "queryParams") {
      mapping.metadata.queryParams.splice(index, 1);
    } else if (type == "pathParams") {
      mapping.metadata.pathParams.splice(index, 1);
    } else if (type == "headerParams") {
      mapping.metadata.headerParams.splice(index, 1);
    } else if (type == "respHeaderParams") {
      mapping.metadata.respHeaderParams.splice(index, 1);
    }
    setSelectedMapping(mapping);
  };

  const getBaseUrl = (mapping: IMapping) => {
    let baseURL = "";
    mapping.metadata.pathParams.forEach((each, index) => {
      baseURL += "/" + each.matchValue;
    });

    mapping.metadata.queryParams.forEach((each, index) => {
      console.log(each);
      if (each.matchType != "any") {
        if (index == 0) {
          baseURL += "?" + each.pyParameterName + "=" + each.matchValue;
        } else {
          baseURL += "&" + each.pyParameterName + "=" + each.matchValue;
        }
      }
    });
    return baseURL;
  };

  const saveMapping = () => {
    if (!selectedMapping) {
      return;
    }
    setIsSaving(true);
    saveMappings(
      (result: IMapping) => {
        console.log(result);
        setSelectedMapping({
          ...selectedMapping,
          uuid: result.uuid,
          id: result.id,
        });
        setIsSaving(false);
        loadMappings();
        persistMappings();
      },
      (error: Error) => {
        setIsSaving(false);
        console.log(error);
      },
      selectedMapping
    );
  };

  const deleteMapping = () => {
    if (!selectedMapping) {
      return;
    }
    setIsSaving(true);

    deleteMappings(
      () => {
        setSelectedMapping(undefined);
        setIsSaving(false);
        setTimeout(loadMappings, 500);
      },
      (error: Error) => {
        setIsSaving(false);
        console.log(error);
      },
      selectedMapping
    );
  };

  const loadConnectorDetails = () => {
    fetchConnectorDetails(
      (connector: IConnectorDetails) => {
        setIsConnectorLoaded(true);
        setConnectorDetail(connector);
      },
      (error: any) => {
        console.log(error);
      },
      connector.pyClassName,
      connector.pyRuleName
    );
  };

  const addNewMapping = () => {
    if (!IsConnectorLoaded) {
      console.error("Not loaded yet");
      return;
    }

    let newMapping: IMapping = {
      id: "",
      uuid: "",
      request: {
        method: "GET",
      },
      response: {
        status: 200,
        fixedDelayMilliseconds: 0,
        body: '{\n\t"status": "success"\n}',
      },
      priority: 1,
      metadata: {
        name: "Stub " + (currentMappings.length + 1),
        url: "",
        pyClassName: connector.pyClassName,
        pyRuleName: connector.pyRuleName,
        uniqueCode: uniqueCode,
        pathParams: [],
        queryParams: [],
        headerParams: [
          {
            pyMapFrom: "CONSTANT",
            pyMapFromKey: "",
            matchType: "equals",
            matchValue: uniqueCode,
            pyParameterName: "mockware_uuid",
          },
        ],
        bodyParams: [],
        respHeaderParams: [
          {
            pyMapFrom: "CONSTANT",
            pyMapFromKey: "",
            matchType: "equals",
            matchValue: "application/json",
            pyParameterName: "Content-Type",
          },
        ],
      },
    };
    ConnectorDetail?.pyEmbeddedURL.pyResourcePathParameters.forEach(
      (element) => {
        if (element.pyParameterName) {
          newMapping.metadata.pathParams.push(getQueryParam(element));
        }
      }
    );

    ConnectorDetail?.pyGETRequestParameters.forEach((element) => {
      if (element.pyParameterName) {
        newMapping.metadata.queryParams.push(getQueryParam(element));
      }
    });

    ConnectorDetail?.pyGETResponseHeaders.forEach((element) => {
      if (element.pyParameterName) {
        newMapping.metadata.respHeaderParams.push(getQueryParam(element));
      }
    });

    ConnectorDetail?.pyGETRequestHeaders.forEach((element) => {
      if (element.pyParameterName) {
        newMapping.metadata.headerParams.push(getQueryParam(element));
      }
    });

    newMapping.metadata.url = getBaseUrl(newMapping);

    setSelectedMapping(newMapping);
  };

  const getQueryParam = (element: IRequestParamType) => {
    let newParam = { ...element };
    newParam.matchType = "equals";
    newParam.matchValue = newParam.pyMapFromKey;
    if (newParam.pyMapFrom.toLowerCase() != "constant") {
      newParam.matchValue = "";
      newParam.matchType = "any";
    }
    return newParam;
  };

  useEffect(() => {
    setStubsForSelectedConnector();
    loadConnectorDetails();
    return () => { };
  }, [mappings]);

  return (
    <div style={{ display: "flex" }}>
      <div className="card">
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
            color: "white",
          }}
        >
          <h2 style={{ margin: "0px", color: "#4181ae" }}>Stubs</h2>
        </div>
        <div className="nav" style={{ width: "300px" }}>
          <ul className="list">
            {currentMappings.map((mapping, index) => {
              return (
                <li
                  className="item cursor"
                  key={index}
                  onClick={() => setSelectedMapping({ ...mapping })}
                >
                  <div className="heading" style={{ overflow: "hidden" }}>
                    <h3>{mapping.metadata.name}</h3>
                    <p className="line">
                      {mapping.request.method + ": " + mapping.metadata.url}
                    </p>
                  </div>
                  <div className="actions">
                    {mapping.uuid == selectedMapping?.uuid && <SelectedIcon />}
                  </div>
                </li>
              );
            })}
            <li className="item cursor" onClick={() => addNewMapping()}>
              <div className="heading">
                <h3>
                  <i className="svg-icon">
                    <AddIcon />
                  </i>
                  {" New Stub"}
                </h3>
                <p>Creates new stubbing</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {IsConnectorLoaded && (
        <div className="" style={{ flexGrow: 1 }}>
          {!selectedMapping && (
            <div className="empty">
              <div className="empty-icon">
                <MappingIcon />
              </div>
              <div className="empty-title">
                <h4>Edit or Create stub</h4>
                <p>Please choose a click on a stub to edit or <a href="#" onClick={(e) => {
                  e.preventDefault();
                  addNewMapping();
                }}>click here</a> to create new stub</p>
              </div>
            </div>
          )}
          {selectedMapping && (
            <React.Fragment>
              <Card
                title={
                  selectedMapping.request.method +
                  " : " +
                  selectedMapping.metadata.url +
                  " (" +
                  selectedMapping.metadata.name +
                  ")"
                }

                headerItems={
                  <div style={{ display: "flex" }}>
                    <a
                      className="button button-big bg-danger"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteMapping();
                      }}
                    >
                      <TrashIcon />
                    </a>
                    &nbsp;
                    <a
                      className="button button-big bg-primary"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        saveMapping();
                      }}
                    >
                      {IsSaving && <LoadingIconSimple />}
                      {!IsSaving && <SaveIcon />}
                    </a>
                  </div>
                }
              >
                <div style={{ display: "flex", gap: "8px", justifyContent: "space-evenly" }}>
                  <div className="form-block">
                    <label htmlFor="name">Scenario Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Scenario Name"
                      onChange={handleFieldChange}
                      value={selectedMapping.metadata.name}
                    />
                  </div>
                  <div className="form-block">
                    <label htmlFor="method">Method</label>
                    <select
                      id="method"
                      name="method"
                      value={selectedMapping.request.method}
                      onChange={handleFieldChange}
                    >
                      <option value="GET">GET</option>
                      <option value="PUT">PUT</option>
                      <option value="POST">POST</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>
                  <div className="form-block">
                    <label htmlFor="priority">Priority</label>
                    <Priority
                      value={
                        selectedMapping.priority ? selectedMapping.priority : 1
                      }
                      onChange={handleFieldChange}
                    />
                  </div><div className="form-block">
                    <label htmlFor="delay">Response Delay (ms)</label>
                    <input
                      type="number"
                      id="delay"
                      name="delay"
                      onChange={handleFieldChange}
                      value={selectedMapping.response.fixedDelayMilliseconds}
                    />
                  </div>

                </div>

              </Card>

              <div className="card" style={{ marginTop: "16px" }}>
                <div className="body">
                  <h2>Request Mapping</h2>

                  <Card
                    title="Resource Path Params"
                    headerItems={
                      <div style={{ display: "flex" }}>
                        <a
                          href="#"
                          className="button"
                          onClick={(e) => {
                            e.preventDefault();
                            addMatchingParams("pathParams");
                          }}
                        >
                          <AddIcon />
                        </a>
                      </div>
                    }
                  >
                    {selectedMapping.metadata.pathParams.map((each, index) => {
                      // if (each.pyParameterName === "uuid") {
                      //   return null;
                      // }
                      return (
                        <HandleParam
                          key={index}
                          item={each}
                          index={index}
                          changeHandler={handleMappingChange}
                          handleMatchingRemove={() => {
                            handleMappingRemove("pathParams", index);
                          }}
                          type="pathParams"
                        />
                      );
                    })}
                  </Card>

                  <Card
                    title="Query Params"
                    headerItems={
                      <div style={{ display: "flex" }}>
                        <a
                          href="#"
                          className="button"
                          onClick={(e) => {
                            e.preventDefault();
                            addMatchingParams("queryParams");
                          }}
                        >
                          <AddIcon />
                        </a>
                      </div>
                    }
                  >
                    {selectedMapping.metadata.queryParams.map((each, index) => {
                      return (
                        <HandleParam
                          key={index}
                          item={each}
                          index={index}
                          changeHandler={handleMappingChange}
                          handleMatchingRemove={() => {
                            handleMappingRemove("queryParams", index);
                          }}
                          type="queryParams"
                        />
                      );
                    })}
                  </Card>

                  <Card
                    title="Header Params"
                    headerItems={
                      <div style={{ display: "flex" }}>
                        <a
                          href="#"
                          className="button"
                          onClick={(e) => {
                            e.preventDefault();
                            addMatchingParams("headerParams");
                          }}
                        >
                          <AddIcon />
                        </a>
                      </div>
                    }
                  >
                    {selectedMapping.metadata.headerParams.map(
                      (each, index) => {
                        if (each.pyParameterName === "mockware_uuid") {
                          return;
                        }
                        return (
                          <HandleParam
                            key={index}
                            item={each}
                            index={index}
                            changeHandler={handleMappingChange}
                            handleMatchingRemove={() => {
                              handleMappingRemove("headerParams", index);
                            }}
                            type="headerParams"
                          />
                        );
                      }
                    )}
                  </Card>
                  {selectedMapping.request.method !== "GET" && (
                    <Card
                      title="Body Matching"
                      headerItems={
                        <div style={{ display: "flex" }}>
                          <a
                            href="#"
                            className="button"
                            onClick={(e) => {
                              e.preventDefault();
                              addMatchingParams("bodyParams");
                            }}
                          >
                            <AddIcon />
                          </a>
                        </div>
                      }
                    >
                      {selectedMapping.metadata.bodyParams.map(
                        (each, index) => {
                          return (
                            <HandleBodyMatching
                              key={index}
                              item={each}
                              index={index}
                              changeHandler={handleMappingChange}
                              handleMatchingRemove={() => {
                                handleMappingRemove("bodyParams", index);
                              }}
                              type="bodyParams"
                            />
                          );
                        }
                      )}
                    </Card>
                  )}
                </div>
              </div>
              <div
                className="card"
                style={{ marginTop: "16px" }}
              >
                <div className="body">
                  <h2>Response Definition</h2>

                  <Card
                    title="Response Headers"
                    headerItems={
                      <div style={{ display: "flex" }}>
                        <a
                          href="#"
                          className="button button-big"
                          onClick={(e) => {
                            e.preventDefault();
                            addMatchingParams("respHeaderParams");
                          }}
                        >
                          <AddIcon />
                        </a>
                      </div>
                    }
                  >
                    {selectedMapping.metadata.respHeaderParams.map(
                      (each, index) => {
                        return (
                          <HandleParam
                            key={index}
                            item={each}
                            index={index}
                            changeHandler={handleMappingChange}
                            handleMatchingRemove={() => {
                              handleMappingRemove("respHeaderParams", index);
                            }}
                            type="respHeaderParams"
                          />
                        );
                      }
                    )}
                  </Card>

                  <Card title="Response">
                    <div className="form-inline">
                      <label htmlFor="statusCode">Response Status Code</label>
                      <input
                        type="number"
                        id="statusCode"
                        name="statusCode"
                        placeholder="Resource Path"
                        value={selectedMapping.response.status}
                        onChange={handleFieldChange}
                      />
                    </div>
                    <textarea
                      id="responseBody"
                      name="responseBody"
                      rows={30}
                      placeholder="Response Body"
                      value={selectedMapping.response.body}
                      onChange={handleFieldChange}
                      style={{ width: "90%", color: "#60b660" }}
                    />
                  </Card>
                </div>

                <div
                  style={{
                    padding: "16px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="submit"
                    disabled={IsSaving}
                    onClick={(e) => {
                      saveMapping();
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="svg-icon">
                      {IsSaving && <LoadingIconSimple />}
                    </div>
                    {selectedMapping.uuid && " Update"}
                    {!selectedMapping.uuid && " Save"}
                  </button>
                </div>

              </div>
            </React.Fragment>
          )}
        </div>
      )
      }
      {
        !IsConnectorLoaded && (
          <div style={{ flexGrow: 3 }}>
            <Loading />
          </div>
        )
      }
    </div >
  );
};

export default Connector;
