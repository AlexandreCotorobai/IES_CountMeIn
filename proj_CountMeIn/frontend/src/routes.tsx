import React from "react";
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