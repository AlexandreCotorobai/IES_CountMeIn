import routes from "./routes"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/auth";
import "./App.css"
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter(routes);
  return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
  );
}

export default App
