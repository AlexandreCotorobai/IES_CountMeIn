import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

const CleanLayout = () => (
        <div className="min-h-screen">
            <header>
                <NavBar/>
            </header>
            <Outlet/>
        </div>
);

export default CleanLayout;