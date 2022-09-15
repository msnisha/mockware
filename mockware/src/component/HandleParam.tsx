import React from "react";
import { IRequestParamType } from "../interface";
import { TrashIcon } from "./Icons";

const HandleParam = ({
  item,
  type,
  changeHandler,
  index,
  handleMatchingRemove,
}: {
  item: IRequestParamType;
  type: string;
  index: number;
  changeHandler: Function;
  handleMatchingRemove: Function;
}) => {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let element = e.target;
    let newItem = { ...item };
    if (element.name == "pyParameterName") {
      newItem.pyParameterName = element.value;
    } else if (element.name == "MatchingType") {
      newItem.matchType = element.value;
    } else if (element.name == "MatchingValue") {
      newItem.matchValue = element.value;
    }
    changeHandler(newItem, type, index);
  };

  return (
    <div key={index} className="form-inline">
      <input
        type="text"
        name="pyParameterName"
        onChange={handleFieldChange}
        value={item.pyParameterName}
      />
      <select
        id="MatchingType"
        name="MatchingType"
        onChange={handleFieldChange}
        value={item.matchType}
        disabled={type == "respHeaderParams"}
      >
        <option value="any">Any</option>
        <option value="equals">Equals to</option>
        <option value="pattern">Matches pattern</option>
      </select>
      {item.matchType !== "any" && (
        <input
          type="text"
          name="MatchingValue"
          onChange={handleFieldChange}
          value={item.matchValue}
        />
      )}
      <a
        href="#"
        className="button bg-danger"
        onClick={(e) => {
          e.preventDefault();
          handleMatchingRemove();
        }}
        title="Remove matching"
      >
        <TrashIcon />
      </a>
      {item.matchType === "pattern" && (
        <div>
          {"Quick Fill: "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeHandler(
                {
                  ...item,
                  matchValue: "([a-zA-z]*)",
                },
                type,
                index
              );
            }}
          >
            alphabet
          </a>{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeHandler(
                {
                  ...item,
                  matchValue: "([a-zA-Z0-9]*)",
                },
                type,
                index
              );
            }}
          >
            alpha numeric
          </a>
        </div>
      )}
    </div>
  );
};

export default HandleParam;
