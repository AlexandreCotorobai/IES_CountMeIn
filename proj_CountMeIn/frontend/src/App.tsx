import routes from "./routes"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const App = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router}/>;
}

export default App
