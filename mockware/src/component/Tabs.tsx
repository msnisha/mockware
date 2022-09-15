import React from "react";

export const Tabs = (props: {
  tabs: Array<{
    title: string;
    content: string;
    name: string;
    id: string;
    active: string;
    onClick: Function;
  }>;
  active: string;
  activeTab: number;
  setActiveTab: Function;
}) => {
  return (
    <div className="tabs">
      <ul className="tab-list">
        {props.tabs.map((tab, index) => {
          return (
            <li
              key={index}
              className={props.activeTab === index ? "active" : ""}
              onClick={() => props.setActiveTab(index)}
            >
              {tab.name}
            </li>
          );
        })}
      </ul>
      <div className="tab-content">{props.tabs[props.activeTab].content}</div>
    </div>
  );
};
