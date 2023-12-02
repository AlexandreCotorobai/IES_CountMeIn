import CleanLayout from "./layouts";
import {Component} from "./pages/dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";


const routes = [
    {
        path: "/",
        element: <CleanLayout />,
        children: [
            { path: "/", lazy: () => import("./pages/home") },
            { path: "/login", lazy: () => import("./pages/login") },
            { path: "/dashboard", element: <ProtectedRoute page={Component} />}
        ],
    }, {
    }
];

export default routes;