import React from 'react';
import './App.css';
import Sidebar from "./modules/sidebar";
import Header from "./modules/header";
import Page from "./pages";

function App() {
    // get the active page from the URL
    const url = window.location.href;
    let activePage = url.split("/").pop();
    if(activePage === "") {
        activePage = "employees";
    }
  return (
    <div className="App">
        <Sidebar activePage={activePage} />
        <div className={"body"}>
            <Header activePage={activePage} />
            <Page activePage={activePage} />
        </div>
    </div>
  );
}

export default App;
