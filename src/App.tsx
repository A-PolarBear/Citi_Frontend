import "./App.css";
import Stock from "./pages/Stock";
import Create from "./pages/Create";
import Main from "./components/Main";
import Favourites from "./pages/Favourites";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "stock",
          element: <Stock />,
        },
        {
          path: "create",
          element: <Create />,
        },
        {
          path: "favourites",
          element: <Favourites />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
