import React from "react";
import { CopyIcon, ViewIcon } from "../component/Icons";
import { IRequest, IRequestForStub } from "../interface";

const RequestForStubItem = ({ request }: { request: IRequestForStub }) => {
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
        <h3>{request.method + " : " + request.url}</h3>
      </div>
      <div className="actions">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          title="View the request"
        >
          <i className="svg-icon">
            <ViewIcon />
          </i>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          title="Copy the request"
        >
          <i className="svg-icon">
            <CopyIcon />
          </i>
        </a>
      </div>
    </li>
  );
};

export default RequestForStubItem;
