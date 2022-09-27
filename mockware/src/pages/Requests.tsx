import React, { useState, useEffect } from "react";
import { LoadingIconSimple, RefreshIcon } from "../component/Icons";
import Loading from "../component/Loading";
import Modal from "../component/Modal";
import NotFound from "../component/NotFound";
import Pagination from "../component/Pagination";
import { fetchRequests } from "../api";
import { IMapping, IRequest } from "../interface";
import RequestItem from "./RequestItem";

const Requests = ({
  mapping,
  SearchText,
}: {
  mapping?: IMapping;
  SearchText: string;
}) => {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [Requests, setRequests] = useState<Array<IRequest>>([]);
  const [mode, setMode] = useState(mapping ? "forStub" : "journal");
  const [FilterBySearchText, setFilterBySearchText] = useState(
    SearchText !== "" ? true : false
  );
  const [IsUnmatched, setIsUnmatched] = useState(false);
  const [SelectedRequest, setSelectedRequest] = useState<IRequest>();
  const [IsLoading, setIsLoading] = useState(true);

  //intentional 300ms delay to demo loading icon
  const loadRequests = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetchRequests(
        (results: Array<IRequest>) => {
          setRequests(results);
          setIsLoading(false);
        },
        (err: Error) => {
          console.log(Error);
        }
      );
    }, 300);
  };

  useEffect(() => {
    loadRequests();
    if (SearchText !== "") {
      setFilterBySearchText(true);
      setMode("journal");
    }
    return () => { };
  }, [mapping, SearchText]);

  const PageSize = 6;

  const filteredRequests: Array<IRequest> = Requests.filter(
    (request: IRequest) => {
      if (IsUnmatched) {
        return !request.wasMatched;
      } else if (mode === "forStub") {
        return request.wasMatched && request.stubMapping.id == mapping?.uuid;
      } else if (FilterBySearchText) {
        return JSON.stringify(request).includes(SearchText);
      }
      {
        return true;
      }
    }
  );

  return (
    <React.Fragment>
      <div className="page">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <React.Fragment>
              <h1>Request Journal</h1>
              <div className="tags">
                <a
                  href="#"
                  className={
                    !IsUnmatched && !FilterBySearchText && mode === "journal"
                      ? "active"
                      : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMode("journal");
                    setIsUnmatched(false);
                    setFilterBySearchText(false);
                  }}
                >
                  all
                </a>
                <a
                  href="#"
                  className={IsUnmatched ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMode("journal");
                    setIsUnmatched(true);
                    setFilterBySearchText(false);
                  }}
                >
                  Unmatched requests
                </a>
                {mapping && (
                  <a
                    href="#"
                    className={mode === "forStub" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMode("forStub");
                      setIsUnmatched(false);
                    }}
                  >
                    Stub:
                    {mapping?.metadata.name}
                  </a>
                )}
                {SearchText != "" && (
                  <a
                    href="#"
                    className={FilterBySearchText ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMode("journal");
                      setIsUnmatched(false);
                      setFilterBySearchText(true);
                    }}
                  >
                    {"search:" + SearchText}
                  </a>
                )}
              </div>

              {IsLoading && (
                <i className="svg-icon" style={{ fontSize: "40px" }}>
                  <LoadingIconSimple />
                </i>
              )}
              {!IsLoading && (
                <a
                  href="#"
                  onClick={(e) => {
                    setIsLoading(true);
                    loadRequests();
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 1000);
                  }}
                >
                  <i className="svg-icon" style={{ fontSize: "40px" }}>
                    <RefreshIcon />
                  </i>
                </a>
              )}
            </React.Fragment>
          </div>
          <Pagination
            currentPage={CurrentPage}
            noOfItems={filteredRequests.length}
            onPageChange={(page: number) => {
              setCurrentPage(page);
            }}
            pageSize={PageSize}
          />
        </div>

        {IsLoading && <Loading />}

        {!IsLoading && filteredRequests.length > 0 && (
          <div className="nav">
            <ul className="list">
              {filteredRequests.map((request, index) => {
                if (
                  index >= (CurrentPage - 1) * PageSize &&
                  index < CurrentPage * PageSize
                ) {
                  return (
                    <RequestItem
                      key={index}
                      request={request}
                      setSelectedRequest={setSelectedRequest}
                    />
                  );
                }
              })}
            </ul>
          </div>
        )}

        {!IsLoading && filteredRequests.length === 0 && mode === "journal" && (
          <NotFound
            title="No requests found"
            message="Requests are generated when simulation is enabled on Connector."
          />
        )}

        {!IsLoading &&
          filteredRequests.length === 0 &&
          mode === "forStub" &&
          !IsLoading && (
            <NotFound
              title="No requests found for the stub"
              message={
                'There is no requests matched by the stub "' +
                mapping?.metadata.name +
                '" for connector ' +
                mapping?.metadata.pyClassName +
                "." +
                mapping?.metadata.pyRuleName
              }
            />
          )}
      </div>
      {SelectedRequest && (
        <Modal
          title="Request data"
          onClose={() => {
            setSelectedRequest(undefined);
          }}
          content={
            <div
              style={{
                maxHeight: "600px",
                maxWidth: "800px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <pre>{JSON.stringify(SelectedRequest, null, 4)}</pre>
            </div>
          }
        />
      )}
    </React.Fragment>
  );
};

export default Requests;
