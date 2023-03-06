import "./App.css";
import "./tests/mock/index"
import Stock from "./pages/Stock";
import Create from "./pages/Create";
import Main from "./components/Main";
import Favourites from "./pages/Favourites";
<<<<<<< HEAD
import StockDetail, { loader as detailLoader } from "./pages/StockDetail";
=======
import StockDetail,{loader as detailLoader} from "./pages/StockDetail";
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
<<<<<<< HEAD
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import "./sign.css"


function App() {

=======

function App() {
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
<<<<<<< HEAD
        {
          index: true,
          element: <Navigate to="stock" />
        },
        {
          path: "stock",
          element: <Stock />
        },
        {
          path: "stock/:symbol",
          element: <StockDetail />,
          loader: detailLoader
        },
=======
        { index: true, element: <Navigate to="stock" /> },
        { path: "stock", element: <Stock /> },
        { path: "stock/:stockCode", element: <StockDetail />,loader:detailLoader },
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
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
<<<<<<< HEAD
    {
      path:"/signIn",
      element:<SignIn />
    },
    {
      path:"/signUp",
      element:<SignUp />
    }
=======
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
  ]);

  return <RouterProvider router={router} />;
}

export default App;
