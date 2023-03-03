import "./App.css";
import Stock from "./pages/Stock";
import Create from "./pages/Create";
import Main from "./components/Main";
import Favourites from "./pages/Favourites";
import StockDetail,{loader as detailLoader} from "./pages/StockDetail";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { index: true, element: <Navigate to="stock" /> },
        { path: "stock", element: <Stock /> },
        { path: "stock/:symbol", element: <StockDetail />,loader:detailLoader },
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
