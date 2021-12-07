import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/*'} element={<MainLayout/>}/>
        <Route path={'/auth/:type'} element={<LoginLayout/>}/>
      </Routes>
    </div>
  );
}

export default App;
