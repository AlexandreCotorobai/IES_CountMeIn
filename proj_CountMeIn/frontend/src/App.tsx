import React, { Suspense } from 'react';
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
    const router = createBrowserRouter(routes);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                        <RouterProvider router={router}/>
                    </Suspense>
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
