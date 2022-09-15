import React from "react";
import { NoResultIcon } from "./Icons";

const NotFound = ({ title, message }: { title: string; message: string }) => {
  return (
    <div className="empty">
      <div className="empty-icon">
        <NoResultIcon />
      </div>
      <div className="empty-title">
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NotFound;
