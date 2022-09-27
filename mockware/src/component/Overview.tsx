import React, { useEffect, useState } from "react";
import { pegaAuthHeaders } from "../api";
import { LoadingIconSimple } from "./Icons";


const Overview = (props: {
  icon: any;
  title: string;
  onClick: Function;
  dataSource: string;
  getValueFromData: Function;
  isAuthenticated: boolean;
  styleClass?: string;
}) => {
  const Icon = props.icon;
  const [IsLoading, setIsLoading] = useState(false);
  const [HasError, setHasError] = useState(false);
  const [Value, setValue] = useState();
  const className = props.styleClass ? props.styleClass : "";

  //fetch data from given url
  useEffect(() => {
    setIsLoading(true);
    fetch(props.dataSource, {
      method: "GET",
      headers: props.isAuthenticated ? pegaAuthHeaders() : {}
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setHasError(false);
        setValue(props.getValueFromData(data));
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [props.dataSource, props.isAuthenticated]);

  return (
    <div
      className="overviewcard"
      onClick={() => {
        props.onClick();
      }}
    >
      <div className={"icon " + className}>
        <Icon />
      </div>
      <div className="info">
        <p className="svg-icon">
          {IsLoading ? (
            <LoadingIconSimple />
          ) : HasError ? (
            <span className="tag danger">Pega Connection Error</span>
          ) : (
            <span>{Value}</span>
          )}
        </p>
        <h4>
          {props.title}
        </h4>
      </div>
    </div>
  );
};

export default Overview;
