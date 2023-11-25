import React from "react";
import { Outlet } from "react-router-dom";

const CleanLayout = () => (
    <div className="relative flex min-h-screen flex-col justify-between pt-20">
        <Outlet/>
    </div>
);

export default CleanLayout;