import React from "react";
import { Navigate } from "react-router-dom";
import CleanLayout from "./layouts";

const routes = [
    {
        path: "/",
        element: <CleanLayout />,
        children: [
            { path: "/", lazy: () => import("./pages/home")},
            { path: "/login", lazy: () => import("./pages/login") },
        ],
    },
];

export default routes;