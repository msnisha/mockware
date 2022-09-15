import React from "react";
import { LoadingIconSimple } from "./Icons";

const Loading = ({ title }: { title?: string }) => {
  return (
    <div className="loader">
      <LoadingIconSimple />
      {title ? title : "Loading..."}
    </div>
  );
};

export default Loading;
