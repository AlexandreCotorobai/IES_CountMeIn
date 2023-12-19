import { Suspense } from 'react';
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/auth";
import { RoomInfoProvider } from '@/contexts/roomInformation';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"; // Import the necessary package
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
    const router = createBrowserRouter(routes);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                        <RoomInfoProvider>
                            <RouterProvider router={router}/>
                        </RoomInfoProvider>
                    </Suspense>
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
