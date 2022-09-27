import React, { useEffect } from "react";

import {
  LoadingIconSimple,
  RefreshIcon,
  RequestIcon,
} from "../component/Icons";
import NotFound from "../component/NotFound";
import Pagination from "../component/Pagination";
import { IMapping } from "../interface";
import { fetchMappings } from "../api";
import Loading from "../component/Loading";

const Mappings = ({
  setCurrentMapping,
  setCurrentView,
  IsMappingLoading,
}: {
  setCurrentMapping: Function;
  setCurrentView: Function;
  IsMappingLoading: boolean;
}) => {

  const [mappings, setMappings] = React.useState<Array<IMapping>>([]);
  const [IsLoading, setIsLoading] = React.useState(false);
  const [CurrentPage, setCurrentPage] = React.useState(1);
  const [HasError, setHasError] = React.useState(false);
  const PageSize = 10;

  const loadMappings = () => {
    setIsLoading(true);
    setTimeout(
      () =>
        fetchMappings(
          (results: Array<IMapping>) => {
            setMappings(results);
            setIsLoading(false);
          },
          (err: Error) => {
            console.error(Error);
            setHasError(true);
            setIsLoading(false);
          }
        ),
      1000
    );
  };

  useEffect(() => {
    loadMappings();
    return () => {

    }
  }, []);

  return (


    <div className="page">
      {IsLoading && <Loading title="Loading the stub mappings" />}
      {!IsLoading && HasError && <div>
        Error occured while loading the stub mappings</div>}
      {!IsLoading && <React.Fragment>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1>Stub Mappings</h1>
            {IsMappingLoading && (
              <i className="svg-icon" style={{ fontSize: "40px" }}>
                <LoadingIconSimple />
              </i>
            )}
            {!IsMappingLoading && (
              <a
                href="#"
                onClick={(e) => {
                  loadMappings();
                }}
              >
                <i className="svg-icon" style={{ fontSize: "40px" }}>
                  <RefreshIcon />
                </i>
              </a>
            )}
          </div>
          <Pagination
            currentPage={1}
            noOfItems={mappings.length}
            onPageChange={() => {
              console.log("Page changed");
            }}
            pageSize={10}
          />
        </div>
        {mappings.length > 0 && (
          <div className="nav">
            <ul className="list">
              {mappings.map((mapping, index) => {
                return (
                  <li
                    className={"item cursor"}
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentMapping({ ...mapping });
                      setCurrentView("Requests");
                    }}
                  >
                    <div className="heading">
                      <h3>
                        {mapping.metadata.name} -{" "}
                        {mapping.metadata.pyClassName +
                          "." +
                          mapping.metadata.pyRuleName}
                      </h3>

                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ marginRight: "16px" }}>
                          {mapping.request.method +
                            " : " +
                            mapping.metadata.url}{" "}
                        </p>
                        {" Priority: High"}
                        <input
                          type="range"
                          name="priority"
                          min={1}
                          max={10}
                          step={1}
                          defaultValue={mapping.priority}
                          disabled={true}
                          style={{
                            width: "80px",
                            padding: "0px",
                            margin: "4px",
                            accentColor: "#8b663fa3",
                          }}
                        />
                        {"Low"}
                      </div>
                    </div>
                    <div className="actions">
                      <React.Fragment>
                        <a
                          href="#"
                          className="button button-big bg-default"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentMapping({ ...mapping });
                            setCurrentView("Requests");
                          }}
                          title="Matching Requests"
                        >
                          <i className="svg-icon">
                            <RequestIcon />
                          </i>
                        </a>
                      </React.Fragment>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {mappings.length === 0 && (
          <NotFound
            title="No stubs found"
            message="Create a stub by going to connector page"
          />
        )}
      </React.Fragment>}
    </div>

  );
};

export default Mappings;
