import React, { useState } from "react";
import { IAppConfig } from "../interface";
import {
  LoadingIconSimple,
  SearchIcon,
  ExpandIcon,
  UserIcon,
  DarkModeIcon,
  LightModeIcon,
} from "./Icons";

const Header = ({
  search,
  AppConfig,
  HasError,
  toggleSidebar,
  isExpanded,
  logout,
  isInDarkMode,
  toggleDarkMode,
}: {
  search: Function;
  AppConfig?: IAppConfig;
  HasError: boolean;
  isExpanded: boolean;
  toggleSidebar: Function;
  logout: Function;
  isInDarkMode: boolean;
  toggleDarkMode: Function;
}) => {
  const [SearchText, setSearchText] = useState("");
  return (
    <header className={"header" + (isInDarkMode ? " theme-dark" : "")}>
      <div style={{ display: "flex" }}>
        <h2>
          <a
            href="#"
            onClick={(e) => {
              {
                toggleSidebar(!isExpanded);
              }
            }}
          >
            <i className="svg-icon expand" style={{ display: "flex" }}>
              <ExpandIcon />
            </i>
          </a>
        </h2>
        <h2>
          {HasError && (
            <span className="tag danger">Pega Connection Error</span>
          )}
          {!HasError && !AppConfig && (
            <i className="svg-icon">
              <LoadingIconSimple />
            </i>
          )}
          {AppConfig && AppConfig.Settings.Application.Value}
        </h2>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="search-box">
          <input
            className="form-control"
            id="searchStr"
            placeholder="Search requests"
            value={SearchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                search(SearchText);
              }
            }}
          />
          <button
            className="btn"
            type="button"
            onClick={(e) => {
              search(SearchText);
            }}
          >
            <SearchIcon />
          </button>
        </div>
        <div className={"svg-icon" + (isInDarkMode ? " yellow" : "")}>
          <a
            href="#"
            onClick={(e) => toggleDarkMode()}
            title="Dark mode switch"
          >
            {!isInDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </a>
        </div>

        <div style={{ padding: "8px", fontSize: "18px" }}>
          {AppConfig && (
            <span className="svg-icon">
              <UserIcon /> {AppConfig.Settings.User.Value}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </a>
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
