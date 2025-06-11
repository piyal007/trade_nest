import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout/MainLayout";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default router;
