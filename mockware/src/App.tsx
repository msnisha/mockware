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
} from "./config";
import Mappings from "./pages/Mappings";
import Header from "./component/Header";
import Requests from "./pages/Requests";
import Recordings from "./pages/Recordings";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  const [connectors, setConnectors] = useState<Array<IConnector>>([]);
  const [mappings, setMappings] = useState<Array<IMapping>>([]);
  const [CurrentMapping, setCurrentMapping] = useState<IMapping>();
  const [SearchText, setSearchText] = useState("");
  const [CurrentView, setCurrentView] = useState("");
  const [HasError, setHasError] = useState(false);
  const [AppConfig, setAppConfig] = useState<IAppConfig>();
  const [IsMappingLoading, setIsMappingLoading] = useState(false);
  const [IsSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [IsLoginLoading, setIsLoginLoading] = useState(false);
  const [isInDarkMode, setIsInDarkMode] = useState(false);

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
            console.log(Error);
            setHasError(true);
            setIsMappingLoading(false);
          }
        ),
      500
    );
  };

  const loadConnectors = () => {
    fetchAvailableConnectors(
      (results: Array<IConnector>) => {
        setConnectors(results);
      },
      (err: Error) => {
        setHasError(true);
        console.log(Error);
      }
    );
  };

  useEffect(() => {
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
        loadConnectors();
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
        {CurrentView == "" && (
          <Home
            mappings={mappings}
            connectors={connectors}
            setCurrentView={setCurrentView}
            HasError={HasError}
          />
        )}
        {CurrentView == "Simulations" && (
          <Connectors
            connectors={connectors}
            mappings={mappings}
            loadConnectors={loadConnectors}
            loadMappings={loadMappings}
          />
        )}
        {CurrentView == "Mappings" && (
          <Mappings
            mappings={mappings}
            setCurrentMapping={setCurrentMapping}
            loadMappings={loadMappings}
            setCurrentView={setCurrentView}
            IsMappingLoading={IsMappingLoading}
          />
        )}
        {CurrentView == "Connectors" && (
          <Connectors
            connectors={connectors}
            mappings={mappings}
            loadMappings={loadMappings}
            loadConnectors={loadMappings}
          />
        )}
        {CurrentView == "Requests" && (
          <Requests mapping={CurrentMapping} SearchText={SearchText} />
        )}
        {CurrentView == "Recordings" && <Recordings />}
      </main>
      <Footer />
      {/* {ModalData && <Modal data={ModalData} />} */}
    </div>
  );
}

export default App;
