import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style/App.css';
import Home from './js/pages/Home';
import Header from "./js/Components/Header";
import Class from "./js/pages/Class";
import Build from "./js/pages/Build";
import Create from "./js/pages/Create";
import Server from "./js/pages/Server";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route index element={<Home/>} />
                <Route path=":class" element={<Class/>} />
                <Route path=":class/:id" element={<Build/>} />
                <Route path="new" element={<Create/>} />
                {/*<Route path="/servers" element={<Server/>} />*/}
            </Routes>
            <div className="Footer"/>
        </BrowserRouter>
    );
}

export default App;