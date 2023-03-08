import "./App.css";
import "./tests/mock/index"
import Stock from "./pages/Stock";
import Create from "./pages/Create";
import Main from "./components/Main";
import Favourites from "./pages/Favourites";
import StockDetail, { loader as detailLoader } from "./pages/StockDetail";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import "./sign.css"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { index: true, element: <Navigate to="stock" /> },
        { path: "stock", element: <Stock /> },
        { path: "stock/:stockCode", element: <StockDetail />, loader: detailLoader },
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
    {
      path: "/signIn",
      element: <SignIn />
    },
    {
      path: "/signUp",
      element: <SignUp />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
