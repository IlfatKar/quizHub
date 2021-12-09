import React from 'react';
import './App.css';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";

function App() {
  return (
    <div className="App">
      <ReactNotification/>
      <Routes>
        <Route path={'/*'} element={<MainLayout/>}/>
        <Route path={'/auth/:type'} element={<LoginLayout/>}/>
      </Routes>
    </div>
  );
}

export default App;
