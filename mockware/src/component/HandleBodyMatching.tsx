import React from "react";
import { IBodyMatchingType } from "../interface";
import { TrashIcon } from "./Icons";

const HandleBodyMatching = ({
  item,
  type,
  changeHandler,
  handleMatchingRemove,
  index,
}: {
  item: IBodyMatchingType;
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
    if (element.name == "MatchingField") {
      newItem.matchField = element.value;
    } else if (element.name == "MatchingValue") {
      newItem.matchValue = element.value;
    }
    changeHandler(newItem, type, index);
  };

  return (
    <div key={index} className="form-inline">
      <label>JSON Field Path</label>
      <input
        type="text"
        name="MatchingField"
        onChange={handleFieldChange}
        value={item.matchField}
        placeholder="$.foo.bar"
      />
      <label>Field Value Contains</label>
      <input
        type="text"
        name="MatchingValue"
        onChange={handleFieldChange}
        value={item.matchValue}
        placeholder="123"
      />
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleMatchingRemove();
        }}
        title="Remove matching"
      >
        <TrashIcon />
      </a>
      {"Quick Fill: "}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          changeHandler(
            {
              ...item,
              matchField: "$.fieldName",
            },
            type,
            index
          );
        }}
      >
        Field at root
      </a>
      {" | "}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          changeHandler(
            {
              ...item,
              matchField: "$.store.book[0].title",
            },
            type,
            index
          );
        }}
      >
        Field in array
      </a>
      {" | "}
      <a
        href="https://goessner.net/articles/JsonPath/index.html#e2"
        target="_blank"
      >
        Learn JSON Path expression
      </a>
    </div>
  );
};

export default HandleBodyMatching;
