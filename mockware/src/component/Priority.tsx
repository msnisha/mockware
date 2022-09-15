import React from "react";

type OnChangeFunction = React.ChangeEventHandler<HTMLInputElement>;

const Priority = ({
  value,
  onChange,
}: {
  value: number;
  onChange?: OnChangeFunction;
}) => {
  return (
    <div style={{ width: "300px" }}>
      <input
        type="range"
        name="priority"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={onChange}
        style={{ width: "100%", padding: "0px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Highest</span>
        <span>{value}</span>
        <span>Lowest</span>
      </div>
    </div>
  );
};

export default Priority;
