import routes from "./routes"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { ThemeProvider } from "@/components/ThemeProvider";
import "./App.css"

const App = () => {
  const router = createBrowserRouter(routes);
  return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
  </ThemeProvider>
  );
}

export default App
