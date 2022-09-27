import React from "react";

import {
  ConnectorIcon,
  HomeIcon,
  MappingIcon,
  RecordingIcon,
  RequestIcon,
  SettingsIcon,
} from "./Icons";
import Logo from "./logo";

const Sidebar = ({
  currentView,
  selectView,
  isCollapsed,
}: {
  currentView: string;
  selectView: Function;
  isCollapsed: boolean;
}) => {
  return (
    <aside className="sidenav">
      <div className="sidenav-header">
        <Logo isSmall={isCollapsed} isDark={true} />
      </div>

      <ul className="list">
        <li
          className={"item" + (currentView === "" ? " active" : "")}
          onClick={() => selectView("")}
        >
          <HomeIcon />
          <span>Home</span>
        </li>
        <li
          className={"item" + (currentView === "Connectors" ? " active" : "")}
          onClick={() => selectView("Connectors")}
        >
          <ConnectorIcon />
          <span>Connectors</span>
        </li>

        <li
          className={"item" + (currentView === "Mappings" ? " active" : "")}
          onClick={() => selectView("Mappings")}
        >
          <MappingIcon />
          <span>Mappings</span>
        </li>
        <li
          className={"item" + (currentView === "Requests" ? " active" : "")}
          onClick={() => selectView("Requests")}
        >
          <RequestIcon />
          <span>Requests</span>
        </li>
        <li
          className={"item" + (currentView === "Recordings" ? " active" : "")}
          onClick={() => selectView("Recordings")}
        >
          <RecordingIcon />
          <span>Recordings</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
