import React from "react";
// import { IIcon } from "../interface";

const Overview = (props: {
  icon: any;
  title: string;
  value: string;
  onClick: Function;
  HasError: boolean;
}) => {
  const Icon = props.icon;
  return (
    <div
      className="overviewcard"
      onClick={() => {
        props.onClick();
      }}
    >
      <div className="icon">
        <Icon />
      </div>
      <div className="info">
        <h2>{props.title}</h2>
        {props.HasError && (
          <span className="tag danger">Pega Connection Error</span>
        )}
        {!props.HasError && props.value}
      </div>
    </div>
  );
};

export default Overview;
