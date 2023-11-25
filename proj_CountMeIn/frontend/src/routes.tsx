import React, {lazy} from "react";
import { Navigate } from "react-router-dom";
import CleanLayout from "./layouts";

const routes = [
    {
        path: "/",
        element: <CleanLayout />,
        children: [
            { path: "/", element: lazy(() => import("./pages/home"))},
            { path: "/login", element: lazy(() => import("./pages/login")) },
        ],
    },
];

export default routes;