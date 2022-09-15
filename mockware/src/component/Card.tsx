import React from "react";

type propType = {
  title: string;
  children?: React.ReactNode;
  headerItems?: React.ReactNode;
};

const Card = (props: propType) => {
  const { title, children, headerItems } = props;
  return (
    <div className="card">
      <div className="card-header">
        <h2> {title}</h2>
        <div className="actions">{headerItems}</div>
      </div>
      <div className="body">{children}</div>
    </div>
  );
};

export default Card;
