import "./App.css";
import Stock from "./pages/Stock";
import Create from "./pages/Create";
import Main from "./components/Main";
import Favourites from "./pages/Favourites";
import StockDetail from "./pages/StockDetail";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./sign.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Main />,
          children: [
            { index: true, element: <Navigate to="/stock" /> },
            { path: "stock", element: <Stock /> },
            { path: "stock/:stockCode", element: <StockDetail /> },
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
      ],
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
