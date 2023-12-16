import { Suspense, lazy } from 'react';
import { CustomRoute } from "./components/ProtectedRoute";
import CleanLayout from "./layouts";

const HomeComponent = lazy(() => import("./pages/home"));
const LoginComponent = lazy(() => import("./pages/login"));
const DashboardComponent = lazy(() => import("./pages/dashboard"));

const routes = [
    {
        path: "/",
        element: <CleanLayout />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<div>Loading Home...</div>}>
                        <HomeComponent />
                    </Suspense>
                )
            },
            {
                path: "/login",
                element: (
                    <Suspense fallback={<div>Loading Login...</div>}>
                        <CustomRoute page={LoginComponent} isPublic={true} />
                    </Suspense>
                )
            },
            {
                path: "/dashboard",
                element: (
                    <Suspense fallback={<div>Loading Dashboard...</div>}>
                        <CustomRoute page={DashboardComponent} redirectTo='/dashboard' />
                    </Suspense>
                )
            }
        ],
    },
    // ... outras rotas
];

export default routes;
