import React, { useState } from "react";
import { CopyIcon, TickIcon, ViewIcon } from "../component/Icons";
import { getRelativeTime } from "../config";
import { IRequest } from "../interface";

const RequestItem = ({
  request,
  setSelectedRequest,
}: {
  request: IRequest;
  setSelectedRequest: Function;
}) => {
  const [IsCopied, setIsCopied] = useState(false);

  return (
    <li
      className={"item cursor"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // setCurrentMapping({ ...request });
      }}
    >
      <div className="heading">
        <h3>{request.request.method + " : " + request.request.url}</h3>
        <p>
          {request.wasMatched && (
            <span className="tag">
              {" "}
              {request.stubMapping.metadata.name} (
              {request.stubMapping.metadata.pyClassName +
                "." +
                request.stubMapping.metadata.pyRuleName}
              )
            </span>
          )}
          {!request.wasMatched && <span className="tag danger">Unmatched</span>}
          {" " + getRelativeTime(request.request.loggedDateString)}
          {" | http.status = "}
          {request.responseDefinition.status}
        </p>
      </div>
      <div className="actions">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedRequest(request);
          }}
          title="View the request"
          className="button button-big bg-primary"
        >
          <i className="svg-icon">
            <ViewIcon />
          </i>
        </a>
        <a
          href="#"
          className="button button-big bg-danger"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(JSON.stringify(request, null, 4));
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1000);
          }}
          title="Copy the request"
        >
          {IsCopied ? (
            <i className="svg-icon">
              <TickIcon />
            </i>
          ) : (
            <i className="svg-icon">
              <CopyIcon />
            </i>
          )}
        </a>
      </div>
    </li>
  );
};

export default RequestItem;
