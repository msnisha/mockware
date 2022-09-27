import React, { useEffect, useState } from "react";
// import "./App.css";
import { IAppConfig, IConnector, IMapping } from "./interface";
import Sidebar from "./component/Sidebar";
import Footer from "./component/Footer";
import Connectors from "./pages/Connectors";
import {
  fetchAppConfig,
  fetchAvailableConnectors,
  fetchMappings,
  pegaAuthHeaders,
  pegaCredentials,
  readFromCookie,
  removeFromCookie,
  saveToCookie,
} from "./api";
import Mappings from "./pages/Mappings";
import Header from "./component/Header";
import Requests from "./pages/Requests";
import Recordings from "./pages/Recordings";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  const [mappings, setMappings] = useState<Array<IMapping>>([]);
  const [CurrentMapping, setCurrentMapping] = useState<IMapping>();
  const [SearchText, setSearchText] = useState("");
  const [CurrentView, setCurrentView] = useState("");
  const [HasError, setHasError] = useState(false);
  const [AppConfig, setAppConfig] = useState<IAppConfig>();
  const [IsMappingLoading, setIsMappingLoading] = useState(false);
  const [IsSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [IsLoginLoading, setIsLoginLoading] = useState(false);
  const [isInDarkMode, setIsInDarkMode] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);


  let data = readFromCookie("credentials");
  if (data) {
    let credData = JSON.parse(data);
    pegaCredentials.username = credData.username;
    pegaCredentials.password = credData.password;
  };

  const loadMappings = () => {
    setIsMappingLoading(true);
    setTimeout(
      () =>
        fetchMappings(
          (results: Array<IMapping>) => {
            setMappings(results);
            setIsMappingLoading(false);
          },
          (err: Error) => {
            console.error(Error);
            setHasError(true);
            setIsMappingLoading(false);
          }
        ),
      500
    );
  };

  useEffect(() => {
    handleLogin(pegaCredentials.username, pegaCredentials.password);
    loadMappings();
  }, []);

  const handleLogin = (username: string, password: string) => {
    pegaCredentials.username = username;
    pegaCredentials.password = password;
    setIsLoginLoading(true);
    fetchAppConfig(
      (results: any) => {
        setAppConfig(results);
        setIsLoggedIn(true);
        setIsLoginLoading(false);
        saveToCookie("credentials", JSON.stringify(pegaCredentials));

      },
      (err: Error) => {
        setIsLoggedIn(false);
        setIsLoginLoading(false);
      }
    );
  };

  const handleLogout = () => {
    pegaCredentials.username = "";
    pegaCredentials.password = "";
    removeFromCookie("credentials");
    setIsLoggedIn(false);
  };

  if (!IsLoggedIn)
    return <LoginPage onLogin={handleLogin} isWaiting={IsLoginLoading} />;

  return (
    <div
      className={
        "mockaware" +
        (IsSidebarExpanded ? " expanded" : "") +
        (isInDarkMode ? " theme-dark" : "")
      }
    >
      <Header
        search={(searchText: string) => {
          setSearchText(searchText);
          setCurrentView("Requests");
        }}
        HasError={HasError}
        AppConfig={AppConfig}
        toggleSidebar={setIsSidebarExpanded}
        isInDarkMode={isInDarkMode}
        toggleDarkMode={() => setIsInDarkMode(!isInDarkMode)}
        isExpanded={IsSidebarExpanded}
        logout={handleLogout}
      />
      <Sidebar
        currentView={CurrentView}
        selectView={setCurrentView}
        isCollapsed={!IsSidebarExpanded}
      />
      <main className={"main"}>
        {CurrentView === "" && (
          <Home setCurrentView={setCurrentView} />
        )}
        {CurrentView === "Mappings" && (
          <Mappings
            setCurrentMapping={setCurrentMapping}
            setCurrentView={setCurrentView}
            IsMappingLoading={IsMappingLoading}
          />
        )}
        {CurrentView === "Connectors" && (
          <Connectors
            mappings={mappings}
            loadMappings={loadMappings}
          />
        )}
        {CurrentView === "Requests" && (
          <Requests mapping={CurrentMapping} SearchText={SearchText} />
        )}
        {CurrentView === "Recordings" && <Recordings />}
      </main>
      <Footer />
      {/* {ModalData && <Modal data={ModalData} />} */}
    </div>
  );
}

export default App;
